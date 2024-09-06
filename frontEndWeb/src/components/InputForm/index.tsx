import React from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import Input from '../Input';
import './styles.css';  // Import the CSS file instead of styled-components

interface InputFormProps {
  control: Control<any>;  // Use the appropriate type for your form data
  name: string;
  error?: FieldError; // Optional error
  label?: string; // Optional label
  defaultValue?: any; // Adjust based on expected default value type
  [key: string]: any; // For any additional props
}

const InputForm: React.FC<InputFormProps> = ({
  control,
  name,
  error,
  label,
  defaultValue,
  ...rest
}) => {
  return (
    <div className="container">
      {label && <label>{label}</label>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            defaultValue={value}
            isValid={!error}
            {...rest}
          />
        )}
        name={name}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};

export default InputForm;
