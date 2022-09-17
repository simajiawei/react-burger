import React, { useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { getIngredients } from '../../services/actions/burger.actions';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useAppDispatch } from '../../utils/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/home.page';
import { NotFoundPage } from '../../pages/not-found.page';
import { Pages } from '../../enums/pages.enum';
import { LoginPage } from '../../pages/login.page';
import { RegisterPage } from '../../pages/register.page';
import { ForgotPasswordPage } from '../../pages/forgot-password.page';
import { ResetPasswordPage } from '../../pages/reset-password.page';
import { ProfilePage } from '../../pages/profile.page';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <Routes>
              <Route
                path={Pages.HOME}
                element={<HomePage />}
              />
              <Route
                path={Pages.LOGIN}
                element={<LoginPage />}
              />
              <Route
                path={Pages.REGISTER}
                element={<RegisterPage />}
              />

              <Route
                path={Pages.FORGOT_PASSWORD}
                element={<ForgotPasswordPage />}
              />

              <Route
                path={Pages.RESET_PASSWORD}
                element={<ResetPasswordPage />}
              />
              <Route
                path={Pages.PROFILE}
                element={<ProfilePage />}
              />

              <Route path={`${Pages.INGREDIENTS}/:id`}></Route>
              <Route
                path="*"
                element={<NotFoundPage />}
              />
            </Routes>
          </DndProvider>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
