import React from 'react';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import styles from './ingredient-details.module.css';
import { IngredientContentItem } from './ingredient-content-item/ingredient-content-item';

interface IngredientDetailsProps {
  ingredient: IngredientInterface;
}

export function IngredientDetails(props: IngredientDetailsProps) {
  const contents: [string, number][] = [
    ['Калории, ккал', props.ingredient.calories],
    ['Белки, г', props.ingredient.proteins],
    ['Жиры, г', props.ingredient.fat],
    ['Углеводы, г', props.ingredient.carbohydrates]
  ];

  const imageClassName = `${styles.imageWrapper} pl-5 pr-5 mb-4`;
  const contentsClassName = `${styles.contentsWrapper} mb-15`;
  return (
    <div className={styles.card}>
      <div className={imageClassName}>
        <img
          src={props.ingredient.image_large}
          alt={props.ingredient.name}
        />
      </div>
      <h2 className="text text_type_main-medium mb-8">{props.ingredient.name}</h2>
      <div className={contentsClassName}>
        {contents.map(([title, amount], ix) => (
          <IngredientContentItem
            key={ix}
            title={title}
            amount={amount}
          />
        ))}
      </div>
    </div>
  );
}
