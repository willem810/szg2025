import React, { useEffect, useRef, useState } from 'react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  currentIndex: number;
  totalImages: number;
  currentYear: number;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  imageUrl, 
  onClose, 
  onNavigate, 
  currentIndex, 
  totalImages,
  currentYear
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
          aria-label="Previous image"
        >
          ‹
        </button>
        <button 
          className="modal-nav modal-nav-next" 
          onClick={() => onNavigate('next')}
          aria-label="Next image"
        >
          ›
        </button>

        <img src={imageUrl} alt="Enlarged view" className="modal-image" />
        
        {/* Image counter with year */}
        <div className="modal-counter">
          {currentYear} - {currentIndex + 1} / {totalImages}
        </div>
      </div>
    </div>
  );
};

export default ImageModal; 