import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from '../actions/ws.actions';
import { WsActions } from '../actions/ws.actions.interface';
import { WsStateInterface } from './ws.state.interface';

const initialState: WsStateInterface = {
  wsConnected: false,
  orders: null
};

export const wsReducer = (state = initialState, action: WsActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload
      };

    default:
      return state;
  }
};
