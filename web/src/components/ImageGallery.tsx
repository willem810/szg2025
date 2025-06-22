import React from 'react';

interface ImageGalleryProps {
  year: number;
  onImageClick: (imageUrl: string) => void;
  onVideoClick: (videoUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ year, onImageClick, onVideoClick }) => {
  // Import all images and videos from all year folders
  const images = import.meta.glob('../assets/images/timeline/*/*.{png,jpg,jpeg,gif,webp}', { eager: true });
  const videos = import.meta.glob('../assets/images/timeline/*/*.mp4', { eager: true });
  
  // Filter images for the specific year
  const yearImages = Object.entries(images).filter(([path]) => 
    path.includes(`/images/timeline/${year}/`)
  );

  // Filter videos for the specific year
  const yearVideos = Object.entries(videos).filter(([path]) => 
    path.includes(`/images/timeline/${year}/`)
  );

  return (
    <div className="image-gallery">
      {/* Render images */}
      {yearImages.map(([path, module]) => (
        <div 
          key={path} 
          className="image-container"
          onClick={() => onImageClick((module as { default: string }).default)}
        >
          <img 
            src={(module as { default: string }).default} 
            alt={`Image from ${year}`}
            loading="lazy"
          />
        </div>
      ))}
      
      {/* Render videos */}
      {yearVideos.map(([path, module]) => (
        <div 
          key={path} 
          className="video-container"
          onClick={() => onVideoClick((module as { default: string }).default)}
        >
          <video 
            src={(module as { default: string }).default}
            preload="metadata"
            muted
          />
          <div className="video-play-overlay">
            <div className="play-button">▶</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery; 