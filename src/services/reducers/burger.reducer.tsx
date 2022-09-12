import { combineReducers, Reducer } from 'redux';
import { ConstructorIngredientInterface, IngredientInterface } from '../../interfaces/ingredient.interface';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DESELECT_INGREDIENT,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SELECT_INGREDIENT,
  SET_NEW_ORDER_SUCCESS,
  UPDATE_CONSTRUCTOR_ELEMENTS,
  UPDATE_INGREDIENTS,
  CLEAR_CONSTRUCTOR_ELEMENTS,
  SET_NEW_ORDER
} from '../actions/burger.actions';
import { BURGER_ACTIONS } from '../actions/burger.actions.interface';
import { CategoryKey } from '../../enums/category-key.enum';

export interface StoreInterface {
  burger: RootStateInterface;
}

export interface RootStateInterface {
  ingredients: IngredientInterface[];
  constructorIngredients: ConstructorIngredientInterface[];
  selectedIngredient: IngredientInterface | null;
  order: number | null;
  orderIsProcessing: boolean;
}

export const initialState: RootStateInterface = {
  ingredients: [],
  constructorIngredients: [],
  selectedIngredient: null,
  order: null,
  orderIsProcessing: false
};

export const burgerReducer: Reducer<RootStateInterface, BURGER_ACTIONS> = (
  state = initialState,
  action: BURGER_ACTIONS
): RootStateInterface => {
  switch (action.type) {
    case SET_NEW_ORDER:
      return {
        ...state,
        orderIsProcessing: action.isProcessing
      };
    case SET_NEW_ORDER_SUCCESS:
      return {
        ...state,
        order: action.orderNumber
      };

    case SELECT_INGREDIENT:
      return {
        ...state,
        selectedIngredient: action.item
      };
    case DESELECT_INGREDIENT:
      return {
        ...state,
        selectedIngredient: null
      };
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      let constructorIngredients = [...state.constructorIngredients];
      let ingredients = [...state.ingredients];
      const newConstructorIngredient = {
        ...(ingredients.find((ingredient) => ingredient._id === action.id) as IngredientInterface),
        constructorId: action.constructorId
      };
      if (newConstructorIngredient.type === CategoryKey.BUN) {
        let pos = constructorIngredients.findIndex((ingredient) => ingredient.type === CategoryKey.BUN);
        let deleteCount = 1;
        if (pos === -1) {
          pos = 0;
          deleteCount = 0;
        }
        constructorIngredients.splice(pos, deleteCount, newConstructorIngredient);
        ingredients = ingredients.map((ingredient) =>
          ingredient.type === CategoryKey.BUN
            ? {
                ...ingredient,
                count: 0
              }
            : ingredient
        );
      } else {
        constructorIngredients.push(newConstructorIngredient);
      }
      return {
        ...state,
        ingredients: ingredients.map((ingredient) =>
          ingredient._id === action.id
            ? {
                ...ingredient,
                count: ingredient.count + 1
              }
            : ingredient
        ),
        constructorIngredients
      };
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient._id === action.id
            ? {
                ...ingredient,
                count: ingredient.count - 1
              }
            : ingredient
        ),
        constructorIngredients: state.constructorIngredients.filter(
          (item) => item.constructorId !== action.constructorId
        )
      };
    case UPDATE_INGREDIENTS:
      return {
        ...state,
        ingredients: action.items.map((item) => {
          return {
            ...item,
            count: 0
          };
        })
      };
    case UPDATE_CONSTRUCTOR_ELEMENTS:
      return {
        ...state,
        // храним булку всегда в топе и вседа одну
        constructorIngredients: [state.constructorIngredients[0], ...action.items]
      };
    case CLEAR_CONSTRUCTOR_ELEMENTS:
      return {
        ...state,
        constructorIngredients: []
      };

    default:
      return state;
  }
};
