import { MouseEventHandler } from 'react';
import styles from './header-modal.module.css';
import React from 'react';

interface HeaderModalProps {
  children?: React.ReactNode;
  onClose: MouseEventHandler<HTMLElement>;
}
export function HeaderModal(props: HeaderModalProps) {
  return (
    <div className={styles.header}>
      <h1>{props.children}</h1>
      <div
        className={styles.closeIcon}
        onClick={props.onClose}
      />
    </div>
  );
}
