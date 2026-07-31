export interface Mission {
  id: string;
  title: string;
  description: string;
  hint: string;
  targetReactionIds?: string[];
  targetEffect?: string;
  rewardText: string;
}

export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Khởi động Bùng nổ',
    description: 'Thả một kim loại kiềm nhẹ nhất vào nước cất.',
    hint: 'Gợi ý: Dùng Natri (Na) và Nước cất.',
    targetReactionIds: ['react_na_h2o', 'react_h2o_na'],
    rewardText: 'Bùm! Bạn đã thấy phản ứng mãnh liệt của Natri chưa?'
  },
  {
    id: 'm2',
    title: 'Ngọn Lửa Tím',
    description: 'Hòa Kali vào nước để tạo ra một ngọn lửa đặc trưng.',
    hint: 'Gợi ý: Dùng Kali (K) và Nước cất.',
    targetReactionIds: ['react_k_h2o', 'react_h2o_k'],
    rewardText: 'Tuyệt! Kali cháy trong nước với ngọn lửa màu tím nhạt.'
  },
  {
    id: 'm3',
    title: 'Bọt Khí Sữa',
    description: 'Cho Canxi phản ứng với nước để tạo dung dịch đục.',
    hint: 'Gợi ý: Dùng Canxi (Ca) và Nước cất.',
    targetReactionIds: ['react_ca_h2o', 'react_h2o_ca'],
    rewardText: 'Đúng rồi! Canxi phản ứng êm dịu hơn và tạo ra Canxi hiđroxit.'
  },
  {
    id: 'm4',
    title: 'Thử nghiệm Axit 1',
    description: 'Tạo khí Hiđro từ Magiê và Axit clohydric.',
    hint: 'Gợi ý: Dùng Magiê (Mg) và HCl.',
    targetReactionIds: ['react_mg_hcl', 'react_hcl_mg'],
    rewardText: 'Bọt khí nổi lên rất nhanh!'
  },
  {
    id: 'm5',
    title: 'Thử nghiệm Axit 2',
    description: 'Cho Sắt tác dụng với Axit clohydric.',
    hint: 'Gợi ý: Dùng Sắt (Fe) và HCl.',
    targetReactionIds: ['react_fe_hcl', 'react_hcl_fe'],
    rewardText: 'Phản ứng sủi bọt từ từ tạo ra Sắt (II) clorua.'
  },
  {
    id: 'm6',
    title: 'Thử nghiệm Axit 3',
    description: 'Magiê và Axit Sunfuric.',
    hint: 'Gợi ý: Dùng Mg và H2SO4.',
    targetReactionIds: ['react_mg_h2so4', 'react_h2so4_mg'],
    rewardText: 'Magiê phản ứng mạnh với Axit Sunfuric loãng.'
  },
  {
    id: 'm7',
    title: 'Thử nghiệm Axit 4',
    description: 'Sắt và Axit Sunfuric.',
    hint: 'Gợi ý: Dùng Fe và H2SO4.',
    targetReactionIds: ['react_fe_h2so4', 'react_h2so4_fe'],
    rewardText: 'Rất tốt! Khí H2 lại được giải phóng.'
  },
  {
    id: 'm8',
    title: 'Sự Cảnh Báo Nguy Hiểm',
    description: 'Thả Natri vào Axit clohydric. Hãy cẩn thận!',
    hint: 'Gợi ý: Dùng Na và HCl.',
    targetReactionIds: ['react_na_hcl', 'react_hcl_na'],
    rewardText: 'Phản ứng cực kỳ mãnh liệt và nguy hiểm!'
  },
  {
    id: 'm9',
    title: 'Vụ Nổ Kali',
    description: 'Thả Kali vào Axit clohydric.',
    hint: 'Gợi ý: Dùng K và HCl.',
    targetReactionIds: ['react_k_hcl', 'react_hcl_k'],
    rewardText: 'Bạn không nên làm điều này trong phòng Lab thực tế!'
  },
  {
    id: 'm10',
    title: 'Phản ứng Sôi Động',
    description: 'Canxi tác dụng với HCl.',
    hint: 'Gợi ý: Dùng Ca và HCl.',
    targetReactionIds: ['react_ca_hcl', 'react_hcl_ca'],
    rewardText: 'Ca tan rất nhanh trong axit.'
  },
  {
    id: 'm11',
    title: 'Cực Kì Nguy Hiểm 1',
    description: 'Natri trong Axit Sunfuric.',
    hint: 'Gợi ý: Dùng Na và H2SO4.',
    targetReactionIds: ['react_na_h2so4', 'react_h2so4_na'],
    rewardText: 'Một vụ nổ kinh hoàng!'
  },
  {
    id: 'm12',
    title: 'Cực Kì Nguy Hiểm 2',
    description: 'Kali trong Axit Sunfuric.',
    hint: 'Gợi ý: Dùng K và H2SO4.',
    targetReactionIds: ['react_k_h2so4', 'react_h2so4_k'],
    rewardText: 'Nổ bùm! Ảo diệu chưa?'
  },
  {
    id: 'm13',
    title: 'Canxi và Sunfuric',
    description: 'Canxi trong Axit Sunfuric.',
    hint: 'Gợi ý: Dùng Ca và H2SO4.',
    targetReactionIds: ['react_ca_h2so4', 'react_h2so4_ca'],
    rewardText: 'Tạo ra kết tủa mỏng CaSO4 và khí H2.'
  },
  {
    id: 'm14',
    title: 'Trung hòa Cơ bản',
    description: 'Trộn Natri hiđroxit và Axit clohydric.',
    hint: 'Gợi ý: Dùng NaOH và HCl.',
    targetReactionIds: ['react_naoh_hcl', 'react_hcl_naoh'],
    rewardText: 'Muối ăn và nước đã được tạo ra.'
  },
  {
    id: 'm15',
    title: 'Trung hòa Mạnh mẽ',
    description: 'Natri hiđroxit và Axit Sunfuric.',
    hint: 'Gợi ý: Dùng NaOH và H2SO4.',
    targetReactionIds: ['react_naoh_h2so4', 'react_h2so4_naoh'],
    rewardText: 'Tạo ra Natri Sunfat.'
  },
  {
    id: 'm16',
    title: 'Trung hòa Bari',
    description: 'Bari hiđroxit và Axit clohydric.',
    hint: 'Gợi ý: Dùng Ba(OH)2 và HCl.',
    targetReactionIds: ['react_ba_oh_2_hcl', 'react_hcl_ba_oh_2'],
    rewardText: 'Dung dịch trở nên trung tính.'
  },
  {
    id: 'm17',
    title: 'Tủa Xanh 1',
    description: 'Tạo kết tủa Đồng (II) hiđroxit từ Đồng sunfat và Natri hiđroxit.',
    hint: 'Gợi ý: Dùng CuSO4 và NaOH.',
    targetReactionIds: ['react_cuso4_naoh', 'react_naoh_cuso4'],
    rewardText: 'Đại dương xanh biếc đã hiện ra!'
  },
  {
    id: 'm18',
    title: 'Tủa Xanh 2',
    description: 'Dùng Bari hiđroxit để kết tủa ion Đồng.',
    hint: 'Gợi ý: Dùng CuSO4 và Ba(OH)2.',
    targetReactionIds: ['react_cuso4_ba_oh_2', 'react_ba_oh_2_cuso4'],
    rewardText: 'Tạo ra hai kết tủa cùng lúc: Cu(OH)2 và BaSO4!'
  },
  {
    id: 'm19',
    title: 'Bari Sunfat 1',
    description: 'Dùng Bari Clorua để nhận biết Axit Sunfuric.',
    hint: 'Gợi ý: Dùng BaCl2 và H2SO4.',
    targetReactionIds: ['react_bacl2_h2so4', 'react_h2so4_bacl2'],
    rewardText: 'Kết tủa trắng BaSO4 không tan trong axit.'
  },
  {
    id: 'm20',
    title: 'Bari Sunfat 2',
    description: 'Nhận biết muối Sunfat bằng Bari Clorua.',
    hint: 'Gợi ý: Dùng BaCl2 và Na2SO4.',
    targetReactionIds: ['react_bacl2_na2so4', 'react_na2so4_bacl2'],
    rewardText: 'Kết tủa trắng xuất hiện tức thì.'
  },
  {
    id: 'm21',
    title: 'Bari Sunfat 3',
    description: 'Bari Clorua và Kali Sunfat.',
    hint: 'Gợi ý: Dùng BaCl2 và K2SO4.',
    targetReactionIds: ['react_bacl2_k2so4', 'react_k2so4_bacl2'],
    rewardText: 'Thêm một cách để tạo BaSO4.'
  },
  {
    id: 'm22',
    title: 'Bari Sunfat 4',
    description: 'Bari hiđroxit và Axit Sunfuric.',
    hint: 'Gợi ý: Dùng Ba(OH)2 và H2SO4.',
    targetReactionIds: ['react_ba_oh_2_h2so4', 'react_h2so4_ba_oh_2'],
    rewardText: 'Phản ứng vừa trung hòa vừa tạo kết tủa.'
  },
  {
    id: 'm23',
    title: 'Bạc Clorua 1',
    description: 'Nhận biết muối Clorua.',
    hint: 'Gợi ý: Dùng AgNO3 và NaCl.',
    targetReactionIds: ['react_agno3_nacl', 'react_nacl_agno3'],
    rewardText: 'Kết tủa trắng AgCl lóa mắt.'
  },
  {
    id: 'm24',
    title: 'Bạc Clorua 2',
    description: 'Bạc nitrat và Axit clohydric.',
    hint: 'Gợi ý: Dùng AgNO3 và HCl.',
    targetReactionIds: ['react_agno3_hcl', 'react_hcl_agno3'],
    rewardText: 'AgCl kết tủa từ dung dịch axit.'
  },
  {
    id: 'm25',
    title: 'Bạc Clorua 3',
    description: 'Bạc nitrat và Bari Clorua.',
    hint: 'Gợi ý: Dùng AgNO3 và BaCl2.',
    targetReactionIds: ['react_agno3_bacl2', 'react_bacl2_agno3'],
    rewardText: 'Hai kết tủa trắng đều có thể tạo ra từ Bari Clorua.'
  },
  {
    id: 'm26',
    title: 'Nhận biết Halogen',
    description: 'Thêm một phản ứng để kiểm tra tính chất của ion bạc.',
    hint: 'Gợi ý: Hãy trộn AgNO3 và NaCl.',
    targetReactionIds: ['react_agno3_nacl', 'react_nacl_agno3'],
    rewardText: 'Xuất sắc!'
  },
  {
    id: 'm27',
    title: 'Bí ẩn kết tủa',
    description: 'Thử trộn Đồng Sunfat và Bari Clorua.',
    hint: 'Gợi ý: Dùng CuSO4 và BaCl2.',
    targetReactionIds: ['react_cuso4_bacl2', 'react_bacl2_cuso4'],
    rewardText: 'Kết tủa BaSO4 và dung dịch CuCl2 màu xanh.'
  },
  {
    id: 'm28',
    title: 'Làm sạch Bạc',
    description: 'Sử dụng kết tủa để tinh chế bạc.',
    hint: 'Gợi ý: Dùng AgNO3 và HCl.',
    targetReactionIds: ['react_agno3_hcl', 'react_hcl_agno3'],
    rewardText: 'Thu được Bạc clorua nguyên chất.'
  },
  {
    id: 'm29',
    title: 'Sự hòa tan 1',
    description: 'Hòa tan muối ăn vào nước.',
    hint: 'Gợi ý: Dùng NaCl và Nước.',
    targetReactionIds: ['dilute_nacl_h2o', 'dilute_h2o_nacl'],
    rewardText: 'Muối đã tan hoàn toàn.'
  },
  {
    id: 'm30',
    title: 'Sự hòa tan 2',
    description: 'Hòa tan Đồng sunfat vào nước.',
    hint: 'Gợi ý: Dùng CuSO4 và Nước.',
    targetReactionIds: ['dilute_cuso4_h2o', 'dilute_h2o_cuso4'],
    rewardText: 'Dung dịch màu xanh ngọc lam.'
  },
  {
    id: 'm31',
    title: 'Thuốc tím',
    description: 'Tạo dung dịch Kali pemanganat.',
    hint: 'Gợi ý: Dùng KMnO4 và Nước.',
    targetReactionIds: ['dilute_kmno4_h2o', 'dilute_h2o_kmno4'],
    rewardText: 'Màu tím lịm tìm sim vô cùng đẹp mắt!'
  },
  {
    id: 'm32',
    title: 'Pha loãng Axit 1',
    description: 'Pha loãng Axit clohydric.',
    hint: 'Gợi ý: Dùng HCl và Nước.',
    targetReactionIds: ['dilute_hcl_h2o', 'dilute_h2o_hcl'],
    rewardText: 'Nhớ nguyên tắc: Rót axit vào nước!'
  },
  {
    id: 'm33',
    title: 'Pha loãng Axit 2',
    description: 'Pha loãng Axit Sunfuric.',
    hint: 'Gợi ý: Dùng H2SO4 và Nước.',
    targetReactionIds: ['dilute_h2so4_h2o', 'dilute_h2o_h2so4'],
    rewardText: 'Nhiệt lượng tỏa ra rất lớn.'
  },
  {
    id: 'm34',
    title: 'Dung dịch kiềm 1',
    description: 'Pha dung dịch Natri hiđroxit.',
    hint: 'Gợi ý: Dùng NaOH và Nước.',
    targetReactionIds: ['dilute_naoh_h2o', 'dilute_h2o_naoh'],
    rewardText: 'Dung dịch trong suốt có tính kiềm.'
  },
  {
    id: 'm35',
    title: 'Dung dịch kiềm 2',
    description: 'Pha dung dịch Bari hiđroxit.',
    hint: 'Gợi ý: Dùng Ba(OH)2 và Nước.',
    targetReactionIds: ['dilute_ba_oh_2_h2o', 'dilute_h2o_ba_oh_2'],
    rewardText: 'Nước vôi trong phiên bản Bari.'
  },
  {
    id: 'm36',
    title: 'Dung dịch Muối Bạc',
    description: 'Pha dung dịch Bạc nitrat.',
    hint: 'Gợi ý: Dùng AgNO3 và Nước.',
    targetReactionIds: ['dilute_agno3_h2o', 'dilute_h2o_agno3'],
    rewardText: 'Cẩn thận dung dịch này dính tay sẽ làm đen da.'
  },
  {
    id: 'm37',
    title: 'Muối Sunfat 1',
    description: 'Pha dung dịch Natri Sunfat.',
    hint: 'Gợi ý: Dùng Na2SO4 và Nước.',
    targetReactionIds: ['dilute_na2so4_h2o', 'dilute_h2o_na2so4'],
    rewardText: 'Hoàn tất pha chế Na2SO4.'
  },
  {
    id: 'm38',
    title: 'Muối Sunfat 2',
    description: 'Pha dung dịch Kali Sunfat.',
    hint: 'Gợi ý: Dùng K2SO4 và Nước.',
    targetReactionIds: ['dilute_k2so4_h2o', 'dilute_h2o_k2so4'],
    rewardText: 'Hoàn tất pha chế K2SO4.'
  },
  {
    id: 'm39',
    title: 'Muối Bari',
    description: 'Pha dung dịch Bari clorua.',
    hint: 'Gợi ý: Dùng BaCl2 và Nước.',
    targetReactionIds: ['dilute_bacl2_h2o', 'dilute_h2o_bacl2'],
    rewardText: 'Dung dịch không màu của Bari.'
  },
  {
    id: 'm40',
    title: 'Nghỉ ngơi',
    description: 'Thêm một chút muối ăn vào nước để thư giãn.',
    hint: 'Gợi ý: Dùng NaCl và Nước.',
    targetReactionIds: ['dilute_nacl_h2o', 'dilute_h2o_nacl'],
    rewardText: 'Đôi khi sự đơn giản lại là tuyệt vời nhất.'
  }
];
