import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "../services/hooks";
import { Route, useRouteMatch, useHistory } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserForm, ProfileNav, ProfileOrders, Order } from "../components";
import { putUserThunk } from "../services/actions/user";
import styles from "./profile.module.css";
import { IUserPageProps } from "./pages.types";

function ProfilePage({ validation }: IUserPageProps) {
  const history = useHistory();
  const dispatch = useDispatch();
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      putUserThunk({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
  };

  const handleReset = () => {
    resetForm(user);
  };

  return (
    <>
      <Route exact path={path}>
        <section className={styles.grid}>
          <ProfileNav />
          <UserForm
            className={styles.form}
            buttonsText={["Сохранить", "Отмена"]}
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <>
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
                <EmailInput
                  onChange={handleChange}
                  value={values.email || ""}
                  name={"email"}
                />
              </div>
              <div className={`${styles.input} mt-6`}>
                <PasswordInput
                  onChange={handleChange}
                  value={values.password || ""}
                  name={"password"}
                />
              </div>
            </>
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
