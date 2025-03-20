import { useState, useEffect, useCallback } from 'react';
import { Delivery } from '@/types';
import { fetchDeliveries } from '@/services/api';
import { useFilterQuery } from './useFilterQuery';


/**
 * Hook for managing deliveries state, pagination, and filtering.
 * @param initialDeliveries - Initial list of deliveries
 * @param initialStatus - Initial status filter
 * @param initialPage - Initial page number
 * @param total- Total page number
 * @returns Object containing deliveries state and management functions
 */

export function useDeliveries(initialDeliveries: Delivery[], initialStatus: string, initialPage: number, total: number) {

  
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [status, setStatus] = useState(initialStatus);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(total);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useFilterQuery(status, page)

  const fetchData = async () => {
    setIsLoading(true);
    try {
      console.log('p',page)
      const response = await fetchDeliveries(page, status);
      setDeliveries(response.items);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error('Failed to fetch deliveries:', error);
      setError('Failed to load deliveries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  
  

  useEffect(() => {
      fetchData();
  }, [status, page]);


  


  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setPage(1);
  };

 



  return {
    deliveries,
    status,
    setStatus: handleStatusChange,
    page,
    setPage,
    totalPages,
    isLoading,
    error
  };
}
