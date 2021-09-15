import { TOGGLE_MENU } from "../constants/header";

export interface IToggleMenu {
  readonly type: typeof TOGGLE_MENU;
}

export type THeaderActions = IToggleMenu;

export const toggleMenu = (): IToggleMenu => ({
  type: TOGGLE_MENU,
});
