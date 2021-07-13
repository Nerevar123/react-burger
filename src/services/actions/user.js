import {
  registerRequest,
  loginRequest,
  resetPasswordRequest,
  setPasswordRequest,
} from "../../utils/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const SET_PASSWORD_REQUEST = "SET_PASSWORD_REQUEST";
export const SET_PASSWORD_SUCCESS = "SET_PASSWORD_SUCCESS";
export const SET_PASSWORD_FAILED = "SET_PASSWORD_FAILED";

export function register(data) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerRequest(data)
      .then(({ user, accessToken, refreshToken }) => {
        dispatch({
          type: REGISTER_SUCCESS,
          user,
          accessToken,
          refreshToken,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
}

export function login(data) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginRequest(data)
      .then(({ user, accessToken, refreshToken }) => {
        dispatch({
          type: LOGIN_SUCCESS,
          user,
          accessToken,
          refreshToken,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function resetPassword(data) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPasswordRequest(data)
      .then(({ message }) => {
        console.log(message);
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
}

export function setPassword(data) {
  return function (dispatch) {
    dispatch({
      type: SET_PASSWORD_REQUEST,
    });
    setPasswordRequest(data)
      .then(({ message }) => {
        console.log(message);
        dispatch({
          type: SET_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: SET_PASSWORD_FAILED,
        });
      });
  };
}
