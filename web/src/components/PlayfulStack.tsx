import React, { useRef, useState, useEffect } from 'react';
import ImageModal from './ImageModal';

const videoModules = import.meta.glob('../assets/images/adjtes/*.mp4', { eager: true });
const videos = Object.values(videoModules).map((mod: any) => mod.default);

const rotations = [
  -8, 5, -3, 10, -5, 7, -12
];

const PlayfulStack: React.FC = () => {
  const [order, setOrder] = useState(videos.map((_, i) => i));
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0); // index in order[]
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // When the top video changes, play it
  useEffect(() => {
    const topIdx = order[0];
    const topVideo = videoRefs.current[topIdx];
    if (topVideo) {
      topVideo.currentTime = 0;
      topVideo.play();
    }
  }, [order]);

  const handleEnded = () => {
    setOrder((prevOrder) => {
      const [first, ...rest] = prevOrder;
      return [...rest, first];
    });
  };

  const handleTopVideoClick = () => {
    setModalIndex(0); // always start with the top video
    setModalOpen(true);
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    setModalIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % order.length;
      } else {
        return prev === 0 ? order.length - 1 : prev - 1;
      }
    });
  };

  return (
    <>
      <div style={{ position: 'relative', width: '320px', height: '320px', margin: '2rem auto' }}>
        {order.map((videoIdx, stackIdx) => {
          const src = videos[videoIdx];
          return (
            <video
              key={src}
              ref={el => { videoRefs.current[videoIdx] = el; }}
              src={src}
              autoPlay={stackIdx === 0}
              loop={false}
              muted
              playsInline
              onEnded={stackIdx === 0 ? handleEnded : undefined}
              onClick={stackIdx === 0 ? handleTopVideoClick : undefined}
              style={{
                position: 'absolute',
                top: `${30 + stackIdx * 10}px`,
                left: `${30 + stackIdx * 10}px`,
                width: '200px',
                height: '200px',
                borderRadius: '18px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                transform: `rotate(${rotations[stackIdx % rotations.length]}deg)`,
                zIndex: order.length - stackIdx,
                border: '4px solid #fff',
                objectFit: 'cover',
                background: '#000',
                transition: 'transform 0.3s',
                cursor: stackIdx === 0 ? 'pointer' : 'default',
              }}
            />
          );
        })}
      </div>
      {modalOpen && (
        <ImageModal
          mediaUrl={videos[order[modalIndex]]}
          mediaType="video"
          onClose={() => setModalOpen(false)}
          onNavigate={handleNavigate}
          currentIndex={modalIndex}
          totalMedia={order.length}
          currentYear={undefined}
        />
      )}
    </>
  );
};

export default PlayfulStack; 