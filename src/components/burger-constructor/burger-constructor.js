import { useCallback } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import ConstructorBunItem from "../constructor-bun-item/constructor-bun-item";
import constructorStyles from "./burger-constructor.module.css";
import {
  ADD_INGREDIENT,
  ADD_BUN,
  MOVE_INGREDIENT,
} from "../../services/actions/ingredients";

function BurgerConstructor({ onConfirmClick }) {
  const dispatch = useDispatch();
  const { bun, ordered, finalPrice } = useSelector(
    (state) => state.ingredients
  );

  const moveItem = (item) => {
    item.type === "bun"
      ? dispatch({
          type: ADD_BUN,
          item: item,
        })
      : dispatch({
          type: ADD_INGREDIENT,
          item: item,
        });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      moveItem(item);
    },
  });

  const findCard = useCallback(
    (id) => {
      const card = ordered.filter((c) => c.id === id)[0];
      return {
        card,
        index: ordered.indexOf(card),
      };
    },
    [ordered]
  );

  const moveCard = useCallback(
    (id, atIndex) => {
      const { index } = findCard(id);
      dispatch({
        type: MOVE_INGREDIENT,
        index: index,
        atIndex: atIndex,
      });
    },
    [findCard, dispatch]
  );

  const [, drop] = useDrop(() => ({ accept: "constructorItems" }));

  return (
    <section
      className={`${constructorStyles.section} mt-25 pl-4`}
      ref={dropTarget}
    >
      <ConstructorBunItem element={bun} type="top" isTop />
      <ul className={cn(constructorStyles.list, {[constructorStyles.listActive]: isHover})} ref={drop}>
        {ordered.map((card, i) => (
          <ConstructorItem
            key={card.id}
            id={card.id}
            element={card}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </ul>
      <ConstructorBunItem element={bun} type="bottom" isBottom />
      <div className={`${constructorStyles.buttonContainer} mt-9 pr-4`}>
        <div className={`${constructorStyles.priceContainer} mr-10`}>
          <span className="text text_type_digits-medium mr-2">
            {finalPrice}
          </span>
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
  onConfirmClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
