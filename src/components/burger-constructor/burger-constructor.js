import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import constructorStyles from "./burger-constructor.module.css";

function BurgerConstructor({ data, onConfirmClick }) {
  const firstElement = data[0];
  const lastElement = data[data.length - 1];
  const elements = data.slice(1, data.length - 1);
  return (
    <section className={`${constructorStyles.section} mt-25 pl-4`}>
      <ConstructorItem item={firstElement} type="top" isLocked />
      <ul className={constructorStyles.list}>
        {elements.map((item) => (
          <li key={item._id} className={`${constructorStyles.listItem}`}>
            <ConstructorItem item={item} />
          </li>
        ))}
      </ul>
      <ConstructorItem item={lastElement} type="bottom" isLocked />

      <div className={`${constructorStyles.buttonContainer} mt-9 pr-4`}>
        <div className={`${constructorStyles.priceContainer} mr-10`}>
          <span className="text text_type_digits-medium mr-2">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={onConfirmClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
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
  onConfirmClick: PropTypes.func,
};

export default BurgerConstructor;
