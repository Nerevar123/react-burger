import PropTypes from "prop-types";
import Ingredient from "../ingredient/ingredient";
import ingredientListStyles from "./ingredients-list.module.css";

function IngredientsList({ items, title }) {
  return (
    <>
      <h2 className="text text_type_main-medium">{title}</h2>
      <ul className={ingredientListStyles.list}>
        {items.map((item) => (
          <li className={ingredientListStyles.item}>
            <Ingredient item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

IngredientsList.propTypes = {
  isActive: PropTypes.bool,
};

export default IngredientsList;
