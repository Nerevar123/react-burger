import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from "./burger-constructor.module.css";

function BurgerConstructor({ data }) {
  return (
    <section className={constructorStyles.section}>
      <ul className={`${constructorStyles.list} mt-25 mb-10 pl-4 pr-4`}>
        {data.map((item) => (
          <li key={item._id} className={`${constructorStyles.listItem} mt-4`}>
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
      <div className={`${constructorStyles.buttonContainer} pl-4 pr-4`}>
        <div className={`${constructorStyles.priceContainer} mr-10`}>
          <span className="text text_type_digits-medium mr-2">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  isActive: PropTypes.bool,
};

export default BurgerConstructor;
