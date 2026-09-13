"use client";

import DOMPurify from "dompurify";

const richTextOptions = {
  ALLOWED_TAGS: ["p", "br", "strong", "b", "em", "i", "u", "s", "blockquote", "ul", "ol", "li", "h1", "h2", "h3", "h4", "a", "img"],
  ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "width", "height"],
  ALLOW_DATA_ATTR: false,
};

/** Sanitizes CMS rich text immediately before it reaches dangerouslySetInnerHTML. */
export function sanitizeRichHtml(value: string) {
  return DOMPurify.sanitize(value, richTextOptions);
}

/** Ad markup is deliberately restricted to the non-executable AdSense container. */
export function sanitizeAdMarkup(value: string) {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: ["ins"],
    ALLOWED_ATTR: ["class", "data-ad-client", "data-ad-slot", "data-ad-format", "data-full-width-responsive"],
    ALLOW_DATA_ATTR: false,
  });
}
