import { AppThunk } from '../store';
import { Dispatch } from 'redux';
import { checkResponse } from '../../utils/check-response';
import { logoutUrl, signInUrl, signUpApiUrl } from '../../utils/app.constants';
import { SignUpResponseInterface } from '../../interfaces/responses/sign-up-response.interface';
import { NewUserInterface } from '../../interfaces/requests/new-user.interface';
import { CredentialsInterface } from '../../interfaces/requests/credentials.interface';
import { SignInResponseInterface } from '../../interfaces/responses/sign-in-response.interface';
import { getTokenFromLS } from '../../utils/token';
import { LogoutResponseInterface } from '../../interfaces/responses/logout-response.interface';

export const UPDATE_TOKENS = 'UPDATE_TOKENS';
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function signUp(newUser: NewUserInterface): AppThunk {
  return function (dispatch: Dispatch) {
    fetch(signUpApiUrl, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then<SignUpResponseInterface>(checkResponse)
      .then((responseData) => {
        dispatch({
          type: SET_USER,
          data: responseData
        });
      })
      .catch((error) => {
        console.error('Error signUp', error);
      });
  };
}
export function signIn(credentials: CredentialsInterface): AppThunk {
  return function (dispatch: Dispatch) {
    fetch(signInUrl, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then<SignInResponseInterface>(checkResponse)
      .then((responseData) => {
        dispatch({
          type: SET_USER,
          data: responseData
        });
      })
      .catch((error) => {
        console.error('Error signIn', error);
      });
  };
}

export function logout(): AppThunk {
  return function (dispatch: Dispatch) {
    const body = {
      token: getTokenFromLS()
    };
    fetch(logoutUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then<LogoutResponseInterface>(checkResponse)
      .then((responseData) => {
        dispatch({
          type: UNSET_USER
        });
      })
      .catch((error) => {
        console.error('Error logout', error);
      });
  };
}
