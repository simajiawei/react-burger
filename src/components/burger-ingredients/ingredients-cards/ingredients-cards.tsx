import { Ingredient } from '../ingredient/ingredient';
import React, { ReactElement } from 'react';
import { IngredientInterface } from '../../../interfaces/ingredient.interface';
import styles from './ingredients-cards.module.css';
import { CategoryInterface } from '../burger-ingredients';

interface IngredientCardInterface {
  categories: CategoryInterface;
  ingredients: IngredientInterface[];
  onCardClick: (ingredient: IngredientInterface) => void;
}
export function IngredientsCards({ categories, ingredients, onCardClick }: IngredientCardInterface): ReactElement {
  const gridClassName = `${styles.cardsGrid} pl-2 pr-2 pt-6`;
  console.log(ingredients);
  return (
    <>
      {Object.keys(categories).map((category) => {
        return (
          <section
            ref={categories[category].ref}
            key={category}
            className="mt-10 mb-6">
            <h2 className="text text_type_main-medium">{categories[category].name}</h2>
            <div className={gridClassName}>
              {ingredients
                .filter((ingredient) => ingredient.type === category)
                .map((ingredient) => (
                  <div
                    key={ingredient._id}
                    onClick={(e) => onCardClick(ingredient)}>
                    <Ingredient {...ingredient} />
                  </div>
                ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
