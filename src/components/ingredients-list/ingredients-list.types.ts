import { MutableRefObject } from "react";
import { TIngredients } from "../../types/ingredient";

export interface IngredientsListProps {
  items: TIngredients;
  title: string;
  tabRef: MutableRefObject<null>;
}
