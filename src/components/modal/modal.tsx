import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { HeaderModal } from './modal-header/header-modal';
import { ModalBackdrop } from './modal-backdrop/modal-backdrop';
import { MouseEventHandler, SyntheticEvent, useEffect } from 'react';
import React from 'react';

const modalRoot = document.getElementById('modals')!;

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose: MouseEventHandler<HTMLElement>;
}
export function Modal(props: ModalProps) {
  const modalClassName = `${styles.modal}`;

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        // @ts-ignore
        props.onClose(e);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

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
