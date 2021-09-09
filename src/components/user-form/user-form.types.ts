export interface IUserFormProps {
  children: JSX.Element;
  buttonText: string;
  buttonsText: string;
  onSubmit: () => void;
  onReset: () => void;
  className: string;
}
