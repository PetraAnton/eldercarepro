# Hướng dẫn Tích hợp FAB Helper

## 1. Thêm script vào HTML

Trong file `index.html`, thêm script **trước** các file module:

```html
<script src="fabHelper.js"></script>
<script src="module1.js"></script>
<script src="module2.js"></script>
<!-- ... các module khác -->
```

## 2. Cấu trúc HTML trong Module

Thêm FAB container vào cuối template của module:

```javascript
window.module1Content = `
    <div class="animate-fade-in">
        <form id="module1-form" class="space-y-6">
            <!-- Form content -->
        </form>
    </div>

    <!-- FAB Container -->
    ${generateFABContainerHTML('module1')}
`;
```

## 3. Khởi tạo FAB Manager

Trong hàm `initModule()`, tạo FAB Manager:

```javascript
function initModule1() {
    // Tạo FAB Manager
    window.module1FAB = createFABManager({
        moduleId: 'module1',
        formId: 'module1-form',
        
        // Kiểm tra có data hay không
        hasExistingData: () => {
            const patientId = getCurrentPatientId();
            const data = localStorage.getItem(`mirabocaresync_${patientId}_profile`);
            return !!data;
        },
        
        // Load data gốc (dùng khi cancel edit)
        loadOriginalData: () => {
            const patientId = getCurrentPatientId();
            const data = localStorage.getItem(`mirabocaresync_${patientId}_profile`);
            if (data) {
                const parsed = JSON.parse(data);
                loadModule1Data(parsed); // Hàm load data vào form
                return parsed;
            }
            return null;
        },
        
        // Callback khi save
        onSave: () => {
            return saveModule1Data(); // Hàm save của bạn
        },
        
        // Callback khi reset
        onReset: () => {
            // Reset thêm các field đặc biệt nếu cần
            console.log('Form reset');
        },
        
        // Cho phép edit (mặc định: true)
        enableEdit: true
    });

    // Khởi tạo FAB
    window.module1FAB.init();

    // Load data nếu có
    const patientId = getCurrentPatientId();
    const savedData = localStorage.getItem(`mirabocaresync_${patientId}_profile`);
    if (savedData) {
        loadModule1Data(JSON.parse(savedData));
    }

    lucide.createIcons();
}
```

## 4. Cập nhật hàm Save

Đảm bảo hàm save trả về `true` nếu thành công:

```javascript
function saveModule1Data() {
    try {
        const patientId = getCurrentPatientId();
        const data = {
            // ... collect form data
        };
        
        localStorage.setItem(`mirabocaresync_${patientId}_profile`, JSON.stringify(data));
        
        // Mark complete
        if (typeof markModuleComplete === 'function') {
            markModuleComplete(patientId, 'module1');
        }
        
        window.dispatchEvent(new Event('module-data-saved'));
        showToast('Đã lưu thành công!', 'success');
        
        return true; // Quan trọng!
    } catch (e) {
        showToast('Lỗi khi lưu: ' + e.message, 'error');
        return false;
    }
}
```

## 5. Refresh FAB khi data thay đổi

Nếu data thay đổi từ bên ngoài (ví dụ: import, sync), gọi:

```javascript
window.module1FAB.refresh();
```

## 6. Module có Tab

Nếu module có nhiều tab, ẩn/hiện FAB container khi chuyển tab:

```javascript
function switchModule2Tab(tabName) {
    const fabContainer = document.getElementById('module2-fab-container');
    
    if (tabName === 'form') {
        fabContainer?.classList.remove('hidden');
        window.module2FAB?.updateFABs();
    } else {
        fabContainer?.classList.add('hidden');
    }
    
    // ... logic chuyển tab khác
}
```

## 7. Logic Flow

### TH1: Create Mode (Chưa có data)
1. Form enabled
2. User nhập liệu → `isDirty = true`
3. Hiện **Save** + **Reset** buttons
4. Click Save → Confirm → Lưu → Chuyển View mode
5. Click Reset → Confirm → Xóa form

### TH2: View Mode (Có data)
1. Form disabled (readonly)
2. Hiện **Edit** button
3. Click Edit → Chuyển Edit mode

### TH3: Edit Mode
1. Form enabled
2. Hiện **Close** button (luôn luôn)
3. User sửa → `isDirty = true` → Hiện thêm **Update** button
4. Click Close:
   - Nếu `isDirty` → Confirm → Revert → View mode
   - Nếu không dirty → View mode
5. Click Update → Confirm → Lưu → View mode

## 8. Ví dụ Hoàn chỉnh

Xem file `module1.js` (sau khi refactor) để tham khảo implementation đầy đủ.

## 9. Lưu ý

- **Module ID** phải unique và match với tên biến global (`window.module1FAB`)
- **Form ID** phải đúng với ID trong HTML
- Hàm `onSave` phải return `true/false` để FAB biết có thành công không
- Nếu module không cho phép edit, set `enableEdit: false`
