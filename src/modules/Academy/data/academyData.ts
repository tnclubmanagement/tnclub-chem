export interface AcademyQuizItem {
  question: string;
  questionEn: string;
  options: string[];
  optionsEn: string[];
  correctIndex: number;
  explanation: string;
  explanationEn: string;
}

export interface AcademyTopic {
  id: string;
  unitId: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  readTime: string;
  icon: string;
  interactiveWidget?: 'orbital-3d' | 'ph-meter';
  summary: string;
  summaryEn: string;
  contentSections: {
    heading: string;
    headingEn: string;
    body: string;
    bodyEn: string;
    keyTakeaway?: string;
    keyTakeawayEn?: string;
  }[];
  quiz: AcademyQuizItem[];
}

export interface AcademyUnit {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  badgeColor: string;
  topics: AcademyTopic[];
}

export const ACADEMY_UNITS: AcademyUnit[] = [
  {
    id: 'unit-1',
    title: 'Đơn Vị 1: Cấu Tạo Nguyên Tử & Orbital Electron',
    titleEn: 'Unit 1: Atomic Structure & Electron Orbitals',
    description: 'Khám phá thế giới dưới nguyên tử: Hạt nhân, Proton, Neutron và mây xác suất Orbital s, p, d, f.',
    descriptionEn: 'Explore the subatomic world: Nucleus, Protons, Neutrons, and s, p, d, f Orbital probability clouds.',
    badgeColor: '#00f7ff',
    topics: [
      {
        id: 'topic-atomic-model',
        unitId: 'unit-1',
        title: 'Mô Hình Nguyên Tử & Mây Orbital 3D',
        titleEn: 'Atomic Model & 3D Orbital Cloud',
        subtitle: 'Từ mô hình Hành tinh Bohr đến Cơ học Lượng tử',
        subtitleEn: 'From Bohr Planetary Model to Quantum Mechanics',
        level: 'Basic',
        readTime: '6 phút',
        icon: '⚛️',
        interactiveWidget: 'orbital-3d',
        summary: 'Nguyên tử gồm hạt nhân mang điện tích dương và các electron chuyển động xung quanh tạo nên mây electron.',
        summaryEn: 'An atom consists of a positively charged nucleus surrounded by electrons forming an electron cloud.',
        contentSections: [
          {
            heading: '1. Thành phần hạt cấu tạo nguyên tử',
            headingEn: '1. Subatomic Particles Composition',
            body: 'Nguyên tử được cấu tạo từ 3 loại hạt cơ bản:\n- Proton (p): Mang điện tích dương (+1), khối lượng ≈ 1 amu.\n- Neutron (n): Không mang điện, khối lượng ≈ 1 amu.\n- Electron (e): Mang điện tích âm (-1), khối lượng rất nhỏ ≈ 1/1836 amu.',
            bodyEn: 'Atoms are composed of 3 fundamental particles:\n- Proton (p): Positive charge (+1), mass ≈ 1 amu.\n- Neutron (n): Neutral charge (0), mass ≈ 1 amu.\n- Electron (e): Negative charge (-1), negligible mass ≈ 1/1836 amu.',
            keyTakeaway: 'Tổng số Proton chính là Số Hiệu Nguyên Tử (Z), quyết định tính chất hóa học đặc trưng của nguyên tố.',
            keyTakeawayEn: 'The total number of Protons is the Atomic Number (Z), defining the element identity.',
          },
          {
            heading: '2. Hình dạng các Orbital s và p',
            headingEn: '2. Shapes of s and p Orbitals',
            body: 'Orbital nguyên tử (AO) là vùng không gian xung quanh hạt nhân mà tại đó xác suất tìm thấy electron là lớn nhất (khoảng 90%).\n- Orbital s: Có dạng hình cầu đối xứng tâm.\n- Orbital p: Có dạng hình số 8 nổi (2 thùy) định hướng theo 3 trục không gian (px, py, pz).',
            bodyEn: 'An Atomic Orbital (AO) is the region of space around the nucleus with high electron probability (~90%).\n- s Orbital: Spherical shape centered at the nucleus.\n- p Orbital: Dumbbell shape (2 lobes) oriented along 3 axes (px, py, pz).',
          },
        ],
        quiz: [
          {
            question: 'Hạt nào quyết định số hiệu nguyên tử (Z) của một nguyên tố?',
            questionEn: 'Which particle determines the atomic number (Z) of an element?',
            options: ['Electron', 'Proton', 'Neutron', 'Photon'],
            optionsEn: ['Electron', 'Proton', 'Neutron', 'Photon'],
            correctIndex: 1,
            explanation: 'Số proton trong hạt nhân chính là số hiệu nguyên tử Z của nguyên tố.',
            explanationEn: 'The number of protons in the nucleus defines the atomic number Z.',
          },
          {
            question: 'Orbital s có dạng hình học gì trong không gian?',
            questionEn: 'What is the spatial shape of an s orbital?',
            options: ['Hình số 8 nổi', 'Hình cầu', 'Hình màng xuyến', 'Hình lập phương'],
            optionsEn: ['Dumbbell shape', 'Sphere shape', 'Torus shape', 'Cube shape'],
            correctIndex: 1,
            explanation: 'Orbital s luôn có dạng hình cầu đối xứng qua tâm hạt nhân.',
            explanationEn: 'An s orbital always has a spherical shape centered at the nucleus.',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-2',
    title: 'Đơn Vị 2: Định Luật Tuần Hoàn & Quy Luật Biến Đổi',
    titleEn: 'Unit 2: Periodic Law & Trends',
    description: 'Hiểu rõ các xu hướng chu kỳ: Độ âm điện, Bán kính nguyên tử và Năng lượng ion hóa.',
    descriptionEn: 'Master periodic trends: Electronegativity, Atomic Radius, and Ionization Energy.',
    badgeColor: '#00ff80',
    topics: [
      {
        id: 'topic-periodic-trends',
        unitId: 'unit-2',
        title: 'Quy Luật Biến Đổi Tính Chất Trong Bảng Tuần Hoàn',
        titleEn: 'Periodic Trends Across Periods & Groups',
        subtitle: 'Phân tích quy luật độ âm điện và bán kính nguyên tử',
        subtitleEn: 'Analyzing Electronegativity and Atomic Radius trends',
        level: 'Intermediate',
        readTime: '8 phút',
        icon: '📊',
        summary: 'Các tính chất vật lý và hóa học của nguyên tố biến đổi tuần hoàn theo chiều tăng của điện tích hạt nhân.',
        summaryEn: 'Physical and chemical properties of elements vary periodically with atomic number.',
        contentSections: [
          {
            heading: '1. Bán kính nguyên tử',
            headingEn: '1. Atomic Radius Trend',
            body: '- Trong một Chu kỳ (hàng ngang): Đi từ trái sang phải, bán kính nguyên tử GIẢM dần do lực hút hạt nhân tăng mạnh.\n- Trong một Nhóm (cột dọc): Đi từ trên xuống dưới, bán kính nguyên tử TĂNG dần do số lớp electron tăng lên.',
            bodyEn: '- Across a Period (left to right): Atomic radius DECREASES as effective nuclear charge increases.\n- Down a Group (top to bottom): Atomic radius INCREASES due to additional electron shells.',
            keyTakeaway: 'Nguyên tử Francium (Fr) có bán kính lớn nhất, còn Fluorine (F) nhỏ nhất trong các phi kim.',
            keyTakeawayEn: 'Francium (Fr) has the largest radius, while Fluorine (F) is smallest among non-metals.',
          },
          {
            heading: '2. Độ âm điện (Electronegativity)',
            headingEn: '2. Electronegativity Scale',
            body: 'Độ âm điện đặc trưng cho khả năng hút electron của nguyên tử khi hình thành liên kết hóa học. Theo thang Pauling, Fluorine có độ âm điện lớn nhất (3.98).',
            bodyEn: 'Electronegativity measures an atom ability to attract shared electrons. Fluorine is the most electronegative element (3.98 on Pauling scale).',
          },
        ],
        quiz: [
          {
            question: 'Đi từ trái sang phải trong cùng một chu kỳ, bán kính nguyên tử biến đổi như thế nào?',
            questionEn: 'Across a period from left to right, how does atomic radius change?',
            options: ['Tăng dần', 'Giảm dần', 'Không đổi', 'Tăng rồi giảm'],
            optionsEn: ['Increases', 'Decreases', 'Remains constant', 'Increases then decreases'],
            correctIndex: 1,
            explanation: 'Bán kính nguyên tử giảm dần từ trái sang phải do điện tích hạt nhân tăng thu hút các electron gần hơn.',
            explanationEn: 'Atomic radius decreases left-to-right as increasing nuclear charge pulls electrons closer.',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-3',
    title: 'Đơn Vị 3: Dung Dịch, pH & Thang Đo Axit - Bazơ',
    titleEn: 'Unit 3: Solutions, pH & Acid-Base Scale',
    description: 'Thấu hiểu bản chất [H+], nồng độ pH, dung dịch đệm và chất chỉ thị màu.',
    descriptionEn: 'Understand [H+] concentration, pH scale, buffer solutions, and color indicators.',
    badgeColor: '#ff1adb',
    topics: [
      {
        id: 'topic-ph-scale',
        unitId: 'unit-3',
        title: 'Bản Chất Nồng Độ pH & Chất Chỉ Thị Hóa Học',
        titleEn: 'Nature of pH Scale & Chemical Indicators',
        subtitle: 'Mô phỏng đo thang pH trực quan và đổi màu chất chỉ thị',
        subtitleEn: 'Interactive pH scale visualization and indicator color changes',
        level: 'Basic',
        readTime: '7 phút',
        icon: '🧪',
        interactiveWidget: 'ph-meter',
        summary: 'Thang pH từ 0 đến 14 đo độ Axit hay Bazơ của một dung dịch dựa trên nồng độ ion H+.',
        summaryEn: 'The pH scale (0 to 14) measures how acidic or basic a solution is based on H+ concentration.',
        contentSections: [
          {
            heading: '1. Định nghĩa Thang pH',
            headingEn: '1. Definition of pH Scale',
            body: 'pH được định nghĩa theo công thức logarithmic:\n  pH = -log10([H+])\n- pH < 7: Môi trường Axit (Nồng độ H+ cao)\n- pH = 7: Môi trường Trung tính (Nước tinh khiết)\n- pH > 7: Môi trường Bazơ / Kiềm (Nồng độ OH- cao)',
            bodyEn: 'pH is defined logarithmically:\n  pH = -log10([H+])\n- pH < 7: Acidic medium (High H+ concentration)\n- pH = 7: Neutral medium (Pure water)\n- pH > 7: Basic / Alkaline medium (High OH- concentration)',
            keyTakeaway: 'Mỗi đơn vị pH thay đổi tương ứng với nồng độ [H+] thay đổi gấp 10 lần.',
            keyTakeawayEn: 'Each unit change in pH represents a 10-fold change in H+ concentration.',
          },
        ],
        quiz: [
          {
            question: 'Nếu dung dịch có pH = 3 thì môi trường đó là gì?',
            questionEn: 'If a solution has pH = 3, what medium is it?',
            options: ['Môi trường Bazơ', 'Môi trường Axit', 'Môi trường Trung tính', 'Không xác định'],
            optionsEn: ['Basic', 'Acidic', 'Neutral', 'Undefined'],
            correctIndex: 1,
            explanation: 'Dung dịch có pH < 7 luôn có tính Axit.',
            explanationEn: 'Solutions with pH < 7 are acidic.',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-4',
    title: 'Đơn Vị 4: Liên Kết Hóa Học & Hình Học Phân Tử',
    titleEn: 'Unit 4: Chemical Bonding & Molecular Geometry',
    description: 'Tìm hiểu bản chất Liên kết Ion, Cộng hóa trị, Liên kết Hydrogen và Thuyết VSEPR.',
    descriptionEn: 'Learn Ionic, Covalent, Hydrogen bonding nature, and VSEPR theory.',
    badgeColor: '#eab308',
    topics: [
      {
        id: 'topic-bonding-types',
        unitId: 'unit-4',
        title: 'Các Loại Liên Kết Hóa Học & Hình Học VSEPR',
        titleEn: 'Chemical Bond Types & VSEPR Shapes',
        subtitle: 'Sự hình thành liên kết ion, cộng hóa trị và lực tương tác phân tử',
        subtitleEn: 'Formation of ionic, covalent bonds and intermolecular forces',
        level: 'Intermediate',
        readTime: '9 phút',
        icon: '🔗',
        summary: 'Các nguyên tử liên kết với nhau để đạt cấu hình electron bền vững của khí hiếm (Quy tắc Bát tử Octet).',
        summaryEn: 'Atoms combine to achieve stable noble gas electron configurations (Octet Rule).',
        contentSections: [
          {
            heading: '1. Liên kết Ion vs Liên kết Cộng hóa trị',
            headingEn: '1. Ionic vs Covalent Bonding',
            body: '- Liên kết Ion: Được hình thành bởi lực hút tĩnh điện giữa các ion mang điện tích trái dấu (VD: NaCl, MgO). Thường xảy ra giữa Kim loại điển hình và Phi kim điển hình.\n- Liên kết Cộng hóa trị: Hình thành bằng sự góp chung các cặp electron (VD: H2, O2, H2O). Nếu hiệu độ âm điện Δχ < 0.4 là không cực; 0.4 ≤ Δχ < 1.7 là có cực.',
            bodyEn: '- Ionic Bond: Electrostatic attraction between oppositely charged ions (e.g., NaCl, MgO). Usually between metals and non-metals.\n- Covalent Bond: Formed by sharing electron pairs (e.g., H2, O2, H2O). Non-polar if Δχ < 0.4; Polar if 0.4 ≤ Δχ < 1.7.',
            keyTakeaway: 'Liên kết Hydrogen giữa các phân tử H2O tạo nên các đặc tính vật lý kỳ diệu của nước (nhiệt độ sôi cao, sức căng bề mặt).',
            keyTakeawayEn: 'Intermolecular Hydrogen bonding in H2O gives water high boiling point and surface tension.',
          },
          {
            heading: '2. Thuyết VSEPR & Hình học Phân tử',
            headingEn: '2. VSEPR Theory & Molecular Shapes',
            body: 'Mô hình Đẩy Cặp Electron Lớp Vỏ (VSEPR) giúp dự đoán hình dạng không gian 3D của phân tử:\n- CH4: Hình Tứ diện đều (Góc liên kết 109.5°)\n- NH3: Hình Tháp tam giác (Góc liên kết 107°)\n- H2O: Hình Gấp khúc / Chữ V (Góc liên kết 104.5°)\n- CO2: Hình Đường thẳng (Góc liên kết 180°)',
            bodyEn: 'Valence Shell Electron Pair Repulsion (VSEPR) predicts 3D spatial shapes:\n- CH4: Tetrahedral (Bond angle 109.5°)\n- NH3: Trigonal Pyramidal (Bond angle 107°)\n- H2O: Bent / V-shape (Bond angle 104.5°)\n- CO2: Linear (Bond angle 180°)',
          },
        ],
        quiz: [
          {
            question: 'Phân tử Nước (H₂O) có hình học không gian dạng nào theo thuyết VSEPR?',
            questionEn: 'What spatial geometry does Water (H₂O) have according to VSEPR theory?',
            options: ['Đường thẳng', 'Tứ diện đều', 'Gấp khúc (Chữ V)', 'Tam giác phẳng'],
            optionsEn: ['Linear', 'Tetrahedral', 'Bent (V-shaped)', 'Trigonal Planar'],
            correctIndex: 2,
            explanation: 'Do H₂O có 2 cặp electron tự do trên nguyên tử O đẩy 2 liên kết O-H khiến phân tử bị gấp khúc 104.5°.',
            explanationEn: 'Two lone pairs on Oxygen repel O-H bonds creating a 104.5° bent geometry.',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-5',
    title: 'Đơn Vị 5: Động Hóa Học & Cân Bằng Hóa Học',
    titleEn: 'Unit 5: Chemical Kinetics & Equilibrium',
    description: 'Nghiên cứu tốc độ phản ứng, năng lượng hoạt hóa và Nguyên lý Le Chatelier.',
    descriptionEn: 'Study reaction rates, activation energy, and Le Chatelier principle.',
    badgeColor: '#ec4899',
    topics: [
      {
        id: 'topic-kinetics-equilibrium',
        unitId: 'unit-5',
        title: 'Tốc Độ Phản Ứng & Nguyên Lý Chuyển Dịch Cân Bằng',
        titleEn: 'Reaction Kinetics & Le Chatelier Principle',
        subtitle: 'Các yếu tố ảnh hưởng đến tốc độ phản ứng và cân bằng động',
        subtitleEn: 'Factors influencing reaction rate and dynamic equilibrium',
        level: 'Advanced',
        readTime: '9 phút',
        icon: '⚡',
        summary: 'Cân bằng hóa học là một cân bằng động. Khi các yếu tố ngoài thay đổi, cân bằng sẽ chuyển dịch theo chiều chống lại sự thay đổi đó.',
        summaryEn: 'Chemical equilibrium is dynamic. Systems shift to counteract external changes (Le Chatelier Principle).',
        contentSections: [
          {
            heading: '1. Tốc độ phản ứng & Chất xúc tác',
            headingEn: '1. Reaction Rate & Catalysts',
            body: 'Tốc độ phản ứng phụ thuộc vào:\n- Nồng độ chất tham gia\n- Nhiệt độ (Mỗi khi T tăng 10°C, tốc độ phản ứng tăng từ 2 - 4 lần)\n- Diện tích bề mặt tiếp xúc\n- Chất xúc tác: Làm giảm Năng lượng Hoạt hóa (Ea), giúp phản ứng xảy ra nhanh hơn mà không bị tiêu hao.',
            bodyEn: 'Reaction rate depends on:\n- Reactant concentrations\n- Temperature (Rate increases 2-4x per 10°C rise)\n- Surface area\n- Catalysts: Lower Activation Energy (Ea) without being consumed.',
          },
          {
            heading: '2. Nguyên lý Chuyển dịch Cân bằng Le Chatelier',
            headingEn: '2. Le Chatelier Principle',
            body: 'Một phản ứng thuận nghịch đang ở trạng thái cân bằng, nếu chịu một tác động từ bên ngoài (nồng độ, nhiệt độ, áp suất) thì cân bằng sẽ chuyển dịch theo chiều làm GIẢM tác động đó.',
            bodyEn: 'When a dynamic equilibrium is disturbed by changing conditions (temperature, pressure, concentration), the system shifts to counter the change.',
            keyTakeaway: 'Chất xúc tác chỉ làm phản ứng mau đạt trạng thái cân bằng chứ KHÔNG làm chuyển dịch cân bằng.',
            keyTakeawayEn: 'Catalysts speed up reaching equilibrium but DO NOT alter the equilibrium position.',
          },
        ],
        quiz: [
          {
            question: 'Chất xúc tác có vai trò gì trong một phản ứng hóa học?',
            questionEn: 'What is the role of a catalyst in a chemical reaction?',
            options: ['Làm tăng năng lượng hoạt hóa Ea', 'Làm giảm năng lượng hoạt hóa Ea', 'Làm chuyển dịch cân bằng theo chiều thuận', 'Bị tiêu hao sau phản ứng'],
            optionsEn: ['Increases activation energy Ea', 'Lowers activation energy Ea', 'Shifts equilibrium to forward direction', 'Consumed during reaction'],
            correctIndex: 1,
            explanation: 'Chất xúc tác làm giảm năng lượng hoạt hóa Ea giúp phản ứng xảy ra nhanh hơn.',
            explanationEn: 'A catalyst lowers the activation energy barrier Ea to accelerate the reaction.',
          },
        ],
      },
    ],
  },
  {
    id: 'unit-6',
    title: 'Đơn Vị 6: Phản Ứng Oxy Hóa - Khử & Điện Hóa Học',
    titleEn: 'Unit 6: RedOx & Electrochemistry',
    description: 'Bản chất sự chuyển dịch Electron, Pin điện hóa Galvanic và Điện phân.',
    descriptionEn: 'Electron transfer nature, Galvanic electrochemical cells, and Electrolysis.',
    badgeColor: '#8b5cf6',
    topics: [
      {
        id: 'topic-redox-electro',
        unitId: 'unit-6',
        title: 'Phản Ứng Oxy Hóa - Khử & Nguyên Lý Pin Điện Hóa',
        titleEn: 'RedOx Reactions & Galvanic Cell Principles',
        subtitle: 'Quá trình cho - nhận electron và sự tạo thành dòng điện hóa học',
        subtitleEn: 'Electron transfer processes and chemical electricity generation',
        level: 'Advanced',
        readTime: '10 phút',
        icon: '🔋',
        summary: 'Phản ứng Oxy hóa - Khử là phản ứng hóa học có sự chuyển dịch electron giữa các chất tham gia.',
        summaryEn: 'RedOx reactions involve electron transfer between reacting chemical species.',
        contentSections: [
          {
            heading: '1. Chất Khử vs Chất Oxy Hóa',
            headingEn: '1. Reducing vs Oxidizing Agents',
            body: 'Quy tắc ghi nhớ nhanh:\n- "Khử Cho - O Nhận"\n- Chất Khử: Chất nhường electron -> Số oxy hóa TĂNG (bị oxy hóa).\n- Chất Oxy hóa: Chất nhận electron -> Số oxy hóa GIẢM (bị khử).',
            bodyEn: 'Quick memory mnemonic:\n- Reducing Agent: Loses electrons -> Oxidation state INCREASES (oxidized).\n- Oxidizing Agent: Gains electrons -> Oxidation state DECREASES (reduced).',
            keyTakeaway: 'Quá trình oxy hóa và quá trình khử luôn xảy ra đồng thời trong một phản ứng.',
            keyTakeawayEn: 'Oxidation and reduction processes always occur simultaneously.',
          },
          {
            heading: '2. Nguyên lý Pin Điện Hóa (Galvanic Cell)',
            headingEn: '2. Galvanic Cell Principles',
            body: 'Pin điện hóa biến đổi Hóa năng thành Điện năng thông qua phản ứng RedOx tự phát:\n- Cực Âm (Anode): Xảy ra quá trình Oxy hóa (Kim loại mạnh hơn bị ăn mòn, nhường e).\n- Cực Dương (Cathode): Xảy ra quá trình Khử (Ion kim loại nhận e).\n- Dòng electron chuyển động từ Anode (-) sang Cathode (+).',
            bodyEn: 'Galvanic cells convert chemical energy into electrical energy via spontaneous RedOx reactions:\n- Anode (-): Oxidation occurs (More reactive metal loses e).\n- Cathode (+): Reduction occurs (Metal ions gain e).\n- Electrons flow from Anode (-) to Cathode (+).',
          },
        ],
        quiz: [
          {
            question: 'Trong Pin điện hóa Galvanic, dòng electron di chuyển theo chiều nào?',
            questionEn: 'In a Galvanic cell, in which direction do electrons flow?',
            options: ['Từ Cathode (+) sang Anode (-)', 'Từ Anode (-) sang Cathode (+)', 'Từ cầu muối vào dung dịch', 'Không di chuyển'],
            optionsEn: ['From Cathode (+) to Anode (-)', 'From Anode (-) to Cathode (+)', 'From salt bridge to solution', 'Does not move'],
            correctIndex: 1,
            explanation: 'Dòng electron sinh ra từ cực Âm (Anode) do quá trình nhường e và di chuyển sang cực Dương (Cathode).',
            explanationEn: 'Electrons are generated at the Anode (-) via oxidation and flow to the Cathode (+).',
          },
        ],
      },
    ],
  },
];
