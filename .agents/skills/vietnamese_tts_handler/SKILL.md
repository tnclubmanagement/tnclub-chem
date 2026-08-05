---
name: vietnamese_tts_handler
description: Kỹ năng xử lý Text-to-Speech (TTS) đa ngôn ngữ, đặc biệt là cách Việt hóa âm thanh (Phonetic Preprocessing) cho các thuật ngữ Hóa Học, Vật Lý và loại bỏ rác ký tự.
---

# Kỹ năng xử lý Text-to-Speech (TTS) đa ngôn ngữ & Tiếng Việt

Khi làm việc với Web Speech API (`window.speechSynthesis`) trong môi trường đa ngôn ngữ (đặc biệt là Anh - Việt) chứa các thuật ngữ khoa học, bạn PHẢI áp dụng các nguyên tắc sau để giọng đọc không bị "phá hủy".

## 1. Tách biệt Cài đặt Giọng đọc (Dual-Voice Configuration)
Web Speech API có sự khác biệt rất lớn giữa các bộ đọc (voices). Giọng Tiếng Việt (`vi-VN`) sẽ đánh vần hoặc đọc sai hoàn toàn tiếng Anh. 
- **Luôn tách biệt State:** Lưu trữ riêng biệt `ttsVoiceURI_EN` và `ttsVoiceURI_VI`.
- **Luôn ưu tiên `lang`:** Khi gọi `new SpeechSynthesisUtterance()`, hãy chắc chắn gán đúng `utterance.lang` (ví dụ `vi-VN` hoặc `en-US`) và tìm voice phù hợp theo ngôn ngữ hiển thị hiện tại.

## 2. Tiền xử lý văn bản (Text Sanitization) - Loại bỏ rác
Các engine TTS sẽ đọc nguyên văn các ký tự đặc biệt và Emoji, dẫn đến trải nghiệm nghe rất thảm họa (ví dụ: "Bóng đèn", "Dấu sao", "Mở ngoặc").
**Quy tắc:** TRƯỚC KHI truyền text vào Utterance, phải lọc bỏ rác:
```typescript
// Xóa HTML tags
let cleanText = text.replace(/<[^>]*>?/gm, '');

// Xóa Markdown & Math symbols (chuyển thành khoảng trắng để ngắt nhịp)
cleanText = cleanText.replace(/[\*\-\+=\≈\(\)\[\]\{\}\&\#\_\~\`\|\^\\]/g, ' ');

// Xóa toàn bộ Emoji bằng Regex Unicode Blocks
cleanText = cleanText.replace(/[\u{1F600}-\u{1F64F}]/gu, ''); // Emoticons
cleanText = cleanText.replace(/[\u{1F300}-\u{1F5FF}]/gu, ''); // Misc Symbols
cleanText = cleanText.replace(/[\u{1F680}-\u{1F6FF}]/gu, ''); // Transport/Map
cleanText = cleanText.replace(/[\u{2600}-\u{26FF}]/gu, '');
cleanText = cleanText.replace(/[\u{2700}-\u{27BF}]/gu, '');
cleanText = cleanText.replace(/[\u{1F900}-\u{1F9FF}]/gu, '');
cleanText = cleanText.replace(/[\u{1FA70}-\u{1FAFF}]/gu, '');

cleanText = cleanText.replace(/\s+/g, ' ').trim();
```

## 3. Từ điển Việt hóa Hóa Học (Phonetic Preprocessor)
Giọng đọc Tiếng Việt không thể tự động phát âm tiếng Anh. Phải sử dụng bộ từ điển dịch âm (Phonetic Dictionary) để Việt hóa các từ Hóa học/Vật lý trước khi đọc.

**CẢNH BÁO QUAN TRỌNG VỀ JAVASCRIPT REGEX & TIẾNG VIỆT:**
JS Regex Word Boundary `\b` **KHÔNG** nhận diện các ký tự có dấu của Tiếng Việt (như `ả`, `ệ`, `ô`). Nếu dùng `\bpH\b` trên chữ `phải`, chữ `ả` sẽ bị coi là dấu ngắt từ, khiến chữ `ph` bị thay thế sai lệch.
**Luôn sử dụng Unicode Letter Boundaries `(?<!\p{L})` và `(?!\p{L})`** với cờ `u` (Unicode).

```typescript
const dictionary: Record<string, string> = {
  // Hợp chất & Thuật ngữ
  'Acid': 'A-xít', 'Base': 'Ba-zơ', 'Oxy': 'Ô-xy', 'Hydro': 'Hi-đrô',
  'Carbon': 'Các-bon', 'Nitơ': 'Ni-tơ', 'Natri': 'Na-tri', 'Kali': 'Ka-li',
  'Ethanol': 'Ê-ta-non', 'Chlorine': 'Cờ-lo', 'Helium': 'Hê-li',
  // Công thức
  'H2O': 'Hát 2 Ô', 'CO2': 'Cê Ô 2', 'NaCl': 'Na-tri cờ-lua', 'HCl': 'Hát Xê Lờ',
  // Hạt & Vật lý
  'Proton': 'Pờ-rô-tôn', 'Neutron': 'Nơ-tơ-rông', 'Electron': 'Ê-lếch-tờ-rông',
  'Ion': 'I-ông', 'pH': 'Pê Hát', 'Orbital': 'Ô-bi-tan', '3D': 'Ba Đê'
};

// Dùng (?<!\p{L}) và (?!\p{L}) thay vì \b để an toàn với Tiếng Việt
for (const [eng, vie] of Object.entries(dictionary)) {
  const regex = new RegExp(`(?<!\\p{L})${eng}(?!\\p{L})`, 'giu');
  processed = processed.replace(regex, vie);
}

// Thay thế các ký tự riêng lẻ (vd: s, p, d, f)
processed = processed.replace(/(?<!\p{L})(s)(?!\p{L})/gu, 'ét');
processed = processed.replace(/(?<!\p{L})(p)(?!\p{L})/gu, 'pê');
processed = processed.replace(/(?<!\p{L})(d)(?!\p{L})/gu, 'đê');
processed = processed.replace(/(?<!\p{L})(f)(?!\p{L})/gu, 'ép');
```

## 4. Xử lý Lỗi Cố hữu của Chrome/macOS
Hàm `window.speechSynthesis.cancel()` đôi khi khiến phát ngôn tiếp theo bị nuốt âm. Luôn đặt `setTimeout` nhỏ khi chuyển giọng.
```typescript
if (window.speechSynthesis.speaking) {
  window.speechSynthesis.cancel();
  setTimeout(() => window.speechSynthesis.speak(utterance), 50);
} else {
  window.speechSynthesis.speak(utterance);
}
```
