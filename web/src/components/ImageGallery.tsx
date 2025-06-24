import React from 'react';

interface ImageGalleryProps {
  year: number;
  onImageClick: (imageUrl: string) => void;
  onVideoClick: (videoUrl: string) => void;
}

const MAX_VISIBLE_ITEMS = 5;
const MIN_VISIBLE_ITEMS = 3;

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

  // Combine images and videos, keep order: images first, then videos
  const allMedia = [
    ...yearImages.map(([path, module]) => ({
      type: 'image',
      path,
      src: (module as { default: string }).default,
    })),
    ...yearVideos.map(([path, module]) => ({
      type: 'video',
      path,
      src: (module as { default: string }).default,
    })),
  ];

  // Determine how many items to show (at least MIN_VISIBLE_ITEMS, at most MAX_VISIBLE_ITEMS)
  let visibleCount = Math.min(allMedia.length, MAX_VISIBLE_ITEMS);
  if (allMedia.length < MIN_VISIBLE_ITEMS) {
    visibleCount = allMedia.length;
  } else if (visibleCount < MIN_VISIBLE_ITEMS) {
    visibleCount = MIN_VISIBLE_ITEMS;
  }

  const extraCount = allMedia.length - visibleCount;
  const visibleMedia = allMedia.slice(0, visibleCount);

  return (
    <div className="image-gallery single-row">
      {visibleMedia.map((item, idx) => {
        // If this is the last visible item and there are extras, show overlay
        if (idx === visibleCount - 1 && extraCount > 0) {
          return (
            <div
              key={item.path}
              className="image-container image-overlay-container"
              onClick={() => {
                if (item.type === 'image') {
                  onImageClick(item.src);
                } else {
                  onVideoClick(item.src);
                }
              }}
              style={{ position: 'relative' }}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={`Image from ${year}`}
                  loading="lazy"
                  style={{ filter: 'grayscale(1)', opacity: 0.7 }}
                />
              ) : (
                <video
                  src={item.src}
                  preload="metadata"
                  muted
                  style={{ filter: 'grayscale(1)', opacity: 0.7 }}
                />
              )}
              <div className="image-overlay-text">
                {`+${extraCount} more...`}
              </div>
            </div>
          );
        }
        if (item.type === 'image') {
          return (
            <div
              key={item.path}
              className="image-container"
              onClick={() => onImageClick(item.src)}
            >
              <img
                src={item.src}
                alt={`Image from ${year}`}
                loading="lazy"
              />
            </div>
          );
        } else {
          return (
            <div
              key={item.path}
              className="video-container"
              onClick={() => onVideoClick(item.src)}
            >
              <video
                src={item.src}
                preload="metadata"
                muted
              />
              <div className="video-play-overlay">
                <div className="play-button">▶</div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ImageGallery; 