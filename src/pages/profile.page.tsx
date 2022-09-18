import styles from './profile.page.module.css';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { UserInterface } from '../interfaces/models/user.interface';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreInterface } from '../services/store.interface';
import { useAppDispatch } from '../utils/hooks';
import { logout } from '../services/actions/auth.actions';

export function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useSelector((store: StoreInterface) => store.auth.user);

  const [isDisabled, setIsDisabled] = useState({
    name: true,
    email: true
  });

  const handleEditClick = (event: any) => {
    const name: keyof UserInterface = event.target.name;
    setIsDisabled({
      ...isDisabled,
      [name]: !isDisabled[name]
    });
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleInputChange = (event: any) => {};

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
          to="orders"
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
        <div className="mb-6">
          <Input
            value=""
            onChange={handleInputChange}
            type="text"
            onIconClick={handleEditClick}
            name="name"
            disabled={isDisabled.name}
            icon="EditIcon"
            placeholder="Имя"
          />
        </div>
        <div className="mb-6 mt-6">
          <Input
            value=""
            onChange={handleInputChange}
            onIconClick={handleEditClick}
            type="email"
            name="login"
            disabled={isDisabled.email}
            icon="EditIcon"
            placeholder="Логин"
          />
        </div>
        <div className="mb-6 mt-6">
          {/* according to
           https://practicum-students.slack.com/archives/C03R8QJ0C3E/p1661845624112479?thread_ts=1661806922.038829&cid=C03R8QJ0C3E
           should be just a plug */}
          <Input
            value=""
            type="password"
            name="password"
            placeholder="Пароль"
            disabled={true}
            icon="EditIcon"
            onChange={handleEditClick}
          />
        </div>
      </div>
    </div>
  );
}
