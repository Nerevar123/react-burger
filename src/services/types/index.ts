import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TIngredientsActions } from "../actions/ingredients";
import { TUserActions } from "../actions/user";
import { THeaderActions } from "../actions/header";
import { TWsActions } from "../actions/ws";
import { rootReducer } from "../reducers";

type TApplicationActions =
  | TIngredientsActions
  | TUserActions
  | THeaderActions
  | TWsActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
