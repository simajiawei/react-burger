import styles from './register.page.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import React, { useState } from 'react';
import { useAppDispatch } from '../utils/hooks';
import { signUp } from '../services/actions/auth.actions';
import { NewUserInterface } from '../interfaces/requests/new-user.interface';

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const [newUser, setNewUser] = useState<NewUserInterface>({
    email: '',
    name: '',
    password: ''
  });

  const handleInputChange = (event: any) => {
    const name = event.target.name;
    setNewUser({
      ...newUser,
      [name]: event.target.value
    });
  };
  const handleSubmit = () => {
    dispatch(signUp(newUser));
  };
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <div className="mb-6 mt-6">
        <Input
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          type="text"
          placeholder="Имя"
        />
      </div>
      <div className="mb-6 mt-6">
        <Input
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          type="email"
          placeholder="E-mail"
        />
      </div>
      <div className="mb-6 mt-6">
        <PasswordInput
          value={newUser.password}
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-20">
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}>
          Зарегистрироваться
        </Button>
      </div>

      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?&nbsp;
        <Link
          to={Pages.LOGIN}
          className="link">
          Войти
        </Link>
      </p>
    </div>
  );
}
