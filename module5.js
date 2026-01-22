// Module 5: Care Plan & Rehabilitation Schedule
// Vietnamese Localized

window.module5Content = `
<div class="animate-fade-in max-w-6xl mx-auto pb-20">
    <form id="module5-form" class="space-y-8">
        
        <!-- HEADER -->
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-black text-slate-800 tracking-tight">Kế hoạch Phục hồi & Chăm sóc</h2>
                <p class="text-slate-500 font-medium mt-1">Xây dựng mục tiêu và lịch trình tập luyện</p>
            </div>
            <div class="flex gap-3">
                <span class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wider">
                    <i data-lucide="calendar-days" class="w-4 h-4 inline-block mr-1 mb-0.5"></i>
                    Care Plan
                </span>
            </div>
        </div>

        <!-- SECTION 1: MỤC TIÊU PHỤC HỒI (GOALS) -->
        <div class="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div class="bg-indigo-50/50 backdrop-blur-sm px-8 py-6 border-b border-indigo-100/50 flex items-center gap-4">
                <div class="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm shadow-indigo-200">
                    <i data-lucide="target" class="w-6 h-6"></i>
                </div>
                <div>
                    <h3 class="font-bold text-indigo-900 text-xl">1. Mục tiêu Phục hồi</h3>
                    <p class="text-indigo-600/70 text-xs font-bold uppercase tracking-wider mt-0.5">Development Goals</p>
                </div>
            </div>
            
            <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Long Term Goal -->
                <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div class="flex justify-between items-center mb-4">
                        <label class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                             <span class="w-2 h-2 rounded-full bg-blue-500"></span> Mục tiêu Dài hạn (Lâu dài)
                        </label>
                        <select id="longTermPeriod" class="text-xs font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                            <option value="6m">6 Tháng</option>
                            <option value="1y">1 Năm</option>
                            <option value="2y">2 Năm</option>
                        </select>
                    </div>
                    <textarea id="longTermGoal" rows="4" 
                        class="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium resize-none shadow-sm"
                        placeholder="Ví dụ: Có thể tự đi lại trong nhà mà không cần gậy hỗ trợ..."></textarea>
                </div>

                <!-- Short Term Goal -->
                <div class="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div class="flex justify-between items-center mb-4">
                        <label class="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Mục tiêu Ngắn hạn (Trước mắt)
                        </label>
                        <select id="shortTermPeriod" class="text-xs font-bold bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all">
                            <option value="1m">1 Tháng</option>
                            <option value="3m">3 Tháng</option>
                            <option value="6m">6 Tháng</option>
                        </select>
                    </div>
                    <textarea id="shortTermGoal" rows="4" 
                        class="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm font-medium resize-none shadow-sm"
                        placeholder="Ví dụ: Cải thiện thăng bằng đứng, tăng sức mạnh cơ chân..."></textarea>
                </div>
            </div>
        </div>

        <!-- SECTION 2: CHƯƠNG TRÌNH HỖ TRỢ (SERVICE CONTENT) -->
        <div class="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div class="bg-orange-50/50 backdrop-blur-sm px-8 py-6 border-b border-orange-100/50 flex items-center gap-4">
                <div class="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm shadow-orange-200">
                    <i data-lucide="layers" class="w-6 h-6"></i>
                </div>
                <div>
                    <h3 class="font-bold text-orange-900 text-xl">2. Nội dung Hỗ trợ & Phục hồi</h3>
                    <p class="text-orange-600/70 text-xs font-bold uppercase tracking-wider mt-0.5">Service Content</p>
                </div>
            </div>
            
            <div class="p-8 space-y-6">
                <!-- Preset Services Checklist -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${renderServiceCheckbox('srv_rom', 'Tập vận động khớp (ROM)', 'zap')}
                    ${renderServiceCheckbox('srv_muscle', 'Tăng cường cơ bắp (Muscle)', 'dumbbell')}
                    ${renderServiceCheckbox('srv_balance', 'Tập thăng bằng (Balance)', 'activity')}
                    ${renderServiceCheckbox('srv_walk', 'Tập đi bộ (Gait Training)', 'footprints')}
                    ${renderServiceCheckbox('srv_adls', 'Huấn luyện ADLs (Sinh hoạt)', 'coffee')}
                    ${renderServiceCheckbox('srv_pain', 'Vật lý trị liệu giảm đau', 'thermometer-sun')}
                </div>

                <!-- Custom Note -->
                <div>
                    <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Ghi chú chi tiết / Chương trình khác</label>
                    <textarea id="serviceNote" rows="3" 
                        class="w-full bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm font-medium resize-none focus:bg-white"
                        placeholder="Mô tả kỹ thuật cụ thể hoặc lưu ý đặc biệt..."></textarea>
                </div>
            </div>
        </div>

        <!-- SECTION 3: LỊCH TRÌNH HÀNG TUẦN (WEEKLY SCHEDULE) -->
        <div class="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div class="bg-blue-50/50 backdrop-blur-sm px-8 py-6 border-b border-blue-100/50 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shadow-blue-200">
                        <i data-lucide="calendar-clock" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-blue-900 text-xl">3. Lịch trình Hàng tuần</h3>
                        <p class="text-blue-600/70 text-xs font-bold uppercase tracking-wider mt-0.5">Weekly Schedule</p>
                    </div>
                </div>
                <button type="button" onclick="clearWeeklySchedule()" class="text-xs font-bold text-rose-500 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors">
                    Reset Lịch
                </button>
            </div>
            
            <div class="p-8 overflow-x-auto">
                <table class="w-full min-w-[800px] border-collapse">
                    <thead>
                        <tr class="text-center">
                            <th class="p-3 w-28"></th>
                            ${renderDayHeader('Thứ 2', 'Mon')}
                            ${renderDayHeader('Thứ 3', 'Tue')}
                            ${renderDayHeader('Thứ 4', 'Wed')}
                            ${renderDayHeader('Thứ 5', 'Thu')}
                            ${renderDayHeader('Thứ 6', 'Fri')}
                            ${renderDayHeader('Thứ 7', 'Sat')}
                            ${renderDayHeader('Chủ nhật', 'Sun')}
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${renderScheduleRow('morning', 'Sáng', 'sun')}
                        ${renderScheduleRow('afternoon', 'Chiều', 'sunset')}
                    </tbody>
                </table>
            </div>
        </div>

    </form>
</div>

<!-- FAB Container -->
<div id="module5-fab-container" class="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-4 pointer-events-none"></div>
`;

// Helper: Render Service Checkbox
function renderServiceCheckbox(id, label, icon) {
    return `
    <label class="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition-all group/item">
        <div class="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover/item:text-orange-500 group-hover/item:shadow-sm border border-slate-100 transition-colors">
            <i data-lucide="${icon}" class="w-5 h-5"></i>
        </div>
        <div class="flex-1">
            <span class="text-sm font-bold text-slate-700 block">${label}</span>
        </div>
        <input type="checkbox" name="serviceContent" value="${id}" class="w-5 h-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500 transition-all">
    </label>
    `;
}

// Helper: Render Day Header
function renderDayHeader(vi, en) {
    return `
    <th class="p-2 pb-6">
        <div class="flex flex-col items-center">
            <span class="text-sm font-black text-slate-700">${vi}</span>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${en}</span>
        </div>
    </th>
    `;
}

// Helper: Render Schedule Row
function renderScheduleRow(periodId, periodName, icon) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const cells = days.map(day => `
        <td class="p-2">
            <label class="block cursor-pointer group">
                <input type="checkbox" class="peer hidden" name="schedule_${day}_${periodId}" value="true">
                <div class="h-16 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:shadow-lg peer-checked:shadow-blue-500/30">
                    <i data-lucide="check" class="w-6 h-6 text-white scale-0 peer-checked:scale-100 transition-transform duration-300"></i>
                </div>
            </label>
        </td>
    `).join('');

    return `
    <tr>
        <td class="py-6 px-4">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <i data-lucide="${icon}" class="w-5 h-5"></i>
                </div>
                <span class="font-bold text-slate-700 text-sm">${periodName}</span>
            </div>
        </td>
        ${cells}
    </tr>
    `;
}

// --- Logic ---

function clearWeeklySchedule() {
    if (confirm('Xóa toàn bộ lịch trình tuần?')) {
        document.querySelectorAll('input[name^="schedule_"]').forEach(cb => cb.checked = false);
    }
}

// Init Function
function initModule5() {
    const patientId = getCurrentPatientId();

    // Create FAB Manager
    window.module5FAB = createFABManager({
        moduleId: 'module5',
        formId: 'module5-form',
        enableEdit: true,
        hasExistingData: () => {
            const data = localStorage.getItem(getModule5Key(patientId));
            return !!data;
        },
        loadOriginalData: () => {
            const data = localStorage.getItem(getModule5Key(patientId));
            if (data) {
                const parsed = JSON.parse(data);
                loadModule5Data(parsed);
                return parsed;
            }
            return null;
        },
        onSave: () => saveModule5Data(),
        onReset: () => {
            console.log('Module 5 reset');
        }
    });

    window.module5FAB.init();

    // Load Data
    const savedData = localStorage.getItem(getModule5Key(patientId));
    if (savedData) {
        try {
            loadModule5Data(JSON.parse(savedData));
        } catch (e) {
            console.error('Error parsing module 5 data', e);
        }
    }

    lucide.createIcons();
}

function getModule5Key(patientId) {
    return `mirabocaresync_${patientId}_plan`;
}

function loadModule5Data(data) {
    if (!data) return;

    // Goals
    if (data.goals) {
        setVal('longTermGoal', data.goals.longTerm);
        setVal('longTermPeriod', data.goals.longTermPeriod);
        setVal('shortTermGoal', data.goals.shortTerm);
        setVal('shortTermPeriod', data.goals.shortTermPeriod);
    }

    // Services
    if (data.services) {
        setVal('serviceNote', data.services.note);
        if (data.services.list) {
            data.services.list.forEach(val => {
                const cb = document.querySelector(`input[name="serviceContent"][value="${val}"]`);
                if (cb) cb.checked = true;
            });
        }
    }

    // Schedule
    if (data.schedule) {
        Object.entries(data.schedule).forEach(([key, val]) => {
            const cb = document.querySelector(`input[name="${key}"]`);
            if (cb) cb.checked = val;
        });
    }
}

function saveModule5Data() {
    try {
        const patientId = getCurrentPatientId();
        if (!patientId) {
            showToast('Chưa chọn bệnh nhân', 'error');
            return false;
        }

        const formData = {
            goals: {
                longTerm: getVal('longTermGoal'),
                longTermPeriod: getVal('longTermPeriod'),
                shortTerm: getVal('shortTermGoal'),
                shortTermPeriod: getVal('shortTermPeriod'),
            },
            services: {
                list: Array.from(document.querySelectorAll('input[name="serviceContent"]:checked')).map(cb => cb.value),
                note: getVal('serviceNote')
            },
            schedule: {},
            lastUpdated: new Date().toISOString()
        };

        // Collect Schedule
        document.querySelectorAll('input[name^="schedule_"]').forEach(cb => {
            if (cb.checked) {
                formData.schedule[cb.name] = true;
            }
        });

        localStorage.setItem(getModule5Key(patientId), JSON.stringify(formData));

        if (typeof markModuleComplete === 'function') {
            markModuleComplete(patientId, 'module5');
        }

        showToast('Đã lưu Kế hoạch!', 'success');
        return true;

    } catch (e) {
        console.error(e);
        showToast('Lỗi khi lưu: ' + e.message, 'error');
        return false;
    }
}

// Helpers
function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
}
