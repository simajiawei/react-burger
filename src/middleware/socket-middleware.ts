import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../services/store';
import { WsActions } from '../services/actions/ws.actions.interface';
import {
  WS_CONNECTION_START,
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess,
  wsGetMessage
} from '../services/actions/ws.actions';

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: WsActions) => {
      const { dispatch } = store;

      if (action.type === WS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(action.url);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch(wsConnectionSuccess());
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          console.log('ws onerror:', event);
          dispatch(wsConnectionError());
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(wsGetMessage(data));
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch(wsConnectionClosed());
        };
      }

      next(action);
    };
  }) as Middleware;
};
