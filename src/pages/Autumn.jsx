import { useState } from 'react';
import { LEAF_STYLES } from '../utils/randomStyles';
import './Autumn.css';

const autumnHighlights = [
  { emoji: '🍂', title: 'Fall Foliage', place: 'Nami Island, Seoraksan' },
  { emoji: '🌰', title: 'Harvest Season', place: 'Traditional markets everywhere!' },
  { emoji: '🎑', title: 'Chuseok', place: 'Korean Thanksgiving festival' },
  { emoji: '🍁', title: 'Perfect Weather', place: 'Best time to travel!' }
];

export default function Autumn() {
  const [hoveredLeaf, setHoveredLeaf] = useState(null);

  return (
    <div className="autumn-page">
      <div className="falling-leaves">
        {LEAF_STYLES.map((style, i) => (
          <div 
            key={i}
            className={`leaf leaf-${(i % 3) + 1}`}
            style={{
              left: style.left,
              animationDelay: style.animationDelay,
              animationDuration: style.animationDuration
            }}
          />
        ))}
      </div>

      <div className="autumn-content">
        <h1 className="season-title">
          <span className="korean">가을</span>
          <span className="english">Autumn in Korea</span>
        </h1>

        <p className="season-desc">
          Autumn (9월-11월) paints Korea in gold and red! 🍂
          <br />The most beautiful season for scenery.
        </p>

        <div className="highlights-container">
          {autumnHighlights.map((item, index) => (
            <div 
              key={index}
              className={`highlight-card ${hoveredLeaf === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredLeaf(index)}
              onMouseLeave={() => setHoveredLeaf(null)}
            >
              <span className="highlight-emoji">{item.emoji}</span>
              <div className="highlight-info">
                <h3>{item.title}</h3>
                <p>{item.place}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="autumn-quote">
          <p>🍁 가을처럼 풍요로운 수업이었어요!</p>
          <p className="quote-trans">(Classes were as fruitful as autumn!)</p>
        </div>

        <div className="autumn-tip">
          <span>💡 Tip: Visit during October for the best fall colors!</span>
        </div>
      </div>
    </div>
  );
}
