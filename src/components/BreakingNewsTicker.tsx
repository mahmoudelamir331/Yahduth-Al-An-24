import Link from "next/link";

/**
 * الشريط الأحمر العاجل — بيظهر أعلى الموقع بس لما يكون مفعّل من لوحة الإدارة
 * ولما فيه نص. لو وقف أو النص فاضي، المكون بيترندر null تماماً.
 */
export function BreakingNewsTicker({
  enabled,
  text,
  link,
}: {
  enabled: boolean;
  text: string | null;
  link: string | null;
}) {
  if (!enabled || !text?.trim()) return null;
  const href = link?.trim() || "";

  return (
    <div className="relative overflow-hidden bg-urgent text-white" role="alert" aria-live="polite">
      <div className="container mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
        <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-black">
          <span className="size-2 animate-pulse rounded-full bg-white" />
          عاجل
        </span>
        {href ? (
          <Link href={href} className="min-w-0 flex-1 truncate text-xs font-bold hover:underline sm:text-sm">
            {text.trim()}
          </Link>
        ) : (
          <span className="min-w-0 flex-1 truncate text-xs font-bold sm:text-sm">{text.trim()}</span>
        )}
      </div>
    </div>
  );
}
