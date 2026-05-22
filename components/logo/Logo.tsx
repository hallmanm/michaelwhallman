import { siteConfig } from "@/lib/site-config";
import s from "./Logo.module.scss";

export function Logo() {
  return (
    <div className={s.wrap}>
      <div className={s.mark}>
        <div className={s.fill} />
        <div className={s.letters}>
          <div className={`${s.letter} ${s.m}`}>
            <div className={`${s.bar} ${s.pl} ${s.pillar}`} />
            <div className={`${s.bar} ${s.ml}`} />
            <div className={`${s.bar} ${s.mr}`} />
            <div className={`${s.bar} ${s.pr} ${s.pillar}`} />
          </div>
          <div className={`${s.letter} ${s.w}`}>
            <div className={`${s.bar} ${s.pl} ${s.pillar}`} />
            <div className={`${s.bar} ${s.wl}`} />
            <div className={`${s.bar} ${s.wr}`} />
            <div className={`${s.bar} ${s.pr} ${s.pillar}`} />
          </div>
          <div className={`${s.letter} ${s.h}`}>
            <div className={`${s.bar} ${s.pl} ${s.pillar}`} />
            <div className={`${s.bar} ${s.hc}`} />
            <div className={`${s.bar} ${s.pr} ${s.pillar}`} />
          </div>
        </div>
      </div>
      <span className={s.name}>{siteConfig.name}</span>
    </div>
  );
}
