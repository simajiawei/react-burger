import { TokensInterface } from '../interfaces/models/tokens.interface';
export const TOKENS = 'TOKENS';

export function saveTokensToLS(tokens: TokensInterface) {
  localStorage.setItem(TOKENS, JSON.stringify(tokens));
}

export function getTokenFromLS(name: keyof TokensInterface): string | null {
  const tokensString = localStorage.getItem(TOKENS);
  if (!tokensString) {
    return null;
  }

  const tokens = JSON.parse(tokensString as string) as TokensInterface;
  return tokens[name];
}

export function deleteTokensFromLS() {
  localStorage.removeItem(TOKENS);
}
