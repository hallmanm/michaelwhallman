import { describe, it, expect } from "vitest";
import { parseSourceTitle } from "@/lib/mdx/source-link";

describe("parseSourceTitle", () => {
  it("parses a line-range title into file path, URL, and label", () => {
    const result = parseSourceTitle("template-generator/js/main.js#L594-L621");
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.filePath).toBe("template-generator/js/main.js");
    expect(result.href).toBe(
      "https://github.com/hallmanm/michaelwhallman/blob/main/public/demo-src/template-generator/js/main.js#L594-L621",
    );
    expect(result.label).toBe("View source on GitHub (lines 594-621)");
  });

  it("parses a single-line title (no end line)", () => {
    const result = parseSourceTitle("regex/js/main.js#L42");
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.filePath).toBe("regex/js/main.js");
    expect(result.href).toBe(
      "https://github.com/hallmanm/michaelwhallman/blob/main/public/demo-src/regex/js/main.js#L42",
    );
    expect(result.label).toBe("View source on GitHub (line 42)");
  });

  it("returns null for titles without a line anchor", () => {
    expect(parseSourceTitle("plain-file.js")).toBeNull();
    expect(parseSourceTitle("nested/path/file.css")).toBeNull();
  });

  it("returns null for malformed line anchors", () => {
    expect(parseSourceTitle("file.js#L")).toBeNull();
    expect(parseSourceTitle("file.js#42")).toBeNull(); // missing the L prefix
    expect(parseSourceTitle("file.js#Lfoo")).toBeNull();
  });

  it("handles paths with nested subdirectories", () => {
    const result = parseSourceTitle("experiment-visibility/js/debugger.js#L568-L624");
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.filePath).toBe("experiment-visibility/js/debugger.js");
    expect(result.href).toContain("experiment-visibility/js/debugger.js#L568-L624");
  });

  it("handles CSS file paths too", () => {
    const result = parseSourceTitle("template-generator/css/main.css#L13-L84");
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.filePath).toBe("template-generator/css/main.css");
    expect(result.href).toContain("template-generator/css/main.css#L13-L84");
  });
});
