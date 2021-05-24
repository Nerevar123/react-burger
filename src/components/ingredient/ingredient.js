import PropTypes from "prop-types";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";

function Ingredient({ item }) {
  return (
    <article className={ingredientStyles.item}>
      <img src={item.image} alt={item.name} className="pr-4 pl-4 mb-1" />
      <div className={`${ingredientStyles.priceContainer} mb-1`}>
        <span
          className={`${ingredientStyles.price} text text_type_digits-default pr-1`}
        >
          {item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientStyles.name} text text_type_main-default mb-6`}>{item.name}</p>
      <Counter count={1} size="default" />
    </article>
  );
}

Ingredient.propTypes = {
  isActive: PropTypes.bool,
};

export default Ingredient;
