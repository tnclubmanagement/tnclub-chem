let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

// Initialize audio context on first user interaction to comply with browser autoplay policies
if (typeof window !== 'undefined') {
  const init = () => {
    initAudio();
    document.removeEventListener('pointerdown', init);
    document.removeEventListener('keydown', init);
  };
  document.addEventListener('pointerdown', init);
  document.addEventListener('keydown', init);
}

export const playSciFiSound = (type: 'hover' | 'click', soundEnabled: boolean) => {
  if (!soundEnabled || !audioCtx) return;
  
  // Browsers require a user gesture to resume. 
  // Hover doesn't count. If it's still suspended during a hover, skip it.
  if (audioCtx.state === 'suspended') {
    if (type === 'hover') return;
    audioCtx.resume();
  }
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  const now = audioCtx.currentTime;
  if (type === 'hover') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.1);
    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'click') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.15);
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
  }
};
