import { request } from './api';

export function getAnimals({
  page = 1,
  limit = 10,
  species,
  categoryId,
  sortName,
  sortDirect,
} = {}) {
  const params = new URLSearchParams({
    page,
    limit,
    ...(species && { species }),
    ...(categoryId && { categoryId }),
    ...(sortName && { sortName }),
    ...(sortDirect && { sortDirect }),
  });

  return request(`/api/animals?${params.toString()}`);
}