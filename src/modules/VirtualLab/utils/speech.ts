import { useVirtualLabStore } from '../store/useVirtualLabStore';

// Preload voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

export const speakText = (text: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Web Speech API is not supported in this browser.');
      resolve();
      return;
    }
    
    const { ttsSpeed, isMuted, ttsVoiceURI } = useVirtualLabStore.getState();
    if (isMuted) {
      resolve();
      return;
    }

    // Remove HTML tags for plain text reading
    const cleanText = text.replace(/<[^>]*>?/gm, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN'; 
    utterance.rate = ttsSpeed || 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    const voices = window.speechSynthesis.getVoices();
    
    if (ttsVoiceURI) {
      const selectedVoice = voices.find(v => v.voiceURI === ttsVoiceURI);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    } else {
      // Try to find a Vietnamese voice by default
      const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
      if (viVoice) {
        utterance.voice = viVoice;
      }
    }

    // Workaround for Chrome/macOS bug where cancel() drops the next utterance
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 50);
    } else {
      window.speechSynthesis.speak(utterance);
    }
  });
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
