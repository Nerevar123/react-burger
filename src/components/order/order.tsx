import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyles from "./order.module.css";
import { IIngredient } from "../../types/ingredient";

function Order() {
  const { currentOrder } = useSelector((state) => state.ingredients);
  const { orders } = useSelector((state) => state.ws);
  const { id } = useParams<{ id: string }>();

  const order = currentOrder || orders.orders.find((order) => order._id === id);

  if (!order) {
    return null;
  }

  return (
    <section className={orderStyles.order}>
      <p
        className={`${orderStyles.number} text text_type_digits-default mb-10`}
      >
        #{order?.number}
      </p>
      <h2 className="text text_type_main-medium mb-3">{order?.name}</h2>
      <p className="text text_type_main-default mb-15">Создан</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`${orderStyles.itemsList} pr-6`}>
        {order?.ingredients.map((item: IIngredient) => (
          <li className={orderStyles.item} key={item.key}>
            <div className={`${orderStyles.pict} mr-4`}>
              <img
                className={orderStyles.img}
                src={item.image_mobile}
                alt={item.name}
              />
            </div>
            <p
              className={`${orderStyles.itemName} text text_type_main-default`}
            >
              {item.name}
            </p>
            <div className={orderStyles.priceContainer}>
              <span className="text text_type_digits-default">
                1 x {item.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${orderStyles.info} mt-10`}>
        <span
          className={`${orderStyles.date} text text_type_main-default text_color_inactive`}
        >
          Сегодня, 16:20 i-GMT+3
        </span>
        <div className={orderStyles.priceContainer}>
          <span className="text text_type_digits-default mr-2">480</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}

export default Order;
