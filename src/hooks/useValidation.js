import { useState, useCallback } from "react";

function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}) => {
      setValues(newValues);
      setErrors(newErrors);
    },
    [setValues, setErrors]
  );

  return {
    values,
    errors,
    handleChange,
    resetForm,
  };
}

export default useValidation;
