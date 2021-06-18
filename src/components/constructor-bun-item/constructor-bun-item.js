import PropTypes from "prop-types";
import cn from "classnames";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import bunIcon from "../../images/bun-icon.svg";
import constructorBunItemStyles from "./constructor-bun-item.module.css";

function ConstructorBunItem({ element, type, isTop, isBottom }) {
  return (
    <div
      className={cn(
        constructorBunItemStyles.container,
        "ml-8",
        { "mb-4": isTop },
        { "mt-4": isBottom }
      )}
    >
      <div className={constructorBunItemStyles.wrapper}>
        <ConstructorElement
          text={`${element.name || "Булка"} ${isTop ? "(верх)" : ""} ${
            isBottom ? "(низ)" : ""
          }`}
          price={element.price}
          thumbnail={element.image || bunIcon}
          type={type}
          isLocked
        />
      </div>
    </div>
  );
}

ConstructorBunItem.propTypes = {
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
  isTop: PropTypes.bool,
  isBottom: PropTypes.bool,
};

export default ConstructorBunItem;
