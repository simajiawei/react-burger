export const TOKEN = 'token';

export function saveTokenToLS(token: string) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenFromLS() {
  return localStorage.getItem(TOKEN);
}

export function deleteTokenFromLS() {
  localStorage.removeItem(TOKEN);
}
