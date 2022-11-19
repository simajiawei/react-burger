import React, { FC, useEffect, useState } from 'react';
import { OrderInterface } from '../interfaces/models/order.interface';
import { OrdersInterface, OrdersResponseInterface } from '../interfaces/responses/orders-response.interface';
import { checkResponse } from '../utils/check-response';
import { OrderItem } from '../components/order-item/order-item';
import styles from './orders.page.module.css';
import { OrdersStats } from '../components/orders-stats/orders-stats';

export const OrdersPage: FC = () => {
  const [orders, setOrders] = useState<OrdersInterface>();

  useEffect(() => {
    const getOrders = () => {
      fetch('data/orders.json')
        .then<OrdersResponseInterface>(checkResponse)
        .then((responseData) => setOrders(responseData))
        .catch((error) => {
          console.error('Error fetching ingredients', error);
        });
    };
    getOrders();
  }, []);
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
