import { TOGGLE_MENU } from "../actions/header";

const initialState = {
  mobileMenuOpen: false,
};

export const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU: {
      return {
        ...state,
        mobileMenuOpen: !state.mobileMenuOpen,
      };
    }
    default: {
      return state;
    }
  }
};
