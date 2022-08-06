import React, {ReactElement} from "react";
import styles from "./app-header-tab.module.css";

export interface HeaderTabPropsInterface {
  children?: React.ReactNode,
  active?: boolean,
  icon?: ReactElement;
}

export function AppHeaderTab(props:HeaderTabPropsInterface){
  const tabClassName = `${styles.tab} pl-5 pr-5 pt-4 pb-4`
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
