import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { CategoryKey } from '../../enums/category-key.enum';
import { SelectedIngredientsContext } from '../../services/burger-constructor-context';
import { apiBaseUrl } from '../../app.constants';

const ingredientsApiUrl = `${apiBaseUrl}/ingredients`;

interface IngrediendsResponseInterface {
  data: IngredientInterface[];
  success: boolean;
}

function App() {
  const [ingredients, setIngredients]: [IngredientInterface[], any] = useState([]);
  const [selectedIngredients, setSelectedIngredients]: [IngredientInterface[], any] = useState([]);

  useEffect(() => {
    const getIngredients = () => {
      fetch(ingredientsApiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json() as Promise<IngrediendsResponseInterface>;
          }
          return Promise.reject(`Ошибка ${response.status}`);
        })
        .then((responseData) => setIngredients(responseData.data))
        .catch((error) => {
          console.error('Error fetching ingredients', error);
        });
    };
    getIngredients();
  }, []);

  useEffect(() => {
    const bun: IngredientInterface = ingredients.find(
      (ingredient) => ingredient.type === CategoryKey.BUN
    ) as IngredientInterface;
    if (!bun) {
      return;
    }
    const betweenBuns: IngredientInterface[] = ingredients.filter((item) => item.type !== CategoryKey.BUN);
    setSelectedIngredients([bun, ...betweenBuns]);
  }, [JSON.stringify(ingredients)]);

  const constructorWrapperClassName = `${styles.constructorWrapper} pl-4 pr-4 pt-25`;

  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.mainWrapper}>
          <div className={styles.ingredientsWrapper}>
            <BurgerIngredients ingredients={ingredients} />
          </div>
          <div className={constructorWrapperClassName}>
            <SelectedIngredientsContext.Provider value={selectedIngredients}>
              <BurgerConstructor />
            </SelectedIngredientsContext.Provider>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
