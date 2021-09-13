import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";
import { createSocketMiddleware } from "./middleware/socketMiddleware";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from "./constants/ws";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsStop: WS_CONNECTION_STOP,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onOrder: WS_GET_ORDERS,
};

const wsOrdersMiddleware = createSocketMiddleware(wsUrl, wsActions);

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, wsOrdersMiddleware)
);

export const store = createStore(rootReducer, enhancer);
