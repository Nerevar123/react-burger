import { useState, useEffect } from "react";
import { Router, Route, Switch, useHistory } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getData, postOrder } from "../../utils/api";
import { IngredientsContext } from "../../contexts/ingredients-context";
import appStyles from "./app.module.css";

function App() {
  const [order, setOrder] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isIngredientModalOpen, setIngredientModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getData()
      .then(({ data }) => {
        setOrder(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onIngredientClick = (item) => {
    setCurrentIngredient(item);
    setIngredientModalOpen(true);
  };

  const handleConfirmClick = (data) => {
    const orderItems = order.map((item) => item._id);
    postOrder({ ingredients: orderItems })
      .then(({ order }) => {
        setOrderNumber(order.number);
        setOrderModalOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const closeAllModal = () => {
    setIngredientModalOpen(false);
    setOrderModalOpen(false);
  };

  if (isLoading === true) {
    return <Preloader />;
  }

  return (
    <IngredientsContext.Provider value={order}>
      <Router history={history} basename="/">
        <AppHeader />
        <main className={appStyles.main}>
          <Switch>
            <Route exact path="/">
              <BurgerIngredients onIngredientClick={onIngredientClick} />
              <BurgerConstructor onConfirmClick={handleConfirmClick} />
            </Route>
          </Switch>
        </main>
      </Router>
      {isIngredientModalOpen && (
        <Modal isOpen={isIngredientModalOpen} onClose={closeAllModal}>
          <IngredientDetails item={currentIngredient} />
        </Modal>
      )}
      {isOrderModalOpen && (
        <Modal isOpen={isOrderModalOpen} onClose={closeAllModal}>
          <OrderDetails isOpen={isOrderModalOpen} orderNumber={orderNumber} />
        </Modal>
      )}
    </IngredientsContext.Provider>
  );
}

export default App;
