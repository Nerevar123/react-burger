import { useState, useEffect, useCallback, memo } from "react";
import { useDrag } from "react-dnd";
import { useHistory, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/hooks";
import { openIngredientAction } from "../../services/actions/ingredients";
import ingredientStyles from "./ingredient.module.css";
import { IIngredientProps } from "./ingredient.types";

const Ingredient = memo(function Ingredient({ item }: IIngredientProps) {
  const history = useHistory();
  const [counter, setCounter] = useState<number | null>(null);
  const { ordered, bun } = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (item.type === "bun") {
      setCounter(bun?._id === item._id ? 2 : 0);
    } else {
      setCounter(ordered.filter((el) => el._id === item._id).length);
    }
  }, [bun?._id, item._id, item.type, ordered]);

  const [{ opacity }, ref] = useDrag({
    type: "ingredients",
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const onItemClick = useCallback(() => {
    dispatch(openIngredientAction(item));
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
      data-test-id="ingredient"
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
      {counter! > 0 && <Counter count={counter!} size="default" />}
    </article>
  );
});

export default Ingredient;
