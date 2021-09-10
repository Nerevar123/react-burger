import { useEffect } from "react";
import {
  Router,
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  AppHeader,
  AppHeaderMobile,
  Modal,
  IngredientDetails,
  OrderDetails,
  ProtectedRoute,
} from "..";
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
import { getIngredientsThunk } from "../../services/actions/ingredients";
import useWindowSize from "../../hooks/useWindowSize";
import useValidation from "../../hooks/useValidation";
import appStyles from "./app.module.css";

function App() {
  const history = useHistory();
  const location = useLocation<{
    background: undefined;
  }>();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const validation = useValidation();

  const { ingredientModalOpen, orderModalOpen } = useSelector(
    (state) => state.ingredients
  );

  let background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  useEffect(() => {
    history.replace({
      state: { background: undefined },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router history={history}>
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
            <Route path="/ingredients/:id">
              <IngredientPage />
            </Route>
            <Route>
              <Redirect to={"/"} />
            </Route>
          </Switch>
          {background && (
            <Route path="/ingredients/:id">
              {ingredientModalOpen && (
                <Modal>
                  <IngredientDetails />
                </Modal>
              )}
            </Route>
          )}
        </main>
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
