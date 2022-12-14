import React, { FC } from 'react';
import { IngredientInterface } from '../../interfaces/models/ingredient.interface';
import styles from './ingredient-details.module.css';
import { IngredientContentItem } from './ingredient-content-item/ingredient-content-item';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';

export const IngredientDetails: FC = () => {
  const { ingredientId } = useParams();

  const { ingredients } = useSelector((store) => store.burger);

  const { calories, proteins, fat, carbohydrates, image_large, name } = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  ) as IngredientInterface;

  const contents: [string, number][] = [
    ['Калории, ккал', calories],
    ['Белки, г', proteins],
    ['Жиры, г', fat],
    ['Углеводы, г', carbohydrates]
  ];

  const imageClassName = `${styles.imageWrapper} pl-5 pr-5 mb-4`;
  const contentsClassName = `${styles.contentsWrapper} mb-15`;
  return (
    <div className={styles.card}>
      <div className={imageClassName}>
        <img
          src={image_large}
          alt={name}
        />
      </div>
      <h2 className="text text_type_main-medium mb-8">{name}</h2>
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
};
