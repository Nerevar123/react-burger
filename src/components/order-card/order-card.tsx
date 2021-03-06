import { useCallback } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/hooks";
import { openOrderDetailsAction } from "../../services/actions/ingredients";
import orderStyles from "./order-card.module.css";
import { IOrderCardProps } from "./order-card.types";
import { formatDate } from "../../utils/utils";

function OrderCard({ order, fromFeed }: IOrderCardProps) {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(openOrderDetailsAction(order));
    history.replace({
      pathname: `${url}/${order._id}`,
      state: { background: location },
    });
  }, [dispatch, history, location, order, url]);

  const iconToRender = order.ingredients.slice(0, 5);
  return (
    <article className={`${orderStyles.card} p-6`} onClick={handleClick}>
      <div className={orderStyles.info}>
        <p className="text text_type_digits-default mb-6">#{order.number}</p>
        <h2 className="text text_type_main-medium mb-2">{order.name}</h2>
        {!fromFeed && (
          <p className="text text_type_main-default mb-6">Создан</p>
        )}
      </div>
      <div className={orderStyles.icons}>
        {iconToRender.map((icon: any) => (
          <div className={orderStyles.pict} key={icon.key}>
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
        {formatDate(order.createdAt)}
      </span>
      <div className={orderStyles.priceContainer}>
        <span className="text text_type_digits-default mr-2">
          {order.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </article>
  );
}

export default OrderCard;
