import PropTypes from "prop-types";
import cn from "classnames";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorItemStyles from "./constructor-item.module.css";

function ConstructorItem({ item, type, isLocked }) {
  return (
    <div
      className={cn(constructorItemStyles.container, {
        "ml-8": isLocked,
      })}
    >
      {!isLocked && <DragIcon type="primary" />}
      <div
        className={cn(constructorItemStyles.wrapper, {
          "ml-2": !isLocked,
        })}
      >
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          type={type}
          isLocked={isLocked}
        />
      </div>
    </div>
  );
}

ConstructorItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }),
  type: PropTypes.string,
  isLocked: PropTypes.bool,
};

export default ConstructorItem;
