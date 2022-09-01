import { Action } from 'redux';
import {
  ConstructorIngredientInterface,
  IngredientInterface,
  IngredientResponseInterface
} from '../../interfaces/ingredient.interface';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR_ELEMENTS,
  DESELECT_INGREDIENT,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SELECT_INGREDIENT,
  SET_NEW_ORDER,
  UPDATE_CONSTRUCTOR_ELEMENTS,
  UPDATE_INGREDIENTS
} from './index';

export interface IngredientsActionInterface extends Action<typeof UPDATE_INGREDIENTS> {
  items: IngredientResponseInterface[];
}

export interface SelectIngredientActionInterface extends Action<typeof SELECT_INGREDIENT> {
  item: IngredientInterface;
}

export interface SetNewOrderActionInterface extends Action<typeof SET_NEW_ORDER> {
  orderNumber: number;
}

export interface AddIngredientToConstructorInterface extends Action<typeof ADD_INGREDIENT_TO_CONSTRUCTOR> {
  id: string;
  constructorId: string;
}

export interface RemoveIngredientFromConstructorInterface extends Action<typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR> {
  id: string;
  constructorId: string;
}

export interface UpdateConstructorElementsInterface extends Action<typeof UPDATE_CONSTRUCTOR_ELEMENTS> {
  items: ConstructorIngredientInterface[];
}

export type BURGER_ACTIONS =
  | Action<typeof DESELECT_INGREDIENT>
  | Action<typeof CLEAR_CONSTRUCTOR_ELEMENTS>
  | IngredientsActionInterface
  | SelectIngredientActionInterface
  | SetNewOrderActionInterface
  | AddIngredientToConstructorInterface
  | RemoveIngredientFromConstructorInterface
  | UpdateConstructorElementsInterface;
