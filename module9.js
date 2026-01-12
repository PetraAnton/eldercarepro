/**
 * Module 9: Khảo sát môi trường nhà ở (Home Environment Survey)
 * Singleton Record: One survey per patient.
 */

// Global cache for images in this session
window.currentM9Images = [];

function renderModule9(container) {
    const patientId = getCurrentPatientId();
    if (!patientId) {
        container.innerHTML = '<div class="p-8 text-center text-slate-500">Vui lòng chọn bệnh nhân.</div>';
        return;
    }

    // Load Data
    const savedData = loadModule9Data(patientId);

    // Initialize Image Cache
    window.currentM9Images = savedData?.images || [];
    m9OriginalData = savedData; // Fix: Initialize global state

    const survey = savedData || {
        address: (typeof getPatientById === 'function' ? getPatientById(patientId)?.address : '') || '',
        surveyDate: new Date().toISOString().split('T')[0],
        surveyor: 'Administrator', // Mock default
        notes: '',
        images: [],
        lat: '',
        lng: ''
    };

    container.innerHTML = `
        <div class="max-w-4xl mx-auto pb-12 animate-fade-in space-y-8">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-black text-slate-800">Khảo sát Nhà ở</h2>
                    <p class="text-slate-500 text-sm">Đánh giá môi trường sống và sinh hoạt của người cao tuổi</p>
                </div>
                 <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold font-mono">ID: ${patientId}</span>
            </div>

            <div class="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                <div class="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 class="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <i data-lucide="map-pin" class="w-5 h-5 text-indigo-600"></i>
                        Thông tin Khảo sát
                    </h3>
                    ${survey.lastUpdated ? `<span class="text-xs text-slate-400 italic">Cập nhật lần cuối: ${new Date(survey.lastUpdated).toLocaleString('vi-VN')}</span>` : ''}
                </div>
                
                <form id="m9-survey-form" class="p-8 space-y-8" onsubmit="saveModule9(event)">
                    <!-- 1. Admin Info -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Người khảo sát</label>
                            <input type="text" id="m9-surveyor" value="${survey.surveyor || ''}" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Ngày khảo sát</label>
                            <input type="date" id="m9-date" value="${survey.surveyDate || ''}" class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all">
                        </div>
                         <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Trạng thái</label>
                             <div class="px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 text-center">
                                ${survey.lat ? 'Đã có vị trí' : 'Sẵn sàng'}
                             </div>
                        </div>
                    </div>

                    <div class="border-t border-slate-100"></div>

                    <!-- 2. Location & Map -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <label class="block text-sm font-bold text-slate-700">Địa chỉ & Vị trí</label>
                            <button type="button" onclick="m9LocateOnMap()" class="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1">
                                <i data-lucide="map" class="w-3 h-3"></i> Xem trên bản đồ
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="md:col-span-2">
                                <input type="text" id="m9-address" value="${survey.address || ''}" placeholder="Nhập địa chỉ chi tiết..." onchange="m9LocateOnMap()"
                                    class="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 outline-none">
                            </div>
                        </div>

                        <!-- Map Placeholder -->
                        <div id="m9-map-container" class="w-full h-64 bg-slate-100 rounded-2xl border-2 border-slate-100 overflow-hidden relative group">
                            <!-- Helper Text if no map loaded -->
                            <div class="absolute inset-0 flex flex-col items-center justify-center text-slate-400 pointer-events-none z-0">
                                <i data-lucide="map" class="w-10 h-10 mb-2 opacity-50"></i>
                                <span class="text-xs font-bold uppercase tracking-wider">Bản đồ khu vực</span>
                            </div>
                            <!-- Actual Iframe -->
                            <iframe id="m9-map-frame" class="relative z-10 w-full h-full" loading="lazy" frameborder="0" style="border:0;" 
                                src="https://maps.google.com/maps?q=${encodeURIComponent(survey.address || 'Hanoi')}&output=embed">
                            </iframe>
                        </div>
                    </div>

                    <div class="border-t border-slate-100"></div>

                    <!-- 3. Notes -->
                    <div>
                         <label class="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <i data-lucide="file-text" class="w-4 h-4 text-slate-400"></i> Ghi chú khảo sát
                         </label>
                        <textarea id="m9-notes" rows="4" class="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Ghi lại các quan sát về lối đi, cầu thang, ánh sáng, vật cản...">${survey.notes || ''}</textarea>
                    </div>

                    <div class="border-t border-slate-100"></div>

                    <!-- 4. Images -->
                    <div>
                        <div class="flex items-center justify-between mb-4">
                             <label class="block text-sm font-bold text-slate-700 flex items-center gap-2">
                                <i data-lucide="image" class="w-4 h-4 text-slate-400"></i> Hình ảnh thực tế
                             </label>
                             <label for="m9-image-upload" class="cursor-pointer px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                                <i data-lucide="upload" class="w-4 h-4"></i> Tải ảnh lên
                             </label>
                             <input type="file" id="m9-image-upload" multiple accept="image/*" class="hidden" onchange="handleM9ImageUpload(this)">
                        </div>

                        <!-- Image Grid -->
                        <div id="m9-image-grid" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <!-- Populated by JS -->
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>

    <!-- FABs for Module 9 -->
    <div id="module9-fab-container" class="fixed bottom-48 right-8 flex flex-col-reverse items-end gap-5 z-40 animate-fade-in pointer-events-none">
        
        <!-- SAVE (Create Mode) -->
        <button type="button" id="module9-fab-save" onclick="document.getElementById('m9-survey-form').requestSubmit()" 
            class="pointer-events-auto hidden w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-full shadow-[0_8px_30px_rgb(79,70,229,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
            <i data-lucide="save" class="w-7 h-7"></i>
            <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                Lưu khảo sát
            </span>
        </button>
        
        <!-- UPDATE (Edit Mode) -->
        <button type="button" id="module9-fab-update" onclick="document.getElementById('m9-survey-form').requestSubmit()" 
            class="pointer-events-auto hidden w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
            <i data-lucide="save" class="w-7 h-7"></i>
            <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                Lưu thay đổi
            </span>
        </button>

        <!-- EDIT (View Mode) -->
        <button type="button" id="module9-fab-edit" onclick="toggleModule9EditMode(true)" 
            class="pointer-events-auto w-14 h-14 bg-amber-500 text-white rounded-full shadow-[0_8px_25px_rgb(245,158,11,0.5)] hover:bg-amber-400 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
            <i data-lucide="edit-2" class="w-6 h-6"></i>
            <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                Chỉnh sửa
            </span>
        </button>

        <!-- CLOSE (Cancel Edit) -->
        <button type="button" id="module9-fab-close" onclick="cancelModule9Edit()" 
            class="pointer-events-auto hidden w-12 h-12 bg-white text-slate-500 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-slate-200 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative border border-slate-100 ring-2 ring-white">
            <i data-lucide="x" class="w-6 h-6"></i>
            <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                Đóng / Hủy
            </span>
        </button>

        <!-- RESET (Create Mode) -->
        <button type="button" id="module9-fab-cancel" onclick="resetModule9Form()" 
            class="pointer-events-auto hidden w-12 h-12 bg-white text-rose-500 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-rose-100 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative border border-rose-50 ring-2 ring-white">
            <i data-lucide="rotate-ccw" class="w-6 h-6"></i>
            <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                <span id="module9-cancel-text">Nhập lại</span>
            </span>
        </button>
    </div>
    `;

    // Render initial images
    refreshM9ImageGrid();

    // Determine initial mode
    const hasData = survey.lat || (survey.address && survey.address.length > 0) || (survey.images && survey.images.length > 0);

    // Init Logic
    initModule9FabLogic();
    toggleModule9EditMode(!hasData); // Start in Edit if no data, View if has data

    lucide.createIcons();
}

// Global M9 State
let m9IsDirty = false;
let m9OriginalData = null; // Should be set when loading data to View mode

// Init FAB Logic
function initModule9FabLogic() {
    const form = document.getElementById('m9-survey-form');
    form.addEventListener('input', () => {
        if (!m9IsDirty) {
            m9IsDirty = true;
            updateModule9FabState();
        }
    });
}

// Update FAB State
function updateModule9FabState(forceMode) {
    const form = document.getElementById('m9-survey-form');
    // Check if Inputs are disabled to determine mode if not forced
    const inputs = form.querySelectorAll('input');
    const isEdit = inputs.length > 0 && !inputs[0].disabled;

    // Determine logical mode
    let mode = forceMode;
    if (!mode) {
        if (m9OriginalData) {
            mode = isEdit ? 'edit' : 'view';
        } else {
            mode = 'create';
        }
    }

    const editBtn = document.getElementById('module9-fab-edit');
    const saveBtn = document.getElementById('module9-fab-save');
    const updateBtn = document.getElementById('module9-fab-update');
    const closeBtn = document.getElementById('module9-fab-close');
    const resetBtn = document.getElementById('module9-fab-cancel');

    // Hide ALL first
    [editBtn, saveBtn, updateBtn, closeBtn, resetBtn].forEach(btn => {
        if (btn) btn.classList.add('hidden');
    });

    if (mode === 'view') {
        if (editBtn) editBtn.classList.remove('hidden');
    } else if (mode === 'edit') {
        if (closeBtn) closeBtn.classList.remove('hidden');
        if (m9IsDirty) {
            if (m9OriginalData) {
                if (updateBtn) updateBtn.classList.remove('hidden');
                if (saveBtn) saveBtn.classList.add('hidden');
            } else {
                if (saveBtn) saveBtn.classList.remove('hidden');
                if (updateBtn) updateBtn.classList.add('hidden');
            }
        }
    } else if (mode === 'create') {
        if (m9IsDirty) {
            if (saveBtn) saveBtn.classList.remove('hidden');
            if (resetBtn) resetBtn.classList.remove('hidden');
        }
    }
}


// --- Data Logic ---

function loadModule9Data(patientId) {
    try {
        return JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_home_survey`) || 'null');
    } catch (e) {
        console.error('Error loading M9 data', e);
        return null;
    }
}

function resetModule9Form() {
    if (confirm('Bạn có chắc chắn muốn xóa dữ liệu nhập không?')) {
        document.getElementById('m9-survey-form').reset();
        window.currentM9Images = [];
        refreshM9ImageGrid();
        // Reset date
        document.getElementById('m9-date').value = new Date().toISOString().split('T')[0];

        m9IsDirty = false;
        updateModule9FabState('create');
        showToast('Đã xóa hình ảnh và dữ liệu', 'info');
    }
}

// Toggle Edit/View
function toggleModule9EditMode(isEdit) {
    const form = document.getElementById('m9-survey-form');
    const inputs = form.querySelectorAll('input, textarea, button');

    // Don't disable zoom buttons on map, but we'll just handle form inputs
    // Actually map interactions are separate.

    if (isEdit) {
        inputs.forEach(el => {
            if (el.id !== 'module9-fab-save' && el.id !== 'module9-fab-update' && el.id !== 'module9-fab-close' && el.id !== 'module9-fab-cancel') {
                el.disabled = false;
            }
        });

        // If we are editing existing data
        if (!m9IsDirty && !m9OriginalData) {
            // Maybe capture here? Or assume logic works.
        }
        updateModule9FabState();

    } else {
        inputs.forEach(el => {
            if (el.id !== 'module9-fab-edit') {
                el.disabled = true;
            }
        });
        m9IsDirty = false;
        updateModule9FabState('view');
    }

    lucide.createIcons();
}

function cancelModule9Edit() {
    if (m9IsDirty) {
        if (confirm('Hủy bỏ thay đổi?')) {
            // Always reset the form first to clear any 'dirty' states
            document.getElementById('m9-survey-form').reset();

            // Revert
            const patientId = getCurrentPatientId();
            const data = loadModule9Data(patientId);
            if (data) {
                m9OriginalData = data; // Ensure cache is consistent
                // Re-render M9 correctly
                const container = document.getElementById('module-content');
                if (container) renderModule9(container);
            } else {
                resetModule9Form();
            }
        }
    } else {
        toggleModule9EditMode(false);
    }
}


function saveModule9(e) {
    if (e) e.preventDefault();

    try {
        const patientId = getCurrentPatientId();

        const survey = {
            lastUpdated: new Date().toISOString(),
            surveyor: document.getElementById('m9-surveyor').value,
            surveyDate: document.getElementById('m9-date').value,
            address: document.getElementById('m9-address').value,
            notes: document.getElementById('m9-notes').value,
            images: window.currentM9Images || []
        };

        localStorage.setItem(`mirabocaresync_${patientId}_home_survey`, JSON.stringify(survey));

        // Mark complete
        const status = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_status`) || '{}');
        status.module9 = true;
        localStorage.setItem(`mirabocaresync_${patientId}_status`, JSON.stringify(status));

        window.dispatchEvent(new Event('module-data-saved'));

        showToast('Đã lưu thông tin khảo sát!', 'success');

        // Switch to Read-Only Mode
        toggleModule9EditMode(false);

    } catch (err) {
        console.error('Save failed:', err);
        if (err.name === 'QuotaExceededError' || err.code === 22 || err.message.includes('quota')) {
            showToast('Lỗi: Bộ nhớ đầy! Vui lòng xóa bớt ảnh hoặc nén ảnh nhỏ hơn.', 'error');
            alert('Bộ nhớ trình duyệt đã đầy (Quota Exceeded).\n\nNguyên nhân: Lưu quá nhiều ảnh hoặc ảnh quá lớn.\n\nGiải pháp:\n1. Xóa bớt các ảnh không cần thiết trong khảo sát này.\n2. Xóa bớt các hồ sơ bệnh nhân cũ không dùng đến.\n3. Thử tải lại trang và nhập lại.');
        } else {
            showToast('Lỗi khi lưu: ' + err.message, 'error');
        }
    }
}

// Toggle Edit Mode
function toggleModule9EditMode(isEdit) {
    const form = document.getElementById('m9-survey-form');
    if (!form) return;

    const savedData = loadModule9Data(getCurrentPatientId());

    // 1. Toggle Inputs
    const inputs = form.querySelectorAll('input, textarea, button, select');
    inputs.forEach(el => {
        if (el.id?.includes('fab')) return; // Skip FABs
        if (el.closest('.m9-map-container')) return; // Skip map controls if any (iframe is fine)
        el.disabled = !isEdit;
    });

    // 2. Toggle FABs
    // 2. Toggle FABs - DELEGATE TO updateModule9FabState
    const uploadLabel = document.querySelector('label[for="m9-image-upload"]');
    const m9MapBtn = document.querySelector('button[onclick="m9LocateOnMap()"]');

    if (isEdit) {
        // EDIT MODE
        if (uploadLabel) uploadLabel.classList.remove('pointer-events-none', 'opacity-50');
        if (m9MapBtn) m9MapBtn.classList.remove('pointer-events-none', 'opacity-50');
    } else {
        // VIEW MODE (Read Only)
        if (uploadLabel) uploadLabel.classList.add('pointer-events-none', 'opacity-50');
        if (m9MapBtn) m9MapBtn.classList.add('pointer-events-none', 'opacity-50');
    }

    // Ensure state is updated based on current dirty/data state
    // We pass 'edit' or 'view' explicitly or let it derive?
    // Let it derive from m9OriginalData + isEdit status logic in updateModule9FabState
    // But updateModule9FabState derives 'isEdit' from analyzing inputs.disabled.
    // We just toggled inputs.disabled above. So calling it with no args should work.
    updateModule9FabState();

    // 3. Update Image Grid (Hide delete buttons)
    const delBtns = document.querySelectorAll('#m9-image-grid button.bg-red-500\\/80'); // Escape slash
    delBtns.forEach(btn => {
        if (isEdit) btn.classList.remove('hidden');
        else btn.classList.add('hidden');
    });

}

function m9LocateOnMap() {
    const address = document.getElementById('m9-address').value;
    if (!address) {
        showToast('Vui lòng nhập địa chỉ', 'warning');
        return;
    }
    const frame = document.getElementById('m9-map-frame');
    if (frame) frame.src = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}

// Image Handlers

function handleM9ImageUpload(input) {
    if (input.files && input.files.length > 0) {
        Array.from(input.files).forEach(file => {
            // Compress before adding
            compressImage(file, 800, 0.7, (compressedDataUrl) => {
                try {
                    // Check estimated size (Base64 length * 0.75 ~= bytes)
                    if (compressedDataUrl.length > 500000) { // ~375KB limit per image
                        showToast(`Ảnh quá lớn: ${file.name}. Đã tự động giảm chất lượng.`, 'warning');
                    }
                    window.currentM9Images.push(compressedDataUrl);
                    refreshM9ImageGrid();
                    // Fix: Set dirty and update FAB
                    m9IsDirty = true;
                    updateModule9FabState();
                } catch (e) {
                    showToast('Không thể thêm ảnh: Bộ nhớ đầy', 'error');
                }
            });
        });
    }
}

// Helper: Compress Image using Canvas
function compressImage(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Returns base64 string
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            callback(dataUrl);
        };
        img.onerror = (err) => {
            console.error("Image load error", err);
            // Fallback to original if compression fails? Or just fail?
            // Let's try to return original but warn
            callback(event.target.result);
        };
    };
}

function removeM9Image(index) {
    if (confirm('Xóa hình ảnh này?')) {
        window.currentM9Images.splice(index, 1);
        refreshM9ImageGrid();

        // Fix: Set dirty and update FAB
        m9IsDirty = true;
        updateModule9FabState();
    }
}

// Slideshow Viewer
let currentImageIndex = 0;

function refreshM9ImageGrid() {
    const grid = document.getElementById('m9-image-grid');
    if (!grid) return;

    // Safety check for array
    const imgs = Array.isArray(window.currentM9Images) ? window.currentM9Images : [];

    if (imgs.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                <p class="text-slate-400 text-xs font-medium">Chưa có hình ảnh nào</p>
            </div>
        `;
    } else {
        grid.innerHTML = imgs.map((img, idx) => `
            <div onclick="viewM9Image(${idx})" class="relative aspect-square rounded-xl overflow-hidden group border border-slate-200 bg-slate-50 animate-fade-in cursor-pointer">
                <img src="${img}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <button type="button" class="p-2 bg-white/20 backdrop-blur rounded-lg text-white hover:bg-white/40"><i data-lucide="eye" class="w-4 h-4"></i></button>
                     <button type="button" onclick="event.stopPropagation(); removeM9Image(${idx})" class="p-2 bg-red-500/80 backdrop-blur rounded-lg text-white hover:bg-red-600"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                </div>
            </div>
        `).join('');
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function viewM9Image(index) {
    currentImageIndex = index;
    const imgs = window.currentM9Images;
    if (!imgs || imgs.length === 0) return;

    const viewer = document.createElement('div');
    viewer.id = 'm9-image-viewer';
    viewer.className = 'fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in backdrop-blur-sm select-none';

    // Render Viewer Content
    const renderContent = () => {
        const hasMultiple = imgs.length > 1;
        return `
            <!-- Top Bar -->
            <div class="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 text-white/80">
                <div class="bg-black/40 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold font-mono">
                    ${currentImageIndex + 1} / ${imgs.length}
                </div>
                <button onclick="closeM9ImageViewer()" class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>

            <!-- Image Area -->
            <div class="relative w-full h-full flex items-center justify-center max-w-6xl mx-auto">
                <img src="${imgs[currentImageIndex]}" class="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl transition-all duration-300" id="m9-viewer-img">
            </div>

            <!-- Controls -->
            ${hasMultiple ? `
                <button onclick="navigateM9Image(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
                    <i data-lucide="chevron-left" class="w-8 h-8"></i>
                </button>
                <button onclick="navigateM9Image(1)" class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
                    <i data-lucide="chevron-right" class="w-8 h-8"></i>
                </button>
                 
                <!-- Thumbs (Optional, simple dots for now) -->
                 <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4 scrollbar-hide">
                    ${imgs.map((_, i) => `
                        <button onclick="jumpToM9Image(${i})" class="w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}"></button>
                    `).join('')}
                 </div>
            ` : ''}
        `;
    };

    viewer.innerHTML = renderContent();
    document.body.appendChild(viewer);
    lucide.createIcons();

    // Keyboard Navigation
    document.addEventListener('keydown', handleM9ViewerKeys);
}

function navigateM9Image(direction) {
    const imgs = window.currentM9Images;
    currentImageIndex += direction;

    // Loop
    if (currentImageIndex < 0) currentImageIndex = imgs.length - 1;
    if (currentImageIndex >= imgs.length) currentImageIndex = 0;

    // Re-render essentially just image and counter? Or simpler: just replace src and counters
    const viewer = document.getElementById('m9-image-viewer');
    if (viewer) {
        viewer.innerHTML = ''; // Clear to prevent duplicate listeners if re-rendering innerHTML
        // Actually, re-injecting innerHTML is easiest for updating state without complex DOM manipulation
        // But let's be careful about lucide.

        // Re-call viewM9Image logic but just update DOM? No, just close and reopen? No that flickers.
        // Let's just update the specific elements.

        // UPDATE: simpler approach - just remove old one and append new one?
        // Let's just update the innerHTML effectively.
        viewer.innerHTML = getM9ViewerHTML(imgs, currentImageIndex);
        lucide.createIcons();
    }
}

function jumpToM9Image(index) {
    currentImageIndex = index;
    const viewer = document.getElementById('m9-image-viewer');
    if (viewer) {
        viewer.innerHTML = getM9ViewerHTML(window.currentM9Images, currentImageIndex);
        lucide.createIcons();
    }
}

// Helper to generate HTML to avoid duplication
function getM9ViewerHTML(imgs, index) {
    const hasMultiple = imgs.length > 1;
    return `
            <!-- Top Bar -->
            <div class="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 text-white/80">
                <div class="bg-black/40 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold font-mono">
                    ${index + 1} / ${imgs.length}
                </div>
                <button onclick="closeM9ImageViewer()" class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>

            <!-- Image Area -->
            <div class="relative w-full h-full flex items-center justify-center max-w-6xl mx-auto">
                <img src="${imgs[index]}" class="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl animate-fade-in" id="m9-viewer-img">
            </div>

            <!-- Controls -->
            ${hasMultiple ? `
                <button onclick="navigateM9Image(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
                    <i data-lucide="chevron-left" class="w-8 h-8"></i>
                </button>
                <button onclick="navigateM9Image(1)" class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
                    <i data-lucide="chevron-right" class="w-8 h-8"></i>
                </button>
                 
                 <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4 scrollbar-hide py-2">
                    ${imgs.map((_, i) => `
                        <button onclick="jumpToM9Image(${i})" class="w-2 h-2 rounded-full transition-all ${i === index ? 'bg-white scale-150 shadow-glow' : 'bg-white/30 hover:bg-white/50'}"></button>
                    `).join('')}
                 </div>
            ` : ''}
        `;
}


function closeM9ImageViewer() {
    const viewer = document.getElementById('m9-image-viewer');
    if (viewer) viewer.remove();
    document.removeEventListener('keydown', handleM9ViewerKeys);
}

function handleM9ViewerKeys(e) {
    if (e.key === 'Escape') closeM9ImageViewer();
    if (e.key === 'ArrowLeft') navigateM9Image(-1);
    if (e.key === 'ArrowRight') navigateM9Image(1);
    if (e.key === ' ') {
        e.preventDefault(); // Stop scroll
        // Optional: Auto play? For now maybe next slide
        navigateM9Image(1);
    }
}
