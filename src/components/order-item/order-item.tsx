import React, { FC } from 'react';
import { OrderInterface } from '../../interfaces/models/order.interface';

import styles from './order-item.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import { IngredientInterface } from '../../interfaces/models/ingredient.interface';

export const OrderItem: FC<OrderInterface> = ({ ingredients, status, number, createdAt, name }) => {
  const allIngredients = useSelector((state) => state.burger.ingredients);

  const fullIngredients: IngredientInterface[] = ingredients
    .map((ingredientId) => allIngredients.filter((ingredient) => ingredient._id === ingredientId)[0])
    .filter((ingredient) => !!ingredient);
  const ingredientsImages: string[] = fullIngredients.map((ingredient) => ingredient.image);

  const price: number = fullIngredients.map((ingredient) => ingredient.price).reduce((acc, cur) => acc + cur, 0);

  const wrapper = `${styles.wrapper} p-6`;
  const totalPriceClassName = `${styles.ingredientsPrice} text text_type_digits-default`;

  return (
    <div className={wrapper}>
      <div className={styles.header}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </p>
      </div>
      <p className="text text_type_main-medium mt-6 mb-6">{name}</p>
      <div className={styles.ingredientsWrapper}>
        <div className={styles.ingredientsPreviews}>
          {ingredientsImages.map((image, index) => (
            <div
              className={styles.ingredientPreview}
              key={index}>
              <img
                src={image}
                alt="Ингредиент"
              />
            </div>
          ))}
        </div>
        <div className={styles.ingredientsPrice}>
          <p className={totalPriceClassName}>
            {price}
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </div>
  );
};
