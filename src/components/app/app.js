import { Router, Route, Switch, useHistory, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  AppHeader,
  AppHeaderMobile,
  Modal,
  IngredientDetails,
  OrderDetails,
} from "../";
import {
  HomePage,
  FeedPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "../../pages";

import useWindowSize from "../../hooks/useWindowSize";
import useValidation from "../../hooks/useValidation";
import appStyles from "./app.module.css";

function App() {
  const history = useHistory();
  const size = useWindowSize();
  const validation = useValidation();

  const { ingredientModalOpen, orderModalOpen } = useSelector(
    (state) => state.ingredients
  );

  return (
    <>
      <Router history={history} basename="/">
        {size.width > 750 ? <AppHeader /> : <AppHeaderMobile />}
        <main className={appStyles.main}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/feed">
              <FeedPage />
            </Route>
            <Route exact path="/profile"></Route>
            <Route exact path="/login">
              <LoginPage validation={validation} />
            </Route>
            <Route exact path="/register">
              <RegisterPage validation={validation} />
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPasswordPage validation={validation} />
            </Route>
            <Route exact path="/reset-password">
              <ResetPasswordPage validation={validation} />
            </Route>
            <Route>
              <Redirect to={"/"} />
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
