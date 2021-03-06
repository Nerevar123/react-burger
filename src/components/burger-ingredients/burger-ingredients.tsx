import { useState, useEffect, useCallback } from "react";
import { useSelector } from "../../services/hooks";
import cn from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsList } from "..";

import useScroll from "../../hooks/useScroll";
import ingredientsStyles from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const [current, setCurrent] = useState("buns");
  const [bunsRef, isBunsVisible] = useScroll();
  const [saucesRef, isSaucesVisible] = useScroll();
  const [mainRef, isMainVisible] = useScroll();

  const { buns, sauces, main } = useSelector((state) => state.ingredients);

  useEffect(() => {
    isBunsVisible
      ? setCurrent("buns")
      : isSaucesVisible
      ? setCurrent("sauces")
      : setCurrent("main");
  }, [isBunsVisible, isSaucesVisible, isMainVisible]);

  const executeScroll = useCallback((ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <section className={ingredientsStyles.section}>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <ul className={`${ingredientsStyles.tabList} mb-10`}>
          <li
            className={cn(ingredientsStyles.tabItem, {
              [ingredientsStyles.tabItemActive]: current === "buns",
            })}
          >
            <Tab
              value="buns"
              active={current === "buns"}
              onClick={() => executeScroll(bunsRef)}
            >
              Булки
            </Tab>
          </li>
          <li
            className={cn(ingredientsStyles.tabItem, {
              [ingredientsStyles.tabItemActive]: current === "sauces",
            })}
          >
            <Tab
              value="sauces"
              active={current === "sauces"}
              onClick={() => executeScroll(saucesRef)}
            >
              Соусы
            </Tab>
          </li>
          <li
            className={cn(ingredientsStyles.tabItem, {
              [ingredientsStyles.tabItemActive]: current === "main",
            })}
          >
            <Tab
              value="main"
              active={current === "main"}
              onClick={() => executeScroll(mainRef)}
            >
              Начинки
            </Tab>
          </li>
        </ul>
        <ul className={ingredientsStyles.cards}>
          <li ref={bunsRef as React.MutableRefObject<null>}>
            <IngredientsList items={buns} title="Булки" />
          </li>
          <li ref={saucesRef as React.MutableRefObject<null>}>
            <IngredientsList items={sauces} title="Соусы" />
          </li>
          <li ref={mainRef as React.MutableRefObject<null>}>
            <IngredientsList items={main} title="Начинки" />
          </li>
        </ul>
      </section>
    </>
  );
}

export default BurgerIngredients;
