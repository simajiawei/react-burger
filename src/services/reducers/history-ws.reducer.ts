import {
  HISTORY_WS_CONNECTION_CLOSED,
  HISTORY_WS_CONNECTION_ERROR,
  HISTORY_WS_CONNECTION_SUCCESS,
  HISTORY_WS_GET_MESSAGE
} from '../actions/history-ws.actions';
import { WsStateInterface } from './ws.state.interface';
import { HistoryWsActions } from '../actions/history-ws.actions.interface';

const initialState: WsStateInterface = {
  wsConnected: false,
  orders: null
};

export const historyWsReducer = (state = initialState, action: HistoryWsActions) => {
  switch (action.type) {
    case HISTORY_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case HISTORY_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case HISTORY_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case HISTORY_WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload
      };

    default:
      return state;
  }
};
