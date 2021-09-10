import { FormEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserSection, UserForm } from "../components";
import { registerThunk, getUserThunk } from "../services/actions/user";
import styles from "./home.module.css";
import { IUserPageProps } from "./pages.types";

function RegisterPage({ validation }: IUserPageProps) {
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
    dispatch(getUserThunk());
    if (registerSuccess) {
      history.push("/profile");
    }
    if (isLoggedIn) {
      history.push("/");
    }
  }, [dispatch, history, isLoggedIn, registerSuccess]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      registerThunk({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    );
  };

  return (
    <UserSection title="Регистрация">
      <>
        <UserForm
          buttonText="Зарегистрироваться"
          onSubmit={handleSubmit}
          className="register"
        >
          <>
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
          </>
        </UserForm>
        <p className="text text_type_main-default mb-4">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </>
    </UserSection>
  );
}

export default RegisterPage;
