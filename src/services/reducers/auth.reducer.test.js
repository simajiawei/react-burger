import { authReducer } from './auth.reducer';
import { SET_IS_LOGGED_IN, SET_USER } from '../actions/auth.actions';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      user: null,
      isLoggedIn: null
    });
  });

  it('should handle SET_USER', () => {
    expect(
      authReducer(
        {},
        {
          type: SET_USER,
          user: {
            name: 'Test user',
            email: 'testemail@mail.ru'
          }
        }
      )
    ).toEqual({
      isLoggedIn: true,
      user: {
        name: 'Test user',
        email: 'testemail@mail.ru'
      }
    });
  });

  it('should handle SET_IS_LOGGED_IN', () => {
    expect(
      authReducer(
        {
          isLoggedIn: false,
          user: {
            name: 'Test user',
            email: 'testemail@mail.ru'
          }
        },
        {
          type: SET_IS_LOGGED_IN,
          isLoggedIn: true
        }
      )
    ).toEqual({
      isLoggedIn: true,
      user: {
        name: 'Test user',
        email: 'testemail@mail.ru'
      }
    });
  });
});
