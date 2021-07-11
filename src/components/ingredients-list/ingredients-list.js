import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Ingredient } from "../";
import Loader from "../loader/loader";
import ingredientListStyles from "./ingredients-list.module.css";

function IngredientsList({ items, title, tabRef }) {
  const ingredientsRequest = useSelector(
    (state) => state.ingredients.ingredientsRequest
  );

  return (
    <>
      <h2 className="text text_type_main-medium" ref={tabRef}>
        {title}
      </h2>
      {ingredientsRequest ? (
        <Loader size="large" />
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

IngredientsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string.isRequired,
};

export default IngredientsList;
