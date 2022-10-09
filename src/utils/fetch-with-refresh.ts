import { checkResponse } from './check-response';
import { updateTokenUrl } from './app.constants';
import { ContentTypeJsonHeader, getAuthHeader } from './http-headers';
import { getTokenFromLS, REFRESH_TOKEN, saveTokens } from './browser-storage';
import { RefreshTokenResponseInterface } from '../interfaces/responses/refresh-token-response.interface';
import { TokensInterface } from '../interfaces/models/tokens.interface';

export const refreshTokenRequest = (): Promise<unknown> => {
  return fetch(updateTokenUrl, {
    method: 'POST',
    headers: {
      ...ContentTypeJsonHeader
    },
    body: JSON.stringify({
      token: getTokenFromLS(REFRESH_TOKEN)
    })
  })
    .then<RefreshTokenResponseInterface>(checkResponse)
    .then((tokens: TokensInterface) => {
      saveTokens(tokens);
    });
};

export const fetchWithRefresh = async <Response>(url: string, options: RequestInit): Promise<Response> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if ((err as Error).message === 'jwt expired') {
      await refreshTokenRequest();
      const response = await fetch(url, {
        ...options,
        headers: {
          ...getAuthHeader(),
          ...ContentTypeJsonHeader
        }
      });
      return await checkResponse(response);
    } else {
      return Promise.reject(err);
    }
  }
};
