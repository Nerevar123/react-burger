import { useSelector } from "react-redux";
import { DoneAnimation } from "../";
import orderDetailsStyles from "./order-details.module.css";

function OrderDetails() {
  const orderNumber = useSelector((state) => state.ingredients.orderNumber);
  return (
    <>
      <h2 className="text text_type_digits-large mt-20 mb-8">{orderNumber}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={orderDetailsStyles.gif}>
        <DoneAnimation />
      </div>
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;
