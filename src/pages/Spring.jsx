import { useState, useRef, useEffect, useCallback } from 'react';
import { PETAL_STYLES } from '../utils/randomStyles';
import './Spring.css';

export default function Spring() {
  const [isWatering, setIsWatering] = useState(false);
  const [bloomProgress, setBloomProgress] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [canPosition, setCanPosition] = useState({ x: 50, y: 50 });
  const [isTilted, setIsTilted] = useState(false);
  const wateringCanRef = useRef(null);
  const treeRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (bloomProgress === 12) {
      setTimeout(() => setShowCompletion(true), 500);
    }
  }, [bloomProgress]);

  const handleMouseDown = (e) => {
    if (!isWatering && wateringCanRef.current) {
      setIsDragging(true);
      const rect = wateringCanRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleTouchStart = (e) => {
    if (!isWatering && wateringCanRef.current) {
      setIsDragging(true);
      const touch = e.touches[0];
      const rect = wateringCanRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }
  };

  const handleMouseMove = useCallback((e) => {
    setCanPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y
    });
  }, []);

  const handleTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    setCanPosition({
      x: touch.clientX - dragOffset.current.x,
      y: touch.clientY - dragOffset.current.y
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    if (treeRef.current && wateringCanRef.current) {
      const treeRect = treeRef.current.getBoundingClientRect();
      const canRect = wateringCanRef.current.getBoundingClientRect();
      
      const overlapX = canRect.left < treeRect.right && canRect.right > treeRect.left;
      const overlapY = canRect.top < treeRect.bottom && canRect.bottom > treeRect.top;
      
      if (overlapX && overlapY && !isWatering) {
        setIsWatering(true);
        setIsTilted(true);
        
        // Start blooming animation
        const bloomInterval = setInterval(() => {
          setBloomProgress(prev => {
            if (prev >= 12) {
              clearInterval(bloomInterval);
              return 12;
            }
            return prev + 1;
          });
        }, 150);
      }
    }
    setIsDragging(false);
  }, [isWatering]);

  const handleTouchEnd = useCallback(() => {
    if (treeRef.current && wateringCanRef.current) {
      const treeRect = treeRef.current.getBoundingClientRect();
      const canRect = wateringCanRef.current.getBoundingClientRect();
      
      const overlapX = canRect.left < treeRect.right && canRect.right > treeRect.left;
      const overlapY = canRect.top < treeRect.bottom && canRect.bottom > treeRect.top;
      
      if (overlapX && overlapY && !isWatering) {
        setIsWatering(true);
        setIsTilted(true);
        
        // Start blooming animation
        const bloomInterval = setInterval(() => {
          setBloomProgress(prev => {
            if (prev >= 12) {
              clearInterval(bloomInterval);
              return 12;
            }
            return prev + 1;
          });
        }, 150);
      }
    }
    setIsDragging(false);
  }, [isWatering]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="spring-page">
      {/* Floating petals after blooming */}
      {bloomProgress > 8 && (
        <div className="cherry-blossoms">
          {PETAL_STYLES.map((style, i) => (
            <div 
              key={i}
              className="blossom"
              style={{
                left: style.left,
                animationDelay: style.animationDelay,
                animationDuration: style.animationDuration
              }}
            />
          ))}
        </div>
      )}

      <div className="spring-content">
        {!isWatering && !showCompletion && (
          <div className="spring-hint">
            <p className="hint-korean">물을 주세요...</p>
            <p className="hint-english">Help the sakura bloom! 🌸</p>
          </div>
        )}

        {/* Cherry Tree */}
        <div className="tree-container" ref={treeRef}>
          <svg className="cherry-tree" viewBox="0 0 300 350" width="300" height="350">
            {/* Tree trunk */}
            <rect x="140" y="200" width="20" height="150" fill="#8B4513" />
            
            {/* Tree branches */}
            <path d="M 150 220 Q 100 200 70 180" stroke="#8B4513" strokeWidth="4" fill="none" />
            <path d="M 150 220 Q 200 200 230 180" stroke="#8B4513" strokeWidth="4" fill="none" />
            <path d="M 150 200 Q 120 170 90 150" stroke="#8B4513" strokeWidth="3" fill="none" />
            <path d="M 150 200 Q 180 170 210 150" stroke="#8B4513" strokeWidth="3" fill="none" />
            <path d="M 150 180 Q 110 150 80 120" stroke="#8B4513" strokeWidth="2" fill="none" />
            <path d="M 150 180 Q 190 150 220 120" stroke="#8B4513" strokeWidth="2" fill="none" />

            {/* Blossoms */}
            {bloomProgress > 0 && <circle cx="70" cy="180" r="8" fill="#ffb7c5" className="bloom" style={{ animationDelay: '0s' }} />}
            {bloomProgress > 1 && <circle cx="90" cy="150" r="8" fill="#ffc0cb" className="bloom" style={{ animationDelay: '0.1s' }} />}
            {bloomProgress > 2 && <circle cx="230" cy="180" r="8" fill="#ffb7c5" className="bloom" style={{ animationDelay: '0.2s' }} />}
            {bloomProgress > 3 && <circle cx="210" cy="150" r="8" fill="#ffc0cb" className="bloom" style={{ animationDelay: '0.3s' }} />}
            {bloomProgress > 4 && <circle cx="80" cy="120" r="8" fill="#ffb7c5" className="bloom" style={{ animationDelay: '0.4s' }} />}
            {bloomProgress > 5 && <circle cx="220" cy="120" r="8" fill="#ffc0cb" className="bloom" style={{ animationDelay: '0.5s' }} />}
            {bloomProgress > 6 && <circle cx="95" cy="165" r="7" fill="#ffb7c5" className="bloom" style={{ animationDelay: '0.6s' }} />}
            {bloomProgress > 7 && <circle cx="205" cy="165" r="7" fill="#ffc0cb" className="bloom" style={{ animationDelay: '0.7s' }} />}
            {bloomProgress > 8 && <circle cx="110" cy="140" r="7" fill="#ffb7c5" className="bloom" style={{ animationDelay: '0.8s' }} />}
            {bloomProgress > 9 && <circle cx="190" cy="140" r="7" fill="#ffc0cb" className="bloom" style={{ animationDelay: '0.9s' }} />}
            {bloomProgress > 10 && <circle cx="120" cy="125" r="6" fill="#ffb7c5" className="bloom" style={{ animationDelay: '1s' }} />}
            {bloomProgress > 11 && <circle cx="180" cy="125" r="6" fill="#ffc0cb" className="bloom" style={{ animationDelay: '1.1s' }} />}
          </svg>
        </div>

        {/* Watering Can */}
        <div 
          ref={wateringCanRef}
          className={`watering-can ${isDragging ? 'dragging' : ''} ${isTilted ? 'tilted' : ''}`}
          style={{
            left: `${canPosition.x}px`,
            top: `${canPosition.y}px`,
            position: 'absolute',
            cursor: isWatering ? 'default' : (isDragging ? 'grabbing' : 'grab')
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <svg width="60" height="50" viewBox="0 0 60 50">
            {/* Can body */}
            <ellipse cx="25" cy="35" rx="18" ry="12" fill="#4a9eff" />
            <rect x="7" y="20" width="36" height="15" fill="#5badff" />
            <ellipse cx="25" cy="20" rx="18" ry="12" fill="#6dc0ff" />
            
            {/* Handle */}
            <path d="M 43 25 Q 48 25 48 30 Q 48 35 43 35" stroke="#4a9eff" strokeWidth="3" fill="none" />
            
            {/* Spout */}
            <path d="M 7 28 L -5 28 L -8 25 L -5 22 L 7 22 Z" fill="#4a9eff" />
            
            {/* Water drops when tilted */}
            {isTilted && (
              <>
                <circle cx="-10" cy="30" r="2" fill="#4dd0e1" className="water-drop" style={{ animationDelay: '0s' }} />
                <circle cx="-12" cy="35" r="2" fill="#4dd0e1" className="water-drop" style={{ animationDelay: '0.2s' }} />
                <circle cx="-8" cy="33" r="2" fill="#4dd0e1" className="water-drop" style={{ animationDelay: '0.4s' }} />
              </>
            )}
          </svg>
        </div>

        {/* Completion Message */}
        {showCompletion && (
          <div className="completion-message">
            <h2 className="completion-korean">봄이 왔어요!</h2>
            <p className="completion-english">Spring has come!</p>
            <p className="completion-text">
              Like spring brings new life to nature, our teacher brings joy and happiness to our learning journey 🌸
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
