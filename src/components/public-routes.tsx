import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React from 'react';
import { useSelector } from 'react-redux';
import { StoreInterface } from '../services/store.interface';

export function PublicRoutes() {
  const { isLoggedIn } = useSelector((store: StoreInterface) => store.auth);
  const location = useLocation();
  if (isLoggedIn == null) {
    return null;
  }
  console.log('PublicRoutes', location.state);

  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={location.state?.from ? location.state.from : Pages.HOME}
      replace={true}
    />
  );
}
