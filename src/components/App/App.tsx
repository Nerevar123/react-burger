import "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <BurgerConstructor />
        <BurgerIngredients />
      </main>
    </>
  );
}

export default App;
