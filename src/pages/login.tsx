import { FormEvent, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserSection, UserForm } from "../components";
import { loginThunk, getUserThunk } from "../services/actions/user";
import styles from "./home.module.css";
import { IUserPageProps } from "./pages.types";

function Login({ validation }: IUserPageProps) {
  const history = useHistory();
  const location = useLocation<{
    from: undefined;
  }>();
  const dispatch = useDispatch();
  const { isLoggedIn, loginSuccess } = useSelector((state) => state.user);
  const { values, errors, handleChange, resetForm } = validation;

  useEffect(() => {
    resetForm();
    return () => {
      resetForm();
    };
  }, [resetForm]);

  useEffect(() => {
    if (loginSuccess) {
      history.push(location.state?.from || "/profile");
    } else if (isLoggedIn) {
      history.push("/");
    }
    dispatch(getUserThunk());
  }, [dispatch, history, isLoggedIn, location.state?.from, loginSuccess]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      loginThunk({
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <UserSection title="Вход">
      <UserForm buttonText="Войти" onSubmit={handleSubmit} className="login">
        <div className={`${styles.input} mt-6`}>
          <Input
            onChange={handleChange}
            value={values.email || ""}
            name={"email"}
            type="email"
            placeholder="E-mail"
            error={!!errors.email}
            errorText={errors.email}
          />
        </div>
        <div className={`${styles.input} mt-6`}>
          <PasswordInput
            onChange={handleChange}
            value={values.password || ""}
            name={"password"}
          />
        </div>
      </UserForm>
      <p className="text text_type_main-default mb-4">
        Вы — новый пользователь?{" "}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default">
        Забыли пароль?{" "}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </UserSection>
  );
}

export default Login;
