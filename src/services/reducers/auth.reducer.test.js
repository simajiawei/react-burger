import { authReducer } from './auth.reducer';
import { SET_IS_LOGGED_IN, SET_USER } from '../actions/auth.actions';
import { initialState } from './auth.reducer';

describe('auth reducer', () => {
  const user = {
    name: 'Test user',
    email: 'testemail@mail.ru'
  };
  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_USER', () => {
    expect(
      authReducer(
        {},
        {
          type: SET_USER,
          user
        }
      )
    ).toEqual({
      isLoggedIn: true,
      user
    });
  });

  it('should handle SET_IS_LOGGED_IN', () => {
    expect(
      authReducer(
        {
          isLoggedIn: false,
          user
        },
        {
          type: SET_IS_LOGGED_IN,
          isLoggedIn: true
        }
      )
    ).toEqual({
      isLoggedIn: true,
      user
    });
  });
});
