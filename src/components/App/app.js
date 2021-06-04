import { useState, useEffect, useCallback } from "react";
import { Router, Route, Switch, useHistory } from "react-router-dom";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import Preloader from "../preloader/preloader";
import ClosableModal from "../hocs/closable-modal";

import { getData } from "../../utils/api";
import useDisclosure from "../../hooks/useDisclosure";
import appStyles from "./app.module.css";

function App() {
  const [data, setData] = useState(null);
  const history = useHistory();
  // const open = useCallback(() => setData((prev) => prev + 1), []);
  // const close = useCallback(() => console.log(data), [data]);

  const [isModalOpen, modalToggler] = useDisclosure(false, {
    // onOpen: open,
    // onClose: close,
  });

  useEffect(() => {
    getData()
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (data === null) {
    return <Preloader pageLoader />;
  }

  return (
    <>
      <Router history={history} basename="/">
        <AppHeader />
        <main className={appStyles.main}>
          <Switch>
            <Route exact path="/">
              <BurgerIngredients data={data} />
              <BurgerConstructor data={data} openModal={modalToggler} />
            </Route>
          </Switch>
        </main>
      </Router>
      <ClosableModal>
        <Modal data={data} isOpen={isModalOpen} onClose={modalToggler} />
      </ClosableModal>
    </>
  );
}

export default App;
