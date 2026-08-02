import React, { useState } from 'react';

interface AtomicOrbitalViewerProps {
  orbitalType?: 's' | 'p';
}

export const AtomicOrbitalViewer: React.FC<AtomicOrbitalViewerProps> = () => {
  const [orbital, setOrbital] = useState<'s' | 'px' | 'py' | 'pz'>('s');

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.75)',
      border: '1px solid rgba(0, 247, 255, 0.3)',
      borderRadius: '16px',
      padding: '20px',
      margin: '20px 0',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ margin: 0, color: '#00f7ff', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
          ⚛️ Mô phỏng 3D Hình Dạng Orbital Electron
        </h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['s', 'px', 'py', 'pz'] as const).map(type => (
            <button
              key={type}
              onClick={() => setOrbital(type)}
              style={{
                background: orbital === type ? '#00f7ff' : 'rgba(255,255,255,0.05)',
                color: orbital === type ? '#0f172a' : '#94a3b8',
                border: '1px solid rgba(0,247,255,0.3)',
                padding: '4px 12px',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {type === 's' ? 'Orbital s' : `Orbital ${type}`}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.95) 100%)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        {/* Core Nucleus */}
        <div style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: '#ff0055',
          boxShadow: '0 0 20px #ff0055, 0 0 40px #ff0055',
          zIndex: 10
        }} />

        {/* Orbital Shapes Visual */}
        {orbital === 's' && (
          <div style={{
            position: 'absolute',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: '2px dashed #00f7ff',
            background: 'radial-gradient(circle, rgba(0, 247, 255, 0.35) 0%, rgba(0, 247, 255, 0.05) 70%, transparent 100%)',
            boxShadow: '0 0 30px rgba(0, 247, 255, 0.4)',
            animation: 'pulseGlow 3s ease-in-out infinite'
          }} />
        )}

        {orbital === 'px' && (
          <div style={{ position: 'absolute', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{
              width: '80px', height: '60px', borderRadius: '50% 10% 10% 50%',
              background: 'radial-gradient(circle, rgba(0, 255, 128, 0.6), transparent)',
              boxShadow: '0 0 20px #00ff80'
            }} />
            <div style={{
              width: '80px', height: '60px', borderRadius: '10% 50% 50% 10%',
              background: 'radial-gradient(circle, rgba(0, 255, 128, 0.6), transparent)',
              boxShadow: '0 0 20px #00ff80'
            }} />
          </div>
        )}

        {orbital === 'py' && (
          <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <div style={{
              width: '60px', height: '80px', borderRadius: '50% 50% 10% 10%',
              background: 'radial-gradient(circle, rgba(255, 26, 219, 0.6), transparent)',
              boxShadow: '0 0 20px #ff1adb'
            }} />
            <div style={{
              width: '60px', height: '80px', borderRadius: '10% 10% 50% 50%',
              background: 'radial-gradient(circle, rgba(255, 26, 219, 0.6), transparent)',
              boxShadow: '0 0 20px #ff1adb'
            }} />
          </div>
        )}

        {orbital === 'pz' && (
          <div style={{ position: 'absolute', display: 'flex', gap: '8px', alignItems: 'center', transform: 'rotate(45deg)' }}>
            <div style={{
              width: '75px', height: '65px', borderRadius: '50% 20% 20% 50%',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6), transparent)',
              boxShadow: '0 0 20px #ffd700'
            }} />
            <div style={{
              width: '75px', height: '65px', borderRadius: '20% 50% 50% 20%',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6), transparent)',
              boxShadow: '0 0 20px #ffd700'
            }} />
          </div>
        )}
      </div>

      <p style={{ margin: '12px 0 0 0', color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
        {orbital === 's' && 'Orbital s có dạng hình cầu đối xứng 3 chiều xung quanh hạt nhân.'}
        {orbital === 'px' && 'Orbital px hình số 8 nổi định hướng nằm ngang trên trục X.'}
        {orbital === 'py' && 'Orbital py hình số 8 nổi định hướng thẳng đứng trên trục Y.'}
        {orbital === 'pz' && 'Orbital pz hình số 8 nổi định hướng nghiêng trên trục Z trong không gian.'}
      </p>
    </div>
  );
};
