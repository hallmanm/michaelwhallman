import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  TechniqueHighlight,
  parseDifficulty,
} from "@/components/work/TechniqueHighlight";

describe("parseDifficulty", () => {
  it("extracts the leading integer from N/10 form", () => {
    expect(parseDifficulty("7/10")).toBe(7);
    expect(parseDifficulty("4/10")).toBe(4);
    expect(parseDifficulty("10/10")).toBe(10);
  });

  it("supports decimal values", () => {
    expect(parseDifficulty("7.5/10")).toBe(7.5);
  });

  it("returns 0 for unparseable input", () => {
    expect(parseDifficulty("hard")).toBe(0);
    expect(parseDifficulty("")).toBe(0);
  });

  it("ignores trailing text after the number", () => {
    expect(parseDifficulty("8 out of 10")).toBe(8);
  });
});

describe("<TechniqueHighlight />", () => {
  it("renders the technique name in the header", () => {
    render(
      <TechniqueHighlight technique="Sweep-line interval segmentation" difficulty="8/10">
        <p>body</p>
      </TechniqueHighlight>,
    );
    expect(screen.getByText("Sweep-line interval segmentation")).toBeInTheDocument();
  });

  it("renders the children inside the card body", () => {
    render(
      <TechniqueHighlight technique="X" difficulty="5/10">
        <p data-testid="body-content">Body explanation</p>
      </TechniqueHighlight>,
    );
    expect(screen.getByTestId("body-content")).toBeInTheDocument();
    expect(screen.getByText("Body explanation")).toBeInTheDocument();
  });

  it("forwards the parsed difficulty to the gauge (target-angle reflects value)", () => {
    const { container } = render(
      <TechniqueHighlight technique="X" difficulty="7/10">
        <p>body</p>
      </TechniqueHighlight>,
    );
    const gauge = container.querySelector(".difficulty-gauge") as HTMLElement;
    expect(gauge).toBeTruthy();
    expect(gauge.style.getPropertyValue("--target-angle")).toBe("36deg");
  });

  it("renders the Difficulty label inside the gauge (not duplicated outside)", () => {
    render(
      <TechniqueHighlight technique="X" difficulty="6/10">
        <p>body</p>
      </TechniqueHighlight>,
    );
    // The "Difficulty" label is inside the gauge, not a sibling.
    const labels = screen.getAllByText(/^difficulty$/i);
    expect(labels).toHaveLength(1);
  });
});
