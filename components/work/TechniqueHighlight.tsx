import type { ReactNode } from "react";
import { DifficultyGauge } from "./DifficultyGauge";

interface TechniqueHighlightProps {
  technique: string;
  difficulty: string;
  children: ReactNode;
}

function parseDifficulty(s: string): number {
  const m = s.match(/^(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}

export function TechniqueHighlight({ technique, difficulty, children }: TechniqueHighlightProps) {
  return (
    <div className="technique-card">
      <div className="technique-card__header">
        <div className="technique-card__field">
          <span className="technique-card__label">Technique</span>
          <span className="technique-card__value">{technique}</span>
        </div>
        <div className="technique-card__field technique-card__field--rating">
          <DifficultyGauge difficulty={parseDifficulty(difficulty)} />
        </div>
      </div>
      <div className="technique-card__body">{children}</div>
    </div>
  );
}
