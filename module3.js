// Module 3 Content - ADL/IADL Assessment (Vietnamese Version - Table Layout)

// ============================================
// STEP 1: Define Data Arrays FIRST
// ============================================

// ADL Items Data - Barthel Index Standard (10 activities with variable scoring)
const adlActivities = [
    {
        id: 'feeding',
        name: 'Ăn uống',
        maxScore: 10,
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Cần hỗ trợ cắt thức ăn (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'transfer',
        name: 'Chuyển vị trí giường - ghế',
        maxScore: 15,
        levels: [
            { value: 15, label: 'Tự lập (15)' },
            { value: 10, label: 'Hỗ trợ nhỏ hoặc giám sát (10)' },
            { value: 5, label: 'Ngồi được nhưng cần hỗ trợ nhiều (5)' },
            { value: 0, label: 'Không thể (0)' }
        ]
    },
    {
        id: 'grooming',
        name: 'Chải đầu, đánh răng, rửa mặt',
        maxScore: 5,
        levels: [
            { value: 5, label: 'Tự lập (5)' },
            { value: 0, label: 'Cần hỗ trợ (0)' }
        ]
    },
    {
        id: 'toilet',
        name: 'Sử dụng toilet',
        maxScore: 10,
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Cần hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'bathing',
        name: 'Tắm rửa',
        maxScore: 5,
        levels: [
            { value: 5, label: 'Tự lập (5)' },
            { value: 0, label: 'Cần hỗ trợ (0)' }
        ]
    },
    {
        id: 'mobility',
        name: 'Di chuyển trên mặt phẳng',
        maxScore: 15,
        levels: [
            { value: 15, label: 'Tự đi được 50m (15)' },
            { value: 10, label: 'Đi được 50m với hỗ trợ (10)' },
            { value: 5, label: 'Tự đẩy xe lăn 50m (5)' },
            { value: 0, label: 'Không di chuyển được (0)' }
        ]
    },
    {
        id: 'stairs',
        name: 'Lên xuống cầu thang',
        maxScore: 10,
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Cần hỗ trợ hoặc giám sát (5)' },
            { value: 0, label: 'Không thể (0)' }
        ]
    },
    {
        id: 'dressing',
        name: 'Thay quần áo',
        maxScore: 10,
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Cần hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'bowel',
        name: 'Kiểm soát đại tiện',
        maxScore: 10,
        levels: [
            { value: 10, label: 'Không tai nạn (10)' },
            { value: 5, label: 'Tai nạn thỉnh thoảng (5)' },
            { value: 0, label: 'Không kiểm soát được (0)' }
        ]
    },
    {
        id: 'bladder',
        name: 'Kiểm soát tiểu tiện',
        maxScore: 10,
        levels: [
            { value: 10, label: 'Không tai nạn (10)' },
            { value: 5, label: 'Tai nạn thỉnh thoảng, max 1/ngày (5)' },
            { value: 0, label: 'Không kiểm soát được (0)' }
        ]
    }
];

// IADL Items Data (8 activities with 4-level numerical scoring: 2/1.5/1/0)
// Based on Lawton-Brody IADL Scale - Vietnamese clinical standard
const iadlActivities = [
    {
        id: 'phone',
        name: 'Sử dụng điện thoại',
        maxScore: 2,
        levels: [
            { value: 2, label: 'Tự lập (2)' },
            { value: 1.5, label: 'Giám sát (1.5)' },
            { value: 1, label: 'Hỗ trợ (1)' },
            { value: 0, label: 'Phụ thuộc (0)' }
        ]
    },
    {
        id: 'shopping',
        name: 'Đi mua sắm',
        maxScore: 2,
        levels: [
            { value: 2, label: 'Tự lập (2)' },
            { value: 1.5, label: 'Giám sát (1.5)' },
            { value: 1, label: 'Hỗ trợ (1)' },
            { value: 0, label: 'Phụ thuộc (0)' }
        ]
    },
    {
        id: 'meal_prep',
        name: 'Chuẩn bị bữa ăn',
        maxScore: 2,
        levels: [
            { value: 2, label: 'Tự lập (2)' },
            { value: 1.5, label: 'Giám sát (1.5)' },
            { value: 1, label: 'Hỗ trợ (1)' },
            { value: 0, label: 'Phụ thuộc (0)' }
        ]
    },
    {
        id: 'housekeeping',
        name: 'Làm việc nhà',
        maxScore: 2,
        levels: [
            { value: 2, label: 'Tự lập (2)' },
            { value: 1.5, label: 'Giám sát (1.5)' },
            { value: 1, label: 'Hỗ trợ (1)' },
            { value: 0, label: 'Phụ thuộc (0)' }
        ]
    },
    {
        id: 'laundry',
        name: 'Giặt giũ',
        maxScore: 2,
        levels: [
            { value: 2, label: 'Tự lập (2)' },
            { value: 1.5, label: 'Giám sát (1.5)' },
            { value: 1, label: 'Hỗ trợ (1)' },
            { value: 0, label: 'Phụ thuộc (0)' }
        ]
    },
    {
        id: 'transportation',
        name: 'Phương tiện đi lại',
        maxScore: 2,
        levels: [
            { value: 2, label: 'Tự lập (2)' },
            { value: 1.5, label: 'Giám sát (1.5)' },
            { value: 1, label: 'Hỗ trợ (1)' },
            { value: 0, label: 'Phụ thuộc (0)' }
        ]
    },
    {
        id: 'medication',
        name: 'Quản lý thuốc',
        maxScore: 2,
        levels: [
            { value: 2, label: 'Tự lập (2)' },
            { value: 1.5, label: 'Giám sát (1.5)' },
            { value: 1, label: 'Hỗ trợ (1)' },
            { value: 0, label: 'Phụ thuộc (0)' }
        ]
    },
    {
        id: 'finance',
        name: 'Quản lý tài chính',
        maxScore: 2,
        levels: [
            { value: 2, label: 'Tự lập (2)' },
            { value: 1.5, label: 'Giám sát (1.5)' },
            { value: 1, label: 'Hỗ trợ (1)' },
            { value: 0, label: 'Phụ thuộc (0)' }
        ]
    }
];

// Basic Movement Items Data (5 activities with 4-level scoring)
const basicMovementActivities = [
    {
        id: 'sleeping',
        name: 'Ngủ say',
        levels: [
            { value: 'independent', label: 'Tự lập' },
            { value: 'supervised', label: 'Giám sát' },
            { value: 'assisted', label: 'Hỗ trợ' },
            { value: 'dependent', label: 'Phụ thuộc' }
        ]
    },
    {
        id: 'basic_movement',
        name: 'Vận động cơ bản',
        levels: [
            { value: 'independent', label: 'Tự lập' },
            { value: 'supervised', label: 'Giám sát' },
            { value: 'assisted', label: 'Hỗ trợ' },
            { value: 'dependent', label: 'Phụ thuộc' }
        ]
    },
    {
        id: 'reading',
        name: 'Đọc sách',
        levels: [
            { value: 'independent', label: 'Tự lập' },
            { value: 'supervised', label: 'Giám sát' },
            { value: 'assisted', label: 'Hỗ trợ' },
            { value: 'dependent', label: 'Phụ thuộc' }
        ]
    },
    {
        id: 'communication',
        name: 'Giao tiếp trả lời',
        levels: [
            { value: 'independent', label: 'Tự lập' },
            { value: 'supervised', label: 'Giám sát' },
            { value: 'assisted', label: 'Hỗ trợ' },
            { value: 'dependent', label: 'Phụ thuộc' }
        ]
    },
    {
        id: 'phone',
        name: 'Điện thoại',
        levels: [
            { value: 'independent', label: 'Tự lập' },
            { value: 'supervised', label: 'Giám sát' },
            { value: 'assisted', label: 'Hỗ trợ' },
            { value: 'dependent', label: 'Phụ thuộc' }
        ]
    }
];

// ============================================
// STEP 2: Define Helper Functions SECOND
// ============================================

function generateADLTableRows() {
    return adlActivities.map(function (activity, index) {
        // Only first row has the 2 merged cells (environment and problems)
        const mergedCells = index === 0 ? `
            <td rowspan="${adlActivities.length}" class="p-3 align-top">
                <textarea id="adl-environment" rows="${adlActivities.length * 2}"
                    placeholder="Địa điểm thực hiện và dụng cụ hỗ trợ..."
                    class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium resize-none"></textarea>
            </td>
            <td rowspan="${adlActivities.length}" class="p-3 align-top">
                <textarea id="adl-problems" rows="${adlActivities.length * 2}"
                    placeholder="Tình trạng - vấn đề sinh hoạt..."
                    class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium resize-none"></textarea>
            </td>
        ` : '';

        // Generate radio buttons for each level
        const levelCells = activity.levels.map(function (level) {
            return `
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="adl-level-${activity.id}" value="${level.value}" 
                        onchange="updateADLScore()"
                        class="w-5 h-5 text-emerald-600 focus:ring-emerald-100">
                </label>
            </td>`;
        }).join('');

        // Add empty cells if activity has fewer than 4 levels (for table alignment)
        const maxLevels = 4; // Maximum levels any activity can have
        const emptyCells = Array(maxLevels - activity.levels.length).fill('<td class="p-3 bg-slate-50/30"></td>').join('');

        return `
        <tr class="border-b border-emerald-50 hover:bg-emerald-50/30 transition-colors group">
            <td class="p-4 font-bold text-slate-700">${activity.name}</td>
            ${levelCells}
            ${emptyCells}
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="checkbox" id="adl-status-${activity.id}" 
                        class="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-100">
                </label>
            </td>
            ${mergedCells}
        </tr>
        `;
    }).join('');
}

function generateIADLTableRows() {
    return iadlActivities.map(function (activity, index) {
        // Only first row has the 2 merged cells (environment and problems)
        const mergedCells = index === 0 ? `
            <td rowspan="${iadlActivities.length}" class="p-3 align-top">
                <textarea id="iadl-environment" rows="${iadlActivities.length * 2}"
                    placeholder="Địa điểm thực hiện và dụng cụ hỗ trợ..."
                    class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium resize-none"></textarea>
            </td>
            <td rowspan="${iadlActivities.length}" class="p-3 align-top">
                <textarea id="iadl-problems" rows="${iadlActivities.length * 2}"
                    placeholder="Tình trạng - vấn đề sinh hoạt..."
                    class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium resize-none"></textarea>
            </td>
        ` : '';

        return `
        <tr class="border-b border-violet-50 hover:bg-violet-50/30 transition-colors group">
            <td class="p-4 font-bold text-slate-700">${activity.name}</td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="iadl-level-${activity.id}" value="2" 
                        onchange="updateIADLScore()"
                        class="w-5 h-5 text-emerald-600 focus:ring-emerald-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="iadl-level-${activity.id}" value="1.5" 
                        onchange="updateIADLScore()"
                        class="w-5 h-5 text-blue-600 focus:ring-blue-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="iadl-level-${activity.id}" value="1" 
                        onchange="updateIADLScore()"
                        class="w-5 h-5 text-amber-600 focus:ring-amber-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="iadl-level-${activity.id}" value="0" 
                        onchange="updateIADLScore()"
                        class="w-5 h-5 text-slate-600 focus:ring-slate-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="checkbox" id="iadl-status-${activity.id}" 
                        class="w-5 h-5 rounded text-violet-600 focus:ring-violet-100">
                </label>
            </td>
            ${mergedCells}
        </tr>
        `;
    }).join('');
}

function generateBasicMovementTableRows() {
    return basicMovementActivities.map(function (activity) {
        return `
        <tr class="border-b border-slate-100/50 hover:bg-white/40 transition-colors group">
            <td class="p-4 font-bold text-slate-700">${activity.name}</td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="movement-level-${activity.id}" value="independent" 
                        class="w-5 h-5 text-emerald-600 focus:ring-emerald-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="movement-level-${activity.id}" value="supervised" 
                        class="w-5 h-5 text-blue-600 focus:ring-blue-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="movement-level-${activity.id}" value="assisted" 
                        class="w-5 h-5 text-amber-600 focus:ring-amber-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="movement-level-${activity.id}" value="dependent" 
                        class="w-5 h-5 text-slate-600 focus:ring-slate-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="inline-flex items-center gap-2 cursor-pointer glass-panel px-3 py-2 rounded-xl border border-white/40 hover:bg-rose-50 hover:border-rose-200 transition-all shadow-sm">
                    <input type="checkbox" id="movement-problem-${activity.id}" 
                        class="w-4 h-4 rounded text-rose-600 focus:ring-rose-100">
                    <span class="text-xs font-black text-rose-500 uppercase tracking-wider">Có</span>
                </label>
            </td>
            <td class="p-3">
                <input type="text" id="movement-support-${activity.id}" 
                    placeholder="Mức hưởng thụ..."
                    class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium">
            </td>
            <td class="p-3">
                <textarea id="movement-notes-${activity.id}" rows="1"
                    placeholder="Ghi chú..."
                    class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium resize-none"></textarea>
            </td>
        </tr>
        `;
    }).join('');
}

// ============================================
// STEP 3: Define Template Literal LAST
// ============================================


window.module3Content = `
<div class="animate-fade-in">
    
    <form id="module3-form" class="space-y-6 pb-20">

        <!-- ADL Assessment Table - Barthel Index -->
        <div class="glass-panel rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                <h3 class="font-black text-white text-sm flex items-center gap-2 tracking-wide uppercase">
                    <i data-lucide="user-check" class="w-5 h-5"></i>
                    Barthel Index - Hoạt động Sinh hoạt Cơ bản (ADL)
                </h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-emerald-50/50 backdrop-blur-md">
                        <tr class="border-b border-emerald-100">
                            <th rowspan="2" class="p-4 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Hạng mục</th>
                            <th colspan="4" class="p-3 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Mức độ</th>
                            <th rowspan="2" class="p-4 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Tình trạng</th>
                            <th rowspan="2" class="p-4 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Môi trường<br/>(địa điểm thực hiện và dụng cụ hỗ trợ)</th>
                            <th rowspan="2" class="p-4 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Tình trạng - vấn đề<br/>sinh hoạt</th>
                        </tr>
                        <tr class="border-b border-emerald-100">
                            <th class="p-3 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest w-24">Mức 1<br/><span class="text-emerald-600">(15-10-5)</span></th>
                            <th class="p-3 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest w-24">Mức 2<br/><span class="text-emerald-600">(10-5)</span></th>
                            <th class="p-3 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest w-24">Mức 3<br/><span class="text-emerald-600">(5)</span></th>
                            <th class="p-3 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest w-24">Mức 4<br/><span class="text-emerald-600">(0)</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50/50">
                        ${generateADLTableRows()}
                    </tbody>
                </table>
            </div>
            <div class="bg-emerald-50/30 px-6 py-5 border-t border-emerald-100/50">
                <div class="flex items-center justify-between mb-3">
                    <span class="font-black text-emerald-900 uppercase tracking-widest text-xs">Tổng điểm Barthel Index:</span>
                    <div class="flex items-center gap-2">
                        <span id="adl-total-score" class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">0</span>
                        <span class="text-sm font-bold text-emerald-400">/ 100</span>
                    </div>
                </div>
                <div id="dependency-level-display" class="flex items-center gap-2 justify-end">
                    <!-- Dynamic dependency level badge will be inserted here -->
                </div>
            </div>
        </div>

        <!-- IADL Assessment Table -->
        <div class="glass-panel rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
                <h3 class="font-black text-white text-sm flex items-center gap-2 tracking-wide uppercase">
                    <i data-lucide="briefcase" class="w-5 h-5"></i>
                    Lawton Scale - Hoạt động Sinh hoạt Công cụ (IADL)
                </h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-violet-50/50 backdrop-blur-md border-b border-violet-100/50">
                        <tr>
                            <th class="p-4 text-left font-black text-violet-900 text-[10px] uppercase tracking-widest">Hạng mục</th>
                            <th class="p-3 text-center font-black text-violet-900 text-[10px] uppercase tracking-widest w-24 relative group cursor-help">
                                <div>Tự lập<br/><span class="text-violet-600">(2)</span></div>
                                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-64">
                                    <div class="bg-slate-900 text-white text-xs font-normal normal-case tracking-normal rounded-lg px-4 py-3 shadow-2xl">
                                        <div class="font-bold mb-1">Tự lập</div>
                                        <div class="text-slate-300">Thực hiện hoàn toàn, an toàn, đúng trình tự, không cần nhắc hay hỗ trợ</div>
                                        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                </div>
                            </th>
                            <th class="p-3 text-center font-black text-violet-900 text-[10px] uppercase tracking-widest w-24 relative group cursor-help">
                                <div>Giám sát<br/><span class="text-violet-600">(1.5)</span></div>
                                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-64">
                                    <div class="bg-slate-900 text-white text-xs font-normal normal-case tracking-normal rounded-lg px-4 py-3 shadow-2xl">
                                        <div class="font-bold mb-1">Giám sát</div>
                                        <div class="text-slate-300">Thực hiện được nhưng cần nhắc nhở, theo dõi hoặc giám sát</div>
                                        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                </div>
                            </th>
                            <th class="p-3 text-center font-black text-violet-900 text-[10px] uppercase tracking-widest w-24 relative group cursor-help">
                                <div>Hỗ trợ<br/><span class="text-violet-600">(1)</span></div>
                                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-64">
                                    <div class="bg-slate-900 text-white text-xs font-normal normal-case tracking-normal rounded-lg px-4 py-3 shadow-2xl">
                                        <div class="font-bold mb-1">Hỗ trợ</div>
                                        <div class="text-slate-300">Cần người hỗ trợ một phần (chuẩn bị, làm cùng, hướng dẫn trực tiếp)</div>
                                        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                </div>
                            </th>
                            <th class="p-3 text-center font-black text-violet-900 text-[10px] uppercase tracking-widest w-24 relative group cursor-help">
                                <div>Phụ thuộc<br/><span class="text-violet-600">(0)</span></div>
                                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-64">
                                    <div class="bg-slate-900 text-white text-xs font-normal normal-case tracking-normal rounded-lg px-4 py-3 shadow-2xl">
                                        <div class="font-bold mb-1">Phụ thuộc</div>
                                        <div class="text-slate-300">Không thể tự thực hiện, người khác làm hoàn toàn</div>
                                        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                </div>
                            </th>
                            <th class="p-4 text-center font-black text-violet-900 text-[10px] uppercase tracking-widest w-24">Vấn đề</th>
                            <th class="p-4 text-left font-black text-violet-900 text-[10px] uppercase tracking-widest">Dung cụ hỗ trợ</th>
                            <th class="p-4 text-left font-black text-violet-900 text-[10px] uppercase tracking-widest">Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50/50">
                        ${generateIADLTableRows()}
                    </tbody>
                </table>
            </div>
            <div class="bg-violet-50/30 px-6 py-5 border-t border-violet-100/50">
                <div class="flex items-center justify-between mb-3">
                    <span class="font-black text-violet-900 uppercase tracking-widest text-xs">Tổng điểm IADL (Lawton-Brody):</span>
                    <div class="flex items-center gap-2">
                        <span id="iadl-total-score" class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">0</span>
                        <span class="text-sm font-bold text-violet-400">/ 16</span>
                    </div>
                </div>
                <div id="iadl-dependency-level-display" class="flex items-center gap-2 justify-end">
                    <!-- Dynamic IADL dependency level badge will be inserted here -->
                </div>
            </div>
        </div>

        <!-- Basic Movement Assessment Table -->
        <div class="glass-panel rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                <h3 class="font-black text-white text-sm flex items-center gap-2 tracking-wide uppercase">
                    <i data-lucide="zap" class="w-5 h-5"></i>
                    Vận Động Cơ Bản
                </h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                     <thead class="bg-amber-50/50 backdrop-blur-md border-b border-amber-100/50">
                        <tr>
                            <th class="p-4 text-left font-black text-amber-900 text-[10px] uppercase tracking-widest">Hạng mục</th>
                            <th class="p-3 text-center font-black text-amber-900 text-[10px] uppercase tracking-widest w-24">Tự lập</th>
                            <th class="p-3 text-center font-black text-amber-900 text-[10px] uppercase tracking-widest w-24">Giám sát</th>
                            <th class="p-3 text-center font-black text-amber-900 text-[10px] uppercase tracking-widest w-24">Hỗ trợ</th>
                            <th class="p-3 text-center font-black text-amber-900 text-[10px] uppercase tracking-widest w-24">Phụ thuộc</th>
                            <th class="p-4 text-center font-black text-amber-900 text-[10px] uppercase tracking-widest w-24">Vấn đề</th>
                            <th class="p-4 text-left font-black text-amber-900 text-[10px] uppercase tracking-widest">Dung cụ hỗ trợ</th>
                            <th class="p-4 text-left font-black text-amber-900 text-[10px] uppercase tracking-widest">Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50/50">
                        ${generateBasicMovementTableRows()}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- General Notes -->
        <div class="glass-panel p-6 rounded-[32px] border border-amber-100/50">
            <h3 class="font-black text-amber-900 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                <i data-lucide="file-text" class="w-5 h-5"></i>
                Ghi chú chung
            </h3>
            <textarea id="generalNotes" rows="4"
                class="input-glass w-full px-4 py-3 rounded-2xl outline-none text-sm font-medium resize-none shadow-inner"
                placeholder="Nhận xét tổng quan, xu hướng cải thiện/suy giảm, khuyến nghị..."></textarea>
        </div>
        
    </form>

</div>


    <!-- FLOATING ACTION BUTTONS (FAB) - Moved Outside -->
    <div id="module3-fab-container" class="fixed bottom-48 right-8 flex flex-col-reverse items-end gap-5 z-40 animate-fade-in pointer-events-none">
        
        <!-- SAVE (Create Mode) -->
        <button type="button" id="module3-fab-save" onclick="saveModule3Assessment()" 
            class="pointer-events-auto hidden w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
            <i data-lucide="save" class="w-7 h-7"></i>
            <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                Lưu đánh giá
            </span>
        </button>

        <!-- UPDATE (Edit Mode) -->
        <button type="button" id="module3-fab-update" onclick="saveModule3Assessment()" 
            class="pointer-events-auto hidden w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
            <i data-lucide="save" class="w-7 h-7"></i>
            <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                Lưu thay đổi
            </span>
        </button>

        <!-- EDIT (View Mode) -->
        <button type="button" id="module3-fab-edit" onclick="toggleModule3EditMode(true)" 
            class="pointer-events-auto w-14 h-14 bg-amber-500 text-white rounded-full shadow-[0_8px_25px_rgb(245,158,11,0.5)] hover:bg-amber-400 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
            <i data-lucide="edit-2" class="w-6 h-6"></i>
            <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                Chỉnh sửa
            </span>
        </button>

        <!-- CLOSE (Cancel Edit) -->
        <button type="button" id="module3-fab-close" onclick="cancelModule3Edit()" 
            class="pointer-events-auto hidden w-12 h-12 bg-white text-slate-500 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-slate-200 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative border border-slate-100 ring-2 ring-white">
            <i data-lucide="x" class="w-6 h-6"></i>
            <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                Đóng / Hủy
            </span>
        </button>
    </div>
</div>
`;

// ============================================
// STEP 4: Define Calculation & UI Functions
// ============================================

// Get Barthel Index Dependency Level Classification
// Based on MDCalc standard: https://www.mdcalc.com/calc/3912/barthel-index-activities-daily-living-adl
function getBarthelDependencyLevel(score) {
    if (score >= 80) {
        return {
            level: 'Hoàn toàn độc lập',
            englishLevel: 'Independent',
            color: 'emerald',
            bgColor: 'bg-emerald-100',
            textColor: 'text-emerald-800',
            borderColor: 'border-emerald-300',
            icon: 'check-circle'
        };
    }
    if (score >= 60) {
        return {
            level: 'Phụ thuộc nhẹ',
            englishLevel: 'Minimal dependence',
            color: 'blue',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-800',
            borderColor: 'border-blue-300',
            icon: 'alert-circle'
        };
    }
    if (score >= 40) {
        return {
            level: 'Phụ thuộc vừa',
            englishLevel: 'Partially dependent',
            color: 'amber',
            bgColor: 'bg-amber-100',
            textColor: 'text-amber-800',
            borderColor: 'border-amber-300',
            icon: 'alert-triangle'
        };
    }
    if (score >= 20) {
        return {
            level: 'Phụ thuộc nặng',
            englishLevel: 'Very dependent',
            color: 'orange',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-800',
            borderColor: 'border-orange-300',
            icon: 'alert-octagon'
        };
    }
    return {
        level: 'Phụ thuộc hoàn toàn',
        englishLevel: 'Total dependence',
        color: 'red',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
        icon: 'x-circle'
    };
}

function updateADLScore() {
    var total = 0;
    adlActivities.forEach(function (activity) {
        var radio = document.querySelector('input[name="adl-level-' + activity.id + '"]:checked');
        if (radio && radio.value) {
            total += parseInt(radio.value);
        }
    });

    var scoreElement = document.getElementById('adl-total-score');
    if (scoreElement) {
        scoreElement.textContent = total;
    }

    // Update dependency level display
    var dependencyDisplay = document.getElementById('dependency-level-display');
    if (dependencyDisplay && total > 0) {
        var classification = getBarthelDependencyLevel(total);
        dependencyDisplay.innerHTML = `
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl ${classification.bgColor} ${classification.textColor} border-2 ${classification.borderColor} shadow-sm">
                <i data-lucide="${classification.icon}" class="w-5 h-5"></i>
                <span class="font-black text-sm uppercase tracking-wider">${classification.level}</span>
                <span class="text-xs opacity-75">(${total}/100)</span>
            </div>
        `;
        // Reinitialize lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } else if (dependencyDisplay) {
        dependencyDisplay.innerHTML = '';
    }
}


// Get IADL Dependency Level Classification
// Based on Lawton-Brody IADL Scale (8 activities × 2 points = 16 max)
function getIADLDependencyLevel(score) {
    const maxScore = 16; // 8 activities × 2 points each
    const percentage = (score / maxScore) * 100;

    if (percentage === 100) {
        return {
            level: 'Hoàn toàn độc lập',
            color: 'emerald',
            bgColor: 'bg-emerald-100',
            textColor: 'text-emerald-800',
            borderColor: 'border-emerald-300',
            icon: 'check-circle'
        };
    }
    if (percentage >= 75) {
        return {
            level: 'Phụ thuộc nhẹ',
            color: 'blue',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-800',
            borderColor: 'border-blue-300',
            icon: 'alert-circle'
        };
    }
    if (percentage >= 50) {
        return {
            level: 'Phụ thuộc vừa',
            color: 'amber',
            bgColor: 'bg-amber-100',
            textColor: 'text-amber-800',
            borderColor: 'border-amber-300',
            icon: 'alert-triangle'
        };
    }
    if (percentage >= 25) {
        return {
            level: 'Phụ thuộc nặng',
            color: 'orange',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-800',
            borderColor: 'border-orange-300',
            icon: 'alert-octagon'
        };
    }
    return {
        level: 'Phụ thuộc hoàn toàn',
        color: 'red',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        borderColor: 'border-red-300',
        icon: 'x-circle'
    };
}

function updateIADLScore() {
    var total = 0;
    iadlActivities.forEach(function (activity) {
        var radio = document.querySelector('input[name="iadl-level-' + activity.id + '"]:checked');
        if (radio && radio.value) {
            total += parseFloat(radio.value);
        }
    });

    var scoreElement = document.getElementById('iadl-total-score');
    if (scoreElement) {
        scoreElement.textContent = total.toFixed(1);
    }

    // Update dependency level display
    var dependencyDisplay = document.getElementById('iadl-dependency-level-display');
    if (dependencyDisplay && total > 0) {
        var classification = getIADLDependencyLevel(total);
        dependencyDisplay.innerHTML = `
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl ${classification.bgColor} ${classification.textColor} border-2 ${classification.borderColor} shadow-sm">
                <i data-lucide="${classification.icon}" class="w-5 h-5"></i>
                <span class="font-black text-sm uppercase tracking-wider">${classification.level}</span>
                <span class="text-xs opacity-75">(${total.toFixed(1)}/16)</span>
            </div>
        `;
        // Reinitialize lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } else if (dependencyDisplay) {
        dependencyDisplay.innerHTML = '';
    }
}


// Global state
let module3ResetFormState = null;
let module3OriginalData = null;
let m3IsDirty = false;

// Init FAB Logic
function initModule3FabLogic() {
    const form = document.getElementById('module3-form');
    // Listen for changes
    form.addEventListener('input', () => {
        if (!m3IsDirty) {
            m3IsDirty = true;
            updateModule3FabState('edit'); // Assume edit if inputting? 
            // Better to check current mode. But inputs are disabled in view mode.
        }
    });
    // Also change event for radios
    form.addEventListener('change', () => {
        if (!m3IsDirty) {
            m3IsDirty = true;
            updateModule3FabState('edit');
        }
    });
}

// Update FAB State
function updateModule3FabState(mode) {
    const editBtn = document.getElementById('module3-fab-edit');
    const saveBtn = document.getElementById('module3-fab-save');
    const updateBtn = document.getElementById('module3-fab-update');
    const closeBtn = document.getElementById('module3-fab-close');

    // Hide all
    if (editBtn) editBtn.classList.add('hidden');
    if (saveBtn) saveBtn.classList.add('hidden');
    if (updateBtn) updateBtn.classList.add('hidden');
    if (closeBtn) closeBtn.classList.add('hidden');

    if (mode === 'view') {
        if (editBtn) editBtn.classList.remove('hidden');
    } else if (mode === 'edit') {
        if (closeBtn) closeBtn.classList.remove('hidden'); // Always show Close
        if (m3IsDirty) {
            if (updateBtn) updateBtn.classList.remove('hidden'); // Show Update
        }
    } else if (mode === 'create') {
        // Not explicitly used in M3 (it loads data or empty), but if empty -> Is Create?
        // Let's assume M3 is always Edit if data exists, or Create if not.
        // For simplicity, M3 uses 'edit' mode for both dirty checking.
        if (m3IsDirty) {
            if (saveBtn) saveBtn.classList.remove('hidden');
            if (closeBtn) closeBtn.classList.remove('hidden'); // Or Reset?
        }
    }
}

// Toggle Edit/View Mode
function toggleModule3EditMode(isEdit) {
    const form = document.getElementById('module3-form');
    // Select inputs (excluding read-only displays if any)
    const inputs = form.querySelectorAll('input, textarea');

    if (isEdit) {
        // Enable Form
        inputs.forEach(input => input.disabled = false);

        // Show validation styling or hints if needed
        form.classList.remove('opacity-80', 'pointer-events-none');

        // If we have data, it's Edit mode. If not, Create?
        // Simple heuristic: If originalData is set, it's Edit.
        const mode = module3OriginalData ? 'edit' : 'create';
        updateModule3FabState(mode);

    } else {
        // Disable Form (View Mode)
        inputs.forEach(input => input.disabled = true);

        // Visual indicator for Read-Only
        form.classList.add('opacity-80');

        m3IsDirty = false;
        updateModule3FabState('view');
    }

    // Create new icons if needed
    lucide.createIcons();
}

// Cancel Edit
function cancelModule3Edit() {
    if (m3IsDirty) {
        if (confirm('Hủy bỏ thay đổi? Dữ liệu sẽ quay về trạng thái cũ.')) {
            // Always reset the form first to clear any 'dirty' states that might not be overwritten by null values
            document.getElementById('module3-form').reset();

            if (module3OriginalData) {
                loadModule3Data(module3OriginalData);
            } else {
                updateADLScore(); // Just in case
            }

            toggleModule3EditMode(false);
            showToast('Đã hủy bỏ thay đổi', 'info');
        }
    } else {
        toggleModule3EditMode(false);
    }
}


// Migrate old ADL data to Barthel Index format
function migrateToBartheIndex(oldData) {
    if (!oldData || !oldData.adl) return oldData;

    // Check if already migrated (has 'feeding' instead of 'eating')
    if (oldData.adl.feeding !== undefined) {
        return oldData; // Already migrated
    }

    console.log('[Module3] Migrating old ADL data to Barthel Index format...');

    const migratedAdl = {};

    // Activity ID mapping: old -> new
    const activityMapping = {
        'eating': 'feeding',        // Rename
        'transfer': 'transfer',     // Keep same
        'hygiene': 'grooming',      // Rename (was general hygiene, now specific grooming)
        'toilet': 'toilet',         // Keep same
        'bathing': 'bathing',       // Keep same
        'mobility': 'mobility',     // Keep same
        'dressing': 'dressing',     // Keep same
        'bowel': 'bowel',          // Keep same
        'bladder': 'bladder',      // Keep same
        'dining': null             // Remove (not in Barthel Index)
    };

    // Migrate existing activities
    Object.keys(oldData.adl).forEach(oldKey => {
        const newKey = activityMapping[oldKey];
        if (newKey) {
            const oldItem = oldData.adl[oldKey];
            // Adjust scores if needed based on new max scores
            let newLevel = oldItem.level;

            // Special handling for activities with changed scoring
            if (newKey === 'grooming' || newKey === 'bathing') {
                // These now have max 5 instead of 10
                if (newLevel === 10) newLevel = 5;
                else if (newLevel === 5) newLevel = 0; // Partial help becomes dependent
            } else if (newKey === 'transfer' || newKey === 'mobility') {
                // These now have max 15 instead of 10
                if (newLevel === 10) newLevel = 15; // Independent
                else if (newLevel === 5) newLevel = 10; // Partial help
                // 0 stays 0
            }

            migratedAdl[newKey] = {
                level: newLevel,
                hasProblem: oldItem.hasProblem || false,
                support: oldItem.support || null,
                notes: oldItem.notes || null
            };
        }
    });

    // Add new 'stairs' activity with default null (not assessed)
    if (!migratedAdl.stairs) {
        migratedAdl.stairs = {
            level: null,
            hasProblem: false,
            support: null,
            notes: null
        };
    }

    return {
        ...oldData,
        adl: migratedAdl,
        migrated: true,
        migrationDate: new Date().toISOString()
    };
}

// Load Data into Form
function loadModule3Data(data) {
    if (!data) return;

    // Migrate old data format if needed
    data = migrateToBartheIndex(data);

    module3OriginalData = data; // Cache for revert
    m3IsDirty = false;

    // Helper to safely set value
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };
    const setCheckedVal = (name, val) => {
        if (!val && val !== 0 && val !== '0') return; // Handle 0 value
        const radio = document.querySelector(`input[name="${name}"][value="${val}"]`);
        if (radio) radio.checked = true;
    };
    const setCheckedBool = (id, checked) => {
        const el = document.getElementById(id);
        if (el) el.checked = !!checked;
    };

    // 1. ADL
    if (data.adl) {
        Object.keys(data.adl).forEach(key => {
            const item = data.adl[key];
            setCheckedVal(`adl-level-${key}`, item.level);
            setCheckedBool(`adl-status-${key}`, item.hasProblem);
        });
    }
    setVal('adl-environment', data.adlEnvironment);
    setVal('adl-problems', data.adlProblems);

    // 2. IADL
    if (data.iadl) {
        Object.keys(data.iadl).forEach(key => {
            const item = data.iadl[key];
            setCheckedVal(`iadl-level-${key}`, item.level);
            setCheckedBool(`iadl-status-${key}`, item.hasProblem);
        });
    }
    setVal('iadl-environment', data.iadlEnvironment);
    setVal('iadl-problems', data.iadlProblems);

    // 3. Basic Movement
    if (data.basicMovement) {
        Object.keys(data.basicMovement).forEach(key => {
            const item = data.basicMovement[key];
            setCheckedVal(`movement-level-${key}`, item.level);
            setCheckedBool(`movement-problem-${key}`, item.hasProblem);
            setVal(`movement-support-${key}`, item.support);
            setVal(`movement-notes-${key}`, item.notes);
        });
    }

    // 4. General Notes
    setVal('generalNotes', data.generalNotes);

    // Recalculate scores
    updateADLScore();
    updateIADLScore();
}

// ----------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------
function initModule3() {
    const patientId = getCurrentPatientId();
    console.log('[Module3] Initializing for patient:', patientId);

    // 1. Load Data
    // Use singular key for Single Record pattern
    const savedData = localStorage.getItem(`mirabocaresync_${patientId}_adl_assessment`);

    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            loadModule3Data(data);
            toggleModule3EditMode(false); // Default to View Mode
        } catch (e) {
            console.error('Error loading module 3 data:', e);
            toggleModule3EditMode(true);
        }
    } else {
        // Check legacy array data for migration
        const legacyData = localStorage.getItem(`mirabocaresync_${patientId}_adl_assessments`);
        if (legacyData) {
            try {
                const arr = JSON.parse(legacyData);
                if (arr.length > 0) {
                    const latest = arr[arr.length - 1]; // Take latest
                    loadModule3Data(latest);
                    toggleModule3EditMode(false);
                } else {
                    toggleModule3EditMode(true); // New record
                }
            } catch (e) {
                toggleModule3EditMode(true);
            }
        } else {
            toggleModule3EditMode(true); // New record
        }
    }

    // Setup form change detection
    // Note: 'module3-fab-save' is the ID of the FAB save button
    const resetFormState = setupFormChangeDetection('module3-form', 'module3-fab-save', (isDirty) => {
        m3IsDirty = isDirty; // Sync global dirty state

        const fabSave = document.getElementById('module3-fab-save');
        const fabUpdate = document.getElementById('module3-fab-update');

        if (!fabSave) return;

        // Only toggle visibility if we are in Edit Mode
        const fabEdit = document.getElementById('module3-fab-edit');
        const isEditMode = fabEdit && fabEdit.classList.contains('hidden');

        if (isEditMode) {
            if (isDirty) {
                // Determine if we are updating or saving new
                if (module3OriginalData) {
                    // Updating existing
                    if (fabUpdate) fabUpdate.classList.remove('hidden');
                    if (fabSave) fabSave.classList.add('hidden');
                } else {
                    // Creating new
                    if (fabSave) fabSave.classList.remove('hidden');
                    if (fabUpdate) fabUpdate.classList.add('hidden');
                }
            } else {
                if (fabSave) fabSave.classList.add('hidden');
                if (fabUpdate) fabUpdate.classList.add('hidden');
            }
        } else {
            if (fabSave) fabSave.classList.add('hidden');
            if (fabUpdate) fabUpdate.classList.add('hidden');
        }
    });
    module3ResetFormState = resetFormState;

    // 1. Load Patient Info from Module 1
    const facesheetData = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_facesheet`) || '{}');
    if (facesheetData.basic) {
        const nameDisplay = document.getElementById('patient-name-display');
        const ageGenderDisplay = document.getElementById('patient-age-gender-display');
        const careLevelDisplay = document.getElementById('patient-care-level-display');

        if (nameDisplay) nameDisplay.textContent = facesheetData.basic.fullName || '--';
        if (ageGenderDisplay) ageGenderDisplay.textContent = `${facesheetData.basic.age || '--'} / ${facesheetData.basic.gender === 'male' ? 'Nam' : 'Nữ'}`;
        if (careLevelDisplay) careLevelDisplay.textContent = facesheetData.careInfo?.level || 'Chưa có phân loại';
    }

    // Initialize icons
    setTimeout(function () {
        lucide.createIcons();
    }, 100);
}

// Global Save Function for Module 3
// Global Save Function for Module 3
window.saveModule3Assessment = function () {
    const patientId = getCurrentPatientId();

    // Collect ADL data
    var adlData = {};
    var adlTotal = 0;
    adlActivities.forEach(function (activity) {
        // Fix: Get Radio Value correctly
        var radio = document.querySelector('input[name="adl-level-' + activity.id + '"]:checked');
        var level = radio ? parseInt(radio.value) : null;

        // Fix: Correct Checkbox ID
        var checkbox = document.getElementById('adl-status-' + activity.id);
        var problem = checkbox ? checkbox.checked : false;

        adlData[activity.id] = {
            level: level,
            hasProblem: problem,
            support: null,
            notes: null
        };

        if (level !== null) {
            adlTotal += level;
        }
    });

    // Collect ADL Environment & Problems
    var adlEnvironment = document.getElementById('adl-environment').value;
    var adlProblems = document.getElementById('adl-problems').value;

    // Collect IADL data
    var iadlData = {};
    var iadlTotal = 0;
    iadlActivities.forEach(function (activity) {
        var radio = document.querySelector('input[name="iadl-level-' + activity.id + '"]:checked');
        var level = radio ? parseFloat(radio.value) : null;

        var checkbox = document.getElementById('iadl-status-' + activity.id);
        var problem = checkbox ? checkbox.checked : false;

        iadlData[activity.id] = {
            level: level,
            hasProblem: problem,
            support: null,
            notes: null
        };

        if (level !== null) {
            iadlTotal += level;
        }
    });

    // Collect IADL Environment & Problems
    var iadlEnvironment = document.getElementById('iadl-environment').value;
    var iadlProblems = document.getElementById('iadl-problems').value;

    // Collect Basic Movement data
    var movementData = {};
    basicMovementActivities.forEach(function (activity) {
        // Fix: Get Radio Value
        var radio = document.querySelector('input[name="movement-level-' + activity.id + '"]:checked');
        var level = radio ? radio.value : null;

        // Fix: Checkbox ID is correct in HTML (movement-problem-...)
        var checkbox = document.getElementById('movement-problem-' + activity.id);
        var problem = checkbox ? checkbox.checked : false;

        // Fix Inputs (support/notes exist)
        var support = document.getElementById('movement-support-' + activity.id).value;
        var notes = document.getElementById('movement-notes-' + activity.id).value;

        movementData[activity.id] = {
            level: level,
            hasProblem: problem,
            support: support,
            notes: notes
        };
    });

    // Construct Assessment Object
    var assessment = {
        patientId: patientId,
        assessmentDate: new Date().toLocaleDateString('vi-VN'),
        assessor: 'Administrator', // Mock user
        adl: adlData,
        adlTotal: adlTotal,
        adlEnvironment: adlEnvironment,
        adlProblems: adlProblems,
        iadl: iadlData,
        iadlTotal: iadlTotal,
        iadlEnvironment: iadlEnvironment,
        iadlProblems: iadlProblems,
        basicMovement: movementData,
        generalNotes: document.getElementById('generalNotes').value,
        timestamp: new Date().toISOString()
    };

    // Save Single Record
    localStorage.setItem('mirabocaresync_' + patientId + '_adl_assessment', JSON.stringify(assessment));

    showToast('Đã lưu đánh giá ADL thành công!', 'success');

    // Update State
    module3OriginalData = assessment;
    toggleModule3EditMode(false); // Switch to View Mode

    // Reset save button state
    if (typeof module3ResetFormState === 'function') module3ResetFormState();

    if (typeof markModuleComplete === 'function') markModuleComplete(patientId, 'module3');

    // Dispatch event for sidebar update
    window.dispatchEvent(new Event('module-data-saved'));
};
