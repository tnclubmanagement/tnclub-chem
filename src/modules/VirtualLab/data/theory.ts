export interface TheoryTopic {
  id: string;
  title: string;
  titleEn?: string;
  content: string;
  contentEn?: string;
  type: 'principle' | 'chemical';
}

export const THEORY_DATA: TheoryTopic[] = [
  {
    id: 't_alkali_water',
    title: 'Kim loại kiềm + Nước',
    titleEn: 'Alkali Metals + Water',
    type: 'principle',
    content: 'Kim loại kiềm (như Na, K) có tính khử rất mạnh. Khi cho vào nước, chúng phản ứng mãnh liệt, khử H+ trong H2O thành khí H2 (hiđro) và tạo ra dung dịch kiềm (bazơ) tương ứng. Phản ứng tỏa nhiều nhiệt, thường gây cháy nổ khí H2 sinh ra.',
    contentEn: 'Alkali metals (e.g. Na, K) are strong reducing agents. Reacting with water, they vigorously reduce hydrogen ions into H₂ gas while forming alkali hydroxide solutions with intense heat release.'
  },
  {
    id: 't_metal_acid',
    title: 'Kim loại + Axit',
    titleEn: 'Metals + Acids',
    type: 'principle',
    content: 'Các kim loại đứng trước Hiđro (H) trong dãy hoạt động hóa học (như Mg, Fe, Zn) có thể phản ứng với dung dịch axit (HCl, H2SO4 loãng) để tạo thành muối và giải phóng khí Hiđro. Kim loại càng đứng đầu dãy, phản ứng càng mãnh liệt.',
    contentEn: 'Metals located before Hydrogen in the activity series (such as Mg, Fe, Zn) react with dilute acids (HCl, H₂SO₄) to yield metal salts and release Hydrogen gas.'
  },
  {
    id: 't_precipitation',
    title: 'Phản ứng trao đổi (Tạo kết tủa)',
    titleEn: 'Double Replacement (Precipitation)',
    type: 'principle',
    content: 'Khi trộn hai dung dịch muối, bazơ hoặc axit, các ion trong dung dịch sẽ "đổi chỗ" cho nhau. Nếu một trong các sản phẩm mới tạo thành là chất không tan (kết tủa) hoặc chất khí, phản ứng sẽ xảy ra. Ví dụ: Ba2+ gặp SO4(2-) sẽ tạo ra BaSO4 kết tủa trắng.',
    contentEn: 'When two aqueous ionic solutions mix, cations and anions exchange partners. The reaction completes if an insoluble precipitate or gas forms (e.g. Ba²⁺ + SO₄²⁻ → BaSO₄↓).'
  },
  {
    id: 't_dissolution',
    title: 'Quá trình hòa tan & Pha loãng',
    titleEn: 'Dissolution & Dilution',
    type: 'principle',
    content: 'Hòa tan một muối rắn vào nước không sinh ra chất mới, mà chỉ làm phá vỡ mạng tinh thể, các ion phân tán vào dung dịch. Pha loãng là quá trình thêm nước vào dung dịch có sẵn để làm giảm nồng độ của nó. Đây là các hiện tượng vật lý.',
    contentEn: 'Dissolving solid salts disperses crystal ions into water without chemical change. Dilution adds pure solvent to lower solute concentration—both are physical processes.'
  }
];
