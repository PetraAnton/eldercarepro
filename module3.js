// Module 3 Content - ADL/IADL Assessment (Vietnamese Version - Table Layout)

// ============================================
// STEP 1: Define Data Arrays FIRST
// ============================================

// ADL Items Data (10 activities with 3-level scoring: 10/5/0)
const adlActivities = [
    {
        id: 'eating',
        name: 'Ăn uống',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'transfer',
        name: 'Chuyển vị trí giường - ghế',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'hygiene',
        name: 'Vệ sinh cá nhân',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'toilet',
        name: 'Đi vệ sinh',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'bathing',
        name: 'Tắm rửa',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'mobility',
        name: 'Di chuyển trong nhà',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'dressing',
        name: 'Thay quần áo',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'bowel',
        name: 'Kiểm soát đại tiện',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'bladder',
        name: 'Kiểm soát tiểu tiện',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Hỗ trợ một phần (5)' },
            { value: 0, label: 'Phụ thuộc hoàn toàn (0)' }
        ]
    },
    {
        id: 'dining',
        name: 'Nhà ăn',
        levels: [
            { value: 10, label: 'Tự lập (10)' },
            { value: 5, label: 'Giám sát (5)' },
            { value: 0, label: 'Hỗ trợ (0)' }
        ]
    }
];

// IADL Items Data (2 activities with 4-level scoring)
const iadlActivities = [
    {
        id: 'cooking',
        name: 'Nấu ăn',
        levels: [
            { value: 'independent', label: 'Tự lập' },
            { value: 'supervised', label: 'Giám sát' },
            { value: 'assisted', label: 'Hỗ trợ' },
            { value: 'dependent', label: 'Phụ thuộc' }
        ]
    },
    {
        id: 'laundry',
        name: 'Giặt giũ',
        levels: [
            { value: 'independent', label: 'Tự lập' },
            { value: 'supervised', label: 'Giám sát' },
            { value: 'assisted', label: 'Hỗ trợ' },
            { value: 'dependent', label: 'Phụ thuộc' }
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

        return `
        <tr class="border-b border-emerald-50 hover:bg-emerald-50/30 transition-colors group">
            <td class="p-4 font-bold text-slate-700">${activity.name}</td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="adl-level-${activity.id}" value="10" 
                        onchange="updateADLScore()"
                        class="w-5 h-5 text-emerald-600 focus:ring-emerald-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="adl-level-${activity.id}" value="5" 
                        onchange="updateADLScore()"
                        class="w-5 h-5 text-blue-600 focus:ring-blue-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="adl-level-${activity.id}" value="0" 
                        onchange="updateADLScore()"
                        class="w-5 h-5 text-slate-600 focus:ring-slate-100">
                </label>
            </td>
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
                    <input type="radio" name="iadl-level-${activity.id}" value="independent" 
                        class="w-5 h-5 text-emerald-600 focus:ring-emerald-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="iadl-level-${activity.id}" value="supervised" 
                        class="w-5 h-5 text-blue-600 focus:ring-blue-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="iadl-level-${activity.id}" value="assisted" 
                        class="w-5 h-5 text-amber-600 focus:ring-amber-100">
                </label>
            </td>
            <td class="p-3 text-center">
                <label class="relative flex items-center justify-center cursor-pointer">
                    <input type="radio" name="iadl-level-${activity.id}" value="dependent" 
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
    <!-- Tab Navigation -->
    <div class="flex gap-2 mb-6 border-b-2 border-slate-200">
        <button onclick="switchModule3Tab('form')" id="tab-form" 
            class="px-6 py-3 font-black text-sm transition-all border-b-4 border-blue-600 text-blue-600">
            <i data-lucide="clipboard-list" class="w-4 h-4 inline mr-2"></i>
            Tạo đánh giá mới
        </button>
        <button onclick="switchModule3Tab('history')" id="tab-history"
            class="px-6 py-3 font-black text-sm transition-all border-b-4 border-transparent text-slate-500 hover:text-slate-700">
            <i data-lucide="history" class="w-4 h-4 inline mr-2"></i>
            Lịch sử đánh giá
        </button>
    </div>

    <!-- Tab Content: Form -->
    <div id="content-form" class="tab-content">
        <form id="module3-form" class="space-y-6">

            <!-- ADL Assessment Table -->
            <div class="glass-panel rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div class="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 tracking-wide uppercase">
                        <i data-lucide="user-check" class="w-5 h-5"></i>
                        ADL - Hoạt động Sinh hoạt Cơ bản
                    </h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-emerald-50/50 backdrop-blur-md">
                            <tr class="border-b border-emerald-100">
                                <th rowspan="2" class="p-4 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Hạng mục</th>
                                <th colspan="3" class="p-3 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Mức độ</th>
                                <th rowspan="2" class="p-4 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Tình trạng</th>
                                <th rowspan="2" class="p-4 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Môi trường<br/>(địa điểm thực hiện và dụng cụ hỗ trợ)</th>
                                <th rowspan="2" class="p-4 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest">Tình trạng - vấn đề<br/>sinh hoạt</th>
                            </tr>
                            <tr class="border-b border-emerald-100">
                                <th class="p-3 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest w-24">Tự lập<br/>(10)</th>
                                <th class="p-3 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest w-32">Hỗ trợ một phần (5)</th>
                                <th class="p-3 text-center font-black text-emerald-900 text-[10px] uppercase tracking-widest w-32">HT toàn phần (0)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50/50">
                            ${generateADLTableRows()}
                        </tbody>
                    </table>
                </div>
                <div class="bg-emerald-50/30 px-6 py-5 border-t border-emerald-100/50">
                    <div class="flex items-center justify-between">
                        <span class="font-black text-emerald-900 uppercase tracking-widest text-xs">Tổng điểm ADL:</span>
                        <div class="flex items-center gap-2">
                            <span id="adl-total-score" class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">0</span>
                            <span class="text-sm font-bold text-emerald-400">/ 100</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- IADL Assessment Table -->
            <div class="glass-panel rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div class="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 tracking-wide uppercase">
                        <i data-lucide="briefcase" class="w-5 h-5"></i>
                        IADL - Hoạt động Sinh hoạt Công cụ
                    </h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-violet-50/50 backdrop-blur-md border-b border-violet-100/50">
                            <tr>
                                <th class="p-4 text-left font-black text-violet-900 text-[10px] uppercase tracking-widest">Hạng mục</th>
                                <th class="p-3 text-center font-black text-violet-900 text-[10px] uppercase tracking-widest w-24">Tự lập</th>
                                <th class="p-3 text-center font-black text-violet-900 text-[10px] uppercase tracking-widest w-24">Giám sát</th>
                                <th class="p-3 text-center font-black text-violet-900 text-[10px] uppercase tracking-widest w-24">Hỗ trợ</th>
                                <th class="p-3 text-center font-black text-violet-900 text-[10px] uppercase tracking-widest w-24">Phụ thuộc</th>
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

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4 px-1">
                <button type="submit" id="module3-save-btn"
                    class="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-sm hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all">
                    <i data-lucide="save" class="w-4 h-4 inline mr-2 ring-offset-2"></i>
                    Lưu đánh giá
                </button>
                <button type="button" onclick="resetModule3Form()"
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
                        <i data-lucide="clipboard-list" class="w-16 h-16 mx-auto mb-4 opacity-50"></i>
                        <p class="font-semibold">Chọn một đánh giá để xem chi tiết</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// ============================================
// STEP 4: Define Calculation & UI Functions
// ============================================

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
}

function switchModule3Tab(tab) {
    // Update tab buttons
    var formTab = document.getElementById('tab-form');
    var historyTab = document.getElementById('tab-history');
    var formContent = document.getElementById('content-form');
    var historyContent = document.getElementById('content-history');

    if (tab === 'form') {
        formTab.className = 'px-6 py-3 font-black text-sm transition-all border-b-4 border-blue-600 text-blue-600';
        historyTab.className = 'px-6 py-3 font-black text-sm transition-all border-b-4 border-transparent text-slate-500 hover:text-slate-700';
        formContent.classList.remove('hidden');
        historyContent.classList.add('hidden');
    } else {
        formTab.className = 'px-6 py-3 font-black text-sm transition-all border-b-4 border-transparent text-slate-500 hover:text-slate-700';
        historyTab.className = 'px-6 py-3 font-black text-sm transition-all border-b-4 border-emerald-600 text-emerald-600';
        formContent.classList.add('hidden');
        historyContent.classList.remove('hidden');
        loadAssessmentHistory();
    }

    lucide.createIcons();
}

function loadAssessmentHistory() {
    var patientId = 'patient_001';
    var assessments = JSON.parse(localStorage.getItem('mirabocaresync_' + patientId + '_adl_assessments') || '[]');

    var listContainer = document.getElementById('assessment-list');
    if (!listContainer) return;

    if (assessments.length === 0) {
        listContainer.innerHTML = '<div class="text-center text-slate-400 py-8"><p class="text-sm font-semibold">Chưa có đánh giá nào</p></div>';
        return;
    }

    listContainer.innerHTML = assessments.map(function (assessment, index) {
        var date = new Date(assessment.timestamp);
        var dateStr = date.toLocaleDateString('vi-VN');
        var timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

        return `
        <div onclick="showAssessmentDetail(${index})" 
            class="p-4 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
            <div class="flex items-center justify-between mb-2">
                <span class="font-black text-slate-800 text-sm">Đánh giá #${assessments.length - index}</span>
                <span class="text-xs font-semibold text-emerald-600">${assessment.adlTotal}/100</span>
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
    var patientId = 'patient_001';
    var assessments = JSON.parse(localStorage.getItem('mirabocaresync_' + patientId + '_adl_assessments') || '[]');
    var assessment = assessments[index];

    if (!assessment) return;

    var detailContainer = document.getElementById('assessment-detail');
    if (!detailContainer) return;

    var date = new Date(assessment.timestamp);
    var dateStr = date.toLocaleDateString('vi-VN');
    var timeStr = date.toLocaleTimeString('vi-VN');

    var html = `
    <div class="space-y-6">
        <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 class="font-black text-blue-900 mb-2">Thông tin đánh giá</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
                <div><span class="font-semibold text-slate-600">Ngày đánh giá:</span> <span class="font-bold">${assessment.assessmentDate}</span></div>
                <div><span class="font-semibold text-slate-600">Nhân viên:</span> <span class="font-bold">${assessment.assessor || '---'}</span></div>
                <div><span class="font-semibold text-slate-600">Tổng điểm ADL:</span> <span class="font-bold text-emerald-600">${assessment.adlTotal}/100</span></div>
            </div>
        </div>
        
        <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h4 class="font-black text-emerald-900 mb-3">ADL - Hoạt động Sinh hoạt Cơ bản</h4>
            <div class="space-y-2">
                ${Object.keys(assessment.adl).map(function (key) {
        var activity = adlActivities.find(function (a) { return a.id === key; });
        if (!activity) return '';
        var data = assessment.adl[key];
        return `
                    <div class="bg-white rounded-lg p-3 border border-emerald-100">
                        <div class="font-bold text-slate-800 mb-1">${activity.name}</div>
                        <div class="text-sm text-slate-600">
                            <div><strong>Mức độ:</strong> ${data.level !== null ? data.level + ' điểm' : 'Chưa đánh giá'}</div>
                            ${data.hasProblem ? '<div class="text-red-600 font-semibold">⚠️ Có vấn đề</div>' : ''}
                            ${data.support ? '<div><strong>Hỗ trợ:</strong> ' + data.support + '</div>' : ''}
                            ${data.notes ? '<div><strong>Ghi chú:</strong> ' + data.notes + '</div>' : ''}
                        </div>
                    </div>
                    `;
    }).join('')}
            </div>
        </div>
        
        <div class="bg-violet-50 rounded-xl p-4 border border-violet-200">
            <h4 class="font-black text-violet-900 mb-3">IADL - Hoạt động Sinh hoạt Công cụ</h4>
            <div class="space-y-2">
                ${Object.keys(assessment.iadl).map(function (key) {
        var activity = iadlActivities.find(function (a) { return a.id === key; });
        if (!activity) return '';
        var data = assessment.iadl[key];
        var levelLabel = '';
        if (data.level) {
            var levelObj = activity.levels.find(function (l) { return l.value === data.level; });
            levelLabel = levelObj ? levelObj.label : data.level;
        }
        return `
                    <div class="bg-white rounded-lg p-3 border border-violet-100">
                        <div class="font-bold text-slate-800 mb-1">${activity.name}</div>
                        <div class="text-sm text-slate-600">
                            <div><strong>Mức độ:</strong> ${levelLabel || 'Chưa đánh giá'}</div>
                            ${data.hasProblem ? '<div class="text-red-600 font-semibold">⚠️ Có vấn đề</div>' : ''}
                            ${data.support ? '<div><strong>Hỗ trợ:</strong> ' + data.support + '</div>' : ''}
                            ${data.notes ? '<div><strong>Ghi chú:</strong> ' + data.notes + '</div>' : ''}
                        </div>
                    </div>
                    `;
    }).join('')}
            </div>
        </div>
        
        <div class="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <h4 class="font-black text-orange-900 mb-3">Vận Động Cơ Bản</h4>
            <div class="space-y-2">
                ${assessment.basicMovement ? Object.keys(assessment.basicMovement).map(function (key) {
        var activity = basicMovementActivities.find(function (a) { return a.id === key; });
        if (!activity) return '';
        var data = assessment.basicMovement[key];
        var levelLabel = '';
        if (data.level) {
            var levelObj = activity.levels.find(function (l) { return l.value === data.level; });
            levelLabel = levelObj ? levelObj.label : data.level;
        }
        return `
                    <div class="bg-white rounded-lg p-3 border border-orange-100">
                        <div class="font-bold text-slate-800 mb-1">${activity.name}</div>
                        <div class="text-sm text-slate-600">
                            <div><strong>Mức độ:</strong> ${levelLabel || 'Chưa đánh giá'}</div>
                            ${data.hasProblem ? '<div class="text-red-600 font-semibold">⚠️ Có vấn đề</div>' : ''}
                            ${data.support ? '<div><strong>Hỗ trợ:</strong> ' + data.support + '</div>' : ''}
                            ${data.notes ? '<div><strong>Ghi chú:</strong> ' + data.notes + '</div>' : ''}
                        </div>
                    </div>
                    `;
    }).join('') : '<p class="text-sm text-slate-500">Chưa có dữ liệu</p>'}
            </div>
        </div>
        
        ${assessment.generalNotes ? `
        <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-black text-amber-900 mb-2">Ghi chú chung</h4>
            <p class="text-sm text-slate-700 whitespace-pre-wrap">${assessment.generalNotes}</p>
        </div>
        ` : ''}
    </div>
    `;

    detailContainer.innerHTML = html;
}

// Global variable to store resetFormState function
let module3ResetFormState = null;

// Reset Form
function resetModule3Form() {
    if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu đã nhập?')) {
        document.getElementById('module3-form').reset();
        document.getElementById('adl-total-score').textContent = '0';

        // Reset form state (disable save button)
        if (typeof module3ResetFormState === 'function') {
            module3ResetFormState();
        }

        showToast('Đã xóa dữ liệu form', 'info');
    }
}

// ============================================
// STEP 5: Initialize Module
// ============================================
// Initialize Module 3
function initModule3() {
    const patientId = getCurrentPatientId();

    // Setup form change detection and store in global variable
    const resetFormState = setupFormChangeDetection('module3-form', 'module3-save-btn');
    module3ResetFormState = resetFormState; // Make accessible to resetForm()

    // 1. Load Patient Info from Module 1
    const facesheetData = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_facesheet`) || '{}');
    if (facesheetData.basic) {
        document.getElementById('patient-name-display').textContent = facesheetData.basic.fullName || '--';
        document.getElementById('patient-age-gender-display').textContent =
            `${facesheetData.basic.age || '--'} / ${facesheetData.basic.gender === 'male' ? 'Nam' : 'Nữ'}`;
        document.getElementById('patient-care-level-display').textContent = facesheetData.careInfo?.level || 'Chưa có phân loại';
    }

    // Form Submission
    var form = document.getElementById('module3-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect ADL data
            var adlData = {};
            var adlTotal = 0;
            adlActivities.forEach(function (activity) {
                var level = document.getElementById('adl-level-' + activity.id).value;
                var problem = document.getElementById('adl-problem-' + activity.id).checked;
                var support = document.getElementById('adl-support-' + activity.id).value;
                var notes = document.getElementById('adl-notes-' + activity.id).value;

                adlData[activity.id] = {
                    level: level ? parseInt(level) : null,
                    hasProblem: problem,
                    support: support,
                    notes: notes
                };

                if (level) {
                    adlTotal += parseInt(level);
                }
            });

            // Collect IADL data
            var iadlData = {};
            iadlActivities.forEach(function (activity) {
                var level = document.getElementById('iadl-level-' + activity.id).value;
                var problem = document.getElementById('iadl-problem-' + activity.id).checked;
                var support = document.getElementById('iadl-support-' + activity.id).value;
                var notes = document.getElementById('iadl-notes-' + activity.id).value;

                iadlData[activity.id] = {
                    level: level || null,
                    hasProblem: problem,
                    support: support,
                    notes: notes
                };
            });

            // Collect Basic Movement data
            var basicMovementData = {};
            basicMovementActivities.forEach(function (activity) {
                var level = document.getElementById('movement-level-' + activity.id).value;
                var problem = document.getElementById('movement-problem-' + activity.id).checked;
                var support = document.getElementById('movement-support-' + activity.id).value;
                var notes = document.getElementById('movement-notes-' + activity.id).value;

                basicMovementData[activity.id] = {
                    level: level || null,
                    hasProblem: problem,
                    support: support,
                    notes: notes
                };
            });

            var assessmentData = {
                assessmentDate: document.getElementById('assessmentDate').value,
                assessor: document.getElementById('assessorName').value, // Add assessor
                adl: adlData,
                adlTotal: adlTotal,
                iadl: iadlData,
                basicMovement: basicMovementData,
                generalNotes: document.getElementById('generalNotes').value,
                timestamp: new Date().toISOString()
            };

            // Save to LocalStorage
            var assessments = JSON.parse(localStorage.getItem('mirabocaresync_' + patientId + '_adl_assessments') || '[]');
            assessments.push(assessmentData);
            localStorage.setItem('mirabocaresync_' + patientId + '_adl_assessments', JSON.stringify(assessments));

            // Mark complete and show toast
            markModuleComplete(patientId, 'module3');
            showToast('Đã lưu đánh giá ADL/IADL thành công!', 'success');
            console.log('Saved assessment data:', assessmentData);

            // Reset form state
            if (typeof resetFormState === 'function') {
                resetFormState();
            }

            // Switch to history tab
            switchModule3Tab('history');
        });
    }

    // Initialize icons
    setTimeout(function () {
        lucide.createIcons();
    }, 100);
}
