interface BlogKeywordChipProps {
  keyword: string;
  isActive: boolean;
  onClick: () => void;
}

export const BlogKeywordChip = ({ keyword, isActive, onClick }: BlogKeywordChipProps) => {
  return (
    <button
      key={keyword}
      onClick={onClick}
      className={`px-2.5 py-0.5 text-sm md:text-base transition-all cursor-pointer font-semibold ${
        isActive ? "text-green-950 underline underline-offset-2" : "text-slate-800"
      }`}>
      #{keyword.toLocaleLowerCase()}
    </button>
  );
};
