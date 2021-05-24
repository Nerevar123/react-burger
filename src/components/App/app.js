import { Router, Route, Switch, useHistory } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";
import data from "../../utils/data";

function App() {
  const history = useHistory();
  return (
    <Router history={history} basename="/">
      <AppHeader />
      <main className={appStyles.main}>
        <Switch>
          <Route exact path="/">
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
