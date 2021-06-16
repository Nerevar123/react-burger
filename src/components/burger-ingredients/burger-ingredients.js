import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list/ingredients-list";
import { getIngredients } from "../../services/actions/ingredients";
import ingredientsStyles from "./burger-ingredients.module.css";

function BurgerIngredients({ onIngredientClick }) {
  const [current, setCurrent] = useState("one");

  const dispatch = useDispatch();
  const { buns, sauces, main } = useSelector((state) => state.ingredients);
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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
        <IngredientsList
          items={buns}
          title="Булки"
          onIngredientClick={onIngredientClick}
        />
        <IngredientsList
          items={sauces}
          title="Соусы"
          onIngredientClick={onIngredientClick}
        />
        <IngredientsList
          items={main}
          title="Начинки"
          onIngredientClick={onIngredientClick}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
