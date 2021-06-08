import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";

function Ingredient({ item, onIngredientClick }) {
  return (
    <article className={ingredientStyles.item} onClick={() => onIngredientClick(item)}>
      <img src={item.image} alt={item.name} className="pr-4 pl-4 mb-2" />
      <div className={`${ingredientStyles.priceContainer} mb-3`}>
        <span
          className={`${ingredientStyles.price} text text_type_digits-default pr-1`}
        >
          {item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientStyles.name} text text_type_main-default mb-6`}
      >
        {item.name}
      </p>
      <Counter count={1} size="default" />
    </article>
  );
}

Ingredient.propTypes = {
  data: PropTypes.arrayOf(
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
  onIngredientClick: PropTypes.func,
};

export default Ingredient;
