import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import { useSelector } from 'react-redux';
import { StoreInterface } from '../services/store.interface';

export function PrivateRoutes() {
  const { isLoggedIn } = useSelector((store: StoreInterface) => store.auth);
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
}
