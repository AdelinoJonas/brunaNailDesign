import React from 'react';
import './styles.css';  // Import the CSS file instead of styled-components

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean; // Optional prop to indicate validity
}

const Input: React.FC<InputProps> = ({ isValid = true, ...rest }) => {
  return (
    <input
      className={`input ${!isValid ? 'invalid' : ''}`}
      {...rest}
    />
  );
};

export default Input;
