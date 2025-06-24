import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchForm from './components/SearchForm';
import OrderTable from './components/OrderTable';
import useOrders from './hooks/useOrders';

function App() {
  const { 
    orders, 
    loading, 
    currentPage, 
    totalPages, 
    totalRecords,
    searchOrders, 
    changePage, 
    cancelSearch,
    updateOrder
  } = useOrders();
  
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = (searchCriteria) => {
    setSearchCount(prev => prev + 1);
    searchOrders(searchCriteria);
  };

  const handleCancelSearch = () => {
    cancelSearch();
  };

  const handleUpdateOrder = (orderId, updatedData) => {
    updateOrder(orderId, updatedData);
  };

  return (
    <div className="min-h-screen bg-light">
      <Container fluid className="px-4 py-3">
        {/* Compact Search Form */}
        <SearchForm 
          onSearch={handleSearch} 
          onCancel={handleCancelSearch}
          loading={loading}
          searchResults={totalRecords}
          isSearched={searchCount > 0}
        />
        
        {/* Order Table */}
        <OrderTable
          orders={orders}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
          loading={loading}
          totalRecords={totalRecords}
          onUpdateOrder={handleUpdateOrder}
        />
      </Container>
    </div>
  );
}

export default App;