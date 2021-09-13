import { v4 as uuidv4 } from "uuid";
import { IIngredient, TIngredients } from "../../types/ingredient";
import { IOrder, IOrders } from "../../types/order";
import { TWsActions } from "../actions/ws";
import {
  WS_SET_INGREDIENTS,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../constants/ws";

export type TWsState = {
  wsConnected: boolean;
  ingredients: TIngredients;
  orders: IOrders;
};

const initialState: TWsState = {
  wsConnected: false,
  ingredients: [],
  orders: { orders: [], total: 0, totalToday: 0 },
};

export const wsReducer = (
  state = initialState,
  action: TWsActions
): TWsState => {
  switch (action.type) {
    case WS_SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_ORDERS:
      let saturatedOrders: IOrder[] = [];
      if (!action.payload?.orders || action.payload?.orders.length === 0)
        return { ...state };
      for (let order of action.payload.orders) {
        const ingredients = order.ingredients.map((ingredient) => {
          const saturatedIngredient = state.ingredients.find(
            (item) => item._id === ingredient
          ) as IIngredient;
          const key = uuidv4();

          return { ...saturatedIngredient, key };
        });

        const price = ingredients.reduce((acc, ingredient) => {
          return acc + ingredient.price;
        }, 0);

        saturatedOrders = [
          ...saturatedOrders,
          { ...order, ingredients, price },
        ];
      }

      return {
        ...state,
        orders: {
          orders: (saturatedOrders as IOrder[]) || [],
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        },
      };
    default:
      return state;
  }
};
