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
import { AppThunk, AppDispatch } from "../types";
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

export interface IRegisterAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export interface ILoginAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly user: IUser;
  readonly accessToken?: string;
  readonly refreshToken?: string | null;
}

export interface ISetUserFailedAction {
  readonly type: typeof SET_USER_FAILED;
}

export type TUserActions =
  | IRegisterAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILoginAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutSuccessAction
  | IForgotPasswordSuccessAction
  | IResetPasswordSuccessAction
  | ISetUserAction
  | ISetUserFailedAction;

export const registerAction = (): IRegisterAction => ({
  type: REGISTER_REQUEST,
});

export const registerSuccessAction = (
  user: IUser,
  accessToken: string,
  refreshToken: string
): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  user,
  accessToken,
  refreshToken,
});

export const registerFailedAction = (): IRegisterFailedAction => ({
  type: REGISTER_FAILED,
});

export const loginAction = (): ILoginAction => ({
  type: LOGIN_REQUEST,
});

export const loginSuccessAction = (
  user: IUser,
  accessToken: string,
  refreshToken: string
): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  user,
  accessToken,
  refreshToken,
});

export const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_FAILED,
});

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

export const forgotPasswordSuccessAction =
  (): IForgotPasswordSuccessAction => ({
    type: FORGOT_PASSWORD_SUCCESS,
  });

export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const setUserAction = (
  user: IUser,
  accessToken?: string | undefined,
  refreshToken?: string | null
): ISetUserAction => ({
  type: SET_USER,
  user,
  accessToken,
  refreshToken,
});

export const setUserFailedAction = (): ISetUserFailedAction => ({
  type: SET_USER_FAILED,
});

export const loginThunk: AppThunk =
  (data: IUser) => (AppDispatch: AppDispatch) => {
    AppDispatch(loginAction());
    loginRequest(data)
      .then(({ user, accessToken, refreshToken }) => {
        AppDispatch(loginSuccessAction(user, accessToken, refreshToken));
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .catch((err) => {
        console.error(err);
        AppDispatch(loginFailedAction());
      });
  };

export const registerThunk: AppThunk =
  (data: IUser) => (AppDispatch: AppDispatch) => {
    AppDispatch(registerAction());
    registerRequest(data)
      .then(({ user, accessToken, refreshToken }) => {
        AppDispatch(registerSuccessAction(user, accessToken, refreshToken));
        setCookie("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      })
      .catch((err) => {
        console.error(err);
        AppDispatch(registerFailedAction());
      });
  };

export const logoutThunk: AppThunk = () => (AppDispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  logoutRequest({ token: refreshToken })
    .then(({ message }) => {
      AppDispatch(logoutSuccessAction());
      localStorage.removeItem("refreshToken");
      deleteCookie("token");
    })
    .catch((err) => {
      console.error(err);
    });
};

export const forgotPasswordThunk: AppThunk =
  (data) => (AppDispatch: AppDispatch) => {
    forgotPasswordRequest(data)
      .then(({ message }) => {
        AppDispatch(forgotPasswordSuccessAction());
      })
      .catch((err) => {
        console.error(err);
      });
  };

export const resetPasswordThunk: AppThunk =
  (data) => (AppDispatch: AppDispatch) => {
    resetPasswordRequest(data)
      .then(({ message }) => {
        AppDispatch(resetPasswordSuccessAction());
      })
      .catch((err) => {
        console.error(err);
      });
  };

export const getUserThunk: AppThunk = () => (AppDispatch: AppDispatch) => {
  getUserRequest()
    .then(({ user }) => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = getCookie("token");
      AppDispatch(setUserAction(user, accessToken, refreshToken));
    })
    .catch((err) => {
      if (err === "jwt expired") {
        console.log(err);
        refreshTokenThunk();
      } else {
        console.error(err);
        AppDispatch(setUserFailedAction());
      }
    });
};

export const putUserThunk: AppThunk = (data) => (AppDispatch: AppDispatch) => {
  putUserRequest(data)
    .then(({ user }) => {
      AppDispatch(setUserAction(user));
    })
    .catch((err) => {
      if (err === "jwt expired") {
        console.log(err);
        refreshTokenThunk();
      } else {
        console.error(err);
      }
    });
};

const refreshTokenThunk = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  tokenRequest({ token: refreshToken })
    .then(({ accessToken, refreshToken }) => {
      setCookie("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      getUserThunk();
    })
    .catch((err) => {
      console.error(err);
    });
};
