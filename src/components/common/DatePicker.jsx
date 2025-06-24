import React from 'react';
import { Form } from 'react-bootstrap';

const CustomDatePicker = ({ 
  label, 
  selected, 
  onChange, 
  placeholder = 'Select date',
  error,
  required = false,
  className = ''
}) => {

  // Convert Date object to YYYY-MM-DD format 
  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle input change and convert back to Date object
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value) {
      onChange(new Date(value));
    } else {
      onChange(null);
    }
  };

  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && (
        <Form.Label>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <div className="position-relative">
        <Form.Control
          type="date"
          value={formatDateForInput(selected)}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={error ? 'is-invalid' : ''}
        />
      </div>
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default CustomDatePicker;