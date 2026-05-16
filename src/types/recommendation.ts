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
  neutral: boolean;
  addToToday: boolean;
  tooHard: boolean;
  tooLight: boolean;
  tooOily: boolean;
}

export interface DinnerRecommendation {
  id: number;
  sessionId: number;
  type: 'easy' | 'satisfying' | 'healthy';
  typeLabel: '最省事' | '最满足' | '最健康';
  name: string;
  reason: string;
  estimatedTimeMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredientsUsed: string[];
  missingIngredients: MissingIngredient[];
  steps: string[];
  substitutions: string[];
  tags: string[];
  coverImageUrl?: string | null;
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
  profileSummary: string;
}

export interface FavoriteDish {
  id: number;
  recommendationId: number;
  sourceSessionId: number;
  name: string;
  summary: string;
  tags: string[];
  estimatedTimeMinutes: number;
  ingredientsUsed: string[];
  steps: string[];
  coverImageUrl?: string | null;
  createdAt: string;
}

export interface TodayDinnerPlanItem {
  id: number;
  planDate: string;
  sourceType: 'favorite' | 'recommendation' | 'manual';
  sourceId: number;
  dishName: string;
  tags: string[];
  status: 'planned' | 'cooked' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface HistoryGroupItem {
  sessionId: number;
  inputSummary: string;
  recommendationSummary: string;
  feedbackSummary: string;
}

export interface HistoryGroup {
  dateLabel: string;
  items: HistoryGroupItem[];
}

export interface PageResponse<T> {
  records: T[];
  page: number;
  pageSize: number;
  total: number;
}

export interface GroupedHistoryResponse {
  groups: HistoryGroup[];
  page: number;
  pageSize: number;
  total: number;
}
