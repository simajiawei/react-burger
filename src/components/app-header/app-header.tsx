import React from 'react';
import styles from './app-header.module.css';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {AppHeaderStateInterface, Tabs} from "./app-header.interface";
import {AppHeaderTab} from "./app-header-tab/app-header-tab";




export class AppHeader extends React.Component {
  state:AppHeaderStateInterface = {
    active: Tabs.CONSTRUCTOR
  }

  setCurrentTab = (active:string)=>{
    this.setState({
      ...this.state,
      active
    })
  }


  render() {
    const navClassName = `${styles.nav} p-4`;
    const logoClassName = `${styles.logo}`
    return <header>
      <div className={styles.navWrapper}>
        <nav className={navClassName}>
          <div className={styles.navLeft}>
            <AppHeaderTab icon={<BurgerIcon type="primary" />} active={this.state.active === Tabs.CONSTRUCTOR}>Конструктор</AppHeaderTab>
            <AppHeaderTab icon={<ListIcon type="primary" />} active={this.state.active === Tabs.ORDERS}>Лента заказов</AppHeaderTab>
          </div>
          <div className={logoClassName}>
            <Logo/>
          </div>
          <div className={styles.navRight}>
            <AppHeaderTab icon={<ProfileIcon type="primary" />} active={this.state.active === Tabs.PROFILE}>Личный кабинет</AppHeaderTab>
          </div>
        </nav>
      </div>

    </header>;
  }
}
