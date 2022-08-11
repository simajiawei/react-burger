import React, { SyntheticEvent, useState } from 'react';
import styles from './burger-constructor.module.css';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';

interface Props {
  ingredients: IngredientInterface[];
  bun: IngredientInterface;
}

export const BurgerConstructor = (props: Props) => {
  const [isOrderDisplayed, setIsOrderDisplayed] = useState(false);

  const wrapperClassName = `${styles.constructor}`;
  const totalClassName = `${styles.total} mt-10`;
  const totalPriceClassName = `${styles.totalPrice} text text_type_digits-medium mr-10`;
  const draggableItemClassName = `${styles.draggableItem}`;
  const constructorDynamicClassName = `${styles.constructorDynamic} pr-2`;

  const handleOrderClick = (e: SyntheticEvent) => {
    setIsOrderDisplayed(true);
  };

  const onCloseOrderDetails = (e: SyntheticEvent) => {
    setIsOrderDisplayed(false);
  };

  return (
    <>
      <div className={wrapperClassName}>
        {props.bun && (
          <div className="ml-8 pr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${props.bun.name} (верх)`}
              price={props.bun.price}
              thumbnail={props.bun.image}
            />
          </div>
        )}
        <div className={constructorDynamicClassName}>
          {props.ingredients.map((ingredient, ix) => (
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

        {props.bun && (
          <div className="ml-8 pr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${props.bun.name} (низ)`}
              price={props.bun.price}
              thumbnail={props.bun.image}
            />
          </div>
        )}
      </div>
      <div className={totalClassName}>
        <p className={totalPriceClassName}>
          610
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          onClick={handleOrderClick}
          size="large">
          Оформить заказ
        </Button>
      </div>

      {isOrderDisplayed && <OrderDetails onClose={onCloseOrderDetails} />}
    </>
  );
};
