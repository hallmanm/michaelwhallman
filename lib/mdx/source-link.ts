const GITHUB_REPO = "https://github.com/hallmanm/michaelwhallman";
const DEMO_SRC_PREFIX = "public/demo-src/";

export type ParsedSourceTitle = {
  filePath: string;
  href: string;
  label: string;
};

// Parse `<file path>#L<start>(-L<end>)` titles into a GitHub blob URL with a
// line-range anchor and an accessibility label. Returns null when the title
// doesn't carry a line suffix (in which case no source link is appended).
export function parseSourceTitle(title: string): ParsedSourceTitle | null {
  const match = title.match(/^(.+?)#L(\d+)(?:-L(\d+))?$/);
  if (!match) return null;

  const [, filePath, startLine, endLine] = match;
  const anchor = endLine ? `#L${startLine}-L${endLine}` : `#L${startLine}`;
  const href = `${GITHUB_REPO}/blob/main/${DEMO_SRC_PREFIX}${filePath}${anchor}`;
  const label = endLine
    ? `View source on GitHub (lines ${startLine}-${endLine})`
    : `View source on GitHub (line ${startLine})`;

  return { filePath, href, label };
}
