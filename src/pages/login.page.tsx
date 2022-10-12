import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import styles from './login.page.module.css';
import { useAppDispatch } from '../utils/hooks';
import React, { FC, FormEvent } from 'react';
import { signIn } from '../services/actions/auth.actions';
import { CredentialsInterface } from '../interfaces/models/credentials.interface';
import { useForm } from '../utils/use-form';

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm<CredentialsInterface>({
    email: '',
    password: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(values));
  };

  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6 mt-6">
          <Input
            value={values.email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="E-mail"
          />
        </div>
        <div className="mb-6 mt-6">
          <PasswordInput
            value={values.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="mb-20">
          <Button
            htmlType="submit"
            type="primary"
            size="medium">
            Войти
          </Button>
        </div>
      </form>
      <p className="text text_type_main-default text_color_inactive  mb-1">
        Вы – новый пользователь?{' '}
        <Link
          to={Pages.REGISTER}
          className="link">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link
          to={Pages.FORGOT_PASSWORD}
          className="link">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};
