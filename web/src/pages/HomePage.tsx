import React from 'react';
import Timeline from '../components/Timeline';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="homepage-description" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>🕰️ De Tijdreis van het Eendje  </h1>
        <h2> Door Team 29 – De Betrouwbare VIPs</h2>
        <p>Via een ei en QR-code beland in dit avontuur? Welkom, eendenzoeker! 🥚🦆</p>

<h3>Hoe werkt het?</h3>
        <p>Onze klassieke badeend-drinkactie krijgt een oertijd-upgrade.</p>
        <p><b>Spelregels:</b></p>
        <p>
          <ol>
            <li>Vind een ei</li>
            <li>Open het ei → mini-badeendje</li>
            <li>Gooi 't eendje in iemands glas</li>
            <li>Die moet atten (VIP-regel #1)</li>
            <li>Geef het eendje door</li>
            <li>Herhaal & hydrateer door de tijd</li>
</ol>
        </p>
      </div>
      <Timeline />
    </div>
  );
};

export default HomePage; 