export interface IIngredient {
  _id: string;
  id?: string;
  name: string;
  type: string;
  price: number;
  image: string;
  image_large: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export type TIngredients = IIngredient[];