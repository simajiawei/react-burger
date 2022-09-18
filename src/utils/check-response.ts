export function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json() as Promise<T>;
  }
  return response.json().then((err) => Promise.reject(err));
}
