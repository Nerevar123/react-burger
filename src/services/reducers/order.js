import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  // GET_INGREDIENTS_FAILED,
} from "../actions/order";

const initialState = {
  bun: [],
  elements: [],
  hasBun: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    default: {
      return state;
    }
  }
};
