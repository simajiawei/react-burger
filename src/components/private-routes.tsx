import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import { getTokenFromLS } from '../utils/token';

export function PrivateRoutes() {
  const accessToken = getTokenFromLS('accessToken');
  const location = useLocation();
  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate
      to={Pages.LOGIN}
      state={{ from: location }}
    />
  );
}
