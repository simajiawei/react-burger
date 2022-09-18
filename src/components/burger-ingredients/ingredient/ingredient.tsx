import { IngredientInterface } from '../../../interfaces/models/ingredient.interface';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import React from 'react';
import { useDrag } from 'react-dnd';
import { DndIngredientType } from '../../../utils/app.types';
import { Link, useLocation } from 'react-router-dom';
import { Pages } from '../../../enums/pages.enum';

export const Ingredient = ({ image, name, price, _id, count }: IngredientInterface) => {
  const ingredientDetailsPath = `${Pages.INGREDIENTS}/${_id}`;
  const location = useLocation();

  const priceClassName = `${styles.price} mt-1 mb-1`;
  const titleClassName = `${styles.title} text text_type_main-default`;

  const [, ref] = useDrag({
    type: DndIngredientType.ITEMS,
    item: { id: _id },
    collect: (monitor) => ({})
  });

  return (
    <Link
      to={ingredientDetailsPath}
      className="text_color_primary"
      state={{ background: location }}
      key={_id}>
      <div
        className={styles.card}
        ref={ref}>
        {/* todo: remove hardcode */}
        <div className={styles.counter}>
          {count > 0 && (
            <Counter
              count={count}
              size="default"
            />
          )}
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
    </Link>
  );
};
