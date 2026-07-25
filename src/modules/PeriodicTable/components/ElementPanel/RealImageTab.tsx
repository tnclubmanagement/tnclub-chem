import React, { useState, useEffect } from 'react';

interface RealImageTabProps {
  elementName: string;
}

export const RealImageTab: React.FC<RealImageTabProps> = ({ elementName }) => {
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setLoading(true);
    // Pollinations AI prompt for macro element photography
    const promptName = elementName.split(' ')[0]; // Handle cases like "Iron (Fe)"
    const url = `https://image.pollinations.ai/prompt/macro%20photography%20of%20raw%20${promptName}%20element%20material%20high%20resolution%20studio%20lighting%20black%20background?width=800&height=600&nologo=true`;
    
    // Preload image
    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setLoading(false);
    };
    img.onerror = () => {
      setLoading(false); // Even if it fails, stop loading
    };
    img.src = url;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [elementName]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading && (
        <div 
          style={{ 
            position: 'absolute', 
            width: '40px', 
            height: '40px', 
            border: '3px solid rgba(255,255,255,0.2)', 
            borderTopColor: '#0ea5e9', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }} 
        />
      )}
      {!loading && imageUrl && (
        <img 
          src={imageUrl} 
          alt={`Hình ảnh thực tế của ${elementName}`} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, animation: 'fadeIn 0.5s ease' }} 
        />
      )}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(1.05); } to { opacity: 0.8; transform: scale(1); } }
      `}</style>
    </div>
  );
};
