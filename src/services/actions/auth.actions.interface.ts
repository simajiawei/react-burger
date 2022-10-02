import { Action } from 'redux';
import { SET_IS_LOGGED_IN, SET_USER, UNSET_USER } from './auth.actions';
import { UserInterface } from '../../interfaces/models/user.interface';

export interface SetUserInterface extends Action<typeof SET_USER> {
  user: UserInterface;
}
export interface SetIsLoggedInInterface extends Action<typeof SET_IS_LOGGED_IN> {
  isLoggedIn: boolean;
}
export type AuthActions = SetUserInterface | SetIsLoggedInInterface | Action<typeof UNSET_USER>;
