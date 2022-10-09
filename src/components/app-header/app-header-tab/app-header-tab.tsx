import React, { FC, ReactElement } from 'react';
import styles from './app-header-tab.module.css';

export interface HeaderTabPropsInterface {
  children?: React.ReactNode;
  icon?: ReactElement;
}

export const AppHeaderTab: FC<HeaderTabPropsInterface> = ({ icon, children }) => {
  const tabClassName = `${styles.tab} ml-5 mr-5 mt-4 mb-4`;
  const tabTextClassName = `${styles.title} text text_type_main-default`;
  const tabIconClassName = `${styles.icon} mr-2`;
  return (
    <div className={tabClassName}>
      <p className={tabTextClassName}>
        <span className={tabIconClassName}>{icon}</span>
        {children}
      </p>
    </div>
  );
};
