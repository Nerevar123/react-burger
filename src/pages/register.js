import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserSection, UserForm } from "../components";
import { register, getUser } from "../services/actions/user";
import styles from "./home.module.css";

function RegisterPage({ validation }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn, registerSuccess } = useSelector((state) => state.user);
  const { values, errors, handleChange, resetForm } = validation;

  useEffect(() => {
    resetForm();
    return () => {
      resetForm();
    };
  }, [resetForm]);

  useEffect(() => {
    dispatch(getUser());
    if (registerSuccess) {
      history.push("/profile");
    }
    if (isLoggedIn) {
      history.push("/");
    }
  }, [dispatch, history, isLoggedIn, registerSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <UserSection title="Регистрация">
      <UserForm buttonText="Зарегистрироваться" onSubmit={handleSubmit}>
        <div className={`${styles.input} mt-6`}>
          <Input
            onChange={handleChange}
            value={values.name || ""}
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
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </UserSection>
  );
}

export default RegisterPage;
