import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import cn from "classnames";
import ingredientDetailsStyles from "./ingredient-details.module.css";

function IngredientDetails() {
  const { buns, sauces, main, currentModalItem } = useSelector(
    (state) => state.ingredients
  );
  let { id } = useParams();

  const item =
    currentModalItem ||
    buns.find((item) => item._id === id) ||
    sauces.find((item) => item._id === id) ||
    main.find((item) => item._id === id);

  if (!item) {
    return null;
  }

  return (
    <>
      <h2
        className={cn("text text_type_main-large mt-4 mb-4", {
          [ingredientDetailsStyles.title]: currentModalItem,
        })}
      >
        Детали ингредиента
      </h2>
      <img
        src={item.image_large}
        alt={item.name}
        className={ingredientDetailsStyles.image}
      />
      <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
      <ul className={`${ingredientDetailsStyles.list} mb-5`}>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={ingredientDetailsStyles.itemText}>Калории,ккал</span>
          <span className={ingredientDetailsStyles.itemNumbers}>
            {item.calories}
          </span>
        </li>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={ingredientDetailsStyles.itemText}>Белки, г</span>
          <span className={ingredientDetailsStyles.itemNumbers}>
            {item.proteins}
          </span>
        </li>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={ingredientDetailsStyles.itemText}>Жиры, г</span>
          <span className={ingredientDetailsStyles.itemNumbers}>
            {item.fat}
          </span>
        </li>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={ingredientDetailsStyles.itemText}>Углеводы, г</span>
          <span className={ingredientDetailsStyles.itemNumbers}>
            {item.carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
}

export default IngredientDetails;
