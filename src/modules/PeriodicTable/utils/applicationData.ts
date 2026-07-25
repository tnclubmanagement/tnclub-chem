import type { ElementData } from '../data/elements';

const customApplications: Record<string, string> = {
  'H': 'Sản xuất amoniac (phân bón), nhiên liệu tên lửa lỏng, pin nhiên liệu cho ô tô hydro.',
  'He': 'Bơm khinh khí cầu, làm mát siêu dẫn trong máy MRI, hỗn hợp khí lặn sâu.',
  'Li': 'Sản xuất pin Lithium-ion cho điện thoại, xe điện, và hợp kim siêu nhẹ cho hàng không.',
  'Be': 'Làm cửa sổ tia X, hợp kim không đánh lửa, linh kiện siêu việt trong tàu vũ trụ.',
  'B': 'Sản xuất kính Borosilicate (chịu nhiệt), sợi thủy tinh, thuốc nhỏ mắt sát trùng.',
  'C': 'Làm than chì (bút chì, điện cực), kim cương (trang sức, mũi khoan kim loại), sợi carbon.',
  'N': 'Sản xuất phân bón, thuốc nổ, làm lạnh sâu (nitơ lỏng) trong y tế.',
  'O': 'Duy trì sự sống, bình hô hấp y tế, và hàn cắt kim loại công nghiệp.',
  'F': 'Thêm vào kem đánh răng ngừa sâu răng, sản xuất Teflon chống dính.',
  'Ne': 'Bơm vào các biển quảng cáo đèn Neon phát sáng đỏ cam.',
  'Na': 'Làm đèn đường áp suất cao, điều hòa lượng nước trong cơ thể.',
  'Mg': 'Sản xuất hợp kim siêu nhẹ cho laptop, máy ảnh, và pháo sáng.',
  'Al': 'Chế tạo vỏ máy bay, ô tô, vỏ lon và giấy bạc bọc thực phẩm.',
  'Si': 'Trái tim của kỷ nguyên số: chip vi xử lý máy tính và pin mặt trời.',
  'P': 'Làm diêm quẹt (phốt pho đỏ), phân bón nông nghiệp.',
  'S': 'Sản xuất axit sulfuric, lưu hóa cao su, thuốc súng và diệt nấm.',
  'Cl': 'Khử trùng nước máy, hồ bơi, và sản xuất nhựa PVC.',
  'K': 'Sản xuất phân bón NPK giúp cây trồng phát triển mạnh.',
  'Ca': 'Thành phần chính của xương, răng; sản xuất xi măng và thạch cao.',
  'Ti': 'Làm khớp xương nhân tạo, vỏ phi thuyền không gian vì cực nhẹ và không bị gỉ.',
  'Fe': 'Sản xuất gang thép - xương sống của ngành xây dựng và máy móc.',
  'Cu': 'Sản xuất dây điện, ống nước, đồ đồng và linh kiện điện tử.',
  'Zn': 'Mạ chống gỉ cho thép (tôn), sản xuất pin và thuốc mỡ bôi da.',
  'Ag': 'Trang sức, tráng gương, tiếp điểm điện và có tính kháng khuẩn cực cao.',
  'Au': 'Trang sức cao cấp, tài sản dự trữ, bo mạch vệ tinh (không bao giờ gỉ).',
  'Hg': 'Dùng trong nhiệt kế cũ, công tắc điện và bóng đèn huỳnh quang.',
  'Pb': 'Làm tấm chắn bức xạ tia X, ắc quy xe hơi (đang dần bị cấm vì độc hại).',
  'U': 'Nhiên liệu chính trong các nhà máy điện hạt nhân, nhiên liệu tàu ngầm nguyên tử.'
};

export const getApplicationText = (el: ElementData): string => {
  if (customApplications[el.symbol]) {
    return customApplications[el.symbol];
  }

  const catLower = el.category.toLowerCase();
  
  if (el.z > 100) {
    return `Là một nguyên tố siêu nặng nhân tạo, ${el.name} chỉ tồn tại trong vài phần nghìn giây tại các máy gia tốc hạt. Hiện tại nó chỉ mang giá trị nghiên cứu vật lý lượng tử tối cao, chưa có ứng dụng thực tế.`;
  } 
  if (catLower.includes('lanthanide')) {
    return `Là một nguyên tố đất hiếm (Lanthanide), ${el.name} đặc biệt quan trọng trong chế tạo nam châm vĩnh cửu siêu mạnh, hệ thống quang học laser, và màn hình màu tiên tiến.`;
  } 
  if (catLower.includes('actinide')) {
    return `Thuộc nhóm Actinide mang tính phóng xạ cao, ${el.name} chủ yếu được nghiên cứu cho các lò phản ứng điện hạt nhân, hoặc nguồn phát tia năng lượng cao.`;
  } 
  if (catLower.includes('transition metal')) {
    return `Là một kim loại chuyển tiếp rắn chắc, ${el.name} thường được pha trộn để tạo ra các siêu hợp kim chịu lực, chống ăn mòn hoặc làm chất xúc tác trong hóa học công nghiệp.`;
  } 
  if (catLower.includes('noble gas')) {
    return `Với tính chất trơ tuyệt đối, khí hiếm ${el.name} được dùng để tạo môi trường bảo vệ chống oxi hóa hàn cắt, làm mát siêu dẫn, hoặc tạo đèn phát sáng cao áp.`;
  } 
  if (catLower.includes('nonmetal') || catLower.includes('metalloid')) {
    return `Đóng vai trò thiết yếu trong tổng hợp các vật liệu bán dẫn, hợp chất hữu cơ sinh học, hoặc sản xuất dược phẩm và các hóa chất đặc chủng.`;
  } 
  if (catLower.includes('alkali')) {
    return `Với đặc tính phản ứng hóa học cực mạnh, ${el.name} thường được ứng dụng trong công nghiệp quang điện, pin lưu trữ và chế tạo các hợp chất kiềm y tế.`;
  }

  return `Nguyên tố ${el.name} hiện đang được giới khoa học tập trung ứng dụng trong các nghiên cứu vật liệu tiên tiến, hoặc khai thác từ các khoáng chất vi lượng tự nhiên.`;
};
