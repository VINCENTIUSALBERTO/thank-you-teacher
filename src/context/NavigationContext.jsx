import { createContext, useState, useCallback } from 'react';
import { PAGES } from '../constants/pages';

export const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (currentPage < PAGES.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsTransitioning(false);
      }, 500);
    }
  }, [currentPage, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (currentPage > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsTransitioning(false);
      }, 500);
    }
  }, [currentPage, isTransitioning]);

  const goToPage = useCallback((pageIndex) => {
    if (pageIndex >= 0 && pageIndex < PAGES.length && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsTransitioning(false);
      }, 500);
    }
  }, [isTransitioning]);

  return (
    <NavigationContext.Provider value={{
      currentPage,
      currentPageName: PAGES[currentPage],
      totalPages: PAGES.length,
      goToNext,
      goToPrevious,
      goToPage,
      isTransitioning,
      isFirstPage: currentPage === 0,
      isLastPage: currentPage === PAGES.length - 1
    }}>
      {children}
    </NavigationContext.Provider>
  );
}
