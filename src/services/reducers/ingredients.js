import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  buns: [],
  sauces: [],
  main: [],

  ordered: [],
  bun: {},
  finalPrice: null,

  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
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
        ingredients: action.ingredients,
        buns: action.ingredients.filter((item) => item.type === "bun"),
        sauces: action.ingredients.filter((item) => item.type === "sauce"),
        main: action.ingredients.filter((item) => item.type === "main"),
        ingredientsFailed: false,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        ordered: state.ordered.filter((item) => item._id !== action.item._id),
        finalPrice:
          typeof action.item.price == "number" &&
          state.finalPrice - action.item.price,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ordered: [...state.ordered, action.item],
        finalPrice:
          typeof action.item.price == "number" &&
          state.finalPrice + action.item.price,
      };
    }
    case ADD_BUN: {
      const oldPrice = state.bun.price * 2 || 0;
      return {
        ...state,
        bun: action.item,
        finalPrice:
          typeof action.item.price == "number" &&
          state.finalPrice - oldPrice + action.item.price * 2,
      };
    }
    case INCREASE_COUNTER: {
      return {
        ...state,
        sauces: [...state.sauces].map(item =>
          item._id === action.id ? { ...item, qty: (item.qty && ++item.qty) || 1 } : item
        )
      };
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        sauces: [...state.sauces].map(item =>
          item._id === action.id ? { ...item, qty: (item.qty && --item.qty) || 1 } : item
        )
      };
    }
    default: {
      return state;
    }
  }
};
