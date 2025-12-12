import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useMusic } from '../hooks/useMusic';
import './Opening.css';

// Generate random stars outside component to avoid purity issues
const generateStars = () => 
  Array.from({ length: 50 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 2,
    animationDuration: 2 + Math.random() * 2
  }));

const STARS = generateStars();

// Generate sparkles
const generateSparkles = () =>
  Array.from({ length: 20 }, () => ({
    left: 45 + Math.random() * 10,
    animationDelay: Math.random() * 0.5
  }));

const SPARKLES = generateSparkles();

export default function Opening() {
  const [gameState, setGameState] = useState('initial'); // initial, playing, unlocking, completed
  const [keyFound, setKeyFound] = useState(false);
  const [keyPosition, setKeyPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const keyRef = useRef(null);
  const chestRef = useRef(null);
  const { goToNext } = useNavigation();
  const { play } = useMusic();

  useEffect(() => {
    // Position key randomly on the screen (hidden but findable) - only on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKeyPosition({
      x: 20 + Math.random() * 60,
      y: 15 + Math.random() * 70
    });

    // Show the game after a brief delay
    const timer = setTimeout(() => setGameState('playing'), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (e) => {
    if (gameState !== 'playing') return;
    e.preventDefault();
    setIsDragging(true);
    setKeyFound(true);
    
    const keyElement = keyRef.current;
    const rect = keyElement.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleTouchStart = (e) => {
    if (gameState !== 'playing') return;
    e.preventDefault();
    setIsDragging(true);
    setKeyFound(true);
    
    const touch = e.touches[0];
    const keyElement = keyRef.current;
    const rect = keyElement.getBoundingClientRect();
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
  };

  const unlockChest = useCallback(() => {
    setGameState('unlocking');
    
    // Play unlock animation sequence
    setTimeout(() => {
      setGameState('completed');
      play(); // Start music
    }, 2000);

    // Navigate to next page after animations complete
    setTimeout(() => {
      goToNext();
    }, 4000);
  }, [play, goToNext]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = ((e.clientX - dragOffset.x) / window.innerWidth) * 100;
    const y = ((e.clientY - dragOffset.y) / window.innerHeight) * 100;
    setKeyPosition({ x, y });
  }, [isDragging, dragOffset]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const x = ((touch.clientX - dragOffset.x) / window.innerWidth) * 100;
    const y = ((touch.clientY - dragOffset.y) / window.innerHeight) * 100;
    setKeyPosition({ x, y });
  }, [isDragging, dragOffset]);

  const checkKeyDropOnChest = useCallback((clientX, clientY) => {
    if (!chestRef.current) return;
    
    const chestRect = chestRef.current.getBoundingClientRect();
    
    // Check if key is dropped on chest
    if (
      clientX >= chestRect.left &&
      clientX <= chestRect.right &&
      clientY >= chestRect.top &&
      clientY <= chestRect.bottom
    ) {
      // Key successfully dropped on chest!
      unlockChest();
    }
  }, [unlockChest]);

  const handleMouseUp = useCallback((e) => {
    if (!isDragging) return;
    setIsDragging(false);
    checkKeyDropOnChest(e.clientX, e.clientY);
  }, [isDragging, checkKeyDropOnChest]);

  const handleTouchEnd = useCallback((e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const touch = e.changedTouches[0];
    checkKeyDropOnChest(touch.clientX, touch.clientY);
  }, [isDragging, checkKeyDropOnChest]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // passive: false is required to call preventDefault() and prevent page scroll during drag
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="opening-page">
      {/* Background stars */}
      <div className="stars-container">
        {STARS.map((star, i) => (
          <div 
            key={i} 
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="opening-content">
        {gameState === 'playing' && (
          <div className="hint-text">
            <span className="korean-hint">찾아보세요...</span>
            <span className="english-hint">(Find the key...)</span>
          </div>
        )}

        {/* Treasure Chest */}
        <div 
          ref={chestRef}
          className={`treasure-chest ${gameState === 'unlocking' ? 'unlocking' : ''} ${gameState === 'completed' ? 'opened' : ''}`}
        >
          <div className="chest-body">
            <div className="chest-lock">🔒</div>
          </div>
          <div className="chest-lid"></div>
          
          {/* Light effect when opened */}
          {gameState === 'completed' && (
            <div className="chest-light">
              <div className="light-rays"></div>
            </div>
          )}
        </div>

        {/* Sparkle particles when chest opens */}
        {gameState === 'completed' && (
          <div className="sparkles-container">
            {SPARKLES.map((sparkle, i) => (
              <div 
                key={i} 
                className="sparkle"
                style={{
                  left: `${sparkle.left}%`,
                  animationDelay: `${sparkle.animationDelay}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Hidden Key */}
        {gameState !== 'unlocking' && gameState !== 'completed' && (
          <div
            ref={keyRef}
            className={`hidden-key ${keyFound ? 'found' : ''} ${isDragging ? 'dragging' : ''}`}
            style={{
              left: `${keyPosition.x}%`,
              top: `${keyPosition.y}%`,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            🔑
          </div>
        )}
      </div>
    </div>
  );
}
