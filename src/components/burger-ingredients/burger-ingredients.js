import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsList from "../ingredients-list/ingredients-list";
import { getIngredients } from "../../services/actions/ingredients";
import useScroll from "../../hooks/useScroll";
import ingredientsStyles from "./burger-ingredients.module.css";

function BurgerIngredients({ onIngredientClick }) {
  const [current, setCurrent] = useState("one");
  const containerRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainRef = useRef(null);

  const dispatch = useDispatch();
  const { buns, sauces, main } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const executeScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const onScroll = (current) => {
    setCurrent(current);
    console.log(current)
  }
  // useScroll(mainRef, containerRef, () => onScroll('one'))
  // useScroll(saucesRef, containerRef, () => onScroll('two'))
  // useScroll(mainRef, containerRef, () => onScroll('three'))
  return (
    <section className={ingredientsStyles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <ul className={`${ingredientsStyles.tabList} mb-10`}>
        <li className={ingredientsStyles.tabItem}>
          <Tab
            value="one"
            active={current === "one"}
            onClick={() => executeScroll(bunsRef)}
          >
            Булки
          </Tab>
        </li>
        <li className={ingredientsStyles.tabItem}>
          <Tab
            value="two"
            active={current === "two"}
            onClick={() => executeScroll(saucesRef)}
          >
            Соусы
          </Tab>
        </li>
        <li className={ingredientsStyles.tabItem}>
          <Tab
            value="three"
            active={current === "three"}
            onClick={() => executeScroll(mainRef)}
          >
            Начинки
          </Tab>
        </li>
      </ul>
      <ul className={ingredientsStyles.cards} ref={containerRef}>
        <li ref={bunsRef}>
          <IngredientsList
            items={buns}
            title="Булки"
            onIngredientClick={onIngredientClick}
          />
        </li>
        <li ref={saucesRef}>
          <IngredientsList
            items={sauces}
            title="Соусы"
            onIngredientClick={onIngredientClick}
          />
        </li>
        <li ref={mainRef}>
          <IngredientsList
            items={main}
            title="Начинки"
            onIngredientClick={onIngredientClick}
          />
        </li>
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;
