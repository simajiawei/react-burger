import React, { FC, useEffect, useMemo, useReducer } from 'react';
import { OrderInterface } from '../../interfaces/models/order.interface';

import styles from './order-item.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import { IngredientInterface } from '../../interfaces/models/ingredient.interface';
import { IngredientImage } from '../ingredient-image/ingredient-image';
import { Link, useLocation } from 'react-router-dom';
import { Pages } from '../../enums/pages.enum';
import { totalReducer, TotalStateInterface } from '../../services/reducers/total.reducer';

const totalInitialState: TotalStateInterface = {
  total: 0
};

export const OrderItem: FC<OrderInterface> = ({ ingredients, status, number, createdAt, name, _id }) => {
  const allIngredients = useSelector((state) => state.burger.ingredients);
  const location = useLocation();
  const [totalState, dispatchTotal] = useReducer(totalReducer, totalInitialState);
  const orderFullInfoPath = `${Pages.ORDERS}/${_id}`;

  const fullIngredients: IngredientInterface[] = useMemo(
    () =>
      ingredients
        .map((ingredientId) => allIngredients.filter((ingredient) => ingredient._id === ingredientId)[0])
        .filter((ingredient) => !!ingredient),
    [ingredients, allIngredients]
  );
  const ingredientsImages: string[] = useMemo(
    () => fullIngredients.map((ingredient) => ingredient.image),
    [fullIngredients]
  );

  useEffect(() => {
    const allPrices = fullIngredients.map((ingredient) => ingredient.price);
    dispatchTotal(allPrices);
  }, [fullIngredients]);

  const wrapper = `${styles.wrapper} p-6`;
  const totalPriceClassName = `${styles.ingredientsPrice} text text_type_digits-default`;

  return (
    <Link
      to={orderFullInfoPath}
      state={{ background: location }}
      className={wrapper}>
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
            <IngredientImage
              image={image}
              key={index}
            />
          ))}
        </div>
        <div className={styles.ingredientsPrice}>
          <p className={totalPriceClassName}>
            {totalState.total}
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </Link>
  );
};
