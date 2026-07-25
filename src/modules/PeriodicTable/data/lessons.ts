export interface LessonData {
    id: string;
    title: string;
    moleculeKey: string;
    theory: {
        description: string;
        properties: string[];
    };
    quiz: {
        text: string;
        options: string[];
        correctIndex: number;
        explanation: string;
    };
}

export const LESSONS: LessonData[] = [
    {
        id: 'h2o',
        title: 'Phân tử Nước (H2O)',
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
        quiz: {
            text: "Góc liên kết H-O-H trong phân tử nước xấp xỉ bao nhiêu độ?",
            options: ["90°", "104.5°", "109.5°", "180°"],
            correctIndex: 1,
            explanation: "Do lực đẩy của hai cặp electron tự do trên nguyên tử Oxy, góc liên kết bị ép lại còn khoảng 104.5 độ thay vì 109.5 độ như tứ diện đều."
        }
    },
    {
        id: 'ch4',
        title: 'Khí Metan (CH4)',
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
        quiz: {
            text: "Cấu trúc không gian của phân tử Metan (CH4) được gọi là gì?",
            options: ["Đường thẳng", "Gấp khúc", "Tứ diện đều", "Chóp tam giác"],
            correctIndex: 2,
            explanation: "Nguyên tử Carbon ở trung tâm liên kết với 4 nguyên tử Hydro nằm ở 4 đỉnh của một hình tứ diện đều (Tetrahedral) với góc liên kết 109.5 độ."
        }
    },
    {
        id: 'nacl',
        title: 'Tinh thể Muối ăn (NaCl)',
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
        quiz: {
            text: "Mạng tinh thể muối ăn (NaCl) được hình thành nhờ loại liên kết hóa học nào?",
            options: ["Liên kết cộng hóa trị", "Liên kết kim loại", "Liên kết ion", "Liên kết hydro"],
            correctIndex: 2,
            explanation: "Tinh thể NaCl được hình thành bởi lực hút tĩnh điện giữa các ion mang điện tích trái dấu (Na+ và Cl-), gọi là liên kết ion."
        }
    },
    {
        id: 'nh3',
        title: 'Amoniac (NH3)',
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
        quiz: {
            text: "Cấu trúc hình học không gian của phân tử Amoniac (NH3) là gì?",
            options: ["Tứ diện đều", "Đường thẳng", "Chóp tam giác", "Mặt phẳng"],
            correctIndex: 2,
            explanation: "Nguyên tử Nitơ (N) còn 1 cặp electron tự do đẩy 3 liên kết N-H xuống dưới, tạo thành cấu trúc chóp tam giác với góc liên kết ~107.8°."
        }
    },
    {
        id: 'co2',
        title: 'Carbon Dioxide (CO2)',
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
        quiz: {
            text: "Trong phân tử CO2, nguyên tử Carbon tạo ra loại liên kết nào với các nguyên tử Oxy?",
            options: ["2 liên kết đơn", "1 liên kết đơn, 1 liên kết ba", "2 liên kết đôi", "4 liên kết đơn"],
            correctIndex: 2,
            explanation: "Carbon ở trung tâm tạo 2 liên kết đôi (C=O) với 2 nguyên tử Oxy nằm ở 2 phía, tạo thành cấu trúc đường thẳng."
        }
    },
    {
        id: 'o2',
        title: 'Khí Oxy (O2)',
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
        quiz: {
            text: "Giữa 2 nguyên tử Oxy trong phân tử O2 là loại liên kết gì?",
            options: ["Liên kết đơn", "Liên kết đôi", "Liên kết ba", "Liên kết ion"],
            correctIndex: 1,
            explanation: "Mỗi nguyên tử Oxy cần thêm 2 electron để đạt cấu hình bền vững, do đó chúng góp chung 2 cặp electron tạo thành một liên kết đôi (O=O)."
        }
    },
    {
        id: 'n2',
        title: 'Khí Nitơ (N2)',
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
        quiz: {
            text: "Tại sao khí N2 lại rất trơ (khó tham gia phản ứng) ở nhiệt độ thường?",
            options: ["Vì nó là khí hiếm", "Do có liên kết ba cực kỳ vững chắc", "Vì nó không có electron tự do", "Do nó có khối lượng nhẹ"],
            correctIndex: 1,
            explanation: "Giữa 2 nguyên tử Nitơ là một liên kết ba (N≡N) có năng lượng liên kết rất lớn, cần nhiệt độ cực cao (trên 3000°C) hoặc tia lửa điện mới bẻ gãy được."
        }
    },
    {
        id: 'hcl',
        title: 'Hydrogen Chloride (HCl)',
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
        quiz: {
            text: "Liên kết giữa H và Cl trong phân tử HCl thuộc loại liên kết nào?",
            options: ["Ion", "Cộng hóa trị không phân cực", "Cộng hóa trị phân cực", "Liên kết kim loại"],
            correctIndex: 2,
            explanation: "Do Clo (Cl) có độ âm điện lớn hơn nhiều so với Hydro (H), cặp electron dùng chung bị lệch về phía Clo, tạo ra liên kết cộng hóa trị phân cực."
        }
    },
    {
        id: 'c2h4',
        title: 'Ethylene (C2H4)',
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
        quiz: {
            text: "Điểm đặc trưng trong cấu trúc phân tử của Ethylene (C2H4) là gì?",
            options: ["Chỉ có liên kết đơn", "Có 1 liên kết đôi", "Có 1 liên kết ba", "Tạo thành vòng benzen"],
            correctIndex: 1,
            explanation: "C2H4 có một liên kết đôi (C=C) giữa 2 nguyên tử Carbon, phần còn lại liên kết đơn với Hydro, tạo thành cấu trúc phẳng."
        }
    },
    {
        id: 'c2h2',
        title: 'Acetylene (C2H2)',
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
        quiz: {
            text: "Cấu trúc không gian của phân tử Axetilen (C2H2) có hình dạng như thế nào?",
            options: ["Gấp khúc", "Tứ diện", "Đường thẳng", "Phẳng"],
            correctIndex: 2,
            explanation: "Hai nguyên tử Carbon nối với nhau bằng liên kết ba, và mỗi Carbon nối với 1 Hydro bằng liên kết đơn, tạo thành một đường thẳng hoàn hảo 180°."
        }
    },
    {
        id: 'h2o2',
        title: 'Hydrogen Peroxide (H2O2)',
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
        quiz: {
            text: "Liên kết đặc trưng nào tạo nên tính chất oxi hóa mạnh của phân tử H2O2?",
            options: ["Liên kết H-O", "Liên kết H-H", "Liên kết O-O", "Liên kết đôi O=O"],
            correctIndex: 2,
            explanation: "Liên kết đơn O-O (peroxide) rất kém bền và dễ bị bẻ gãy, khiến H2O2 dễ dàng giải phóng nguyên tử Oxy hoạt tính, mang lại tính oxi hóa mạnh."
        }
    },
    {
        id: 'o3',
        title: 'Ozone (O3)',
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
        quiz: {
            text: "Cấu trúc không gian của phân tử Ozone (O3) có dạng gì?",
            options: ["Đường thẳng", "Chữ V (Gấp khúc)", "Tam giác đều", "Tứ diện"],
            correctIndex: 1,
            explanation: "Ozone có cấu trúc góc chữ V do cặp electron tự do trên nguyên tử Oxy trung tâm đẩy hai nguyên tử Oxy ở hai bên xuống dưới."
        }
    },
    {
        id: 'diamond',
        title: 'Kim cương (Diamond)',
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
        quiz: {
            text: "Mỗi nguyên tử Carbon trong tinh thể Kim cương liên kết với bao nhiêu nguyên tử Carbon lân cận?",
            options: ["2", "3", "4", "6"],
            correctIndex: 2,
            explanation: "Mỗi nguyên tử Carbon lai hóa sp3, tạo 4 liên kết cộng hóa trị đơn với 4 nguyên tử Carbon khác ở 4 đỉnh của một tứ diện đều, liên kết xuyên suốt tạo độ cứng tuyệt đối."
        }
    }
];
