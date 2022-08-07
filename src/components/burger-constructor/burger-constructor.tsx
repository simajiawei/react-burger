import React from 'react';
import styles from './burger-constructor.module.css';
import {IngredientInterface} from "../../interfaces/ingredient.interface";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export class BurgerConstructor extends React.Component<{ingredients: IngredientInterface[]}> {

  render() {
    const wrapperClassName = `${styles.constructor}`
    const totalClassName = `${styles.total} mt-10`
    const totalPriceClassName = `${styles.totalPrice} text text_type_digits-medium mr-10`;
    const draggableItemClassName = `${styles.draggableItem}`
    return (
      <>
        <div className={wrapperClassName}>
          {
            this.props.ingredients.map((ingredient,ix)=>
              <div className={draggableItemClassName} key={ingredient._id}>
                <DragIcon type="primary" />
                <ConstructorElement type={ix === 0 ? 'top' : (ix === this.props.ingredients.length - 1  ? 'bottom' : undefined )}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}/>
              </div>
            )
          }
        </div>
        <div className={totalClassName}>
          <p className={totalPriceClassName}>
            610
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>

      </>

    );
  }
}
