import React, { SyntheticEvent, useEffect, useMemo, useReducer, useState } from 'react';
import styles from './burger-constructor.module.css';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { CategoryKey } from '../../enums/category-key.enum';
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../services/reducers';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  submitNewOrder
} from '../../services/actions';
import { ThunkDispatch } from 'redux-thunk';
import { useDrop } from 'react-dnd';
import { DndIngredientType } from '../../utils/app.types';
import { AddIngredientToConstructorInterface, BURGER_ACTIONS } from '../../services/actions/actions.interface';

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
  const dispatch: ThunkDispatch<any, any, BURGER_ACTIONS> = useDispatch();
  const { constructorIngredients, order, ingredients } = useSelector((store: StoreInterface) => store.burger);

  const [totalState, dispatchTotal] = useReducer(totalReducer, totalInitialState);
  const [isOrderDisplayed, setIsOrderDisplayed] = useState(false);

  const wrapperClassName = `${styles.constructor}`;
  const totalClassName = `${styles.total} mt-10`;
  const totalPriceClassName = `${styles.totalPrice} text text_type_digits-medium mr-10`;
  const draggableItemClassName = `${styles.draggableItem}`;
  const constructorDynamicClassName = `${styles.constructorDynamic} pr-2`;

  const orderIds: string[] = useMemo(
    () => constructorIngredients.map((ingredient) => ingredient._id),
    [constructorIngredients]
  );
  const betweenBuns: IngredientInterface[] = useMemo(
    () =>
      constructorIngredients.filter((ingredient) => [CategoryKey.MAIN, CategoryKey.SAUCE].includes(ingredient.type)),
    [constructorIngredients]
  );
  const bun: IngredientInterface = useMemo(
    () => constructorIngredients.find((ingredient) => ingredient.type === CategoryKey.BUN) as IngredientInterface,
    [constructorIngredients]
  );

  useEffect(() => {
    if (constructorIngredients.length > 0) {
      return;
    }
    const anyBun = ingredients.find((ingredient) => ingredient.type === CategoryKey.BUN);
    console.log('anyBun', anyBun, ingredients);

    if (!anyBun) {
      return;
    }
    dispatch<AddIngredientToConstructorInterface>({
      type: ADD_INGREDIENT_TO_CONSTRUCTOR,
      id: anyBun._id
    });
  }, [ingredients]);

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
    dispatch({
      type: ADD_INGREDIENT_TO_CONSTRUCTOR,
      id: itemId
    });
  };

  const handleRemove = (id: string) => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      id
    });
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
                handleClose={() => handleRemove(ingredient._id)}
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
