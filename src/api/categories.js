import { request } from './api';

export function getCategories() {
  return request('/api/categories');
}
