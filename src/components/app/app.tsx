import React, { useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { AppActions, getIngredients } from '../../services/actions';
import { ThunkDispatch } from 'redux-thunk';

function App() {
  const dispatch: ThunkDispatch<any, any, AppActions> = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const constructorWrapperClassName = `${styles.constructorWrapper} pl-4 pr-4 pt-25`;

  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.mainWrapper}>
          <div className={styles.ingredientsWrapper}>
            <BurgerIngredients />
          </div>
          <div className={constructorWrapperClassName}>
            <BurgerConstructor />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
