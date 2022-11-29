import { OrdersResponseInterface } from '../../interfaces/responses/orders-response.interface';

export interface WsStateInterface {
  wsConnected: boolean;
  orders: OrdersResponseInterface | null;
}
