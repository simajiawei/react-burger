import React, { SyntheticEvent, useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { getIngredients } from '../../services/actions/burger.actions';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useAppDispatch } from '../../utils/hooks';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from '../../pages/home.page';
import { NotFoundPage } from '../../pages/not-found.page';
import { Pages } from '../../enums/pages.enum';
import { LoginPage } from '../../pages/login.page';
import { RegisterPage } from '../../pages/register.page';
import { ForgotPasswordPage } from '../../pages/forgot-password.page';
import { ResetPasswordPage } from '../../pages/reset-password.page';
import { ProfilePage } from '../../pages/profile.page';
import { PrivateRoutes } from '../private-routes';
import { PublicRoutes } from '../public-routes';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';
import { StoreInterface } from '../../services/store.interface';

function App() {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { ingredients } = useSelector((store: StoreInterface) => store.burger);

    let background = location.state && location.state.background;

    const onCloseDetails = (e: SyntheticEvent) => {
      navigate(-1);
    };

    useEffect(() => {
      dispatch(getIngredients());
    }, [dispatch]);

    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <Routes location={background || location}>
              <Route
                path={Pages.HOME}
                element={<HomePage />}></Route>

              <Route
                path={`${Pages.INGREDIENTS}/:ingredientId`}
                element={ingredients.length > 0 && <IngredientDetails />}
              />

              {/* ONLY NOT AUTHENTICATED USERS */}
              <Route element={<PublicRoutes />}>
                <Route
                  path={Pages.FORGOT_PASSWORD}
                  element={<ForgotPasswordPage />}
                />

                <Route
                  path={Pages.RESET_PASSWORD}
                  element={<ResetPasswordPage />}
                />
                <Route
                  path={Pages.LOGIN}
                  element={<LoginPage />}
                />
                <Route
                  path={Pages.REGISTER}
                  element={<RegisterPage />}
                />
              </Route>

              {/* ONLY AUTHENTICATED USERS */}
              <Route element={<PrivateRoutes />}>
                <Route
                  path={Pages.PROFILE}
                  element={<ProfilePage />}
                />
              </Route>
              <Route
                path="*"
                element={<NotFoundPage />}
              />
            </Routes>
            <Routes>
              {background && ingredients.length > 0 && (
                <Route
                  path={`${Pages.INGREDIENTS}/:ingredientId`}
                  element={
                    <Modal
                      onClose={onCloseDetails}
                      title="Детали ингредиента">
                      <IngredientDetails />
                    </Modal>
                  }></Route>
              )}
            </Routes>
          </DndProvider>
        </main>
      </>
    );
  };

  return (
    <>
      <BrowserRouter>
        <ModalSwitch />
      </BrowserRouter>
    </>
  );
}

export default App;
