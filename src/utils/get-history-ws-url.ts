import { ACCESS_TOKEN, getCookie } from './browser-storage';
import { ordersHistoryUrl } from './app.constants';

export const getHistoryWsUrl = (): string => {
  const token = getCookie(ACCESS_TOKEN)?.replace('Bearer ', '');
  return `${ordersHistoryUrl}?token=${token}`;
};
