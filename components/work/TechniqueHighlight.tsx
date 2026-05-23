import type { ReactNode } from "react";

interface TechniqueHighlightProps {
  technique: string;
  difficulty: string;
  children: ReactNode;
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
          <span className="technique-card__label">Difficulty</span>
          <span className="technique-card__rating">{difficulty}</span>
        </div>
      </div>
      <div className="technique-card__body">{children}</div>
    </div>
  );
}
