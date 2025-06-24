import { useState, useCallback, useRef, useEffect } from 'react';
import { mockOrders } from '../data/mockData';
import { isDateInRange } from '../utils/dateUtils';

const useOrders = () => {
  const [allOrders, setAllOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false); 
  const [lastSearchCriteria, setLastSearchCriteria] = useState(null); 
  const ordersPerPage = 10;
  const abortControllerRef = useRef(null);

  // Load initial data
  useEffect(() => {
    const total = Math.ceil(mockOrders.length / ordersPerPage);
    setTotalPages(total);
    setOrders(mockOrders.slice(0, ordersPerPage));
  }, []);

  // Update current page when page changes 
  useEffect(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    setOrders(filteredOrders.slice(startIndex, endIndex));
  }, [currentPage, filteredOrders]);

  const applyFilter = useCallback((searchCriteria, sourceOrders) => {
    if (!searchCriteria) return sourceOrders;
    
    return sourceOrders.filter(order => {
      const matchesPeriod = !searchCriteria.period || 
        (searchCriteria.period === 'transmission' && order.transmission !== undefined);
      
      const matchesStatus = !searchCriteria.status || 
        order.status.toLowerCase() === searchCriteria.status.toLowerCase();
      
      const matchesDateRange = !searchCriteria.fromDate || !searchCriteria.toDate ||
        isDateInRange(order.date, searchCriteria.fromDate, searchCriteria.toDate);

      return matchesPeriod && matchesStatus && matchesDateRange;
    });
  }, []);

  const searchOrders = useCallback(async (searchCriteria) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    setLoading(true);
    
    try {
      await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(resolve, 800);
        signal.addEventListener('abort', () => {
          clearTimeout(timeoutId);
          reject(new DOMException('Aborted', 'AbortError'));
        });
      });

      if (signal.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }
      
      // Apply filter to all orders
      setLastSearchCriteria(searchCriteria);
      setIsFiltered(true);
      
      // Filter orders based on search criteria
      const filtered = applyFilter(searchCriteria, allOrders);

      if (signal.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }

      // Update states with filtered results
      setFilteredOrders(filtered);
      const total = Math.ceil(filtered.length / ordersPerPage);
      setTotalPages(total);
      setCurrentPage(1);
      
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Search request was cancelled');
        return;
      }
      console.error('Error searching orders:', error);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  }, [allOrders, applyFilter]);

  const updateOrder = useCallback((orderId, updatedData) => {

    const updatedAllOrders = allOrders.map(order => 
      order.id === orderId ? { ...order, ...updatedData } : order
    );
    setAllOrders(updatedAllOrders);

    const updatedFilteredOrders = filteredOrders.map(order => 
      order.id === orderId ? { ...order, ...updatedData } : order
    );
    setFilteredOrders(updatedFilteredOrders);
  }, [allOrders, filteredOrders]);

  const changePage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const cancelSearch = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Reset 
    setIsFiltered(false);
    setLastSearchCriteria(null);
    setFilteredOrders(allOrders);
    const total = Math.ceil(allOrders.length / ordersPerPage);
    setTotalPages(total);
    setCurrentPage(1);
  }, [allOrders]);

  return {
    orders,
    loading,
    currentPage,
    totalPages,
    totalRecords: filteredOrders.length, 
    searchOrders,
    changePage,
    cancelSearch,
    updateOrder
  };
};

export default useOrders;