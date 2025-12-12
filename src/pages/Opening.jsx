import { useState, useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useMusic } from '../hooks/useMusic';
import { STAR_STYLES, PETAL_STYLES } from '../utils/randomStyles';
import './Opening.css';

export default function Opening() {
  const [phase, setPhase] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const { goToNext } = useNavigation();
  const { play } = useMusic();

  useEffect(() => {
    const timers = [];
    
    timers.push(setTimeout(() => setPhase(1), 500));
    timers.push(setTimeout(() => setPhase(2), 2000));
    timers.push(setTimeout(() => setPhase(3), 3500));
    timers.push(setTimeout(() => setShowEnter(true), 5000));
    
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleEnter = () => {
    play();
    goToNext();
  };

  return (
    <div className="opening-page">
      <div className="stars-container">
        {STAR_STYLES.map((style, i) => (
          <div 
            key={i} 
            className="star"
            style={{
              left: style.left,
              top: style.top,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration
            }}
          />
        ))}
      </div>
      
      <div className="opening-content">
        <div className={`text-line ${phase >= 1 ? 'visible' : ''}`}>
          <span className="korean-text">안녕하세요</span>
        </div>
        
        <div className={`text-line ${phase >= 2 ? 'visible' : ''}`}>
          <span className="teacher-name">전지은 선생님</span>
        </div>
        
        <div className={`text-line subtitle ${phase >= 3 ? 'visible' : ''}`}>
          <span>I made something special for you...</span>
        </div>
        
        <button 
          className={`enter-button ${showEnter ? 'visible' : ''}`}
          onClick={handleEnter}
        >
          <span className="button-text">시작하기</span>
          <span className="button-subtext">Click to Begin</span>
        </button>
      </div>
      
      <div className="floating-petals">
        {PETAL_STYLES.map((style, i) => (
          <div 
            key={i}
            className="petal"
            style={{
              left: style.left,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration
            }}
          />
        ))}
      </div>
    </div>
  );
}
