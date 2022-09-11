import React, { useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { getIngredients } from '../../services/actions';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useAppDispatch } from '../../utils/hooks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from '../../pages/home.page';
import { NotFoundPage } from '../../pages/not-found.page';
import { Pages } from '../../enums/pages.enum';
import { LoginPage } from '../../pages/login.page';
import { RegisterPage } from '../../pages/register.page';

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
            <Switch>
              <Route
                path="/"
                exact={true}>
                <HomePage />
              </Route>
              <Route
                path={Pages.LOGIN}
                exact={true}>
                <LoginPage />
              </Route>
              <Route
                path={Pages.REGISTER}
                exact={true}>
                <RegisterPage />
              </Route>
              <Route
                path={Pages.FORGOT_PASSWORD}
                exact={true}></Route>
              <Route
                path={Pages.RESET_PASSWORD}
                exact={true}></Route>
              <Route
                path={Pages.PROFILE}
                exact={true}></Route>
              <Route
                path={`${Pages.INGREDIENTS}/:id`}
                exact={true}></Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </BrowserRouter>
        </DndProvider>
      </main>
    </>
  );
}

export default App;
