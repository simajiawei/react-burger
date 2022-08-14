import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { HeaderModal } from './modal-header/header-modal';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { MouseEventHandler, SyntheticEvent, useEffect } from 'react';
import React from 'react';

const modalRoot = document.getElementById('modals')!;

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose: MouseEventHandler<HTMLElement>;
  isOpen: boolean;
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
    if (props.isOpen) {
      document.addEventListener('keydown', close);
      return () => document.removeEventListener('keydown', close);
    }
  }, [props.isOpen]);

  return createPortal(
    <>
      <div className={modalClassName}>
        <HeaderModal onClose={props.onClose}>{props.title}</HeaderModal>
        <div className={styles.modalBody}>{props.children}</div>
      </div>
      <ModalOverlay onClose={props.onClose} />
    </>,
    modalRoot
  );
}
