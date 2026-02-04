// Module 4 Content - Interests & Hobbies Assessment (Vietnamese Version)

// ============================================
// STEP 1: Define Activity Data FIRST
// ============================================

const activityCategories = [
    {
        id: 'sports',
        name: 'Thể thao & Vận động',
        icon: 'activity',
        color: 'rose',
        activities: [
            { id: 'walking', name: 'Đi bộ' },
            { id: 'morning_exercise', name: 'Thể dục buổi sáng' },
            { id: 'volleyball', name: 'Bóng chuyền' },
            { id: 'golf', name: 'Golf' },
            { id: 'swimming', name: 'Bơi lội' },
            { id: 'yoga', name: 'Yoga' },
            { id: 'dancing', name: 'Khiêu vũ' },
            { id: 'cycling', name: 'Đạp xe' },
            { id: 'badminton', name: 'Cầu lông' },
            { id: 'table_tennis', name: 'Bóng bàn' }
        ]
    },
    {
        id: 'arts',
        name: 'Nghệ thuật & Thủ công',
        icon: 'palette',
        color: 'fuchsia',
        activities: [
            { id: 'calligraphy', name: 'Thư pháp' },
            { id: 'painting', name: 'Vẽ tranh' },
            { id: 'pottery', name: 'Làm gốm' },
            { id: 'embroidery', name: 'Thêu' },
            { id: 'knitting', name: 'Đan len' },
            { id: 'origami', name: 'Gấp giấy (Origami)' },
            { id: 'instruments', name: 'Chơi nhạc cụ' },
            { id: 'singing', name: 'Hát' },
            { id: 'handicrafts', name: 'Làm đồ thủ công' },
            { id: 'photography', name: 'Nhiếp ảnh' }
        ]
    },
    {
        id: 'entertainment',
        name: 'Giải trí & Học tập',
        icon: 'book-open',
        color: 'pink',
        activities: [
            { id: 'karaoke', name: 'Karaoke' },
            { id: 'movies', name: 'Xem phim' },
            { id: 'reading', name: 'Đọc sách' },
            { id: 'chess', name: 'Chơi cờ' },
            { id: 'cards', name: 'Chơi bài' },
            { id: 'crossword', name: 'Giải ô chữ' },
            { id: 'sudoku', name: 'Sudoku' },
            { id: 'language', name: 'Học ngoại ngữ' },
            { id: 'computer', name: 'Học máy tính' },
            { id: 'music', name: 'Nghe nhạc' }
        ]
    },
    {
        id: 'social',
        name: 'Hoạt động Xã hội',
        icon: 'users',
        color: 'rose',
        activities: [
            { id: 'friends', name: 'Gặp gỡ bạn bè' },
            { id: 'volunteer', name: 'Tình nguyện' },
            { id: 'clubs', name: 'Tham gia câu lạc bộ' },
            { id: 'religious', name: 'Đi chùa/nhà thờ' },
            { id: 'community', name: 'Sự kiện cộng đồng' },
            { id: 'grandchildren', name: 'Chơi với cháu' },
            { id: 'chatting', name: 'Trò chuyện' },
            { id: 'classes', name: 'Tham gia lớp học' },
            { id: 'picnic', name: 'Đi dã ngoại' },
            { id: 'sightseeing', name: 'Tham quan' }
        ]
    },
    {
        id: 'other',
        name: 'Hoạt động Khác',
        icon: 'sparkles',
        color: 'purple',
        activities: [
            { id: 'gardening', name: 'Làm vườn' },
            { id: 'cooking', name: 'Nấu ăn' },
            { id: 'traveling', name: 'Du lịch' },
            { id: 'pets', name: 'Nuôi thú cưng' },
            { id: 'plants', name: 'Chăm sóc cây cảnh' },
            { id: 'fishing', name: 'Câu cá' },
            { id: 'tv', name: 'Xem TV' },
            { id: 'journaling', name: 'Viết nhật ký' },
            { id: 'meditation', name: 'Thiền' },
            { id: 'tea', name: 'Uống trà' },
            { id: 'gaming', name: 'Chơi game' },
            { id: 'baking', name: 'Làm bánh' }
        ]
    }
];

// ============================================
// STEP 2: Generate Activity Grid HTML
// ============================================

function generateActivityGrid() {
    return activityCategories.map(function (category) {
        const colorClasses = {
            rose: 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30',
            fuchsia: 'bg-gradient-to-r from-fuchsia-500 to-purple-500 shadow-lg shadow-fuchsia-500/30',
            pink: 'bg-gradient-to-r from-pink-500 to-rose-400 shadow-lg shadow-pink-500/30',
            purple: 'bg-gradient-to-r from-violet-500 to-purple-500 shadow-lg shadow-violet-500/30'
        };

        const headerClass = colorClasses[category.color] || 'bg-gradient-to-r from-pink-500 to-rose-400';

        return `
        <div class="glass-panel rounded-[24px] overflow-hidden mb-6 group hover:shadow-xl transition-all duration-300">
            <div class="${headerClass} px-6 py-4 cursor-pointer hover:brightness-110 transition-all" onclick="toggleCategory('${category.id}')">
                <div class="flex items-center justify-between">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                        <i data-lucide="${category.icon}" class="w-5 h-5"></i>
                        ${category.name} <span class="bg-white/20 px-2 py-0.5 rounded-full text-[10px] backdrop-blur-sm">${category.activities.length}</span>
                    </h3>
                    <i data-lucide="chevron-down" id="chevron-${category.id}" class="w-5 h-5 text-white transition-transform" style="transform: rotate(-90deg)"></i>
                </div>
            </div>
            <div id="category-${category.id}" class="p-6 hidden">
                <table class="w-full text-left border-collapse">
                    <thead class="border-b border-slate-100/50">
                        <tr>
                            <th class="p-4 font-black text-slate-400 text-[10px] uppercase tracking-widest w-1/2">Hoạt động</th>
                            <th class="p-4 text-center font-black text-emerald-500 text-[10px] uppercase tracking-widest w-1/6">Đang làm</th>
                            <th class="p-4 text-center font-black text-blue-500 text-[10px] uppercase tracking-widest w-1/6">Muốn làm</th>
                            <th class="p-4 text-center font-black text-amber-500 text-[10px] uppercase tracking-widest w-1/6">Quan tâm</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50/50">
                        ${category.activities.map(function (activity) {
            return `
                            <tr class="hover:bg-white/40 transition-colors group/row">
                                <td class="p-4 font-bold text-slate-700 group-hover/row:text-slate-900 transition-colors">${activity.name}</td>
                                <td class="p-4 text-center">
                                    <label class="relative flex items-center justify-center cursor-pointer group/chk">
                                        <input type="radio" 
                                            name="interest-${category.id}-${activity.id}"
                                            value="doing"
                                            id="doing-${category.id}-${activity.id}"
                                            class="peer appearance-none w-6 h-6 rounded-lg border-2 border-slate-200 checked:bg-emerald-500 checked:border-emerald-500 transition-all"
                                            onchange="updateRecommendations()">
                                        <i data-lucide="check" class="w-4 h-4 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none scale-50 peer-checked:scale-100 duration-200"></i>
                                    </label>
                                </td>
                                <td class="p-4 text-center">
                                    <label class="relative flex items-center justify-center cursor-pointer group/chk">
                                        <input type="radio" 
                                            name="interest-${category.id}-${activity.id}"
                                            value="want"
                                            id="want-${category.id}-${activity.id}"
                                            class="peer appearance-none w-6 h-6 rounded-lg border-2 border-slate-200 checked:bg-blue-500 checked:border-blue-500 transition-all"
                                            onchange="updateRecommendations()">
                                        <i data-lucide="check" class="w-4 h-4 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none scale-50 peer-checked:scale-100 duration-200"></i>
                                    </label>
                                </td>
                                <td class="p-4 text-center">
                                    <label class="relative flex items-center justify-center cursor-pointer group/chk">
                                        <input type="radio" 
                                            name="interest-${category.id}-${activity.id}"
                                            value="interested"
                                            id="interested-${category.id}-${activity.id}"
                                            class="peer appearance-none w-6 h-6 rounded-lg border-2 border-slate-200 checked:bg-amber-500 checked:border-amber-500 transition-all"
                                            onchange="updateRecommendations()">
                                        <i data-lucide="check" class="w-4 h-4 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none scale-50 peer-checked:scale-100 duration-200"></i>
                                    </label>
                                </td>
                            </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
            </div>
        </div >
            `;
    }).join('');
}

// ============================================
// STEP 3: Define Template Literal
// ============================================

window.module4Content = `
            <div class="animate-fade-in">

                <form id="module4-form" class="space-y-6 pb-20">

                    <!-- Activity Grid -->
                    ${generateActivityGrid()}

                    <!-- Recommendations Panel -->
                    <!-- Recommendations Panel -->
                    <div class="glass-panel rounded-[24px] p-8 border border-amber-100/50 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div class="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <i data-lucide="sparkles" class="w-32 h-32 text-amber-500"></i>
                        </div>
                        <h3 class="font-black text-amber-600 text-lg mb-4 flex items-center gap-2 uppercase tracking-wide relative z-10">
                            <i data-lucide="lightbulb" class="w-6 h-6"></i>
                            Gợi ý hoạt động phù hợp
                        </h3>
                        <div id="recommendations-list" class="flex flex-wrap gap-3 relative z-10 min-h-[60px]">
                            <span class="text-sm text-slate-400 italic">Chọn các hoạt động để nhận gợi ý cá nhân hóa...</span>
                        </div>
                    </div>

                    <!-- Notes Section -->
                    <div class="glass-panel p-6 rounded-[24px] border border-pink-100/50">
                        <h3 class="font-black text-pink-900 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                            <i data-lucide="file-text" class="w-5 h-5"></i>
                            Ghi chú bổ sung
                        </h3>
                        <textarea id="additionalNotes" rows="4"
                            class="input-glass w-full px-4 py-3 rounded-2xl outline-none text-sm font-medium resize-none shadow-inner"
                            placeholder="Nhận xét về sở thích, khả năng tham gia, hạn chế, khuyến nghị..."></textarea>
                    </div>

                </form>

</div>

<!-- FLOATING ACTION BUTTONS (FAB) - Moved Outside -->
<!-- FABs for Module 4 -->
            <!-- Module 4 Inline Actions -->
            <!-- Module 4 Actions Source (Hidden - Portaled to FAB Container) -->
            <div id="module4-actions-source" class="hidden">
                 <div class="flex flex-col-reverse gap-3 items-center">
                    <!-- CANCEL (Edit Mode) -->
                    <button type="button" id="module4-fab-close" onclick="cancelModule4Edit()"
                        class="w-12 h-12 bg-white text-slate-500 rounded-full shadow-lg hover:bg-slate-50 hover:text-slate-700 transition-all flex items-center justify-center border border-slate-200 hidden pointer-events-auto" title="Hủy bỏ">
                         <i data-lucide="x" class="w-6 h-6"></i>
                    </button>

                    <!-- SAVE (Create/Edit Mode) -->
                    <button type="button" id="module4-fab-save" onclick="saveModule4Assessment()"
                        class="w-12 h-12 bg-pink-600 text-white rounded-full shadow-xl shadow-pink-200 hover:bg-pink-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center hidden pointer-events-auto" title="Lưu đánh giá">
                        <i data-lucide="save" class="w-6 h-6"></i>
                    </button>

                    <!-- UPDATE (Edit Mode) -->
                    <button type="button" id="module4-fab-update" onclick="saveModule4Assessment()"
                        class="w-12 h-12 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center hidden pointer-events-auto" title="Lưu thay đổi">
                        <i data-lucide="save" class="w-6 h-6"></i>
                    </button>

                    <!-- RESET (Create Mode) -->
                    <button type="button" id="module4-fab-reset" onclick="resetModule4Form()"
                        class="w-12 h-12 bg-white text-rose-500 rounded-full shadow-lg hover:bg-rose-50 hover:text-rose-700 transition-all flex items-center justify-center border border-rose-100 hidden pointer-events-auto" title="Nhập lại">
                        <i data-lucide="rotate-ccw" class="w-6 h-6"></i>
                    </button>
                    
                    <!-- EDIT (View Mode) -->
                    <button type="button" id="module4-fab-edit" onclick="toggleModule4EditMode(true)"
                        class="w-12 h-12 bg-amber-500 text-white rounded-full shadow-xl shadow-amber-200 hover:bg-amber-600 hover:scale-105 active:scale-95 transition-all flex items-center justify-center pointer-events-auto" title="Chỉnh sửa">
                        <i data-lucide="edit-2" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>
`;

// ============================================
// STEP 4: Recommendation Algorithm
// ============================================

function updateRecommendations() {
    const recommendations = [];
    const scores = {};

    // Collect all checked activities
    activityCategories.forEach(function (category) {
        category.activities.forEach(function (activity) {
            const doing = document.getElementById('doing-' + category.id + '-' + activity.id);
            const want = document.getElementById('want-' + category.id + '-' + activity.id);
            const interested = document.getElementById('interested-' + category.id + '-' + activity.id);

            let score = 0;
            if (doing && doing.checked) score += 3;
            if (want && want.checked) score += 2;
            if (interested && interested.checked) score += 1;

            if (score > 0) {
                scores[activity.name] = score;
            }
        });
    });

    // Sort by score and get top 5
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const container = document.getElementById('recommendations-list');
    if (!container) return;

    if (sorted.length === 0) {
        container.innerHTML = '<span class="text-sm text-slate-500 italic">Chọn các hoạt động để nhận gợi ý cá nhân hóa...</span>';
        return;
    }

    container.innerHTML = sorted.map(function ([name, score]) {
        const colors = {
            3: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            2: 'bg-blue-100 text-blue-800 border-blue-300',
            1: 'bg-amber-100 text-amber-800 border-amber-300'
        };
        const color = colors[score] || 'bg-slate-100 text-slate-800 border-slate-300';

        return `<span class="px-3 py-2 rounded-lg border-2 ${color} text-sm font-bold">${name}</span>`;
    }).join('');
}

// ============================================
// STEP 4.5: Toggle Category Collapse/Expand
// ============================================

// ============================================
// STEP 5: Toggle Category Collapse/Expand
// ============================================

function toggleCategory(categoryId) {
    const categoryContent = document.getElementById('category-' + categoryId);
    const chevron = document.getElementById('chevron-' + categoryId);

    if (!categoryContent || !chevron) return;

    if (categoryContent.classList.contains('hidden')) {
        categoryContent.classList.remove('hidden');
        chevron.style.transform = 'rotate(0deg)';
    } else {
        categoryContent.classList.add('hidden');
        chevron.style.transform = 'rotate(-90deg)';
    }
}

// ============================================
// STEP 6: Logic Functions (View/Edit Mode)
// ============================================

// Global state
let module4ResetFormState = null;
let module4OriginalData = null;
let m4IsDirty = false;

// Init FAB Logic
function initModule4FabLogic() {
    const form = document.getElementById('module4-form');
    // Listen for changes
    form.addEventListener('input', () => {
        if (!m4IsDirty) {
            m4IsDirty = true;
            updateModule4FabState('edit');
        }
    });
    // Checkbox changes
    form.addEventListener('change', () => {
        if (!m4IsDirty) {
            m4IsDirty = true;
            updateModule4FabState('edit');
        }
        // Also update recommendations on change
        updateRecommendations();
    });
}

// Update FAB State
function updateModule4FabState(mode) {
    const editBtn = document.getElementById('module4-fab-edit');
    const saveBtn = document.getElementById('module4-fab-save');
    const updateBtn = document.getElementById('module4-fab-update');
    const closeBtn = document.getElementById('module4-fab-close');
    const resetBtn = document.getElementById('module4-fab-reset');

    // Hide all
    if (editBtn) editBtn.classList.add('hidden');
    if (saveBtn) saveBtn.classList.add('hidden');
    if (updateBtn) updateBtn.classList.add('hidden');
    if (closeBtn) closeBtn.classList.add('hidden');
    if (resetBtn) resetBtn.classList.add('hidden');

    if (mode === 'view') {
        if (editBtn) editBtn.classList.remove('hidden');
    } else if (mode === 'edit') {
        if (closeBtn) closeBtn.classList.remove('hidden');
        if (m4IsDirty) {
            // Determine if we are updating or saving new
            if (module4OriginalData) {
                // Updating existing
                if (updateBtn) updateBtn.classList.remove('hidden');
                if (saveBtn) saveBtn.classList.add('hidden');
            } else {
                // Creating new
                if (saveBtn) saveBtn.classList.remove('hidden');
                if (updateBtn) updateBtn.classList.add('hidden');
            }
        }
    } else if (mode === 'create') {
        if (m4IsDirty) {
            if (saveBtn) saveBtn.classList.remove('hidden');
            if (resetBtn) resetBtn.classList.remove('hidden');
        }
    }
}

// Toggle Edit/View Mode
function toggleModule4EditMode(isEdit) {
    const form = document.getElementById('module4-form');
    // Select inputs
    const inputs = form.querySelectorAll('input, textarea');

    if (isEdit) {
        // Enable Form
        inputs.forEach(input => input.disabled = false);

        // Show validation styling or hints if needed
        form.classList.remove('opacity-80', 'pointer-events-none');

        const mode = module4OriginalData ? 'edit' : 'create';
        updateModule4FabState(mode);

    } else {
        // Disable Form (View Mode)
        inputs.forEach(input => input.disabled = true);

        // Visual indicator for Read-Only
        form.classList.add('opacity-80');

        m4IsDirty = false;
        updateModule4FabState('view');
    }

    lucide.createIcons();
}


// Load Data into Form
function loadModule4Data(data) {
    if (!data) return;
    module4OriginalData = data; // Cache for revert

    // 1. Activities
    if (data.activities) {
        Object.keys(data.activities).forEach(key => {
            const item = data.activities[key];
            const parts = key.split('_');
            if (parts.length < 2) return;
            // Key format: categoryId_activityId
            // HTML ID format: doing-categoryId-activityId

            const categoryId = parts[0];
            const activityId = parts.slice(1).join('_'); // Handle if activityId has underscore? actually split limit 2 is safer but our ID const data uses simple IDs.
            // Wait, the key stored was `category.id + '_' + activity.id`. 
            // The HTML IDs are `doing - category.id - activity.id`.

            const setChecked = (type, val) => {
                const el = document.getElementById(`${type} -${categoryId} -${activityId} `);
                if (el) el.checked = !!val;
            };

            setChecked('doing', item.doing);
            setChecked('want', item.want);
            setChecked('interested', item.interested);
        });
    }

    // 2. Notes
    const notesEl = document.getElementById('additionalNotes');
    if (notesEl) notesEl.value = data.notes || '';

    // 3. Recommendations (Read-only display, re-calculated on edit)
    // We can run updateRecommendations to reflect current checked state
    updateRecommendations();
}


// Cancel Edit
function cancelModule4Edit() {
    if (m4IsDirty) {
        if (confirm('Hủy bỏ thay đổi? Dữ liệu sẽ quay về trạng thái cũ.')) {
            // Always reset the form first to clear any 'dirty' states
            document.getElementById('module4-form').reset();

            if (module4OriginalData) {
                loadModule4Data(module4OriginalData); // Revert data
                toggleModule4EditMode(false); // Switch to view mode
                showToast('Đã hủy bỏ thay đổi', 'info');
            } else {
                // If no data existed, clear form
                updateRecommendations();
                m4IsDirty = false;
                updateModule4FabState('create');
            }
        }
    } else {
        toggleModule4EditMode(false);
    }
}


// Reset Form
function resetModule4Form() {
    if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu đã nhập?')) {
        document.getElementById('module4-form').reset();
        document.getElementById('recommendation-list').innerHTML = '<span class="text-sm text-slate-400 italic">Chọn các hoạt động để nhận gợi ý cá nhân hóa...</span>';

        // Reset form state (disable save button)
        if (typeof module4ResetFormState === 'function') {
            module4ResetFormState();
        }

        showToast('Đã xóa dữ liệu form', 'info');
    }
}

// ============================================
// STEP 7: Initialize Module
// ============================================

function initModule4() {
    const userId = getCurrentUserId();

    // Load existing data (Single Record)
    const savedData = localStorage.getItem(`mirabocaresync_${userId}_interests_assessment`); // New key

    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            loadModule4Data(data);
            toggleModule4EditMode(false); // Default to View Mode
        } catch (e) {
            console.error('Error loading module 4 data:', e);
            toggleModule4EditMode(true);
        }
    } else {
        // Check legacy array data for migration
        const legacyData = localStorage.getItem(`mirabocaresync_${userId}_interests`);
        if (legacyData) {
            try {
                const arr = JSON.parse(legacyData);
                if (arr.length > 0) {
                    const latest = arr[arr.length - 1]; // Take latest
                    loadModule4Data(latest);
                    toggleModule4EditMode(false);
                } else {
                    toggleModule4EditMode(true); // New record
                }
            } catch (e) {
                toggleModule4EditMode(true);
            }
        } else {
            toggleModule4EditMode(true); // New record
        }
    }

    // Default mode: Edit if new, View if exists
    initModule4FabLogic();



    // Global Save Function for Module 4
    window.saveModule4Assessment = function () {
        const userId = getCurrentUserId();

        // Collect activity data
        const activities = {};
        if (typeof activityCategories !== 'undefined') {
            activityCategories.forEach(function (category) {
                category.activities.forEach(function (activity) {
                    // Safe check elements
                    const doingEl = document.getElementById('doing-' + category.id + '-' + activity.id);
                    const wantEl = document.getElementById('want-' + category.id + '-' + activity.id);
                    const interestedEl = document.getElementById('interested-' + category.id + '-' + activity.id);

                    const doing = doingEl ? doingEl.checked : false;
                    const want = wantEl ? wantEl.checked : false;
                    const interested = interestedEl ? interestedEl.checked : false;

                    // Only save if at least one is checked? No, save all state or only checked ones to save space.
                    // Previous logic saved all. Let's save only if relevant to keep it clean, 
                    // BUT current load logic iterates keys. If we skip keys, load logic assumes false.
                    if (doing || want || interested) {
                        activities[category.id + '_' + activity.id] = {
                            doing: doing,
                            want: want,
                            interested: interested
                        };
                    }
                });
            });
        }

        // Get recommendations
        const recommendationElements = document.querySelectorAll('#recommendations-list span');
        const recommendations = Array.from(recommendationElements)
            .filter(el => !el.classList.contains('italic'))
            .map(el => el.textContent);

        const assessmentData = {
            userId: userId,
            assessmentDate: new Date().toLocaleDateString('vi-VN'),
            assessor: 'Administrator', // Mock user
            activities: activities,
            recommendations: recommendations,
            notes: document.getElementById('additionalNotes').value,
            timestamp: new Date().toISOString()
        };

        // Save Single Record
        localStorage.setItem('mirabocaresync_' + userId + '_interests_assessment', JSON.stringify(assessmentData));

        // Mark complete and show toast
        if (typeof markModuleComplete === 'function') markModuleComplete(userId, 'module4');

        // Dispatch event for sidebar update
        window.dispatchEvent(new Event('module-data-saved'));
        showToast('Đã lưu đánh giá sở thích thành công!', 'success');

        // Update State
        module4OriginalData = assessmentData;
        m4IsDirty = false;
        toggleModule4EditMode(false); // Switch to View Mode

        // Reset form state
        if (typeof module4ResetFormState === 'function') {
            module4ResetFormState();
        }
    };

    // Initialize icons
    setTimeout(function () {
        lucide.createIcons();
    }, 100);

    // Portal Actions to Unified Slot
    const actionSource = document.getElementById('module4-actions-source');
    const actionTarget = document.getElementById('module-actions-slot');

    if (actionSource && actionTarget) {
        actionTarget.innerHTML = '';
        while (actionSource.firstChild) {
            actionTarget.appendChild(actionSource.firstChild);
        }

        // Cleanup
        const observer = new MutationObserver((mutations) => {
            if (!document.getElementById('module4-form')) {
                actionTarget.innerHTML = ''; // Clear FABs
                observer.disconnect();
            }
        });
        observer.observe(document.getElementById('module-content'), { childList: true });
    }
}
