import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { headerReducer } from "./header";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  header: headerReducer,
});
