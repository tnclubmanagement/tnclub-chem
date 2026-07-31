import { ELEMENTS, type ElementData } from '../data/elements';

export interface GroupInfo {
  id: number;
  name: string;
  categoryName: string;
  valenceElectrons: string;
  characteristics: string;
  chemicalBehavior: string;
  color: string;
}

export interface PeriodInfo {
  id: number;
  name: string;
  electronShells: number;
  description: string;
  trend: string;
}

export const GROUPS_DATA: Record<number, GroupInfo> = {
  1: {
    id: 1,
    name: 'Nhóm 1 (1A) — Kim Loại Kiềm',
    categoryName: 'Alkali Metals',
    valenceElectrons: '1 electron lớp ngoài cùng (ns¹)',
    characteristics: 'Kim loại mềm, màu trắng bạc, nhẹ, nhiệt độ nóng chảy thấp. Hoạt động hóa học cực kỳ mạnh.',
    chemicalBehavior: 'Dễ dàng nhường 1 electron để tạo ion M⁺. Tác dụng mãnh liệt với Nước tạo ra dung dịch kiềm và giải phóng khí H₂.',
    color: '#ef4444',
  },
  2: {
    id: 2,
    name: 'Nhóm 2 (2A) — Kim Loại Kiềm Thổ',
    categoryName: 'Alkaline Earth Metals',
    valenceElectrons: '2 electron lớp ngoài cùng (ns²)',
    characteristics: 'Kim loại tương đối cứng hơn nhóm 1, màu trắng xám. Hoạt động hóa học mạnh.',
    chemicalBehavior: 'Nhường 2 electron tạo ion M²⁺. Phản ứng với oxi và axit giải phóng H₂. Tạo hợp chất kiềm nhẹ hơn nhóm 1.',
    color: '#f97316',
  },
  3: {
    id: 3,
    name: 'Nhóm 3 (3B) — Kim Loại Chuyển Tiếp',
    categoryName: 'Transition Metals',
    valenceElectrons: 'Điền bão hòa phân lớp d (ns² (n-1)d¹)',
    characteristics: 'Kim loại cứng, dẫn điện và nhiệt tốt, nhiệt độ nóng chảy cao. Gồm cả các kim loại hiếm.',
    chemicalBehavior: 'Có nhiều số oxi hóa khác nhau (+2, +3). Thường tạo phức chất màu sắc.',
    color: '#eab308',
  },
  4: {
    id: 4,
    name: 'Nhóm 4 (4B) — Nhóm Titan',
    categoryName: 'Transition Metals',
    valenceElectrons: '4 electron hóa trị (ns² (n-1)d²)',
    characteristics: 'Kim loại siêu bền, chịu nhiệt cao, chống ăn mòn hóa học vượt trội.',
    chemicalBehavior: 'Số oxi hóa phổ biến nhất là +4. Titan được ứng dụng rộng rãi trong hàng không vũ trụ.',
    color: '#eab308',
  },
  5: {
    id: 5,
    name: 'Nhóm 5 (5B) — Nhóm Vanadi',
    categoryName: 'Transition Metals',
    valenceElectrons: '5 electron hóa trị (ns² (n-1)d³)',
    characteristics: 'Kim loại chịu lực tốt, được dùng làm hợp kim thép siêu cứng.',
    chemicalBehavior: 'Có nhiều trạng thái oxi hóa từ +2 đến +5 với nhiều màu sắc dung dịch đặc trưng.',
    color: '#eab308',
  },
  6: {
    id: 6,
    name: 'Nhóm 6 (6B) — Nhóm Crôm',
    categoryName: 'Transition Metals',
    valenceElectrons: '6 electron hóa trị (ns¹ (n-1)d⁵)',
    characteristics: 'Crôm là kim loại cứng nhất trong tất cả kim loại, có màu ánh bạc sang trọng.',
    chemicalBehavior: 'Tạo lớp màng oxit mỏng bảo vệ kim loại khỏi bị gỉ (thép không gỉ / inox).',
    color: '#eab308',
  },
  7: {
    id: 7,
    name: 'Nhóm 7 (7B) — Nhóm Mangan',
    categoryName: 'Transition Metals',
    valenceElectrons: '7 electron hóa trị (ns² (n-1)d⁵)',
    characteristics: 'Kim loại có vai trò quan trọng trong luyện kim thép và sản xuất pin.',
    chemicalBehavior: 'Mangan có số oxi hóa phong phú từ +2 đến +7 (như KMnO₄ là chất oxi hóa mạnh).',
    color: '#eab308',
  },
  8: {
    id: 8,
    name: 'Nhóm 8 (8B) — Nhóm Sắt',
    categoryName: 'Transition Metals',
    valenceElectrons: '8 electron hóa trị (ns² (n-1)d⁶)',
    characteristics: 'Sắt là kim loại phổ biến nhất trên Trái Đất, có tính từ tính đặc trưng.',
    chemicalBehavior: 'Số oxi hóa phổ biến là +2 và +3. Xương sống của nền công nghiệp nặng.',
    color: '#eab308',
  },
  9: {
    id: 9,
    name: 'Nhóm 9 (8B) — Nhóm Coban',
    categoryName: 'Transition Metals',
    valenceElectrons: '9 electron hóa trị (ns² (n-1)d⁷)',
    characteristics: 'Kim loại màu ánh xám chì, có từ tính, chịu nhiệt độ cao cực tốt.',
    chemicalBehavior: 'Dùng làm nam châm vĩnh cửu siêu mạnh và hợp kim siêu chịu nhiệt.',
    color: '#eab308',
  },
  10: {
    id: 10,
    name: 'Nhóm 10 (8B) — Nhóm Niken',
    categoryName: 'Transition Metals',
    valenceElectrons: '10 electron hóa trị (ns² (n-1)d⁸ hoặc ns¹ (n-1)d⁹)',
    characteristics: 'Kim loại bóng đẹp, chống ăn mòn tốt, trơ ở nhiệt độ phòng.',
    chemicalBehavior: 'Dùng làm chất xúc tác trong nhiều phản ứng hóa học công nghiệp và mạ bảo vệ.',
    color: '#eab308',
  },
  11: {
    id: 11,
    name: 'Nhóm 11 (1B) — Kim Loại Tiền Tệ (Đồng, Bạc, Vàng)',
    categoryName: 'Coinage Metals',
    valenceElectrons: '11 electron hóa trị (ns¹ (n-1)d¹⁰)',
    characteristics: 'Dẫn điện và dẫn nhiệt tốt nhất trong tất cả các nguyên tố. Mềm, dẻo, dễ dát mỏng.',
    chemicalBehavior: 'Rất trơ về mặt hóa học (đặc biệt là Vàng và Bạch kim). Không bị gỉ trong không khí.',
    color: '#eab308',
  },
  12: {
    id: 12,
    name: 'Nhóm 12 (2B) — Nhóm Kẽm (Kẽm, Thủy Ngân)',
    categoryName: 'Transition Metals',
    valenceElectrons: '12 electron hóa trị (ns² (n-1)d¹⁰)',
    characteristics: 'Nhiệt độ nóng chảy thấp. Thủy ngân (Hg) là kim loại duy nhất ở dạng lỏng ở nhiệt độ phòng.',
    chemicalBehavior: 'Phân lớp d đã bão hòa nên có tính chất hơi khác các kim loại chuyển tiếp khác.',
    color: '#eab308',
  },
  13: {
    id: 13,
    name: 'Nhóm 13 (3A) — Nhóm Bo / Nhôm',
    categoryName: 'Boron Group',
    valenceElectrons: '3 electron lớp ngoài cùng (ns² np¹)',
    characteristics: 'Gồm á kim Bo và các kim loại nhẹ như Nhôm (Al). Nhôm là kim loại vỏ Trái Đất dồi dào nhất.',
    chemicalBehavior: 'Tạo hợp chất có số oxi hóa +3. Nhôm phản ứng mạnh nhưng có lớp oxit Al₂O₃ bảo vệ.',
    color: '#22c55e',
  },
  14: {
    id: 14,
    name: 'Nhóm 14 (4A) — Nhóm Cacbon / Silic',
    categoryName: 'Carbon Group',
    valenceElectrons: '4 electron lớp ngoài cùng (ns² np²)',
    characteristics: 'Tính chất chuyển từ phi kim (C) sang á kim bán dẫn (Si, Ge) rồi kim loại (Sn, Pb).',
    chemicalBehavior: 'Nền tảng của Hóa học Hữu cơ và Sự sống (Cacbon) và Ngành công nghiệp bán dẫn máy tính (Silic).',
    color: '#06b6d4',
  },
  15: {
    id: 15,
    name: 'Nhóm 15 (5A) — Nhóm Nitơ (Pnictogens)',
    categoryName: 'Nitrogen Group',
    valenceElectrons: '5 electron lớp ngoài cùng (ns² np³)',
    characteristics: 'Gồm khí Nitơ chiếm 78% khí quyển, Phốt pho thiết yếu cho DNA và năng lượng ATP.',
    chemicalBehavior: 'Có các trạng thái oxi hóa từ -3 đến +5. Phản ứng đa dạng tùy nguyên tố.',
    color: '#3b82f6',
  },
  16: {
    id: 16,
    name: 'Nhóm 16 (6A) — Nhóm Oxi (Chalcogens)',
    categoryName: 'Oxygen Group',
    valenceElectrons: '6 electron lớp ngoài cùng (ns² np⁴)',
    characteristics: 'Oxi cần thiết cho hô hấp và duy trì sự sống. Lưu huỳnh tạo hợp chất đa dạng.',
    chemicalBehavior: 'Tính oxi hóa mạnh. Dễ dàng nhận 2 electron để đạt cấu hình bền M²⁻.',
    color: '#8b5cf6',
  },
  17: {
    id: 17,
    name: 'Nhóm 17 (7A) — Nhóm Halogen',
    categoryName: 'Halogens',
    valenceElectrons: '7 electron lớp ngoài cùng (ns² np⁵)',
    characteristics: 'Phi kim hoạt động hóa học cực kỳ mạnh. Độc hại ở dạng đơn chất nhưng thiết yếu dưới dạng muối.',
    chemicalBehavior: 'Tính oxi hóa cực mạnh. Dễ dàng nhận 1 electron tạo ion Halogenua X⁻ độc lập.',
    color: '#8b5cf6',
  },
  18: {
    id: 18,
    name: 'Nhóm 18 (8A) — Khí Hiếm (Khí Trơ)',
    categoryName: 'Noble Gases',
    valenceElectrons: '8 electron bão hòa (ns² np⁶, He: 1s²)',
    characteristics: 'Khí đơn nguyên tử không màu, không mùi. Cực kỳ trơ về mặt hóa học.',
    chemicalBehavior: 'Cấu hình electron bão hòa vô cùng bền vững. Hầu như không tham gia phản ứng hóa học.',
    color: '#d946ef',
  },
};

export const PERIODS_DATA: Record<number, PeriodInfo> = {
  1: {
    id: 1,
    name: 'Chu Kỳ 1 — Chu Kỳ Nhỏ (2 Nguyên Tố)',
    electronShells: 1,
    description: 'Chu kỳ ngắn nhất trong bảng tuần hoàn chỉ chứa Hydro (H) và Hêli (He).',
    trend: 'Chỉ lấp đầy lớp electron thứ nhất (Lớp K, tối đa 2 electron).',
  },
  2: {
    id: 2,
    name: 'Chu Kỳ 2 — Chu Kỳ Nhỏ (8 Nguyên Tố)',
    electronShells: 2,
    description: 'Chứa các nguyên tố nền tảng sự sống: Cacbon, Nitơ, Oxi cùng kim loại kiềm Li, Be.',
    trend: 'Lấp đầy lớp L (từ 2s¹ đến 2s² 2p⁶). Tính kim loại giảm dần, tính phi kim tăng dần từ trái sang phải.',
  },
  3: {
    id: 3,
    name: 'Chu Kỳ 3 — Chu Kỳ Nhỏ (8 Nguyên Tố)',
    electronShells: 3,
    description: 'Gồm Natri, Magiê, Nhôm, Silic, Phốt pho, Lưu huỳnh, Clo và Argon.',
    trend: 'Lấp đầy phân lớp 3s và 3p. Bán kính nguyên tử giảm dần từ trái sang phải.',
  },
  4: {
    id: 4,
    name: 'Chu Kỳ 4 — Chu Kỳ Lớn (18 Nguyên Tố)',
    electronShells: 4,
    description: 'Chu kỳ lớn đầu tiên, chứa dãy kim loại chuyển tiếp 3d đầy quan trọng (Sắt, Đồng, Kẽm...).',
    trend: 'Bắt đầu điền electron vào phân lớp 3d sau 4s.',
  },
  5: {
    id: 5,
    name: 'Chu Kỳ 5 — Chu Kỳ Lớn (18 Nguyên Tố)',
    electronShells: 5,
    description: 'Chứa các nguyên tố kim loại quý như Bạc (Ag), Rubidi, Stronti và khí hiếm Xenon.',
    trend: 'Lấp đầy phân lớp 4d và 5p.',
  },
  6: {
    id: 6,
    name: 'Chu Kỳ 6 — Chu Kỳ Cực Lớn (32 Nguyên Tố)',
    electronShells: 6,
    description: 'Bao gồm họ Lanthan (Lanthanides), chứa Vàng (Au), Bạch kim (Pt), Thủy ngân (Hg).',
    trend: 'Điền phân lớp 4f và 5d.',
  },
  7: {
    id: 7,
    name: 'Chu Kỳ 7 — Chu Kỳ Cực Lớn (32 Nguyên Tố)',
    electronShells: 7,
    description: 'Bao gồm họ Actin (Actinides) chứa các nguyên tố phóng xạ như Uramium, Plutonium.',
    trend: 'Lấp đầy phân lớp 5f và 6d. Chứa các nguyên tố nhân tạo siêu nặng.',
  },
};

export const getElementsByGroup = (groupNum: number): ElementData[] => {
  return ELEMENTS.filter((el) => el.col === groupNum);
};

export const getElementsByPeriod = (periodNum: number): ElementData[] => {
  return ELEMENTS.filter((el) => el.row === periodNum);
};
