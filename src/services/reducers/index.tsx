import { Action, combineReducers } from 'redux';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { NewOrderInterface } from '../../interfaces/new-order.interface';
import {
  AppActions,
  BURGER_ACTIONS,
  DESELECT_INGREDIENT,
  IngredientsActionInterface,
  MAKE_ORDER,
  SELECT_INGREDIENT,
  UPDATE_CONSTRUCTOR_INGREDIENTS,
  UPDATE_INGREDIENTS
} from '../actions';

export interface RootStateInterface {
  ingredients: IngredientInterface[];
  constructorIngredients: IngredientInterface[];
  selectedIngredient: IngredientInterface | null;
  order: NewOrderInterface | null;
}

export const initialState: RootStateInterface = {
  ingredients: [],
  constructorIngredients: [],
  selectedIngredient: null,
  order: null
};

const burgerReducer = (state = initialState, action: AppActions): RootStateInterface => {
  switch (action.type) {
    case MAKE_ORDER:
      return {
        ...state
      };
    case SELECT_INGREDIENT:
      return {
        ...state
      };
    case DESELECT_INGREDIENT:
      return {
        ...state
      };
    case UPDATE_CONSTRUCTOR_INGREDIENTS:
      return {
        ...state
      };
    case UPDATE_INGREDIENTS:
      return {
        ...state,
        ingredients: (action as IngredientsActionInterface).items
      };
    default:
      return initialState;
  }
};

export const rootReducer = combineReducers({ burgerReducer });
