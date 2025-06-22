import React, { useState, useMemo } from 'react';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  // Get all images from all years
  const allImages = useMemo(() => {
    const images = import.meta.glob('../assets/images/*/*.{png,jpg,jpeg,gif,webp}', { eager: true });
    return Object.entries(images).map(([path, module]) => ({
      url: (module as { default: string }).default,
      path,
      year: parseInt(path.match(/\/images\/(\d+)\//)?.[1] || '0')
    }));
  }, []);

  // Get images for the current year
  const currentYearImages = useMemo(() => {
    if (currentYear === null) return [];
    return allImages.filter(img => img.year === currentYear);
  }, [allImages, currentYear]);

  const handleImageClick = (imageUrl: string) => {
    const image = allImages.find(img => img.url === imageUrl);
    if (image) {
      setCurrentYear(image.year);
      const yearImages = allImages.filter(img => img.year === image.year);
      const indexInYear = yearImages.findIndex(img => img.url === imageUrl);
      setSelectedImageIndex(indexInYear >= 0 ? indexInYear : null);
    }
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setCurrentYear(null);
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (selectedImageIndex === null || currentYear === null) return;
    
    const yearImages = allImages.filter(img => img.year === currentYear);
    
    if (direction === 'next') {
      setSelectedImageIndex((selectedImageIndex + 1) % yearImages.length);
    } else {
      setSelectedImageIndex(selectedImageIndex === 0 ? yearImages.length - 1 : selectedImageIndex - 1);
    }
  };

  const timelineItems: TimelineItem[] = [
    { year: 2025, title: 'Year 2025', description: 'Events and milestones from 2025', position: 'left' },
    { year: 2024, title: 'Year 2024', description: 'Events and milestones from 2024', position: 'right' },
    { year: 2023, title: 'Year 2023', description: 'Events and milestones from 2023', position: 'left' },
    { year: 2022, title: 'Year 2022', description: 'Events and milestones from 2022', position: 'right' },
    { year: 2021, title: 'Year 2021', description: 'Events and milestones from 2021', position: 'left' },
  ];

  // Get the current image URL for the modal
  const currentImageUrl = selectedImageIndex !== null && currentYear !== null 
    ? currentYearImages[selectedImageIndex]?.url 
    : null;

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
      {selectedImageIndex !== null && currentImageUrl && (
        <ImageModal 
          imageUrl={currentImageUrl}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
          currentIndex={selectedImageIndex}
          totalImages={currentYearImages.length}
          currentYear={currentYear!}
        />
      )}
    </div>
  );
};

export default Timeline; 