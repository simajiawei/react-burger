import { AppThunk } from '../store';
import { checkResponse } from '../../utils/check-response';
import { logoutUrl, signInUrl, signUpApiUrl, userApiUrl } from '../../utils/app.constants';
import { SignUpResponseInterface } from '../../interfaces/responses/sign-up-response.interface';
import { NewUserInterface } from '../../interfaces/models/new-user.interface';
import { CredentialsInterface } from '../../interfaces/models/credentials.interface';
import { SignInResponseInterface } from '../../interfaces/responses/sign-in-response.interface';
import { getTokenFromLS } from '../../utils/token';
import { LogoutResponseInterface } from '../../interfaces/responses/logout-response.interface';
import { ContentTypeJsonHeader, getAuthHeader } from '../../utils/http-headers';
import { GetUserResponseInterface } from '../../interfaces/responses/get-user-response.interface';
import { UserInterface } from '../../interfaces/models/user.interface';
import { UpdateUserResponseInterface } from '../../interfaces/responses/update-user-response.interface';

export const UPDATE_TOKENS = 'UPDATE_TOKENS';
export const SET_AUTH = 'SET_AUTH';
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
        dispatch({
          type: SET_AUTH,
          data: responseData
        });
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
        dispatch({
          type: SET_AUTH,
          data: responseData
        });
      })
      .catch((error) => {
        console.error('Error signIn', error);
      });
  };
}

export function logout(cb: Function): AppThunk {
  return function (dispatch) {
    const body = {
      token: getTokenFromLS('refreshToken')
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
        dispatch({
          type: UNSET_USER
        });
        cb();
      })
      .catch((error) => {
        console.error('Error logout', error);
      });
  };
}

export function getUser(): AppThunk {
  return function (dispatch) {
    fetch(userApiUrl, {
      headers: {
        ...getAuthHeader()
      }
    })
      .then<GetUserResponseInterface>(checkResponse)
      .then((responseData) => {
        dispatch({
          type: SET_USER,
          data: responseData
        });
      })
      .catch((error) => {
        console.log('Error get user', error);
      });
  };
}

export function updateUser(user: UserInterface): AppThunk {
  return function (dispatch) {
    fetch(userApiUrl, {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        ...getAuthHeader(),
        ...ContentTypeJsonHeader
      }
    })
      .then<UpdateUserResponseInterface>(checkResponse)
      .then((responseData) => {
        dispatch({
          type: SET_USER,
          data: responseData
        });
      })
      .catch((error) => {
        console.log('Error update user', error);
      });
  };
}
