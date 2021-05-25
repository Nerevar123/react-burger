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
  isActive: PropTypes.bool,
};

export default ConstructorItem;
