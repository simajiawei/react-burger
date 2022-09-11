import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React from 'react';
import styles from './forgot-password.page.module.css';

export function ForgotPasswordPage() {
  const handleInputChange = () => {};
  const handleSubmit = () => {};
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>

      <div className="mb-6 mt-6">
        <Input
          value=""
          onChange={handleInputChange}
          type="email"
          placeholder="Укажите e-mail"
        />
      </div>
      <div className="mb-20">
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}>
          Восстановить
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
