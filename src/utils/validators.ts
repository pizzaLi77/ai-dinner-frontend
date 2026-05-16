import type { GenerateDinnerRequest } from '../types/recommendation';

export function validateGenerateRequest(request: GenerateDinnerRequest) {
  const hasText = request.freeText.trim().length > 0;
  const hasTags = request.selectedMoods.length > 0
    || request.selectedTastes.length > 0
    || !!request.selectedTime
    || request.selectedTools.length > 0;
  if (!hasText && !hasTags) {
    return '告诉我家里有什么，或者今天想吃什么口味也可以。';
  }
  if (request.freeText.length > 500) {
    return '输入先控制在 500 字以内，我会更好理解。';
  }
  return '';
}
