import { checkResponse } from '../../utils/check-response';
import { apiBaseUrl, ingredientsApiUrl, ordersApiUrl } from '../../utils/app.constants';
import { IngrediendsResponseInterface } from '../../interfaces/responses/ingredients-response.interface';
import { Dispatch } from 'redux';
import { NewOrderResponseInterface } from '../../interfaces/responses/new-order-response.interface';
import {
  AddIngredientToConstructorInterface,
  IngredientsActionInterface,
  SetNewOrderSuccessActionInterface
} from './burger.actions.interface';
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

    fetch(ordersApiUrl, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: orderIds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then<NewOrderResponseInterface>(checkResponse)
      .then((responseData: NewOrderResponseInterface) => {
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
