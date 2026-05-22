import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));
import { Hero } from "@/components/home/Hero";
import { ImpactStrip } from "@/components/home/ImpactStrip";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Timeline } from "@/components/home/Timeline";
import { Recognition } from "@/components/home/Recognition";
import { Testimonials } from "@/components/home/Testimonials";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { FooterBar } from "@/components/footer/FooterBar";
import { FooterAI } from "@/components/footer/FooterAI";
import { siteConfig } from "@/lib/site-config";

describe("smoke renders", () => {
  it("renders Hero with the site tagline", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/let.s connect/i)).toBeInTheDocument();
  });

  it("renders ImpactStrip", () => {
    render(<ImpactStrip />);
    expect(screen.getByText(/the raw data/i)).toBeInTheDocument();
  });

  it("renders FeaturedWork with at least one case study", () => {
    render(<FeaturedWork />);
    expect(screen.getByText(/selected work/i)).toBeInTheDocument();
    expect(screen.getByText(/see all case studies/i)).toBeInTheDocument();
  });

  it("renders Timeline", () => {
    const { container } = render(<Timeline />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Recognition", () => {
    const { container } = render(<Recognition />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders Testimonials", () => {
    const { container } = render(<Testimonials />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders SiteNavbar", () => {
    const { container } = render(<SiteNavbar />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders SiteFooter with the current year and copyright holder", () => {
    render(<SiteFooter />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`${year}.*${siteConfig.name}`))).toBeInTheDocument();
  });

  it("renders FooterBar with tech stack badges", () => {
    const { container } = render(<FooterBar />);
    const badgeRow = container.querySelector(".text-secondary.small") as HTMLElement;
    expect(badgeRow).toBeTruthy();
    const badges = badgeRow.querySelectorAll(":scope > span");
    expect(badges).toHaveLength(4);
    const text = badgeRow.textContent ?? "";
    expect(text).toMatch(/Next\.js/);
    expect(text).toMatch(/Bootstrap/);
    expect(text).toMatch(/Vercel/);
    expect(text).toMatch(/Claude Code/);
  });

  it("renders FooterAI accordion with Claude Code and Codex CLI links", () => {
    render(<FooterAI />);
    expect(screen.getByText(/built in collaboration with ai/i)).toBeInTheDocument();
    const claudeLink = screen.getByRole("link", { name: /claude code/i });
    expect(claudeLink).toHaveAttribute("href", "https://claude.ai/code");
    const codexLink = screen.getByRole("link", { name: /codex cli/i });
    expect(codexLink).toHaveAttribute("href", "https://github.com/openai/codex");
  });
});
