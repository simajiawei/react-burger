import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <>
      <h1>Извините, данной страницы не существует</h1>
      <p>
        Вы можете вернуться на
        <Link to="/">главную страницу</Link>
      </p>
    </>
  );
}
