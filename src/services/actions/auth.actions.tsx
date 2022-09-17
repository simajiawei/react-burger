import { AppThunk } from '../store';
import { Dispatch } from 'redux';
import { checkResponse } from '../../utils/check-response';
import { signUpApiUrl } from '../../utils/app.constants';
import { SignUpResponseInterface } from '../../interfaces/responses/sign-up-response.interface';
import { NewUserInterface } from '../../interfaces/requests/new-user.interface';

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
