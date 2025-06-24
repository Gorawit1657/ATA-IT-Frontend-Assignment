import React, { useState } from 'react';
import { Collapse, Row, Col, Badge, Card } from 'react-bootstrap';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import Button from './common/Button';

const ExpandableOrderRow = ({ order, columns, index, isMobile, onUpdateOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAccept = () => {
    // Change status to Accepted
    if (onUpdateOrder) {
      onUpdateOrder(order.id, { status: 'Accepted' });
    }
  };

  const handleReject = () => {
    // Change status to Rejected
    if (onUpdateOrder) {
      onUpdateOrder(order.id, { status: 'Rejected' });
    }
  };

  const orderDetails = [
    { label: 'Net Amount', value: order.netAmount || 'N/A' },
    { label: 'Price', value: order.amount ? `${order.amount.toFixed(2)}` : 'N/A' },
    { label: 'Exchange Rate', value: order.exchangeRate || 'N/A' },
    { label: 'Daily Time', value: order.dailyTime || 'N/A' },
    { label: 'Reference Number', value: order.referenceNumber || 'N/A' },
    { label: 'Delivery Number', value: order.deliveryNumber || 'N/A' },
    { label: 'Telephone', value: order.telephone || 'N/A' },
    { label: 'User ID', value: order.userID || 'N/A' }
  ];

  const getCellValue = (column) => {
    switch(column) {
      case 'Account': return order.account;
      case 'Operation': return <Badge bg="info" className="small">{order.operation}</Badge>;
      case 'Symbol': return order.symbol;
      case 'Description': return order.description;
      case 'Qty.': return order.period || '-';
      case 'Filled Qty': return order.transmission || '-';
      case 'Price': return order.amount ? order.amount.toFixed(2) : '-';
      case 'Status': 
        const statusColor = order.status === 'Accepted' ? 'success' : 
                           order.status === 'Rejected' ? 'danger' : 'warning';
        return <Badge bg={statusColor} className="small">{order.status}</Badge>;
      case 'Date': return formatDate(order.date);
      case 'Expiration': return formatDate(order.retention);
      case 'No. Ref.': return order.reference || '-';
      case 'Ext. Ref.': return order.currency || '-';
      default: return '-';
    }
  };

  return (
    <>
      <tr 
        onClick={toggleExpanded}
        className="cursor-pointer"
        style={{ cursor: 'pointer' }}
      >
        <td className="text-nowrap small">
          <div className="d-flex align-items-center">
            {isExpanded ? 
              <ChevronDown size={14} className="me-2" /> : 
              <ChevronRight size={14} className="me-2" />
            }
            {order.account}
          </div>
        </td>
        {columns.slice(1).map((column, colIndex) => (
          <td key={colIndex} className="text-nowrap small">
            {getCellValue(column)}
          </td>
        ))}
      </tr>
      
      {/* Expandable Details Row */}
      <tr>
        <td colSpan={columns.length} className="p-0 border-0">
          <Collapse in={isExpanded}>
            <div>
              <Card className="border-0 rounded-0 bg-light">
                <Card.Body className="py-3">
                  {/* Customer Name and Action Buttons */}
                  <Row className="mb-3">
                    <Col md={8}>
                      <h6 className="mb-2 text-primary">
                        {order.firstName} {order.lastName} | {order.account} - {order.accountType}
                      </h6>
                    </Col>
                    <Col md={4} className="text-end">
                      {order.status === 'Waiting' && (
                        <div className="d-flex gap-2 justify-content-end">
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={handleAccept}
                          >
                            ACCEPT
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={handleReject}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      {order.status === 'Accepted' && (
                        <Badge bg="success" className="fs-6">ACCEPTED</Badge>
                      )}
                      {order.status === 'Rejected' && (
                        <Badge bg="danger" className="fs-6">REJECTED</Badge>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <h6 className="mb-3 text-primary">Order Information</h6>
                      <div className="mb-2 small">
                        <strong>Account:</strong> {order.account}
                      </div>
                      <div className="mb-2 small">
                        <strong>Description:</strong> {order.description}
                      </div>
                      <div className="mb-2 small">
                        <strong>Symbol:</strong> {order.symbol}
                      </div>
                    </Col>
                    
                    <Col md={6}>
                      <h6 className="mb-3 text-primary">Financial Details</h6>
                      {orderDetails.slice(0, 4).map((detail, idx) => (
                        <div key={idx} className="mb-2 small">
                          <strong>{detail.label}:</strong> {detail.value}
                        </div>
                      ))}
                    </Col>
                  </Row>
                  
                  <Row className="mt-3">
                    <Col md={6}>
                      <h6 className="mb-3 text-primary">Contact & Reference</h6>
                      {orderDetails.slice(4).map((detail, idx) => (
                        <div key={idx} className="mb-2 small">
                          <strong>{detail.label}:</strong> {detail.value}
                        </div>
                      ))}
                    </Col>
                    
                    <Col md={6}>
                      <h6 className="mb-3 text-primary">Important Warnings</h6>
                      <ul className="list-unstyled small text-muted">
                        <li className="mb-1">• To trade this security in this account, a currency conversion will be made at the current rate.</li>
                        <li className="mb-1">• A similar order has already been submitted.</li>
                        <li className="mb-1">• Your transaction will be processed the following business day.</li>
                        <li className="mb-1">• It is not possible to calculate the buying power of this order.</li>
                        <li className="mb-1">• A cancellation will not be possible during business hours on market orders. You can call a representative for more information.</li>
                        <li>• For the above-mentioned reason(s), your order will be processed by one of our representatives.</li>
                      </ul>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  );
};

export default ExpandableOrderRow;