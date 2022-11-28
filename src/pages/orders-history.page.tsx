import React, { FC, useEffect } from 'react';
import { OrderItem } from '../components/order-item/order-item';
import { useAppDispatch, useSelector } from '../utils/hooks';
import styles from './orders-history.page.module.css';
import { getHistoryWsUrl } from '../utils/get-history-ws-url';
import { historyWsConnectionDisconnect, historyWsConnectionStart } from '../services/actions/history-ws.actions';

export const OrdersHistoryPage: FC = () => {
  const { orders } = useSelector((state) => state.wsHistory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(historyWsConnectionStart(getHistoryWsUrl()));
    return () => {
      dispatch(historyWsConnectionDisconnect());
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
