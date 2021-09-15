import { useSelector } from "../../services/hooks";
import { Ingredient } from "..";
import Loader from "../loader/loader";
import ingredientListStyles from "./ingredients-list.module.css";
import { IngredientsListProps } from "./ingredients-list.types";
import { ESizes } from "../loader/loader.types";

function IngredientsList({ items, title }: IngredientsListProps) {
  const ingredientsRequest = useSelector(
    (state) => state.ingredients.ingredientsRequest
  );

  return (
    <>
      <h2 className="text text_type_main-medium">{title}</h2>
      {ingredientsRequest ? (
        <Loader size={ESizes.large} />
      ) : (
        <ul className={ingredientListStyles.list}>
          {items.map((item) => (
            <li className={ingredientListStyles.item} key={item._id}>
              <Ingredient item={item} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default IngredientsList;
