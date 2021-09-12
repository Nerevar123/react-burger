import { OrderCard } from "..";
import feedStyles from "./feed.module.css";
import data from "../../utils/orders.json";

function Feed() {
  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={feedStyles.orders}>
        {data.map((item) => (
          <OrderCard order={item} key={item.id} fromFeed />
        ))}
      </div>
    </section>
  );
}

export default Feed;
