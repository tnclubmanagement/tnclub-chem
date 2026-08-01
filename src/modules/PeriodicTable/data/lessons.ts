export interface LessonTheory {
    description: string;
    properties: string[];
}

export interface LessonQuiz {
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface LessonData {
    id: string;
    title: string;
    titleEn?: string;
    moleculeKey: string;
    theory: LessonTheory;
    theoryEn?: LessonTheory;
    quiz: LessonQuiz;
    quizEn?: LessonQuiz;
}

export const LESSONS: LessonData[] = [
    {
        id: 'h2o',
        title: 'Phân tử Nước (H2O)',
        titleEn: 'Water Molecule (H2O)',
        moleculeKey: 'H2O',
        theory: {
            description: "Nước là một hợp chất vô cơ, trong suốt, không vị, không mùi và gần như không màu. Nó là thành phần chính của thủy quyển Trái đất và chất lỏng trong tất cả các sinh vật sống đã biết.",
            properties: [
                "Góc liên kết H-O-H: ~104.5°",
                "Tính phân cực cao (Dung môi vạn năng)",
                "Nhiệt độ sôi: 100°C (ở 1 atm)",
                "Cấu trúc V-shape (chữ V)"
            ]
        },
        theoryEn: {
            description: "Water is an inorganic, transparent, tasteless, odorless, and nearly colorless chemical substance. It is the main constituent of Earth's hydrosphere and the fluids of all known living organisms.",
            properties: [
                "H-O-H bond angle: ~104.5°",
                "High polarity (Universal solvent)",
                "Boiling point: 100°C (at 1 atm)",
                "V-shaped (bent) geometry"
            ]
        },
        quiz: {
            text: "Góc liên kết H-O-H trong phân tử nước xấp xỉ bao nhiêu độ?",
            options: ["90°", "104.5°", "109.5°", "180°"],
            correctIndex: 1,
            explanation: "Do lực đẩy của hai cặp electron tự do trên nguyên tử Oxy, góc liên kết bị ép lại còn khoảng 104.5 độ thay vì 109.5 độ như tứ diện đều."
        },
        quizEn: {
            text: "What is the approximate H-O-H bond angle in a water molecule?",
            options: ["90°", "104.5°", "109.5°", "180°"],
            correctIndex: 1,
            explanation: "Due to the repulsion of the two lone electron pairs on the Oxygen atom, the bond angle is compressed to approximately 104.5° instead of 109.5° as in a regular tetrahedron."
        }
    },
    {
        id: 'ch4',
        title: 'Khí Metan (CH4)',
        titleEn: 'Methane Gas (CH4)',
        moleculeKey: 'CH4',
        theory: {
            description: "Metan (Methane) là hidrocacbon đơn giản nhất, là thành phần chính của khí thiên nhiên. Nó là một loại khí nhà kính mạnh.",
            properties: [
                "Góc liên kết H-C-H: ~109.5°",
                "Cấu trúc không gian: Tứ diện đều (Tetrahedral)",
                "Trạng thái: Khí (ở điều kiện thường)",
                "Là nhiên liệu hóa thạch quan trọng"
            ]
        },
        theoryEn: {
            description: "Methane is the simplest hydrocarbon and the main constituent of natural gas. It is a potent greenhouse gas.",
            properties: [
                "H-C-H bond angle: ~109.5°",
                "Molecular geometry: Regular tetrahedral",
                "State: Gas (at room temperature)",
                "Important fossil fuel"
            ]
        },
        quiz: {
            text: "Cấu trúc không gian của phân tử Metan (CH4) được gọi là gì?",
            options: ["Đường thẳng", "Gấp khúc", "Tứ diện đều", "Chóp tam giác"],
            correctIndex: 2,
            explanation: "Nguyên tử Carbon ở trung tâm liên kết với 4 nguyên tử Hydro nằm ở 4 đỉnh của một hình tứ diện đều (Tetrahedral) với góc liên kết 109.5 độ."
        },
        quizEn: {
            text: "What is the spatial molecular geometry of Methane (CH4) called?",
            options: ["Linear", "Bent", "Tetrahedral", "Trigonal pyramidal"],
            correctIndex: 2,
            explanation: "The central Carbon atom bonds with 4 Hydrogen atoms located at the 4 vertices of a regular tetrahedron with a 109.5° bond angle."
        }
    },
    {
        id: 'nacl',
        title: 'Tinh thể Muối ăn (NaCl)',
        titleEn: 'Table Salt Crystal (NaCl)',
        moleculeKey: 'NaCl',
        theory: {
            description: "Natri clorua, hay muối ăn, là một hợp chất vô cơ với công thức hóa học NaCl. Nó là muối chịu trách nhiệm chính cho độ mặn của đại dương.",
            properties: [
                "Cấu trúc: Mạng tinh thể lập phương",
                "Liên kết: Liên kết ion (Na+ và Cl-)",
                "Nhiệt độ nóng chảy rất cao (~801°C)",
                "Tạo ra chất điện li mạnh khi tan trong nước"
            ]
        },
        theoryEn: {
            description: "Sodium chloride, commonly known as table salt, is an inorganic compound with the chemical formula NaCl. It is responsible for the salinity of seawater.",
            properties: [
                "Structure: Cubic crystal lattice",
                "Bond type: Ionic bond (Na+ and Cl-)",
                "Very high melting point (~801°C)",
                "Forms a strong electrolyte when dissolved in water"
            ]
        },
        quiz: {
            text: "Mạng tinh thể muối ăn (NaCl) được hình thành nhờ loại liên kết hóa học nào?",
            options: ["Liên kết cộng hóa trị", "Liên kết kim loại", "Liên kết ion", "Liên kết hydro"],
            correctIndex: 2,
            explanation: "Tinh thể NaCl được hình thành bởi lực hút tĩnh điện giữa các ion mang điện tích trái dấu (Na+ và Cl-), gọi là liên kết ion."
        },
        quizEn: {
            text: "Which type of chemical bond forms the table salt (NaCl) crystal lattice?",
            options: ["Covalent bond", "Metallic bond", "Ionic bond", "Hydrogen bond"],
            correctIndex: 2,
            explanation: "The NaCl crystal lattice is formed by electrostatic attraction between oppositely charged ions (Na+ and Cl-), known as an ionic bond."
        }
    },
    {
        id: 'nh3',
        title: 'Amoniac (NH3)',
        titleEn: 'Ammonia (NH3)',
        moleculeKey: 'NH3',
        theory: {
            description: "Amoniac là một hợp chất vô cơ có mùi khai đặc trưng, rất dễ hòa tan trong nước. Đây là nguyên liệu vô cùng quan trọng để sản xuất phân đạm.",
            properties: [
                "Cấu trúc: Chóp tam giác (Trigonal pyramidal)",
                "Góc liên kết H-N-H: ~107.8°",
                "Tính chất: Có tính bazơ yếu",
                "Trạng thái: Khí ở điều kiện thường"
            ]
        },
        theoryEn: {
            description: "Ammonia is an inorganic compound with a characteristic pungent odor, highly soluble in water. It is a vital raw material for fertilizer production.",
            properties: [
                "Structure: Trigonal pyramidal",
                "H-N-H bond angle: ~107.8°",
                "Property: Weak base",
                "State: Gas at room temperature"
            ]
        },
        quiz: {
            text: "Cấu trúc hình học không gian của phân tử Amoniac (NH3) là gì?",
            options: ["Tứ diện đều", "Đường thẳng", "Chóp tam giác", "Mặt phẳng"],
            correctIndex: 2,
            explanation: "Nguyên tử Nitơ (N) còn 1 cặp electron tự do đẩy 3 liên kết N-H xuống dưới, tạo thành cấu trúc chóp tam giác với góc liên kết ~107.8°."
        },
        quizEn: {
            text: "What is the spatial molecular geometry of Ammonia (NH3)?",
            options: ["Tetrahedral", "Linear", "Trigonal pyramidal", "Planar"],
            correctIndex: 2,
            explanation: "The Nitrogen (N) atom has 1 lone pair of electrons pushing the 3 N-H bonds downward, creating a trigonal pyramidal structure with a ~107.8° bond angle."
        }
    },
    {
        id: 'co2',
        title: 'Carbon Dioxide (CO2)',
        titleEn: 'Carbon Dioxide (CO2)',
        moleculeKey: 'CO2',
        theory: {
            description: "CO2 (Khí cacbonic) là khí nhà kính chính, sinh ra từ hô hấp và quá trình đốt cháy. Ở dạng rắn, nó được gọi là 'Đá khô' dùng để làm lạnh.",
            properties: [
                "Cấu trúc: Đường thẳng (Linear)",
                "Góc liên kết: 180°",
                "Liên kết: 2 liên kết đôi (C=O)",
                "Tính chất: Không phân cực"
            ]
        },
        theoryEn: {
            description: "CO2 (Carbon dioxide) is a primary greenhouse gas, produced by respiration and combustion. In solid form, it is known as 'Dry Ice' used for cooling.",
            properties: [
                "Structure: Linear",
                "Bond angle: 180°",
                "Bonds: 2 double bonds (C=O)",
                "Property: Non-polar"
            ]
        },
        quiz: {
            text: "Trong phân tử CO2, nguyên tử Carbon tạo ra loại liên kết nào với các nguyên tử Oxy?",
            options: ["2 liên kết đơn", "1 liên kết đơn, 1 liên kết ba", "2 liên kết đôi", "4 liên kết đơn"],
            correctIndex: 2,
            explanation: "Carbon ở trung tâm tạo 2 liên kết đôi (C=O) với 2 nguyên tử Oxy nằm ở 2 phía, tạo thành cấu trúc đường thẳng."
        },
        quizEn: {
            text: "In a CO2 molecule, what type of bond does the Carbon atom form with Oxygen atoms?",
            options: ["2 single bonds", "1 single bond, 1 triple bond", "2 double bonds", "4 single bonds"],
            correctIndex: 2,
            explanation: "The central Carbon forms 2 double bonds (C=O) with 2 Oxygen atoms on opposite sides, producing a linear molecular structure."
        }
    },
    {
        id: 'o2',
        title: 'Khí Oxy (O2)',
        titleEn: 'Oxygen Gas (O2)',
        moleculeKey: 'O2',
        theory: {
            description: "Khí Oxy chiếm khoảng 21% thể tích khí quyển, vô cùng quan trọng đối với sự sống để duy trì quá trình hô hấp và sự cháy.",
            properties: [
                "Cấu trúc: Đường thẳng",
                "Liên kết: 1 liên kết đôi (O=O)",
                "Tính chất: Phân tử không phân cực, có tính thuận từ",
                "Tan ít trong nước nhưng đủ duy trì sự sống dưới nước"
            ]
        },
        theoryEn: {
            description: "Oxygen gas makes up about 21% of the atmosphere by volume, essential for sustaining life respiration and combustion.",
            properties: [
                "Structure: Linear",
                "Bond type: 1 double bond (O=O)",
                "Property: Non-polar molecule, paramagnetic",
                "Slightly soluble in water, sufficient to support aquatic life"
            ]
        },
        quiz: {
            text: "Giữa 2 nguyên tử Oxy trong phân tử O2 là loại liên kết gì?",
            options: ["Liên kết đơn", "Liên kết đôi", "Liên kết ba", "Liên kết ion"],
            correctIndex: 1,
            explanation: "Mỗi nguyên tử Oxy cần thêm 2 electron để đạt cấu hình bền vững, do đó chúng góp chung 2 cặp electron tạo thành một liên kết đôi (O=O)."
        },
        quizEn: {
            text: "What type of chemical bond exists between the two Oxygen atoms in an O2 molecule?",
            options: ["Single bond", "Double bond", "Triple bond", "Ionic bond"],
            correctIndex: 1,
            explanation: "Each Oxygen atom needs 2 more electrons for a stable octet, so they share 2 pairs of electrons to form a double bond (O=O)."
        }
    },
    {
        id: 'n2',
        title: 'Khí Nitơ (N2)',
        titleEn: 'Nitrogen Gas (N2)',
        moleculeKey: 'N2',
        theory: {
            description: "Nitơ chiếm tới 78% bầu khí quyển Trái Đất. Phân tử N2 cực kỳ bền vững, thường được dùng để tạo môi trường khí trơ bảo vệ thực phẩm.",
            properties: [
                "Cấu trúc: Đường thẳng",
                "Liên kết: 1 liên kết ba (N≡N)",
                "Tính chất: Rất trơ về mặt hóa học ở nhiệt độ thường",
                "Nhiệt độ hóa lỏng: -196°C (Nitơ lỏng)"
            ]
        },
        theoryEn: {
            description: "Nitrogen makes up 78% of Earth's atmosphere. The N2 molecule is extremely stable, commonly used to create an inert atmosphere for food preservation.",
            properties: [
                "Structure: Linear",
                "Bond type: 1 triple bond (N≡N)",
                "Property: Highly chemically inert at room temperature",
                "Liquefaction point: -196°C (Liquid nitrogen)"
            ]
        },
        quiz: {
            text: "Tại sao khí N2 lại rất trơ (khó tham gia phản ứng) ở nhiệt độ thường?",
            options: ["Vì nó là khí hiếm", "Do có liên kết ba cực kỳ vững chắc", "Vì nó không có electron tự do", "Do nó có khối lượng nhẹ"],
            correctIndex: 1,
            explanation: "Giữa 2 nguyên tử Nitơ là một liên kết ba (N≡N) có năng lượng liên kết rất lớn, cần nhiệt độ cực cao (trên 3000°C) hoặc tia lửa điện mới bẻ gãy được."
        },
        quizEn: {
            text: "Why is N2 gas very inert (unreactive) at room temperature?",
            options: ["Because it is a noble gas", "Due to an extremely strong triple bond", "Because it has no free electrons", "Due to its light molecular weight"],
            correctIndex: 1,
            explanation: "Between the two Nitrogen atoms is a triple bond (N≡N) with a very large bond energy, requiring extreme heat (over 3000°C) or electrical spark to break."
        }
    },
    {
        id: 'hcl',
        title: 'Hydrogen Chloride (HCl)',
        titleEn: 'Hydrogen Chloride (HCl)',
        moleculeKey: 'HCl',
        theory: {
            description: "HCl ở dạng khí là Hydrogen Chloride. Khi tan vào nước, nó tạo thành Axit Clohidric - một axit mạnh có trong dịch vị dạ dày giúp tiêu hóa thức ăn.",
            properties: [
                "Cấu trúc: Đường thẳng",
                "Liên kết: Cộng hóa trị phân cực",
                "Tính chất: Tan rất nhiều trong nước",
                "Momen lưỡng cực lớn do Clo có độ âm điện mạnh hơn H"
            ]
        },
        theoryEn: {
            description: "HCl in gaseous form is Hydrogen Chloride. When dissolved in water, it forms Hydrochloric Acid — a strong acid found in stomach gastric juice aiding digestion.",
            properties: [
                "Structure: Linear",
                "Bond type: Polar covalent",
                "Property: Highly soluble in water",
                "Large dipole moment due to Chlorine's higher electronegativity than Hydrogen"
            ]
        },
        quiz: {
            text: "Liên kết giữa H và Cl trong phân tử HCl thuộc loại liên kết nào?",
            options: ["Ion", "Cộng hóa trị không phân cực", "Cộng hóa trị phân cực", "Liên kết kim loại"],
            correctIndex: 2,
            explanation: "Do Clo (Cl) có độ âm điện lớn hơn nhiều so với Hydro (H), cặp electron dùng chung bị lệch về phía Clo, tạo ra liên kết cộng hóa trị phân cực."
        },
        quizEn: {
            text: "What type of bond is formed between H and Cl in an HCl molecule?",
            options: ["Ionic", "Non-polar covalent", "Polar covalent", "Metallic bond"],
            correctIndex: 2,
            explanation: "Because Chlorine (Cl) is significantly more electronegative than Hydrogen (H), the shared electron pair shifts toward Chlorine, creating a polar covalent bond."
        }
    },
    {
        id: 'c2h4',
        title: 'Ethylene (C2H4)',
        titleEn: 'Ethylene (C2H4)',
        moleculeKey: 'C2H4',
        theory: {
            description: "Ethylene (Etylen) là một hormone thực vật quan trọng giúp kích thích quả chín. Nó cũng là nguyên liệu cốt lõi để sản xuất nhựa Polyethylene (PE).",
            properties: [
                "Cấu trúc: Hình học phẳng (Planar)",
                "Liên kết: Có 1 liên kết đôi C=C",
                "Góc liên kết: ~120°",
                "Thuộc nhóm Hydrocarbon không no (Alkene)"
            ]
        },
        theoryEn: {
            description: "Ethylene is an important plant hormone that stimulates fruit ripening. It is also the core raw material for Polyethylene (PE) plastic production.",
            properties: [
                "Structure: Planar geometry",
                "Bond type: 1 double bond C=C",
                "Bond angle: ~120°",
                "Belongs to unsaturated hydrocarbons (Alkenes)"
            ]
        },
        quiz: {
            text: "Điểm đặc trưng trong cấu trúc phân tử của Ethylene (C2H4) là gì?",
            options: ["Chỉ có liên kết đơn", "Có 1 liên kết đôi", "Có 1 liên kết ba", "Tạo thành vòng benzen"],
            correctIndex: 1,
            explanation: "C2H4 có một liên kết đôi (C=C) giữa 2 nguyên tử Carbon, phần còn lại liên kết đơn với Hydro, tạo thành cấu trúc phẳng."
        },
        quizEn: {
            text: "What is the characteristic structural feature of an Ethylene (C2H4) molecule?",
            options: ["Only single bonds", "Contains 1 double bond", "Contains 1 triple bond", "Forms a benzene ring"],
            correctIndex: 1,
            explanation: "C2H4 contains one C=C double bond between the two Carbon atoms while the remaining bonds are single bonds to Hydrogen, creating a planar structure."
        }
    },
    {
        id: 'c2h2',
        title: 'Acetylene (C2H2)',
        titleEn: 'Acetylene (C2H2)',
        moleculeKey: 'C2H2',
        theory: {
            description: "Acetylene (Axetilen) là khí dùng trong đèn xì hàn cắt kim loại vì khi cháy với oxy nó tạo ra nhiệt độ cực cao (hơn 3000°C).",
            properties: [
                "Cấu trúc: Đường thẳng (Linear)",
                "Liên kết: Có 1 liên kết ba C≡C",
                "Góc liên kết: 180°",
                "Thuộc nhóm Hydrocarbon không no (Alkyne)"
            ]
        },
        theoryEn: {
            description: "Acetylene is a gas used in welding and cutting torches because burning with oxygen yields an extremely high temperature (over 3000°C).",
            properties: [
                "Structure: Linear",
                "Bond type: 1 C≡C triple bond",
                "Bond angle: 180°",
                "Belongs to unsaturated hydrocarbons (Alkynes)"
            ]
        },
        quiz: {
            text: "Cấu trúc không gian của phân tử Axetilen (C2H2) có hình dạng như thế nào?",
            options: ["Gấp khúc", "Tứ diện", "Đường thẳng", "Phẳng"],
            correctIndex: 2,
            explanation: "Hai nguyên tử Carbon nối với nhau bằng liên kết ba, và mỗi Carbon nối với 1 Hydro bằng liên kết đơn, tạo thành một đường thẳng hoàn hảo 180°."
        },
        quizEn: {
            text: "What shape is the spatial structure of an Acetylene (C2H2) molecule?",
            options: ["Bent", "Tetrahedral", "Linear", "Planar"],
            correctIndex: 2,
            explanation: "The two Carbon atoms are connected by a triple bond, and each Carbon connects to one Hydrogen atom with a single bond, forming a perfect 180° line."
        }
    },
    {
        id: 'h2o2',
        title: 'Hydrogen Peroxide (H2O2)',
        titleEn: 'Hydrogen Peroxide (H2O2)',
        moleculeKey: 'H2O2',
        theory: {
            description: "Hydrogen Peroxide (Oxy già) là một chất oxi hóa mạnh, thường được dùng để sát trùng vết thương hoặc tẩy trắng.",
            properties: [
                "Cấu trúc: Zíc zắc lệch (Cấu trúc mở quyển sách)",
                "Liên kết: O-O (Liên kết Peroxide)",
                "Tính chất: Rất dễ phân hủy thành H2O và O2",
                "Tính phân cực cao hơn cả nước"
            ]
        },
        theoryEn: {
            description: "Hydrogen Peroxide is a powerful oxidizing agent, commonly used for wound disinfection or bleaching.",
            properties: [
                "Structure: Non-planar (Open book structure)",
                "Bond type: O-O (Peroxide bond)",
                "Property: Easily decomposes into H2O and O2",
                "Higher polarity than water"
            ]
        },
        quiz: {
            text: "Liên kết đặc trưng nào tạo nên tính chất oxi hóa mạnh của phân tử H2O2?",
            options: ["Liên kết H-O", "Liên kết H-H", "Liên kết O-O", "Liên kết đôi O=O"],
            correctIndex: 2,
            explanation: "Liên kết đơn O-O (peroxide) rất kém bền và dễ bị bẻ gãy, khiến H2O2 dễ dàng giải phóng nguyên tử Oxy hoạt tính, mang lại tính oxi hóa mạnh."
        },
        quizEn: {
            text: "Which characteristic bond gives the H2O2 molecule its strong oxidizing property?",
            options: ["H-O bond", "H-H bond", "O-O bond", "O=O double bond"],
            correctIndex: 2,
            explanation: "The single O-O (peroxide) bond is unstable and easily broken, allowing H2O2 to release active oxygen atoms and display strong oxidizing behavior."
        }
    },
    {
        id: 'o3',
        title: 'Ozone (O3)',
        titleEn: 'Ozone (O3)',
        moleculeKey: 'O3',
        theory: {
            description: "Ozone là một thù hình của Oxy. Lớp Ozone trên tầng bình lưu giúp bảo vệ Trái Đất khỏi tia cực tím. Tuy nhiên ở mặt đất, nó là khí ô nhiễm.",
            properties: [
                "Cấu trúc: Chữ V (Bent)",
                "Góc liên kết: ~116.8°",
                "Tính chất: Khí màu xanh nhạt, mùi hắc",
                "Oxi hóa rất mạnh (mạnh hơn cả O2)"
            ]
        },
        theoryEn: {
            description: "Ozone is an allotrope of Oxygen. The ozone layer in the stratosphere protects Earth from UV radiation, though at ground level it acts as a pollutant.",
            properties: [
                "Structure: Bent (V-shaped)",
                "Bond angle: ~116.8°",
                "Property: Pale blue gas with a pungent odor",
                "Very strong oxidizing agent (stronger than O2)"
            ]
        },
        quiz: {
            text: "Cấu trúc không gian của phân tử Ozone (O3) có dạng gì?",
            options: ["Đường thẳng", "Chữ V (Gấp khúc)", "Tam giác đều", "Tứ diện"],
            correctIndex: 1,
            explanation: "Ozone có cấu trúc góc chữ V do cặp electron tự do trên nguyên tử Oxy trung tâm đẩy hai nguyên tử Oxy ở hai bên xuống dưới."
        },
        quizEn: {
            text: "What shape is the spatial structure of an Ozone (O3) molecule?",
            options: ["Linear", "Bent (V-shaped)", "Equilateral triangle", "Tetrahedral"],
            correctIndex: 1,
            explanation: "Ozone has a bent V-shaped structure because the lone pair of electrons on the central Oxygen atom repels the two outer Oxygen atoms downward."
        }
    },
    {
        id: 'diamond',
        title: 'Kim cương (Diamond)',
        titleEn: 'Diamond',
        moleculeKey: 'Diamond',
        theory: {
            description: "Kim cương là thù hình cứng nhất của Carbon. Mọi nguyên tử Carbon đều liên kết với 4 nguyên tử Carbon khác tạo thành mạng lưới tinh thể khổng lồ.",
            properties: [
                "Cấu trúc: Mạng tinh thể nguyên tử",
                "Liên kết: Cộng hóa trị bền vững (Tứ diện)",
                "Tính chất: Rất cứng, không dẫn điện",
                "Độ dẫn nhiệt cực cao"
            ]
        },
        theoryEn: {
            description: "Diamond is the hardest allotrope of Carbon. Every Carbon atom bonds with 4 other Carbon atoms to form a giant 3D crystal lattice.",
            properties: [
                "Structure: Giant atomic crystal lattice",
                "Bond type: Strong covalent bond (Tetrahedral)",
                "Property: Extremely hard, non-conductive",
                "Extremely high thermal conductivity"
            ]
        },
        quiz: {
            text: "Mỗi nguyên tử Carbon trong tinh thể Kim cương liên kết với bao nhiêu nguyên tử Carbon lân cận?",
            options: ["2", "3", "4", "6"],
            correctIndex: 2,
            explanation: "Mỗi nguyên tử Carbon lai hóa sp3, tạo 4 liên kết cộng hóa trị đơn với 4 nguyên tử Carbon khác ở 4 đỉnh của một tứ diện đều, liên kết xuyên suốt tạo độ cứng tuyệt đối."
        },
        quizEn: {
            text: "How many neighboring Carbon atoms is each Carbon atom bonded to in a Diamond crystal?",
            options: ["2", "3", "4", "6"],
            correctIndex: 2,
            explanation: "Each sp3 hybridized Carbon atom forms 4 single covalent bonds with 4 neighboring Carbon atoms at the vertices of a regular tetrahedron, imparting ultimate hardness."
        }
    }
];
