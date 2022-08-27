import { checkResponse } from '../../utils/check-response';
import { apiBaseUrl } from '../../utils/app.constants';
import { IngrediendsResponseInterface } from '../../interfaces/ingredients-response.interface';
import { Action, Dispatch } from 'redux';
import { IngredientInterface } from '../../interfaces/ingredient.interface';

export type BURGER_ACTIONS =
  | typeof UPDATE_INGREDIENTS
  | typeof UPDATE_CONSTRUCTOR_INGREDIENTS
  | typeof SELECT_INGREDIENT
  | typeof DESELECT_INGREDIENT
  | typeof MAKE_ORDER;

export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'UPDATE_CONSTRUCTOR_INGREDIENTS';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const MAKE_ORDER = 'MAKE_ORDER';
export const DESELECT_INGREDIENT = 'DESELECT_INGREDIENT';

export type AppActions = IngredientsActionInterface;

export interface IngredientsActionInterface extends Action<BURGER_ACTIONS> {
  items: IngredientInterface[];
}

const ingredientsApiUrl = `${apiBaseUrl}/ingredients`;
export function getIngredients() {
  return function (dispatch: Dispatch<IngredientsActionInterface>) {
    fetch(ingredientsApiUrl)
      .then<IngrediendsResponseInterface>(checkResponse)
      .then((responseData) => {
        dispatch({
          type: UPDATE_INGREDIENTS,
          items: responseData.data
        });
      })
      .catch((error) => {
        console.error('Error fetching ingredients', error);
      });
  };
}
