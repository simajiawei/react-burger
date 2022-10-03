import { AppThunk } from '../store';
import { checkResponse } from '../../utils/check-response';
import { logoutUrl, signInUrl, signUpApiUrl, userApiUrl } from '../../utils/app.constants';
import { SignUpResponseInterface } from '../../interfaces/responses/sign-up-response.interface';
import { NewUserInterface } from '../../interfaces/models/new-user.interface';
import { CredentialsInterface } from '../../interfaces/models/credentials.interface';
import { SignInResponseInterface } from '../../interfaces/responses/sign-in-response.interface';
import { deleteTokens, getTokenFromLS, REFRESH_TOKEN, saveTokens } from '../../utils/browser-storage';
import { LogoutResponseInterface } from '../../interfaces/responses/logout-response.interface';
import { ContentTypeJsonHeader, getAuthHeader } from '../../utils/http-headers';
import { GetUserResponseInterface } from '../../interfaces/responses/get-user-response.interface';
import { UserInterface } from '../../interfaces/models/user.interface';
import { UpdateUserResponseInterface } from '../../interfaces/responses/update-user-response.interface';
import { fetchWithRefresh, refreshTokenRequest } from '../../utils/fetch-with-refresh';
import { SetUserInterface } from './auth.actions.interface';

export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function signUp(newUser: NewUserInterface): AppThunk {
  return function (dispatch) {
    fetch(signUpApiUrl, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        ...ContentTypeJsonHeader
      }
    })
      .then<SignUpResponseInterface>(checkResponse)
      .then((responseData) => {
        dispatch(setAuth(responseData));
      })
      .catch((error) => {
        console.error('Error signUp', error);
      });
  };
}
export function signIn(credentials: CredentialsInterface): AppThunk {
  return function (dispatch) {
    fetch(signInUrl, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        ...ContentTypeJsonHeader
      }
    })
      .then<SignInResponseInterface>(checkResponse)
      .then((responseData) => {
        dispatch(setAuth(responseData));
      })
      .catch((error) => {
        console.error('Error signIn', error);
      });
  };
}

export function updateToken(): AppThunk {
  return function (dispatch) {
    refreshTokenRequest()
      .then(() => {
        dispatch(setIsLoggedIn(true));
      })
      .catch((error) => {
        console.error('Error updateToken', error);
      });
  };
}

export function logout(cb: Function): AppThunk {
  return function (dispatch) {
    const body = {
      token: getTokenFromLS(REFRESH_TOKEN)
    };
    fetch(logoutUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        ...ContentTypeJsonHeader
      }
    })
      .then<LogoutResponseInterface>(checkResponse)
      .then((responseData) => {
        dispatch(unsetUser());
        cb();
      })
      .catch((error) => {
        console.error('Error logout', error);
      });
  };
}

export function getUser(): AppThunk {
  return function (dispatch) {
    fetchWithRefresh<GetUserResponseInterface>(userApiUrl, {
      headers: {
        ...getAuthHeader()
      }
    })
      .then((responseData) => {
        dispatch(setUser(responseData.user));
      })
      .catch((error) => {
        console.log('Error get user', error);
      });
  };
}

export function updateUser(user: UserInterface): AppThunk {
  return function (dispatch) {
    fetchWithRefresh<UpdateUserResponseInterface>(userApiUrl, {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        ...getAuthHeader(),
        ...ContentTypeJsonHeader
      }
    })
      .then((responseData) => {
        dispatch(setUser(responseData.user));
      })
      .catch((error) => {
        console.log('Error update user', error);
      });
  };
}

// action creators

export function setIsLoggedIn(isLoggedIn: boolean) {
  return {
    type: SET_IS_LOGGED_IN,
    isLoggedIn
  };
}

export function setAuth(data: SignInResponseInterface): SetUserInterface {
  const { accessToken, refreshToken } = data;
  saveTokens({ accessToken, refreshToken });
  return setUser(data.user);
}

export function setUser(user: UserInterface): SetUserInterface {
  return {
    type: SET_USER,
    user
  };
}

export function unsetUser() {
  deleteTokens();
  return {
    type: UNSET_USER
  };
}
