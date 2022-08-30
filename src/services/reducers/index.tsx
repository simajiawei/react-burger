import { combineReducers, Reducer } from 'redux';
import { ConstructorIngredientInterface, IngredientInterface } from '../../interfaces/ingredient.interface';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DESELECT_INGREDIENT,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SELECT_INGREDIENT,
  SET_NEW_ORDER,
  UPDATE_INGREDIENTS
} from '../actions';
import { BURGER_ACTIONS } from '../actions/actions.interface';
import { uniqueId } from '../../utils/generate-id';

export interface StoreInterface {
  burger: RootStateInterface;
}

export interface RootStateInterface {
  ingredients: IngredientInterface[];
  constructorIngredients: ConstructorIngredientInterface[];
  selectedIngredient: IngredientInterface | null;
  order: number | null;
}

export const initialState: RootStateInterface = {
  ingredients: [],
  constructorIngredients: [],
  selectedIngredient: null,
  order: null
};

const burgerReducer: Reducer<RootStateInterface, BURGER_ACTIONS> = (
  state = initialState,
  action: BURGER_ACTIONS
): RootStateInterface => {
  switch (action.type) {
    case SET_NEW_ORDER:
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
      console.log(action.id);
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient._id === action.id
            ? {
                ...ingredient,
                count: ingredient.count + 1
              }
            : ingredient
        ),
        constructorIngredients: [
          ...state.constructorIngredients,
          ...state.ingredients
            .filter((ingredient) => ingredient._id === action.id)
            .map((ingredient) => {
              return {
                ...ingredient,
                constructorId: uniqueId()
              };
            })
        ]
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
    default:
      return initialState;
  }
};

export const rootReducer = combineReducers<StoreInterface>({
  burger: burgerReducer
});
