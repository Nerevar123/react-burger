import { useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import { IngredientsContext } from "../../contexts/ingredients-context";
import constructorStyles from "./burger-constructor.module.css";

function BurgerConstructor({ onConfirmClick }) {
  const data = useContext(IngredientsContext);

  const bun = data.find(item => item.type === 'bun');
  const elements = data.filter(item => item.type !== 'bun');

  return (
    <section className={`${constructorStyles.section} mt-25 pl-4`}>
      <ConstructorItem item={bun} type="top" isLocked isTop />
      <ul className={constructorStyles.list}>
        {elements.map((item) => (
          <li key={item._id} className={constructorStyles.listItem}>
            <ConstructorItem item={item} />
          </li>
        ))}
      </ul>
      <ConstructorItem item={bun} type="bottom" isLocked isBottom />
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
  onConfirmClick: PropTypes.func,
};

export default BurgerConstructor;
