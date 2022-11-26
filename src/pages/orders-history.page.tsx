import React, { FC, useEffect } from 'react';
import { OrderItem } from '../components/order-item/order-item';
import { useAppDispatch, useSelector } from '../utils/hooks';
import styles from './orders-history.page.module.css';
import { wsConnectionDisconnect, wsConnectionStart } from '../services/actions/ws.actions';
import { ordersHistoryUrl } from '../utils/app.constants';
import { ACCESS_TOKEN, getCookie } from '../utils/browser-storage';

export const OrdersHistoryPage: FC = () => {
  const { orders, wsConnected } = useSelector((state) => state.ws);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (wsConnected) {
      dispatch(wsConnectionDisconnect());
    }
    const token = getCookie(ACCESS_TOKEN)?.replace('Bearer ', '');
    dispatch(wsConnectionStart(`${ordersHistoryUrl}?token=${token}`));
    return () => {
      dispatch(wsConnectionDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.ordersList}>
      {orders?.orders &&
        orders.orders.map((order) => (
          <OrderItem
            key={order._id}
            {...order}
          />
        ))}
    </div>
  );
};
