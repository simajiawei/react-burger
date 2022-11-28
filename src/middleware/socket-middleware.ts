import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../services/store';
import { WsBaseActionsInterface } from '../services/reducers/ws.base-actions.interface';

export const socketMiddleware = (wsActions: WsBaseActionsInterface): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { connectionStart, connectionClosed, connectionError, connectionSuccess, disconnect, getMessage } =
        wsActions;

      if (action.type === connectionStart) {
        // объект класса WebSocket
        socket = new WebSocket(action.url);
      } else if (action.type === disconnect) {
        socket?.close();
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch(connectionSuccess());
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          console.log('ws onerror:', event);
          dispatch(connectionError());
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(getMessage(data));
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          console.log('onclose', event);
          dispatch(connectionClosed());
        };
      }

      next(action);
    };
  }) as Middleware;
};
