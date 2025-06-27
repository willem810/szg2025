import React, { useEffect, useState } from 'react';
import duckBackground from '../assets/images/duck_background.png';
import duckPartyBackground from '../assets/images/duck_party_background.png';

const BackgroundDucks: React.FC = () => {
  const [ducks, setDucks] = useState<Array<{ id: number; top: string; left: string; size: number; facingRight: boolean; isPartyDuck: boolean }>>([]);

  const handlePartyDuckClick = async (event: React.MouseEvent) => {
    try {
      // Dynamic import of confetti
      const confetti = (await import('canvas-confetti')).default;
      
      // Get mouse position for confetti origin
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      
      // Trigger confetti in a circle pattern from the click position
      confetti({
        particleCount: 100,
        spread: 360,
        origin: { x, y },
        angle: 90,
        startVelocity: 30,
        gravity: 0.5,
        ticks: 200,
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#8800ff']
      });
    } catch (error) {
      // Silent error handling
    }
  };

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
      const newDucks: Array<{ id: number; top: string; left: string; size: number; facingRight: boolean; isPartyDuck: boolean }> = [];
      let duckId = 1;
      let partyDuckPlaced = false;
      
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
              // Force place party duck if we haven't placed one yet and this is a good position
              const shouldBePartyDuck = !partyDuckPlaced && left > 30 && left < 70 && top > 30 && top < 70;
              
              newDucks.push({
                id: duckId++,
                top: `${top}vh`, // Use viewport height units
                left: `${left}%`,
                size: shouldBePartyDuck ? 80 : size, // Make party duck bigger
                facingRight,
                isPartyDuck: shouldBePartyDuck
              });
              usedPositions.push({ top, left });
              placed = true;
              
              if (shouldBePartyDuck) {
                partyDuckPlaced = true;
              }
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
    <>
      <div className="background-ducks">
        {ducks.map((duck) => (
          <React.Fragment key={duck.id}>
            {/* Duck image - always behind text */}
            <img
              src={duck.isPartyDuck ? duckPartyBackground : duckBackground}
              alt={duck.isPartyDuck ? "Party duck" : "Background duck"}
              style={{
                position: 'fixed',
                top: duck.top,
                left: duck.left,
                width: `${duck.size}px`,
                height: `${duck.size}px`,
                opacity: 0.3, // Same opacity as other ducks
                pointerEvents: 'none', // Never clickable
                zIndex: 0, // Always behind text
                transform: duck.facingRight ? 'scaleX(-1)' : 'none', // Flip horizontally if facing right
              }}
            />
            
            {/* Clickable overlay for party duck only */}
            {duck.isPartyDuck && (
              <div
                style={{
                  position: 'fixed',
                  top: duck.top,
                  left: duck.left,
                  width: `${duck.size}px`,
                  height: `${duck.size}px`,
                  cursor: 'pointer',
                  zIndex: 9999, // High z-index to be clickable
                  backgroundColor: 'transparent', // Invisible
                }}
                onClick={handlePartyDuckClick}
                onMouseEnter={(e) => {
                  // Add hover effect to the duck image
                  const duckImage = e.currentTarget.previousElementSibling as HTMLElement;
                  if (duckImage) {
                    duckImage.style.transform = duck.facingRight ? 'scaleX(-1) scale(1.1)' : 'scale(1.1)';
                    duckImage.style.transition = 'transform 0.2s ease';
                  }
                }}
                onMouseLeave={(e) => {
                  // Remove hover effect
                  const duckImage = e.currentTarget.previousElementSibling as HTMLElement;
                  if (duckImage) {
                    duckImage.style.transform = duck.facingRight ? 'scaleX(-1)' : 'none';
                  }
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default BackgroundDucks; 