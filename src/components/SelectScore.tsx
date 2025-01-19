import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import scoreMarkdown from "../assets/content/score.md?raw";

interface Score {
  value: string;
  label: string;
}

interface SelectScoreProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

const parseScoreMarkdown = (markdown: string): Score[] => {
  const scores: Score[] = [];
  const sections = markdown.split("\n## ").slice(1);

  sections.forEach((section) => {
    const titleLine = section.split("\n")[0].trim();
    const titleMatch = titleLine.match(/(\d+)\.\s+(.+)/);

    if (titleMatch) {
      const [, value, title] = titleMatch;
      scores.push({
        value,
        label: `${value} - ${title}`,
      });
    }
  });

  return scores;
};

export const SelectScore = forwardRef<HTMLSelectElement, SelectScoreProps>(
  (
    { value, onChange, name, label, disabled = false, error, required = false },
    ref
  ) => {
    const [scores, setScores] = useState<Score[]>([]);

    useEffect(() => {
      const parsedScores = parseScoreMarkdown(scoreMarkdown);
      setScores(parsedScores);
    }, []);

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-gray-700 font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`
            px-3 py-2
            border rounded-md
            ${error ? "border-red-500" : "border-gray-300"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-transparent
            transition-colors
            w-full
          `}
        >
          <option value="" disabled>
            Wybierz ocenę
          </option>
          {scores.map((score) => (
            <option key={score.value} value={score.value}>
              {score.label}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

SelectScore.displayName = "SelectScore";
