import ReactGA from 'react-ga4';

// Replace this with your actual Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-5C63260SHZ'; // You'll need to replace this with your actual GA4 Measurement ID

export const initGA = () => {
  if (typeof window !== 'undefined') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log('Google Analytics initialized');
  }
};

export const logPageView = (path: string) => {
  if (typeof window !== 'undefined') {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const logEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      action,
      category,
      label,
      value,
    });
  }
};

export const logTimelineView = (year: string) => {
  logEvent('timeline_view', 'engagement', `year_${year}`);
};

export const logImageClick = (imageName: string, year: string) => {
  logEvent('image_click', 'engagement', `${imageName}_${year}`);
};

export const logVideoPlay = (videoName: string, year: string) => {
  logEvent('video_play', 'engagement', `${videoName}_${year}`);
};

export const logEasterEggFound = (easterEggName: string) => {
  logEvent('easter_egg_found', 'engagement', easterEggName);
}; 