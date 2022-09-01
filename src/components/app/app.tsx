import React, { useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../services/actions';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useAppDispatch } from '../../utils/hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const constructorWrapperClassName = `${styles.constructorWrapper} pl-4 pr-4 pt-25`;

  return (
    <>
      <AppHeader />
      <main>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.mainWrapper}>
            <div className={styles.ingredientsWrapper}>
              <BurgerIngredients />
            </div>
            <div className={constructorWrapperClassName}>
              <BurgerConstructor />
            </div>
          </div>
        </DndProvider>
      </main>
    </>
  );
}

export default App;
