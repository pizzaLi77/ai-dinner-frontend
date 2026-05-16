export interface GenerateDinnerRequest {
  freeText: string;
  selectedMoods: string[];
  selectedTastes: string[];
  selectedTime: string | null;
  selectedTools: string[];
}

export interface MissingIngredient {
  name: string;
  optional: boolean;
}

export interface RecommendationFeedbackSummary {
  liked: boolean;
  disliked: boolean;
  saved: boolean;
  cooked: boolean;
  tooHard: boolean;
  tooLight: boolean;
  tooOily: boolean;
}

export interface DinnerRecommendation {
  id: number;
  sessionId: number;
  type: 'easy' | 'satisfying' | 'healthy';
  name: string;
  reason: string;
  estimatedTimeMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredientsUsed: string[];
  missingIngredients: MissingIngredient[];
  steps: string[];
  substitutions: string[];
  tags: string[];
  caution?: string;
  feedbackSummary?: RecommendationFeedbackSummary;
}

export interface GenerateDinnerResponse {
  sessionId: number;
  profileSummary: string;
  recommendations: DinnerRecommendation[];
}

export interface FeedbackResponse {
  success: boolean;
  updatedProfileSummary: string;
}

export interface FavoriteDish {
  id: number;
  recommendationId: number;
  name: string;
  tags: string[];
  estimatedTimeMinutes: number;
  ingredientsUsed: string[];
  steps: string[];
  createdAt: string;
}

export interface HistorySession {
  sessionId: number;
  freeText: string;
  selectedMoods: string[];
  selectedTastes: string[];
  selectedTime: string;
  selectedTools: string[];
  createdAt: string;
  recommendations: DinnerRecommendation[];
}

export interface PageResponse<T> {
  records: T[];
  page: number;
  pageSize: number;
  total: number;
}
