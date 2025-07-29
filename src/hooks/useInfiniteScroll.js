import { useEffect, useCallback, useRef } from 'react';

export const useInfiniteScroll = (loadMore, hasMore, loading) => {
  const observerRef = useRef();
  const loadMoreRef = useRef(loadMore);
  const hasMoreRef = useRef(hasMore);
  const loadingRef = useRef(loading);

  // Update refs
  loadMoreRef.current = loadMore;
  hasMoreRef.current = hasMore;
  loadingRef.current = loading;

  const lastElementRef = useCallback((node) => {
    if (loadingRef.current) return;
    
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMoreRef.current && !loadingRef.current) {
        loadMoreRef.current();
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px'
    });
    
    if (node) observerRef.current.observe(node);
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return lastElementRef;
};