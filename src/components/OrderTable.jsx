import React, { useState, useEffect } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import Pagination from './common/Pagination';
import ExpandableOrderRow from './ExpandableOrderRow';
import { TABLE_COLUMNS, RESPONSIVE_BREAKPOINT } from '../utils/constants';

const OrderTable = ({ 
  orders = [], 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  loading = false,
  totalRecords = 0,
  onUpdateOrder
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < RESPONSIVE_BREAKPOINT;
  const columns = isMobile ? TABLE_COLUMNS.MOBILE : TABLE_COLUMNS.DESKTOP;

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Searching orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="text-muted">
          <h5 className="mt-3">No Orders Found</h5>
          <p className="mb-0">No orders match your search criteria. Please try different filters.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Table */}
      <div className="table-responsive">
        <BootstrapTable 
          striped 
          hover={false} 
          className="mb-0"
          size="sm"
        >
          <thead className="table-light">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="text-nowrap small">
                  {index === 0 ? (
                    <div className="d-flex align-items-center">
                      <span className="me-2">▼</span>
                      {column}
                    </div>
                  ) : (
                    column
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <ExpandableOrderRow
                key={order.id || index}
                order={order}
                columns={columns}
                index={index}
                isMobile={isMobile}
                onUpdateOrder={onUpdateOrder}
              />
            ))}
          </tbody>
        </BootstrapTable>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small className="text-muted">
            Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalRecords)} of {totalRecords} entries
          </small>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default OrderTable;