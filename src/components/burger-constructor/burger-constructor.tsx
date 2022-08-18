import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import styles from './burger-constructor.module.css';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { SelectedIngredientsContext } from '../../services/burger-constructor';
import { CategoryKey } from '../../enums/category-key.enum';

export const BurgerConstructor = () => {
  const ingredients = useContext(SelectedIngredientsContext);

  const [bun, setBun] = useState<IngredientInterface>();
  const [betweenBuns, setBetweenBuns] = useState<IngredientInterface[]>([]);

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

  useEffect(() => {
    const _betweenBuns = ingredients.filter((ingredient) =>
      [CategoryKey.MAIN, CategoryKey.SAUCE].includes(ingredient.type)
    );
    const _bun: IngredientInterface | undefined = ingredients.find((ingredient) => ingredient.type === CategoryKey.BUN);
    setBun(_bun);
    setBetweenBuns(_betweenBuns);
  }, [JSON.stringify(ingredients)]);

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

      {isOrderDisplayed && (
        <Modal
          onClose={onCloseOrderDetails}
          isOpen={isOrderDisplayed}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
