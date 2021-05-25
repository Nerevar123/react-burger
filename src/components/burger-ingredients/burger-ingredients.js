import { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list/ingredients-list";
import ingredientsStyles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
  const [current, setCurrent] = useState("one");

  const buns = data.filter((item) => item.type === "bun");
  const sauces = data.filter((item) => item.type === "sauce");
  const main = data.filter((item) => item.type === "main");

  return (
    <section className={ingredientsStyles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <ul className={`${ingredientsStyles.tabList} mb-10`}>
        <li className={ingredientsStyles.tabItem}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
        </li>
        <li className={ingredientsStyles.tabItem}>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
        </li>
        <li className={ingredientsStyles.tabItem}>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={ingredientsStyles.cards}>
        <IngredientsList items={buns} title="Булки" />
        <IngredientsList items={sauces} title="Соусы" />
        <IngredientsList items={main} title="Начинки" />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  isActive: PropTypes.bool,
};

export default BurgerIngredients;
