import { checkResponse } from './check-response';
import { updateTokenUrl } from './app.constants';
import { ContentTypeJsonHeader } from './http-headers';
import { getTokenFromLS, saveTokensToLS } from './token';
import { RefreshTokenResponseInterface } from '../interfaces/responses/refresh-token-response.interface';

export const refreshTokenRequest = () => {
  return fetch(updateTokenUrl, {
    method: 'POST',
    headers: {
      ...ContentTypeJsonHeader
    },
    body: JSON.stringify({
      token: getTokenFromLS('refreshToken')
    })
  }).then<RefreshTokenResponseInterface>(checkResponse);
};

export const fetchWithRefresh = async <Response>(url: string, options: any): Promise<Response> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if ((err as Error).message === 'jwt expired') {
      const { accessToken, refreshToken } = await refreshTokenRequest();
      saveTokensToLS({ accessToken, refreshToken });

      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          authorization: accessToken
        }
      });
      return await checkResponse(response);
    } else {
      return Promise.reject(err);
    }
  }
};
