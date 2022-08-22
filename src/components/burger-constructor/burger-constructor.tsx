import React, { SyntheticEvent, useContext, useEffect, useReducer, useState } from 'react';
import styles from './burger-constructor.module.css';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { SelectedIngredientsContext } from '../../services/burger-constructor-context';
import { CategoryKey } from '../../enums/category-key.enum';
import { apiBaseUrl } from '../../utils/app.constants';
import { checkResponse } from '../../utils/check-response';

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
  const ingredients = useContext(SelectedIngredientsContext);

  const [bun, setBun] = useState<IngredientInterface>();
  const [betweenBuns, setBetweenBuns] = useState<IngredientInterface[]>([]);

  const [totalState, dispatchTotal] = useReducer(totalReducer, totalInitialState);
  const [isOrderDisplayed, setIsOrderDisplayed] = useState(false);
  const [orderId, setOrderId] = useState<number>();

  const wrapperClassName = `${styles.constructor}`;
  const totalClassName = `${styles.total} mt-10`;
  const totalPriceClassName = `${styles.totalPrice} text text_type_digits-medium mr-10`;
  const draggableItemClassName = `${styles.draggableItem}`;
  const constructorDynamicClassName = `${styles.constructorDynamic} pr-2`;

  const handleOrderClick = async (e: SyntheticEvent) => {
    const orderIds = ingredients.map((ingredient) => ingredient._id);
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

  // update burger if ingredients changed
  useEffect(() => {
    const _betweenBuns = ingredients.filter((ingredient) =>
      [CategoryKey.MAIN, CategoryKey.SAUCE].includes(ingredient.type)
    );
    const _bun: IngredientInterface = ingredients.find(
      (ingredient) => ingredient.type === CategoryKey.BUN
    ) as IngredientInterface;
    setBun(_bun);
    setBetweenBuns(_betweenBuns);
  }, [JSON.stringify(ingredients)]);

  // update total if burger changed
  useEffect(() => {
    let prices = betweenBuns.map((ingredient) => ingredient.price);
    if (bun) {
      prices = [...prices, bun.price * 2];
    }
    dispatchTotal(prices);
  }, [betweenBuns, bun]);

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
