import doneImage from "../../images/modal-done.png";

function OrderDetails() {
  return (
    <>
      <h2 className="text text_type_digits-large mt-20 mb-8">034536</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneImage} alt="Order is accepted" />
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
