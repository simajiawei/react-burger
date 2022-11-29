import styles from './profile.page.module.css';
import React, { FC } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../services/actions/auth.actions';
import { Pages } from '../enums/pages.enum';
import { useAppDispatch } from '../utils/hooks';

export const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(
      logout(() => {
        navigate(Pages.LOGIN);
      })
    );
  };

  const wrapperClassName = `${styles.wrapper}`;
  const menuItemClassName = `${styles.menuItem} text text_type_main-medium`;
  const logoutItemClassName = `${menuItemClassName} ${styles.logout} text_color_inactive`;
  const menuDisclaimerClassName = `${styles.menuDisclaimer} text text_type_main-default text_color_inactive`;
  const menuLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text_color_primary' : 'text_color_inactive';

  return (
    <div className={wrapperClassName}>
      <div className={styles.menu}>
        <NavLink
          to=""
          className={menuLinkClassName}>
          <p className={menuItemClassName}>Профиль</p>
        </NavLink>
        <NavLink
          to={`${Pages.PROFILE}${Pages.ORDERS}`}
          className={menuLinkClassName}>
          <p className={menuItemClassName}>История заказов</p>
        </NavLink>

        <p
          className={logoutItemClassName}
          onClick={handleLogout}>
          Выход
        </p>

        <div className="mt-20">
          <p className={menuDisclaimerClassName}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
      </div>

      <div className={styles.userInfo}>
        <Outlet />
      </div>
    </div>
  );
};
