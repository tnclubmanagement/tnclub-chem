import { useVirtualLabStore } from '../store/useVirtualLabStore';
import { useLanguageStore } from '../../../i18n/useTranslation';
import { useSettingsStore } from '../../Settings/store/useSettingsStore';

// Preload voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

const preprocessVietnameseTTS = (text: string): string => {
  let processed = text;
  
  // Dictionary of chemical/English terms and their Vietnamese phonetic equivalents
  const dictionary: Record<string, string> = {
    // Basic terms
    'Acid': 'A-xít', 'acid': 'a-xít', 'Axit': 'A-xít', 'axit': 'a-xít',
    'Base': 'Ba-zơ', 'base': 'ba-zơ', 'Bazo': 'Ba-zơ', 'bazo': 'ba-zơ',
    'Oxy': 'Ô-xy', 'oxy': 'ô-xy', 'Oxygen': 'Ô-xy',
    'Hydro': 'Hi-đrô', 'hydro': 'hi-đrô', 'Hydrogen': 'Hi-đrô',
    'Carbon': 'Các-bon', 'carbon': 'các-bon',
    'Nitơ': 'Ni-tơ', 'Nitrogen': 'Ni-tơ',
    'Natri': 'Na-tri', 'Sodium': 'Na-tri',
    'Kali': 'Ka-li', 'Potassium': 'Ka-li',
    'Ethanol': 'Ê-ta-non', 'ethanol': 'ê-ta-non',
    'Chlorine': 'Cờ-lo', 'Clo': 'Cờ-lo',
    'Helium': 'Hê-li', 'Phenol': 'Phê-non',
    'phthalein': 'ta-lê-in', 'Phenolphthalein': 'Phê-non-ta-lê-in',
    'H2O': 'Hát 2 Ô', 'CO2': 'Cê Ô 2', 'NaCl': 'Na-tri cờ-lua',
    'HCl': 'Hát Xê Lờ', 'NaOH': 'Nờ A Ô Hát', 'CuSO4': 'Đồng Sun-phát',
    'Orbital': 'Ô-bi-tan', 'orbital': 'ô-bi-tan',
    '3D': 'Ba Đê', 'Bohr': 'Bo',
    'electron': 'ê-lếch-tờ-rông', 'Electron': 'Ê-lếch-tờ-rông', 'electrons': 'ê-lếch-tờ-rông',
    'Proton': 'Pờ-rô-tôn', 'proton': 'pờ-rô-tôn',
    'Neutron': 'Nơ-tơ-rông', 'neutron': 'nơ-tơ-rông',
    'Ion': 'I-ông', 'ion': 'i-ông', 'Ions': 'I-ông', 'ions': 'i-ông',
    'pH': 'Pê Hát', 'amu': 'a mờ u',
    'Capsaicin': 'Cạp-sai-xin', 'capsaicin': 'cạp-sai-xin',
    'Phosphor': 'Phốt-pho', 'phosphor': 'phốt-pho',
    'Casein': 'Ca-zê-in', 'casein': 'ca-zê-in',
    'Amine': 'A-min', 'amine': 'a-min',
    'Enzyme': 'En-zim', 'enzyme': 'en-zim',
    'Fluorine': 'Phờ-lo', 'Francium': 'Phờ-răng-xi', 'Pauling': 'Pao-linh',
    'px': 'pê x', 'py': 'pê y', 'pz': 'pê zét', 'AO': 'A Ô',
    'Z': 'Zét',
    'Quy': 'Qui', 'quy': 'qui',
    
    // Additional Elements
    'Lithium': 'Li-ti', 'Beryllium': 'Bê-ri', 'Boron': 'Bo',
    'Neon': 'Nê-ông', 'Magnesium': 'Ma-giê', 'Aluminum': 'Nhôm', 'Aluminium': 'Nhôm',
    'Silicon': 'Si-líc', 'Phosphorus': 'Phốt-pho', 'Sulfur': 'Xun-phua',
    'Argon': 'Ác-gông', 'Calcium': 'Can-xi', 'Scandium': 'Xờ-can-đi',
    'Titanium': 'Ti-tan', 'Vanadium': 'Va-na-đi', 'Chromium': 'Cờ-rôm',
    'Manganese': 'Man-gan', 'Iron': 'Sắt', 'Cobalt': 'Cô-ban',
    'Nickel': 'Ni-ken', 'Copper': 'Đồng', 'Zinc': 'Kẽm',
    'Gallium': 'Ga-li', 'Germanium': 'Géc-ma-ni', 'Arsenic': 'A-sen',
    'Selenium': 'Xê-len', 'Bromine': 'Bờ-rôm', 'Krypton': 'Cờ-ríp-tôn',
    'Rubidium': 'Ru-bi-đi', 'Strontium': 'Xì-trôn-ti', 'Yttrium': 'Ít-tri',
    'Zirconium': 'Zic-cô-ni', 'Silver': 'Bạc', 'Cadmium': 'Cát-mi',
    'Indium': 'In-đi', 'Tin': 'Thiếc', 'Antimony': 'Ăn-ti-mon',
    'Tellurium': 'Te-lu', 'Iodine': 'I-ốt', 'Xenon': 'Xê-nông',
    'Cesium': 'Xê-zi', 'Barium': 'Ba-ri', 'Tungsten': 'Von-phờ-ram',
    'Platinum': 'Bạch kim', 'Gold': 'Vàng', 'Mercury': 'Thủy ngân',
    'Lead': 'Chì', 'Bismuth': 'Bít-mút', 'Polonium': 'Pô-lô-ni',
    'Astatine': 'A-xta-tin', 'Radon': 'Ra-đông', 'Radium': 'Ra-đi',
    'Uranium': 'U-ra-ni', 'Plutonium': 'Pờ-lu-tô-ni'
  };

  // Replace using unicode letter boundaries to avoid breaking partial matches inside Vietnamese words
  for (const [eng, vie] of Object.entries(dictionary)) {
    const regex = new RegExp(`(?<!\\p{L})${eng}(?!\\p{L})`, 'giu');
    processed = processed.replace(regex, vie);
  }

  // Handle standalone specific letters that are common in chemistry (s, p, d, f)
  processed = processed.replace(/(?<!\p{L})(s)(?!\p{L})/gu, 'ét');
  processed = processed.replace(/(?<!\p{L})(p)(?!\p{L})/gu, 'pê');
  processed = processed.replace(/(?<!\p{L})(d)(?!\p{L})/gu, 'đê');
  processed = processed.replace(/(?<!\p{L})(f)(?!\p{L})/gu, 'ép');

  return processed;
};

export const speakText = (text: string, options?: { forceLang?: 'en' | 'vi' }): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Web Speech API is not supported in this browser.');
      resolve();
      return;
    }
    
    const settings = useSettingsStore.getState();
    const labState = useVirtualLabStore.getState();

    const currentLang = options?.forceLang || useLanguageStore.getState().language;
    const isMuted = labState.isMuted || !settings.soundEnabled;

    if (isMuted) {
      resolve();
      return;
    }

    const ttsSpeed = settings.ttsSpeed || labState.ttsSpeed || 1.0;
    const ttsVoiceURI = currentLang === 'en' 
      ? (settings.ttsVoiceURI_EN || labState.ttsVoiceURI_EN) 
      : (settings.ttsVoiceURI_VI || labState.ttsVoiceURI_VI);

    // Remove HTML tags for plain text reading
    let cleanText = text.replace(/<[^>]*>?/gm, '');

    // Strip out markdown punctuation and math symbols that shouldn't be pronounced literally
    // E.g., *, -, +, =, ≈, (, ), [, ], {, }, &, #, _, ~, `, |, ^, \
    cleanText = cleanText.replace(/[\*\-\+=\≈\(\)\[\]\{\}\&\#\_\~\`\|\^\\]/g, ' ');

    // Strip out emojis
    cleanText = cleanText.replace(/[\u{1F600}-\u{1F64F}]/gu, '');
    cleanText = cleanText.replace(/[\u{1F300}-\u{1F5FF}]/gu, '');
    cleanText = cleanText.replace(/[\u{1F680}-\u{1F6FF}]/gu, '');
    cleanText = cleanText.replace(/[\u{2600}-\u{26FF}]/gu, '');
    cleanText = cleanText.replace(/[\u{2700}-\u{27BF}]/gu, '');
    cleanText = cleanText.replace(/[\u{1F900}-\u{1F9FF}]/gu, '');
    cleanText = cleanText.replace(/[\u{1FA70}-\u{1FAFF}]/gu, '');

    // Condense multiple spaces and trim
    cleanText = cleanText.replace(/\s+/g, ' ').trim();
    
    // Apply phonetic preprocessing for Vietnamese
    if (currentLang === 'vi') {
      cleanText = preprocessVietnameseTTS(cleanText);
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = currentLang === 'en' ? 'en-US' : 'vi-VN'; 
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
    }
    
    if (!utterance.voice) {
      // Find default voice matching the current language
      if (currentLang === 'en') {
        const enVoice = voices.find(v => v.lang.startsWith('en') || v.lang.includes('EN'));
        if (enVoice) utterance.voice = enVoice;
      } else {
        const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
        if (viVoice) utterance.voice = viVoice;
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
