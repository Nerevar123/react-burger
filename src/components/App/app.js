import { useState, useEffect, useRef } from "react";
import { Router, Route, Switch, useHistory } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";
import ClosableModal from "../hocs/closable-modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getData } from "../../utils/api";
import appStyles from "./app.module.css";

function App() {
  const [data, setData] = useState(null);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isIngredientModalOpen, setIngredientModalOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const history = useHistory();
  const orderRef = useRef(null);
  const ingredientRef = useRef(null);

  useEffect(() => {
    getData()
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log(err));
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

  if (data === null) {
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
        <ClosableModal>
          <Modal
            isOpen={isIngredientModalOpen}
            onClose={closeAllModal}
            wrapperRef={ingredientRef}
          >
            <IngredientDetails item={currentIngredient} />
          </Modal>
        </ClosableModal>
      )}
      {isOrderModalOpen && (
        <ClosableModal>
          <Modal
            isOpen={isOrderModalOpen}
            onClose={closeAllModal}
            wrapperRef={orderRef}
          >
            <OrderDetails isOpen={isOrderModalOpen} />
          </Modal>
        </ClosableModal>
      )}
    </>
  );
}

export default App;
