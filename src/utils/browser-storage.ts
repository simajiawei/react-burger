import { TokensInterface } from '../interfaces/models/tokens.interface';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export function saveTokens(tokens: TokensInterface): void {
  saveTokenToLS(REFRESH_TOKEN, tokens.refreshToken);
  setCookie(ACCESS_TOKEN, tokens.accessToken);
}

export function deleteTokens(): void {
  deleteTokenFromLS(REFRESH_TOKEN);
  deleteCookie(ACCESS_TOKEN);
}

export function setCookie(name: string, value: string, props: any = {}): void {
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}
export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  // Находим куку по ключу token, удаляем её значение,
  // устанавливаем отрицательное время жизни, чтобы удалить сам ключ token
  setCookie(name, '', { expires: -1 });
}

export function saveTokenToLS(name: string, token: string): void {
  localStorage.setItem(name, token);
}

export function getTokenFromLS(name: string): string | null {
  return localStorage.getItem(name);
}

export function deleteTokenFromLS(name: string): void {
  localStorage.removeItem(name);
}
