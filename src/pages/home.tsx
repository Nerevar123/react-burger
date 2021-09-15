import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructor, BurgerIngredients } from "../components";
import styles from "./home.module.css";

function HomePage() {
  return (
    <div className={styles.grid}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
}

export default HomePage;
