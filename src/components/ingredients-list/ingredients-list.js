import PropTypes from "prop-types";
import Ingredient from "../ingredient/ingredient";
import ingredientListStyles from "./ingredients-list.module.css";

function IngredientsList({ items, title, onIngredientClick }) {
  return (
    <>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={ingredientListStyles.list}>
        {items.map((item) => (
          <li className={ingredientListStyles.item} key={item._id}>
            <Ingredient item={item} onIngredientClick={onIngredientClick} />
          </li>
        ))}
      </ul>
    </>
  );
}

IngredientsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  title: PropTypes.string.isRequired,
  onIngredientClick: PropTypes.func,
};

export default IngredientsList;
