export interface UserProfile {
  id: number;
  userId: number;
  openid: string;
  spicyLevel: number;
  preferredTastes: string[];
  dislikedTastes: string[];
  favoriteIngredients: string[];
  dislikedIngredients: string[];
  commonIngredients: string[];
  preferredCookingTimeMinutes: number;
  preferredDifficulty: 'easy' | 'medium' | 'hard';
  cookingTools: string[];
  healthGoal: string;
  preferenceSummary: string;
  totalGenerated: number;
  totalLiked: number;
  totalCooked: number;
  totalSaved: number;
}
