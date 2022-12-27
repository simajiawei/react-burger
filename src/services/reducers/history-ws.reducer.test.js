import { historyWsReducer, initialState } from './history-ws.reducer';
import {
  HISTORY_WS_CONNECTION_CLOSED,
  HISTORY_WS_CONNECTION_ERROR,
  HISTORY_WS_CONNECTION_SUCCESS,
  HISTORY_WS_GET_MESSAGE
} from '../actions/history-ws.actions';

describe('history ws reducer', function () {
  const orders = {
    orders: [],
    total: 0,
    totalToday: 0
  };
  it('should return initial state', () => {
    expect(historyWsReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle HISTORY_WS_CONNECTION_SUCCESS', () => {
    expect(
      historyWsReducer(undefined, {
        type: HISTORY_WS_CONNECTION_SUCCESS
      })
    ).toEqual({
      wsConnected: true,
      orders: null
    });
  });
  it('should handle HISTORY_WS_CONNECTION_ERROR', () => {
    expect(
      historyWsReducer(
        {
          wsConnected: true,
          orders: null
        },
        {
          type: HISTORY_WS_CONNECTION_ERROR
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: null
    });
  });
  it('should handle HISTORY_WS_CONNECTION_CLOSED', () => {
    expect(
      historyWsReducer(
        {
          wsConnected: true,
          orders: null
        },
        {
          type: HISTORY_WS_CONNECTION_CLOSED
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: null
    });
  });
  it('should handle HISTORY_WS_GET_MESSAGE', () => {
    expect(
      historyWsReducer(
        {
          wsConnected: true,
          orders: null
        },
        {
          type: HISTORY_WS_GET_MESSAGE,
          payload: orders
        }
      )
    ).toEqual({
      wsConnected: true,
      orders
    });
  });
});
