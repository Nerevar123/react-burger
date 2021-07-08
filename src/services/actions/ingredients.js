import { getIngredientsRequest, postOrderRequest } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const ADD_BUN = "ADD_BUN";

export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_MODALS = "CLOSE_MODALS";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}

export function postOrder(data) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    postOrderRequest(data)
      .then(({ order }) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderNumber: order.number,
        });
        dispatch({
          type: OPEN_ORDER_MODAL,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: POST_ORDER_FAILED,
        });
      });
  };
}
