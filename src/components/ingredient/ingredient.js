import { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { OPEN_INGREDIENT_MODAL } from "../../services/actions/ingredients";
import ingredientStyles from "./ingredient.module.css";

const Ingredient = memo(function Ingredient({ item }) {
  const history = useHistory();
  const [counter, setCounter] = useState(null);
  const { ordered, bun } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (item.type === "bun") {
      setCounter(bun._id === item._id ? 1 : 0);
    } else {
      setCounter(ordered.filter((el) => el._id === item._id).length);
    }
  }, [bun._id, item._id, item.type, ordered]);

  const [{ opacity }, ref] = useDrag({
    type: "ingredients",
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const onItemClick = useCallback(() => {
    dispatch({
      type: OPEN_INGREDIENT_MODAL,
      item: item,
    });
    history.replace({
      pathname: `/ingredients/${item._id}`,
      state: { background: location },
    });
  }, [dispatch, history, item, location]);

  return (
    <article
      className={ingredientStyles.item}
      onClick={onItemClick}
      ref={ref}
      style={{ opacity }}
    >
      <img src={item.image} alt={item.name} className="pr-4 pl-4 mb-2" />
      <div className={`${ingredientStyles.priceContainer} mb-3`}>
        <span
          className={`${ingredientStyles.price} text text_type_digits-default pr-1`}
        >
          {item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientStyles.name} text text_type_main-default mb-6`}
      >
        {item.name}
      </p>
      {counter > 0 && <Counter count={counter} size="default" />}
    </article>
  );
});

Ingredient.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

export default Ingredient;
