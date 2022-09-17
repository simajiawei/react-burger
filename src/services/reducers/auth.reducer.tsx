import { AuthStateInterface } from './auth.state.interface';
import { Reducer } from 'redux';
import { AuthActions } from '../actions/auth.actions.interface';
import { SET_USER } from '../actions/auth.actions';

export const initialState: AuthStateInterface = {
  user: null,
  refreshToken: null,
  accessToken: null
};
export const authReducer: Reducer<AuthStateInterface, AuthActions> = (
  state = initialState,
  action: AuthActions
): AuthStateInterface => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        user: action.data.user
      };
    default:
      return state;
  }
};
