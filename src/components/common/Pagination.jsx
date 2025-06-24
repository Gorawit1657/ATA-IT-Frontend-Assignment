import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className = '' 
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <BootstrapPagination.Prev 
        key="prev"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />
    );

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <BootstrapPagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </BootstrapPagination.Item>
      );
    }

    // Next button
    items.push(
      <BootstrapPagination.Next 
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    );

    return items;
  };

  if (totalPages <= 1) return null;

  return (
    <BootstrapPagination className={`justify-content-center ${className}`}>
      {renderPageItems()}
    </BootstrapPagination>
  );
};

export default Pagination;