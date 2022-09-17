import { Action } from 'redux';
import { SET_USER, UNSET_USER, UPDATE_TOKENS } from './auth.actions';
import { UPDATE_INGREDIENTS } from './burger.actions';
import { IngredientResponseInterface } from '../../interfaces/models/ingredient.interface';
import { UserInterface } from '../../interfaces/models/user.interface';
import { SignUpResponseInterface } from '../../interfaces/responses/sign-up-response.interface';

export interface SetUserInterface extends Action<typeof SET_USER> {
  data: SignUpResponseInterface;
}

export type AuthActions = Action<typeof UPDATE_TOKENS> | SetUserInterface | Action<typeof UNSET_USER>;
