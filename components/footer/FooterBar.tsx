import { SiBootstrap, SiClaude, SiNextdotjs, SiVercel } from "@icons-pack/react-simple-icons";
import { siteConfig } from "@/lib/site-config";

export function FooterBar() {
  return (
    <div className="mt-4 pt-3 border-top d-flex justify-content-between flex-wrap gap-2">
      <span suppressHydrationWarning>© {new Date().getFullYear()} {siteConfig.name}</span>
      <span className="d-inline-flex align-items-center gap-3 text-secondary small">
        <span className="d-inline-flex align-items-center gap-1"><SiNextdotjs size={12} /> Next.js</span>
        <span className="d-inline-flex align-items-center gap-1"><SiBootstrap size={12} /> Bootstrap</span>
        <span className="d-inline-flex align-items-center gap-1"><SiVercel size={12} /> Vercel</span>
        <span className="d-inline-flex align-items-center gap-1"><SiClaude size={12} /> Claude Code</span>
      </span>
    </div>
  );
}
