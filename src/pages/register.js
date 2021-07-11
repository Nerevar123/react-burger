import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserSection, UserForm } from "../components";
import styles from "./home.module.css";

function RegisterPage({ validation }) {
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
    <UserSection title="Регистрация">
      <UserForm buttonText="Зарегистрироваться" onSubmit={handleSubmit}>
        <div className={`${styles.input} mt-6`}>
          <Input
            onChange={handleChange}
            value={values.name}
            name={"name"}
            type="text"
            placeholder="Имя"
            error={!!errors.name}
            errorText={errors.name}
          />
        </div>
        <div className={`${styles.input} mt-6`}>
          <Input
            onChange={handleChange}
            value={values.email}
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
            value={values.password}
            name={"password"}
          />
        </div>
      </UserForm>
      <p className="text text_type_main-default mb-4">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </UserSection>
  );
}

export default RegisterPage;
