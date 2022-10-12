import { Ingredient } from '../ingredient/ingredient';
import React, { FC, ReactElement } from 'react';
import { IngredientInterface } from '../../../interfaces/models/ingredient.interface';
import styles from './ingredients-cards.module.css';
import { CategoryInterface } from '../burger-ingredients';

interface IngredientCardInterface {
  categories: CategoryInterface;
  ingredients: IngredientInterface[];
}
export const IngredientsCards: FC<IngredientCardInterface> = ({ categories, ingredients }) => {
  const gridClassName = `${styles.cardsGrid} pl-2 pr-2 pt-6`;
  return (
    <>
      {Object.keys(categories).map((category) => {
        return (
          <section
            ref={categories[category].itemsRef}
            key={category}
            className="mt-10 mb-6">
            <h2
              className="text text_type_main-medium"
              ref={categories[category].ref}>
              {categories[category].name}
            </h2>
            <div className={gridClassName}>
              {ingredients
                .filter((ingredient) => ingredient.type === category)
                .map((ingredient) => (
                  <div key={ingredient._id}>
                    <Ingredient {...ingredient} />
                  </div>
                ))}
            </div>
          </section>
        );
      })}
    </>
  );
};
