import React, { useState, useEffect } from 'react';

interface ImageGalleryProps {
  year: number;
  onImageClick: (imageUrl: string) => void;
  onVideoClick: (videoUrl: string) => void;
}

interface MediaItem {
  path: string;
  type: 'image' | 'video';
  url: string;
}

interface GitHubFile {
  name: string;
  path: string;
  type: string;
  download_url: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ year, onImageClick, onVideoClick }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMediaItems = async () => {
      try {
        setLoading(true);
        setError(null);

        // GitHub API URL - replace with your actual repo details
        // Format: https://api.github.com/repos/{owner}/{repo}/contents/{path}
        const apiUrl = `https://api.github.com/repos/willem810/szg2025/contents/web/public/timeline/${year}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const files: GitHubFile[] = await response.json();
        
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
        const videoExtensions = ['.mp4', '.webm', '.mov', '.avi'];
        
        const items: MediaItem[] = files
          .filter(file => file.type === 'file')
          .map(file => {
            const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
            let type: 'image' | 'video' | null = null;
            
            if (imageExtensions.includes(ext)) {
              type = 'image';
            } else if (videoExtensions.includes(ext)) {
              type = 'video';
            }
            
            return {
              path: file.name,
              type: type!,
              url: `/timeline/${year}/${file.name}` // Use relative URL for GitHub Pages
            };
          })
          .filter(item => item.type !== null)
          .sort((a, b) => a.path.localeCompare(b.path));

        setMediaItems(items);
      } catch (error) {
        console.error('Error loading media items:', error);
        setError('Failed to load media items');
        
        // Fallback to static JSON if GitHub API fails
        try {
          const fallbackResponse = await fetch(`/timeline/${year}/media-list.json`);
          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json();
            setMediaItems(data.media || []);
            setError(null);
          }
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadMediaItems();
  }, [year]);

  if (loading) {
    return <div className="image-gallery-loading">Loading media...</div>;
  }

  if (error) {
    return <div className="image-gallery-error">Error: {error}</div>;
  }

  return (
    <div className="image-gallery">
      {mediaItems.length === 0 ? (
        <div className="no-media-message">No media found for {year}</div>
      ) : (
        mediaItems.map((item) => (
          <div 
            key={item.path} 
            className={item.type === 'image' ? 'image-container' : 'video-container'}
            onClick={() => item.type === 'image' ? onImageClick(item.url) : onVideoClick(item.url)}
          >
            {item.type === 'image' ? (
              <img 
                src={item.url} 
                alt={`Image from ${year}`}
                loading="lazy"
              />
            ) : (
              <>
                <video 
                  src={item.url}
                  preload="metadata"
                  muted
                />
                <div className="video-play-overlay">
                  <div className="play-button">▶</div>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGallery; 