import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UserForm, ProfileNav } from "../components";
import styles from "./profile.module.css";

function ProfilePage({ validation }) {
  const { values, errors, handleChange, resetForm } = validation;
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    resetForm(user);
    return () => {
      resetForm();
    };
  }, [resetForm, user]);

  return (
    <section className={styles.grid}>
      <ProfileNav />
      <UserForm>
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
          <EmailInput onChange={handleChange} value={values.email || ""} />
        </div>
        <div className={`${styles.input} mt-6`}>
          <Input
            onChange={handleChange}
            value={values.password || ""}
            name={"password"}
            placeholder="Пароль"
            error={!!errors.password}
            errorText={errors.password}
            icon={"EditIcon"}
          />
        </div>
      </UserForm>
    </section>
  );
}

export default ProfilePage;
