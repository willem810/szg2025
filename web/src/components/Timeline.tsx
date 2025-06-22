import React, { useState } from 'react';
import ImageGallery from './ImageGallery';
import ImageModal from './ImageModal';

interface TimelineItem {
  year: number;
  title: string;
  description: string;
  isTimeTravel?: boolean;
  position: 'left' | 'right';
}

const Timeline: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const timelineItems: TimelineItem[] = [
    { year: 2025, title: 'Year 2025', description: 'Events and milestones from 2025', position: 'left' },
    { year: 2024, title: 'Year 2024', description: 'Events and milestones from 2024', position: 'right' },
    { year: 2023, title: 'Year 2023', description: 'Events and milestones from 2023', position: 'left' },
    { year: 2022, title: 'Year 2022', description: 'Events and milestones from 2022', position: 'right' },
    { year: 2021, title: 'Year 2021', description: 'Events and milestones from 2021', position: 'left' },
  ];

  return (
    <div className="timeline">
      {timelineItems.map((item) => (
        <div key={item.year} className={`timeline-item ${item.position}`}>
          <div className="timeline-year-dot">{item.year}</div>
          <div className="timeline-content">
            <ImageGallery year={item.year} onImageClick={handleImageClick} />
          </div>
        </div>
      ))}
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Timeline; 