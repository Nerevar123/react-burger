import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
  ADD_BUN,
  OPEN_INGREDIENT_MODAL,
  OPEN_ORDER_MODAL,
  OPEN_ORDER_DETAILS_MODAL,
  CLOSE_MODALS,
} from "../constants/ingredients";
import { IIngredient, TIngredients } from "../../types/ingredient";
import { AppThunk, AppDispatch } from "../types";
import { getIngredientsRequest, postOrderRequest } from "../../utils/api";
import { IOrder } from "../../types/order";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredients;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IPostOrderAction {
  readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: IIngredient;
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly item: IIngredient;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly index: number;
  readonly atIndex: number;
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly item: IIngredient;
}

export interface IOpenIngredientAction {
  readonly type: typeof OPEN_INGREDIENT_MODAL;
  readonly item: IIngredient;
}

export interface IOpenOrderModalAction {
  readonly type: typeof OPEN_ORDER_MODAL;
}

export interface IOpenOrderDetailsAction {
  readonly type: typeof OPEN_ORDER_DETAILS_MODAL;
  readonly order: IOrder;
}

export interface ICloseModalsAction {
  readonly type: typeof CLOSE_MODALS;
}

export type TIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IPostOrderAction
  | IPostOrderSuccessAction
  | IPostOrderFailedAction
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IMoveIngredientAction
  | IAddBunAction
  | IOpenIngredientAction
  | IOpenOrderModalAction
  | IOpenOrderDetailsAction
  | ICloseModalsAction;

export const getIngredientsAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccessAction = (
  ingredients: TIngredients
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients,
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED,
});

export const postOrderAction = (): IPostOrderAction => ({
  type: POST_ORDER_REQUEST,
});

export const postOrderSuccessAction = (
  orderNumber: number
): IPostOrderSuccessAction => ({
  type: POST_ORDER_SUCCESS,
  orderNumber,
});

export const postOrderFailedAction = (): IPostOrderFailedAction => ({
  type: POST_ORDER_FAILED,
});

export const addIngredientAction = (
  item: IIngredient
): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  item,
});

export const removeIngredientAction = (
  item: IIngredient
): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  item,
});

export const moveIngredientAction = (
  index: number,
  atIndex: number
): IMoveIngredientAction => ({
  type: MOVE_INGREDIENT,
  index,
  atIndex,
});

export const addBunAction = (item: IIngredient): IAddBunAction => ({
  type: ADD_BUN,
  item,
});

export const openIngredientAction = (
  item: IIngredient
): IOpenIngredientAction => ({
  type: OPEN_INGREDIENT_MODAL,
  item,
});

export const openOrderModalAction = (): IOpenOrderModalAction => ({
  type: OPEN_ORDER_MODAL,
});

export const openOrderDetailsAction = (
  order: IOrder
): IOpenOrderDetailsAction => ({
  type: OPEN_ORDER_DETAILS_MODAL,
  order,
});

export const closeModalsAction = (): ICloseModalsAction => ({
  type: CLOSE_MODALS,
});

export const getIngredientsThunk: AppThunk =
  () => (AppDispatch: AppDispatch) => {
    AppDispatch(getIngredientsAction());
    getIngredientsRequest()
      .then((res) => {
        AppDispatch(getIngredientsSuccessAction(res.data));
      })
      .catch((err) => {
        console.error(err);
        AppDispatch(getIngredientsFailedAction());
      });
  };

export const postOrderThunk: AppThunk =
  (data: TIngredients) => (AppDispatch: AppDispatch) => {
    AppDispatch(postOrderAction());
    postOrderRequest(data)
      .then(({ order }) => {
        AppDispatch(postOrderSuccessAction(order.number));
        AppDispatch(openOrderModalAction());
      })
      .catch((err) => {
        console.error(err);
        AppDispatch(postOrderFailedAction());
      });
  };
