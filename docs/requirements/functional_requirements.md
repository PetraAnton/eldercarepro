# Functional Requirements Specification (FRS)
## Hệ thống Quản lý Y tế Dưỡng Lão - MiraboCaresync

**Phiên bản:** 1.1 (Vietnam Edition)  
**Ngày:** 07/01/2026  
**Người tạo:** Development Team  
**Thị trường:** Việt Nam

---

## 1. Tổng quan

Tài liệu này mô tả chi tiết các yêu cầu chức năng cho hệ thống MiraboCaresync, bao gồm 9 module nghiệp vụ theo tiêu chuẩn chăm sóc người cao tuổi Việt Nam và quy định của Bộ Y tế Việt Nam.

---

## 2. Yêu cầu Chức năng Theo Module

### Module 1: Thông tin Cơ bản (Face Sheet)

#### FR-M1-001: Nhập thông tin cá nhân
**Mô tả:** Hệ thống cho phép nhập thông tin định danh người cao tuổi  
**Input:**
- Họ và tên (Text, required, max 100 ký tự)
- Số CCCD (Text, required, 12 chữ số)
- Ngày cấp CCCD (Date, required)
- Nơi cấp CCCD (Text, required)
- Ngày sinh (Date, required, format: DD/MM/YYYY)
- Giới tính (Radio: Nam/Nữ/Khác, required)
- Địa chỉ (Object, required):
  - Số nhà, đường (Text)
  - Phường/Xã (Dropdown)
  - Quận/Huyện (Dropdown)
  - Tỉnh/Thành phố (Dropdown)
- Số điện thoại (Text, format: 10 số, bắt đầu 0)

**Output:** Lưu vào LocalStorage với key `patient_{id}_basic_info`  
**Validation:**
- Họ tên không được để trống
- Ngày sinh phải < ngày hiện tại
- Số điện thoại phải đúng format

#### FR-M1-002: Quản lý thông tin liên lạc khẩn cấp
**Mô tả:** Lưu trữ thông tin người thân để liên lạc khẩn cấp  
**Input:**
- Họ tên người thân (Text, required)
- Quan hệ (Dropdown: Con/Cháu/Vợ/Chồng/Khác, required)
- Số điện thoại (Text, required)

**Output:** Array trong `patient_{id}_basic_info.emergency_contacts`

#### FR-M1-003: Bảo hiểm Y tế (BHYT)
**Mô tả:** Quản lý thông tin bảo hiểm y tế  
**Input:**
- Số thẻ BHYT (Text, 10 ký tự, format: XX1234567890)
- Nơi đăng ký KCB ban đầu (Text)
- Hạn sử dụng thẻ (Date)
- Mức hưởng (Dropdown: 100% / 95% / 80%)

**Output:** Lưu vào `patient_{id}_basic_info.bhyt`

#### FR-M1-004: Bảo hiểm Xã hội (BHXH)
**Mô tả:** Quản lý thông tin bảo hiểm xã hội  
**Input:**
- Số sổ BHXH (Text, 10 chữ số)
- Trạng thái (Dropdown: Đang làm việc / Đã nghỉ hưu / Không có)

**Output:** Lưu vào `patient_{id}_basic_info.bhxh`

#### FR-M1-005: Mức độ phụ thuộc
**Mô tả:** Xác định mức độ hỗ trợ cần thiết  
**Input:** Dropdown với options:
- Độc lập hoàn toàn
- Phụ thuộc một phần
- Phụ thuộc hoàn toàn

**Output:** Lưu vào `patient_{id}_basic_info.dependency_level`

---

### Module 2: Họp Hội đồng Phụ trách

#### FR-M2-001: Tạo biên bản cuộc họp
**Mô tả:** Ghi chép nội dung cuộc họp giữa các bên liên quan  
**Input:**
- Ngày họp (Date, required)
- Người ghi biên bản (Text, required)
- Địa điểm họp (Text)
- Thời gian họp (Time)

**Output:** `meeting_{id}`

#### FR-M2-002: Quản lý thành phần tham dự
**Mô tả:** Danh sách người tham gia cuộc họp  
**Input:** Dynamic list với fields:
- Họ tên (Text, required)
- Đơn vị/Chức danh (Text, required)

**Output:** Array trong `meeting_{id}.attendees`  
**Action:** Nút "+" để thêm người mới, nút "x" để xóa

#### FR-M2-003: Nội dung thảo luận
**Mô tả:** Ghi chép các nội dung chính được thảo luận  
**Input:**
- Nguyện vọng người sử dụng/gia đình (Textarea, max 1000 ký tự)
- Xác nhận thông tin cơ bản (Checkbox list)
- Xác nhận rủi ro (Checkbox list)

**Output:** `meeting_{id}.discussion`

#### FR-M2-004: Kết luận cuộc họp
**Mô tả:** Quyết định sau cuộc họp  
**Input:**
- Ngày bắt đầu dịch vụ (Date, required)
- Lịch đưa đón (Text)
- Phương thức thanh toán (Radio: Tiền mặt/Chuyển khoản/Khác)

**Output:** `meeting_{id}.conclusion`

---

### Module 3: Đánh giá ADL/IADL (Barthel Index)

#### FR-M3-001: Đánh giá ADL theo Barthel Index
**Mô tả:** Đo lường khả năng thực hiện 10 hoạt động sinh hoạt cơ bản theo tiêu chuẩn Barthel Index quốc tế  
**Input:** Radio buttons cho mỗi hoạt động với mức điểm biến đổi:

1. **Feeding** (Ăn uống) - 0/5/10
2. **Transfer** (Chuyển vị trí giường-ghế) - 0/5/10/15
3. **Grooming** (Chải đầu, đánh răng, rửa mặt) - 0/5
4. **Toilet Use** (Sử dụng toilet) - 0/5/10
5. **Bathing** (Tắm rửa) - 0/5
6. **Mobility** (Di chuyển trên mặt phẳng) - 0/5/10/15
7. **Stairs** (Lên xuống cầu thang) - 0/5/10
8. **Dressing** (Thay quần áo) - 0/5/10
9. **Bowel Control** (Kiểm soát đại tiện) - 0/5/10
10. **Bladder Control** (Kiểm soát tiểu tiện) - 0/5/10

**Scoring System:** Tổng điểm từ 0-100  
**Output:** `assessment_{id}.adl_scores` với `adlTotal` (0-100)

#### FR-M3-002: Phân loại mức độ phụ thuộc
**Mô tả:** Tự động phân loại mức độ phụ thuộc dựa trên tổng điểm Barthel Index  
**Input:** Tổng điểm ADL (0-100)  
**Logic:**
- 100: Hoàn toàn độc lập
- 91-99: Phụ thuộc nhẹ
- 61-90: Phụ thuộc vừa
- 21-60: Phụ thuộc nặng
- 0-20: Phụ thuộc hoàn toàn

**Output:** Badge hiển thị phân loại với màu sắc tương ứng

#### FR-M3-003: Đánh giá IADL (Lawton-Brody Scale)
**Mô tả:** Đo lường khả năng thực hiện 8 hoạt động công cụ theo thang Lawton-Brody  
**Input:** Radio buttons cho:
1. Sử dụng điện thoại
2. Đi mua sắm
3. Chuẩn bị bữa ăn
4. Làm việc nhà
5. Giặt giũ
6. Phương tiện đi lại
7. Quản lý thuốc
8. Quản lý tài chính

**Options:** Tự lập (2) / Giám sát (1.5) / Hỗ trợ (1) / Phụ thuộc (0)  
**Scoring System:** Tổng điểm từ 0-16 (8 activities × 2 points)  
**Output:** `assessment_{id}.iadl_scores` với `iadlTotal` (0-16)

#### FR-M3-004: Hiển thị biểu đồ Radar
**Mô tả:** Trực quan hóa kết quả ADL  
**Input:** Dữ liệu từ FR-M3-001  
**Output:** Canvas với Chart.js Radar chart  
**Requirement:** Tự động cập nhật khi dữ liệu thay đổi

#### FR-M3-005: So sánh theo thời gian
**Mô tả:** Timeline chart so sánh các lần đánh giá  
**Input:** Array các lần đánh giá trước  
**Output:** Line chart với trục X = thời gian, trục Y = điểm số

#### FR-M3-006: Migration dữ liệu cũ
**Mô tả:** Tự động chuyển đổi dữ liệu ADL cũ sang định dạng Barthel Index  
**Input:** Dữ liệu ADL format cũ  
**Logic:**
- Map activity IDs: eating→feeding, hygiene→grooming
- Điều chỉnh điểm số theo thang mới
- Thêm activity 'stairs' với giá trị mặc định null
- Xóa activity 'dining' (không có trong Barthel Index)

**Output:** Dữ liệu đã được migrate với flag `migrated: true`

---

### Module 4: Sở thích & Mối quan tâm

#### FR-M4-001: Danh mục hoạt động
**Mô tả:** Hiển thị 50+ hoạt động để người dùng chọn  
**Input:** Checkbox grid với 3 cột:
- Đang làm
- Muốn làm
- Có quan tâm

**Categories:**
- Thể thao (10 items)
- Nghệ thuật (10 items)
- Giải trí (10 items)
- Xã hội (10 items)
- Khác (10 items)

**Output:** `interests_{id}.activities`

#### FR-M4-002: Gợi ý hoạt động
**Mô tả:** Tự động gợi ý hoạt động phù hợp  
**Input:** Dữ liệu từ FR-M4-001  
**Logic:** Ưu tiên "Muốn làm" > "Có quan tâm" > "Đang làm"  
**Output:** Top 5 hoạt động được đề xuất

---

### Module 5: Phân tích Tư thế

#### FR-M5-001: Upload hình ảnh
**Mô tả:** Cho phép upload ảnh tư thế  
**Input:** File input (accept: .jpg, .png, max 5MB)  
**Views:** Front, Side, Back  
**Output:** Base64 string lưu vào `posture_{id}.images`

#### FR-M5-002: Nhập kết quả phân tích
**Mô tả:** Nhập các chỉ số đánh giá  
**Input:**
- Điểm tổng quát (Number, 0-100, required)
- Độ nghiêng khung chậu (Number, độ)
- Tình trạng chân (Radio: Bình thường/Chân chữ X/Chân chữ O)

**Output:** `posture_{id}.analysis`

#### FR-M5-003: Biểu đồ Timeline
**Mô tả:** Hiển thị xu hướng theo thời gian  
**Input:** Array các lần đo  
**Output:** Line chart với 2 đường (Anh 1, Anh 2)

---

### Module 6: Phân tích Thành phần Cơ thể

#### FR-M6-001: Nhập thông tin cơ bản
**Mô tả:** Thu thập dữ liệu cơ thể  
**Input:**
- Chiều cao (Number, cm, required)
- Cân nặng (Number, kg, required)

**Auto-calculate:** BMI = cân nặng / (chiều cao/100)²  
**Output:** `body_comp_{id}.basic`

#### FR-M6-002: Nhập khối lượng cơ
**Mô tả:** Đo lường cơ từng phần  
**Input:**
- Tay phải (Number, kg)
- Tay trái (Number, kg)
- Chân phải (Number, kg)
- Chân trái (Number, kg)
- Thân mình (Number, kg)

**Output:** `body_comp_{id}.muscle_mass`

#### FR-M6-003: Chỉ số chuyên sâu
**Mô tả:** Các chỉ số phân tích nâng cao  
**Input:**
- SMI (Number, kg/m²)
- Phase Angle (Number, độ)
- Tỷ lệ mỡ (Number, %)
- Khối lượng xương (Number, kg)

**Output:** `body_comp_{id}.advanced`

#### FR-M6-004: Biểu đồ phân tích
**Mô tả:** Bar chart với màu sắc  
**Logic:**
- Đỏ: < 25 percentile (Thấp)
- Vàng: 25-75 percentile (Trung bình)
- Xanh: > 75 percentile (Tốt)

**Output:** Canvas với Chart.js Bar chart

---

### Module 7: Đánh giá Chức năng Vận động

#### FR-M7-001: Đo lực cơ
**Mô tả:** Kiểm tra sức mạnh cơ bắp  
**Input:**
- Tải trọng tối đa (Number, kg, required)
- Tỷ lệ so với cân nặng (Auto-calculate: %)

**Output:** `motor_{id}.strength`

#### FR-M7-002: Tốc độ phát lực
**Mô tả:** Đo RFD (Rate of Force Development)  
**Input:** Number, N/s  
**Output:** `motor_{id}.rfd`

#### FR-M7-003: Độ ổn định
**Mô tả:** Kiểm tra thăng bằng  
**Input:**
- Thời gian thăng bằng (Number, giây)
- Độ rung lắc (Number, mm)

**Output:** `motor_{id}.stability`

#### FR-M7-004: Xếp hạng
**Mô tả:** So sánh với độ tuổi  
**Logic:** Dựa trên percentile  
**Output:** Label (Thấp/Trung bình/Cao)

---

### Module 8: Quản lý Đồng ý & Bảo mật

#### FR-M8-001: Form đồng ý
**Mô tả:** Thu thập các đồng ý cần thiết  
**Input:** Checkboxes:
- Đồng ý bổ sung dinh dưỡng
- Đồng ý chụp ảnh/video
- Đồng ý chia sẻ với Bệnh viện
- Đồng ý chia sẻ với Care Manager
- Đồng ý chia sẻ với Gia đình

**Output:** `consent_{id}.agreements`

#### FR-M8-002: Khai báo dị ứng
**Mô tả:** Ghi chép thông tin y tế quan trọng  
**Input:** Textarea, max 500 ký tự  
**Output:** `consent_{id}.allergies`

#### FR-M8-003: Chữ ký điện tử
**Mô tả:** Ký xác nhận  
**Input:** Canvas signature pad  
**Output:** Base64 image trong `consent_{id}.signature`

#### FR-M8-004: Hiển thị chính sách
**Mô tả:** Hiển thị nội dung chính sách bảo mật  
**Input:** None  
**Output:** Modal/Section với nội dung từ reference_08

---

### Module 9: Khảo sát Nhà ở

#### FR-M9-001: Upload hình ảnh nhà ở
**Mô tả:** Thu thập ảnh các khu vực  
**Input:** File input cho:
- Lối vào
- Phòng khách
- Nhà vệ sinh
- Phòng ngủ
- Cầu thang

**Output:** Base64 array trong `home_{id}.images`

#### FR-M9-002: Đánh giá khu vực
**Mô tả:** Đo đạc và đánh giá  
**Input:**
- Chiều rộng lối đi (Number, cm)
- Chiều cao bậc thang (Number, cm)
- Có tay vịn (Radio: Có/Không)
- Độ chiếu sáng (Radio: Tốt/Trung bình/Kém)

**Output:** `home_{id}.assessment`

#### FR-M9-003: Gợi ý cải tạo
**Mô tả:** Tự động đề xuất  
**Logic:**
- Nếu không có tay vịn → Gợi ý "Lắp tay vịn"
- Nếu bậc thang > 20cm → Gợi ý "Dỡ bỏ bậc thềm"
- Nếu chiếu sáng Kém → Gợi ý "Cải thiện chiếu sáng"

**Output:** Array trong `home_{id}.suggestions`

---

## 3. Yêu cầu Chung

### FR-COMMON-001: LocalStorage Management
**Mô tả:** Tất cả dữ liệu lưu vào LocalStorage  
**Structure:**
```javascript
{
  patients: {
    [patientId]: {
      basicInfo: {...},
      meetings: [{...}],
      assessments: [{...}],
      interests: {...},
      posture: [{...}],
      bodyComposition: [{...}],
      motorFunction: [{...}],
      consent: {...},
      homeAssessment: {...}
    }
  }
}
```

### FR-COMMON-002: Navigation
**Mô tả:** Điều hướng giữa các module  
**Requirement:**
- Sidebar với 9 module
- Highlight module đang active
- Smooth transition khi chuyển module

### FR-COMMON-003: Form Validation
**Mô tả:** Validate tất cả input  
**Rules:**
- Required fields phải có dữ liệu
- Number fields chỉ nhận số
- Date fields phải đúng format
- Hiển thị error message rõ ràng

### FR-COMMON-004: Auto-save
**Mô tả:** Tự động lưu khi có thay đổi  
**Trigger:** onChange event  
**Debounce:** 1 second

---

## 4. Acceptance Criteria

Mỗi chức năng được coi là hoàn thành khi:
1. ✅ Code được implement đầy đủ
2. ✅ Validation hoạt động đúng
3. ✅ Dữ liệu lưu vào LocalStorage
4. ✅ UI responsive trên mobile/tablet/desktop
5. ✅ Không có lỗi console
6. ✅ Test cases pass

---

## 5. Phụ lục

### 5.1. Danh sách Validation Rules

| Field Type | Rules |
|------------|-------|
| Text | Max length, không chứa ký tự đặc biệt |
| Number | Min/Max value, chỉ nhận số |
| Date | Format DD/MM/YYYY, không quá ngày hiện tại |
| Email | Format email hợp lệ |
| Phone | Format 0XXX-XXX-XXX |
| File | Max size 5MB, chỉ nhận .jpg/.png |

### 5.2. Error Messages

| Error Code | Message (Vietnamese) |
|------------|---------------------|
| ERR_REQUIRED | "Trường này là bắt buộc" |
| ERR_INVALID_FORMAT | "Định dạng không hợp lệ" |
| ERR_MAX_LENGTH | "Vượt quá độ dài cho phép" |
| ERR_INVALID_DATE | "Ngày không hợp lệ" |
| ERR_FILE_TOO_LARGE | "File quá lớn (max 5MB)" |
