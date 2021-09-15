import { IIngredient } from "../../types/ingredient";

export interface IConstructorItemProps {
  element: IIngredient;
  type?: "top" | "bottom" | undefined;
  findCard: (id: string) => {
    card: IIngredient;
    index: number;
  };
  moveCard: (id: string, atIndex: number) => void;
  id: string;
}
