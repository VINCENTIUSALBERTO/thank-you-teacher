import { useState } from 'react';
import { FLOATING_STAR_STYLES } from '../utils/randomStyles';
import './Prayer.css';

const prayers = [
  { korean: "건강하세요", english: "Be healthy" },
  { korean: "행복하세요", english: "Be happy" },
  { korean: "사랑받으세요", english: "Be loved" },
  { korean: "평안하세요", english: "Be peaceful" },
  { korean: "축복받으세요", english: "Be blessed" },
  { korean: "웃음 가득하세요", english: "Be full of laughter" },
  { korean: "꿈이 이루어지세요", english: "May your dreams come true" }
];

export default function Prayer() {
  const [litCandles, setLitCandles] = useState([]);
  const [showFinalBlessing, setShowFinalBlessing] = useState(false);

  const lightCandle = (index) => {
    if (!litCandles.includes(index)) {
      setLitCandles(prev => {
        const newLit = [...prev, index];
        if (newLit.length === prayers.length) {
          setTimeout(() => setShowFinalBlessing(true), 500);
        }
        return newLit;
      });
    }
  };

  const brightness = Math.min(litCandles.length * 15, 100);

  return (
    <div 
      className="prayer-page"
      style={{
        background: `linear-gradient(180deg, 
          hsl(220, 30%, ${10 + brightness * 0.1}%) 0%, 
          hsl(220, 35%, ${15 + brightness * 0.15}%) 50%, 
          hsl(220, 40%, ${20 + brightness * 0.2}%) 100%)`
      }}
    >
      <div className="prayer-content">
        {litCandles.length === 0 && (
          <div className="prayer-hint">
            <p className="hint-korean">촛불을 켜주세요</p>
            <p className="hint-english">Light the candles 🕯️</p>
          </div>
        )}

        <h1 className="prayer-title">
          <span className="emoji">🙏</span>
          <span className="korean">기도</span>
          <span className="english">Prayers & Blessings</span>
        </h1>

        <p className="prayer-intro">
          선생님을 위한 진심 어린 기도입니다
          <br /><span className="intro-trans">(Heartfelt prayers for you, Teacher)</span>
        </p>

        {/* Candles */}
        <div className="candles-container">
          {prayers.map((prayer, index) => (
            <div key={index} className="candle-wrapper">
              <div 
                className={`candle ${litCandles.includes(index) ? 'lit' : ''}`}
                onClick={() => lightCandle(index)}
                style={{ cursor: litCandles.includes(index) ? 'default' : 'pointer' }}
              >
                {litCandles.includes(index) && (
                  <div className="flame">
                    <div className="flame-inner"></div>
                  </div>
                )}
                <div className="candle-body"></div>
                <div className="candle-base"></div>
              </div>
              
              {litCandles.includes(index) && (
                <div className="prayer-bubble">
                  <p className="korean-prayer">{prayer.korean}</p>
                  <p className="english-prayer">{prayer.english}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final Blessing */}
        {showFinalBlessing && (
          <div className="final-blessing">
            <div className="blessing-glow"></div>
            <p className="blessing-text">
              🕊️ 선생님을 위한 기도 🕊️
            </p>
            <p className="blessing-sub">
              Prayers for Teacher
            </p>
            <p className="blessing-message">
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

      {litCandles.length > 0 && (
        <div className="warm-glow" style={{ opacity: brightness / 100 }}></div>
      )}
    </div>
  );
}
