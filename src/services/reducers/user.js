import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILED,
} from "../actions/user";

const initialState = {
  user: {},
  accessToken: null,
  refreshToken: null,
  isUserLoaded: false,

  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  setPasswordRequest: false,
  setPasswordFailed: false,
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
      };
    }
    case LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordRequest: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
      };
    }
    case SET_PASSWORD_REQUEST: {
      return {
        ...state,
        setPasswordRequest: true,
      };
    }
    case SET_PASSWORD_SUCCESS: {
      return {
        ...state,
        setPasswordFailed: false,
        setPasswordRequest: false,
      };
    }
    case SET_PASSWORD_FAILED: {
      return { ...state, setPasswordFailed: true, setPasswordRequest: false };
    }
    default: {
      return state;
    }
  }
};
