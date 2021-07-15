import {
  registerRequest,
  loginRequest,
  logoutRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  getUserRequest,
  putUserRequest,
  tokenRequest,
} from "../../utils/api";
import { setCookie, getCookie, deleteCookie } from "../../utils/utils";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";

export const SET_USER = "SET_USER";
export const SET_USER_FAILED = "SET_USER_FAILED";
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
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
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
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logout() {
  return function (dispatch) {
    const refreshToken = localStorage.getItem("refreshToken");
    logoutRequest({ token: refreshToken })
      .then(({ message }) => {
        console.log(message);
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        localStorage.removeItem("refreshToken");
        deleteCookie("token");
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function forgotPassword(data) {
  return function (dispatch) {
    forgotPasswordRequest(data)
      .then(({ message }) => {
        console.log(message);
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function resetPassword(data) {
  return function (dispatch) {
    resetPasswordRequest(data)
      .then(({ message }) => {
        console.log(message);
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function getUser() {
  return function (dispatch) {
    getUserRequest()
      .then(({ user }) => {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = getCookie("token");
        dispatch({
          type: SET_USER,
          user,
          accessToken,
          refreshToken,
        });
      })
      .catch((err) => {
        if (err === "jwt expired") {
          dispatch(refreshToken(getUser()));
        } else {
          console.error(err);
          dispatch({
            type: SET_USER_FAILED,
          });
        }
      });
  };
}

export function putUser(data) {
  return function (dispatch) {
    putUserRequest(data)
      .then(({ user }) => {
        dispatch({
          type: SET_USER,
          user,
        });
      })
      .catch((err) => {
        if (err === "jwt expired") {
          dispatch(refreshToken(getUser()));
        } else {
          console.error(err);
        }
      });
  };
}

const refreshToken = (afterRefresh) => {
  return function (dispatch) {
    const refreshToken = localStorage.getItem("refreshToken");
    tokenRequest({ token: refreshToken }).then(
      ({ accessToken, refreshToken }) => {
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(afterRefresh);
      }
    );
  };
};
