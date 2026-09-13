-- UNIQUE constraint for category slugs.
-- REVIEW ONLY: do not execute against Production without approval.
-- This migration intentionally fails if duplicate slugs already exist,
-- so existing data is not changed silently.
begin;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.categories
    GROUP BY slug
    HAVING slug IS NOT NULL AND COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'Cannot add unique categories.slug constraint: duplicate non-null slugs exist';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'categories_slug_unique'
      AND conrelid = 'public.categories'::regclass
  ) THEN
    ALTER TABLE public.categories
      ADD CONSTRAINT categories_slug_unique UNIQUE (slug);
  END IF;
END $$;

commit;
