import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  return (
    <BootstrapButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${className}`}
      {...props}
    >
      {children}
    </BootstrapButton>
  );
};

export default Button;