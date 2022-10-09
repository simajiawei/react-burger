import styles from './home.page.module.css';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import React, { FC } from 'react';

export const HomePage: FC = () => {
  const constructorWrapperClassName = `${styles.constructorWrapper} pl-4 pr-4 pt-25`;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.ingredientsWrapper}>
        <BurgerIngredients />
      </div>
      <div className={constructorWrapperClassName}>
        <BurgerConstructor />
      </div>
    </div>
  );
};
