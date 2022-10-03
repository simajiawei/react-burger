import { BurgerConstructorItem } from '../burger-constructor-item/burger-constructor-item';
import React, { useCallback } from 'react';
import { ConstructorIngredientInterface } from '../../../interfaces/models/ingredient.interface';
import styles from './burger-constructor-between-buns.module.css';
import {
  RemoveIngredientFromConstructorInterface,
  UpdateConstructorElementsInterface
} from '../../../services/actions/burger.actions.interface';
import {
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  UPDATE_CONSTRUCTOR_ELEMENTS
} from '../../../services/actions/burger.actions';
import { useAppDispatch } from '../../../utils/hooks';

export interface BurgerConstructorBetweenBunsPropsInterface {
  ingredients: ConstructorIngredientInterface[];
}

export function BurgerConstructorBetweenBuns({ ingredients }: BurgerConstructorBetweenBunsPropsInterface) {
  const dispatch = useAppDispatch();

  const handleRemove = (ingredient: ConstructorIngredientInterface) => {
    dispatch<RemoveIngredientFromConstructorInterface>({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      id: ingredient._id,
      constructorId: ingredient.constructorId
    });
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedIngredient = ingredients[dragIndex];
      const newIngredients = [...ingredients];
      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, draggedIngredient);

      dispatch<UpdateConstructorElementsInterface>({
        type: UPDATE_CONSTRUCTOR_ELEMENTS,
        items: newIngredients
      });
    },
    [ingredients, dispatch]
  );

  const constructorDynamicClassName = `${styles.constructorDynamic} pr-2`;
  return (
    <div className={constructorDynamicClassName}>
      {ingredients.map((ingredient, ix) => (
        <BurgerConstructorItem
          key={ingredient.constructorId}
          {...ingredient}
          index={ix}
          moveCard={moveCard}
          handleRemove={() => handleRemove(ingredient)}
        />
      ))}
    </div>
  );
}
