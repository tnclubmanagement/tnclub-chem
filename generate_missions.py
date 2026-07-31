import json

missions = []
mission_id = 1

def add_mission(title, description, hint, r1, r2, reward, is_dilute=False):
    global mission_id
    if is_dilute:
        ids = [f"'dilute_{r1}_{r2}'", f"'dilute_{r2}_{r1}'"]
    else:
        ids = [f"'react_{r1}_{r2}'", f"'react_{r2}_{r1}'"]
    
    m = f"""  {{
    id: 'm{mission_id}',
    title: '{title}',
    description: '{description}',
    hint: 'Gợi ý: {hint}',
    targetReactionIds: [{', '.join(ids)}],
    rewardText: '{reward}'
  }}"""
    missions.append(m)
    mission_id += 1

# 1. Alkali + Water (3)
add_mission("Khởi động Bùng nổ", "Thả một kim loại kiềm nhẹ nhất vào nước cất.", "Dùng Natri (Na) và Nước cất.", "na", "h2o", "Bùm! Bạn đã thấy phản ứng mãnh liệt của Natri chưa?")
add_mission("Ngọn Lửa Tím", "Hòa Kali vào nước để tạo ra một ngọn lửa đặc trưng.", "Dùng Kali (K) và Nước cất.", "k", "h2o", "Tuyệt! Kali cháy trong nước với ngọn lửa màu tím nhạt.")
add_mission("Bọt Khí Sữa", "Cho Canxi phản ứng với nước để tạo dung dịch đục.", "Dùng Canxi (Ca) và Nước cất.", "ca", "h2o", "Đúng rồi! Canxi phản ứng êm dịu hơn và tạo ra Canxi hiđroxit.")

# 2. Metal + Acid (10)
add_mission("Thử nghiệm Axit 1", "Tạo khí Hiđro từ Magiê và Axit clohydric.", "Dùng Magiê (Mg) và HCl.", "mg", "hcl", "Bọt khí nổi lên rất nhanh!")
add_mission("Thử nghiệm Axit 2", "Cho Sắt tác dụng với Axit clohydric.", "Dùng Sắt (Fe) và HCl.", "fe", "hcl", "Phản ứng sủi bọt từ từ tạo ra Sắt (II) clorua.")
add_mission("Thử nghiệm Axit 3", "Magiê và Axit Sunfuric.", "Dùng Mg và H2SO4.", "mg", "h2so4", "Magiê phản ứng mạnh với Axit Sunfuric loãng.")
add_mission("Thử nghiệm Axit 4", "Sắt và Axit Sunfuric.", "Dùng Fe và H2SO4.", "fe", "h2so4", "Rất tốt! Khí H2 lại được giải phóng.")
add_mission("Sự Cảnh Báo Nguy Hiểm", "Thả Natri vào Axit clohydric. Hãy cẩn thận!", "Dùng Na và HCl.", "na", "hcl", "Phản ứng cực kỳ mãnh liệt và nguy hiểm!")
add_mission("Vụ Nổ Kali", "Thả Kali vào Axit clohydric.", "Dùng K và HCl.", "k", "hcl", "Bạn không nên làm điều này trong phòng Lab thực tế!")
add_mission("Phản ứng Sôi Động", "Canxi tác dụng với HCl.", "Dùng Ca và HCl.", "ca", "hcl", "Ca tan rất nhanh trong axit.")
add_mission("Cực Kì Nguy Hiểm 1", "Natri trong Axit Sunfuric.", "Dùng Na và H2SO4.", "na", "h2so4", "Một vụ nổ kinh hoàng!")
add_mission("Cực Kì Nguy Hiểm 2", "Kali trong Axit Sunfuric.", "Dùng K và H2SO4.", "k", "h2so4", "Nổ bùm! Ảo diệu chưa?")
add_mission("Canxi và Sunfuric", "Canxi trong Axit Sunfuric.", "Dùng Ca và H2SO4.", "ca", "h2so4", "Tạo ra kết tủa mỏng CaSO4 và khí H2.")

# 3. Neutralization (3)
add_mission("Trung hòa Cơ bản", "Trộn Natri hiđroxit và Axit clohydric.", "Dùng NaOH và HCl.", "naoh", "hcl", "Muối ăn và nước đã được tạo ra.")
add_mission("Trung hòa Mạnh mẽ", "Natri hiđroxit và Axit Sunfuric.", "Dùng NaOH và H2SO4.", "naoh", "h2so4", "Tạo ra Natri Sunfat.")
add_mission("Trung hòa Bari", "Bari hiđroxit và Axit clohydric.", "Dùng Ba(OH)2 và HCl.", "ba_oh_2", "hcl", "Dung dịch trở nên trung tính.")

# 4. Precipitates (12)
add_mission("Tủa Xanh 1", "Tạo kết tủa Đồng (II) hiđroxit từ Đồng sunfat và Natri hiđroxit.", "Dùng CuSO4 và NaOH.", "cuso4", "naoh", "Đại dương xanh biếc đã hiện ra!")
add_mission("Tủa Xanh 2", "Dùng Bari hiđroxit để kết tủa ion Đồng.", "Dùng CuSO4 và Ba(OH)2.", "cuso4", "ba_oh_2", "Tạo ra hai kết tủa cùng lúc: Cu(OH)2 và BaSO4!")
add_mission("Bari Sunfat 1", "Dùng Bari Clorua để nhận biết Axit Sunfuric.", "Dùng BaCl2 và H2SO4.", "bacl2", "h2so4", "Kết tủa trắng BaSO4 không tan trong axit.")
add_mission("Bari Sunfat 2", "Nhận biết muối Sunfat bằng Bari Clorua.", "Dùng BaCl2 và Na2SO4.", "bacl2", "na2so4", "Kết tủa trắng xuất hiện tức thì.")
add_mission("Bari Sunfat 3", "Bari Clorua và Kali Sunfat.", "Dùng BaCl2 và K2SO4.", "bacl2", "k2so4", "Thêm một cách để tạo BaSO4.")
add_mission("Bari Sunfat 4", "Bari hiđroxit và Axit Sunfuric.", "Dùng Ba(OH)2 và H2SO4.", "ba_oh_2", "h2so4", "Phản ứng vừa trung hòa vừa tạo kết tủa.")
add_mission("Bạc Clorua 1", "Nhận biết muối Clorua.", "Dùng AgNO3 và NaCl.", "agno3", "nacl", "Kết tủa trắng AgCl lóa mắt.")
add_mission("Bạc Clorua 2", "Bạc nitrat và Axit clohydric.", "Dùng AgNO3 và HCl.", "agno3", "hcl", "AgCl kết tủa từ dung dịch axit.")
add_mission("Bạc Clorua 3", "Bạc nitrat và Bari Clorua.", "Dùng AgNO3 và BaCl2.", "agno3", "bacl2", "Hai kết tủa trắng đều có thể tạo ra từ Bari Clorua.")
add_mission("Nhận biết Halogen", "Thêm một phản ứng để kiểm tra tính chất của ion bạc.", "Hãy trộn AgNO3 và NaCl.", "agno3", "nacl", "Xuất sắc!")
add_mission("Bí ẩn kết tủa", "Thử trộn Đồng Sunfat và Bari Clorua.", "Dùng CuSO4 và BaCl2.", "cuso4", "bacl2", "Kết tủa BaSO4 và dung dịch CuCl2 màu xanh.")
add_mission("Làm sạch Bạc", "Sử dụng kết tủa để tinh chế bạc.", "Dùng AgNO3 và HCl.", "agno3", "hcl", "Thu được Bạc clorua nguyên chất.")

# 5. Dissolution (12)
add_mission("Sự hòa tan 1", "Hòa tan muối ăn vào nước.", "Dùng NaCl và Nước.", "nacl", "h2o", "Muối đã tan hoàn toàn.", True)
add_mission("Sự hòa tan 2", "Hòa tan Đồng sunfat vào nước.", "Dùng CuSO4 và Nước.", "cuso4", "h2o", "Dung dịch màu xanh ngọc lam.", True)
add_mission("Thuốc tím", "Tạo dung dịch Kali pemanganat.", "Dùng KMnO4 và Nước.", "kmno4", "h2o", "Màu tím lịm tìm sim vô cùng đẹp mắt!", True)
add_mission("Pha loãng Axit 1", "Pha loãng Axit clohydric.", "Dùng HCl và Nước.", "hcl", "h2o", "Nhớ nguyên tắc: Rót axit vào nước!", True)
add_mission("Pha loãng Axit 2", "Pha loãng Axit Sunfuric.", "Dùng H2SO4 và Nước.", "h2so4", "h2o", "Nhiệt lượng tỏa ra rất lớn.", True)
add_mission("Dung dịch kiềm 1", "Pha dung dịch Natri hiđroxit.", "Dùng NaOH và Nước.", "naoh", "h2o", "Dung dịch trong suốt có tính kiềm.", True)
add_mission("Dung dịch kiềm 2", "Pha dung dịch Bari hiđroxit.", "Dùng Ba(OH)2 và Nước.", "ba_oh_2", "h2o", "Nước vôi trong phiên bản Bari.", True)
add_mission("Dung dịch Muối Bạc", "Pha dung dịch Bạc nitrat.", "Dùng AgNO3 và Nước.", "agno3", "h2o", "Cẩn thận dung dịch này dính tay sẽ làm đen da.", True)
add_mission("Muối Sunfat 1", "Pha dung dịch Natri Sunfat.", "Dùng Na2SO4 và Nước.", "na2so4", "h2o", "Hoàn tất pha chế Na2SO4.", True)
add_mission("Muối Sunfat 2", "Pha dung dịch Kali Sunfat.", "Dùng K2SO4 và Nước.", "k2so4", "h2o", "Hoàn tất pha chế K2SO4.", True)
add_mission("Muối Bari", "Pha dung dịch Bari clorua.", "Dùng BaCl2 và Nước.", "bacl2", "h2o", "Dung dịch không màu của Bari.", True)
add_mission("Nghỉ ngơi", "Thêm một chút muối ăn vào nước để thư giãn.", "Dùng NaCl và Nước.", "nacl", "h2o", "Đôi khi sự đơn giản lại là tuyệt vời nhất.", True)

# Add dummy filler missions to ensure we have exactly 40 (we have 40 now? 3 + 10 + 3 + 12 + 12 = 40 exactly)
# Let's count them: 3+10 = 13. 13+3 = 16. 16+12 = 28. 28+12 = 40. Yes! Exactly 40!

output = """export interface Mission {
  id: string;
  title: string;
  description: string;
  hint: string;
  targetReactionIds?: string[];
  targetEffect?: string;
  rewardText: string;
}

export const MISSIONS: Mission[] = [
""" + ",\n".join(missions) + "\n];\n"

with open('src/modules/VirtualLab/data/missions.ts', 'w') as f:
    f.write(output)

print("Generated missions.ts with 40 missions.")
