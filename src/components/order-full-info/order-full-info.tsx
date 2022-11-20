import React, { FC, useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInterface, OrderStatus } from '../../interfaces/models/order.interface';
import styles from './order-full-info.module.css';
import { IngredientImage } from '../ingredient-image/ingredient-image';
import { useSelector } from '../../utils/hooks';
import { IngredientInterface } from '../../interfaces/models/ingredient.interface';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { totalReducer, TotalStateInterface } from '../../services/reducers/total.reducer';

const initialTotalState: TotalStateInterface = {
  total: 0
};

interface OrderFullInfoProps {
  pageCentered?: boolean;
}

export const OrderFullInfo: FC<OrderFullInfoProps> = ({ pageCentered }) => {
  const { feedId } = useParams();
  const [totalState, dispatchTotal] = useReducer(totalReducer, initialTotalState);
  const [fullIngredients, setFullIngredients] = useState<IngredientInterface[]>([]);
  const [order, setOrder] = useState<OrderInterface>();

  const { orders } = useSelector((state) => state.ws);

  const allIngredients = useSelector((state) => state.burger.ingredients);

  const prices = useMemo(
    () => fullIngredients.map((ingredient) => ingredient.price * ingredient.count),
    [fullIngredients]
  );

  useEffect(() => {
    const _fullIngredients: IngredientInterface[] = [];
    allIngredients.forEach((ingredient) => {
      const ingredientIds = order?.ingredients.filter((ingredientId) => ingredient._id === ingredientId);
      if (ingredientIds) {
        if (ingredientIds.length > 0) {
          _fullIngredients.push(..._fullIngredients, {
            ...ingredient,
            count: ingredientIds.length
          });
        }
      }
    });
    setFullIngredients(_fullIngredients);
  }, [allIngredients, order?.ingredients]);

  useEffect(() => {
    dispatchTotal(prices);
  }, [prices]);

  useEffect(() => {
    const order = orders?.orders.find((o) => o._id === feedId);
    setOrder(order);
  }, [feedId, orders]);

  const wrapperClassName = `${pageCentered ? styles.pageWrapper : styles.modalWrapper}`;
  const orderNumberClassName = `${styles.orderNumber} text text_type_digits-default`;
  const orderStatus = `${styles.orderStatus} text text_type_main-default mb-15`;
  const totalPriceClassName = `${styles.ingredientsPrice} text text_type_digits-default`;
  const footerClassName = `${styles.footer} mt-10`;
  return (
    <>
      {order && (
        <div className={wrapperClassName}>
          {pageCentered && <p className={orderNumberClassName}>#{order.number}</p>}
          <p className="text text_type_main-medium mb-3 mt-10">{order.name}</p>
          <p className={orderStatus}>{order.status === OrderStatus.DONE ? 'Выполнен' : 'В работе'}</p>
          <p className="text text_type_main-medium mb-2">Состав:</p>
          <div className={styles.ingredients}>
            {fullIngredients?.map((ingredient, index) => (
              <div
                className={styles.ingredient}
                key={index}>
                <div className={styles.ingredientTitleImage}>
                  <IngredientImage image={ingredient.image}></IngredientImage>
                  <p className="ml-4 mr-4 text text_type_main-medium">{ingredient.name}</p>
                </div>
                <div className={styles.ingredientsPrice}>
                  <p className={totalPriceClassName}>
                    {ingredient.count}&nbsp;x&nbsp;
                    {ingredient.price}
                    <CurrencyIcon type="primary" />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={footerClassName}>
            <p className="text text_type_main-default text_color_inactive">
              <FormattedDate date={new Date(order.createdAt)} />
            </p>
            <div className={styles.ingredientsPrice}>
              <p className={totalPriceClassName}>
                {totalState.total}
                <CurrencyIcon type="primary" />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
