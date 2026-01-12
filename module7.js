/**
 * Module 7: Motor Function Assessment (Chức năng vận động)
 * Structure: 3 Tabs (Create Record, History, Trend Report)
 */

// Global state
let m7ActiveTab = 'create'; // 'create', 'history', 'report'
let m7ChartHistory = null;
let m7ChartBenchmark = null;
let m7EditingRecordId = null; // If editing a specific past record

function renderModule7(container) {
    console.log('[Module7] renderModule7 triggered');
    const patientId = getCurrentPatientId();
    console.log('[Module7] Patient ID:', patientId);
    if (!patientId) {
        container.innerHTML = '<div class="p-8 text-center text-slate-500">Vui lòng chọn bệnh nhân.</div>';
        return;
    }

    // Load Data (Array of records)
    const records = loadM7Records(patientId);

    // Initial Layout Scaffolding
    container.innerHTML = `
        <div class="max-w-6xl mx-auto pb-12 animate-fade-in relative">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <div>
                    <h2 class="text-2xl font-black text-blue-900">Chức năng vận động</h2>
                    <p class="text-slate-500 text-sm">Đánh giá sức cơ, độ nhanh nhẹn và ổn định</p>
                </div>
                 <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold font-mono">ID: ${patientId}</span>
            </div>

            <!-- Tab Navigation -->
            <div class="flex gap-2 mb-8 bg-slate-100/50 p-1.5 rounded-2xl w-fit">
                <button onclick="switchM7Tab('create')" id="tab-m7-create" class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${m7ActiveTab === 'create' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}">
                    <i data-lucide="plus-circle" class="w-4 h-4 inline mr-2"></i>Tạo bản ghi
                </button>
                 <button onclick="switchM7Tab('history')" id="tab-m7-history" class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${m7ActiveTab === 'history' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}">
                    <i data-lucide="history" class="w-4 h-4 inline mr-2"></i>Lịch sử đo
                </button>
                <button onclick="switchM7Tab('report')" id="tab-m7-report" class="px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${m7ActiveTab === 'report' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}">
                    <i data-lucide="bar-chart-2" class="w-4 h-4 inline mr-2"></i>Báo cáo xu hướng
                </button>
            </div>

            <!-- Content Area -->
            <div id="m7-tab-content">
                <!-- Content injected by switchM7Tab -->
            </div>
        </div>
        <!-- Dedicated FAB Container (Outside Animation) -->
        <div id="m7-fab-container"></div>
    `;

    // Render Initial Active Tab
    switchM7Tab(m7ActiveTab, false); // false to skip re-rendering container
}

function switchM7Tab(tabName, reRenderContainer = true) {
    m7ActiveTab = tabName;
    const patientId = getCurrentPatientId();
    const records = loadM7Records(patientId);

    // Update Tab UI
    if (document.getElementById('tab-m7-create')) {
        ['create', 'history', 'report'].forEach(t => {
            const btn = document.getElementById(`tab-m7-${t}`);
            if (t === tabName) {
                btn.className = 'px-6 py-2.5 rounded-xl text-sm font-bold transition-all bg-white shadow-sm text-blue-700';
            } else {
                btn.className = 'px-6 py-2.5 rounded-xl text-sm font-bold transition-all text-slate-500 hover:text-slate-700';
            }
        });
    }

    const contentDiv = document.getElementById('m7-tab-content');
    const fabContainer = document.getElementById('m7-fab-container');
    if (!contentDiv) return;

    contentDiv.innerHTML = '';
    if (fabContainer) fabContainer.innerHTML = ''; // Clear FABs

    // Cleanup Charts
    if (m7ChartHistory) { m7ChartHistory.destroy(); m7ChartHistory = null; }
    if (m7ChartBenchmark) { m7ChartBenchmark.destroy(); m7ChartBenchmark = null; }

    lucide.createIcons();

    if (tabName === 'create') {
        contentDiv.innerHTML = renderM7CreateTab();
        // Inject Create FABs
        if (fabContainer) {
            fabContainer.innerHTML = `
                <div id="m7-fab-buttons" class="fixed bottom-48 right-8 flex flex-col-reverse items-end gap-5 z-40 animate-fade-in pointer-events-none hidden">
                    <!-- SAVE (Submit) -->
                    <button type="button" id="module7-fab-save" onclick="document.getElementById('m7-create-form').requestSubmit()" 
                        class="pointer-events-auto hidden w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                        <i data-lucide="save" class="w-7 h-7"></i>
                        <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                            Lưu kết quả
                        </span>
                    </button>

                    <!-- CANCEL (Reset) -->
                    <button type="button" id="module7-fab-cancel" onclick="resetModule7Form()" 
                        class="pointer-events-auto hidden w-12 h-12 bg-white text-rose-500 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-rose-100 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative border border-rose-50 ring-2 ring-white">
                        <i data-lucide="rotate-ccw" class="w-6 h-6"></i>
                        <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                            Nhập lại
                        </span>
                    </button>
                </div>`;

            // Init Logic for dynamic content
            setTimeout(initModule7FabLogic, 50);
        }
    } else if (tabName === 'history') {
        contentDiv.innerHTML = renderM7HistoryTab(records);
    } else if (tabName === 'report') {
        // Find latest record for the "Score Card" view
        const latestRecord = records.length > 0 ? records[records.length - 1] : null;
        contentDiv.innerHTML = renderM7ReportTab(latestRecord, records);
        if (latestRecord) {
            setTimeout(() => renderM7Charts(records), 100); // Delay for DOM
        }
    }
    lucide.createIcons();
}

// --- Data Logic (Multiple Records) ---
function loadM7Records(patientId) {
    const key = `mirabo_m7_records_${patientId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
}

function saveM7Record(record, patientId) {
    const records = loadM7Records(patientId);
    records.push(record);
    // Sort logic? (Optional)
    localStorage.setItem(`mirabo_m7_records_${patientId}`, JSON.stringify(records));
}

function deleteM7Record(index) {
    if (!confirm('Bạn có chắc muốn xóa bản ghi này?')) return;
    const patientId = getCurrentPatientId();
    const records = loadM7Records(patientId);
    records.splice(index, 1);
    localStorage.setItem(`mirabo_m7_records_${patientId}`, JSON.stringify(records));
    switchM7Tab('history'); // Refresh
    showToast('Đã xóa bản ghi', 'info');
}

// --- TAB 1: CREATE FORM ---
function renderM7CreateTab() {
    const today = new Date().toISOString().split('T')[0];
    return `
        <div class="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden animate-fade-in-up">
            <div class="p-8 border-b border-slate-100 bg-blue-50/30">
                <h3 class="font-black text-slate-800 text-lg flex items-center gap-2">
                    <i data-lucide="plus-circle" class="w-5 h-5 text-blue-600"></i> Nhập liệu kết quả đo mới
                </h3>
                <p class="text-sm text-slate-500 mt-1">Nhập các chỉ số đo được từ thiết bị hoặc bài kiểm tra thực tế.</p>
            </div>
            
            <form id="m7-create-form" class="p-8 space-y-8" onsubmit="handleM7CreateSubmit(event)">
                <!-- Basic Info -->
                <div class="grid grid-cols-3 gap-6">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Ngày đo</label>
                        <input type="date" id="m7-date" value="${today}" required class="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>
                    <div class="relative">
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Cân nặng</label>
                         <div class="relative">
                            <input type="number" id="m7-weight" placeholder="VD: 60" required step="0.1" class="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-blue-500 outline-none">
                             <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">kg</span>
                        </div>
                    </div>
                    <div class="relative">
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Chiều cao</label>
                        <div class="relative">
                            <input type="number" id="m7-height" placeholder="VD: 165" required step="0.1" class="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-blue-500 outline-none">
                            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">cm</span>
                        </div>
                    </div>
                </div>

                <div class="border-t border-slate-100 my-4"></div>

                <!-- 1. Lực cơ -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <div class="md:col-span-4">
                         <label class="block text-sm font-bold text-slate-700 mb-1">Lực cơ (Muscle)</label>
                         <p class="text-xs text-slate-400">Tải trọng tối đa / Cân nặng (F/w)</p>
                    </div>
                    <div class="md:col-span-8 grid grid-cols-2 gap-4">
                        <div class="relative">
                            <input type="number" step="0.01" id="m7-val-muscle" placeholder="0.00"
                                class="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">kgf/kg</span>
                        </div>
                        <div class="px-4 py-3 bg-slate-100 rounded-xl text-slate-400 font-bold text-center text-sm flex items-center justify-center">Target: 1.46</div>
                    </div>
                </div>

                <!-- 2. Nhanh nhẹn -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <div class="md:col-span-4">
                         <label class="block text-sm font-bold text-slate-700 mb-1">Độ nhanh nhẹn (Agility)</label>
                         <p class="text-xs text-slate-400">Tốc độ phát lực (RFD/w)</p>
                    </div>
                    <div class="md:col-span-8 grid grid-cols-2 gap-4">
                        <div class="relative">
                            <input type="number" step="0.1" id="m7-val-agility" placeholder="0.0"
                                class="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">kgf/s/kg</span>
                        </div>
                        <div class="px-4 py-3 bg-slate-100 rounded-xl text-slate-400 font-bold text-center text-sm flex items-center justify-center">Target: 12.7</div>
                    </div>
                </div>

                <!-- 3. Ổn định -->
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <div class="md:col-span-4">
                         <label class="block text-sm font-bold text-slate-700 mb-1">Độ ổn định (Stability)</label>
                         <p class="text-xs text-slate-400">Thời gian ổn định / Rung lắc</p>
                    </div>
                    <div class="md:col-span-8 grid grid-cols-2 gap-4">
                        <div class="relative">
                            <input type="number" step="0.1" id="m7-val-stability" placeholder="0.0"
                                class="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                             <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">ms</span>
                        </div>
                         <div class="px-4 py-3 bg-slate-100 rounded-xl text-slate-400 font-bold text-center text-sm flex items-center justify-center">Target: 61.7</div>
                    </div>
                </div>

        </div>

        </div>
    `;
}

function resetModule7Form() {
    if (confirm('Bạn có chắc chắn muốn xóa dữ liệu nhập không?')) {
        document.getElementById('m7-create-form').reset();
        // Reset default date to today if needed, or leave blank?
        // Let's reset date to today
        document.getElementById('m7-date').value = new Date().toISOString().split('T')[0];
    }
}

function handleM7CreateSubmit(e) {
    e.preventDefault();

    // 1. Gather Data
    const record = {
        id: Date.now().toString(),
        date: document.getElementById('m7-date').value,
        weight: parseFloat(document.getElementById('m7-weight').value) || 0,
        height: parseFloat(document.getElementById('m7-height').value) || 0,
        muscle: parseFloat(document.getElementById('m7-val-muscle').value) || 0,
        agility: parseFloat(document.getElementById('m7-val-agility').value) || 0,
        stability: parseFloat(document.getElementById('m7-val-stability').value) || 0,
        comment: '',
        advice: ''
    };

    // 2. Mock Tiered Score Calculation (Approximating J-Frailty / Image thresholds)

    // Muscle (kgf/kg)
    // < 1.24 (Low: 25pts), 1.24-1.46 (Med: 40pts), > 1.46 (High: 50pts)
    let s1 = 0;
    if (record.muscle < 1.24) s1 = 25;
    else if (record.muscle < 1.46) s1 = 40;
    else s1 = 50;

    // Agility (kgf/s/kg)
    // < 8.5 (Low: 15pts), 8.5-12.7 (Med: 35pts), > 12.7 (High: 50pts)
    // Or closer to linear? 3.9 -> 15 (match image)
    // Formula: (Val / 12.7) * 50? (3.9/12.7)*50 ~= 15. Correct.
    let s2 = Math.min(50, Math.round((record.agility / 12.7) * 50));

    // Stability (ms)
    // Image: 45 -> 8 pts (Low). Range 49.5 - 61.7.
    // This implies Step function or steep penalty below 49.5.
    let s3 = 0;
    if (record.stability < 49.5) s3 = 8;
    else if (record.stability < 61.7) s3 = 30; // Mock mid
    else s3 = 50;

    // Total
    record.totalScore = s1 + s2 + s3;

    // Rating Logic
    if (record.totalScore < 50) record.rating = 'Thấp';
    else if (record.totalScore < 100) record.rating = 'Trung bình';
    else record.rating = 'Cao';

    // 3. Save
    const patientId = getCurrentPatientId();
    saveM7Record(record, patientId);

    // Mark complete
    if (typeof markModuleComplete === 'function') markModuleComplete(patientId, 'module7');

    // Dispatch event for sidebar update
    window.dispatchEvent(new Event('module-data-saved'));

    showToast('Đã tạo bản ghi mới thành công', 'success');

    // 4. Redirect to Report
    switchM7Tab('report');
}

// --- TAB 2: HISTORY ---
function renderM7HistoryTab(records) {
    if (!records || records.length === 0) {
        return `
            <div class="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <i data-lucide="folder-open" class="w-12 h-12 text-slate-300 mb-4"></i>
                <p class="text-slate-500 font-medium">Chưa có lịch sử đo nào.</p>
            </div>
        `;
    }

    return `
        <div class="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <table class="w-full text-left border-collapse">
                <thead class="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th class="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Ngày đo</th>
                        <th class="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Tổng điểm (150)</th>
                         <th class="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Lực cơ</th>
                        <th class="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Nhanh nhẹn</th>
                         <th class="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Ổn định</th>
                        <th class="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider text-right">Hành động</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                    ${records.map((r, index) => `
                        <tr class="hover:bg-slate-50/50 transition-colors">
                            <td class="px-6 py-4 font-bold text-slate-700">${new Date(r.date).toLocaleDateString('vi-VN')}</td>
                            <td class="px-6 py-4 font-black text-blue-600 text-lg">
                                ${r.totalScore}
                                <span class="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 ml-2 font-normal">${r.rating}</span>
                            </td>
                            <td class="px-6 py-4 text-sm text-slate-600 font-mono font-bold">${r.muscle} <span class="text-[10px] text-slate-400 font-normal">kgf/kg</span></td>
                             <td class="px-6 py-4 text-sm text-slate-600 font-mono font-bold">${r.agility} <span class="text-[10px] text-slate-400 font-normal">kgf/s/kg</span></td>
                            <td class="px-6 py-4 text-sm text-slate-600 font-mono font-bold">${r.stability} <span class="text-[10px] text-slate-400 font-normal">ms</span></td>
                            <td class="px-6 py-4 text-right flex justify-end gap-2">
                                <button onclick="printModule7Assessment(${index})" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="In phiếu">
                                    <i data-lucide="printer" class="w-4 h-4"></i>
                                </button>
                                <button onclick="deleteM7Record(${index})" class="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Xóa">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// --- TAB 3: REPORT ---
function renderM7ReportTab(data, records) {
    if (!data) {
        return `
             <div class="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <i data-lucide="bar-chart-2" class="w-12 h-12 text-slate-300 mb-4"></i>
                <h3 class="font-bold text-slate-600 mb-2">Chưa có dữ liệu báo cáo</h3>
                <p class="text-slate-400 text-sm mb-6">Vui lòng tạo bản ghi đầu tiên để xem báo cáo.</p>
                <button onclick="switchM7Tab('create')" class="px-6 py-2 bg-blue-100 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-200">Tạo bản ghi ngay</button>
            </div>
        `;
    }

    // Prepare Metrics View Data (Use Units from Image)
    const metrics = [
        { name: 'Lực cơ', subLabel: 'Tải trọng tối đa / Cân nặng', value: data.muscle, target: 1.46, unit: 'kgf/kg', color: 'bg-blue-600' },
        { name: 'Độ nhanh nhẹn', subLabel: 'Tốc độ phát lực', value: data.agility, target: 12.7, unit: 'kgf/s/kg', color: 'bg-indigo-600' },
        { name: 'Độ ổn định', subLabel: 'Thời gian ổn định', value: data.stability, target: 61.7, unit: 'ms', color: 'bg-emerald-600' }
    ];

    return `
        <div class="animate-fade-in space-y-8">
            <!-- Header Stats & Score (Full Width) -->
            <div class="bg-gradient-to-br from-orange-50 to-white rounded-[32px] p-8 border border-orange-100 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-2">
                        <h3 class="text-orange-900 font-bold uppercase tracking-wider text-sm">Điểm tổng hợp (Mới nhất)</h3>
                        <span class="text-xs font-bold text-slate-400 bg-white/50 px-2 py-0.5 rounded border border-orange-100">${new Date(data.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div class="flex items-baseline gap-4">
                        <span class="text-7xl font-black text-slate-800 tracking-tighter">${data.totalScore}</span>
                        <div class="flex flex-col">
                            <span class="text-xl font-bold text-slate-400">/ 150</span>
                            <span class="inline-block px-3 py-1 bg-white rounded-lg shadow-sm border border-orange-100 text-orange-600 font-black text-xs text-center">${data.rating}</span>
                        </div>
                    </div>
                     <p class="mt-4 text-xs text-slate-500 font-medium italic">
                        * Điểm số được tính toán giả lập dựa trên thang đo J-Frailty Scale (Tham khảo).
                     </p>
                </div>
                <!-- Decorative Icon -->
                <div class="hidden md:block opacity-10">
                    <i data-lucide="activity" class="w-32 h-32 text-orange-600"></i>
                </div>
            </div>

            <!-- Charts Container (Stacked) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- History Chart -->
                <div class="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <i data-lucide="trending-up" class="w-5 h-5"></i>
                        </div>
                        <h4 class="font-bold text-slate-700">Tiến độ theo thời gian</h4>
                    </div>
                    <div class="h-64 w-full relative"> 
                        <canvas id="m7-history-chart"></canvas>
                    </div>
                </div>

                <!-- Benchmark Chart -->
                <div class="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <i data-lucide="users" class="w-5 h-5"></i>
                        </div>
                        <h4 class="font-bold text-slate-700">So sánh với độ tuổi</h4>
                    </div>
                    <div class="h-64 w-full relative">
                        <canvas id="m7-benchmark-chart"></canvas>
                    </div>
                </div>
            </div>

            <!-- Detailed Metrics Bars -->
             <div class="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mb-8">
                <div class="p-6 border-b border-slate-50 bg-slate-50/50">
                    <h3 class="font-black text-slate-800 text-lg">Chi tiết chỉ số (Bản ghi mới nhất)</h3>
                </div>
                <div class="divide-y divide-slate-50">
                    ${metrics.map(m => `
                        <div class="p-6 hover:bg-slate-50/50 transition-colors">
                            <div class="flex flex-col md:flex-row gap-6 md:items-center">
                                <div class="w-full md:w-1/4">
                                    <h4 class="font-bold text-slate-800 text-sm lg:text-base">${m.name}</h4>
                                    <p class="text-xs text-slate-400 mt-1 font-medium">${m.subLabel}</p>
                                </div>
                                <div class="flex-1">
                                    <div class="h-3 bg-slate-100 rounded-full overflow-hidden relative">
                                        <div class="absolute top-0 bottom-0 w-1 bg-slate-300 z-10" style="left: ${(m.target / (m.target * 1.5)) * 100}%"></div>
                                        <div class="h-full ${m.color} rounded-full transition-all duration-1000" style="width: ${Math.min((m.value / (m.target * 1.5)) * 100, 100)}%"></div>
                                    </div>
                                    <div class="flex justify-between mt-2 text-xs font-bold text-slate-400">
                                        <span>0</span>
                                        <span class="text-slate-800 text-sm">${m.value} ${m.unit}</span>
                                        <span>Target: ${m.target}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Professional Evaluation Input (Stacked) -->
            <div class="flex flex-col gap-6 pb-8">
                 <div class="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm w-full">
                    <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <i data-lucide="message-square" class="w-5 h-5 text-blue-500"></i> Nhận xét chuyên môn
                    </h3>
                    <textarea id="m7-eval-comment" rows="4" class="w-full p-4 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none resize-none" placeholder="Nhập nhận xét chi tiết về kết quả đo...">${data.comment || ''}</textarea>
                    <div class="mt-4 text-right">
                        <button onclick="saveM7Evaluation('${data.id}')" class="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800">Lưu nhận xét</button>
                    </div>
                 </div>
                 <div class="bg-blue-50/50 p-6 rounded-[32px] border border-blue-100/50 w-full">
                    <h3 class="font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <i data-lucide="lightbulb" class="w-5 h-5 text-blue-600"></i> Lời khuyên / Bài tập
                    </h3>
                    <textarea id="m7-eval-advice" rows="4" class="w-full p-4 rounded-xl border border-blue-200 bg-white text-sm font-medium focus:ring-2 focus:ring-blue-200 outline-none resize-none text-blue-800" placeholder="Đề xuất các bài tập cải thiện...">${data.advice || ''}</textarea>
                     <div class="mt-4 text-right">
                        <button onclick="saveM7Evaluation('${data.id}')" class="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Lưu lời khuyên</button>
                    </div>
                 </div>
            </div>

            <!-- Export/Print Button Group -->
            <div class="fixed bottom-48 right-8 z-40 animate-fade-in flex flex-col gap-4 pointer-events-none">
                 <button type="button" onclick="printModule7Report()" 
                    class="pointer-events-auto w-14 h-14 bg-blue-600 text-white rounded-full shadow-[0_8px_25px_rgb(37,99,235,0.4)] hover:shadow-blue-200 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                    <i data-lucide="printer" class="w-6 h-6"></i>
                    <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                        In Báo cáo (PDF)
                    </span>
                </button>

                 <button type="button" onclick="exportM7Excel('${getCurrentPatientId()}')" 
                    class="pointer-events-auto w-14 h-14 bg-emerald-500 text-white rounded-full shadow-[0_8px_25px_rgb(16,185,129,0.4)] hover:shadow-emerald-200 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                    <i data-lucide="sheet" class="w-6 h-6"></i>
                    <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                        Xuất Excel
                    </span>
                </button>
            </div>
        </div>
    `;
}

function saveM7Evaluation(recordId) {
    const patientId = getCurrentPatientId();
    const records = loadM7Records(patientId);
    const record = records.find(r => r.id === recordId);
    if (record) {
        record.comment = document.getElementById('m7-eval-comment').value;
        record.advice = document.getElementById('m7-eval-advice').value;
        localStorage.setItem(`mirabo_m7_records_${patientId}`, JSON.stringify(records));
        showToast('Đã lưu đánh giá chuyên môn', 'success');
    }
}

function renderM7Charts(records) {
    if (!records || records.length === 0) return;

    // 1. History Chart
    const ctxHistory = document.getElementById('m7-history-chart');
    if (ctxHistory) {
        if (m7ChartHistory) m7ChartHistory.destroy();

        const labels = records.map(r => new Date(r.date).toLocaleDateString('vi-VN'));
        const scores = records.map(r => r.totalScore);

        m7ChartHistory = new Chart(ctxHistory, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Điểm tổng hợp',
                    data: scores,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#2563eb',
                    pointBorderWidth: 4,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 150, grid: { display: true, borderDash: [4, 4] } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // 2. Benchmark Chart (Compare Latest vs Age Groups)
    const ctxBenchmark = document.getElementById('m7-benchmark-chart');
    if (ctxBenchmark) {
        const latest = records[records.length - 1];
        if (m7ChartBenchmark) m7ChartBenchmark.destroy();

        m7ChartBenchmark = new Chart(ctxBenchmark, {
            type: 'bar',
            data: {
                labels: ['Tuổi 20', 'Tuổi 50', 'Tuổi 80', 'Bạn'],
                datasets: [{
                    label: 'Điểm trung bình',
                    data: [96, 71, 48, latest.totalScore], // Mock averages
                    backgroundColor: ['#e2e8f0', '#e2e8f0', '#e2e8f0', '#f59e0b'],
                    borderRadius: 8,
                    barThickness: 30
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false } },
                    y: { grid: { display: false }, beginAtZero: true, max: 150 }
                }
            }
        });
    }
}

// Export logic updated for Array structure
function exportM7Excel(patientId) {
    if (typeof XLSX === 'undefined') {
        showToast('Thư viện Excel chưa được tải.', 'error');
        return;
    }
    const records = loadM7Records(patientId);
    if (records.length === 0) {
        showToast('Không có dữ liệu để xuất.', 'warning');
        return;
    }

    // Flatten all records
    let flatData = [['BÁO CÁO LỊCH SỬ ĐÁNH GIÁ CHỨC NĂNG VẬN ĐỘNG', '']];
    flatData.push(['Mã Bệnh nhân:', patientId]);
    flatData.push(['Ngày xuất:', new Date().toLocaleDateString('vi-VN')]);
    flatData.push(['', '']);
    flatData.push(['Ngày đo', 'Tổng điểm', 'Lực cơ', 'Nhanh nhẹn', 'Ổn định', 'Nhận xét', 'Lời khuyên']);

    records.forEach(r => {
        flatData.push([
            r.date,
            r.totalScore,
            r.muscle,
            r.agility,
            r.stability,
            r.comment,
            r.advice
        ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LichSu_M7");

    XLSX.writeFile(wb, `LichSu_M7_${patientId}.xlsx`);
}

// Print specific assessment
function printModule7Assessment(index) {
    const patientId = getCurrentPatientId();
    const records = loadM7Records(patientId);
    const record = records[index];
    if (!record) return;

    const printWindow = window.open('', '_blank');
    const content = `
        <html>
        <head>
            <title>Phiếu Đánh giá Chức năng Vận động - ${new Date(record.date).toLocaleDateString('vi-VN')}</title>
            <style>
                body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; }
                .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #000; padding-bottom: 20px; }
                h1 { margin: 0; font-size: 24px; text-transform: uppercase; }
                .meta { margin-bottom: 30px; }
                .section { margin-bottom: 30px; }
                h2 { font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px; color: #333; }
                .score-box { text-align: center; border: 2px solid #333; padding: 15px; margin: 20px 0; border-radius: 8px; }
                .score-val { font-size: 32px; font-weight: bold; color: #333; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 5px; }
                .label { font-weight: bold; color: #555; }
                .value { font-weight: bold; }
                .advice-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #333; font-style: italic; }
                .footer { margin-top: 50px; text-align: center; font-style: italic; font-size: 12px; color: #888; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Phiếu Đánh giá Chức năng Vận động</h1>
                <p>Hệ thống ElderCare Pro</p>
            </div>
            
            <div class="meta">
                <div class="row"><span class="label">Bệnh nhân:</span> <span class="value">${getPatientById(patientId).fullName}</span></div>
                <div class="row"><span class="label">Mã hồ sơ:</span> <span class="value">${patientId}</span></div>
                <div class="row"><span class="label">Ngày đánh giá:</span> <span class="value">${new Date(record.date).toLocaleDateString('vi-VN')}</span></div>
            </div>

            <div class="score-box">
                <div>ĐIỂM TỔNG HỢP</div>
                <div class="score-val">${record.totalScore} / 150</div>
                <div>Đánh giá: ${record.rating}</div>
            </div>

            <div class="section">
                <h2>Chi tiết chỉ số</h2>
                <div class="grid">
                    <div>
                         <div class="row"><span class="label">Lực cơ (Muscle):</span> <span class="value">${record.muscle} kgf/kg</span></div>
                         <div class="row"><span class="label">Nhanh nhẹn (Agility):</span> <span class="value">${record.agility} kgf/s/kg</span></div>
                         <div class="row"><span class="label">Ổn định (Stability):</span> <span class="value">${record.stability} ms</span></div>
                    </div>
                     <div>
                         <div class="row"><span class="label">Cân nặng:</span> <span class="value">${record.weight} kg</span></div>
                         <div class="row"><span class="label">Chiều cao:</span> <span class="value">${record.height} cm</span></div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>Nhận xét & Lời khuyên</h2>
                <div class="advice-box">
                    <p><strong>Nhận xét:</strong> ${record.comment || 'Chưa có nhận xét'}</p>
                    <p style="margin-top: 10px;"><strong>Lời khuyên:</strong> ${record.advice || 'Chưa có lời khuyên'}</p>
                </div>
            </div>

            <div class="footer">
                Đánh giá được thực hiện vào ngày ${new Date().toLocaleDateString('vi-VN')}
            </div>
        </body>
        </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

function printModule7Report() {
    const reportContent = document.getElementById('m7-tab-content');
    if (!reportContent) return;

    const printWindow = window.open('', '_blank');

    // Convert charts
    const canvases = reportContent.querySelectorAll('canvas');
    const canvasImages = [];
    canvases.forEach(c => canvasImages.push(c.toDataURL()));

    const container = document.createElement('div');
    container.innerHTML = reportContent.innerHTML;

    // Replace canvas
    const tempCanvases = container.querySelectorAll('canvas');
    tempCanvases.forEach((c, i) => {
        const img = document.createElement('img');
        img.src = canvasImages[i];
        img.style.width = '100%';
        img.style.display = 'block';
        c.parentNode.replaceChild(img, c);
    });

    // Clean UI
    const buttons = container.querySelectorAll('button, .fixed'); // Remove buttons and fixed elements (export btn)
    buttons.forEach(b => b.remove());

    const doc = `
        <html>
        <head>
            <title>Báo cáo Chức năng Vận động</title>
             <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 40px; }
                @media print {
                    body { -webkit-print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <div class="text-center mb-10 pb-6 border-b border-slate-200">
                <h1 class="text-2xl font-black uppercase text-slate-800">Báo cáo Chức năng Vận động</h1>
                <p class="text-slate-500 font-bold mt-2">Bệnh nhân: ${getPatientById(getCurrentPatientId()).fullName} - ID: ${getCurrentPatientId()}</p>
                <p class="text-xs text-slate-400 mt-1">Ngày xuất báo cáo: ${new Date().toLocaleDateString('vi-VN')}</p>
            </div>
            
            <div class="space-y-8">
                ${container.innerHTML}
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(doc);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 1000);
}

// --- Helper for FAB ---
// --- Helper for FAB ---
function initModule7FabLogic() {
    console.log('[Module7] Initializing FAB logic');
    // Force show container
    const container = document.getElementById('m7-fab-container');
    if (container) {
        container.innerHTML = `
            <div id="m7-fab-buttons" class="fixed bottom-48 right-8 flex flex-col-reverse items-end gap-5 z-40 animate-fade-in pointer-events-none">
                <!-- SAVE (Submit) -->
                <button type="button" onclick="document.getElementById('m7-create-form').requestSubmit()" 
                    class="pointer-events-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative ring-4 ring-white/60">
                    <i data-lucide="save" class="w-7 h-7"></i>
                     <span class="absolute right-20 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                        Lưu kết quả
                    </span>
                </button>

                <!-- CANCEL (Reset) -->
                <button type="button" onclick="resetModule7Form()" 
                    class="pointer-events-auto w-12 h-12 bg-white text-rose-500 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-rose-100 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group relative border border-rose-50 ring-2 ring-white">
                    <i data-lucide="rotate-ccw" class="w-6 h-6"></i>
                    <span class="absolute right-16 py-2 px-4 bg-slate-900/95 backdrop-blur text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-2xl translate-x-2 group-hover:translate-x-0">
                        Nhập lại
                    </span>
                </button>
            </div>
        `;
        lucide.createIcons();
    }
}

