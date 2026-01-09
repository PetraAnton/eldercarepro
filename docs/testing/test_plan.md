# Test Plan
## Hệ thống Quản lý Y tế Dưỡng Lão - MiraboCaresync

**Phiên bản:** 1.0  
**Ngày:** 07/01/2026  
**Test Lead:** QA Team

---

## 1. Tổng quan

### 1.1. Mục tiêu Kiểm thử
- Đảm bảo tất cả 9 module hoạt động đúng chức năng
- Xác minh dữ liệu được lưu trữ chính xác vào LocalStorage
- Kiểm tra UI responsive trên các thiết bị
- Đảm bảo không có lỗi JavaScript console
- Validate tất cả input theo đúng quy tắc

### 1.2. Phạm vi Kiểm thử

**In Scope:**
- ✅ Functional testing cho 9 modules
- ✅ UI/UX testing
- ✅ Data validation testing
- ✅ LocalStorage testing
- ✅ Responsive design testing
- ✅ Cross-browser testing

**Out of Scope:**
- ❌ Performance testing (sẽ làm ở Phase 2)
- ❌ Security penetration testing
- ❌ Load testing
- ❌ API testing (chưa có backend)

---

## 2. Test Strategy

### 2.1. Test Levels

#### Level 1: Unit Testing
**Mục đích:** Test từng function riêng lẻ  
**Tools:** Manual testing (Phase 1), Jest (Phase 2)  
**Coverage:** Validation functions, calculation functions

#### Level 2: Integration Testing
**Mục đích:** Test tương tác giữa các module  
**Tools:** Manual testing  
**Coverage:** Data flow giữa modules, LocalStorage operations

#### Level 3: System Testing
**Mục đích:** Test toàn bộ hệ thống  
**Tools:** Manual testing  
**Coverage:** End-to-end user workflows

#### Level 4: Acceptance Testing
**Mục đích:** Xác nhận đáp ứng yêu cầu nghiệp vụ  
**Tools:** Manual testing với stakeholders  
**Coverage:** Business requirements

---

### 2.2. Test Types

| Test Type | Priority | Effort | Timeline |
|-----------|----------|--------|----------|
| Functional | High | 40% | Week 1-2 |
| UI/UX | High | 20% | Week 2 |
| Data Validation | High | 15% | Week 1 |
| Responsive | Medium | 10% | Week 2 |
| Cross-browser | Medium | 10% | Week 3 |
| Regression | High | 5% | Ongoing |

---

## 3. Test Environment

### 3.1. Hardware
- **Desktop:** Windows 10/11, macOS, Linux
- **Tablet:** iPad (iOS 14+), Android Tablet
- **Mobile:** iPhone (iOS 14+), Android Phone

### 3.2. Software
- **Browsers:**
  - Chrome 90+ (Primary)
  - Firefox 88+
  - Edge 90+
  - Safari 14+ (macOS/iOS)
- **Screen Resolutions:**
  - Desktop: 1920x1080, 1366x768
  - Tablet: 768x1024
  - Mobile: 375x667, 414x896

### 3.3. Test Data
- **Sample Patients:** 10 patient records
- **Test Scenarios:** 50+ test cases
- **Edge Cases:** Empty data, max length, special characters

---

## 4. Test Cases by Module

### 4.1. Module 1: Thông tin Cơ bản (Face Sheet)

| Test ID | Test Case | Priority | Status |
|---------|-----------|----------|--------|
| TC-M1-001 | Nhập thông tin cá nhân hợp lệ | High | ⏳ Pending |
| TC-M1-002 | Validate họ tên (required) | High | ⏳ Pending |
| TC-M1-003 | Validate ngày sinh (< today) | High | ⏳ Pending |
| TC-M1-004 | Validate số điện thoại (format) | Medium | ⏳ Pending |
| TC-M1-005 | Thêm người liên lạc khẩn cấp | High | ⏳ Pending |
| TC-M1-006 | Xóa người liên lạc khẩn cấp | Medium | ⏳ Pending |
| TC-M1-007 | Lưu dữ liệu vào LocalStorage | High | ⏳ Pending |
| TC-M1-008 | Load dữ liệu từ LocalStorage | High | ⏳ Pending |

**Chi tiết Test Case TC-M1-001:**
```
Test Case ID: TC-M1-001
Title: Nhập thông tin cá nhân hợp lệ
Preconditions: Đã mở trang daycare.html, đã click vào patient detail
Steps:
1. Click vào Module 1 (Face Sheet)
2. Nhập "Nguyễn Văn A" vào trường Họ tên
3. Nhập "グエン・ヴァン・A" vào trường Furigana
4. Chọn ngày sinh "15/05/1945"
5. Chọn giới tính "Nam"
6. Nhập địa chỉ "123 Đường ABC"
7. Nhập số điện thoại "0912-345-678"
8. Chọn cấp độ chăm sóc "Chăm sóc 2"
9. Click nút "Lưu"

Expected Result:
- Hiển thị thông báo "Lưu thành công"
- Dữ liệu xuất hiện trong LocalStorage
- Form không reset sau khi lưu

Actual Result: [To be filled during testing]
Status: ⏳ Pending
```

---

### 4.2. Module 2: Họp Hội đồng Phụ trách

| Test ID | Test Case | Priority | Status |
|---------|-----------|----------|--------|
| TC-M2-001 | Tạo biên bản cuộc họp mới | High | ⏳ Pending |
| TC-M2-002 | Thêm người tham dự (dynamic) | High | ⏳ Pending |
| TC-M2-003 | Xóa người tham dự | Medium | ⏳ Pending |
| TC-M2-004 | Nhập nội dung thảo luận | High | ⏳ Pending |
| TC-M2-005 | Nhập kết luận cuộc họp | High | ⏳ Pending |
| TC-M2-006 | Validate ngày họp (required) | High | ⏳ Pending |
| TC-M2-007 | Lưu biên bản vào LocalStorage | High | ⏳ Pending |

---

### 4.3. Module 3: Đánh giá ADL/IADL

| Test ID | Test Case | Priority | Status |
|---------|-----------|----------|--------|
| TC-M3-001 | Chọn điểm ADL cho 7 hoạt động | High | ⏳ Pending |
| TC-M3-002 | Chọn điểm IADL cho 5 hoạt động | High | ⏳ Pending |
| TC-M3-003 | Hiển thị Radar chart | High | ⏳ Pending |
| TC-M3-004 | Radar chart cập nhật khi thay đổi điểm | High | ⏳ Pending |
| TC-M3-005 | So sánh với lần đánh giá trước | Medium | ⏳ Pending |
| TC-M3-006 | Timeline chart hiển thị đúng | Medium | ⏳ Pending |

---

### 4.4. Module 4: Sở thích & Mối quan tâm

| Test ID | Test Case | Priority | Status |
|---------|-----------|----------|--------|
| TC-M4-001 | Hiển thị 50+ hoạt động | High | ⏳ Pending |
| TC-M4-002 | Check "Đang làm" cho hoạt động | High | ⏳ Pending |
| TC-M4-003 | Check "Muốn làm" cho hoạt động | High | ⏳ Pending |
| TC-M4-004 | Check "Có quan tâm" cho hoạt động | High | ⏳ Pending |
| TC-M4-005 | Gợi ý top 5 hoạt động | Medium | ⏳ Pending |
| TC-M4-006 | Lưu lựa chọn vào LocalStorage | High | ⏳ Pending |

---

### 4.5. Module 5: Phân tích Tư thế

| Test ID | Test Case | Priority | Status |
|---------|-----------|----------|--------|
| TC-M5-001 | Upload ảnh Front (valid) | High | ⏳ Pending |
| TC-M5-002 | Upload ảnh Side (valid) | High | ⏳ Pending |
| TC-M5-003 | Upload ảnh Back (valid) | High | ⏳ Pending |
| TC-M5-004 | Reject file > 5MB | High | ⏳ Pending |
| TC-M5-005 | Reject file không phải .jpg/.png | High | ⏳ Pending |
| TC-M5-006 | Nhập điểm tổng quát (0-100) | High | ⏳ Pending |
| TC-M5-007 | Nhập độ nghiêng khung chậu | Medium | ⏳ Pending |
| TC-M5-008 | Chọn tình trạng chân | High | ⏳ Pending |
| TC-M5-009 | Hiển thị Timeline chart | Medium | ⏳ Pending |
| TC-M5-010 | Lưu ảnh dạng Base64 | High | ⏳ Pending |

---

### 4.6. Module 6: Phân tích Thành phần Cơ thể

| Test ID | Test Case | Priority | Status |
|---------|-----------|----------|--------|
| TC-M6-001 | Nhập chiều cao, cân nặng | High | ⏳ Pending |
| TC-M6-002 | Tự động tính BMI | High | ⏳ Pending |
| TC-M6-003 | Nhập khối lượng cơ (5 phần) | High | ⏳ Pending |
| TC-M6-004 | Nhập SMI, Phase Angle | High | ⏳ Pending |
| TC-M6-005 | Bar chart hiển thị màu đúng | High | ⏳ Pending |
| TC-M6-006 | Màu đỏ khi < 25 percentile | High | ⏳ Pending |
| TC-M6-007 | Màu vàng khi 25-75 percentile | High | ⏳ Pending |
| TC-M6-008 | Màu xanh khi > 75 percentile | High | ⏳ Pending |
| TC-M6-009 | Line chart xu hướng | Medium | ⏳ Pending |

---

### 4.7. Module 7: Đánh giá Chức năng Vận động

| Test ID | Test Case | Priority | Status |
|---------|-----------|----------|--------|
| TC-M7-001 | Nhập tải trọng tối đa | High | ⏳ Pending |
| TC-M7-002 | Tự động tính tỷ lệ so với cân nặng | High | ⏳ Pending |
| TC-M7-003 | Nhập RFD | High | ⏳ Pending |
| TC-M7-004 | Nhập thời gian thăng bằng | High | ⏳ Pending |
| TC-M7-005 | Nhập độ rung lắc | High | ⏳ Pending |
| TC-M7-006 | Xếp hạng tự động (Thấp/TB/Cao) | High | ⏳ Pending |
| TC-M7-007 | Radar chart hiển thị | Medium | ⏳ Pending |

---

### 4.8. Module 8: Quản lý Đồng ý & Bảo mật

| Test ID | Test Case | Priority | Status |
|---------|-----------|----------|--------|
| TC-M8-001 | Check các checkbox đồng ý | High | ⏳ Pending |
| TC-M8-002 | Nhập thông tin dị ứng | High | ⏳ Pending |
| TC-M8-003 | Vẽ chữ ký trên canvas | High | ⏳ Pending |
| TC-M8-004 | Xóa và vẽ lại chữ ký | Medium | ⏳ Pending |
| TC-M8-005 | Lưu chữ ký dạng Base64 | High | ⏳ Pending |
| TC-M8-006 | Hiển thị chính sách bảo mật | High | ⏳ Pending |
| TC-M8-007 | Validate: phải check ít nhất 1 đồng ý | High | ⏳ Pending |

---

### 4.9. Module 9: Khảo sát Nhà ở

| Test ID | Test Case | Priority | Status |
|---------|-----------|----------|--------|
| TC-M9-001 | Upload ảnh 5 khu vực | High | ⏳ Pending |
| TC-M9-002 | Nhập chiều rộng lối đi | High | ⏳ Pending |
| TC-M9-003 | Nhập chiều cao bậc thang | High | ⏳ Pending |
| TC-M9-004 | Chọn có/không tay vịn | High | ⏳ Pending |
| TC-M9-005 | Chọn độ chiếu sáng | High | ⏳ Pending |
| TC-M9-006 | Gợi ý tự động (không tay vịn) | High | ⏳ Pending |
| TC-M9-007 | Gợi ý tự động (bậc thang > 20cm) | High | ⏳ Pending |
| TC-M9-008 | Gợi ý tự động (chiếu sáng kém) | High | ⏳ Pending |

---

## 5. Responsive Testing

### 5.1. Breakpoints

| Device | Resolution | Test Cases |
|--------|------------|------------|
| Desktop | 1920x1080 | Layout, Navigation, Forms |
| Laptop | 1366x768 | Layout, Navigation, Forms |
| Tablet (Portrait) | 768x1024 | Touch interactions, Layout |
| Tablet (Landscape) | 1024x768 | Layout, Charts |
| Mobile (Portrait) | 375x667 | Touch, Scrolling, Forms |
| Mobile (Landscape) | 667x375 | Layout, Navigation |

### 5.2. Test Checklist

- [ ] Sidebar collapse trên mobile
- [ ] Forms không bị vỡ layout
- [ ] Buttons đủ lớn để touch (min 44x44px)
- [ ] Charts responsive và đọc được
- [ ] Tables scroll ngang trên mobile
- [ ] Images không bị méo
- [ ] Text không bị overflow

---

## 6. Cross-browser Testing

### 6.1. Browser Matrix

| Browser | Version | Priority | Status |
|---------|---------|----------|--------|
| Chrome | 90+ | High | ⏳ Pending |
| Firefox | 88+ | High | ⏳ Pending |
| Edge | 90+ | Medium | ⏳ Pending |
| Safari | 14+ | Medium | ⏳ Pending |

### 6.2. Known Issues

| Browser | Issue | Workaround |
|---------|-------|------------|
| Safari | LocalStorage limit 5MB | Compress data |
| IE11 | Not supported | Show warning message |

---

## 7. Test Execution

### 7.1. Test Schedule

| Week | Activities | Deliverables |
|------|------------|--------------|
| Week 1 | Module 1-3 testing | Test report M1-M3 |
| Week 2 | Module 4-6 testing | Test report M4-M6 |
| Week 3 | Module 7-9 testing | Test report M7-M9 |
| Week 4 | Responsive & Cross-browser | Final test report |

### 7.2. Entry Criteria
- ✅ Implementation complete
- ✅ Test environment ready
- ✅ Test data prepared
- ✅ Test cases reviewed

### 7.3. Exit Criteria
- ✅ All high priority test cases executed
- ✅ 90% test cases passed
- ✅ No critical bugs open
- ✅ Test report approved

---

## 8. Defect Management

### 8.1. Bug Severity

| Severity | Description | Example | SLA |
|----------|-------------|---------|-----|
| Critical | System crash, data loss | LocalStorage không lưu được | 24h |
| High | Feature không hoạt động | Chart không hiển thị | 48h |
| Medium | Feature hoạt động sai | Validation không đúng | 1 week |
| Low | UI/UX issues | Màu sắc không đẹp | 2 weeks |

### 8.2. Bug Report Template

```markdown
**Bug ID:** BUG-001
**Module:** Module 3 (ADL/IADL)
**Severity:** High
**Status:** Open
**Reported By:** QA Team
**Reported Date:** 2026-01-07

**Summary:**
Radar chart không cập nhật khi thay đổi điểm ADL

**Steps to Reproduce:**
1. Mở Module 3
2. Chọn điểm "Tự lập (100%)" cho "Ăn uống"
3. Quan sát Radar chart

**Expected Result:**
Chart cập nhật ngay lập tức, điểm "Ăn uống" = 100

**Actual Result:**
Chart không thay đổi

**Screenshots:**
[Attach screenshot]

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Screen: 1920x1080
```

---

## 9. Test Metrics

### 9.1. Key Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Test Coverage | 90% | 0% |
| Pass Rate | 90% | 0% |
| Defect Density | < 5 bugs/module | 0 |
| Test Execution Rate | 100% | 0% |

### 9.2. Test Progress

```
Total Test Cases: 100
Executed: 0 (0%)
Passed: 0 (0%)
Failed: 0 (0%)
Blocked: 0 (0%)
```

---

## 10. Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| LocalStorage limit (5MB) | High | Medium | Implement data compression |
| Browser compatibility issues | Medium | Low | Early cross-browser testing |
| Test data không đủ | Medium | Low | Generate more sample data |
| Tester thiếu kinh nghiệm | Low | Low | Training session |

---

## 11. Test Deliverables

- [ ] Test Plan (this document)
- [ ] Test Cases (detailed)
- [ ] Test Data
- [ ] Test Execution Report
- [ ] Bug Reports
- [ ] Test Summary Report

---

## 12. Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Test Lead | [Name] | _________ | ______ |
| Project Manager | [Name] | _________ | ______ |
| Stakeholder | [Name] | _________ | ______ |

---

## Appendix A: Sample Test Data

Xem file: `docs/testing/test_data.json`

## Appendix B: Test Case Details

Xem file: `docs/testing/test_cases_detailed.xlsx`
