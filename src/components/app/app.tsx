import React, { useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { getIngredients } from '../../services/actions';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useAppDispatch } from '../../utils/hooks';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home.page';
import { NotFoundPage } from '../../pages/not-found.page';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <Route
              path="/"
              exact={true}>
              <HomePage />
            </Route>
            <Route
              path="/login"
              exact={true}>

            </Route>
            <Route
              path="/register"
              exact={true}></Route>
            <Route
              path="/forgot-password"
              exact={true}></Route>
            <Route
              path="/reset-password"
              exact={true}></Route>
            <Route
              path="/profile"
              exact={true}></Route>
            <Route
              path={'/ingredients/:id'}
              exact={true}></Route>
            <Route>
              <NotFoundPage />
            </Route>
          </BrowserRouter>
        </DndProvider>
      </main>
    </>
  );
}

export default App;
