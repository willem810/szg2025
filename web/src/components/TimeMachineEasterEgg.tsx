import React, { useState } from 'react';
import duckImg from '../assets/images/duck_background.png';
import eggImg from '../assets/images/egg.png';

const TimeMachineEasterEgg: React.FC = () => {
  const [active, setActive] = useState(false);
  const [showEgg, setShowEgg] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handleClick = () => {
    setActive(true);
    setShowEgg(false);
    setShowFlash(false);
    setTimeout(() => setShowFlash(true), 1100); // Flash just before egg appears
    setTimeout(() => {
      setShowEgg(true);
      setShowFlash(false);
    }, 1800); // Duck animates for 1.8s, then egg appears
    setTimeout(() => setActive(false), 3000); // End animation after 3s
  };

  return (
    <>
      <button
        className={`time-machine-easter-egg-btn${active ? ' active' : ''}`}
        onClick={handleClick}
        aria-label="Activate time machine!"
      >
        <span className="gear" />
        <span className="clock-face">
          <span className="clock-hand" />
        </span>
        <span className="portal" />
      </button>
      {active && (
        <div className="easter-egg-overlay">
          <div className="easter-egg-center">
            <img
              src={showEgg ? eggImg : duckImg}
              alt={showEgg ? 'Egg' : 'Duck'}
              className={`easter-egg-img${showEgg ? ' egg' : ' duck'}`}
            />
            {showFlash && (
              <div className="easter-egg-flash" />
            )}
          </div>
        </div>
      )}
      <style>{`
        .time-machine-easter-egg-btn {
          position: fixed;
          bottom: 32px;
          right: 32px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8 60%, #e0e7ff 100%);
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          border: none;
          z-index: 1002;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }
        .time-machine-easter-egg-btn .gear {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 4px dashed #0ea5e9;
          left: 12px;
          top: 12px;
          z-index: 2;
          animation: gear-spin 2s linear infinite;
        }
        .time-machine-easter-egg-btn.active .gear {
          animation: gear-spin-fast 0.7s linear infinite;
        }
        .time-machine-easter-egg-btn .clock-face {
          position: absolute;
          width: 32px;
          height: 32px;
          left: 16px;
          top: 16px;
          background: #fff;
          border-radius: 50%;
          border: 2px solid #38bdf8;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .time-machine-easter-egg-btn .clock-hand {
          position: absolute;
          width: 2px;
          height: 12px;
          background: #0ea5e9;
          left: 15px;
          top: 8px;
          border-radius: 2px;
          transform-origin: bottom center;
          animation: clock-hand-spin 6s linear infinite;
        }
        .time-machine-easter-egg-btn .portal {
          position: absolute;
          width: 56px;
          height: 56px;
          left: 4px;
          top: 4px;
          border-radius: 50%;
          border: 3px solid #7dd3fc;
          box-shadow: 0 0 16px #38bdf8;
          z-index: 1;
          animation: portal-spin 3s linear infinite;
        }
        .time-machine-easter-egg-btn.active {
          background: linear-gradient(135deg, #facc15 60%, #f472b6 100%);
        }
        @keyframes gear-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gear-spin-fast {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(1080deg); }
        }
        @keyframes portal-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes clock-hand-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .easter-egg-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 2000;
          background: rgba(0,0,0,0.12);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: overlay-fade-in 0.3s;
        }
        @keyframes overlay-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .easter-egg-center {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
          min-height: 220px;
          position: relative;
        }
        .easter-egg-img {
          width: 180px;
          height: 180px;
          object-fit: contain;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          opacity: 1;
          transition: opacity 0.5s, transform 0.7s cubic-bezier(.68,-0.55,.27,1.55);
          background: none;
          border-radius: 0;
        }
        .easter-egg-img.duck {
          z-index: 2;
          animation: duck-to-egg 1.8s forwards;
        }
        .easter-egg-img.egg {
          z-index: 3;
          animation: egg-appear 1s;
        }
        @keyframes duck-to-egg {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          60% { opacity: 1; transform: translate(-50%, -50%) scale(1.2) rotate(20deg); }
          80% { opacity: 0.7; transform: translate(-50%, -50%) scale(0.7) rotate(-10deg); }
          90% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.6) rotate(-20deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) rotate(-30deg); }
        }
        @keyframes egg-appear {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) rotate(-30deg); }
          60% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1) rotate(10deg); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }
        .easter-egg-flash {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 260px;
          height: 260px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, #fff 0%, #fef08a 40%, rgba(255,255,255,0.0) 80%);
          opacity: 0.85;
          pointer-events: none;
          animation: flash-burst 0.7s cubic-bezier(.68,-0.55,.27,1.55);
          z-index: 10;
        }
        @keyframes flash-burst {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
          30% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          80% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
        }
      `}</style>
    </>
  );
};

export default TimeMachineEasterEgg; 