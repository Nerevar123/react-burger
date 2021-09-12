import { OrderCard } from "..";
import ordersStyles from "./profile-orders.module.css";
import data from "../../utils/orders.json";

function ProfileOrders() {
  return (
    <section className={ordersStyles.section}>
      {data.map((item) => (
        <OrderCard order={item} key={item.id} />
      ))}
    </section>
  );
}

export default ProfileOrders;
