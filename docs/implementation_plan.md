# Kế hoạch Triển khai Hệ thống MiraboCaresync

## Tổng quan

Nâng cấp hệ thống quản lý y tế dưỡng lão MiraboCaresync từ prototype hiện tại thành hệ thống đầy đủ với **9 module nghiệp vụ** theo tiêu chuẩn phục hồi chức năng Nhật Bản, dựa trên 11 hình ảnh tài liệu và yêu cầu chi tiết từ người dùng.

## Mục tiêu chính

1. **Cải thiện cấu trúc module**: Cập nhật 9 module hiện tại để phù hợp với nghiệp vụ thực tế
2. **Xây dựng form nhập liệu**: Tạo các form chi tiết cho từng module theo đúng template
3. **Tích hợp biểu đồ và trực quan hóa**: Sử dụng Chart.js để hiển thị dữ liệu theo thời gian
4. **Lưu trữ dữ liệu**: Sử dụng LocalStorage để lưu trữ dữ liệu người dùng
5. **Export PDF**: Tích hợp tính năng xuất báo cáo PDF

---

## Thay đổi chi tiết

### 1. Cập nhật cấu trúc 9 Module

#### [MODIFY] [daycare.html](file:///e:/MiraboCaresync/mihis/daycare.html)

**Thay đổi danh sách modules (dòng 257-267)**

Cập nhật từ:
```javascript
const modules = [
    { id: 1, title: 'Hồ sơ Sức khỏe', icon: 'file-heart' },
    { id: 2, title: 'Quản lý Thuốc', icon: 'pill' },
    // ... các module cũ
];
```

Thành:
```javascript
const modules = [
    { id: 1, title: 'Thông tin Cơ bản (Face Sheet)', icon: 'user-check', color: 'blue' },
    { id: 2, title: 'Họp Hội đồng Phụ trách', icon: 'users', color: 'emerald' },
    { id: 3, title: 'Đánh giá ADL/IADL', icon: 'clipboard-list', color: 'violet' },
    { id: 4, title: 'Sở thích & Mối quan tâm', icon: 'heart', color: 'pink' },
    { id: 5, title: 'Phân tích Tư thế', icon: 'scan', color: 'amber' },
    { id: 6, title: 'Phân tích Thành phần Cơ thể', icon: 'bar-chart-3', color: 'indigo' },
    { id: 7, title: 'Đánh giá Chức năng Vận động', icon: 'activity', color: 'rose' },
    { id: 8, title: 'Quản lý Đồng ý & Bảo mật', icon: 'shield-check', color: 'teal' },
    { id: 9, title: 'Khảo sát Nhà ở', icon: 'home', color: 'orange' }
];
```

---

### 2. Module 1: Thông tin Cơ bản (Refactor Comprehensive Face Sheet)

**Mục tiêu:** Đồng bộ hoàn toàn với mẫu tham chiếu `reference_02_thong_tin_co_ban.png`.

**1. Thông tin quản lý (New Top Section)**
- Ngày tư vấn, Người tạo
- Nội dung tư vấn: Sau xuất viện / Dịch vụ ban ngày / Thăm khám tại nhà / Khác
- Tình trạng chính chủ: Nhà riêng / Cơ sở / Bệnh viện / Khác

**2. Thông tin cơ bản (Mở rộng)**
- Họ tên (+ Biệt danh/Tên gọi khác nếu có)
- Ngày sinh, Giới tính, Tuổi (auto-calc)
- Mã bưu điện, Tỉnh/Thành, Quận/Huyện, Xã/Phường, Địa chỉ chi tiết (Thôn/Xóm/Số nhà)
- Điện thoại cố định & Di động riêng biệt

**3. Đánh giá Mức độ Tự lập (New Section)**
- **Người cao tuổi khuyết tật:** J1, J2, A1, A2, B1, B2, C1, C2
- **Người cao tuổi sa sút trí tuệ:** I, IIa, IIb, IIIa, IIIb, IV, M

**4. Thông tin Nhận định Chăm sóc (New Section)**
- Cấp độ chăm sóc: Hỗ trợ 1-2, Chăm sóc 1-5
- Thời gian chứng nhận (Từ ngày - Đến ngày)
- Kết quả kiểm tra cơ bản: Thuộc đối tượng / Không
- Ngày ghi bảng kiểm tra

**5. Xác nhận Khuyết tật (New Section)**
- Thể chất / Trí tuệ / Tâm thần / Bệnh hiểm nghèo / Khác

**6. Môi trường sống & Nhà ở (New Section)**
- Loại nhà: Nhà riêng, Nhà thuê, Chung cư...
- Có phòng riêng không?
- Tầng số mấy?
- Có cải tạo nhà ở không?

**7. Tình trạng Kinh tế (New Section)**
- Lương hưu (Nhà nước/Công ty)
- Trợ cấp khuyết tật / Trợ cấp sinh hoạt / Khác

**8. Người liên hệ / Tư vấn (Mở rộng)**
- Cho phép thêm nhiều người
- Trường: Họ tên, Quan hệ, Địa chỉ & Liên hệ

**9. Nguyện vọng & Khác**
- Sơ đồ phả hệ (Placeholder text area)
- Nguyện vọng sử dụng dịch vụ phòng ngừa chăm sóc (Có/Không)

**Cập nhật `module1.js`:** Replace toàn bộ form hiện tại bằng cấu trúc section mới này.

---

### 3. Module 2: Họp Hội đồng Phụ trách

**Form cần tạo:**
- Ngày họp: Date picker
- Người ghi biên bản: Text input
- Thành phần tham dự: Dynamic list (Tên, Đơn vị/Chức danh)
- Nội dung thảo luận:
  - Nguyện vọng của người sử dụng/gia đình: Textarea
  - Xác nhận thông tin cơ bản: Checkbox list
  - Xác nhận rủi ro (chống chỉ định): Checkbox list
- Kết luận:
  - Ngày bắt đầu sử dụng dịch vụ: Date
  - Lịch đưa đón: Text
  - Phương thức thanh toán: Radio (Tiền mặt / Chuyển khoản / Khác)

**Lưu trữ:** LocalStorage key: `meeting_${patientId}_${timestamp}`

---

### 4. Module 3: Đánh giá ADL/IADL

**Bảng đánh giá ADL (7 hoạt động):**
1. Ăn uống
2. Chuyển vị trí (giường ↔ ghế)
3. Vệ sinh cá nhân
4. Đi vệ sinh
5. Tắm rửa
6. Di chuyển (trong nhà)
7. Thay đồ

**Mức độ đánh giá:** Radio buttons
- Tự lập (100%)
- Hỗ trợ một phần (50%)
- Phụ thuộc hoàn toàn (0%)

**Bảng đánh giá IADL (5 hoạt động):**
1. Nấu ăn
2. Giặt giũ
3. Mua sắm
4. Sử dụng điện thoại
5. Quản lý tài chính

**Biểu đồ:**
- Radar Chart (Chart.js) - Hiển thị 7 chỉ số ADL
- Timeline Chart - So sánh kết quả giữa các lần đánh giá

---

### 5. Module 4: Sở thích & Mối quan tâm

**Danh mục 50+ hoạt động** (theo hình ảnh):
- Thể thao: Đi bộ, Thể dục, Bóng chuyền, Golf...
- Nghệ thuật: Thư pháp, Vẽ tranh, Làm gốm...
- Giải trí: Karaoke, Xem phim, Đọc sách...
- Xã hội: Gặp gỡ bạn bè, Tình nguyện...
- Khác: Làm vườn, Nấu ăn, Du lịch...

**Phân loại:** Checkbox với 3 cột
- Đang làm
- Muốn làm
- Có quan tâm

**Gợi ý:** Hiển thị top 5 hoạt động phù hợp dựa trên lựa chọn

---

### 6. Module 5: Phân tích Tư thế

**Chức năng:**
- Upload hình ảnh tư thế (Front/Side/Back)
- Hiển thị biểu đồ timeline kết quả (theo hình ảnh mẫu)
- Đánh giá:
  - Điểm tổng quát: Number input (0-100)
  - Độ nghiêng khung chậu: Number input (độ)
  - Tình trạng chân: Radio (Bình thường / Chân chữ X / Chân chữ O)
- So sánh kết quả: Table với các lần đo trước

**Biểu đồ:** Timeline chart với 2 trục (Anh 1, Anh 2) như hình mẫu

---

### 7. Module 6: Phân tích Thành phần Cơ thể

**Form nhập liệu:**
- Thông tin chung:
  - Chiều cao (cm)
  - Cân nặng (kg)
  - BMI (tự động tính)
- Khối lượng cơ:
  - Tay (phải/trái): kg
  - Chân (phải/trái): kg
  - Thân mình: kg
- Chỉ số chuyên sâu:
  - SMI (Skeletal Muscle Index): kg/m²
  - Phase Angle: độ
  - Tỷ lệ mỡ: %
  - Khối lượng xương: kg

**Biểu đồ:**
- Bar chart với màu sắc:
  - Đỏ: Thấp (cần cải thiện)
  - Vàng: Trung bình
  - Xanh: Tốt
- Line chart: Xu hướng theo thời gian (3-6 tháng)

---

### 8. Module 7: Đánh giá Chức năng Vận động

**Đo lường:**
- Lực cơ:
  - Tải trọng tối đa (kg)
  - Tỷ lệ so với cân nặng (%)
- Tốc độ phát lực (RFD):
  - Rate of Force Development (N/s)
- Độ ổn định:
  - Thời gian thăng bằng (giây)
  - Độ rung lắc (mm)

**Xếp hạng:** So với độ tuổi
- Thấp (< 25 percentile)
- Trung bình (25-75 percentile)
- Cao (> 75 percentile)

**Biểu đồ:** Radar chart + Bar chart

---

### 9. Module 8: Quản lý Đồng ý & Bảo mật

**Form bàn động ý:**
- Đồng ý bổ sung dinh dưỡng: Checkbox
- Khai báo dị ứng thực phẩm: Textarea
- Đồng ý chụp ảnh/video: Checkbox
- Đồng ý chia sẻ thông tin với:
  - Bệnh viện: Checkbox
  - Care Manager: Checkbox
  - Gia đình: Checkbox

**Chính sách bảo mật:**
- Hiển thị nội dung chính sách (từ hình ảnh)
- Checkbox xác nhận đã đọc và đồng ý
- Chữ ký điện tử: Canvas signature pad
- Ngày ký: Auto-fill

---

### 10. Module 9: Khảo sát Nhà ở

**Form đánh giá:**
- Upload hình ảnh:
  - Lối vào
  - Phòng khách
  - Nhà vệ sinh
  - Phòng ngủ
  - Bậc thang/Cầu thang
- Đánh giá từng khu vực:
  - Chiều rộng lối đi: cm
  - Chiều cao bậc thang: cm
  - Có tay vịn: Yes/No
  - Độ chiếu sáng: Tốt/Trung bình/Kém
- Gợi ý cải tạo: Auto-generate based on assessment
  - Lắp tay vịn
  - Dỡ bỏ bậc thềm
  - Cải thiện chiếu sáng
  - Thêm thảm chống trượt

---

## Tính năng bổ sung

### Dashboard tổng quan

**Thống kê:**
- Tổng số người cao tuổi
- Số lượng theo cấp độ chăm sóc
- Số lượng cần tái khám
- Biểu đồ xu hướng theo tháng

### Hệ thống lưu trữ

**LocalStorage structure:**
```javascript
{
  patients: {
    [patientId]: {
      basicInfo: {...},
      meetings: [{...}],
      adlAssessments: [{date, scores}],
      interests: [...],
      posture: [{date, images, scores}],
      bodyComposition: [{date, measurements}],
      motorFunction: [{date, tests}],
      consent: {...},
      homeAssessment: {...}
    }
  }
}
```

### Export PDF

**Sử dụng:** jsPDF library

**Báo cáo bao gồm:**
- Thông tin cơ bản
- Tất cả các đánh giá
- Biểu đồ (convert canvas to image)
- Chữ ký điện tử

---

## Kế hoạch Kiểm thử

### 1. Kiểm thử Chức năng

**Test từng module:**
1. Mở file `daycare.html` trong trình duyệt
2. Click vào "Chi tiết hồ sơ" để mở patient detail
3. Lần lượt click vào từng module (1-9)
4. Kiểm tra:
   - Form hiển thị đầy đủ các trường
   - Validation hoạt động (required fields)
   - Dữ liệu lưu vào LocalStorage
   - Biểu đồ render đúng

**Kiểm tra LocalStorage:**
```javascript
// Mở Console (F12)
console.log(localStorage.getItem('mirabocaresync_patients'));
```

### 2. Kiểm thử Biểu đồ

**Module 3 (ADL/IADL):**
- Nhập điểm cho 7 hoạt động ADL
- Kiểm tra Radar chart hiển thị đúng
- Thêm đánh giá mới → Timeline chart cập nhật

**Module 6 (Thành phần cơ thể):**
- Nhập chiều cao, cân nặng → BMI tự động tính
- Nhập các chỉ số → Bar chart hiển thị màu đúng (đỏ/vàng/xanh)
- Thêm đo lường mới → Line chart xu hướng cập nhật

### 3. Kiểm thử Export PDF

1. Điền đầy đủ thông tin cho 1 bệnh nhân
2. Click nút "Export PDF"
3. Kiểm tra file PDF:
   - Có đầy đủ thông tin
   - Biểu đồ hiển thị rõ ràng
   - Chữ ký điện tử xuất hiện
   - Format đẹp, dễ đọc

### 4. Kiểm thử Responsive

**Kiểm tra trên các kích thước:**
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

**Sử dụng Chrome DevTools:**
1. F12 → Toggle device toolbar
2. Chọn các device presets
3. Kiểm tra layout không bị vỡ

### 5. Kiểm thử Cross-browser

**Trình duyệt cần test:**
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (nếu có macOS)

---

## Lộ trình Triển khai

### Phase 1: Core System (2-3 ngày)
- ✅ Cập nhật cấu trúc 9 modules
- ✅ Xây dựng LocalStorage system
- ✅ Tạo form validation utilities

### Phase 2: Modules 1-3 (2 ngày)
- Module 1: Face Sheet
- Module 2: Service Provider Meeting
- Module 3: ADL/IADL Assessment

### Phase 3: Modules 4-6 (2 ngày)
- Module 4: Interests & Hobbies
- Module 5: Posture Analysis
- Module 6: Body Composition

### Phase 4: Modules 7-9 (2 ngày)
- Module 7: Motor Function
- Module 8: Consent & Privacy
- Module 9: Home Assessment

### Phase 5: Advanced Features (1-2 ngày)
- Dashboard với thống kê
- Export PDF functionality
- Search & Filter

### Phase 6: Testing & Polish (1 ngày)
- Cross-browser testing
- Responsive testing
- Bug fixes
- Performance optimization

---

## Yêu cầu Kỹ thuật

**Dependencies:**
- Chart.js (đã có)
- jsPDF (cần thêm)
- html2canvas (cần thêm - để export biểu đồ)
- Signature Pad (cần thêm - cho chữ ký điện tử)

**Thêm vào `<head>`:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js"></script>
```

**Browser support:**
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

---

## Ghi chú

> [!IMPORTANT]
> Hệ thống này sử dụng LocalStorage để lưu trữ dữ liệu. Dữ liệu sẽ bị mất nếu xóa cache trình duyệt. Để sử dụng production, cần tích hợp backend với database thực sự.

> [!WARNING]
> Chữ ký điện tử trong hệ thống này chỉ mang tính minh họa. Để có giá trị pháp lý, cần tích hợp với hệ thống chữ ký số được chứng thực.

> [!TIP]
> Nên backup dữ liệu LocalStorage định kỳ bằng cách export ra file JSON.
