import styles from './order-details.module.css';
import { Modal } from '../modal/modal';
import { MouseEventHandler } from 'react';
import React from 'react';

interface OrderDetailsProps {
  onClose: MouseEventHandler<HTMLElement>;
}

export function OrderDetails(props: OrderDetailsProps) {
  return (
    <Modal onClose={props.onClose}>
      <h1>034536</h1>
      <h2>идентификатор заказа</h2>
    </Modal>
  );
}
