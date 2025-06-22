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

interface MediaItem {
  url: string;
  path: string;
  year: number;
  type: 'image' | 'video';
}

const Timeline: React.FC = () => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  // Get all images and videos from all years
  const allMedia = useMemo(() => {
    const images = import.meta.glob('../assets/images/timeline/*/*.{png,jpg,jpeg,gif,webp}', { eager: true });
    const videos = import.meta.glob('../assets/images/timeline/*/*.mp4', { eager: true });
    
    const imageItems: MediaItem[] = Object.entries(images).map(([path, module]) => ({
      url: (module as { default: string }).default,
      path,
      year: parseInt(path.match(/\/images\/timeline\/(\d+)\//)?.[1] || '0'),
      type: 'image' as const
    }));
    
    const videoItems: MediaItem[] = Object.entries(videos).map(([path, module]) => ({
      url: (module as { default: string }).default,
      path,
      year: parseInt(path.match(/\/images\/timeline\/(\d+)\//)?.[1] || '0'),
      type: 'video' as const
    }));
    
    return [...imageItems, ...videoItems];
  }, []);

  // Get media for the current year
  const currentYearMedia = useMemo(() => {
    if (currentYear === null) return [];
    return allMedia.filter(media => media.year === currentYear);
  }, [allMedia, currentYear]);

  const handleImageClick = (imageUrl: string) => {
    const media = allMedia.find(m => m.url === imageUrl);
    if (media) {
      setCurrentYear(media.year);
      const yearMedia = allMedia.filter(m => m.year === media.year);
      const indexInYear = yearMedia.findIndex(m => m.url === imageUrl);
      setSelectedMediaIndex(indexInYear >= 0 ? indexInYear : null);
    }
  };

  const handleVideoClick = (videoUrl: string) => {
    const media = allMedia.find(m => m.url === videoUrl);
    if (media) {
      setCurrentYear(media.year);
      const yearMedia = allMedia.filter(m => m.year === media.year);
      const indexInYear = yearMedia.findIndex(m => m.url === videoUrl);
      setSelectedMediaIndex(indexInYear >= 0 ? indexInYear : null);
    }
  };

  const handleCloseModal = () => {
    setSelectedMediaIndex(null);
    setCurrentYear(null);
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (selectedMediaIndex === null || currentYear === null) return;
    
    const yearMedia = allMedia.filter(media => media.year === currentYear);
    
    if (direction === 'next') {
      setSelectedMediaIndex((selectedMediaIndex + 1) % yearMedia.length);
    } else {
      setSelectedMediaIndex(selectedMediaIndex === 0 ? yearMedia.length - 1 : selectedMediaIndex - 1);
    }
  };

  const timelineItems: TimelineItem[] = [
    { year: 2025, title: 'Year 2025', description: 'Events and milestones from 2025', position: 'left' },
    { year: 2024, title: 'Year 2024', description: 'Events and milestones from 2024', position: 'right' },
    { year: 2023, title: 'Year 2023', description: 'Events and milestones from 2023', position: 'left' },
    { year: 2022, title: 'Year 2022', description: 'Events and milestones from 2022', position: 'right' },
  ];

  // Get the current media for the modal
  const currentMedia = selectedMediaIndex !== null && currentYear !== null 
    ? currentYearMedia[selectedMediaIndex] 
    : null;

  return (
    <div className="timeline">
      {timelineItems.map((item) => (
        <div key={item.year} className={`timeline-item ${item.position}`}>
          <div className="timeline-year-dot">{item.year}</div>
          <div className="timeline-content">
            <ImageGallery 
              year={item.year} 
              onImageClick={handleImageClick}
              onVideoClick={handleVideoClick}
            />
          </div>
        </div>
      ))}
      {selectedMediaIndex !== null && currentMedia && (
        <ImageModal 
          mediaUrl={currentMedia.url}
          mediaType={currentMedia.type}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
          currentIndex={selectedMediaIndex}
          totalMedia={currentYearMedia.length}
          currentYear={currentYear!}
        />
      )}
    </div>
  );
};

export default Timeline; 