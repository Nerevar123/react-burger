import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { headerReducer } from "./header";
import { userReducer } from "./user";
import { wsReducer } from "./ws";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  header: headerReducer,
  user: userReducer,
  ws: wsReducer,
});
