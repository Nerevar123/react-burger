import { IIngredient } from "../../types/ingredient";

export interface IConstructorBunItemProps {
  element: IIngredient;
  type: "top" | "bottom" | undefined;
  isTop?: boolean;
  isBottom?: boolean;
}
