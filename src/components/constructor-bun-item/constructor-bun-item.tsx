import cn from "classnames";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import bunIcon from "../../images/bun-icon.svg";
import constructorBunItemStyles from "./constructor-bun-item.module.css";
import { IConstructorBunItemProps } from "./constructor-bun-item.types";

function ConstructorBunItem({
  element,
  type,
  isTop,
  isBottom,
}: IConstructorBunItemProps) {
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
          text={`${element?.name || "Булка"} ${isTop ? "(верх)" : ""} ${
            isBottom ? "(низ)" : ""
          }`}
          price={element?.price}
          thumbnail={element?.image || bunIcon}
          type={type}
          isLocked
        />
      </div>
    </div>
  );
}

export default ConstructorBunItem;
