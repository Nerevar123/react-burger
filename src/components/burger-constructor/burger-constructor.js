import { useContext } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItem from "../constructor-item/constructor-item";
import { IngredientsContext } from "../../contexts/ingredients-context";
import constructorStyles from "./burger-constructor.module.css";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  INCREASE_COUNTER,
} from "../../services/actions/ingredients";

function BurgerConstructor({ onConfirmClick }) {
  // const data = useContext(IngredientsContext);

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
    dispatch({
      type: INCREASE_COUNTER,
      id: item._id,
    });
    // dispatch({
    //   type: REMOVE_INGREDIENT,
    //   ...item
    // })
  };

  const sortItem = (item) => {
    console.log(item);
    //  dispatch({
    //       type: ADD_INGREDIENT,
    //       item: item,
    //     });
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

  // const [{ isHoverr }, sortDropTarget] = useDrop({
  //   accept: "constructorItems",
  //   collect: (monitor) => ({
  //     isHover: monitor.isOver(),
  //   }),
  //   drop(item) {
  //     sortItem(item);
  //   },
  // });

  // const bun = data.find((item) => item.type === "bun");
  // const elements = data.filter((item) => item.type !== "bun");
  // const finalPrice = data.reduce((a, b) => a + (b.price || 0), 0) + bun.price;

  return (
    <section className={`${constructorStyles.section} mt-25 pl-4`}>
      <ConstructorItem item={bun} type="top" isLocked isTop />
      <ul className={constructorStyles.list} ref={dropTarget}>
        {ordered.map((item, i) => (
          <li key={i} className={constructorStyles.listItem}>
            <ConstructorItem item={item} />
          </li>
        ))}
      </ul>
      <ConstructorItem item={bun} type="bottom" isLocked isBottom />
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
