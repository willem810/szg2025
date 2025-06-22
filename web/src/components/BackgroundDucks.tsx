import React, { useEffect, useState } from 'react';
import duckBackground from '../assets/images/duck_background.png';

const BackgroundDucks: React.FC = () => {
  const [ducks, setDucks] = useState<Array<{ id: number; top: string; left: string; size: number; facingRight: boolean }>>([]);

  useEffect(() => {
    const generateDucks = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      // Calculate how many viewport heights the document spans
      const totalViewportHeights = Math.ceil(documentHeight / viewportHeight);
      
      // Generate ducks with better spacing
      const newDucks: Array<{ id: number; top: string; left: string; size: number; facingRight: boolean }> = [];
      let duckId = 1;
      
      // Create a grid system to ensure spacing
      const usedPositions: Array<{ top: number; left: number }> = [];
      
      // Generate ducks for the entire document height using viewport units
      for (let vh = 0; vh <= totalViewportHeights * 100; vh += 15) { // Every 15vh (reduced from 20vh)
        // Try to place 1-3 ducks per section (increased from 1-2)
        const attempts = Math.floor(Math.random() * 3) + 1;
        
        for (let attempt = 0; attempt < attempts; attempt++) {
          let placed = false;
          let tries = 0;
          
          while (!placed && tries < 10) {
            const top = vh + Math.random() * 15; // Random position within the section
            const left = Math.random() * 80 + 10; // Random horizontal position (10% to 90%)
            const size = Math.floor(Math.random() * 40) + 50; // Random size between 50-90px
            const facingRight = Math.random() > 0.5; // 50% chance to face right
            
            // Check if this position is far enough from existing ducks
            const isFarEnough = usedPositions.every(pos => {
              const distance = Math.sqrt(
                Math.pow(top - pos.top, 2) + Math.pow(left - pos.left, 2)
              );
              return distance > 25; // Minimum 25vh distance (reduced from 30vh)
            });
            
            if (isFarEnough) {
              newDucks.push({
                id: duckId++,
                top: `${top}vh`, // Use viewport height units
                left: `${left}%`,
                size,
                facingRight
              });
              usedPositions.push({ top, left });
              placed = true;
            }
            
            tries++;
          }
        }
      }
      
      setDucks(newDucks);
    };

    // Generate ducks on mount and window resize
    generateDucks();
    window.addEventListener('resize', generateDucks);
    
    return () => window.removeEventListener('resize', generateDucks);
  }, []);

  return (
    <div className="background-ducks">
      {ducks.map((duck) => (
        <img
          key={duck.id}
          src={duckBackground}
          alt="Background duck"
          style={{
            position: 'fixed',
            top: duck.top,
            left: duck.left,
            width: `${duck.size}px`,
            height: `${duck.size}px`,
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: 0,
            transform: duck.facingRight ? 'scaleX(-1)' : 'none', // Flip horizontally if facing right
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundDucks; 