import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { REMOVE_INGREDIENT } from "../../services/actions/ingredients";
import constructorItemStyles from "./constructor-item.module.css";

function ConstructorItem({ element, type, findCard, moveCard, id }) {
  const dispatch = useDispatch();

  const removeItem = useCallback(
    (item) => {
      dispatch({
        type: REMOVE_INGREDIENT,
        item: item,
      });
    },
    [dispatch]
  );

  const originalIndex = useMemo(() => {
    return findCard(id).index;
  }, [findCard, id]);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "constructorItems",
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "constructorItems",
      canDrop: () => false,
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;

  return (
    <li
      className={constructorItemStyles.listItem}
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
    >
      <div className={constructorItemStyles.container}>
        <DragIcon type="primary" />
        <div className={cn(constructorItemStyles.wrapper, "ml-2")}>
          <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image}
            type={type}
            handleClose={() => removeItem(element)}
          />
        </div>
      </div>
    </li>
  );
}

ConstructorItem.propTypes = {
  element: PropTypes.shape({
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
};

export default ConstructorItem;
