import { Router, Route, Switch, useHistory } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import appStyles from "./app.module.css";

function App() {
  const history = useHistory();

  const { ingredientModalOpen, orderModalOpen } = useSelector(
    (state) => state.ingredients
  );

  return (
    <>
      <Router history={history} basename="/">
        <AppHeader />
        <main className={appStyles.main}>
          <Switch>
            <Route exact path="/">
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </Route>
          </Switch>
        </main>
      </Router>
      {ingredientModalOpen && (
        <Modal>
          <IngredientDetails />
        </Modal>
      )}
      {orderModalOpen && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
