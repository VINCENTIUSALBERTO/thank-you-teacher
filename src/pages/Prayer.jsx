import { useState, useEffect } from 'react';
import { FLOATING_STAR_STYLES } from '../utils/randomStyles';
import './Prayer.css';

const prayers = [
  {
    korean: "선생님의 앞날에 행복이 가득하길 바랍니다",
    english: "May your future be filled with happiness"
  },
  {
    korean: "항상 건강하시고 웃음이 끊이지 않길 바랍니다",
    english: "May you always be healthy and never stop smiling"
  },
  {
    korean: "선생님의 꿈이 모두 이루어지길 바랍니다",
    english: "May all your dreams come true"
  },
  {
    korean: "가르침에 대한 열정이 영원히 불타오르길",
    english: "May your passion for teaching burn forever"
  },
  {
    korean: "선생님을 통해 많은 학생들이 한국어를 사랑하게 되길",
    english: "May many students fall in love with Korean through you"
  }
];

export default function Prayer() {
  const [visiblePrayers, setVisiblePrayers] = useState([]);
  const [showBlessings, setShowBlessings] = useState(false);

  useEffect(() => {
    prayers.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePrayers(prev => [...prev, index]);
      }, 500 * (index + 1));
    });
    
    setTimeout(() => setShowBlessings(true), 500 * prayers.length + 500);
  }, []);

  return (
    <div className="prayer-page">
      <div className="candles">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="candle" style={{ left: `${10 + i * 13}%` }}>
            <div className="flame">
              <div className="flame-inner"></div>
            </div>
            <div className="candle-body"></div>
          </div>
        ))}
      </div>

      <div className="prayer-content">
        <h1 className="prayer-title">
          <span className="emoji">🙏</span>
          <span className="korean">기도</span>
          <span className="english">Prayers & Blessings</span>
        </h1>

        <p className="prayer-intro">
          선생님을 위한 진심 어린 기도입니다
          <br /><span className="intro-trans">(Heartfelt prayers for you, Teacher)</span>
        </p>

        <div className="prayers-list">
          {prayers.map((prayer, index) => (
            <div 
              key={index}
              className={`prayer-item ${visiblePrayers.includes(index) ? 'visible' : ''}`}
            >
              <span className="prayer-star">⭐</span>
              <div className="prayer-text">
                <p className="korean-prayer">{prayer.korean}</p>
                <p className="english-prayer">{prayer.english}</p>
              </div>
            </div>
          ))}
        </div>

        {showBlessings && (
          <div className="final-blessing">
            <p className="blessing-text">
              🕊️ God bless you, 전지은 선생님 🕊️
            </p>
            <p className="blessing-sub">
              하나님이 선생님을 축복하시길
            </p>
          </div>
        )}
      </div>

      <div className="floating-stars">
        {FLOATING_STAR_STYLES.map((style, i) => (
          <span 
            key={i}
            className="floating-star"
            style={{
              left: style.left,
              top: style.top,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration
            }}
          >
            ✨
          </span>
        ))}
      </div>
    </div>
  );
}
