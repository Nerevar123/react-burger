import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch, useHistory } from "react-router-dom";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserForm, ProfileNav, ProfileOrders, Order } from "../components";
import styles from "./profile.module.css";

function ProfilePage({ validation }) {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { values, errors, handleChange, resetForm } = validation;
  const { user, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    resetForm(user);
    return () => {
      resetForm();
    };
  }, [resetForm, user]);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [history, isLoggedIn]);

  return (
    <>
      <Route exact path={path}>
        <section className={styles.grid}>
          <ProfileNav />
          <UserForm className={styles.form}>
            <div className={styles.input}>
              <Input
                onChange={handleChange}
                value={values.name || ""}
                name={"name"}
                placeholder="Имя"
                error={!!errors.name}
                errorText={errors.name}
                icon={"EditIcon"}
              />
            </div>
            <div className={`${styles.input} mt-6`}>
              <EmailInput onChange={handleChange} value={values.email || ""} />
            </div>
            <div className={`${styles.input} mt-6`}>
              <Input
                onChange={handleChange}
                value={values.password || ""}
                name={"password"}
                placeholder="Пароль"
                error={!!errors.password}
                errorText={errors.password}
                icon={"EditIcon"}
              />
            </div>
          </UserForm>
        </section>
      </Route>
      <Route exact path={`${path}/orders`}>
        <section className={styles.grid}>
          <ProfileNav />
          <ProfileOrders />
        </section>
      </Route>
      <Route exact path={`${path}/orders/:id`}>
        <Order />
      </Route>
    </>
  );
}

export default ProfilePage;
