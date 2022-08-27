import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { CategoryKey } from '../../enums/category-key.enum';
import { BurgerContext } from '../../services/burger-context';
import { apiBaseUrl } from '../../utils/app.constants';
import { checkResponse } from '../../utils/check-response';

const ingredientsApiUrl = `${apiBaseUrl}/ingredients`;

interface IngrediendsResponseInterface {
  data: IngredientInterface[];
  success: boolean;
}

function App() {
  const [ingredients, setIngredients]: [IngredientInterface[], any] = useState([]);

  useEffect(() => {
    const getIngredients = () => {
      fetch(ingredientsApiUrl)
        .then<IngrediendsResponseInterface>(checkResponse)
        .then((responseData) => setIngredients(responseData.data))
        .catch((error) => {
          console.error('Error fetching ingredients', error);
        });
    };
    getIngredients();
  }, []);

  const constructorWrapperClassName = `${styles.constructorWrapper} pl-4 pr-4 pt-25`;

  return (
    <>
      <AppHeader />
      <main>
        <BurgerContext.Provider value={ingredients}>
          <div className={styles.mainWrapper}>
            <div className={styles.ingredientsWrapper}>
              <BurgerIngredients />
            </div>
            <div className={constructorWrapperClassName}>
              <BurgerConstructor />
            </div>
          </div>
        </BurgerContext.Provider>
      </main>
    </>
  );
}

export default App;
