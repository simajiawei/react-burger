import { checkResponse } from '../../utils/check-response';
import { apiBaseUrl } from '../../utils/app.constants';
import { IngrediendsResponseInterface } from '../../interfaces/ingredients-response.interface';
import { Dispatch } from 'redux';
import { NewOrderInterface } from '../../interfaces/new-order.interface';
import {
  AddIngredientToConstructorInterface,
  IngredientsActionInterface,
  SetNewOrderSuccessActionInterface
} from './actions.interface';
import { AppThunk } from '../store';
import { uniqueId } from '../../utils/generate-id';
import exp from 'constants';

export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';

export const SET_NEW_ORDER = 'SET_NEW_ORDER';
export const SET_NEW_ORDER_SUCCESS = 'SET_NEW_ORDER_SUCCESS';

export const DESELECT_INGREDIENT = 'DESELECT_INGREDIENT';
export const UPDATE_CONSTRUCTOR_ELEMENTS = 'UPDATE_CONSTRUCTOR_ELEMENTS';
export const CLEAR_CONSTRUCTOR_ELEMENTS = 'CLEAR_CONSTRUCTOR_ELEMENTS';
const ingredientsApiUrl = `${apiBaseUrl}/ingredients`;
const ordersURL = `${apiBaseUrl}/orders`;

export function getIngredients(): AppThunk {
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

export function submitNewOrder(orderIds: string[]): AppThunk {
  return function (dispatch: Dispatch) {
    dispatch(setNewOrder(true));

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
        dispatch<SetNewOrderSuccessActionInterface>({
          type: SET_NEW_ORDER_SUCCESS,
          orderNumber: responseData.order.number
        });
        dispatch(setNewOrder(false));
      })
      .catch((err) => {
        console.log('Error on add submit new order', err);
        dispatch(setNewOrder(false));
      })
      .then(() => {
        dispatch({
          type: CLEAR_CONSTRUCTOR_ELEMENTS
        });
      });
  };
}

export function addIngredientToConstructor(id: string): AddIngredientToConstructorInterface {
  return {
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    constructorId: uniqueId(),
    id
  };
}
export function setNewOrder(isProcessing: boolean) {
  return {
    type: SET_NEW_ORDER,
    isProcessing
  };
}
