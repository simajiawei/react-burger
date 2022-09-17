import styles from './profile.page.module.css';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { UserInfoInterface } from '../interfaces/user-info.interface';
import { NavLink } from 'react-router-dom';

export function ProfilePage() {
  const [isDisabled, setIsDisabled] = useState({
    name: true,
    email: true
  });

  const handleEditClick = (event: any) => {
    const name: keyof UserInfoInterface = event.target.name;
    setIsDisabled({
      ...isDisabled,
      [name]: !isDisabled[name]
    });
  };

  const handleInputChange = (event: any) => {};

  const wrapperClassName = `${styles.wrapper}`;
  const menuItemClassName = `${styles.menuItem} text text_type_main-medium text_color_inactive`;
  const menuDisclaimerClassName = `${styles.menuDisclaimer} text text_type_main-default text_color_inactive`;
  return (
    <div className={wrapperClassName}>
      <div className={styles.menu}>
        <NavLink
          to=""
          className={styles.activeMenuItem}>
          <p className={menuItemClassName}>Профиль</p>
        </NavLink>
        <NavLink
          to="orders"
          className={styles.activeMenuItem}>
          <p className={menuItemClassName}>История заказов</p>
        </NavLink>
        <NavLink to="exit">
          <p className={menuItemClassName}>Выход</p>
        </NavLink>

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
