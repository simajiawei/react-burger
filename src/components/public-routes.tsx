import { getTokenFromLS } from '../utils/token';
import { Navigate, Outlet } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React from 'react';

export function PublicRoutes() {
  const accessToken = getTokenFromLS('accessToken');
  return !accessToken ? <Outlet /> : <Navigate to={Pages.HOME} />;
}
