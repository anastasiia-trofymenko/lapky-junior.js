import { request } from './api';

export function createOrder(data) {
  return request('/api/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
