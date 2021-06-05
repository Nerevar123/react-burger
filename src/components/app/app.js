import { useState, useEffect } from "react";
import { Router, Route, Switch, useHistory } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getData } from "../../utils/api";
import appStyles from "./app.module.css";

function App() {
  const [data, setData] = useState(null);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isIngredientModalOpen, setIngredientModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const orderNumber = "034536";

  useEffect(() => {
    getData()
      .then(({ data }) => {
        setData(data);
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

  const handleConfirmClick = () => {
    setOrderModalOpen(true);
  };

  const closeAllModal = () => {
    setIngredientModalOpen(false);
    setOrderModalOpen(false);
  };

  if (isLoading === true) {
    return <Preloader />;
  }

  return (
    <>
      <Router history={history} basename="/">
        <AppHeader />
        <main className={appStyles.main}>
          <Switch>
            <Route exact path="/">
              <BurgerIngredients
                data={data}
                onIngredientClick={onIngredientClick}
              />
              <BurgerConstructor
                data={data}
                onConfirmClick={handleConfirmClick}
              />
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
    </>
  );
}

export default App;
