import { useSelector } from "../../services/hooks";
import { Loader, OrderCard } from "..";
import feedStyles from "./feed.module.css";
import { ESizes } from "../loader/loader.types";

function Feed() {
  const { orders } = useSelector((state) => state.ws);

  if (orders.orders.length === 0) {
    return <Loader size={ESizes.large} />;
  }

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={feedStyles.orders}>
        {orders.orders.map((order) => (
          <OrderCard order={order} key={order._id} fromFeed />
        ))}
      </div>
    </section>
  );
}

export default Feed;
