/**
 * Data Migration: Source (cuxvfekclhdlsidayxnr) -> Destination (ejpynotorhqnuazfrola)
 *
 * Transfers rows table-by-table respecting Foreign Key order, and remaps
 * auth user ids so `profiles` / `user_permissions` / article authorship survive.
 *
 * Usage:
 *   node scripts/migrate-data.mjs                 # dry run (reads only)
 *   node scripts/migrate-data.mjs --commit        # actually writes to destination
 *   node scripts/migrate-data.mjs --commit --only=articles
 *
 * Env (or edit CONFIG below):
 *   SRC_SUPABASE_URL, SRC_SERVICE_ROLE_KEY
 *   DST_SUPABASE_URL, DST_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------
const CONFIG = {
  source: {
    url: process.env.SRC_SUPABASE_URL ?? "https://cuxvfekclhdlsidayxnr.supabase.co",
    serviceRoleKey:
      process.env.SRC_SERVICE_ROLE_KEY ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHZmZWtjbGhkbHNpZGF5eG5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODAyOTU4NSwiZXhwIjoyMTAzNjA1NTg1fQ.aPyen-NJqlXYmdbhIudX-cphxPwuPF6DU9KJ4W2kebI",
  },
  destination: {
    url: process.env.DST_SUPABASE_URL ?? "https://ejpynotorhqnuazfrola.supabase.co",
    serviceRoleKey:
      process.env.DST_SERVICE_ROLE_KEY ??
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcHlub3RvcmhxbnVhemZyb2xhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDQyODk4OSwiZXhwIjoyMTA2MDA0OTg5fQ.w1fxWWWjLyPOxNgr_v_CxJCc0c7RoPDKcYDuJqu63Y8",
  },
  pageSize: 1000,
};

/** Transfer order = dependency order. */
const TABLES = [
  "categories",
  "auth_users",
  "profiles",
  "user_permissions",
  "articles",
  "site_pages",
  "site_settings",
  "ads",
  "password_reset_requests",
  "site_visits",
  "article_view_events",
  "audit_logs",
];

// ---------------------------------------------------------------------------
// ARGS
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const COMMIT = argv.includes("--commit");
const only = argv.find((a) => a.startsWith("--only="))?.slice(7);
const activeTables = only ? TABLES.filter((t) => t === only) : TABLES;

// ---------------------------------------------------------------------------
// CLIENTS
// ---------------------------------------------------------------------------
const src = createClient(CONFIG.source.url, CONFIG.source.serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const dst = createClient(CONFIG.destination.url, CONFIG.destination.serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const log = (...a) => console.log(...a);
const stats = {};

/** Read every row of a table using keyset/range pagination. */
async function readAll(client, table, columns = "*") {
  const rows = [];
  let from = 0;
  for (; ;) {
    const { data, error } = await client
      .from(table)
      .select(columns)
      .range(from, from + CONFIG.pageSize - 1);
    if (error) throw new Error(`read ${table}: ${error.message}`);
    rows.push(...(data ?? []));
    if (!data || data.length < CONFIG.pageSize) break;
    from += CONFIG.pageSize;
  }
  return rows;
}

/** Write rows in chunks with upsert so the script is re-runnable. */
async function writeAll(table, rows, onConflict = "id") {
  let written = 0;
  for (let i = 0; i < rows.length; i += CONFIG.pageSize) {
    const chunk = rows.slice(i, i + CONFIG.pageSize);
    const { error } = await dst.from(table).upsert(chunk, { onConflict: onConflict });
    if (error) throw new Error(`write ${table}: ${error.message}`);
    written += chunk.length;
  }
  return written;
}

// ---------------------------------------------------------------------------
// auth.users -> recreate in destination, building an id remap
// ---------------------------------------------------------------------------
async function migrateAuthUsers() {
  const { data: srcList, error: listError } = await src.auth.admin.listUsers({
    page: 1,
    perPage: CONFIG.pageSize,
  });
  if (listError) throw new Error(`list auth users: ${listError.message}`);

  const sourceUsers = srcList?.users ?? [];
  const idMap = new Map();

  for (const u of sourceUsers) {
    const email = u.email;
    if (!email) {
      log(`   ! skipping user ${u.id} (no email)`);
      continue;
    }

    // Already present in destination?
    const { data: existingList } = await dst.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const existing = existingList?.users?.find((x) => x.email === email);
    if (existing) {
      idMap.set(u.id, existing.id);
      log(`   = ${email} already exists in destination -> linked`);
      continue;
    }

    if (!COMMIT) {
      idMap.set(u.id, null);
      log(`   - ${email} would be created`);
      continue;
    }

    const created = await dst.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: u.user_metadata ?? {},
      app_metadata: u.app_metadata ?? {},
      // Password is not exportable from the source; the account is created
      // without one and the owner should use "forgot password".
    });
    if (created.error) {
      log(`   ! ${email}: ${created.error.message}`);
      continue;
    }
    idMap.set(u.id, created.data.user.id);
    log(`   + ${email} created`);
  }

  stats.auth_users = { total: sourceUsers.length, mapped: idMap.size };
  return idMap;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
async function main() {
  log(`Mode: ${COMMIT ? "COMMIT (writing)" : "DRY RUN (read only)"}\n`);
  log(`Source      : ${CONFIG.source.url}`);
  log(`Destination : ${CONFIG.destination.url}\n`);

  let userIdMap = new Map();

  for (const table of activeTables) {
    log(`--- ${table}`);

    if (table === "auth_users") {
      userIdMap = await migrateAuthUsers();
      continue;
    }

    // ---- read from source
    let rows;
    try {
      rows = await readAll(src, table);
    } catch (e) {
      log(`   ! ${e.message}`);
      stats[table] = { read: 0, written: 0, error: e.message };
      continue;
    }
    log(`   read ${rows.length} rows`);
    if (rows.length === 0) {
      stats[table] = { read: 0, written: 0 };
      continue;
    }

    // ---- transform: remap auth user ids so FKs stay valid
    const remapUserId = (row, field) => {
      if (row[field] == null) return row;
      const mapped = userIdMap.get(row[field]);
      if (mapped === undefined) return { ...row, [field]: null };
      if (mapped === null) return { ...row, [field]: null };
      return { ...row, [field]: mapped };
    };

    let payload = rows;
    if (["profiles", "user_permissions", "password_reset_requests"].includes(table)) {
      payload = rows.map((r) => remapUserId(r, "user_id"));
    } else if (table === "articles") {
      payload = rows.map((r) => {
        let next = remapUserId(r, "created_by");
        next = remapUserId(next, "updated_by");
        return next;
      });
    } else if (["ads", "site_pages", "site_settings"].includes(table)) {
      const field = table === "ads" ? "created_by" : "updated_by";
      payload = rows.map((r) => remapUserId(r, field));
    }

    // ---- write to destination
    let written = 0;
    if (COMMIT) {
      try {
        written = await writeAll(table, payload);
        log(`   written ${written} rows`);
      } catch (e) {
        log(`   ! ${e.message}`);
      }
    } else {
      written = 0;
      log(`   (dry run) would write ${payload.length} rows`);
    }
    stats[table] = { read: rows.length, written };
  }

  // ---- summary + article integrity check
  log("\n=== SUMMARY ===");
  for (const [t, s] of Object.entries(stats)) {
    log(`${t.padEnd(24)} read=${String(s.read).padEnd(7)} written=${s.written}${s.error ? `  ERROR: ${s.error}` : ""}`);
  }

  log("\n=== articles verification ===");
  const { count: srcCount } = await src.from("articles").select("id", { count: "exact", head: true });
  const { count: dstCount } = await dst.from("articles").select("id", { count: "exact", head: true });
  log(`source articles     : ${srcCount}`);
  log(`destination articles: ${dstCount}`);

  const { data: orphans } = await dst
    .from("articles")
    .select("id, slug, title, category_id")
    .is("category_id", null);
  if (orphans?.length) {
    log(`! ${orphans.length} article(s) without a category (ok only if source had none)`);
  }
  const { data: badStatus } = await dst.from("articles").select("id,status").neq("status", "published");
  if (badStatus?.length) log(`${badStatus.length} article(s) are not 'published' — expected for drafts`);
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exit(1);
});
