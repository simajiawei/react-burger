export function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json() as Promise<T>;
  }
  return Promise.reject(`Ошибка ${response.status}`);
}
