import styles from './modal-overlay.module.css';
import { MouseEventHandler } from 'react';
import React from 'react';

interface ModalOverlayProps {
  onClose: MouseEventHandler<HTMLElement>;
}

export function ModalOverlay(props: ModalOverlayProps) {
  return (
    <div
      className={styles.backdrop}
      onClick={props.onClose}
    />
  );
}
