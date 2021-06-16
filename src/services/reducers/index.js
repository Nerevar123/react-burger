import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
// import { checkoutReducer } from './checkout';
// import { NEXT_STEP, PREVIOUS_STEP } from '../actions';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  // cart: cartReducer,
  // order: orderReducer,
  // checkout: checkoutReducer
});
