import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../components";

import styles from "./ingredient.module.css";

function IngredientPage() {
  const { buns, sauces, main, currentModalItem } = useSelector(
    (state) => state.ingredients
  );
  let { id } = useParams();

  const item =
    currentModalItem ||
    buns.find((item) => item._id === id) ||
    sauces.find((item) => item._id === id) ||
    main.find((item) => item._id === id);
  console.log(item);

  return (
    <section className={styles.section}>
      <IngredientDetails />
    </section>
  );
}

export default IngredientPage;
