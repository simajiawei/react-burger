import styles from './reset-password.page.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React, { FC, FormEvent } from 'react';
import { PasswordResetResponseInterface } from '../interfaces/responses/password-reset-response.interface';
import { checkResponse } from '../utils/check-response';
import { apiBaseUrl } from '../utils/app.constants';
import { useForm } from '../utils/use-form';

const resetPasswordApiUrl = `${apiBaseUrl}/password-reset/reset`;

export const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm({
    password: '',
    token: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(resetPasswordApiUrl, {
      method: 'POST',
      body: JSON.stringify(values),
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
      <form onSubmit={handleSubmit}>
        <div className="mb-6 mt-6">
          <PasswordInput
            value={values.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6 mt-6">
          <Input
            value={values.token}
            name="token"
            placeholder="Введите код из письма"
            onChange={handleChange}
          />
        </div>
        <div className="mb-20">
          <Button
            type="primary"
            htmlType="submit"
            size="medium">
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
      </form>
    </div>
  );
};
