import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Pages } from '../enums/pages.enum';
import styles from './login.page.module.css';

export function LoginPage() {
  const handleInputChange = () => {};
  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-medium">Вход</h1>

      <div className="mb-6 mt-6">
        <Input
          value=""
          onChange={handleInputChange}
          type="email"
          placeholder="E-mail"
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
