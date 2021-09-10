import { TIngredients } from "./ingredient";

export interface IOrder {
  id: string;
  orderTime: string;
  name: string;
  price: number;
  ingredients: TIngredients;
}
