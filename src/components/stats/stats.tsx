import statsStyles from "./stats.module.css";

function Stats() {
  return (
    <>
      <section className="mt-25">
        <div className={statsStyles.orders}>
          <div className={statsStyles.orderList}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <p className="text text_type_digits-default mb-2">034533</p>
            <p className="text text_type_digits-default mb-2">034533</p>
            <p className="text text_type_digits-default mb-2">034533</p>
            <p className="text text_type_digits-default mb-2">034533</p>
            <p className="text text_type_digits-default mb-2">034533</p>
          </div>
          <div className={statsStyles.orderList}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            <p className="text text_type_digits-default mb-2">034533</p>
            <p className="text text_type_digits-default mb-2">034533</p>
            <p className="text text_type_digits-default mb-2">034533</p>
            <p className="text text_type_digits-default mb-2">034533</p>
            <p className="text text_type_digits-default mb-2">034533</p>
          </div>
        </div>
        <p className="text text_type_main-medium mt-15">
          Выполнено за все время:
        </p>
        <p className="text text_type_digits-large mb-15">28 752</p>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">138</p>
      </section>
    </>
  );
}

export default Stats;
