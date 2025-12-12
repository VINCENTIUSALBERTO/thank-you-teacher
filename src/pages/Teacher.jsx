import { useState, useEffect } from 'react';
import './Teacher.css';

const qualities = [
  { icon: '⏰', title: 'Always On Time', desc: 'You always come to Zoom class on time' },
  { icon: '💼', title: 'Professional', desc: 'A true professional in everything you do' },
  { icon: '😊', title: 'Friendly', desc: 'You make every student feel welcome' },
  { icon: '📚', title: 'Dedicated Teacher', desc: 'You truly care about our learning' },
  { icon: '🎯', title: 'Patient Guide', desc: 'You want us to truly understand, not just memorize' },
  { icon: '✅', title: 'Great Feedback', desc: 'You always correct our mistakes with kindness' }
];

export default function Teacher() {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    qualities.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, 300 * index);
    });
  }, []);

  return (
    <div className="teacher-page">
      <div className="teacher-content">
        <h1 className="teacher-title">
          <span className="korean">전지은 선생님</span>
          <span className="english">Teacher Jieun Jeon</span>
        </h1>
        
        <p className="teacher-intro">
          Thank you for being such an amazing Korean teacher! 
          Here is why you are special to all of us...
        </p>

        <div className="qualities-grid">
          {qualities.map((quality, index) => (
            <div 
              key={index}
              className={`quality-card ${visibleCards.includes(index) ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <span className="quality-icon">{quality.icon}</span>
              <h3 className="quality-title">{quality.title}</h3>
              <p className="quality-desc">{quality.desc}</p>
            </div>
          ))}
        </div>

        <div className="teacher-message">
          <p>감사합니다, 선생님! 🙏</p>
          <p className="message-sub">(Thank you, Teacher!)</p>
        </div>
      </div>
    </div>
  );
}
