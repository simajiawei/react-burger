import styles from './ingredient-content-item.module.css';
import React, { FC } from 'react';

export interface IngredientContentItemProps {
  title: string;
  amount: number;
}
export const IngredientContentItem: FC<IngredientContentItemProps> = ({ title, amount }) => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-default text_color_inactive">{title}</p>
      <p className="text text_type_digits-default text_color_inactive">{amount}</p>
    </div>
  );
};
