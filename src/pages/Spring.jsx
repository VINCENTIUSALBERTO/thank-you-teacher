import { useState } from 'react';
import { BLOSSOM_STYLES } from '../utils/randomStyles';
import './Spring.css';

const springMessages = [
  "🌸 Like cherry blossoms in spring, your teaching brings new beginnings!",
  "봄처럼 따뜻한 선생님! (Teacher as warm as spring!)",
  "Every lesson with you is a fresh start 🌷"
];

export default function Spring() {
  const [openFlower, setOpenFlower] = useState(null);

  return (
    <div className="spring-page">
      <div className="cherry-blossoms">
        {BLOSSOM_STYLES.map((style, i) => (
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

      <div className="spring-content">
        <h1 className="season-title">
          <span className="korean">봄</span>
          <span className="english">Spring in Korea</span>
        </h1>

        <p className="season-desc">
          Spring (3월-5월) is the season of cherry blossoms (벚꽃).
          Click the flowers to reveal special messages!
        </p>

        <div className="flowers-container">
          {springMessages.map((message, index) => (
            <div 
              key={index}
              className={`flower-box ${openFlower === index ? 'open' : ''}`}
              onClick={() => setOpenFlower(openFlower === index ? null : index)}
            >
              <div className="flower-front">
                <span className="flower-emoji">🌸</span>
                <span className="flower-text">Click me!</span>
              </div>
              <div className="flower-back">
                <p className="flower-message">{message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="spring-places">
          <h3>🌸 Best Cherry Blossom Spots</h3>
          <div className="places-list">
            <span className="place-tag">Yeouido, Seoul</span>
            <span className="place-tag">Jinhae, Changwon</span>
            <span className="place-tag">Gyeongju</span>
            <span className="place-tag">Seokchon Lake</span>
          </div>
        </div>
      </div>
    </div>
  );
}
