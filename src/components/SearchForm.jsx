import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CustomDatePicker from './common/DatePicker';
import Select from './common/Select';
import Button from './common/Button';
import { PERIODS, STATUSES } from '../utils/constants';

const SearchForm = ({ onSearch, loading = false, onCancel, searchResults = 0, isSearched = false }) => {
  const initialFormData = {
    period: 'transmission',
    status: 'waiting',
    fromDate: null,
    toDate: null
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  
  const validateForm = (data = formData) => {
    const newErrors = {};
    
    if (data.fromDate && data.toDate && data.fromDate > data.toDate) {
      newErrors.toDate = 'To date must be after from date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSearch(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCancelSearch = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleShowAll = () => {
    // Reset only date fields
    const resetData = {
      ...formData,
      fromDate: null,
      toDate: null
    };
    setFormData(resetData);
    setErrors({});
    // Call search with fixed period/status
    onSearch({ 
      period: formData.period, 
      status: formData.status 
    });
  };

  return (
    <Card className="mb-3">
      <Card.Body className="py-3">
        {/* Search Row */}
        <form onSubmit={handleSubmit}>
          <Row className="g-3 align-items-end">
            {/* Period */}
            <Col xs={6} md={2}>
              <label className="form-label small mb-1">Period</label>
              <Select
                value={formData.period}
                onChange={(e) => handleChange('period', e.target.value)}
                options={PERIODS}
                className="mb-0"
              />
            </Col>

            {/* Status */}
            <Col xs={6} md={2}>
              <label className="form-label small mb-1">Status</label>
              <Select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                options={STATUSES}
                className="mb-0"
              />
            </Col>

            {/* From Date */}
            <Col xs={6} md={2}>
              <label className="form-label small mb-1">From</label>
              <CustomDatePicker
                selected={formData.fromDate}
                onChange={(date) => handleChange('fromDate', date)}
                error={errors.fromDate}
                className="mb-0"
              />
            </Col>

            {/* To Date */}
            <Col xs={6} md={2}>
              <label className="form-label small mb-1">To</label>
              <CustomDatePicker
                selected={formData.toDate}
                onChange={(date) => handleChange('toDate', date)}
                error={errors.toDate}
                className="mb-0"
              />
            </Col>

            {/* Search Buttons */}
            <Col xs={12} md={4} className="d-flex gap-2 justify-content-end">
              {loading && (
                <Button 
                  variant="outline-secondary" 
                  onClick={handleCancelSearch}
                  size="sm"
                >
                  Cancel
                </Button>
              )}
              <Button 
                variant="outline-primary"
                onClick={handleShowAll}
                disabled={loading}
                size="sm"
              >
                Show All
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                size="sm"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Searching...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </Col>
          </Row>
        </form>

        {/* Search Results Counter */}
        <div className="mt-3 pt-2 border-top">
          <small className="text-muted">
            <strong>{isSearched ? 'Search results:' : 'Total records:'}</strong> {searchResults}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SearchForm;