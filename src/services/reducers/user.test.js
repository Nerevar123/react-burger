import { userReducer } from "./user";
import * as types from "../constants/user";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: undefined,
  isLoggedIn: false,

  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,
  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
  isUserLoaded: false,
};

const token = "token";

const user = "user";

describe("header reducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(
      userReducer([], {
        type: types.FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual({
      forgotPasswordSuccess: true,
    });
  });
  it("should handle LOGIN_FAILED", () => {
    expect(
      userReducer([], {
        type: types.LOGIN_FAILED,
      })
    ).toEqual({
      loginFailed: true,
      loginRequest: false,
    });
  });
  it("should handle LOGIN_REQUEST", () => {
    expect(
      userReducer([], {
        type: types.LOGIN_REQUEST,
      })
    ).toEqual({
      loginRequest: true,
    });
  });
  it("should handle LOGIN_SUCCESS", () => {
    expect(
      userReducer([], {
        type: types.LOGIN_SUCCESS,
        accessToken: token,
        refreshToken: token,
        user: user,
      })
    ).toEqual({
      loginFailed: false,
      loginRequest: false,
      loginSuccess: true,
      isLoggedIn: true,
      accessToken: token,
      refreshToken: token,
      user: user,
    });
  });
  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      userReducer([], {
        type: types.LOGOUT_SUCCESS,
        accessToken: null,
        refreshToken: undefined,
        user: null,
      })
    ).toEqual({
      isLoggedIn: false,
      loginSuccess: false,
      accessToken: null,
      refreshToken: undefined,
      user: null,
    });
  });
  it("should handle REGISTER_FAILED", () => {
    expect(
      userReducer([], {
        type: types.REGISTER_FAILED,
      })
    ).toEqual({
      registerFailed: true,
      registerRequest: false,
    });
  });
  it("should handle REGISTER_REQUEST", () => {
    expect(
      userReducer([], {
        type: types.REGISTER_REQUEST,
      })
    ).toEqual({
      registerRequest: true,
    });
  });
  it("should handle REGISTER_SUCCESS", () => {
    expect(
      userReducer([], {
        type: types.REGISTER_SUCCESS,
        accessToken: token,
        refreshToken: token,
        user: user,
      })
    ).toEqual({
      isLoggedIn: true,
      registerRequest: false,
      registerFailed: false,
      registerSuccess: true,
      accessToken: token,
      refreshToken: token,
      user: user,
    });
  });
  it("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(
      userReducer([], {
        type: types.RESET_PASSWORD_SUCCESS,
      })
    ).toEqual({
      resetPasswordSuccess: true,
    });
  });
  it("should handle SET_USER", () => {
    expect(
      userReducer([], {
        type: types.SET_USER,
        accessToken: token,
        refreshToken: token,
        user: user,
      })
    ).toEqual({
      accessToken: token,
      isLoggedIn: true,
      isUserLoaded: true,
      refreshToken: token,
      user: user,
    });
  });
  it("should handle SET_USER_FAILED", () => {
    expect(
      userReducer([], {
        type: types.SET_USER_FAILED,
      })
    ).toEqual({
      isUserLoaded: true,
    });
  });
});
