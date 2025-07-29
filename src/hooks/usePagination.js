import { useState, useCallback } from 'react';

export const usePagination = (fetchFunction, initialParams = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Load first page or refresh
  const loadInitial = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      setItems([]);
      setCurrentPage(1);
      
      const result = await fetchFunction({ ...initialParams, ...params, page: 1 });
      
      setItems(result.data || result.events || []);
      setNextPageUrl(result.pages?.next || null);
      setHasMore(!!result.pages?.next);
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, initialParams]);

 
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      setError(null);
      
      const nextPage = currentPage + 1;
      const result = await fetchFunction({ ...initialParams, page: nextPage });
      
      // Append new items to existing ones
      setItems(prevItems => [...prevItems, ...(result.data || result.events || [])]);
      setNextPageUrl(result.pages?.next || null);
      setHasMore(!!result.pages?.next);
      setCurrentPage(nextPage);
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, initialParams, hasMore, loading, currentPage]);

  // Reset pagination
  const reset = useCallback(() => {
    setItems([]);
    setError(null);
    setLoading(false);
    setHasMore(true);
    setNextPageUrl(null);
    setCurrentPage(1);
  }, []);

  return {
    items,
    loading,
    error,
    hasMore,
    currentPage,
    loadInitial,
    loadMore,
    reset
  };
};