import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { HeaderModal } from './modal-header/header-modal';
import { ModalBackdrop } from './modal-backdrop/modal-backdrop';
import { MouseEventHandler } from 'react';
import React from 'react';

const modalRoot = document.getElementById('modals')!;

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose: MouseEventHandler<HTMLElement>;
}
export function Modal(props: ModalProps) {
  const modalClassName = `${styles.modal}`;
  return createPortal(
    <>
      <div className={modalClassName}>
        <HeaderModal onClose={props.onClose}>{props.title}</HeaderModal>
        <div className={styles.modalBody}>{props.children}</div>
      </div>
      <ModalBackdrop onClose={props.onClose} />
    </>,
    modalRoot
  );
}
