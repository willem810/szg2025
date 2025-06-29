import React from 'react';
import Timeline from '../components/Timeline';
import InstagramIcon from '../assets/images/Instagram_icon.png.webp';
import PlayfulStack from '../components/PlayfulStack';
import TimeMachineEasterEgg from '../components/TimeMachineEasterEgg';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="homepage-description" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>🕰️ De Tijdreis van het Eendje  </h1>
        <h2> Team 29 – De Betrouwbare VIPs</h2>
        <p>Via een ei en QR-code beland in dit avontuur? Welkom, eendenzoeker! 🥚🦆</p>
        <p>
          <a 
            href="https://www.instagram.com/eendjesoptijdreis/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#E4405F', textDecoration: 'none', fontWeight: 'bold' }}
          >
            <img 
              src={InstagramIcon} 
              alt="Instagram" 
              style={{ 
                width: '40px', 
                height: '40px', 
                verticalAlign: 'middle', 
                marginRight: '8px' 
              }} 
            />
            Volg ons avontuur op Instagram
          </a>
          ! 🦆✨
        </p>

        <div className="additional-list" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h3>Hoe werkt het?</h3>
          <p>
            Onze legendarische badeend-drinkactie krijgt dit jaar een prehistorische upgrade. <br/>
            Want voordat er een eend🦆 was, was er een... ei 🥚! <br/>
            <u>En die hebben we overal verstopt!</u>
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>🥚 Vind een ei</li>
            <li>🔓 Open het ei → mini-badeendje</li>
            <li>🎯 Gooi 't <b>ei 🥚</b> in iemands glas</li>
            <li>🍺 Die moet atten (VIP-regel #1)</li>
            <li>🔄 Nu is het zijn beurt</li>
            <li>⏰ Herhaal & hydrateer door de tijd</li>
          </ul>

          <p><i>
            Tussen alle gewone exemplaren liggen ook een paar gouden examplaren<br/>
            Vindt jij er eendje? <br/>
            Dan mag jij je cadeautje ophalen bij onze tent 🎁
            </i></p>
        </div>
      </div>

      <PlayfulStack />

      <Timeline />
      <TimeMachineEasterEgg />
    </div>
  );
};

export default HomePage; 