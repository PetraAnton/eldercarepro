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
        <div class="glass-panel rounded-[32px] overflow-hidden mb-8 group hover:shadow-xl transition-all duration-300">
            <div class="${headerClass} px-6 py-4 cursor-pointer hover:brightness-110 transition-all" onclick="toggleCategory('${category.id}')">
                <div class="flex items-center justify-between">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                        <i data-lucide="${category.icon}" class="w-5 h-5"></i>
                        ${category.name} <span class="bg-white/20 px-2 py-0.5 rounded-full text-[10px] backdrop-blur-sm">${category.activities.length}</span>
                    </h3>
                    <i data-lucide="chevron-down" id="chevron-${category.id}" class="w-5 h-5 text-white transition-transform"></i>
                </div>
            </div>
            <div id="category-${category.id}" class="p-6">
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
        </div>
        `;
    }).join('');
}

// ============================================
// STEP 3: Define Template Literal
// ============================================

window.module4Content = `
<div class="animate-fade-in">
    <!-- Tab Navigation -->
    <div class="flex gap-2 mb-6 border-b-2 border-slate-200">
        <button onclick="switchModule4Tab('form')" id="tab-form" 
            class="px-6 py-3 font-black text-sm transition-all border-b-4 border-pink-600 text-pink-600">
            <i data-lucide="clipboard-list" class="w-4 h-4 inline mr-2"></i>
            Tạo đánh giá mới
        </button>
        <button onclick="switchModule4Tab('history')" id="tab-history"
            class="px-6 py-3 font-black text-sm transition-all border-b-4 border-transparent text-slate-500 hover:text-slate-700">
            <i data-lucide="history" class="w-4 h-4 inline mr-2"></i>
            Lịch sử đánh giá
        </button>
    </div>

    <!-- Tab Content: Form -->
    <div id="content-form" class="tab-content">
        <form id="module4-form" class="space-y-6">

            <!-- Activity Grid -->
            ${generateActivityGrid()}

            <!-- Recommendations Panel -->
            <div class="glass-panel rounded-[32px] p-8 border border-amber-100/50 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
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
            <div class="glass-panel p-6 rounded-[32px] border border-pink-100/50">
                <h3 class="font-black text-pink-900 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i data-lucide="file-text" class="w-5 h-5"></i>
                    Ghi chú bổ sung
                </h3>
                <textarea id="additionalNotes" rows="4"
                    class="input-glass w-full px-4 py-3 rounded-2xl outline-none text-sm font-medium resize-none shadow-inner"
                    placeholder="Nhận xét về sở thích, khả năng tham gia, hạn chế, khuyến nghị..."></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4 px-1">
                <button type="submit" id="module4-save-btn"
                    class="flex-1 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-2xl font-black text-sm hover:shadow-lg hover:shadow-pink-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all">
                    <i data-lucide="save" class="w-4 h-4 inline mr-2 ring-offset-2"></i>
                    Lưu đánh giá
                </button>
                <button type="button" onclick="resetModule4Form()"
                    class="px-8 py-4 glass-panel text-slate-500 rounded-2xl font-black text-sm hover:bg-white/80 hover:text-rose-500 transition-all">
                    <i data-lucide="x" class="w-4 h-4 inline mr-2"></i>
                    Hủy
                </button>
            </div>
            
        </form>
    </div>

    <!-- Tab Content: History -->
    <div id="content-history" class="tab-content hidden">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            <!-- Left: Assessment List -->
            <div class="lg:col-span-1 bg-white rounded-2xl border-2 border-slate-200 overflow-hidden flex flex-col">
                <div class="bg-slate-100 px-5 py-3 border-b-2 border-slate-200">
                    <h3 class="font-black text-slate-800 text-sm">Danh sách đánh giá</h3>
                </div>
                <div id="assessment-list" class="flex-1 overflow-y-auto p-4 space-y-2">
                    <!-- Assessment items will be inserted here -->
                </div>
            </div>

            <!-- Right: Assessment Detail -->
            <div class="lg:col-span-2 bg-white rounded-2xl border-2 border-slate-200 overflow-hidden flex flex-col">
                <div class="bg-slate-100 px-5 py-3 border-b-2 border-slate-200">
                    <h3 class="font-black text-slate-800 text-sm">Chi tiết đánh giá</h3>
                </div>
                <div id="assessment-detail" class="flex-1 overflow-y-auto p-6">
                    <div class="text-center text-slate-400 py-12">
                        <i data-lucide="heart" class="w-16 h-16 mx-auto mb-4 opacity-50"></i>
                        <p class="font-semibold">Chọn một đánh giá để xem chi tiết</p>
                    </div>
                </div>
            </div>
        </div>
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
// STEP 5: Tab Switching
// ============================================

function switchModule4Tab(tab) {
    const formTab = document.getElementById('tab-form');
    const historyTab = document.getElementById('tab-history');
    const formContent = document.getElementById('content-form');
    const historyContent = document.getElementById('content-history');

    if (tab === 'form') {
        formTab.className = 'px-6 py-3 font-black text-sm transition-all border-b-4 border-pink-600 text-pink-600';
        historyTab.className = 'px-6 py-3 font-black text-sm transition-all border-b-4 border-transparent text-slate-500 hover:text-slate-700';
        formContent.classList.remove('hidden');
        historyContent.classList.add('hidden');
    } else {
        formTab.className = 'px-6 py-3 font-black text-sm transition-all border-b-4 border-transparent text-slate-500 hover:text-slate-700';
        historyTab.className = 'px-6 py-3 font-black text-sm transition-all border-b-4 border-pink-600 text-pink-600';
        formContent.classList.add('hidden');
        historyContent.classList.remove('hidden');
        loadAssessmentHistory();
    }

    lucide.createIcons();
}

// ============================================
// STEP 6: History Functions
// ============================================

function loadAssessmentHistory() {
    const patientId = 'patient_001';
    const assessments = JSON.parse(localStorage.getItem('mirabocaresync_' + patientId + '_interests') || '[]');

    const listContainer = document.getElementById('assessment-list');
    if (!listContainer) return;

    if (assessments.length === 0) {
        listContainer.innerHTML = '<div class="text-center text-slate-400 py-8"><p class="text-sm font-semibold">Chưa có đánh giá nào</p></div>';
        return;
    }

    listContainer.innerHTML = assessments.map(function (assessment, index) {
        const date = new Date(assessment.timestamp);
        const dateStr = date.toLocaleDateString('vi-VN');
        const timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

        const totalActivities = Object.values(assessment.activities).filter(a => a.doing || a.want || a.interested).length;

        return `
        <div onclick="showAssessmentDetail(${index})" 
            class="p-4 rounded-xl border-2 border-slate-200 hover:border-pink-400 hover:bg-pink-50 cursor-pointer transition-all">
            <div class="flex items-center justify-between mb-2">
                <span class="font-black text-slate-800 text-sm">Đánh giá #${assessments.length - index}</span>
                <span class="text-xs font-semibold text-pink-600">${totalActivities} hoạt động</span>
            </div>
            <div class="text-xs text-slate-500 font-semibold">
                <div>${dateStr} ${timeStr}</div>
                <div class="text-blue-600 mt-1">${assessment.assessor || ''}</div>
            </div>
        </div>
        `;
    }).join('');
}

function showAssessmentDetail(index) {
    const patientId = 'patient_001';
    const assessments = JSON.parse(localStorage.getItem('mirabocaresync_' + patientId + '_interests') || '[]');
    const assessment = assessments[index];

    if (!assessment) return;

    const detailContainer = document.getElementById('assessment-detail');
    if (!detailContainer) return;

    const date = new Date(assessment.timestamp);
    const dateStr = date.toLocaleDateString('vi-VN');
    const timeStr = date.toLocaleTimeString('vi-VN');

    // Count activities by type
    let doingCount = 0, wantCount = 0, interestedCount = 0;
    Object.values(assessment.activities).forEach(function (a) {
        if (a.doing) doingCount++;
        if (a.want) wantCount++;
        if (a.interested) interestedCount++;
    });

    let html = `
    <div class="space-y-6">
        <div class="bg-pink-50 rounded-xl p-4 border border-pink-200">
            <h4 class="font-black text-pink-900 mb-2">Thông tin đánh giá</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
                <div><span class="font-semibold text-slate-600">Ngày đánh giá:</span> <span class="font-bold">${assessment.assessmentDate}</span></div>
                <div><span class="font-semibold text-slate-600">Nhân viên:</span> <span class="font-bold">${assessment.assessor || '---'}</span></div>
                <div><span class="font-semibold text-slate-600">Đang làm:</span> <span class="font-bold text-emerald-600">${doingCount} hoạt động</span></div>
                <div><span class="font-semibold text-slate-600">Muốn làm:</span> <span class="font-bold text-blue-600">${wantCount} hoạt động</span></div>
                <div><span class="font-semibold text-slate-600">Quan tâm:</span> <span class="font-bold text-amber-600">${interestedCount} hoạt động</span></div>
            </div>
        </div>
    `;

    // Display activities by category
    activityCategories.forEach(function (category) {
        const categoryActivities = category.activities.filter(function (activity) {
            const key = category.id + '_' + activity.id;
            return assessment.activities[key] &&
                (assessment.activities[key].doing || assessment.activities[key].want || assessment.activities[key].interested);
        });

        if (categoryActivities.length > 0) {
            const colorClasses = {
                rose: 'bg-rose-50 border-rose-200 text-rose-900',
                fuchsia: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-900',
                pink: 'bg-pink-50 border-pink-200 text-pink-900',
                purple: 'bg-purple-50 border-purple-200 text-purple-900'
            };
            const colorClass = colorClasses[category.color] || 'bg-pink-50 border-pink-200 text-pink-900';

            html += `
            <div class="${colorClass} rounded-xl p-4 border">
                <h4 class="font-black mb-3">${category.name}</h4>
                <div class="space-y-2">
                    ${categoryActivities.map(function (activity) {
                const key = category.id + '_' + activity.id;
                const data = assessment.activities[key];
                const badges = [];
                if (data.doing) badges.push('<span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">Đang làm</span>');
                if (data.want) badges.push('<span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Muốn làm</span>');
                if (data.interested) badges.push('<span class="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">Quan tâm</span>');

                return `
                        <div class="bg-white rounded-lg p-3 border border-slate-200">
                            <div class="font-bold text-slate-800 mb-1">${activity.name}</div>
                            <div class="flex gap-2">${badges.join('')}</div>
                        </div>
                        `;
            }).join('')}
                </div>
            </div>
            `;
        }
    });

    if (assessment.recommendations && assessment.recommendations.length > 0) {
        html += `
        <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-black text-amber-900 mb-2">Gợi ý hoạt động</h4>
            <div class="flex flex-wrap gap-2">
                ${assessment.recommendations.map(r => `<span class="px-3 py-1 bg-white border border-amber-300 text-amber-800 rounded-lg text-sm font-bold">${r}</span>`).join('')}
            </div>
        </div>
        `;
    }

    if (assessment.notes) {
        html += `
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-black text-slate-900 mb-2">Ghi chú</h4>
            <p class="text-sm text-slate-700 whitespace-pre-wrap">${assessment.notes}</p>
        </div>
        `;
    }

    html += '</div>';
    detailContainer.innerHTML = html;
}

// ============================================
// STEP 7: Form Functions
// ============================================
// Global variable to store resetFormState function
let module4ResetFormState = null;

// Reset Form
function resetModule4Form() {
    if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu đã nhập?')) {
        document.getElementById('module4-form').reset();
        document.getElementById('recommendation-list').innerHTML = '<p class="text-slate-400 text-sm">Chọn hoạt động để xem gợi ý...</p>';

        // Reset form state (disable save button)
        if (typeof module4ResetFormState === 'function') {
            module4ResetFormState();
        }

        showToast('Đã xóa dữ liệu form', 'info');
    }
}

// ============================================
// STEP 8: Initialize Module
// ============================================

function initModule4() {
    const patientId = getCurrentPatientId();

    // Setup form change detection and store in global variable
    const resetFormState = setupFormChangeDetection('module4-form', 'module4-save-btn');
    module4ResetFormState = resetFormState; // Make accessible to resetForm()

    // 2. Form Submission
    const form = document.getElementById('module4-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect activity data
            const activities = {};
            activityCategories.forEach(function (category) {
                category.activities.forEach(function (activity) {
                    const doing = document.getElementById('doing-' + category.id + '-' + activity.id).checked;
                    const want = document.getElementById('want-' + category.id + '-' + activity.id).checked;
                    const interested = document.getElementById('interested-' + category.id + '-' + activity.id).checked;

                    activities[category.id + '_' + activity.id] = {
                        doing: doing,
                        want: want,
                        interested: interested
                    };
                });
            });

            // Get recommendations
            const recommendationElements = document.querySelectorAll('#recommendations-list span');
            const recommendations = Array.from(recommendationElements)
                .filter(el => !el.classList.contains('italic'))
                .map(el => el.textContent);

            const assessmentData = {
                assessmentDate: document.getElementById('assessmentDate').value,
                assessor: document.getElementById('assessorName').value,
                activities: activities,
                recommendations: recommendations,
                notes: document.getElementById('additionalNotes').value,
                timestamp: new Date().toISOString()
            };

            // Save to LocalStorage
            const assessments = JSON.parse(localStorage.getItem('mirabocaresync_' + patientId + '_interests') || '[]');
            assessments.push(assessmentData);
            localStorage.setItem('mirabocaresync_' + patientId + '_interests', JSON.stringify(assessments));

            // Mark complete and show toast
            markModuleComplete(patientId, 'module4');
            showToast('Đã lưu đánh giá sở thích thành công!', 'success');
            console.log('Saved interests assessment:', assessmentData);

            // Reset form state
            if (typeof resetFormState === 'function') {
                resetFormState();
            }

            // Switch to history tab
            switchModule4Tab('history');
        });
    }

    // Initialize icons
    setTimeout(function () {
        lucide.createIcons();
    }, 100);
}
