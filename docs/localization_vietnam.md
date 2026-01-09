# Hướng dẫn Việt Nam hóa - MiraboCaresync

## 📍 Thị trường Mục tiêu

**Quốc gia:** Việt Nam  
**Khách hàng:** Người cao tuổi Việt Nam  
**Ngôn ngữ:** Tiếng Việt  
**Quy định:** Theo Bộ Y tế Việt Nam

---

## 🔄 Thay đổi So với Phiên bản Nhật Bản

### 1. Loại bỏ Các Yếu tố Nhật Bản

#### ❌ Furigana
**Trước:** Họ tên + Furigana (ふりがな)  
**Sau:** Chỉ Họ tên (Tiếng Việt)

**Cập nhật trong:**
- `functional_requirements.md` - Module 1
- `database_schema.md` - Table patients
- Form nhập liệu

#### ❌ Tiêu chuẩn Phục hồi Chức năng Nhật Bản
**Trước:** "Tiêu chuẩn phục hồi chức năng Nhật Bản"  
**Sau:** "Tiêu chuẩn chăm sóc người cao tuổi Việt Nam"

**Cập nhật trong:**
- `workflow.md`
- `implementation_plan.md`
- UI header

#### ❌ Cấp độ Chăm sóc Nhật (介護度)
**Trước:** Hỗ trợ 1-2, Chăm sóc 1-5  
**Sau:** Mức độ phụ thuộc (Độc lập / Phụ thuộc một phần / Phụ thuộc hoàn toàn)

---

### 2. Thêm Các Yếu tố Việt Nam

#### ✅ Bảo hiểm Y tế (BHYT)
**Thêm vào Module 1:**
- Số thẻ BHYT (10 chữ số)
- Nơi đăng ký KCB ban đầu
- Hạn sử dụng thẻ BHYT
- Mức hưởng (100% / 95% / 80%)

**Database schema:**
```sql
ALTER TABLE patients ADD COLUMN bhyt_number VARCHAR(10);
ALTER TABLE patients ADD COLUMN bhyt_facility VARCHAR(200);
ALTER TABLE patients ADD COLUMN bhyt_expiry DATE;
ALTER TABLE patients ADD COLUMN bhyt_coverage INT;
```

#### ✅ Bảo hiểm Xã hội (BHXH)
**Thêm vào Module 1:**
- Số sổ BHXH
- Đơn vị công tác (nếu có)
- Trạng thái hưu trí

#### ✅ Căn cước Công dân (CCCD)
**Thay thế cho các ID khác:**
- Số CCCD (12 chữ số)
- Ngày cấp
- Nơi cấp

#### ✅ Địa chỉ Việt Nam
**Format chuẩn:**
- Số nhà, Đường
- Phường/Xã
- Quận/Huyện
- Tỉnh/Thành phố

**Dropdown cho:**
- 63 Tỉnh/Thành phố
- Quận/Huyện theo tỉnh
- Phường/Xã theo quận

---

### 3. Thuật ngữ Y tế Việt Nam

| Thuật ngữ Nhật/Quốc tế | Thuật ngữ Việt Nam |
|------------------------|-------------------|
| Care Manager | Điều dưỡng trưởng / Quản lý chăm sóc |
| Day Care | Chăm sóc ban ngày |
| Home Care | Chăm sóc tại nhà |
| ADL | Hoạt động sống hàng ngày (ADL) |
| IADL | Hoạt động sống nâng cao (IADL) |
| Physical Therapist (PT) | Kỹ thuật viên phục hồi chức năng |
| Occupational Therapist (OT) | Chuyên viên trị liệu nghề nghiệp |
| SMI | Chỉ số khối cơ xương |
| Phase Angle | Góc pha (chất lượng tế bào) |

---

### 4. Quy định Pháp lý Việt Nam

#### Luật Người cao tuổi 2009 (sửa đổi 2023)
**Thêm vào Module 8:**
- Quyền của người cao tuổi
- Nghĩa vụ của cơ sở chăm sóc
- Trách nhiệm của gia đình

#### Nghị định 136/2013/NĐ-CP
**Về chính sách trợ giúp xã hội:**
- Đối tượng được hỗ trợ
- Mức hỗ trợ
- Thủ tục hồ sơ

#### Thông tư 11/2015/TT-BYT
**Về tiêu chuẩn cơ sở chăm sóc:**
- Cơ sở vật chất
- Nhân lực
- Quy trình chăm sóc

---

### 5. Cập nhật Module 1: Thông tin Cơ bản

**Trước (Nhật Bản):**
```javascript
{
  fullName: "Nguyễn Văn A",
  furigana: "グエン・ヴァン・A",
  careLevel: "care_2",
  insuranceExpiry: "2026-12-31"
}
```

**Sau (Việt Nam):**
```javascript
{
  fullName: "Nguyễn Văn A",
  cccd: "001234567890",
  cccdIssueDate: "2020-01-15",
  cccdIssuePlace: "Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư",
  bhytNumber: "DN1234567890",
  bhytFacility: "Bệnh viện Đa khoa Trung ương",
  bhytExpiry: "2026-12-31",
  bhytCoverage: 100,
  bhxhNumber: "1234567890",
  retirementStatus: "Đã nghỉ hưu",
  dependencyLevel: "Phụ thuộc một phần",
  address: {
    street: "123 Đường Lê Lợi",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh"
  }
}
```

---

### 6. Cập nhật Module 2: Họp Hội đồng

**Thay đổi thành phần:**
- ~~Care Manager~~ → **Điều dưỡng trưởng**
- Thêm: **Bác sĩ điều trị**
- Thêm: **Công tác xã hội viên**
- Thêm: **Đại diện UBND phường/xã** (nếu có hỗ trợ từ nhà nước)

**Nội dung thảo luận thêm:**
- Hỗ trợ từ chính sách xã hội
- Kết nối với bệnh viện tuyến
- Phối hợp với y tế cơ sở

---

### 7. Cập nhật Module 6: Phân tích Thành phần Cơ thể

**Chuẩn BMI cho người Việt Nam:**

| BMI | Phân loại (WHO châu Á-Thái Bình Dương) |
|-----|----------------------------------------|
| < 18.5 | Thiếu cân |
| 18.5 - 22.9 | Bình thường |
| 23.0 - 24.9 | Thừa cân |
| 25.0 - 29.9 | Béo phì độ I |
| ≥ 30.0 | Béo phì độ II |

**Cập nhật logic:**
```javascript
function getBMICategory(bmi) {
  if (bmi < 18.5) return { category: 'Thiếu cân', color: 'yellow' };
  if (bmi < 23.0) return { category: 'Bình thường', color: 'green' };
  if (bmi < 25.0) return { category: 'Thừa cân', color: 'yellow' };
  if (bmi < 30.0) return { category: 'Béo phì độ I', color: 'orange' };
  return { category: 'Béo phì độ II', color: 'red' };
}
```

---

### 8. Cập nhật Module 8: Đồng ý & Bảo mật

**Thay thế bằng quy định Việt Nam:**

#### Luật Bảo vệ Bí mật Nhà nước 2018
#### Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân

**Nội dung đồng ý:**
- Thu thập và xử lý dữ liệu cá nhân
- Chia sẻ thông tin với bệnh viện, bác sĩ
- Sử dụng hình ảnh cho mục đích y tế
- Quyền truy cập, sửa đổi, xóa dữ liệu
- Thời gian lưu trữ dữ liệu (5 năm)

**Template đồng ý:**
```
Tôi, [Họ tên], CCCD số [Số CCCD], đồng ý:
1. Cung cấp thông tin cá nhân và sức khỏe cho [Tên cơ sở]
2. Cho phép [Tên cơ sở] chia sẻ thông tin với bệnh viện, bác sĩ điều trị
3. Cho phép sử dụng hình ảnh cho mục đích chăm sóc y tế
4. Đã được giải thích về quyền truy cập, sửa đổi, xóa dữ liệu

Ngày ký: [DD/MM/YYYY]
Chữ ký: [Signature pad]
```

---

### 9. Cập nhật Module 9: Khảo sát Nhà ở

**Tiêu chuẩn Việt Nam:**

#### Quy chuẩn Kỹ thuật Quốc gia QCVN 18:2021/BXD
**Nhà ở dành cho người khuyết tật và người cao tuổi**

**Checklist:**
- [ ] Lối đi tối thiểu 120cm (cho xe lăn)
- [ ] Bậc thang tối đa 15cm
- [ ] Tay vịn 2 bên cầu thang
- [ ] Nhà vệ sinh có tay vịn
- [ ] Sàn chống trượt
- [ ] Chiếu sáng tối thiểu 150 lux
- [ ] Cửa ra vào tối thiểu 90cm
- [ ] Không có ngưỡng cửa > 2cm

**Gợi ý cải tạo:**
- Lắp tay vịn inox (theo TCVN 7957:2008)
- Thay gạch chống trượt (hệ số ma sát ≥ 0.5)
- Lắp đèn LED (tiết kiệm điện)
- Lắp chuông báo động khẩn cấp

---

### 10. Thanh toán và Chi phí

**Thêm vào Module 2:**

#### Nguồn chi trả:
- [ ] BHYT (nếu đủ điều kiện)
- [ ] Hỗ trợ từ chính sách xã hội
- [ ] Gia đình tự chi trả
- [ ] Kết hợp nhiều nguồn

#### Mức phí tham khảo (VNĐ):
- Chăm sóc ban ngày: 150,000 - 300,000 VNĐ/ngày
- Chăm sóc tại nhà: 200,000 - 500,000 VNĐ/lần
- Phục hồi chức năng: 100,000 - 200,000 VNĐ/buổi

---

## 📋 Checklist Việt Nam hóa

### Tài liệu
- [ ] Xóa tất cả tham chiếu đến Furigana
- [ ] Thay "Tiêu chuẩn Nhật Bản" → "Tiêu chuẩn Việt Nam"
- [ ] Cập nhật thuật ngữ y tế
- [ ] Thêm quy định pháp lý Việt Nam
- [ ] Cập nhật BMI chuẩn châu Á

### Database
- [ ] Xóa field `furigana`
- [ ] Thêm field `cccd`, `cccd_issue_date`, `cccd_issue_place`
- [ ] Thêm field `bhyt_number`, `bhyt_facility`, `bhyt_expiry`, `bhyt_coverage`
- [ ] Thêm field `bhxh_number`, `retirement_status`
- [ ] Cập nhật field `address` thành object (street, ward, district, city)
- [ ] Thay `care_level` thành `dependency_level`

### UI/UX
- [ ] Form nhập địa chỉ với dropdown 63 tỉnh/thành
- [ ] Form nhập CCCD (12 số)
- [ ] Form nhập BHYT (10 số)
- [ ] Xóa input Furigana
- [ ] Cập nhật placeholder text
- [ ] Cập nhật validation rules

### Validation
- [ ] CCCD: 12 chữ số
- [ ] BHYT: 10 chữ số, format DN1234567890
- [ ] Số điện thoại: 10 số, bắt đầu 0
- [ ] Địa chỉ: Bắt buộc chọn tỉnh/thành

### Test Cases
- [ ] Test nhập CCCD hợp lệ/không hợp lệ
- [ ] Test nhập BHYT hợp lệ/không hợp lệ
- [ ] Test dropdown địa chỉ
- [ ] Test BMI chuẩn châu Á
- [ ] Test form đồng ý theo quy định VN

---

## 🌏 Đa ngôn ngữ (Tùy chọn)

Nếu muốn hỗ trợ cả tiếng Anh:

```javascript
const i18n = {
  vi: {
    fullName: "Họ và tên",
    cccd: "Số CCCD",
    bhyt: "Số thẻ BHYT",
    // ...
  },
  en: {
    fullName: "Full Name",
    cccd: "Citizen ID",
    bhyt: "Health Insurance Number",
    // ...
  }
};
```

---

## 📞 Hỗ trợ Kỹ thuật

**Hotline:** 1900-xxxx  
**Email:** support@mirabocaresync.vn  
**Website:** www.mirabocaresync.vn

---

## 📅 Lộ trình Việt Nam hóa

| Tuần | Công việc |
|------|-----------|
| Tuần 1 | Cập nhật tài liệu và database schema |
| Tuần 2 | Cập nhật UI/UX và validation |
| Tuần 3 | Test và fix bugs |
| Tuần 4 | Deploy và training |
