import styles from './modal-overlay.module.css';
import { FC, MouseEventHandler } from 'react';
import React from 'react';

interface ModalOverlayProps {
  onClose: MouseEventHandler<HTMLElement>;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
    />
  );
};
