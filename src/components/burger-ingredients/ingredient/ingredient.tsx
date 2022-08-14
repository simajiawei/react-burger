import { IngredientInterface } from '../../../interfaces/ingredient.interface';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import React from 'react';

export const Ingredient = (props: IngredientInterface) => {
  const priceClassName = `${styles.price} mt-1 mb-1`;
  const titleClassName = `${styles.title} text text_type_main-default`;
  return (
    <div className={styles.card}>
      {/* todo: remove hardcode */}
      <div className={styles.counter}>
        <Counter
          count={1}
          size="default"
        />
      </div>

      <div className="pl-4 pr-4">
        <img
          src={props.image}
          alt={props.name}
        />
      </div>
      <div className={priceClassName}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={titleClassName}>{props.name}</p>
    </div>
  );
};
