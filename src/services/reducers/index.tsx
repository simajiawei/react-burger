import { Action, combineReducers } from 'redux';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { NewOrderInterface } from '../../interfaces/new-order.interface';
import {
  AppActions,
  BURGER_ACTIONS,
  DESELECT_INGREDIENT,
  IngredientsActionInterface,
  SET_NEW_ORDER,
  SELECT_INGREDIENT,
  SelectIngredientActionInterface,
  UPDATE_CONSTRUCTOR_INGREDIENTS,
  UPDATE_INGREDIENTS,
  SetNewOrderActionInterface
} from '../actions';

export interface RootStateInterface {
  ingredients: IngredientInterface[];
  constructorIngredients: IngredientInterface[];
  selectedIngredient: IngredientInterface | null;
  order: number | null;
}

export const initialState: RootStateInterface = {
  ingredients: [],
  constructorIngredients: [],
  selectedIngredient: null,
  order: null
};

const burgerReducer = (state = initialState, action: AppActions): RootStateInterface => {
  switch (action.type) {
    case SET_NEW_ORDER:
      action = action as SetNewOrderActionInterface;
      return {
        ...state,
        order: action.orderNumber
      };
    case SELECT_INGREDIENT:
      action = action as SelectIngredientActionInterface;
      return {
        ...state,
        selectedIngredient: action.item
      };
    case DESELECT_INGREDIENT:
      return {
        ...state,
        selectedIngredient: null
      };
    case UPDATE_CONSTRUCTOR_INGREDIENTS:
      return {
        ...state
      };
    case UPDATE_INGREDIENTS:
      action = action as IngredientsActionInterface;
      return {
        ...state,
        ingredients: action.items
      };
    default:
      return initialState;
  }
};

export const rootReducer = combineReducers({ burgerReducer });
