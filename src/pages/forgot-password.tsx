import { FormEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { UserSection, UserForm } from "../components";
import { forgotPasswordThunk, getUserThunk } from "../services/actions/user";
import styles from "./home.module.css";
import { IUserPageProps } from "./pages.types";

function ForgotPasswordPage({ validation }: IUserPageProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { forgotPasswordSuccess, isLoggedIn } = useSelector(
    (state) => state.user
  );
  const { values, errors, handleChange, resetForm } = validation;

  useEffect(() => {
    resetForm();
    return () => {
      resetForm();
    };
  }, [resetForm]);

  useEffect(() => {
    dispatch(getUserThunk());
    if (forgotPasswordSuccess) {
      history.push("/reset-password");
    }
    if (isLoggedIn) {
      history.push("/");
    }
  }, [dispatch, forgotPasswordSuccess, history, isLoggedIn]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      forgotPasswordThunk({
        email: values.email,
      })
    );
  };

  return (
    <UserSection title="Восстановление пароля">
      <UserForm
        buttonText="Восстановить"
        onSubmit={handleSubmit}
        className="forgot"
      >
        <div className={`${styles.input} mt-6`}>
          <Input
            onChange={handleChange}
            value={values.email || ""}
            name={"email"}
            type="email"
            placeholder="Укажите e-mail"
            error={!!errors.email}
            errorText={errors.email}
          />
        </div>
      </UserForm>
      <p className="text text_type_main-default mb-4">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </UserSection>
  );
}

export default ForgotPasswordPage;
