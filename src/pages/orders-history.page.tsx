import React, { FC, useEffect } from 'react';
import { OrderItem } from '../components/order-item/order-item';
import { useAppDispatch, useSelector } from '../utils/hooks';
import styles from './orders-history.page.module.css';
import { Pages } from '../enums/pages.enum';
import { wsConnectionStart } from '../services/actions/ws.actions';
import { ordersHistoryUrl, ordersUrl } from '../utils/app.constants';
import { ACCESS_TOKEN, getCookie, getTokenFromLS } from '../utils/browser-storage';

export const OrdersHistoryPage: FC = () => {
  const { orders, wsConnected } = useSelector((state) => state.ws);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie(ACCESS_TOKEN)?.replace('Bearer ', '');
    dispatch(wsConnectionStart(`${ordersHistoryUrl}?token=${token}`));
  }, [dispatch]);

  return (
    <div className={styles.ordersList}>
      {orders?.orders.map((order) => (
        <OrderItem
          key={order._id}
          {...order}
        />
      ))}
    </div>
  );
};
