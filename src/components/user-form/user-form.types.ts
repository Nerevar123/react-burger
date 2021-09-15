import { FormEvent } from "react";

export interface IUserFormProps {
  children: JSX.Element | JSX.Element[];
  buttonText?: string;
  buttonsText?: string[];
  onSubmit: (e: FormEvent) => void;
  onReset?: () => void;
  className: string;
}
