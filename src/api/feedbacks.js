import { request } from './api';

export function getFeedbacks({ page = 1, limit = 10 } = {}) {
  return request(`/api/feedbacks?page=${page}&limit=${limit}`);
}
