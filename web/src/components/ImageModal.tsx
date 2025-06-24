import React, { useEffect, useRef, useState } from 'react';

interface ImageModalProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  currentIndex: number;
  totalMedia: number;
  currentYear?: number;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  mediaUrl, 
  mediaType,
  onClose, 
  onNavigate, 
  currentIndex, 
  totalMedia,
  currentYear
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          onNavigate('prev');
          break;
        case 'ArrowRight':
          event.preventDefault();
          onNavigate('next');
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate, onClose]);

  // Reset video state when media changes
  useEffect(() => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [mediaUrl]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNavigate('next');
    }
    if (isRightSwipe) {
      onNavigate('prev');
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      ref={modalRef}
    >
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        
        {/* Navigation buttons */}
        <button 
          className="modal-nav modal-nav-prev" 
          onClick={() => onNavigate('prev')}
          aria-label="Previous media"
        >
          ‹
        </button>
        <button 
          className="modal-nav modal-nav-next" 
          onClick={() => onNavigate('next')}
          aria-label="Next media"
        >
          ›
        </button>

        {/* Render image or video */}
        {mediaType === 'image' ? (
          <img src={mediaUrl} alt="Enlarged view" className="modal-image" />
        ) : (
          <div className="modal-video-container" onClick={handleVideoClick}>
            <video 
              ref={videoRef}
              src={mediaUrl} 
              className="modal-video"
              onEnded={handleVideoEnded}
              controls={false}
            />
            {!isVideoPlaying && (
              <div className="video-play-overlay">
                <div className="play-button">▶</div>
              </div>
            )}
          </div>
        )}
        
        {/* Media counter with year */}
        <div className="modal-counter">
          {typeof currentYear === 'number'
            ? `${currentYear} - ${currentIndex + 1} / ${totalMedia}`
            : `${currentIndex + 1} / ${totalMedia}`}
        </div>
      </div>
    </div>
  );
};

export default ImageModal; 