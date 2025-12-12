import { useState, useEffect, useRef } from 'react';
import { SNOWFLAKE_STYLES } from '../utils/randomStyles';
import './Winter.css';

const gifts = [
  { 
    id: 1, 
    message: "🎁 Thank you for teaching us Korean!", 
    korean: "한국어를 가르쳐 주셔서 감사합니다!" 
  },
  { 
    id: 2, 
    message: "🌟 You make learning fun!", 
    korean: "선생님 덕분에 공부가 즐거워요!" 
  },
  { 
    id: 3, 
    message: "❤️ Best teacher ever!", 
    korean: "최고의 선생님이에요!" 
  }
];

export default function Winter() {
  const [openedGifts, setOpenedGifts] = useState([]);
  const [currentGiftMessage, setCurrentGiftMessage] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const openGift = (gift) => {
    if (!openedGifts.includes(gift.id)) {
      setOpenedGifts([...openedGifts, gift.id]);
      setCurrentGiftMessage(gift);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setCurrentGiftMessage(null), 3000);
    }
  };

  return (
    <div className="winter-page">
      <div className="snowflakes">
        {SNOWFLAKE_STYLES.map((style, i) => (
          <div 
            key={i}
            className="snowflake"
            style={{
              left: style.left,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration,
              fontSize: style.fontSize
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <div className="winter-content">
        <h1 className="season-title">
          <span className="korean">겨울</span>
          <span className="english">Winter & Christmas in Korea</span>
        </h1>

        <p className="season-desc">
          Winter (12월-2월) brings snow and celebrations! ❄️
          <br />Click the gifts to open special messages!
        </p>

        <div className="gifts-container">
          {gifts.map((gift) => (
            <div 
              key={gift.id}
              className={`gift-box ${openedGifts.includes(gift.id) ? 'opened' : ''}`}
              onClick={() => openGift(gift)}
            >
              <div className="gift-lid">
                <div className="gift-bow"></div>
              </div>
              <div className="gift-body">
                {openedGifts.includes(gift.id) ? '✨' : '?'}
              </div>
            </div>
          ))}
        </div>

        {currentGiftMessage && (
          <div className="gift-message-popup">
            <p className="gift-message-english">{currentGiftMessage.message}</p>
            <p className="gift-message-korean">{currentGiftMessage.korean}</p>
          </div>
        )}

        <div className="winter-activities">
          <h3>⛄ Winter Activities in Korea</h3>
          <div className="activities-tags">
            <span>🎿 Ski Resorts</span>
            <span>🎄 Christmas Markets</span>
            <span>🍲 Hot Korean Stew</span>
            <span>♨️ Hot Springs</span>
          </div>
        </div>

        <div className="winter-quote">
          <p>❄️ 따뜻한 마음을 가진 선생님!</p>
          <p className="quote-trans">(A teacher with a warm heart!)</p>
        </div>
      </div>
    </div>
  );
}
