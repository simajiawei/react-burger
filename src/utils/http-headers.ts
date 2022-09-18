import { getTokenFromLS } from './token';

export function getAuthHeader(): HeadersInit {
  const accessToken = getTokenFromLS('accessToken');
  return {
    Authorization: `${accessToken}`
  };
}
export const ContentTypeJsonHeader = {
  'Content-Type': 'application/json'
};
