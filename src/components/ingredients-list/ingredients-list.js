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
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

export default IngredientsList;
