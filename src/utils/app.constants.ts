// base
const domain = 'norma.nomoreparties.space';
export const apiBaseUrl = `https://${domain}/api`;
export const wsBaseUrl = `wss://${domain}`;

// burger
export const ingredientsApiUrl = `${apiBaseUrl}/ingredients`;
export const ordersApiUrl = `${apiBaseUrl}/orders`;

// auth
export const signUpApiUrl = `${apiBaseUrl}/auth/register`;
export const signInUrl = `${apiBaseUrl}/auth/login`;
export const logoutUrl = `${apiBaseUrl}/auth/logout`;
export const updateTokenUrl = `${apiBaseUrl}/auth/token`;
export const userApiUrl = `${apiBaseUrl}/auth/user`;

// orders
export const ordersUrl = `${wsBaseUrl}/orders/all`;
export const ordersHistoryUrl = `${wsBaseUrl}/orders`;
