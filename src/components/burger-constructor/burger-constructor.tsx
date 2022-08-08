import React from 'react';
import styles from './burger-constructor.module.css';
import {IngredientInterface} from "../../interfaces/ingredient.interface";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";


interface Props{
  ingredients: IngredientInterface[],
  bun: IngredientInterface
}

export class BurgerConstructor extends React.Component<Props> {

  render() {
    const wrapperClassName = `${styles.constructor}`
    const totalClassName = `${styles.total} mt-10`
    const totalPriceClassName = `${styles.totalPrice} text text_type_digits-medium mr-10`;
    const draggableItemClassName = `${styles.draggableItem}`;
    const constructorDynamicClassName = `${styles.constructorDynamic} pr-2`
    return (
      <>
        <div className={wrapperClassName}>
          {
            this.props.bun &&
            <div className='ml-8 pr-4'>
              <ConstructorElement type='top'
                                isLocked={true}
                                text={`${this.props.bun.name} (верх)`}
                                price={this.props.bun.price}
                                thumbnail={this.props.bun.image}/>
            </div>
          }
          <div className={constructorDynamicClassName}>
            {
              this.props.ingredients.map((ingredient,ix)=>

                <div className={draggableItemClassName} key={ingredient._id}>

                  <DragIcon type="primary" />
                  <ConstructorElement text={ingredient.name}
                                      price={ingredient.price}
                                      thumbnail={ingredient.image}/>
                </div>
              )
            }
          </div>

          {
            this.props.bun &&
            <div className='ml-8 pr-4'>
              <ConstructorElement type='bottom'
                                  isLocked={true}
                                  text={`${this.props.bun.name} (низ)`}
                                  price={this.props.bun.price}
                                  thumbnail={this.props.bun.image}/>
            </div>
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
