import { ingredientsReducer } from "./ingredients";
import * as types from "../constants/ingredients";

const initialState = {
  ingredients: [],
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
  ingredientsRequestSuccess: false,
  ingredientsFailed: false,
  orderRequest: false,
  orderRequestFailed: false,
};

describe("header reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  const ingredient = { name: "ingredient", price: 100, type: "main" };

  it("should handle ADD_BUN", () => {
    expect(
      ingredientsReducer(
        { finalPrice: null },
        {
          type: types.ADD_BUN,
          item: ingredient,
        }
      )
    ).toEqual({
      bun: ingredient,
      finalPrice: 200,
    });
  });
  it("should handle ADD_INGREDIENT", () => {
    const time = new Date().getTime().toString();
    expect(
      ingredientsReducer(
        { finalPrice: null, ordered: [] },
        {
          type: types.ADD_INGREDIENT,
          item: ingredient,
          finalPrice: 100,
        }
      )
    ).toEqual({
      ordered: [{ ...ingredient, id: time }],
      finalPrice: 100,
    });
  });
  it("should handle CLOSE_MODALS", () => {
    expect(
      ingredientsReducer([], {
        type: types.CLOSE_MODALS,
      })
    ).toEqual({
      currentModalItem: null,
      currentOrder: null,
      ingredientModalOpen: false,
      orderModalOpen: false,
      orderDetailsModalOpen: false,
    });
  });
  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      ingredientsReducer([], {
        type: types.GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ingredientsFailed: true,
      ingredientsRequest: false,
    });
  });
  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      ingredientsReducer([], {
        type: types.GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ingredientsRequest: true,
    });
  });
  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      ingredientsReducer([], {
        type: types.GET_INGREDIENTS_SUCCESS,
        ingredients: [ingredient],
      })
    ).toEqual({
      ingredientsFailed: false,
      ingredientsRequestSuccess: true,
      ingredientsRequest: false,
      buns: [],
      main: [ingredient],
      sauces: [],
      ingredients: [ingredient],
    });
  });
  it("should handle MOVE_INGREDIENT", () => {
    expect(
      ingredientsReducer(
        { ordered: [] },
        {
          type: types.MOVE_INGREDIENT,
          index: 0,
          toIndex: 1,
        }
      )
    ).toEqual({
      ordered: [undefined],
    });
  });
  it("should handle OPEN_INGREDIENT_MODAL", () => {
    expect(
      ingredientsReducer([], {
        type: types.OPEN_INGREDIENT_MODAL,
        item: ingredient,
      })
    ).toEqual({
      currentModalItem: ingredient,
      ingredientModalOpen: true,
    });
  });
  it("should handle OPEN_ORDER_DETAILS_MODAL", () => {
    expect(
      ingredientsReducer([], {
        type: types.OPEN_ORDER_DETAILS_MODAL,
        order: ingredient,
      })
    ).toEqual({
      currentOrder: ingredient,
      orderDetailsModalOpen: true,
    });
  });
  it("should handle OPEN_ORDER_MODAL", () => {
    expect(
      ingredientsReducer([], {
        type: types.OPEN_ORDER_MODAL,
      })
    ).toEqual({
      orderModalOpen: true,
    });
  });
  it("should handle POST_ORDER_FAILED", () => {
    expect(
      ingredientsReducer([], {
        type: types.POST_ORDER_FAILED,
      })
    ).toEqual({
      orderRequest: false,
      orderRequestFailed: true,
    });
  });
  it("should handle POST_ORDER_REQUEST", () => {
    expect(
      ingredientsReducer([], {
        type: types.POST_ORDER_REQUEST,
      })
    ).toEqual({
      orderRequest: true,
    });
  });
  it("should handle POST_ORDER_SUCCESS", () => {
    expect(
      ingredientsReducer([], {
        type: types.POST_ORDER_SUCCESS,
        orderNumber: 1,
      })
    ).toEqual({
      orderNumber: 1,
      orderRequest: false,
      orderRequestFailed: false,
    });
  });
  it("should handle REMOVE_INGREDIENT", () => {
    expect(
      ingredientsReducer(
        { ordered: [], finalPrice: 100 },
        {
          type: types.REMOVE_INGREDIENT,
          item: ingredient,
        }
      )
    ).toEqual({
      ordered: [],
      finalPrice: 0,
    });
  });
});
