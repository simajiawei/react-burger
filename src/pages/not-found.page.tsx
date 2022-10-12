import { Link } from 'react-router-dom';
import React, { FC } from 'react';

export const NotFoundPage: FC = () => {
  return (
    <div>
      <h1 className="text text_type_main-large">Извините, данной страницы не существует</h1>
      <p className="text text_type_main-medium">
        Вы можете вернуться на
        <Link to="/">главную страницу</Link>
      </p>
    </div>
  );
};
