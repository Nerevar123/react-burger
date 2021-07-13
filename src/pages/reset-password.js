import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserSection, UserForm } from "../components";
import { setPassword } from "../services/actions/user";
import styles from "./home.module.css";

function ResetPasswordPage({ validation }) {
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
    dispatch(
      setPassword({
        email: values.email,
        token: values.token,
      })
    );
  };

  return (
    <UserSection title="Восстановление пароля">
      <UserForm buttonText="Сохранить" onSubmit={handleSubmit}>
        <div className={`${styles.input} mt-6`}>
          <PasswordInput
            onChange={handleChange}
            value={values.password || ""}
            name={"password"}
            placeholder="Введите новый пароль"
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
