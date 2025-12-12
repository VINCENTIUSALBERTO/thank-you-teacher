import { useNavigation } from '../hooks/useNavigation';
import './NavigationArrows.css';

export default function NavigationArrows() {
  const { goToNext, goToPrevious, isFirstPage, isLastPage, currentPage, totalPages } = useNavigation();

  return (
    <div className="navigation-arrows">
      <button 
        className={`nav-arrow nav-arrow-left ${isFirstPage ? 'hidden' : ''}`}
        onClick={goToPrevious}
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>
      
      <div className="page-indicator">
        {currentPage + 1} / {totalPages}
      </div>
      
      <button 
        className={`nav-arrow nav-arrow-right ${isLastPage ? 'hidden' : ''}`}
        onClick={goToNext}
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,6 15,12 9,18" />
        </svg>
      </button>
    </div>
  );
}
