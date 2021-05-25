import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";

function Ingredient({ item }) {
  return (
    <article className={ingredientStyles.item}>
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
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default Ingredient;
