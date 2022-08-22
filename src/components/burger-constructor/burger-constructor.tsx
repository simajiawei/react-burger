import React, { SyntheticEvent, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import styles from './burger-constructor.module.css';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { CategoryKey } from '../../enums/category-key.enum';
import { apiBaseUrl } from '../../utils/app.constants';
import { checkResponse } from '../../utils/check-response';
import { BurgerContext } from '../../services/burger-context';

const ordersURL = `${apiBaseUrl}/orders`;

interface TotalStateInterface {
  total: number;
}

interface NewOrderInterface {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

const totalInitialState: TotalStateInterface = {
  total: 0
};

function totalReducer(state: TotalStateInterface, prices: number[]) {
  return {
    total: prices.reduce((prev, cur) => prev + cur, totalInitialState.total)
  };
}

export const BurgerConstructor = () => {
  const ingredients = useContext(BurgerContext);

  const [totalState, dispatchTotal] = useReducer(totalReducer, totalInitialState);
  const [isOrderDisplayed, setIsOrderDisplayed] = useState(false);
  const [orderId, setOrderId] = useState<number>();

  const wrapperClassName = `${styles.constructor}`;
  const totalClassName = `${styles.total} mt-10`;
  const totalPriceClassName = `${styles.totalPrice} text text_type_digits-medium mr-10`;
  const draggableItemClassName = `${styles.draggableItem}`;
  const constructorDynamicClassName = `${styles.constructorDynamic} pr-2`;

  const orderIds: string[] = useMemo(() => ingredients.map((ingredient) => ingredient._id), [ingredients]);
  const betweenBuns: IngredientInterface[] = useMemo(
    () => ingredients.filter((ingredient) => [CategoryKey.MAIN, CategoryKey.SAUCE].includes(ingredient.type)),
    [ingredients]
  );
  const bun: IngredientInterface = useMemo(
    () => ingredients.find((ingredient) => ingredient.type === CategoryKey.BUN) as IngredientInterface,
    [ingredients]
  );

  let prices = useMemo(() => {
    let _prices = betweenBuns.map((ingredient) => ingredient.price);
    if (bun) {
      _prices = [..._prices, bun.price * 2];
    }
    return _prices;
  }, [betweenBuns, bun]);

  const handleOrderClick = async (e: SyntheticEvent) => {
    await fetch(ordersURL, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: orderIds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then<NewOrderInterface>(checkResponse)
      .then((responseData: NewOrderInterface) => setOrderId(responseData.order.number))
      .catch((err) => {
        console.log('Error on add submit new order', err);
      });

    setIsOrderDisplayed(true);
  };

  const onCloseOrderDetails = (e: SyntheticEvent) => {
    setIsOrderDisplayed(false);
  };

  // update total if prices list is changed
  useEffect(() => {
    dispatchTotal(prices);
  }, [prices]);

  return (
    <>
      <div className={wrapperClassName}>
        {bun && (
          <div className="ml-8 pr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <div className={constructorDynamicClassName}>
          {betweenBuns.map((ingredient, ix) => (
            <div
              className={draggableItemClassName}
              key={ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>

        {bun && (
          <div className="ml-8 pr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={totalClassName}>
        <p className={totalPriceClassName}>
          {totalState.total}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          onClick={handleOrderClick}
          size="large">
          Оформить заказ
        </Button>
      </div>

      {isOrderDisplayed && !!orderId && (
        <Modal
          onClose={onCloseOrderDetails}
          isOpen={isOrderDisplayed}>
          <OrderDetails order={orderId} />
        </Modal>
      )}
    </>
  );
};
