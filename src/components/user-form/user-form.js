import cn from "classnames";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import userFormStyles from "./user-form.module.css";

function UserForm({ children, buttonText, onSubmit, className }) {
  return (
    <form className={cn(userFormStyles.form, { [className]: className })}>
      <fieldset className={userFormStyles.fieldset}>{children}</fieldset>
      <div className="mt-6 mb-20">
        {buttonText && (
          <Button type="primary" size="medium" onClick={onSubmit}>
            {buttonText}
          </Button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
