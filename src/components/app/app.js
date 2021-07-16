import { useEffect } from "react";
import {
  Router,
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppHeader,
  AppHeaderMobile,
  Modal,
  IngredientDetails,
  OrderDetails,
  ProtectedRoute,
} from "../";
import {
  HomePage,
  FeedPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
} from "../../pages";
import { getIngredients } from "../../services/actions/ingredients";
import useWindowSize from "../../hooks/useWindowSize";
import useValidation from "../../hooks/useValidation";
import appStyles from "./app.module.css";

function App() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const validation = useValidation();

  const { ingredientModalOpen, orderModalOpen } = useSelector(
    (state) => state.ingredients
  );

  // const background = history.action === "PUSH";
  const background = location.state && location.state.background;
  // console.log(background)

  useEffect(() => {
    console.log("122312")
    dispatch(getIngredients());
  }, []);

  return (
    <>
      <Router history={history} basename="/">
        {size.width > 750 ? <AppHeader /> : <AppHeaderMobile />}
        <main className={appStyles.main}>
          <Switch location={background || location}>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/feed">
              <FeedPage />
            </Route>
            <ProtectedRoute path="/profile">
              <ProfilePage validation={validation} />
            </ProtectedRoute>
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
            <Route path="/ingredients/:id" exact>
              <IngredientPage />
            </Route>
            <Route>
              <Redirect to={"/"} />
            </Route>
          </Switch>
        </main>
        {background && (
          <Route path="/ingredients/:id">
            {ingredientModalOpen && (
              <Modal>
                <IngredientDetails />
              </Modal>
            )}
          </Route>
        )}
      </Router>
      {orderModalOpen && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
