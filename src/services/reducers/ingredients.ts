import update from "immutability-helper";
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
import { TIngredientsActions } from "../actions/ingredients";
import { IOrder } from "../../types/order";

export type TIngredientsState = {
  buns: TIngredients;
  sauces: TIngredients;
  main: TIngredients;
  ordered: TIngredients;
  bun: IIngredient | null;
  finalPrice: number | null;
  currentModalItem: IIngredient | null;
  orderNumber: number | null;
  currentOrder: IOrder | null;
  orderModalOpen: boolean;
  ingredientModalOpen: boolean;
  orderDetailsModalOpen: boolean;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  orderRequest: boolean;
  orderRequestFailed: boolean;
};

const initialState: TIngredientsState = {
  buns: [],
  sauces: [],
  main: [],

  ordered: [],
  bun: null,
  finalPrice: null,

  currentModalItem: null,
  orderNumber: null,
  currentOrder: null,
  orderModalOpen: false,
  ingredientModalOpen: false,
  orderDetailsModalOpen: false,

  ingredientsRequest: false,
  ingredientsFailed: false,
  orderRequest: false,
  orderRequestFailed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        buns: action.ingredients.filter(
          (item: IIngredient) => item.type === "bun"
        ),
        sauces: action.ingredients.filter(
          (item: IIngredient) => item.type === "sauce"
        ),
        main: action.ingredients.filter(
          (item: IIngredient) => item.type === "main"
        ),
        ingredientsFailed: false,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderRequestFailed: false,
        orderRequest: false,
      };
    }
    case POST_ORDER_FAILED: {
      return { ...state, orderRequestFailed: true, orderRequest: false };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ordered: state.ordered.filter((item) => item.id !== action.item.id),
        finalPrice: state.finalPrice! - action.item.price,
      };
    }
    case ADD_INGREDIENT: {
      const time = new Date().getTime().toString();
      const newItem = { ...action.item, id: time };
      return {
        ...state,
        ordered: [...state.ordered, newItem],
        finalPrice: state.finalPrice! + action.item.price,
      };
    }
    case ADD_BUN: {
      const oldPrice = state.bun?.price! * 2 || 0;
      return {
        ...state,
        bun: action.item,
        finalPrice: state.finalPrice! - oldPrice + action.item.price * 2,
      };
    }
    case MOVE_INGREDIENT: {
      const newOrdered = update(state.ordered, {
        $splice: [
          [action.index, 1],
          [action.atIndex, 0, state.ordered[action.index]],
        ],
      });

      return {
        ...state,
        ordered: newOrdered,
      };
    }
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        currentModalItem: action.item,
        ingredientModalOpen: true,
      };
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        orderModalOpen: true,
      };
    }
    case OPEN_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        currentOrder: action.order,
        orderDetailsModalOpen: true,
      };
    }
    case CLOSE_MODALS: {
      return {
        ...state,
        currentModalItem: null,
        currentOrder: null,
        ingredientModalOpen: false,
        orderModalOpen: false,
        orderDetailsModalOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
