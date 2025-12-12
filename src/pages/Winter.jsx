import { useState, useRef, useEffect, useCallback } from 'react';
import { SNOWFLAKE_STYLES } from '../utils/randomStyles';
import './Winter.css';

const snowmanParts = [
  { id: 'ball-large', type: 'ball', size: 'large', emoji: '⚪', correctY: 320 },
  { id: 'ball-medium', type: 'ball', size: 'medium', emoji: '⚪', correctY: 240 },
  { id: 'ball-small', type: 'ball', size: 'small', emoji: '⚪', correctY: 180 },
  { id: 'carrot', type: 'accessory', emoji: '🥕', correctY: 180 },
  { id: 'eye-left', type: 'accessory', emoji: '⚫', correctY: 170 },
  { id: 'eye-right', type: 'accessory', emoji: '⚫', correctY: 170 },
  { id: 'hat', type: 'accessory', emoji: '🎩', correctY: 140 },
  { id: 'scarf', type: 'accessory', emoji: '🧣', correctY: 220 }
];

const initialPositions = {
  'ball-large': { x: 100, y: 450 },
  'ball-medium': { x: 200, y: 100 },
  'ball-small': { x: typeof window !== 'undefined' ? window.innerWidth - 150 : 650, y: 450 },
  'carrot': { x: typeof window !== 'undefined' ? window.innerWidth - 100 : 700, y: 200 },
  'eye-left': { x: 80, y: 200 },
  'eye-right': { x: 150, y: 300 },
  'hat': { x: typeof window !== 'undefined' ? window.innerWidth - 120 : 680, y: 350 },
  'scarf': { x: 120, y: 350 }
};

export default function Winter() {
  const [placedParts, setPlacedParts] = useState([]);
  const [positions, setPositions] = useState(initialPositions);
  const [dragging, setDragging] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dropZoneRef = useRef(null);

  useEffect(() => {
    if (placedParts.length === snowmanParts.length) {
      setTimeout(() => {
        setShowCompletion(true);
        setIsWiggling(true);
      }, 500);
    }
  }, [placedParts]);

  const handleMouseDown = (e, partId) => {
    if (!placedParts.includes(partId)) {
      setDragging(partId);
      const element = e.target.closest('.snowman-part');
      if (element) {
        const rect = element.getBoundingClientRect();
        dragOffset.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    }
  };

  const handleTouchStart = (e, partId) => {
    if (!placedParts.includes(partId)) {
      setDragging(partId);
      const touch = e.touches[0];
      const element = e.target.closest('.snowman-part');
      if (element) {
        const rect = element.getBoundingClientRect();
        dragOffset.current = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        };
      }
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (dragging) {
      setPositions(prev => ({
        ...prev,
        [dragging]: {
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y
        }
      }));
    }
  }, [dragging]);

  const handleTouchMove = useCallback((e) => {
    if (dragging) {
      const touch = e.touches[0];
      setPositions(prev => ({
        ...prev,
        [dragging]: {
          x: touch.clientX - dragOffset.current.x,
          y: touch.clientY - dragOffset.current.y
        }
      }));
    }
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    if (dragging && dropZoneRef.current) {
      const dropZone = dropZoneRef.current.getBoundingClientRect();
      const part = snowmanParts.find(p => p.id === dragging);
      const partPos = positions[dragging];
      
      const dropZoneCenterX = dropZone.left + dropZone.width / 2;
      const partCenterX = partPos.x + 40;
      const partCenterY = partPos.y + 40;
      
      const xDistance = Math.abs(partCenterX - dropZoneCenterX);
      const yDistance = Math.abs(partCenterY - (dropZone.top + part.correctY));
      
      if (xDistance < 80 && yDistance < 50) {
        // Check if all previous required parts are placed
        const requiredParts = snowmanParts
          .filter(p => p.type === 'ball')
          .slice(0, snowmanParts.filter(p => p.type === 'ball').indexOf(part) + 1)
          .map(p => p.id);
        
        const canPlace = part.type === 'accessory' || 
                        requiredParts.every(id => placedParts.includes(id) || id === dragging);
        
        if (canPlace) {
          setPlacedParts(prev => [...prev, dragging]);
          setPositions(prev => ({
            ...prev,
            [dragging]: {
              x: dropZone.left - 40 + (dropZone.width / 2),
              y: dropZone.top + part.correctY - 40
            }
          }));
        } else {
          // Return to original position
          setPositions(prev => ({
            ...prev,
            [dragging]: initialPositions[dragging]
          }));
        }
      } else {
        // Return to original position
        setPositions(prev => ({
          ...prev,
          [dragging]: initialPositions[dragging]
        }));
      }
    }
    setDragging(null);
  }, [dragging, positions, placedParts]);

  const handleTouchEnd = useCallback(() => {
    if (dragging && dropZoneRef.current) {
      const dropZone = dropZoneRef.current.getBoundingClientRect();
      const part = snowmanParts.find(p => p.id === dragging);
      const partPos = positions[dragging];
      
      const dropZoneCenterX = dropZone.left + dropZone.width / 2;
      const partCenterX = partPos.x + 40;
      const partCenterY = partPos.y + 40;
      
      const xDistance = Math.abs(partCenterX - dropZoneCenterX);
      const yDistance = Math.abs(partCenterY - (dropZone.top + part.correctY));
      
      if (xDistance < 80 && yDistance < 50) {
        // Check if all previous required parts are placed
        const requiredParts = snowmanParts
          .filter(p => p.type === 'ball')
          .slice(0, snowmanParts.filter(p => p.type === 'ball').indexOf(part) + 1)
          .map(p => p.id);
        
        const canPlace = part.type === 'accessory' || 
                        requiredParts.every(id => placedParts.includes(id) || id === dragging);
        
        if (canPlace) {
          setPlacedParts(prev => [...prev, dragging]);
          setPositions(prev => ({
            ...prev,
            [dragging]: {
              x: dropZone.left - 40 + (dropZone.width / 2),
              y: dropZone.top + part.correctY - 40
            }
          }));
        } else {
          // Return to original position
          setPositions(prev => ({
            ...prev,
            [dragging]: initialPositions[dragging]
          }));
        }
      } else {
        // Return to original position
        setPositions(prev => ({
          ...prev,
          [dragging]: initialPositions[dragging]
        }));
      }
    }
    setDragging(null);
  }, [dragging, positions, placedParts]);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

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
        {!showCompletion && (
          <div className="winter-hint">
            <p className="hint-korean">눈사람을 만들어요!</p>
            <p className="hint-english">Let's build a snowman! ⛄</p>
            <p className="hint-instruction">Drag the parts to build the snowman</p>
          </div>
        )}

        {/* Drop Zone */}
        <div className="drop-zone" ref={dropZoneRef}>
          <div className={`snowman-area ${isWiggling ? 'wiggle' : ''}`}>
            {/* Ground line */}
            <div className="snow-ground"></div>
          </div>
        </div>

        {/* Snowman Parts */}
        {snowmanParts.map((part) => (
          <div
            key={part.id}
            className={`snowman-part ${part.size || ''} ${dragging === part.id ? 'dragging' : ''} ${placedParts.includes(part.id) ? 'placed' : ''}`}
            style={{
              left: `${positions[part.id].x}px`,
              top: `${positions[part.id].y}px`,
              fontSize: part.size === 'large' ? '5rem' : part.size === 'medium' ? '4rem' : part.size === 'small' ? '3rem' : '2.5rem',
              cursor: placedParts.includes(part.id) ? 'default' : 'grab'
            }}
            onMouseDown={(e) => handleMouseDown(e, part.id)}
            onTouchStart={(e) => handleTouchStart(e, part.id)}
          >
            {part.emoji}
          </div>
        ))}

        {/* Completion Message */}
        {showCompletion && (
          <div className="completion-message">
            <h2 className="completion-korean">완성! ⛄</h2>
            <p className="completion-english">You built a snowman!</p>
            <p className="completion-text">
              Just like building this snowman piece by piece, our teacher helps us build ourselves and grow every day!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
