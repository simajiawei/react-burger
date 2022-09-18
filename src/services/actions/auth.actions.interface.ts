import { Action } from 'redux';
import { SET_AUTH, SET_USER, UNSET_USER, UPDATE_TOKENS } from './auth.actions';
import { SignUpResponseInterface } from '../../interfaces/responses/sign-up-response.interface';
import { GetUserResponseInterface } from '../../interfaces/responses/get-user-response.interface';

export interface SetAuthInterface extends Action<typeof SET_AUTH> {
  data: SignUpResponseInterface;
}

export interface SetUserInterface extends Action<typeof SET_USER> {
  data: GetUserResponseInterface;
}

export type AuthActions =
  | Action<typeof UPDATE_TOKENS>
  | SetAuthInterface
  | SetUserInterface
  | Action<typeof UNSET_USER>;
