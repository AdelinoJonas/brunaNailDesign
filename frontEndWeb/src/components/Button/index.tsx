import React from 'react';
import './styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  plus?: boolean;
  title: string;
  mobileTextHidden?: boolean;
  medium?: boolean;
  large?: boolean;
  typeNew?: boolean;
  rounded?: boolean;
}

const Button: React.FC<ButtonProps> = ({ plus, title, mobileTextHidden, medium, large, typeNew, rounded, className, ...rest }) => {
  // Construct class name based on props
  const buttonClassName = [
    'button',
    medium ? 'medium' : '',
    large ? 'large' : '',
    typeNew ? 'typeNew' : '',
    rounded ? 'rounded' : '',
    className || ''
  ].join(' ');

  return (
    <button
      className={buttonClassName}
      {...rest}
    >
      {plus && <span className="plus" />}
      <span className={`title ${mobileTextHidden ? 'hidden' : ''}`}>
        {title}
      </span>
    </button>
  );
}

export default Button;
