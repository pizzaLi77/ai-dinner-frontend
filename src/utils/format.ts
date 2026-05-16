export function joinTags(tags?: string[]) {
  return tags && tags.length > 0 ? tags.join('、') : '暂无';
}

export function formatDateTime(value: string) {
  if (!value) return '';
  return value.replace('T', ' ').slice(0, 16);
}
