import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import styles from './login.page.module.css';
import { useAppDispatch } from '../utils/hooks';
import { useState } from 'react';
import { NewUserInterface } from '../interfaces/requests/new-user.interface';
import { signIn, signUp } from '../services/actions/auth.actions';
import { CredentialsInterface } from '../interfaces/requests/credentials.interface';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<CredentialsInterface>({
    email: '',
    password: ''
  });

  const handleInputChange = (event: any) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };
  const handleSubmit = () => {
    dispatch(signIn(state));
  };
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium">Вход</h1>

      <div className="mb-6 mt-6">
        <Input
          value={state.email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="E-mail"
        />
      </div>
      <div className="mb-6 mt-6">
        <PasswordInput
          value={state.password}
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-20">
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}>
          Войти
        </Button>
      </div>

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
}
