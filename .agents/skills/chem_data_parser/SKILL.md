---
name: chem_data_parser
description: Kỹ năng xử lý và chuẩn hóa dữ liệu hóa học (Bảng tuần hoàn, cấu trúc phân tử, chuẩn màu sắc).
---

# Chemistry Data Parser Skill

## Tiêu chuẩn Xử lý Dữ liệu Hóa Học

1. **Quy chuẩn Màu sắc CPK (CPK Coloring):**
   - Mọi nguyên tử khi render phải tuân thủ chuẩn màu CPK quốc tế.
   - Ví dụ: Hydrogen (H) = Trắng (`#FFFFFF`), Carbon (C) = Đen/Xám đậm (`#222222`), Oxygen (O) = Đỏ (`#FF0D0D`), Nitrogen (N) = Xanh dương (`#3050F8`).
   - Cần xây dựng một Utility function `getElementColor(symbol)` để ánh xạ điều này.

2. **Cấu trúc Dữ liệu Phân tử (Molecule Data Structure):**
   - Khi parse dữ liệu, luôn trả về cấu trúc TS Interface chuẩn như sau (hoặc tương tự):
     ```typescript
     interface Atom { id: string; symbol: string; position: [number, number, number]; }
     interface Bond { source: string; target: string; type: number; } // type: 1 (đơn), 2 (đôi)
     interface Molecule { atoms: Atom[]; bonds: Bond[]; }
     ```

3. **Functional Programming & Tính Bất Biến (Immutability):**
   - Các hàm xử lý số liệu khối lượng, bán kính hoặc phân tích chuỗi hóa học (JSON, PDB, SMILES) phải là **Pure Functions**.
   - Không mutate trực tiếp object/array ban đầu. Luôn trả về clone hoặc dữ liệu mới.

4. **Tối ưu Hóa TypeScript:**
   - Không được dùng `any` khi xử lý dữ liệu từ API hoặc file local.
   - Khai báo strict type cho các Response từ file JSON Bảng tuần hoàn.
