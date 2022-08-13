import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { CategoryKey } from '../../enums/category-key.enum';

const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients';

interface IngrediendsResponseInterface {
  data: IngredientInterface[];
  success: boolean;
}

function App() {
  const [ingredients, setIngredients]: [IngredientInterface[], any] = useState([]);
  const [bun, setBun]: [IngredientInterface | undefined, any] = useState();

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
    setBun(bun);
  }, [ingredients]);

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
            <BurgerConstructor
              bun={bun as IngredientInterface}
              ingredients={ingredients.filter((ingredient) =>
                [CategoryKey.MAIN, CategoryKey.SAUCE].includes(ingredient.type)
              )}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
