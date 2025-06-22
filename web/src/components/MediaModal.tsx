import React, { useEffect, useRef, useState } from 'react';

interface MediaModalProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  currentIndex: number;
  totalMedia: number;
  currentYear: number;
}

const MediaModal: React.FC<MediaModalProps> = ({ 
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

  // Pause video when navigating away
  useEffect(() => {
    if (videoRef.current && mediaType === 'video') {
      videoRef.current.pause();
    }
  }, [mediaUrl, mediaType]);

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

        {/* Media content */}
        <div className="modal-media">
          {mediaType === 'image' ? (
            <img src={mediaUrl} alt="Enlarged view" className="modal-image" />
          ) : (
            <video 
              ref={videoRef}
              src={mediaUrl}
              controls
              autoPlay
              className="modal-video"
            >
              <source src={mediaUrl} type={`video/${mediaUrl.split('.').pop()}`} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        {/* Media counter with year */}
        <div className="modal-counter">
          {currentYear} - {currentIndex + 1} / {totalMedia}
        </div>
      </div>
    </div>
  );
};

export default MediaModal; 