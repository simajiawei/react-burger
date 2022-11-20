import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.page.module.css';
import React, { FormEvent, useEffect, useState } from 'react';
import { getUser, updateUser } from '../services/actions/auth.actions';
import { UserInterface } from '../interfaces/models/user.interface';
import { useSelector } from 'react-redux';
import { StoreInterface } from '../services/store.interface';
import { useForm } from '../utils/use-form';
import { useAppDispatch } from '../utils/hooks';

const disabledInitialState = {
  name: true,
  email: true
};

export const ProfileUserPage = () => {
  const dispatch = useAppDispatch();

  const user = useSelector((store: StoreInterface) => store.auth.user);

  const { values, handleChange, setValues } = useForm<UserInterface>({
    email: '',
    name: ''
  });
  const [isDisabled, setIsDisabled] = useState(disabledInitialState);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  // sync user data with the one from server
  useEffect(() => {
    setValues({
      ...values,
      ...user
    });
    console.log('values', values);
  }, [user]);

  const handleEditClick = (name: keyof UserInterface) => {
    setIsDisabled({
      ...isDisabled,
      [name]: !isDisabled[name]
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(values));
  };

  const handleCancel = () => {
    setIsDisabled(disabledInitialState);
    setValues(user as UserInterface);
  };

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Input
              value={values.name}
              onChange={handleChange}
              type="text"
              onIconClick={() => handleEditClick('name')}
              name="name"
              disabled={isDisabled.name}
              icon="EditIcon"
              placeholder="Имя"
            />
          </div>
          <div className="mb-6 mt-6">
            <Input
              value={values.email}
              onChange={handleChange}
              onIconClick={() => handleEditClick('email')}
              type="email"
              name="email"
              disabled={isDisabled.email}
              icon="EditIcon"
              placeholder="Логин"
            />
          </div>
          <div className="mb-6 mt-6">
            {/* according to
           https://practicum-students.slack.com/archives/C03R8QJ0C3E/p1661845624112479?thread_ts=1661806922.038829&cid=C03R8QJ0C3E
           should be just a plug */}
            <Input
              value="somepassword"
              type="password"
              name="password"
              placeholder="Пароль"
              disabled={true}
              icon="EditIcon"
              onChange={handleChange}
            />
          </div>

          <div className={styles.actionButtons}>
            <Button
              type="secondary"
              size="medium"
              htmlType="button"
              onClick={handleCancel}>
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
