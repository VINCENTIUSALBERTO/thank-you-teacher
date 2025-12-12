import { useState } from 'react';
import './Summer.css';

const summerActivities = [
  { emoji: '🏖️', title: 'Beach Time', desc: 'Visit Haeundae Beach in Busan!' },
  { emoji: '🍧', title: 'Bingsu', desc: 'Korean shaved ice - perfect for hot days!' },
  { emoji: '🎆', title: 'Fireworks', desc: 'Beautiful summer festivals!' },
  { emoji: '🏔️', title: 'Hiking', desc: 'Escape to the cool mountains' }
];

export default function Summer() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="summer-page">
      <div className="sun-rays">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="ray"
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}
      </div>

      <div className="waves">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <div className="summer-content">
        <h1 className="season-title">
          <span className="korean">여름</span>
          <span className="english">Summer in Korea</span>
        </h1>

        <p className="season-desc">
          Summer (6월-8월) brings heat and fun! ☀️
          <br />The best time to enjoy beaches and refreshing treats!
        </p>

        <div className="activities-grid">
          {summerActivities.map((activity, index) => (
            <div 
              key={index}
              className={`activity-card ${activeCard === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <span className="activity-emoji">{activity.emoji}</span>
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-desc">{activity.desc}</p>
            </div>
          ))}
        </div>

        <div className="summer-message">
          <p>🌊 여름처럼 시원하고 즐거운 수업이었어요!</p>
          <p className="message-trans">(Classes were as refreshing and fun as summer!)</p>
        </div>
      </div>
    </div>
  );
}
