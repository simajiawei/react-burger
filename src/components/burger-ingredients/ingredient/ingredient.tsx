import { IngredientInterface } from '../../../interfaces/ingredient.interface';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import React from 'react';
import { useDrag } from 'react-dnd';
import { DndIngredientType } from '../../../utils/app.types';

export const Ingredient = ({ image, name, price, _id }: IngredientInterface) => {
  const priceClassName = `${styles.price} mt-1 mb-1`;
  const titleClassName = `${styles.title} text text_type_main-default`;

  const [, ref] = useDrag({
    type: DndIngredientType.ITEMS,
    item: { id: _id },
    collect: (monitor) => ({})
  });

  return (
    <div
      className={styles.card}
      ref={ref}>
      {/* todo: remove hardcode */}
      <div className={styles.counter}>
        <Counter
          count={1}
          size="default"
        />
      </div>

      <div className="pl-4 pr-4">
        <img
          src={image}
          alt={name}
        />
      </div>
      <div className={priceClassName}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={titleClassName}>{name}</p>
    </div>
  );
};
