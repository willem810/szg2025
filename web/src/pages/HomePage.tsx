import React from 'react';
import Timeline from '../components/Timeline';
import InstagramIcon from '../assets/images/Instagram_icon.png.webp';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="homepage-description" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>🕰️ De Tijdreis van het Eendje  </h1>
        <h2> Door Team 29 – De Betrouwbare VIPs</h2>
        <p>Via een ei en QR-code beland in dit avontuur? Welkom, eendenzoeker! ��🦆</p>
        <p>
          <a 
            href="https://www.instagram.com/eendjesnaarzonzeeszg/" 
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
          <p>Onze klassieke badeend-drinkactie krijgt een oertijd-upgrade</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>🥚 Vind een ei</li>
            <li>🔓 Open het ei → mini-badeendje</li>
            <li>🎯 Gooi 't eendje in iemands glas</li>
            <li>🍺 Die moet atten (VIP-regel #1)</li>
            <li>🔄 Geef het eendje door</li>
            <li>⏰ Herhaal & hydrateer door de tijd</li>
          </ul>
        </div>
      </div>

      <Timeline />
    </div>
  );
};

export default HomePage; 