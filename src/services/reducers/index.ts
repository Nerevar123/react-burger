import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { headerReducer } from "./header";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  header: headerReducer,
  user: userReducer,
});
