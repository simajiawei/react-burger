import styles from './reset-password.page.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React, { useState } from 'react';
import { PasswordResetResponseInterface } from '../interfaces/password-reset-response.interface';
import { checkResponse } from '../utils/check-response';
import { apiBaseUrl } from '../utils/app.constants';

const resetPasswordApiUrl = `${apiBaseUrl}/password-reset/reset`;

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    password: '',
    token: ''
  });

  const handleInputChange = (event: any) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };
  const handleSubmit = () => {
    fetch(resetPasswordApiUrl, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then<PasswordResetResponseInterface>(checkResponse)
      .then(() => {
        navigate(Pages.LOGIN, { replace: true });
      })
      .catch((error) => {
        console.error('Cannot perform password reset request', error);
      });
  };
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>

      <div className="mb-6 mt-6">
        <PasswordInput
          value={state.password}
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-6 mt-6">
        <Input
          value={state.token}
          name="token"
          placeholder="Введите код из письма"
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
