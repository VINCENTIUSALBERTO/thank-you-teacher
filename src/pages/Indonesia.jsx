import { useState } from 'react';
import './Indonesia.css';

const destinations = [
  { 
    name: 'Yogyakarta', 
    emoji: '🏛️',
    highlights: ['Borobudur Temple', 'Prambanan Temple', 'Malioboro Street', 'Sultan Palace']
  },
  { 
    name: 'Raja Ampat', 
    emoji: '🐠',
    highlights: ['World-class diving', 'Crystal clear waters', 'Marine biodiversity']
  },
  { 
    name: 'Komodo Island', 
    emoji: '🦎',
    highlights: ['Komodo dragons', 'Pink Beach', 'Padar Island viewpoint']
  },
  { 
    name: 'Lombok', 
    emoji: '🏝️',
    highlights: ['Mount Rinjani', 'Gili Islands', 'Pristine beaches']
  },
  { 
    name: 'Bromo', 
    emoji: '🌋',
    highlights: ['Sunrise view', 'Sea of sand', 'Active volcano']
  }
];

const foods = [
  { name: 'Rendang', emoji: '🍖', desc: 'Spicy slow-cooked beef (World\'s best food!)' },
  { name: 'Nasi Goreng', emoji: '🍳', desc: 'Indonesian fried rice' },
  { name: 'Satay', emoji: '🍢', desc: 'Grilled meat skewers with peanut sauce' },
  { name: 'Gado-gado', emoji: '🥗', desc: 'Vegetable salad with peanut sauce' },
  { name: 'Martabak', emoji: '🥞', desc: 'Sweet or savory stuffed pancake' },
  { name: 'Es Teler', emoji: '🍧', desc: 'Tropical fruit ice dessert' }
];

const tips = [
  { emoji: '💳', tip: 'QRIS is everywhere! Just scan QR code to pay like Korean pay!' },
  { emoji: '🛵', tip: 'Use Gojek/Grab for transport - like Korean Kakao Taxi!' },
  { emoji: '🌶️', tip: 'Say "tidak pedas" if you don\'t want spicy food!' },
  { emoji: '🙏', tip: 'Indonesians love it when you say "Terima kasih" (Thank you)' },
  { emoji: '😊', tip: 'People are very friendly and will help tourists!' },
  { emoji: '💰', tip: 'Bargaining is common in traditional markets!' }
];

export default function Indonesia() {
  const [activeSection, setActiveSection] = useState('destinations');

  return (
    <div className="indonesia-page">
      <div className="indonesia-content">
        <h1 className="indonesia-title">
          <span className="flag">🇮🇩</span>
          <span className="name">Indonesia</span>
          <span className="subtitle">Beyond Bali - More to Explore!</span>
        </h1>

        <div className="section-tabs">
          <button 
            className={`section-tab ${activeSection === 'destinations' ? 'active' : ''}`}
            onClick={() => setActiveSection('destinations')}
          >
            📍 Destinations
          </button>
          <button 
            className={`section-tab ${activeSection === 'food' ? 'active' : ''}`}
            onClick={() => setActiveSection('food')}
          >
            🍜 Food
          </button>
          <button 
            className={`section-tab ${activeSection === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveSection('tips')}
          >
            💡 Tips
          </button>
        </div>

        {activeSection === 'destinations' && (
          <div className="destinations-grid">
            {destinations.map((dest, index) => (
              <div key={index} className="destination-card">
                <span className="dest-emoji">{dest.emoji}</span>
                <h3>{dest.name}</h3>
                <div className="dest-highlights">
                  {dest.highlights.map((h, i) => (
                    <span key={i}>{h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'food' && (
          <div className="foods-grid">
            {foods.map((food, index) => (
              <div key={index} className="food-item">
                <span className="food-emoji">{food.emoji}</span>
                <div>
                  <h4>{food.name}</h4>
                  <p>{food.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'tips' && (
          <div className="tips-section">
            <div className="qris-banner">
              <h3>💳 About QRIS Payment</h3>
              <p>
                QRIS (Quick Response Code Indonesian Standard) is a universal QR payment system. 
                Almost every store, restaurant, and even street vendors accept QRIS!
                <br /><br />
                <strong>Just scan the QR code with any Indonesian banking app to pay - 
                it's like Korean digital payment!</strong>
              </p>
            </div>
            <div className="tips-grid">
              {tips.map((tip, index) => (
                <div key={index} className="tip-card">
                  <span className="tip-emoji">{tip.emoji}</span>
                  <p>{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="indonesia-invite">
          <p>선생님, 인도네시아에 오세요! 🙏</p>
          <p className="invite-trans">(Teacher, please come to Indonesia!)</p>
        </div>
      </div>
    </div>
  );
}
