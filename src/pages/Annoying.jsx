import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import './Annoying.css';

// Generate random positions outside component to avoid purity issues
const generateHearts = () =>
  Array.from({ length: 15 }, () => ({
    left: Math.random() * 100,
    animationDelay: Math.random() * 3,
    animationDuration: 3 + Math.random() * 2
  }));

const HEARTS = generateHearts();

const generateConfetti = () =>
  Array.from({ length: 50 }, () => ({
    left: Math.random() * 100,
    animationDelay: Math.random() * 2,
    animationDuration: 2 + Math.random() * 2,
    background: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd93d', '#95e1d3'][Math.floor(Math.random() * 5)]
  }));

const CONFETTI = generateConfetti();

export default function Annoying() {
  const [layer, setLayer] = useState(0); // 0: large box, 1: medium box, 2: small box, 3: message revealed
  const [buttonPos, setButtonPos] = useState({ x: 50, y: 50 });
  const [attempts, setAttempts] = useState(0);
  const [canClick, setCanClick] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const buttonRef = useRef(null);
  const { goToNext } = useNavigation();

  useEffect(() => {
    // Initialize button position randomly - only on layer change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setButtonPos({
      x: 30 + Math.random() * 40,
      y: 60 + Math.random() * 20
    });
  }, [layer]);

  const openBox = () => {
    if (layer < 3) {
      setLayer(layer + 1);
      
      // After opening last box, show confetti and button
      if (layer === 2) {
        setShowConfetti(true);
        // Reset attempts for the escaping button game
        setAttempts(0);
      }
    }
  };

  const moveButton = () => {
    if (canClick) return;
    
    setAttempts(prev => prev + 1);
    
    // After 7 attempts, make it catchable
    if (attempts >= 6) {
      setCanClick(true);
      return;
    }
    
    // Move to random position
    const newX = 20 + Math.random() * 60;
    const newY = 50 + Math.random() * 30;
    setButtonPos({ x: newX, y: newY });
  };

  const handleNextClick = () => {
    if (canClick) {
      goToNext();
    }
  };

  return (
    <div className="annoying-page">
      {/* Background decoration */}
      <div className="floating-hearts">
        {HEARTS.map((heart, i) => (
          <div 
            key={i}
            className="heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.animationDelay}s`,
              animationDuration: `${heart.animationDuration}s`
            }}
          >
            💝
          </div>
        ))}
      </div>

      <div className="annoying-content">
        {/* Gift boxes - Layer 0: Large Box */}
        {layer === 0 && (
          <div className="gift-box-container" onClick={openBox}>
            <div className="gift-box large-box">
              <div className="box-ribbon horizontal"></div>
              <div className="box-ribbon vertical"></div>
              <div className="box-bow">🎀</div>
            </div>
            <p className="box-instruction">Open your gift! 🎁</p>
          </div>
        )}

        {/* Layer 1: Medium Box */}
        {layer === 1 && (
          <div className="gift-box-container animate-in">
            <div className="surprise-emoji">🌟</div>
            <div className="gift-box medium-box" onClick={openBox}>
              <div className="box-ribbon horizontal"></div>
              <div className="box-ribbon vertical"></div>
              <div className="box-bow">🎀</div>
            </div>
            <p className="box-instruction">Another one! Keep going! ✨</p>
          </div>
        )}

        {/* Layer 2: Small Box */}
        {layer === 2 && (
          <div className="gift-box-container animate-in">
            <div className="surprise-emoji">💝</div>
            <div className="gift-box small-box" onClick={openBox}>
              <div className="box-ribbon horizontal"></div>
              <div className="box-ribbon vertical"></div>
              <div className="box-bow">🎀</div>
            </div>
            <p className="box-instruction">One more! You're close! 🎉</p>
          </div>
        )}

        {/* Layer 3: Final Message */}
        {layer === 3 && (
          <div className="final-message animate-in">
            <div className="message-card">
              <h1 className="congrats-title">🎉 축하해요! 🎉</h1>
              <p className="congrats-subtitle">You found the treasure!</p>
              <div className="message-content">
                <p>Just like these layers of gifts,</p>
                <p>전지은 선생님 has layers of kindness,</p>
                <p>patience, and love for teaching! 💕</p>
              </div>
            </div>

            {/* Escaping Next Button */}
            <button
              ref={buttonRef}
              className={`escaping-button ${canClick ? 'catchable' : ''}`}
              style={{
                left: `${buttonPos.x}%`,
                top: `${buttonPos.y}%`,
              }}
              onMouseEnter={!canClick ? moveButton : undefined}
              onTouchStart={!canClick ? moveButton : undefined}
              onClick={handleNextClick}
            >
              {canClick ? '✅ Click Me!' : 'Next →'}
            </button>

            {attempts > 2 && !canClick && (
              <p className="escape-hint">
                {attempts < 5 ? '😏 Try to catch me!' : '🤪 Keep trying! Almost there!'}
              </p>
            )}
          </div>
        )}

        {/* Confetti effect */}
        {showConfetti && (
          <div className="confetti-container">
            {CONFETTI.map((confetti, i) => (
              <div 
                key={i}
                className="confetti"
                style={{
                  left: `${confetti.left}%`,
                  animationDelay: `${confetti.animationDelay}s`,
                  animationDuration: `${confetti.animationDuration}s`,
                  background: confetti.background
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
