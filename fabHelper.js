/**
 * FAB Helper Module - Quản lý Floating Action Buttons chung cho tất cả module
 * 
 * Logic:
 * - TH1 (Create): Chưa có bản ghi -> Nhập liệu -> Hiện Save + Reset
 * - TH2 (View): Có bản ghi -> Hiện Edit
 * - TH3 (Edit): Click Edit -> Hiện Close (+ Update nếu có thay đổi)
 */

/**
 * Tạo FAB Manager cho một module
 * @param {Object} config - Cấu hình module
 * @returns {Object} FAB Manager instance
 */
function createFABManager(config) {
    const {
        moduleId,           // ID của module (vd: 'module1', 'module2')
        formId,             // ID của form element
        onSave,             // Callback khi save (create hoặc update)
        onReset,            // Callback khi reset form
        hasExistingData,    // Function trả về true/false nếu có data
        loadOriginalData,   // Function load lại data gốc khi cancel
        enableEdit = true   // Cho phép edit hay không (mặc định: true)
    } = config;

    // State
    let isDirty = false;
    let isEditMode = false;
    let originalData = null;

    // FAB Container ID
    const fabContainerId = `${moduleId}-fab-container`;

    /**
     * Khởi tạo FAB logic
     */
    function init() {
        console.log(`[FAB ${moduleId}] init() called`);
        const form = document.getElementById(formId);
        if (!form) {
            console.error(`[FAB ${moduleId}] Form ${formId} not found`);
            return;
        }
        console.log(`[FAB ${moduleId}] Form found:`, formId);

        // Lắng nghe thay đổi form
        form.addEventListener('input', handleFormChange);
        form.addEventListener('change', handleFormChange);
        console.log(`[FAB ${moduleId}] Event listeners attached`);

        // Xác định trạng thái ban đầu
        const hasData = hasExistingData();
        if (hasData) {
            // TH2: Có data -> View mode
            setViewMode();
        } else {
            // TH1: Chưa có data -> Create mode
            setCreateMode();
        }
    }

    /**
     * Xử lý khi form thay đổi
     */
    function handleFormChange(e) {
        // Create Mode Check (When no existing data is locked in)
        if (!hasExistingData() && !isEditMode) {
            const form = document.getElementById(formId);
            // Check if ANY field has value (ignoring buttons, hidden, readonly)
            const hasValue = Array.from(form.querySelectorAll('input, textarea, select')).some(el => {
                if (el.type === 'button' || el.type === 'submit' || el.type === 'hidden') return false;
                if (el.readOnly || el.disabled) return false;
                if (el.type === 'checkbox' || el.type === 'radio') return el.checked !== el.defaultChecked;
                return el.value !== el.defaultValue; // Check against default value (usually empty)
            });

            if (hasValue) {
                if (!isDirty) {
                    isDirty = true;
                    updateFABs();
                }
            } else {
                if (isDirty) {
                    isDirty = false;
                    updateFABs();
                }
            }
        } else {
            // Edit Mode (Existing Logic: Sticky Dirty)
            // Ideally should compared with originalData, but for now stick to sticky dirty to be safe
            if (!isDirty) {
                console.log(`[FAB ${moduleId}] MODIFICATION DETECTED`);
                isDirty = true;
                updateFABs();
            }
        }
    }

    /**
     * Cập nhật hiển thị FABs
     */
    function updateFABs() {
        const container = document.getElementById(fabContainerId);
        if (!container) {
            console.error(`[FAB ${moduleId}] Container ${fabContainerId} not found`);
            return;
        }

        const hasData = hasExistingData();
        console.log(`[FAB ${moduleId}] updateFABs | hasData: ${hasData} | isEditMode: ${isEditMode} | isDirty: ${isDirty}`);

        if (hasData && !isEditMode) {
            // TH2: View mode - Hiện Edit button
            renderEditButton(container);
        } else if (hasData && isEditMode) {
            // TH3: Edit mode - Hiện Close (+ Update nếu dirty)
            renderEditModeButtons(container);
        } else if (!hasData) {
            // TH1: Create mode - Hiện Save + Reset (nếu dirty)
            renderCreateModeButtons(container);
        }

        // Refresh icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    /**
     * Render Edit button (View mode)
     */
    function renderEditButton(container) {
        if (!enableEdit) {
            container.innerHTML = '';
            return;
        }

        container.classList.remove('hidden');
        container.innerHTML = `
            <button type="button" onclick="${moduleId}FAB.enterEditMode()" 
                class="pointer-events-auto w-14 h-14 bg-amber-500 text-white rounded-full shadow-[0_8px_25px_rgb(245,158,11,0.5)] hover:bg-amber-400 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                <i data-lucide="edit-2" class="w-6 h-6"></i>
                <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                    Chỉnh sửa
                </span>
            </button>
        `;
    }

    /**
     * Render buttons cho Edit mode
     */
    function renderEditModeButtons(container) {
        container.classList.remove('hidden');

        let html = `
            <!-- Close button (always visible in edit mode) -->
            <button type="button" onclick="${moduleId}FAB.cancelEdit()" 
                class="pointer-events-auto w-12 h-12 bg-white text-slate-500 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-slate-200 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative border border-slate-100 ring-2 ring-white">
                <i data-lucide="x" class="w-6 h-6"></i>
                <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                    Đóng / Hủy
                </span>
            </button>
        `;

        // Update button (only if dirty)
        if (isDirty) {
            html = `
                <button type="button" onclick="${moduleId}FAB.save()" 
                    class="pointer-events-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                    <i data-lucide="save" class="w-7 h-7"></i>
                    <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                        Lưu thay đổi
                    </span>
                </button>
            ` + html;
        }

        container.innerHTML = html;
    }

    /**
     * Render buttons cho Create mode
     */
    function renderCreateModeButtons(container) {
        if (!isDirty && !config.alwaysShowSave) {
            container.classList.add('hidden');
            return;
        }

        // Force remove hidden class
        container.classList.remove('hidden');

        console.log(`[FAB ${moduleId}] ACTIVATING SAVE BUTTON`);
        container.innerHTML = `
            <!-- Save button (Indigo Gradient) -->
            <button id="${moduleId}-fab-save-btn" type="button" onclick="${moduleId}FAB.save()" style="pointer-events: auto; display: flex;"
                class="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-full shadow-[0_8px_30px_rgb(79,70,229,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                <i data-lucide="save" class="w-7 h-7"></i>
                <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                    Lưu dữ liệu
                </span>
            </button>

            <!-- Reset button (White with Red Icon) -->
            <button type="button" onclick="${moduleId}FAB.reset()" style="pointer-events: auto; display: flex;"
                class="w-12 h-12 bg-white text-rose-500 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-rose-100 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative border border-rose-50 ring-2 ring-white ml-auto mr-2">
                <i data-lucide="rotate-ccw" class="w-6 h-6"></i>
                <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                    Nhập lại
                </span>
            </button>
        `;
    }

    /**
     * Set View mode
     */
    function setViewMode() {
        isEditMode = false;
        isDirty = false;

        // Disable form inputs
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => input.disabled = true);
            form.classList.add('opacity-80');
        }

        updateFABs();
    }

    /**
     * Set Create mode
     */
    function setCreateMode() {
        isEditMode = false;
        isDirty = false;

        // Enable form inputs
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => input.disabled = false);
            form.classList.remove('opacity-80');
        }

        updateFABs();
    }

    /**
     * Enter Edit mode
     */
    function enterEditMode() {
        isEditMode = true;
        isDirty = false;

        // Store original data
        if (loadOriginalData) {
            originalData = loadOriginalData();
        }

        // Enable form inputs
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => input.disabled = false);
            form.classList.remove('opacity-80');
        }

        updateFABs();
    }

    /**
     * Cancel edit
     */
    function cancelEdit() {
        if (isDirty) {
            // Có thay đổi -> Hỏi xác nhận
            if (confirm('Bạn có thay đổi chưa lưu. Bạn có chắc muốn hủy?')) {
                revertChanges();

                // Check if data still exists after revert
                // (onRevert might have cleared data completely)
                const hasData = hasExistingData();
                if (hasData) {
                    setViewMode();
                } else {
                    setCreateMode();
                }
            }
        } else {
            // Chưa có thay đổi -> Vẫn cần revert để reset state
            revertChanges();

            // Check if data exists after revert
            const hasData = hasExistingData();
            if (hasData) {
                setViewMode();
            } else {
                setCreateMode();
            }
        }
    }

    /**
     * Revert changes
     */
    function revertChanges() {
        if (originalData && loadOriginalData) {
            // Load lại data gốc
            const reloadedData = loadOriginalData();
            // Trigger reload UI nếu cần
            if (config.onRevert) {
                config.onRevert(reloadedData);
            }
        }
    }

    /**
     * Save (Create hoặc Update)
     */
    function save() {
        const hasData = hasExistingData();
        const action = hasData ? 'cập nhật' : 'lưu';

        if (confirm(`Bạn có chắc muốn ${action} dữ liệu ? `)) {
            if (onSave) {
                const success = onSave();
                if (success !== false) {
                    isDirty = false;
                    if (hasData) {
                        // Update -> về View mode
                        setViewMode();
                    } else {
                        // Create -> có thể về View mode hoặc reset form
                        setViewMode();
                    }
                }
            }
        }
    }

    /**
     * Reset form
     */
    function reset() {
        if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu đã nhập?')) {
            const form = document.getElementById(formId);
            if (form) {
                form.reset();
            }

            if (onReset) {
                try {
                    onReset();
                } catch (err) {
                    console.error(`[FAB ${moduleId}] Error in onReset callback:`, err);
                }
            }

            // Force clean state
            isDirty = false;
            updateFABs();
        }
    }

    /**
     * Force update FABs (dùng khi data thay đổi từ bên ngoài)
     */
    function refresh() {
        const hasData = hasExistingData();
        if (hasData) {
            setViewMode();
        } else {
            setCreateMode();
        }
    }

    // Public API
    return {
        init,
        enterEditMode,
        cancelEdit,
        save,
        reset,
        refresh,
        setViewMode,
        setCreateMode,
        updateFABs
    };
}

/**
 * Tạo HTML cho FAB container
 * @param {string} moduleId - ID của module
 * @returns {string} HTML string
 */
function generateFABContainerHTML(moduleId) {
    return `
            < div id = "${moduleId}-fab-container" class="fixed bottom-48 right-8 flex flex-col-reverse items-end gap-5 z-40 animate-fade-in pointer-events-none hidden" >
        < !--FABs will be injected here by FAB Manager-- >
    </div >
            `;
}
