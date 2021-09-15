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
  SET_USER_FAILED,
} from "../constants/user";
import { IUser } from "../../types/user";
import { TUserActions } from "../actions/user";

export type TUserState = {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | undefined;
  isLoggedIn: boolean;
  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;
  loginRequest: boolean;
  loginSuccess: boolean;
  loginFailed: boolean;
  forgotPasswordSuccess: boolean;
  resetPasswordSuccess: boolean;
  isUserLoaded: boolean;
};

const initialState: TUserState = {
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

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
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
        registerSuccess: true,
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
        loginSuccess: true,
        isLoggedIn: true,
      };
    }
    case LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        refreshToken: undefined,
        accessToken: null,
        isLoggedIn: false,
        loginSuccess: false,
      };
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
        accessToken: action.accessToken!,
        refreshToken: action.refreshToken!,
        isLoggedIn: true,
        isUserLoaded: true,
      };
    }
    case SET_USER_FAILED: {
      return {
        ...state,
        isUserLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
};
