import styles from './ingredient-content-item.module.css';
import React from 'react';

export interface IngredientContentItemProps {
  title: string;
  amount: number;
}
export function IngredientContentItem(props: IngredientContentItemProps) {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-default text_color_inactive">{props.title}</p>
      <p className="text text_type_digits-default text_color_inactive">{props.amount}</p>
    </div>
  );
}
