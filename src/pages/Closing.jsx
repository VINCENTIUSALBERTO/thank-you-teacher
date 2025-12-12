import { useState, useEffect } from 'react';
import { HEART_STYLES, SPARKLE_STYLES } from '../utils/randomStyles';
import './Closing.css';

export default function Closing() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), 500));
    timers.push(setTimeout(() => setPhase(2), 2500));
    timers.push(setTimeout(() => setPhase(3), 4500));
    timers.push(setTimeout(() => setPhase(4), 6500));
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="closing-page">
      <div className="hearts-bg">
        {HEART_STYLES.map((style, i) => (
          <span 
            key={i}
            className="floating-heart"
            style={{
              left: style.left,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration,
              fontSize: style.fontSize
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <div className="closing-content">
        <div className={`closing-text ${phase >= 1 ? 'visible' : ''}`}>
          <p className="korean-quote">
            "좋은 선생님은 평생 기억됩니다"
          </p>
          <p className="english-quote">
            "A good teacher is remembered for a lifetime"
          </p>
        </div>

        <div className={`teacher-message ${phase >= 2 ? 'visible' : ''}`}>
          <h2>전지은 선생님께</h2>
          <p>
            Thank you for being more than just a teacher.
            <br />You taught us not only Korean language,
            <br />but also patience, dedication, and kindness.
          </p>
        </div>

        <div className={`final-thanks ${phase >= 3 ? 'visible' : ''}`}>
          <div className="thanks-korean">
            정말 감사합니다!
          </div>
          <div className="thanks-english">
            Thank you so much, Teacher!
          </div>
        </div>

        <div className={`signature ${phase >= 4 ? 'visible' : ''}`}>
          <p className="from">With love and gratitude,</p>
          <p className="name">Your Student ❤️</p>
          <div className="final-bow">
            <span className="bow-emoji">🙇</span>
            <span className="bow-text">감사합니다, 선생님!</span>
          </div>
        </div>
      </div>

      <div className={`sparkles ${phase >= 4 ? 'visible' : ''}`}>
        {SPARKLE_STYLES.map((style, i) => (
          <span 
            key={i}
            className="sparkle"
            style={{
              left: style.left,
              top: style.top,
              animationDelay: style.animationDelay
            }}
          >
            ✨
          </span>
        ))}
      </div>
    </div>
  );
}
