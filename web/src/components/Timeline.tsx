import React from 'react';
import ImageGallery from './ImageGallery';

interface TimelineItem {
  year: number;
  title: string;
  description: string;
}

const Timeline: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const timelineItems: TimelineItem[] = Array.from({ length: 5 }, (_, index) => ({
    year: currentYear - index,
    title: `Year ${currentYear - index}`,
    description: `Events and milestones from ${currentYear - index}`
  }));

  return (
    <div className="timeline">
      {timelineItems.map((item, index) => (
        <div key={item.year} className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>{item.year}</h3>
            <ImageGallery year={item.year} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline; 