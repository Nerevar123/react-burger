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
      <img src={item.image_large} alt={item.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
      <ul className={`${ingredientDetailsStyles.list} mb-5`}>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={`text text_type_main-default text_color_inactive`}>
            Калории,ккал
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {item.calories / 10}
          </span>
        </li>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={`text text_type_main-default text_color_inactive`}>
            Белки, г
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {item.proteins / 10}
          </span>
        </li>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={`text text_type_main-default text_color_inactive`}>
            Жиры, г
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {item.fat / 10}
          </span>
        </li>
        <li className={ingredientDetailsStyles.listItem}>
          <span className={`text text_type_main-default text_color_inactive`}>
            Углеводы, г
          </span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {item.carbohydrates / 10}
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
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }),
};

export default IngredientDetails;
