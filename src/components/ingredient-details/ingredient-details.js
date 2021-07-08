import { useSelector } from "react-redux";
import ingredientDetailsStyles from "./ingredient-details.module.css";

function IngredientDetails() {
  const currentModalItem = useSelector(
    (state) => state.ingredients.currentModalItem
  );
  return (
    <>
      <h2
        className={`text text_type_main-large mt-4 mb-4 ${ingredientDetailsStyles.title}`}
      >
        Детали ингредиента
      </h2>
      <img
        src={currentModalItem.image_large}
        alt={currentModalItem.name}
        className={ingredientDetailsStyles.image}
      />
      <p className="text text_type_main-medium mt-4 mb-8">
        {currentModalItem.name}
      </p>
      <ul className={`${ingredientDetailsStyles.list} mb-5`}>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={ingredientDetailsStyles.itemText}>Калории,ккал</span>
          <span className={ingredientDetailsStyles.itemNumbers}>
            {currentModalItem.calories}
          </span>
        </li>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={ingredientDetailsStyles.itemText}>Белки, г</span>
          <span className={ingredientDetailsStyles.itemNumbers}>
            {currentModalItem.proteins}
          </span>
        </li>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={ingredientDetailsStyles.itemText}>Жиры, г</span>
          <span className={ingredientDetailsStyles.itemNumbers}>
            {currentModalItem.fat}
          </span>
        </li>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={ingredientDetailsStyles.itemText}>Углеводы, г</span>
          <span className={ingredientDetailsStyles.itemNumbers}>
            {currentModalItem.carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
}

export default IngredientDetails;
