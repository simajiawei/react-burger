import React, { FC, useEffect } from 'react';
import { OrderItem } from '../components/order-item/order-item';
import styles from './orders.page.module.css';
import { OrdersStats } from '../components/orders-stats/orders-stats';
import { useAppDispatch, useSelector } from '../utils/hooks';
import { feedWsConnectionDisconnect, feedWsConnectionStart } from '../services/actions/feed-ws.actions';
import { ordersUrl } from '../utils/app.constants';

export const OrdersPage: FC = () => {
  const { orders } = useSelector((state) => state.wsFeed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(feedWsConnectionStart(ordersUrl));
    return () => {
      dispatch(feedWsConnectionDisconnect());
    };
  }, [dispatch]);

  const ordersStatsClassName = `${styles.ordersStats} pt-25`;
  return (
    <div className={styles.ordersPageWrapper}>
      <div className={styles.ordersWrapper}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={styles.ordersList}>
          {orders?.orders.map((order) => (
            <OrderItem
              key={order._id}
              {...order}
            />
          ))}
        </div>
      </div>
      <div className={ordersStatsClassName}>{orders && <OrdersStats {...orders} />}</div>
    </div>
  );
};
