import styles from './reset-password.page.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React from 'react';

export function ResetPasswordPage() {
  const handleInputChange = () => {};
  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>

      <div className="mb-6 mt-6">
        <PasswordInput
          value=""
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-6 mt-6">
        <PasswordInput
          value=""
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-20">
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}>
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{' '}
        <Link
          to={Pages.LOGIN}
          className="link">
          Войти
        </Link>
      </p>
    </div>
  );
}
