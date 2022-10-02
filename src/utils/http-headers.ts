import { ACCESS_TOKEN, getCookie } from './browser-storage';

export function getAuthHeader(): HeadersInit {
  const accessToken = getCookie(ACCESS_TOKEN);
  return {
    Authorization: `${accessToken}`
  };
}
export const ContentTypeJsonHeader = {
  'Content-Type': 'application/json'
};
