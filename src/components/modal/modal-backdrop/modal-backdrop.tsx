import styles from './modal-backdrop.module.css';
import { MouseEventHandler } from 'react';
import React from 'react';

interface ModalBackdropProps {
  onClose: MouseEventHandler<HTMLElement>;
}

export function ModalBackdrop(props: ModalBackdropProps) {
  return (
    <div
      className={styles.backdrop}
      onClick={props.onClose}
    />
  );
}
