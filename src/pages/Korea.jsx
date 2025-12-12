import { useState } from 'react';
import './Korea.css';

const destinations = [
  { 
    name: 'Seoul', 
    korean: '서울',
    emoji: '🏙️',
    highlights: ['Gyeongbokgung Palace', 'Myeongdong', 'N Seoul Tower', 'Bukchon Hanok Village']
  },
  { 
    name: 'Busan', 
    korean: '부산',
    emoji: '🌊',
    highlights: ['Haeundae Beach', 'Gamcheon Culture Village', 'Jagalchi Fish Market']
  },
  { 
    name: 'Jeju Island', 
    korean: '제주도',
    emoji: '🌴',
    highlights: ['Hallasan Mountain', 'Seongsan Ilchulbong', 'Manjanggul Cave']
  },
  { 
    name: 'Gyeongju', 
    korean: '경주',
    emoji: '🏛️',
    highlights: ['Bulguksa Temple', 'Cheomseongdae', 'Anapji Pond']
  }
];

const foods = [
  { name: 'Bibimbap', korean: '비빔밥', emoji: '🍚', desc: 'Mixed rice with vegetables' },
  { name: 'Korean BBQ', korean: '고기', emoji: '🥩', desc: 'Grilled meat at your table' },
  { name: 'Tteokbokki', korean: '떡볶이', emoji: '🌶️', desc: 'Spicy rice cakes' },
  { name: 'Kimchi', korean: '김치', emoji: '🥬', desc: 'Fermented vegetables' },
  { name: 'Samgyeopsal', korean: '삼겹살', emoji: '🐷', desc: 'Grilled pork belly' },
  { name: 'Bingsu', korean: '빙수', emoji: '🍧', desc: 'Korean shaved ice dessert' }
];

export default function Korea() {
  const [activeDestination, setActiveDestination] = useState(0);

  return (
    <div className="korea-page">
      <div className="korea-content">
        <h1 className="korea-title">
          <span className="flag">🇰🇷</span>
          <span className="korean">한국</span>
          <span className="english">Discover Korea</span>
        </h1>

        <p className="korea-intro">
          Places I want to visit when I come to Korea!
          <br />선생님, 추천해 주세요! (Teacher, please recommend!)
        </p>

        <div className="destinations-section">
          <h2>📍 Must-Visit Destinations</h2>
          <div className="destinations-tabs">
            {destinations.map((dest, index) => (
              <button
                key={index}
                className={`dest-tab ${activeDestination === index ? 'active' : ''}`}
                onClick={() => setActiveDestination(index)}
              >
                <span className="dest-emoji">{dest.emoji}</span>
                <span className="dest-name">{dest.korean}</span>
              </button>
            ))}
          </div>
          <div className="destination-details">
            <h3>
              {destinations[activeDestination].emoji} {destinations[activeDestination].name}
              <span className="korean-name">{destinations[activeDestination].korean}</span>
            </h3>
            <div className="highlights-list">
              {destinations[activeDestination].highlights.map((highlight, idx) => (
                <span key={idx} className="highlight-tag">✨ {highlight}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="foods-section">
          <h2>🍜 Korean Food to Try</h2>
          <div className="foods-grid">
            {foods.map((food, index) => (
              <div key={index} className="food-card">
                <span className="food-emoji">{food.emoji}</span>
                <div className="food-info">
                  <h4>{food.name} <span>{food.korean}</span></h4>
                  <p>{food.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
