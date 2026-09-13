import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = process.cwd();

function files(dir) {
  const entries = readdirSync(dir);
  return entries.flatMap((entry) => {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) return files(path);
    return /\.(tsx?|jsx?)$/.test(path) ? [path] : [];
  });
}

test("images are optimized and no raw img tags remain", () => {
  for (const file of [join(root, "next.config.ts"), ...files(join(root, "src"))]) {
    const source = readFileSync(file, "utf8");
    assert.equal(source.includes("unoptimized"), false, file);
    assert.equal(/<img\b/i.test(source), false, file);
  }
});

test("service role is kept out of client/browser files", () => {
  for (const file of files(join(root, "src"))) {
    const source = readFileSync(file, "utf8");
    const isClient = source.startsWith("\"use client\"") || source.startsWith("'use client'") || file.endsWith("supabase-browser.ts");
    if (isClient) assert.equal(source.includes("SUPABASE_SERVICE_ROLE_KEY"), false, file);
  }
});

test("dangerous HTML sinks explicitly sanitize before display", () => {
  for (const file of files(join(root, "src"))) {
    const source = readFileSync(file, "utf8");
    if (source.includes("dangerouslySetInnerHTML")) {
      assert.match(source, /sanitize[A-Za-z]*Html|sanitizeAdMarkup/, file);
    }
  }
});
