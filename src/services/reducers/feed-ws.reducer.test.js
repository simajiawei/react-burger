import { feedWsReducer } from './feed-ws.reducer';
import {
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_GET_MESSAGE,
  FEED_WS_CONNECTION_CLOSED
} from '../actions/feed-ws.actions';
import { OrderInterface } from '../../interfaces/models/order.interface';

describe('feed ws reducer', function () {
  it('should return initial state', () => {
    expect(feedWsReducer(undefined, {})).toEqual({
      wsConnected: false,
      orders: null
    });
  });
  it('should handle FEED_WS_CONNECTION_SUCCESS', () => {
    expect(
      feedWsReducer(undefined, {
        type: FEED_WS_CONNECTION_SUCCESS
      })
    ).toEqual({
      wsConnected: true,
      orders: null
    });
  });
  it('should handle FEED_WS_CONNECTION_ERROR', () => {
    expect(
      feedWsReducer(
        {
          wsConnected: true,
          orders: null
        },
        {
          type: FEED_WS_CONNECTION_ERROR
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: null
    });
  });
  it('should handle FEED_WS_CONNECTION_CLOSED', () => {
    expect(
      feedWsReducer(
        {
          wsConnected: true,
          orders: null
        },
        {
          type: FEED_WS_CONNECTION_CLOSED
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: null
    });
  });
  it('should handle FEED_WS_GET_MESSAGE', () => {
    expect(
      feedWsReducer(
        {
          wsConnected: true,
          orders: null
        },
        {
          type: FEED_WS_GET_MESSAGE,
          payload: {
            orders: [],
            total: 0,
            totalToday: 0
          }
        }
      )
    ).toEqual({
      wsConnected: true,
      orders: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    });
  });
});
