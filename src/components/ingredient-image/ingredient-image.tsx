import React, { FC } from 'react';
import styles from './ingredient-image.module.css';
export const IngredientImage: FC<{ image: string }> = ({ image }) => {
  return (
    <div className={styles.ingredientPreview}>
      <img
        className={styles.ingredientPreviewImage}
        src={image}
        alt="Ингредиент"
      />
    </div>
  );
};
