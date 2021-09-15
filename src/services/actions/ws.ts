import { TIngredients } from "../../types/ingredient";
import { IRawOrders } from "../../types/order";
import {
  WS_SET_INGREDIENTS,
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../constants/ws";

export interface IWsSetIngredients {
  readonly type: typeof WS_SET_INGREDIENTS;
  readonly ingredients: TIngredients;
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly url: string;
}

export interface IWsConnectionStop {
  readonly type: typeof WS_CONNECTION_STOP;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: IRawOrders | undefined;
  readonly userOrders: boolean;
}

export type TWsActions =
  | IWsSetIngredients
  | IWsConnectionStart
  | IWsConnectionStop
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetOrders;

export const wsSetIngredients = (
  ingredients: TIngredients
): IWsSetIngredients => ({
  type: WS_SET_INGREDIENTS,
  ingredients,
});

export const wsConnectionStart = (url: string): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
  url,
});

export const wsConnectionStop = (): IWsConnectionStop => ({
  type: WS_CONNECTION_STOP,
});

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
});

export const wsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (
  orders: IRawOrders,
  userOrders: boolean
): IWsGetOrders => {
  return {
    type: WS_GET_ORDERS,
    payload: orders,
    userOrders,
  };
};
