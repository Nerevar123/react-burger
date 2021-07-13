import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserSection, UserForm } from "../components";
import { login } from "../services/actions/user";
import styles from "./home.module.css";

function Login({ validation }) {
  const dispatch = useDispatch();
  const { values, errors, handleChange, resetForm } = validation;

  useEffect(() => {
    resetForm();
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({
      name: values.name,
      email: values.email,
      password: values.password,
    }));
  };

  return (
    <UserSection title="Вход">
      <UserForm buttonText="Войти" onSubmit={handleSubmit}>
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
