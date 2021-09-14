import { headerReducer } from "./header";
import * as types from "../constants/header";

describe("header reducer", () => {
  it("should return the initial state", () => {
    expect(headerReducer(undefined, {})).toEqual({
      mobileMenuOpen: false,
    });
  });

  it("should handle TOGGLE_MENU", () => {
    expect(
      headerReducer([], {
        type: types.TOGGLE_MENU,
      })
    ).toEqual({
      mobileMenuOpen: true,
    });
  });
});
