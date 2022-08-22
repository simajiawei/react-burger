import { Ingredient } from '../ingredient/ingredient';
import React, { ReactElement } from 'react';
import { CategoryKey } from '../../../enums/category-key.enum';
import { IngredientInterface } from '../../../interfaces/ingredient.interface';
import styles from './ingredients-cards.module.css';

interface IngredientCardInterface {
  categories: { [key: string]: string };
  ingredients: IngredientInterface[];
  onCardClick: (ingredient: IngredientInterface) => void;
}
export function IngredientsCards({ categories, ingredients, onCardClick }: IngredientCardInterface): ReactElement {
  const gridClassName = `${styles.cardsGrid} pl-2 pr-2 pt-6`;

  return (
    <>
      {Object.keys(categories).map((category) => {
        return (
          <section
            key={category}
            className="mt-10 mb-6">
            <h2 className="text text_type_main-medium">{categories[category]}</h2>
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
