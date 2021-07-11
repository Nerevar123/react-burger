import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { UserSection, UserForm } from "../components";
import styles from "./home.module.css";

function ForgotPasswordPage({ validation }) {
  const { values, errors, handleChange, resetForm } = validation;

  useEffect(() => {
    resetForm();
    return () => {
      resetForm();
    };
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <UserSection title="Восстановление пароля">
      <UserForm buttonText="Восстановить" onSubmit={handleSubmit}>
        <div className={`${styles.input} mt-6`}>
          <Input
            onChange={handleChange}
            value={values.email}
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
