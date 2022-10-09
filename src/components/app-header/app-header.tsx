import React, { FC, useRef } from 'react';
import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeaderTab } from './app-header-tab/app-header-tab';
import { NavLink } from 'react-router-dom';
import { Pages } from '../../enums/pages.enum';

export const AppHeader: FC = () => {
  const navClassName = `${styles.nav} p-4`;
  const logoClassName = `${styles.logo}`;
  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text_color_inactive' : 'text_color_primary';
  return (
    <header>
      <div className={styles.navWrapper}>
        <nav className={navClassName}>
          <div className={styles.navLeft}>
            <NavLink
              to={Pages.HOME}
              end
              className={navLinkClassName}>
              <AppHeaderTab icon={<BurgerIcon type="primary" />}>Конструктор</AppHeaderTab>
            </NavLink>

            <NavLink
              to="/current-orders"
              className={navLinkClassName}>
              <AppHeaderTab icon={<ListIcon type="primary" />}>Лента заказов</AppHeaderTab>
            </NavLink>
          </div>
          <div className={logoClassName}>
            <Logo />
          </div>
          <div className={styles.navRight}>
            <NavLink
              to={Pages.PROFILE}
              className={navLinkClassName}>
              <AppHeaderTab icon={<ProfileIcon type="primary" />}>Личный кабинет</AppHeaderTab>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};
