import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  DifficultyGauge,
  difficultyToAngle,
  arcPoint,
  easeInOutCubic,
  gaugeColor,
} from "@/components/work/DifficultyGauge";

describe("difficultyToAngle", () => {
  it("maps 0 to the empty (-90°) position", () => {
    expect(difficultyToAngle(0)).toBe(-90);
  });

  it("maps 5 to the top (0°) position", () => {
    expect(difficultyToAngle(5)).toBe(0);
  });

  it("maps 10 to the full (+90°) position", () => {
    expect(difficultyToAngle(10)).toBe(90);
  });

  it("scales linearly across the range", () => {
    expect(difficultyToAngle(2.5)).toBe(-45);
    expect(difficultyToAngle(7.5)).toBe(45);
  });

  it("clamps values above 10 to the full position", () => {
    expect(difficultyToAngle(15)).toBe(90);
  });

  it("clamps negative values to the empty position", () => {
    expect(difficultyToAngle(-3)).toBe(-90);
  });
});

describe("arcPoint", () => {
  it("returns the leftmost point at 180°", () => {
    const p = arcPoint(180);
    expect(p.x).toBeCloseTo(20);
    expect(p.y).toBeCloseTo(100);
  });

  it("returns the rightmost point at 0°", () => {
    const p = arcPoint(0);
    expect(p.x).toBeCloseTo(180);
    expect(p.y).toBeCloseTo(100);
  });

  it("returns the topmost point at 90°", () => {
    const p = arcPoint(90);
    expect(p.x).toBeCloseTo(100);
    expect(p.y).toBeCloseTo(20);
  });

  it("respects a custom radius", () => {
    const p = arcPoint(90, 50);
    expect(p.x).toBeCloseTo(100);
    expect(p.y).toBeCloseTo(50);
  });
});

describe("easeInOutCubic", () => {
  it("starts at 0", () => {
    expect(easeInOutCubic(0)).toBe(0);
  });

  it("ends at 1", () => {
    expect(easeInOutCubic(1)).toBe(1);
  });

  it("returns 0.5 at the midpoint", () => {
    expect(easeInOutCubic(0.5)).toBeCloseTo(0.5);
  });

  it("starts slow and ends slow (cubic curve)", () => {
    // At 25% time, eased progress should be below the linear midpoint
    expect(easeInOutCubic(0.25)).toBeLessThan(0.25);
    // At 75% time, eased progress should be above 0.75
    expect(easeInOutCubic(0.75)).toBeGreaterThan(0.75);
  });
});

describe("gaugeColor", () => {
  it("returns pure green at 0", () => {
    expect(gaugeColor(0)).toBe("rgb(74, 222, 128)");
  });

  it("returns pure yellow at 5", () => {
    expect(gaugeColor(5)).toBe("rgb(251, 191, 36)");
  });

  it("returns pure red at 10", () => {
    expect(gaugeColor(10)).toBe("rgb(248, 113, 113)");
  });

  it("interpolates between green and yellow in the lower half", () => {
    const color = gaugeColor(2.5);
    // Should be roughly halfway between green (74,222,128) and yellow (251,191,36)
    const match = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
    expect(match).toBeTruthy();
    if (match) {
      const [, r, g, b] = match;
      expect(parseInt(r)).toBeGreaterThan(74);
      expect(parseInt(r)).toBeLessThan(251);
      expect(parseInt(g)).toBeGreaterThan(191);
      expect(parseInt(g)).toBeLessThan(222);
      expect(parseInt(b)).toBeGreaterThan(36);
      expect(parseInt(b)).toBeLessThan(128);
    }
  });

  it("interpolates between yellow and red in the upper half", () => {
    const color = gaugeColor(7.5);
    const match = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
    expect(match).toBeTruthy();
    if (match) {
      const [, r, g, b] = match;
      // r should be close to 250 (stays high in yellow→red range)
      expect(parseInt(r)).toBeGreaterThan(245);
      // g should be between 113 (red) and 191 (yellow)
      expect(parseInt(g)).toBeGreaterThan(113);
      expect(parseInt(g)).toBeLessThan(191);
    }
  });

  it("clamps to green for negative values", () => {
    expect(gaugeColor(-5)).toBe("rgb(74, 222, 128)");
  });

  it("clamps to red for values above 10", () => {
    expect(gaugeColor(15)).toBe("rgb(248, 113, 113)");
  });
});

describe("<DifficultyGauge />", () => {
  it("renders the Difficulty label and value text", () => {
    render(<DifficultyGauge difficulty={7} />);
    expect(screen.getByText(/^difficulty$/i)).toBeInTheDocument();
    expect(screen.getByText("/10")).toBeInTheDocument();
  });

  it("sets the aria-label to the target value", () => {
    render(<DifficultyGauge difficulty={4} />);
    expect(screen.getByRole("img", { name: /difficulty 4 out of 10/i })).toBeInTheDocument();
  });

  it("sets --target-angle and --target-color CSS variables on the root", () => {
    const { container } = render(<DifficultyGauge difficulty={7} />);
    const root = container.querySelector(".difficulty-gauge") as HTMLElement;
    expect(root).toBeTruthy();
    expect(root.style.getPropertyValue("--target-angle")).toBe("36deg"); // 7 * 18 - 90
    expect(root.style.getPropertyValue("--target-color")).toMatch(/^rgb\(/);
  });

  it("renders an SVG with the gradient arc and needle", () => {
    const { container } = render(<DifficultyGauge difficulty={5} />);
    expect(container.querySelector("svg")).toBeTruthy();
    expect(container.querySelector(".difficulty-gauge__needle")).toBeTruthy();
    expect(container.querySelector("linearGradient#gauge-arc-gradient")).toBeTruthy();
  });

  it("starts with the displayed value at 0 before the IntersectionObserver fires", () => {
    const { container } = render(<DifficultyGauge difficulty={8} />);
    const value = container.querySelector(".difficulty-gauge__value");
    // The mock IntersectionObserver from setup never fires, so displayed stays at 0.
    expect(value?.textContent).toBe("0/10");
  });
});
