import React, { useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions';
import { ThunkDispatch } from 'redux-thunk';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BURGER_ACTIONS } from '../../services/actions/actions.interface';

function App() {
  const dispatch: ThunkDispatch<any, any, BURGER_ACTIONS> = useDispatch();

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
