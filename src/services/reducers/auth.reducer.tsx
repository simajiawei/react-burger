import { AuthStateInterface } from './auth.state.interface';
import { Reducer } from 'redux';
import { AuthActions } from '../actions/auth.actions.interface';
import { SET_USER, UNSET_USER } from '../actions/auth.actions';
import { deleteTokenFromLS, saveTokenToLS } from '../../utils/token';

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
      saveTokenToLS(action.data.refreshToken);
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        user: action.data.user
      };
    case UNSET_USER:
      deleteTokenFromLS();
      return initialState;
    default:
      return state;
  }
};
