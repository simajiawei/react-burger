import { MouseEventHandler } from 'react';
import styles from './header-modal.module.css';
import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface HeaderModalProps {
  children?: React.ReactNode;
  onClose: MouseEventHandler<HTMLElement>;
}
export function HeaderModal(props: HeaderModalProps) {
  const headerClassName = `${styles.header} mt-10 ml-10 mr-10`;
  const titleClassName = `text text_type_main-large`;
  return (
    <div className={headerClassName}>
      <h1 className={titleClassName}>{props.children}</h1>
      <CloseIcon
        type="primary"
        onClick={props.onClose as () => void}
      />
    </div>
  );
}
