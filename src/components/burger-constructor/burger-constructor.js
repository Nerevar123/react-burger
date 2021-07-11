import { useCallback } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorItem, ConstructorBunItem } from "../";
import { postOrder } from "../../services/actions/ingredients";
import useWindowSize from "../../hooks/useWindowSize";
import {
  ADD_INGREDIENT,
  ADD_BUN,
  MOVE_INGREDIENT,
} from "../../services/actions/ingredients";
import constructorStyles from "./burger-constructor.module.css";

function BurgerConstructor() {
  const size = useWindowSize();
  const dispatch = useDispatch();
  const { bun, ordered, finalPrice } = useSelector(
    (state) => state.ingredients
  );

  const handleConfirmClick = useCallback(() => {
    const orderItems = ordered.map((item) => item._id);
    dispatch(postOrder({ ingredients: [...orderItems, bun._id] }));
  }, [bun._id, dispatch, ordered]);

  const moveItem = useCallback(
    (item) => {
      item.type === "bun"
        ? dispatch({
            type: ADD_BUN,
            item: item,
          })
        : dispatch({
            type: ADD_INGREDIENT,
            item: item,
          });
    },
    [dispatch]
  );

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

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      moveItem(item);
    },
  });

  const [, drop] = useDrop(() => ({ accept: "constructorItems" }));

  return (
    <section
      className={`${constructorStyles.section} mt-25 pl-4`}
      ref={dropTarget}
    >
      <ConstructorBunItem element={bun} type="top" isTop />
      <ul
        className={cn(constructorStyles.list, {
          [constructorStyles.listActive]: isHover,
        })}
        ref={drop}
      >
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
      {bun._id && (
        <div
          className={cn(
            constructorStyles.buttonContainer,
            {
              "mt-9 pr-4": size.width > 750,
            },
            { "pt-4 pb-4 pr-2 pl-2": size.width < 750 }
          )}
        >
          <div className={`${constructorStyles.priceContainer} mr-10`}>
            <span className="text text_type_digits-medium mr-2">
              {finalPrice}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={handleConfirmClick}>
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
}

export default BurgerConstructor;
