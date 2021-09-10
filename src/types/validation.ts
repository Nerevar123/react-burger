export interface IValidation {
  values: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: (newValues?: any, newErrors?: any) => void;
}
