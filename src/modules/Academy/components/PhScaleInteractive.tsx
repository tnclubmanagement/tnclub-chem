import React, { useState } from 'react';

export const PhScaleInteractive: React.FC = () => {
  const [ph, setPh] = useState<number>(7.0);

  const getPhInfo = (val: number) => {
    if (val < 3) return { type: 'Axit Mạnh', color: '#ef4444', hConc: '10⁻¹ - 10⁻³ M', sample: 'Axit Dạ Dày, Nước Chanh (pH 2)' };
    if (val < 7) return { type: 'Axit Yếu', color: '#f97316', hConc: '10⁻⁴ - 10⁻⁶ M', sample: 'Cà Phê, Sữa tươi (pH 6)' };
    if (val === 7) return { type: 'Trung Tính', color: '#22c55e', hConc: '10⁻⁷ M', sample: 'Nước Tinh Khiết (pH 7)' };
    if (val <= 11) return { type: 'Bazơ Yếu', color: '#06b6d4', hConc: '10⁻⁸ - 10⁻¹¹ M', sample: 'Baking Soda, Xà phòng (pH 9)' };
    return { type: 'Bazơ Mạnh / Kiềm', color: '#3b82f6', hConc: '10⁻¹² - 10⁻¹⁴ M', sample: 'Dung dịch NaOH, Thuốc tẩy (pH 13)' };
  };

  const info = getPhInfo(ph);

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.75)',
      border: `1px solid ${info.color}`,
      borderRadius: '16px',
      padding: '20px',
      margin: '20px 0',
      boxShadow: `0 0 25px ${info.color}30`,
      backdropFilter: 'blur(12px)',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ margin: 0, color: info.color, fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
          🧪 Thang Đo Nồng Độ pH & Môi Trường Dung Dịch
        </h4>
        <span style={{
          background: info.color,
          color: '#ffffff',
          fontWeight: 800,
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.9rem'
        }}>
          pH = {ph.toFixed(1)} ({info.type})
        </span>
      </div>

      {/* Interactive Slider */}
      <div style={{ margin: '20px 0' }}>
        <input
          type="range"
          min="0"
          max="14"
          step="0.1"
          value={ph}
          onChange={(e) => setPh(parseFloat(e.target.value))}
          style={{
            width: '100%',
            height: '12px',
            borderRadius: '6px',
            appearance: 'none',
            background: 'linear-gradient(to right, #ef4444 0%, #f97316 25%, #22c55e 50%, #06b6d4 75%, #3b82f6 100%)',
            outline: 'none',
            cursor: 'pointer'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.75rem', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
          <span>0 (Axit cực mạnh)</span>
          <span>7 (Trung tính)</span>
          <span>14 (Bazơ cực mạnh)</span>
        </div>
      </div>

      {/* Dynamic Spec Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        background: 'rgba(2, 6, 23, 0.6)',
        padding: '14px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Nồng độ [H⁺]:</div>
          <div style={{ color: info.color, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{info.hConc}</div>
        </div>
        <div>
          <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Ví dụ thực tế:</div>
          <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{info.sample}</div>
        </div>
      </div>
    </div>
  );
};
