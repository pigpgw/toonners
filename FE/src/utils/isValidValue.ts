import { RecommendToonConfig } from "@/slices/useRecommendationStore";

export const isValidValue = (content: string | RecommendToonConfig[], warningComent: string) => {
  if (content.length === 0) {
    alert(warningComent);
    return false;
  }
  return true;
};
