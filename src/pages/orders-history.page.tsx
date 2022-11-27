import React, { FC, useEffect } from 'react';
import { OrderItem } from '../components/order-item/order-item';
import { useAppDispatch, useSelector } from '../utils/hooks';
import styles from './orders-history.page.module.css';
import { wsConnectionDisconnect, wsConnectionStart } from '../services/actions/ws.actions';
import { getHistoryWsUrl } from '../utils/get-history-ws-url';

export const OrdersHistoryPage: FC = () => {
  const { orders, wsConnected } = useSelector((state) => state.ws);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (wsConnected) {
      dispatch(wsConnectionDisconnect());
    }
    dispatch(wsConnectionStart(getHistoryWsUrl()));
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
