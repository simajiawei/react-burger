import { Action } from 'redux';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DESELECT_INGREDIENT,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SELECT_INGREDIENT,
  SET_NEW_ORDER,
  UPDATE_INGREDIENTS
} from './index';

export interface IngredientsActionInterface extends Action<typeof UPDATE_INGREDIENTS> {
  items: IngredientInterface[];
}

export interface SelectIngredientActionInterface extends Action<typeof SELECT_INGREDIENT> {
  item: IngredientInterface;
}

export interface SetNewOrderActionInterface extends Action<typeof SET_NEW_ORDER> {
  orderNumber: number;
}

export interface AddIngredientToConstructorInterface extends Action<typeof ADD_INGREDIENT_TO_CONSTRUCTOR> {
  id: string;
}

export interface RemoveIngredientFromConstructorInterface extends Action<typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR> {
  id: string;
}

export type BURGER_ACTIONS =
  | Action<typeof DESELECT_INGREDIENT>
  | IngredientsActionInterface
  | SelectIngredientActionInterface
  | SetNewOrderActionInterface
  | AddIngredientToConstructorInterface
  | RemoveIngredientFromConstructorInterface;
