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
    
    <form id="module3-form" class="space-y-6 pb-20">

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
            if (module3OriginalData) {
                loadModule3Data(module3OriginalData);
                toggleModule3EditMode(false);
                showToast('Đã hủy bỏ thay đổi', 'info');
            } else {
                // Clear form?
                document.getElementById('module3-form').reset();
                toggleModule3EditMode(false); // Go to view (empty)
            }
        }
    } else {
        toggleModule3EditMode(false);
    }
}


// Load Data into Form
function loadModule3Data(data) {
    if (!data) return;
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

    // Recalculate score
    updateADLScore();
}

// Cancel Edit
function cancelModule3Edit() {
    if (confirm('Hủy bỏ thay đổi? Dữ liệu sẽ quay về trạng thái cũ.')) {
        if (module3OriginalData) {
            loadModule3Data(module3OriginalData); // Revert data
            toggleModule3EditMode(false); // Switch to view mode
            showToast('Đã hủy bỏ thay đổi', 'info');
        } else {
            // If no data existed, clear form
            document.getElementById('module3-form').reset();
            updateADLScore();
            toggleModule3EditMode(true); // Stay in edit mode as "New"
        }
    }
}

// Global variable to store resetFormState function used above or below
// Note: We already defined module3ResetFormState at the top of this block in previous step, 
// so we don't redefine it here to avoid error. 
// But wait, the previous step added it at line ~515. The original one is at 706. 
// This replacement removes line 706, so we are safe.

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
// Initialize Module 3
function initModule3() {
    const patientId = getCurrentPatientId();

    // Load existing data
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
                    // Optionally save as new format immediately or wait for explicit save
                    // We just load it for now.
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
        const fabSave = document.getElementById('module3-fab-save');
        if (!fabSave) return;

        // Only toggle visibility if we are in Edit Mode
        const fabEdit = document.getElementById('module3-fab-edit');
        const isEditMode = fabEdit && fabEdit.classList.contains('hidden');

        if (isEditMode) {
            if (isDirty) {
                fabSave.classList.remove('hidden');
            } else {
                fabSave.classList.add('hidden');
            }
        } else {
            fabSave.classList.add('hidden');
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
    iadlActivities.forEach(function (activity) {
        var radio = document.querySelector('input[name="iadl-level-' + activity.id + '"]:checked');
        var level = radio ? radio.value : null;

        var checkbox = document.getElementById('iadl-status-' + activity.id);
        var problem = checkbox ? checkbox.checked : false;

        iadlData[activity.id] = {
            level: level,
            hasProblem: problem,
            support: null,
            notes: null
        };
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
