import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { Loader, OrderCard } from "..";
import ordersStyles from "./profile-orders.module.css";
import { ESizes } from "../loader/loader.types";
import { wsConnectionStart, wsConnectionStop } from "../../services/actions/ws";
import { getCookie } from "../../utils/utils";

function ProfileOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.ws);
  const token = getCookie("token");

  useEffect(() => {
    dispatch(
      wsConnectionStart(
        `wss://norma.nomoreparties.space/orders?token=${
          token?.split("Bearer ")[1]
        }`
      )
    );
    return () => {
      dispatch(wsConnectionStop());
    };
  }, [dispatch, token]);

  if (orders.orders.length === 0) {
    return <Loader size={ESizes.large} />;
  }

  return (
    <section className={ordersStyles.section}>
      {orders.orders.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}
    </section>
  );
}

export default ProfileOrders;
