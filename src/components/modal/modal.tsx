import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { HeaderModal } from './modal-header/header-modal';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { FC, MouseEventHandler, SyntheticEvent, useEffect } from 'react';
import React from 'react';

const modalRoot = document.getElementById('modals')!;

interface ModalProps {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  onClose: () => void;
}
export const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
  const modalClassName = `${styles.modal}`;

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [onClose]);

  return createPortal(
    <>
      <div className={modalClassName}>
        <HeaderModal onClose={onClose}>{title}</HeaderModal>
        <div className={styles.modalBody}>{children}</div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};
