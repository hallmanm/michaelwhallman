import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom doesn't implement IntersectionObserver. Components that rely on it
// (e.g., DifficultyGauge) need a stub so they don't throw on mount.
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds: ReadonlyArray<number> = [];
}

if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  // @ts-expect-error — assign mock onto window for tests
  window.IntersectionObserver = MockIntersectionObserver;
}

afterEach(() => {
  cleanup();
});
