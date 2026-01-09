# Tài liệu Dự án - MiraboCaresync

## 📚 Tổng quan

Thư mục `docs/` chứa toàn bộ tài liệu chuyên nghiệp cho dự án Hệ thống Quản lý Y tế Dưỡng Lão MiraboCaresync.

---

## 📁 Cấu trúc Thư mục

```
docs/
├── README.md                           # File này
├── documentation_checklist.md          # Danh sách tài liệu cần có
├── implementation_plan.md              # Kế hoạch triển khai
├── workflow.md                         # Luồng nghiệp vụ chi tiết
│
├── requirements/                       # Yêu cầu hệ thống
│   └── functional_requirements.md      # Yêu cầu chức năng (100+ requirements)
│
├── architecture/                       # Kiến trúc hệ thống
│   └── database_schema.md              # Thiết kế database
│
├── testing/                            # Kiểm thử
│   └── test_plan.md                    # Kế hoạch kiểm thử (100+ test cases)
│
└── images/                             # Hình ảnh tham khảo
    ├── README.md                       # Index hình ảnh
    ├── workflow_wireframe.png          # Sơ đồ wireframe
    └── reference_*.png                 # 10 hình ảnh tham khảo
```

---

## 📖 Hướng dẫn Sử dụng

### Cho Developer

1. **Bắt đầu dự án:**

   - Đọc [workflow.md](workflow.md) để hiểu luồng nghiệp vụ
   - Xem [workflow wireframe](images/workflow_wireframe.png) để nắm tổng quan
   - Đọc [implementation_plan.md](implementation_plan.md) để biết kế hoạch triển khai

2. **Khi code:**

   - Tham khảo [functional_requirements.md](requirements/functional_requirements.md) cho từng module
   - Xem [database_schema.md](architecture/database_schema.md) để biết cách lưu trữ dữ liệu
   - Xem hình ảnh tham khảo trong [images/](images/) để thiết kế UI chính xác

3. **Trước khi commit:**
   - Chạy test cases trong [test_plan.md](testing/test_plan.md)
   - Đảm bảo validation hoạt động đúng

### Cho QA/Tester

1. **Chuẩn bị test:**

   - Đọc [test_plan.md](testing/test_plan.md)
   - Chuẩn bị test data theo hướng dẫn
   - Setup test environment

2. **Thực hiện test:**
   - Theo test cases trong test plan
   - Ghi chép kết quả vào test report
   - Báo cáo bug theo template

### Cho Project Manager

1. **Theo dõi tiến độ:**

   - Xem [implementation_plan.md](implementation_plan.md) - Phase hiện tại
   - Kiểm tra [test_plan.md](testing/test_plan.md) - Test coverage

2. **Review:**
   - Đảm bảo tất cả requirements được implement
   - Xác nhận test pass rate đạt 90%

---

## ✅ Tài liệu Đã có

| Tài liệu                | File                                                                               | Trạng thái    | Ghi chú                         |
| ----------------------- | ---------------------------------------------------------------------------------- | ------------- | ------------------------------- |
| **Kế hoạch Triển khai** | [implementation_plan.md](implementation_plan.md)                                   | ✅ Hoàn thành | 6 phases, chi tiết từng module  |
| **Luồng Nghiệp vụ**     | [workflow.md](workflow.md)                                                         | ✅ Hoàn thành | 5 giai đoạn, vai trò, timeline  |
| **Wireframe**           | [images/workflow_wireframe.png](images/workflow_wireframe.png)                     | ✅ Hoàn thành | Sơ đồ khối 9 modules            |
| **Yêu cầu Chức năng**   | [requirements/functional_requirements.md](requirements/functional_requirements.md) | ✅ Hoàn thành | 100+ requirements chi tiết      |
| **Database Schema**     | [architecture/database_schema.md](architecture/database_schema.md)                 | ✅ Hoàn thành | ERD, LocalStorage, SQL          |
| **Test Plan**           | [testing/test_plan.md](testing/test_plan.md)                                       | ✅ Hoàn thành | 100+ test cases                 |
| **Hình ảnh Tham khảo**  | [images/](images/)                                                                 | ✅ Hoàn thành | 11 files (10 ref + 1 wireframe) |
| **Checklist Tài liệu**  | [documentation_checklist.md](documentation_checklist.md)                           | ✅ Hoàn thành | 30+ loại tài liệu               |

---

## 📝 Tài liệu Cần bổ sung (Tùy chọn)

Xem chi tiết trong [documentation_checklist.md](documentation_checklist.md)

### Ưu tiên Cao

- [ ] Business Requirements Document (BRD)
- [ ] Non-Functional Requirements (NFR)
- [ ] System Architecture Document
- [ ] User Manual

### Ưu tiên Trung bình

- [ ] UI/UX Design Specification
- [ ] Deployment Guide
- [ ] Security Policy
- [ ] Developer Guide

### Ưu tiên Thấp

- [ ] API Documentation (khi có backend)
- [ ] Admin Guide
- [ ] Risk Management Plan

---

## 🎯 Quy tắc Cập nhật Tài liệu

1. **Khi thêm feature mới:**

   - Cập nhật `functional_requirements.md`
   - Thêm test cases vào `test_plan.md`
   - Cập nhật `database_schema.md` nếu có thay đổi data structure

2. **Khi thay đổi workflow:**

   - Cập nhật `workflow.md`
   - Tạo wireframe mới nếu cần
   - Cập nhật `implementation_plan.md`

3. **Khi release version mới:**
   - Tạo `release_notes.md` trong `deployment/`
   - Cập nhật version trong tất cả tài liệu
   - Backup tài liệu cũ

---

## 📊 Thống kê Tài liệu

| Metric           | Giá trị                |
| ---------------- | ---------------------- |
| Tổng số tài liệu | 8 files chính          |
| Tổng số trang    | ~50 pages              |
| Số requirements  | 100+                   |
| Số test cases    | 100+                   |
| Số hình ảnh      | 11 files               |
| Coverage         | 70% (so với checklist) |

---

## 🔄 Lịch sử Cập nhật

| Ngày       | Phiên bản | Nội dung                     |
| ---------- | --------- | ---------------------------- |
| 07/01/2026 | 1.0       | Tạo tài liệu ban đầu         |
| 07/01/2026 | 1.1       | Thêm Functional Requirements |
| 07/01/2026 | 1.2       | Thêm Database Schema         |
| 09/01/2026 | 1.3       | Thêm build stage             |
