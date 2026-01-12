/**
 * Module 8: Bảo mật & Đồng ý (Privacy & Consent) - Simplified Version
 */

function renderModule8(container) {
    const patientId = getCurrentPatientId();
    if (!patientId) {
        container.innerHTML = '<div class="p-8 text-center text-slate-500">Vui lòng chọn bệnh nhân.</div>';
        return;
    }

    // Load Data
    const savedData = loadModule8Data(patientId);
    m8OriginalData = savedData; // Global state init

    const data = savedData || {
        notes: '',
        scannedImages: []
    };

    container.innerHTML = `
        <div class="max-w-5xl mx-auto pb-24 animate-fade-in space-y-8">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-black text-slate-800">Bảo mật & Đồng ý</h2>
                    <p class="text-slate-500 text-sm">Quản lý các văn bản chấp thuận và hồ sơ bảo mật</p>
                </div>
                 <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold font-mono">ID: ${patientId}</span>
            </div>

            <!-- 1. Document Templates -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Template 1: Consent Form -->
                <div onclick="openM8Template('consent')" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer group relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i data-lucide="file-signature" class="w-24 h-24 text-indigo-600"></i>
                    </div>
                    <div class="relative z-10">
                        <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                            <i data-lucide="file-check-2" class="w-6 h-6"></i>
                        </div>
                        <h3 class="font-bold text-slate-800 text-lg mb-2">Bản Đồng Ý</h3>
                        <p class="text-sm text-slate-500 mb-4">Mẫu chấp thuận sử dụng dịch vụ và cung cấp thông tin.</p>
                        <span class="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:underline">
                            Xem & In <i data-lucide="arrow-right" class="w-3 h-3"></i>
                        </span>
                    </div>
                </div>

                <!-- Template 2: Basic Policy -->
                <div onclick="openM8Template('policy_basic')" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden">
                     <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i data-lucide="shield" class="w-24 h-24 text-blue-600"></i>
                    </div>
                    <div class="relative z-10">
                         <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            <i data-lucide="shield-check" class="w-6 h-6"></i>
                        </div>
                        <h3 class="font-bold text-slate-800 text-lg mb-2">Chính sách Bảo mật</h3>
                        <p class="text-sm text-slate-500 mb-4">Các quy định cơ bản về bảo vệ thông tin cá nhân.</p>
                         <span class="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:underline">
                            Xem & In <i data-lucide="arrow-right" class="w-3 h-3"></i>
                        </span>
                    </div>
                </div>

                <!-- Template 3: Purpose of Use -->
                <div onclick="openM8Template('policy_purpose')" class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group relative overflow-hidden">
                     <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i data-lucide="target" class="w-24 h-24 text-emerald-600"></i>
                    </div>
                    <div class="relative z-10">
                         <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                            <i data-lucide="file-text" class="w-6 h-6"></i>
                        </div>
                        <h3 class="font-bold text-slate-800 text-lg mb-2">Mục đích Sử dụng</h3>
                        <p class="text-sm text-slate-500 mb-4">Chi tiết về phạm vi và mục đích sử dụng thông tin.</p>
                         <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 group-hover:underline">
                            Xem & In <i data-lucide="arrow-right" class="w-3 h-3"></i>
                        </span>
                    </div>
                </div>
            </div>

            <!-- 2. Uploaded Documents Section -->
            <div class="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-8">
                 <div class="flex items-center justify-between mb-6">
                     <div>
                        <h3 class="font-bold text-slate-800 text-lg flex items-center gap-2">
                            <i data-lucide="folder-check" class="w-5 h-5 text-indigo-600"></i>
                            Hồ sơ bản cứng (Đã ký)
                        </h3>
                        <p class="text-sm text-slate-500 mt-1">Tải lên các bản scan hoặc ảnh chụp tài liệu đã có chữ ký.</p>
                     </div>
                     <label for="m8-image-upload" class="cursor-pointer px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors flex items-center gap-2 shadow-sm">
                        <i data-lucide="upload-cloud" class="w-4 h-4"></i> Tải tài liệu lên
                     </label>
                     <input type="file" id="m8-image-upload" multiple accept="image/*" class="hidden" onchange="handleM8ImageUpload(this)">
                </div>

                <!-- Scan Grid -->
                <div id="m8-image-grid" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 min-h-[160px]">
                    <!-- Populated by JS -->
                </div>

                <!-- Notes -->
                <div class="mt-8 pt-6 border-t border-slate-100">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Ghi chú thêm</label>
                    <textarea id="m8-notes" rows="3" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none bg-slate-50 focus:bg-white" placeholder="Ghi chú về tình trạng hồ sơ...">${data.notes}</textarea>
                </div>
            </div>

        </div>

        <!-- FABs -->
        <div class="fixed bottom-48 right-8 flex flex-col-reverse items-end gap-5 z-40 animate-fade-in pointer-events-none">
             <!-- SAVE -->
            <button type="button" onclick="saveModule8()" 
                class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-full shadow-[0_8px_30px_rgb(79,70,229,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                <i data-lucide="save" class="w-7 h-7"></i>
                <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                    Lưu hồ sơ
                </span>
            </button>
        </div>
    `;

    // Initialize Global Cache for M8
    window.currentM8Images = savedData?.scannedImages || [];
    try {
        refreshM8ImageGrid();
    } catch (e) {
        console.error('Error refreshing grid:', e);
    }

    // Set initial mode
    toggleModule8EditMode(!savedData);

    // Initialize FAB logic
    initModule8FabLogic();

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        setTimeout(() => lucide.createIcons(), 100);
    }
}

function loadModule8Data(patientId) {
    try {
        return JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_privacy`) || 'null');
    } catch (e) {
        return null;
    }
}

function saveModule8(e) {
    if (e) e.preventDefault();
    try {
        const patientId = getCurrentPatientId();
        const data = {
            lastUpdated: new Date().toISOString(),
            notes: document.getElementById('m8-notes').value,
            scannedImages: window.currentM8Images || []
        };

        localStorage.setItem(`mirabocaresync_${patientId}_privacy`, JSON.stringify(data));

        // Mark complete
        const status = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_status`) || '{}');
        status.module8 = true;
        localStorage.setItem(`mirabocaresync_${patientId}_status`, JSON.stringify(status));

        window.dispatchEvent(new Event('module-data-saved'));
        showToast('Đã lưu hồ sơ bảo mật!', 'success');

        // Switch to View Mode
        toggleModule8EditMode(false);

    } catch (err) {
        if (err.name === 'QuotaExceededError' || err.code === 22 || err.message.includes('quota')) {
            showToast('Lỗi: Bộ nhớ đầy! Không thể lưu thêm ảnh scan.', 'error');
        } else {
            showToast('Lỗi khi lưu: ' + err.message, 'error');
        }
    }
}

// Global state for dirty tracking
let m8IsDirty = false;
let m8OriginalData = null;

// Init FAB Logic
function initModule8FabLogic() {
    const notes = document.getElementById('m8-notes');
    if (!notes) return;

    notes.addEventListener('input', () => {
        if (!m8IsDirty) {
            m8IsDirty = true;
            updateModule8FabState();
        }
    });
}

// Update FAB State
function updateModule8FabState() {
    const fabContainer = document.querySelector('.fixed.bottom-48.right-8');
    if (!fabContainer) return;

    const notes = document.getElementById('m8-notes');
    // Determine mode based on readonly attribute or m8OriginalData logic
    // But toggleModule8EditMode toggles the readonly attribute.
    const isEditMode = notes && !notes.hasAttribute('readonly');

    let html = '';

    if (isEditMode) {
        // EDIT MODE
        html += `<div id="m8-fab-group" class="flex flex-col-reverse items-end gap-5">`;

        // 1. Save/Update Button (Only if dirty)
        if (m8IsDirty) {
            if (m8OriginalData) {
                // UPDATE Button (Blue)
                html += `
                <button type="button" onclick="saveModule8()" 
                    class="pointer-events-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                    <i data-lucide="save" class="w-7 h-7"></i>
                    <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                        Lưu thay đổi
                    </span>
                </button>`;
            } else {
                // SAVE Button (Indigo/Violet) - Create Mode
                html += `
                <button type="button" onclick="saveModule8()" 
                    class="pointer-events-auto w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-full shadow-[0_8px_30px_rgb(79,70,229,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                    <i data-lucide="save" class="w-7 h-7"></i>
                    <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                        Lưu hồ sơ
                    </span>
                </button>`;
            }
        }

        // 2. Cancel/Close Button
        html += `
            <button type="button" onclick="cancelModule8Edit()" 
                class="pointer-events-auto w-12 h-12 bg-white text-slate-500 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-slate-200 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative border border-slate-100 ring-2 ring-white">
                <i data-lucide="x" class="w-6 h-6"></i>
                <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                    ${m8OriginalData ? 'Đóng / Hủy' : 'Hủy bỏ'}
                </span>
            </button>
        </div>`;

    } else {
        // VIEW MODE: Show Edit Button (Amber)
        html = `
        <button type="button" onclick="toggleModule8EditMode(true)" 
            class="pointer-events-auto w-14 h-14 bg-amber-500 text-white rounded-full shadow-[0_8px_25px_rgb(245,158,11,0.5)] hover:bg-amber-400 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
            <i data-lucide="edit-2" class="w-6 h-6"></i>
             <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                Chỉnh sửa
            </span>
        </button>`;
    }

    fabContainer.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function cancelModule8Edit() {
    if (m8IsDirty) {
        if (confirm('Hủy bỏ các thay đổi? Dữ liệu chưa lưu sẽ bị mất.')) {
            // Revert Data
            const patientId = getCurrentPatientId();
            const savedData = loadModule8Data(patientId) || { notes: '', scannedImages: [] };

            // Revert UI fields
            const notes = document.getElementById('m8-notes');
            if (notes) notes.value = savedData.notes || '';

            // Revert Images
            window.currentM8Images = [...(savedData.scannedImages || [])]; // clone array
            refreshM8ImageGrid();

            toggleModule8EditMode(false);
            showToast('Đã hủy thay đổi', 'info');
        }
    } else {
        toggleModule8EditMode(false);
    }
}

function toggleModule8EditMode(isEdit) {
    const uploadInput = document.getElementById('m8-image-upload');
    const uploadLabel = document.querySelector('label[for="m8-image-upload"]');
    const notes = document.getElementById('m8-notes');
    const fabContainer = document.querySelector('.fixed.bottom-48.right-8'); // Updated selector

    if (isEdit) {
        // Edit Mode
        if (uploadLabel) {
            uploadLabel.classList.remove('hidden');
        }
        if (notes) {
            notes.removeAttribute('readonly');
            notes.classList.remove('bg-slate-50', 'text-slate-500');
            notes.classList.add('bg-white', 'text-slate-800');
        }

        // Show delete buttons
        document.querySelectorAll('#m8-image-grid button.bg-red-500\\/80').forEach(b => b.classList.remove('hidden'));

        // Reset dirty state and update FAB
        m8IsDirty = false;
        updateModule8FabState();

    } else {
        // View Mode
        if (uploadLabel) {
            uploadLabel.classList.add('hidden');
        }
        if (notes) {
            notes.setAttribute('readonly', 'true');
            notes.classList.add('bg-slate-50', 'text-slate-500');
            notes.classList.remove('bg-white', 'text-slate-800');
        }

        // Hide delete buttons
        document.querySelectorAll('#m8-image-grid button.bg-red-500\\/80').forEach(b => b.classList.add('hidden'));

        // Update FAB to Edit -- DELEGATED
        // if (fabContainer) { ... }
        updateModule8FabState();
    }
}



// --- Image Handling ---

function handleM8ImageUpload(input) {
    if (input.files && input.files.length > 0) {
        const loadingToast = showToast('Đang xử lý ảnh...', 'info');

        let processed = 0;
        Array.from(input.files).forEach(file => {
            if (typeof compressImage === 'function') {
                compressImage(file, 1200, 0.7, (compressedDataUrl) => { // Increased quality slightly for docs
                    try {
                        window.currentM8Images.push(compressedDataUrl);
                        refreshM8ImageGrid();
                        // Fix: Set dirty and update FAB instead of toggling mode
                        m8IsDirty = true;
                        updateModule8FabState();
                    } catch (e) {
                        showToast('Không thể thêm ảnh: Bộ nhớ đầy', 'error');
                    }
                    processed++;
                });
            } else {
                const reader = new FileReader();
                reader.onload = e => {
                    window.currentM8Images.push(e.target.result);
                    refreshM8ImageGrid();
                    // Fix: Set dirty and update FAB instead of toggling mode (which resets dirty)
                    m8IsDirty = true;
                    updateModule8FabState();
                    processed++;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function refreshM8ImageGrid() {
    const grid = document.getElementById('m8-image-grid');
    if (!grid) return;
    const imgs = window.currentM8Images || [];

    if (imgs.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                 <div class="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                    <i data-lucide="files" class="w-8 h-8 text-slate-300"></i>
                 </div>
                 <p class="text-slate-500 font-medium">Chưa có tài liệu nào</p>
                 <p class="text-slate-400 text-xs mt-1">Nhấn 'Tải tài liệu lên' để thêm bản scan</p>
            </div>`;
    } else {
        grid.innerHTML = imgs.map((img, idx) => `
            <div onclick="viewM8Image(${idx})" class="relative aspect-[3/4] rounded-xl overflow-hidden group border border-slate-200 bg-white cursor-pointer shadow-sm hover:shadow-md transition-all">
                <img src="${img}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <button type="button" class="p-2 bg-white/20 backdrop-blur rounded-lg text-white hover:bg-white/40"><i data-lucide="eye" class="w-4 h-4"></i></button>
                     <button type="button" onclick="event.stopPropagation(); removeM8Image(${idx})" class="p-2 bg-red-500/80 backdrop-blur rounded-lg text-white hover:bg-red-600 hidden"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                </div>
                <div class="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">Doc ${idx + 1}</div>
            </div>
        `).join('');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function removeM8Image(index) {
    if (confirm('Xóa tài liệu này?')) {
        window.currentM8Images.splice(index, 1);
        refreshM8ImageGrid();

        // Fix: Set dirty and update FAB
        m8IsDirty = true;
        updateModule8FabState();
    }
}

// --- Slideshow Viewer ---
let currentM8ImageIndex = 0;

function viewM8Image(index) {
    currentM8ImageIndex = index;
    const imgs = window.currentM8Images;
    if (!imgs || imgs.length === 0) return;

    const viewer = document.createElement('div');
    viewer.id = 'm8-image-viewer';
    viewer.className = 'fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in backdrop-blur-sm select-none';

    // Render Viewer Content
    viewer.innerHTML = getM8ViewerHTML(imgs, currentM8ImageIndex);

    document.body.appendChild(viewer);
    lucide.createIcons();

    // Keyboard Navigation
    document.addEventListener('keydown', handleM8ViewerKeys);
}

function navigateM8Image(direction) {
    const imgs = window.currentM8Images;
    currentM8ImageIndex += direction;

    // Loop
    if (currentM8ImageIndex < 0) currentM8ImageIndex = imgs.length - 1;
    if (currentM8ImageIndex >= imgs.length) currentM8ImageIndex = 0;

    const viewer = document.getElementById('m8-image-viewer');
    if (viewer) {
        viewer.innerHTML = getM8ViewerHTML(imgs, currentM8ImageIndex);
        lucide.createIcons();
    }
}

function jumpToM8Image(index) {
    currentM8ImageIndex = index;
    const viewer = document.getElementById('m8-image-viewer');
    if (viewer) {
        viewer.innerHTML = getM8ViewerHTML(window.currentM8Images, currentM8ImageIndex);
        lucide.createIcons();
    }
}

function getM8ViewerHTML(imgs, index) {
    const hasMultiple = imgs.length > 1;
    return `
            <!-- Top Bar -->
            <div class="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 text-white/80">
                <div class="bg-black/40 px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold font-mono">
                    ${index + 1} / ${imgs.length}
                </div>
                <button onclick="closeM8ImageViewer()" class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>

            <!-- Image Area -->
            <div class="relative w-full h-full flex items-center justify-center max-w-6xl mx-auto">
                <img src="${imgs[index]}" class="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl animate-fade-in" id="m8-viewer-img">
            </div>

            <!-- Controls -->
            ${hasMultiple ? `
                <button onclick="navigateM8Image(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
                    <i data-lucide="chevron-left" class="w-8 h-8"></i>
                </button>
                <button onclick="navigateM8Image(1)" class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
                    <i data-lucide="chevron-right" class="w-8 h-8"></i>
                </button>
                 
                 <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4 scrollbar-hide py-2">
                    ${imgs.map((_, i) => `
                        <button onclick="jumpToM8Image(${i})" class="w-2 h-2 rounded-full transition-all ${i === index ? 'bg-white scale-150 shadow-glow' : 'bg-white/30 hover:bg-white/50'}"></button>
                    `).join('')}
                 </div>
            ` : ''}
        `;
}

function closeM8ImageViewer() {
    const viewer = document.getElementById('m8-image-viewer');
    if (viewer) viewer.remove();
    document.removeEventListener('keydown', handleM8ViewerKeys);
}

function handleM8ViewerKeys(e) {
    if (e.key === 'Escape') closeM8ImageViewer();
    if (e.key === 'ArrowLeft') navigateM8Image(-1);
    if (e.key === 'ArrowRight') navigateM8Image(1);
    if (e.key === ' ') {
        e.preventDefault();
        navigateM8Image(1);
    }
}


// --- Template Printing ---

function openM8Template(type) {
    const content = getM8TemplateContent(type);

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in print:bg-white print:p-0 print:absolute print:inset-0 print:z-[10000]';
    modal.id = 'm8-template-modal';

    modal.innerHTML = `
        <div class="bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden print:h-auto print:shadow-none print:max-w-none print:rounded-none">
            <!-- Toolbar -->
            <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 print:hidden">
                <h3 class="font-bold text-slate-700">Xem trước bản in</h3>
                <div class="flex items-center gap-3">
                    <button onclick="window.print()" class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200">
                        <i data-lucide="printer" class="w-4 h-4"></i> In văn bản
                    </button>
                    <button onclick="document.getElementById('m8-template-modal').remove()" class="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>
            
            <!-- Content -->
            <div class="flex-1 overflow-y-auto p-8 md:p-12 print:p-0 print:overflow-visible bg-white">
                <div class="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-sm print:shadow-none p-8 md:p-16 border md:border-slate-100 print:border-none">
                    ${content}
                </div>
            </div>
        </div>
        <!-- Print Styles Injection -->
        <style>
            @media print {
                body > *:not(#m8-template-modal) { display: none !important; }
                #m8-template-modal { position: absolute; top: 0; left: 0; width: 100%; height: auto; background: white; }
                .print\\:hidden { display: none !important; }
            }
        </style>
    `;

    document.body.appendChild(modal);
    lucide.createIcons();
}

function getM8TemplateContent(type) {
    const date = new Date();
    const dateStr = `Ngày ${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
    const patientName = document.getElementById('m8-patient-name')?.value || ".................................................."; // Fallback if input removed

    // NOTE: These are simplified templates based on user request.

    if (type === 'consent') {
        return `
            <div class="font-serif text-slate-900 leading-relaxed">
                <h1 class="text-2xl font-bold text-center mb-8 uppercase">BẢN ĐỒNG Ý</h1>
                
                <p class="mb-6">Tôi đồng ý với các nội dung bắt đầu thực hiện "Chế độ bổ sung dinh dưỡng khi vận động" dưới đây:</p>
                
                <div class="space-y-6 mb-8">
                    <div>
                        <h3 class="font-bold mb-2">Nội dung</h3>
                        <ol class="list-decimal pl-5 space-y-4">
                            <li>Tôi đã xác nhận các mục được ghi chép về việc nỗ lực thực hiện bổ sung dinh dưỡng khi vận động.</li>
                            <li>Về các yêu cầu dựa trên phương châm của gia đình đối với chủng loại hay số lượng quà vặt (đồ ăn nhẹ), chúng tôi hiểu rằng sẽ không thể xem xét giải quyết trừ khi có những hoàn cảnh đặc biệt.</li>
                            <li>Ghi chép các thông tin liên quan đến dị ứng thực phẩm vào khung dưới đây và nộp bản này. Trường hợp không có dị ứng, vui lòng ghi "Không có".</li>
                        </ol>
                    </div>
                    
                    <div class="mt-8">
                        <h4 class="font-bold mb-2 border-b border-black inline-block">Về dị ứng thực phẩm</h4>
                        <p class="text-sm italic mb-2">※ Những người có dị ứng vui lòng điền vào khung dưới đây.</p>
                        <div class="border-2 border-slate-800 h-32 w-full"></div>
                    </div>
                </div>
                
                <div class="mt-16 text-right">
                    <p class="mb-2 italic">${dateStr}</p>
                    <div class="grid grid-cols-[100px_1fr] gap-4 text-left inline-block w-80">
                        <div class="font-bold">Họ và tên:</div>
                        <div class="border-b border-black border-dashed min-h-[1.5em]"></div>
                        
                        <div class="font-bold">Gia đình:</div>
                        <div class="border-b border-black border-dashed min-h-[1.5em]"></div>
                    </div>
                </div>
            </div>
        `;
    }

    if (type === 'policy_basic') {
        return `
            <div class="font-serif text-slate-900 leading-relaxed">
                <h1 class="text-2xl font-bold text-center mb-8 uppercase">CHÍNH SÁCH CƠ BẢN VỀ BẢO VỆ THÔNG TIN CÁ NHÂN</h1>
                
                <div class="space-y-4 text-justify">
                    <p>Tại cơ sở của chúng tôi, chúng tôi nhận thức sâu sắc tầm quan trọng của thông tin cá nhân...</p>
                    
                    <h3 class="font-bold mt-6">1. Thu thập thông tin cá nhân</h3>
                    <p>Chúng tôi sẽ thu thập thông tin cá nhân một cách hợp pháp và công bằng...</p>

                    <h3 class="font-bold mt-6">2. Sử dụng thông tin cá nhân</h3>
                    <p>Thông tin cá nhân được thu thập sẽ chỉ được sử dụng trong phạm vi mục đích đã được thông báo trước...</p>

                    <h3 class="font-bold mt-6">3. Cung cấp cho bên thứ ba</h3>
                    <p>Chúng tôi sẽ không cung cấp thông tin cá nhân cho bên thứ ba mà không có sự đồng ý của chính chủ, trừ trường hợp pháp luật có quy định khác.</p>

                    <h3 class="font-bold mt-6">4. Quản lý an toàn</h3>
                    <p>Chúng tôi sẽ thực hiện các biện pháp cần thiết và thích hợp để ngăn chặn rò rỉ, mất mát hoặc hư hỏng thông tin cá nhân.</p>
                </div>
                 <div class="mt-16 border-t border-slate-300 pt-4 text-center text-sm text-slate-500">
                    Mirabo Healthcare Center
                </div>
            </div>
        `;
    }

    if (type === 'policy_purpose') {
        // Based on image 1 provided by user basically
        return `
            <div class="font-serif text-slate-900 leading-relaxed text-sm">
                <h1 class="text-xl font-bold text-center mb-6 uppercase">MỤC ĐÍCH SỬ DỤNG BẢO VỆ THÔNG TIN CÁ NHÂN</h1>
                
                <p class="mb-4">Tại cơ sở, theo chính sách bảo vệ thông tin cá nhân nhằm bảo vệ danh dự và quản lý an toàn cho người sử dụng, chúng tôi xác định các mục đích sử dụng như sau:</p>
                
                <div class="space-y-6">
                    <div>
                        <h3 class="font-bold border-b border-black inline-block mb-2">1. Mục đích sử dụng nội bộ</h3>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Các dịch vụ chăm sóc điều dưỡng mà cơ sở cung cấp cho người dùng.</li>
                            <li>Các nghiệp vụ hành chính về bảo hiểm chăm sóc điều dưỡng.</li>
                            <li>Quản lý việc ra vào/nhập viện.</li>
                            <li>Kế toán và tài chính.</li>
                            <li>Báo cáo sự cố, tai nạn.</li>
                            <li>Nâng cao chất lượng dịch vụ chăm sóc điều dưỡng.</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="font-bold border-b border-black inline-block mb-2">2. Mục đích sử dụng cung cấp thông tin cho bên ngoài</h3>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Phối hợp với các đơn vị cung cấp dịch vụ tại nhà khác, bệnh viện, hoặc phòng khám.</li>
                            <li>Trả lời các yêu cầu xác minh thông tin từ cơ quan hành chính.</li>
                            <li>Giải thích tình trạng thể chất và tinh thần cho gia đình người dùng.</li>
                            <li>Nộp biên lai thanh toán cho cơ quan kiểm tra và thanh toán.</li>
                            <li>Tham vấn hoặc thông báo cho các công ty bảo hiểm liên quan đến bảo hiểm bồi thường thiệt hại.</li>
                        </ul>
                    </div>
                     <div>
                        <h3 class="font-bold border-b border-black inline-block mb-2">3. Các mục đích khác</h3>
                        <ul class="list-disc pl-5 space-y-1">
                             <li>Tài liệu cơ bản để duy trì và cải thiện dịch vụ chăm sóc cũng như nghiệp vụ.</li>
                             <li>Hợp tác đào tạo thực tập sinh.</li>
                        </ul>
                    </div>
                </div>
                
                 <div class="mt-8 border-2 border-slate-300 p-4 text-xs italic">
                    <p>Nếu có bất kỳ điều khoản nào về mục đích sử dụng trên mà bạn khó đồng ý, vui lòng thông báo cho chúng tôi. Nếu không có thông báo nào, chúng tôi sẽ coi như bạn đã đồng ý.</p>
                </div>
                
                <div class="mt-8">
                     <p class="font-bold">Quản lý cơ sở</p>
                     <p>TEL: 097-xxx-xxxx</p>
                </div>
            </div>
        `;
    }

    return '<p>Template not found</p>';
}
