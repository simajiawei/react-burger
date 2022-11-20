import { FC } from 'react';
import { OrdersInterface } from '../../interfaces/responses/orders-response.interface';
import styles from './orders-stats.module.css';
import { OrderStatus } from '../../interfaces/models/order.interface';

export const OrdersStats: FC<OrdersInterface> = ({ orders, total, totalToday }) => {
  const ordersDone: number[] = orders.filter((order) => order.status === OrderStatus.DONE).map((order) => order.number);
  const ordersInProgress: number[] = orders
    .filter((order) => order.status === OrderStatus.IN_PROGRESS)
    .map((order) => order.number);

  const orderInProgressClassName = 'text text_type_digits-default';
  const orderDoneClassName = `${styles.orderDone} ${orderInProgressClassName}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.statuses}>
        <div className={styles.statusDone}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={styles.statusItems}>
            {ordersDone.map((order) => (
              <p
                className={orderDoneClassName}
                key={order}>
                {order}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.statusInProgress}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={styles.statusItems}>
            {ordersInProgress.map((order) => (
              <p
                className={orderInProgressClassName}
                key={order}>
                {order}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-15 mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <h1 className="text text_type_digits-large">{total}</h1>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <h1 className="text text_type_digits-large">{totalToday}</h1>
      </div>
    </div>
  );
};
