import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React, { FC } from 'react';
import styles from './forgot-password.page.module.css';
import { PasswordResetResponseInterface } from '../interfaces/responses/password-reset-response.interface';
import { checkResponse } from '../utils/check-response';
import { apiBaseUrl } from '../utils/app.constants';
import { useForm } from '../utils/use-form';

const forgotPasswordApiUrl = `${apiBaseUrl}/password-reset`;

export const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: ''
  });

  const handleSubmit = () => {
    fetch(forgotPasswordApiUrl, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then<PasswordResetResponseInterface>(checkResponse)
      .then(() => {
        navigate(Pages.RESET_PASSWORD, { replace: true });
      })
      .catch((error) => {
        console.error('Cannot perform password reset request', error);
      });
  };
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <div className="mb-6 mt-6">
          <Input
            value={values.email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Укажите e-mail"
          />
        </div>
        <div className="mb-20">
          <Button
            htmlType="submit"
            type="primary"
            size="medium">
            Восстановить
          </Button>
        </div>
      </form>

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
};
