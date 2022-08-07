import React, {ReactElement} from "react";
import styles from "./app-header-tab.module.css";

export interface HeaderTabPropsInterface {
  children?: React.ReactNode,
  active?: boolean,
  icon?: ReactElement;
}

export const AppHeaderTab = (props:HeaderTabPropsInterface) => {
  const tabClassName = `${styles.tab} ml-5 mr-5 mt-4 mb-4`
  const tabTextClassName= `${styles.title} ${props.active && styles.active} text text_type_main-default`
  const tabIconClassName = `${styles.icon} mr-2`
  return (
    <div className={tabClassName}>
      <p className={tabTextClassName}>
        <span className={tabIconClassName}>
          {props.icon}
        </span>
        {props.children}
      </p>
    </div>
  )
}
