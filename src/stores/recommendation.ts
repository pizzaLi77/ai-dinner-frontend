import { defineStore } from 'pinia';
import { generateDinner } from '../api/recommendation';
import type { GenerateDinnerRequest, GenerateDinnerResponse } from '../types/recommendation';

interface RecommendationState {
  lastRequest: GenerateDinnerRequest | null;
  currentResponse: GenerateDinnerResponse | null;
  loading: boolean;
}

export const useRecommendationStore = defineStore('recommendation', {
  state: (): RecommendationState => ({
    lastRequest: null,
    currentResponse: null,
    loading: false,
  }),
  actions: {
    async generate(request: GenerateDinnerRequest) {
      this.loading = true;
      this.lastRequest = request;
      try {
        this.currentResponse = await generateDinner(request);
        return this.currentResponse;
      } finally {
        this.loading = false;
      }
    },
    setResponse(response: GenerateDinnerResponse) {
      this.currentResponse = response;
    },
  },
});
