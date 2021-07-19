import { useHistory, useRouteMatch } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderStyles from "./order-card.module.css";

function OrderCard({ data }) {
  const history = useHistory();
  const { path } = useRouteMatch();

  const handleClick = () => {
    history.push({ pathname: `${path}/${data.id}` });
  };

  const iconToRender = data.ingredients.slice(0, 5);

  return (
    <article className={`${orderStyles.card} p-6`} onClick={handleClick}>
      <div className={orderStyles.info}>
        <p className="text text_type_digits-default mb-6">#{data.id}</p>
        <h2 className="text text_type_main-medium mb-2">{data.name}</h2>
        <p className="text text_type_main-default mb-6">Создан</p>
      </div>
      <div className={orderStyles.icons}>
        {iconToRender.map((icon) => (
          <div className={orderStyles.pict} key={icon._id}>
            <img
              className={orderStyles.img}
              src={icon.image_mobile}
              alt={icon.name}
            />
          </div>
        ))}
      </div>
      <span
        className={`${orderStyles.date} text text_type_main-default text_color_inactive`}
      >
        {data.orderTime}
      </span>
      <div className={orderStyles.priceContainer}>
        <span className="text text_type_digits-default mr-2">{data.price}</span>
        <CurrencyIcon type="primary" />
      </div>
    </article>
  );
}

export default OrderCard;
