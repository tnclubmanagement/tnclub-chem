---
name: chem_3d_renderer
description: Kỹ năng render các thành phần hóa học 3D (nguyên tử, phân tử, nguyên tố) sử dụng React Three Fiber.
---

# Chemistry 3D Renderer Skill

## Tiêu chuẩn Render 3D trong Hóa Học

1. **Hiển thị Nguyên tử (Atoms):** 
   - Sử dụng `<Sphere>` từ `@react-three/drei` hoặc `<mesh>` với `sphereGeometry`.
   - Scale kích thước nguyên tử tỷ lệ thuận với bán kính Van der Waals của chúng.

2. **Hiển thị Liên kết (Bonds):** 
   - Sử dụng `<mesh>` với `cylinderGeometry`.
   - Cần tính toán vector vị trí và quaternion (hoặc dùng `lookAt`) để thanh liên kết nối chính xác tâm của hai nguyên tử.

3. **Vật liệu (Materials):** 
   - Khuyến khích sử dụng `<meshPhysicalMaterial>` để tạo cảm giác chân thực cao cấp (nhựa bóng hoặc thủy tinh).
   - Tinh chỉnh các thông số: `roughness` thấp (0.1 - 0.2), `metalness` phù hợp, có thể thêm `clearcoat` để tạo độ bóng.

4. **Ánh sáng (Lighting & Environment):** 
   - Luôn sử dụng `<Environment>` từ `@react-three/drei` (vd: `preset="city"` hoặc `preset="studio"`) để tạo phản xạ ánh sáng (reflections) đẹp mắt lên bề mặt phân tử.
   - Kết hợp `<ambientLight>` và `<directionalLight>` để có bóng đổ (shadows).

5. **Hiệu suất (Performance):**
   - Với các phân tử lớn (hàng trăm nguyên tử), BẮT BUỘC dùng `InstancedMesh` thay vì render từng mesh lẻ để giữ FPS ổn định.

6. **Tương tác:**
   - Dùng `<OrbitControls>` cho camera.
   - Dùng `<Html>` từ drei để hiển thị tooltip (tên nguyên tử, thông tin) dán trực tiếp lên không gian 3D khi hover.
