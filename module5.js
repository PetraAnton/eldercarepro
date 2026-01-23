// Module 5: Care Plan & Rehabilitation Schedule
// Vietnamese Localized

window.module5Content = `
<div class="flex flex-col items-center justify-center h-[500px] text-center p-10 animate-fade-in">
    <div class="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
        <i data-lucide="cone" class="w-12 h-12 text-slate-400"></i>
    </div>
    <h2 class="text-2xl font-black text-slate-800 mb-2">Đang Xây Dựng</h2>
    <p class="text-slate-500 font-medium max-w-md">Chức năng Kế hoạch Phục hồi & Chăm sóc đang được phát triển. Vui lòng quay lại sau.</p>
</div>
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

    // Portal Actions Logic
    const actions = document.getElementById('module-actions');
    if (actions) {
        actions.innerHTML = '';
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
