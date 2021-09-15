import { IngredientDetails } from "../components";

import styles from "./ingredient.module.css";

function IngredientPage() {
  return (
    <section className={styles.section}>
      <IngredientDetails />
    </section>
  );
}

export default IngredientPage;
