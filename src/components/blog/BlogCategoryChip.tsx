interface BlogCategoryChipProps {
  primaryColor: string;
  secondaryColor: string;
  category: string;
  isActive: boolean;
  onClick: () => void;
}

export const BlogCategoryChip = ({
  primaryColor,
  secondaryColor,
  category,
  isActive,
  onClick,
}: BlogCategoryChipProps) => {
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1 rounded-lg text-sm md:text-base font-medium border transition-all ${
        isActive ? "" : "bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200 hover:border-gray-400"
      }`}
      style={
        isActive
          ? {
              backgroundColor: `${primaryColor}1A`,
              borderColor: secondaryColor,
              color: "#111827",
            }
          : undefined
      }>
      {formattedCategory}
    </button>
  );
};
