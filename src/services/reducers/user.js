import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  SET_USER,
} from "../actions/user";

const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,

  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        registerFailed: false,
        registerRequest: false,
        isLoggedIn: true,
      };
    }
    case REGISTER_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        loginFailed: false,
        loginRequest: false,
        isLoggedIn: true,
      };
    }
    case LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case LOGOUT_SUCCESS: {
      return { ...state, isLoggedIn: false };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordSuccess: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordSuccess: true,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isLoggedIn: true,
      };
    }
    default: {
      return state;
    }
  }
};
