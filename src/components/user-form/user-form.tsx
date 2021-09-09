import cn from "classnames";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import userFormStyles from "./user-form.module.css";
import { IUserFormProps } from "./user-form.types";

function UserForm({
  children,
  buttonText,
  buttonsText,
  onSubmit,
  onReset,
  className,
}: IUserFormProps) {
  return (
    <form className={cn(userFormStyles.form, { [className]: className })}>
      <fieldset className={userFormStyles.fieldset}>{children}</fieldset>
      <div
        className={cn("mt-6 mb-20", { [userFormStyles.buttons]: buttonsText })}
      >
        {buttonsText ? (
          <div className={userFormStyles.buttons}>
            <Button type="secondary" size="medium" onClick={onReset}>
              {buttonsText[1]}
            </Button>
            <Button type="primary" size="medium" onClick={onSubmit}>
              {buttonsText[0]}
            </Button>
          </div>
        ) : (
          <Button type="primary" size="medium" onClick={onSubmit}>
            {buttonText}
          </Button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
