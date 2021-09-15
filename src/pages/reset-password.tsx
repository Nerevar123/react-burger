import { FormEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserSection, UserForm } from "../components";
import { resetPasswordThunk, getUserThunk } from "../services/actions/user";
import styles from "./home.module.css";
import { IUserPageProps } from "./pages.types";

function ResetPasswordPage({ validation }: IUserPageProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { resetPasswordSuccess, isLoggedIn, forgotPasswordSuccess } =
    useSelector((state) => state.user);
  const { values, errors, handleChange, resetForm } = validation;

  useEffect(() => {
    resetForm();
    return () => {
      resetForm();
    };
  }, [resetForm]);

  useEffect(() => {
    dispatch(getUserThunk());
    if (resetPasswordSuccess || !forgotPasswordSuccess) {
      history.push("/login");
    }
    if (isLoggedIn) {
      history.push("/");
    }
  }, [
    dispatch,
    forgotPasswordSuccess,
    history,
    isLoggedIn,
    resetPasswordSuccess,
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      resetPasswordThunk({
        password: values.password,
        token: values.token,
      })
    );
  };

  return (
    <UserSection title="Восстановление пароля">
      <UserForm
        buttonText="Сохранить"
        onSubmit={handleSubmit}
        className="reset"
      >
        <div className={`${styles.input} mt-6`}>
          <PasswordInput
            onChange={handleChange}
            value={values.password || ""}
            name={"password"}
          />
        </div>
        <div className={`${styles.input} mt-6`}>
          <Input
            onChange={handleChange}
            value={values.token || ""}
            name={"token"}
            placeholder="Введите код из письма"
            error={!!errors.token}
            errorText={errors.token}
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

export default ResetPasswordPage;
