import { useState, useRef } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import './Annoying.css';

export default function Annoying() {
  const [buttonPos, setButtonPos] = useState({ x: 50, y: 50 });
  const [attempts, setAttempts] = useState(0);
  const [caught, setCaught] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const buttonRef = useRef(null);
  const { goToNext } = useNavigation();

  const moveButton = () => {
    if (caught) return;
    
    setAttempts(prev => prev + 1);
    
    // After 10 attempts, make it catchable
    if (attempts >= 9) {
      setCaught(true);
      setShowMessage(true);
      return;
    }
    
    // Move to random position
    const newX = 10 + Math.random() * 80;
    const newY = 20 + Math.random() * 60;
    setButtonPos({ x: newX, y: newY });
  };

  const handleClick = () => {
    if (caught) {
      goToNext();
    }
  };

  return (
    <div className="annoying-page">
      <div className="annoying-content">
        <h1 className="annoying-title">
          <span className="emoji">😈</span>
          <span>A Little Game...</span>
        </h1>
        
        <p className="annoying-desc">
          Try to click the button below... if you can! 😏
        </p>

        <div className="attempts-counter">
          Attempts: {attempts}
        </div>

        <button
          ref={buttonRef}
          className={`escaping-button ${caught ? 'caught' : ''}`}
          style={{
            left: `${buttonPos.x}%`,
            top: `${buttonPos.y}%`,
          }}
          onMouseEnter={!caught ? moveButton : undefined}
          onClick={handleClick}
        >
          {caught ? '✅ You got me!' : 'Click me!'}
        </button>

        {showMessage && (
          <div className="success-message">
            <p>🎉 축하해요! (Congratulations!)</p>
            <p className="sub-message">
              You're persistent! Just like how 전지은 선생님 
              is patient with teaching us!
            </p>
            <p className="hint">Click the button to continue →</p>
          </div>
        )}

        {!caught && attempts > 3 && (
          <div className="hint-text">
            <p>Hint: Keep trying! 화이팅! 💪</p>
          </div>
        )}
      </div>

      <div className="floating-emojis">
        {['😝', '🤪', '😜', '🙃', '😏'].map((emoji, i) => (
          <span 
            key={i} 
            className="floating-emoji"
            style={{
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
