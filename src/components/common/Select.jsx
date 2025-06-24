import React from 'react';
import { Form } from 'react-bootstrap';

const Select = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select option',
  error,
  required = false,
  className = '',
  disabled = false
}) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && (
        <Form.Label>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <Form.Select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={error ? 'is-invalid' : ''}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default Select;