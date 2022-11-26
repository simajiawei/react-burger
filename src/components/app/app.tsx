import React, { FC, useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { getIngredients } from '../../services/actions/burger.actions';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useAppDispatch, useSelector } from '../../utils/hooks';
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
import { ACCESS_TOKEN, getCookie, getTokenFromLS, REFRESH_TOKEN } from '../../utils/browser-storage';
import { setIsLoggedIn, updateToken } from '../../services/actions/auth.actions';
import { OrdersPage } from '../../pages/orders.page';
import { OrderFullInfo } from '../order-full-info/order-full-info';
import { wsConnectionStart } from '../../services/actions/ws.actions';
import { ordersUrl } from '../../utils/app.constants';
import { OrdersHistoryPage } from '../../pages/orders-history.page';
import { ProfileUserPage } from '../../pages/profile-user.page';

const App: FC = () => {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { ingredients } = useSelector((store) => store.burger);
    const { orders, wsConnected } = useSelector((store) => store.ws);
    const background = location.state && location.state.background;

    const onCloseDetails = () => {
      navigate(-1);
    };

    useEffect(() => {
      dispatch(getIngredients());
    }, [dispatch]);

    useEffect(() => {
      if (wsConnected) {
        return;
      }
      if (location.pathname.startsWith(Pages.ORDERS)) {
        dispatch(wsConnectionStart(ordersUrl));
      }
    }, [wsConnected, dispatch, location.pathname]);

    useEffect(() => {
      if (getCookie(ACCESS_TOKEN)) {
        // if token exists in cookies, then user definitely logged in
        // otherwise token will be automaticallt removed by TTL
        dispatch(setIsLoggedIn(true));
      } else if (getTokenFromLS(REFRESH_TOKEN)) {
        // if token does not exist in cookies, but refresh token exists, try to fetch user with
        // refreshToken
        dispatch(updateToken());
      } else {
        dispatch(setIsLoggedIn(false));
      }
    }, [dispatch]);

    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <Routes location={background || location}>
              <Route
                path={Pages.HOME}
                element={<HomePage />}
              />

              <Route
                path={`${Pages.INGREDIENTS}/:ingredientId`}
                element={ingredients.length > 0 && <IngredientDetails />}
              />

              <Route
                path={Pages.ORDERS}
                element={<OrdersPage />}
              />
              <Route
                path={`${Pages.ORDERS}/:feedId`}
                element={<OrderFullInfo pageCentered={true} />}
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
                  element={<ProfilePage />}>
                  <Route
                    path={Pages.PROFILE}
                    element={<ProfileUserPage />}
                  />
                  <Route
                    path={`${Pages.PROFILE}${Pages.ORDERS}`}
                    element={<OrdersHistoryPage />}
                  />
                </Route>
                <Route
                  path={`${Pages.PROFILE}${Pages.ORDERS}/:feedId`}
                  element={<OrderFullInfo pageCentered={true} />}
                />
              </Route>
              <Route
                path="*"
                element={<NotFoundPage />}
              />
            </Routes>

            {background && ingredients.length > 0 && (
              <Routes>
                <>
                  <Route
                    path={`${Pages.INGREDIENTS}/:ingredientId`}
                    element={
                      <Modal
                        onClose={onCloseDetails}
                        title="Детали ингредиента">
                        <IngredientDetails />
                      </Modal>
                    }></Route>
                  {orders &&
                    [`${Pages.ORDERS}/:feedId`, `${Pages.PROFILE}${Pages.ORDERS}/:feedId`].map((path, index) => (
                      <Route
                        key={index}
                        path={path}
                        element={
                          <Modal
                            onClose={onCloseDetails}
                            title={
                              <p className="text text_type_digits-default">
                                #
                                {orders.orders
                                  .find((order) => order._id === location.pathname.split('/').slice(-1)[0])
                                  ?.number?.toString()}
                              </p>
                            }>
                            <OrderFullInfo pageCentered={false} />
                          </Modal>
                        }></Route>
                    ))}
                </>
              </Routes>
            )}
          </DndProvider>
        </main>
      </>
    );
  };

  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
};

export default App;
