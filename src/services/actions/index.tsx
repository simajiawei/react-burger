import { checkResponse } from '../../utils/check-response';
import { apiBaseUrl } from '../../utils/app.constants';
import { IngrediendsResponseInterface } from '../../interfaces/ingredients-response.interface';
import { Action, Dispatch } from 'redux';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { NewOrderInterface } from '../../interfaces/new-order.interface';

export type BURGER_ACTIONS =
  | typeof UPDATE_INGREDIENTS
  | typeof UPDATE_CONSTRUCTOR_INGREDIENTS
  | typeof SELECT_INGREDIENT
  | typeof DESELECT_INGREDIENT
  | typeof SET_NEW_ORDER;

export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const UPDATE_CONSTRUCTOR_INGREDIENTS = 'UPDATE_CONSTRUCTOR_INGREDIENTS';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const SET_NEW_ORDER = 'SET_NEW_ORDER';
export const DESELECT_INGREDIENT = 'DESELECT_INGREDIENT';

export type AppActions = IngredientsActionInterface | SelectIngredientActionInterface | SetNewOrderActionInterface;

export interface IngredientsActionInterface extends Action<BURGER_ACTIONS> {
  items: IngredientInterface[];
}

export interface SelectIngredientActionInterface extends Action<BURGER_ACTIONS> {
  item: IngredientInterface;
}

export interface SetNewOrderActionInterface extends Action<BURGER_ACTIONS> {
  orderNumber: number;
}

const ingredientsApiUrl = `${apiBaseUrl}/ingredients`;
const ordersURL = `${apiBaseUrl}/orders`;

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

export function submitNewOrder(orderIds: string[]) {
  return function (dispatch: Dispatch) {
    fetch(ordersURL, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: orderIds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then<NewOrderInterface>(checkResponse)
      .then((responseData: NewOrderInterface) => {
        dispatch<SetNewOrderActionInterface>({
          type: SET_NEW_ORDER,
          orderNumber: responseData.order.number
        });
      })
      .catch((err) => {
        console.log('Error on add submit new order', err);
      });
  };
}
