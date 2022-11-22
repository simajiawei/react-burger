import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React, { FC } from 'react';
import { useSelector } from '../utils/hooks';

export const PublicRoutes: FC = () => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  const location = useLocation();
  if (isLoggedIn == null) {
    return null;
  }

  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={location.state?.from ? location.state.from : Pages.HOME}
      replace={true}
    />
  );
};
