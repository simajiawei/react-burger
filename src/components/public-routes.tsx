import { Navigate, Outlet } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React from 'react';
import { useSelector } from 'react-redux';
import { StoreInterface } from '../services/store.interface';

export function PublicRoutes() {
  const { isLoggedIn } = useSelector((store: StoreInterface) => store.auth);

  if (isLoggedIn == null) {
    return null;
  }

  return !isLoggedIn ? <Outlet /> : <Navigate to={Pages.HOME} />;
}
