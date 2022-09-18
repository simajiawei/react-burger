import { AuthStateInterface } from './auth.state.interface';
import { Reducer } from 'redux';
import { AuthActions } from '../actions/auth.actions.interface';
import { SET_AUTH, SET_USER, UNSET_USER } from '../actions/auth.actions';
import { deleteTokensFromLS, saveTokensToLS } from '../../utils/token';

export const initialState: AuthStateInterface = {
  user: null
};
export const authReducer: Reducer<AuthStateInterface, AuthActions> = (
  state = initialState,
  action: AuthActions
): AuthStateInterface => {
  switch (action.type) {
    case SET_AUTH:
      saveTokensToLS({
        refreshToken: action.data.refreshToken,
        accessToken: action.data.accessToken
      });
      return {
        ...state,
        user: action.data.user
      };
    case SET_USER:
      return {
        ...state,
        user: action.data.user
      };
    case UNSET_USER:
      deleteTokensFromLS();
      return {
        ...initialState
      };
    default:
      return state;
  }
};
