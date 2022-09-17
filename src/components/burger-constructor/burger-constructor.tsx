import React, { SyntheticEvent, useEffect, useMemo, useReducer, useState } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorIngredientInterface } from '../../interfaces/models/ingredient.interface';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { CategoryKey } from '../../enums/category-key.enum';
import { useSelector } from 'react-redux';
import { addIngredientToConstructor, submitNewOrder } from '../../services/actions/burger.actions';
import { useDrop } from 'react-dnd';
import { DndIngredientType } from '../../utils/app.types';
import { BurgerConstructorBetweenBuns } from './burger-constructor-between-buns/burger-constructor-between-buns';
import { useAppDispatch } from '../../utils/hooks';
import { StoreInterface } from '../../services/store.interface';

interface TotalStateInterface {
  total: number;
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
  const dispatch = useAppDispatch();
  const { constructorIngredients, order, ingredients, orderIsProcessing } = useSelector(
    (store: StoreInterface) => store.burger
  );

  const [totalState, dispatchTotal] = useReducer(totalReducer, totalInitialState);
  const [isOrderDisplayed, setIsOrderDisplayed] = useState(false);

  const wrapperClassName = `${styles.constructor}`;
  const totalClassName = `${styles.total} mt-10`;
  const totalPriceClassName = `${styles.totalPrice} text text_type_digits-medium mr-10`;

  const orderIds: string[] = useMemo(
    () => constructorIngredients.map((ingredient) => ingredient._id),
    [constructorIngredients]
  );
  const betweenBuns: ConstructorIngredientInterface[] = useMemo(
    () =>
      constructorIngredients.filter((ingredient) => [CategoryKey.MAIN, CategoryKey.SAUCE].includes(ingredient.type)),
    [constructorIngredients]
  );
  const bun: ConstructorIngredientInterface = useMemo(
    () =>
      constructorIngredients.find(
        (ingredient) => ingredient.type === CategoryKey.BUN
      ) as ConstructorIngredientInterface,
    [constructorIngredients]
  );

  const [{ opacity }, dropTarget] = useDrop({
    accept: DndIngredientType.ITEMS,
    drop(item: { id: string }) {
      onDropHandler(item.id);
    },
    collect: (monitor) => ({
      opacity: monitor.isOver() ? 0.5 : 1
    })
  });

  const onDropHandler = (itemId: string) => {
    dispatch(addIngredientToConstructor(itemId));
  };

  let prices = useMemo(() => {
    let _prices = betweenBuns.map((ingredient) => ingredient.price);
    if (bun) {
      _prices = [..._prices, bun.price * 2];
    }
    return _prices;
  }, [betweenBuns, bun]);

  const handleOrderClick = async (e: SyntheticEvent) => {
    dispatch(submitNewOrder(orderIds));
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
      <div
        style={{ opacity }}
        className={wrapperClassName}
        ref={dropTarget}>
        {!bun && betweenBuns.length === 0 && (
          <p className="text">Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа</p>
        )}

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
        <BurgerConstructorBetweenBuns ingredients={betweenBuns} />
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
      {orderIsProcessing && <p className="text">Выполняется заказ, пожалуйста подождите</p>}
      <div className={totalClassName}>
        <p className={totalPriceClassName}>
          {totalState.total}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          onClick={handleOrderClick}
          disabled={!bun}
          size="large">
          Оформить заказ
        </Button>
      </div>

      {isOrderDisplayed && !!order && (
        <Modal
          onClose={onCloseOrderDetails}
          isOpen={isOrderDisplayed}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
};
