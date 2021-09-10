import { useCallback, useMemo } from "react";
import cn from "classnames";
import { useDispatch } from "../../services/hooks";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { removeIngredientAction } from "../../services/actions/ingredients";
import constructorItemStyles from "./constructor-item.module.css";
import { IConstructorItemProps } from "./constructor-item.types";
import { IIngredient } from "../../types/ingredient";

function ConstructorItem({
  element,
  type,
  findCard,
  moveCard,
  id,
}: IConstructorItemProps) {
  const dispatch = useDispatch();

  const removeItem = useCallback(
    (item) => {
      dispatch(removeIngredientAction(item));
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
      hover(item: IIngredient, monitor: DropTargetMonitor<unknown, unknown>) {
        if (item.id !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(item.id!, overIndex);
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

export default ConstructorItem;
