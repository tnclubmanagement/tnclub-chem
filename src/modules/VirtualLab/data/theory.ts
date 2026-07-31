export interface TheoryTopic {
  id: string;
  title: string;
  content: string;
  type: 'principle' | 'chemical';
}

export const THEORY_DATA: TheoryTopic[] = [
  {
    id: 't_alkali_water',
    title: 'Kim loại kiềm + Nước',
    type: 'principle',
    content: 'Kim loại kiềm (như Na, K) có tính khử rất mạnh. Khi cho vào nước, chúng phản ứng mãnh liệt, khử H+ trong H2O thành khí H2 (hiđro) và tạo ra dung dịch kiềm (bazơ) tương ứng. Phản ứng tỏa nhiều nhiệt, thường gây cháy nổ khí H2 sinh ra.'
  },
  {
    id: 't_metal_acid',
    title: 'Kim loại + Axit',
    type: 'principle',
    content: 'Các kim loại đứng trước Hiđro (H) trong dãy hoạt động hóa học (như Mg, Fe, Zn) có thể phản ứng với dung dịch axit (HCl, H2SO4 loãng) để tạo thành muối và giải phóng khí Hiđro. Kim loại càng đứng đầu dãy, phản ứng càng mãnh liệt.'
  },
  {
    id: 't_precipitation',
    title: 'Phản ứng trao đổi (Tạo kết tủa)',
    type: 'principle',
    content: 'Khi trộn hai dung dịch muối, bazơ hoặc axit, các ion trong dung dịch sẽ "đổi chỗ" cho nhau. Nếu một trong các sản phẩm mới tạo thành là chất không tan (kết tủa) hoặc chất khí, phản ứng sẽ xảy ra. Ví dụ: Ba2+ gặp SO4(2-) sẽ tạo ra BaSO4 kết tủa trắng.'
  },
  {
    id: 't_dissolution',
    title: 'Quá trình hòa tan & Pha loãng',
    type: 'principle',
    content: 'Hòa tan một muối rắn vào nước không sinh ra chất mới, mà chỉ làm phá vỡ mạng tinh thể, các ion phân tán vào dung dịch. Pha loãng là quá trình thêm nước vào dung dịch có sẵn để làm giảm nồng độ của nó. Đây là các hiện tượng vật lý.'
  }
];
