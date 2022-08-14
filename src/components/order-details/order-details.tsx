import styles from './order-details.module.css';
import React from 'react';
import done from 'images/done.svg';

interface OrderDetailsProps {}

export function OrderDetails(props: OrderDetailsProps) {
  const cardClassName = `${styles.card} mb-30`;
  const imageWrapperClassName = `${styles.imageWrapper} mb-15`;
  return (
    <div className={cardClassName}>
      <h1 className="text text_type_digits-large mb-8 mt-9">034536</h1>
      <h2 className="text text_type_main-medium mb-15">идентификатор заказа</h2>
      <div className={imageWrapperClassName}>
        <img
          src={done}
          alt="done"
        />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}
