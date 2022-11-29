import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import { useSelector } from '../utils/hooks';

export const PrivateRoutes: FC = () => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  const location = useLocation();

  if (isLoggedIn == null) {
    return null;
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={Pages.LOGIN}
      state={{ from: location.pathname }}
    />
  );
};
