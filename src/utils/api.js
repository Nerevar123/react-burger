import { baseUrl, checkError, headers, getCookie } from "./utils";

export const getIngredientsRequest = () => {
  return fetch(`${baseUrl}/ingredients`, {
    headers: headers,
  }).then(checkError);
};

export const postOrderRequest = (data) => {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(checkError);
};

export const loginRequest = (data) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(checkError);
};

export const registerRequest = (data) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(checkError);
};

export const logoutRequest = (data) => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(checkError);
};

export const getUserRequest = () => {
  return fetch(`${baseUrl}/auth/user`, {
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("token"),
    },
  }).then(checkError);
};

export const putUserRequest = (data) => {
  return fetch(`${baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie("token"),
    },
    body: JSON.stringify(data),
  }).then(checkError);
};

export const tokenRequest = (data) => {
  return fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(checkError);
};

export const forgotPasswordRequest = (data) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(checkError);
};

export const resetPasswordRequest = (data) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  }).then(checkError);
};
