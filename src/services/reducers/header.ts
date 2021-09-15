import { TOGGLE_MENU } from "../constants/header";
import { THeaderActions } from "../actions/header";

export type THeaderState = {
  mobileMenuOpen: boolean;
};

const initialState: THeaderState = {
  mobileMenuOpen: false,
};

export const headerReducer = (
  state = initialState,
  action: THeaderActions
): THeaderState => {
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
