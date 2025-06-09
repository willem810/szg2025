import React from 'react';

interface ImageGalleryProps {
  year: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ year }) => {
  // Import all images from all year folders
  const images = import.meta.glob('../assets/images/*/*.{png,jpg,jpeg,gif}', { eager: true });
  
  // Filter images for the specific year
  const yearImages = Object.entries(images).filter(([path]) => 
    path.includes(`/images/${year}/`)
  );

  return (
    <div className="image-gallery">
      {yearImages.map(([path, module]) => (
        <div key={path} className="image-container">
          <img 
            src={(module as { default: string }).default} 
            alt={`Image from ${year}`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery; 