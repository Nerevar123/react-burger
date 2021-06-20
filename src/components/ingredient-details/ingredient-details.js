import PropTypes from "prop-types";
import ingredientDetailsStyles from "./ingredient-details.module.css";

function IngredientDetails({ item }) {
  return (
    <>
      <h2
        className={`text text_type_main-large mt-4 mb-4 ${ingredientDetailsStyles.title}`}
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

IngredientDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }),
};

export default IngredientDetails;
