import PropTypes from "prop-types";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bunIcon from "../../images/bun-icon.svg";
import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from "../../services/actions/ingredients";
import constructorItemStyles from "./constructor-item.module.css";

function ConstructorItem({ item, type, isLocked, isTop, isBottom }) {
  const dispatch = useDispatch();

  const sortItem = (item) => {
    console.log(item);
     dispatch({
          type: MOVE_INGREDIENT,
          item: item,
        });
  };

  const [{ opacity }, ref] = useDrag({
    type: "constructorItems",
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [{ isHover }, dropTarget] = useDrop({
    accept: "constructorItems",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      sortItem(item);
    },
  });

  const removeItem = (item) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      item: item,
    });
  };

  return (
    <div
      className={cn(
        constructorItemStyles.container,
        {
          "ml-8": isLocked,
        },
        { "mb-4": isTop },
        { "mt-4": isBottom }
      )}
      style={{ opacity }}
      ref={dropTarget}
    >
      <div className={constructorItemStyles.drag} ref={ref}>
        {!isLocked && <DragIcon type="primary" />}
        <div
          className={cn(constructorItemStyles.wrapper, {
            "ml-2": !isLocked,
          })}
        >
          <ConstructorElement
            text={`${item.name || "Булка"} ${isTop ? "(верх)" : ""} ${
              isBottom ? "(низ)" : ""
            }`}
            price={item.price}
            thumbnail={item.image || bunIcon}
            type={type}
            isLocked={isLocked}
            handleClose={() => removeItem(item)}
          />
        </div>
      </div>
    </div>
  );
}

ConstructorItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
  }),
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
};

export default ConstructorItem;
