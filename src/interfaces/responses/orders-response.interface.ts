import { BaseResponseInterface } from './base-response.interface';
import { OrderInterface } from '../models/order.interface';

export interface OrdersResponseInterface extends BaseResponseInterface, OrdersInterface {}

export interface OrdersInterface {
  orders: OrderInterface[];
  total: number;
  totalToday: number;
}
