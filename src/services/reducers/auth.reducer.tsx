import { AuthStateInterface } from './auth.state.interface';
import { Reducer } from 'redux';
import { AuthActions } from '../actions/auth.actions.interface';
import { SET_USER, UNSET_USER, SET_IS_LOGGED_IN } from '../actions/auth.actions';

export const initialState: AuthStateInterface = {
  user: null,
  isLoggedIn: null
};
export const authReducer: Reducer<AuthStateInterface, AuthActions> = (
  state = initialState,
  action: AuthActions
): AuthStateInterface => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true
      };
    case UNSET_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    default:
      return state;
  }
};
