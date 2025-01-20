import { FC } from "react";
import scoreMarkdown from "../assets/content/score.md?raw";

interface ScoreProps {
  value: string;
}

const getScoreLabel = (value: string): string => {
  const sections = scoreMarkdown.split("\n## ").slice(1);
  const section = sections[Number(value) - 1];

  if (!section) return "";

  const titleLine = section.split("\n")[0].trim();
  const titleMatch = titleLine.match(/(\d+)\.\s+(.+)/);

  return titleMatch ? titleMatch[2] : "";
};

export const Score: FC<ScoreProps> = ({ value }) => {
  const label = getScoreLabel(value);

  return (
    <div className="flex items-center gap-3 p-4 bg-[#F5DEB3] rounded-lg">
      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full font-bold text-2xl">
        {value}
      </div>
      <div className="text-lg font-medium">{label}</div>
    </div>
  );
};
