const CATEGORY_COLORS: Record<string, string> = {
  "Education financière": "#82F65E",
  "Livrets d'épargne": "#F39EC5",
};

export const DEFAULT_CATEGORY_COLOR = "#D1D5DB";

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;
}
