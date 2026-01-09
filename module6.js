// Module 6: Phân tích Thành phần Cơ thể (Body Composition Analysis)
// Vietnamese Localized

window.module6Content = `
<div class="animate-fade-in max-w-6xl mx-auto">
    
    <!-- Tab Navigation -->
    <div class="flex gap-2 mb-6 border-b-2 border-slate-200">
        <button onclick="switchModule6Tab('form')" id="module6-tab-form" 
                class="px-6 py-3 font-black text-sm transition-all border-b-4 border-indigo-600 text-indigo-600">
            <i data-lucide="clipboard-list" class="w-4 h-4 inline mr-2"></i>
            Đánh giá mới
        </button>
        <button onclick="switchModule6Tab('history')" id="module6-tab-history" 
                class="px-6 py-3 font-black text-sm transition-all border-b-4 border-transparent text-slate-500 hover:text-slate-700">
            <i data-lucide="history" class="w-4 h-4 inline mr-2"></i>
            Lịch sử đánh giá
        </button>
    </div>

    <!-- FORM TAB -->
    <div id="module6-form-tab">

        <form id="module6-form" class="space-y-6">
            
            <!-- Section 1: Thông tin Chung (General Info) -->
            <div class="glass-panel rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div class="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-4 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all"
                     onclick="toggleModule6Section('general')">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                        <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
                        Thông tin Chung
                    </h3>
                    <i data-lucide="chevron-down" id="chevron-general" class="w-5 h-5 text-white transition-transform duration-300"></i>
                </div>
                <div id="section-general" class="p-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Chiều cao (cm)</label>
                            <input type="number" id="height" step="0.1" placeholder="165"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Cân nặng (kg)</label>
                            <input type="number" id="weight" step="0.1" placeholder="60"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">BMI</label>
                            <input type="text" id="bmi" readonly 
                                   class="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-600 font-black text-center" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tỷ lệ mỡ (%)</label>
                            <input type="number" id="body-fat" step="0.1" placeholder="25.5"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Khối lượng cơ (kg)</label>
                            <input type="number" id="muscle-mass" step="0.1" placeholder="45.2"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Mỡ nội tạng (Lv)</label>
                            <input type="number" id="visceral-fat" step="1" placeholder="8"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Khối lượng xương (kg)</label>
                            <input type="number" id="bone-mass" step="0.1" placeholder="2.5"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nước cơ thể (%)</label>
                            <input type="number" id="body-water" step="0.1" placeholder="55.0"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 2: Đánh giá Cơ bắp (Muscle Assessment) -->
            <div class="glass-panel rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div class="bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-4 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all"
                     onclick="toggleModule6Section('muscle')">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                        <i data-lucide="dumbbell" class="w-5 h-5"></i>
                        Đánh giá Cơ bắp
                    </h3>
                    <i data-lucide="chevron-down" id="chevron-muscle" class="w-5 h-5 text-white transition-transform duration-300"></i>
                </div>
                <div id="section-muscle" class="p-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tay phải (kg)</label>
                            <input type="number" id="muscle-right-arm" step="0.1" placeholder="2.5"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tay trái (kg)</label>
                            <input type="number" id="muscle-left-arm" step="0.1" placeholder="2.4"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Chân phải (kg)</label>
                            <input type="number" id="muscle-right-leg" step="0.1" placeholder="8.5"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Chân trái (kg)</label>
                            <input type="number" id="muscle-left-leg" step="0.1" placeholder="8.3"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Thân mình (kg)</label>
                            <input type="number" id="muscle-trunk" step="0.1" placeholder="23.5"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                    </div>
                    
                    <!-- Muscle Chart -->
                    <div class="glass-panel p-6 rounded-2xl border border-white/60">
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Biểu đồ Phân bố Cơ bắp</h4>
                        <canvas id="muscle-chart" height="80"></canvas>
                    </div>
                </div>
            </div>

            <!-- Section 3: Chỉ số Lượng cơ theo Bộ phận (Muscle Mass by Body Part) -->
            <div class="glass-panel rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div class="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all"
                     onclick="toggleModule6Section('bodypart')">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                        <i data-lucide="activity" class="w-5 h-5"></i>
                        Chỉ số Lượng cơ theo Bộ phận
                    </h3>
                    <i data-lucide="chevron-down" id="chevron-bodypart" class="w-5 h-5 text-white transition-transform duration-300"></i>
                </div>
                <div id="section-bodypart" class="p-8">
                    <div class="overflow-x-auto mb-8 rounded-2xl border border-white/40 shadow-sm">
                        <table class="w-full border-collapse">
                            <thead>
                                <tr class="bg-blue-50/50 backdrop-blur-sm">
                                    <th class="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-black text-slate-500 border-b border-blue-100/50">Bộ phận</th>
                                    <th class="px-6 py-4 text-center text-[10px] uppercase tracking-widest font-black text-slate-500 border-b border-blue-100/50">Phải (kg)</th>
                                    <th class="px-6 py-4 text-center text-[10px] uppercase tracking-widest font-black text-slate-500 border-b border-blue-100/50">Trái (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-slate-50 hover:bg-white/40 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-700">Tay</td>
                                    <td class="px-6 py-4 text-center"><span id="bodypart-arm-right" class="font-black text-blue-600">--</span></td>
                                    <td class="px-6 py-4 text-center"><span id="bodypart-arm-left" class="font-black text-blue-600">--</span></td>
                                </tr>
                                <tr class="border-b border-slate-50 hover:bg-white/40 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-700">Chân</td>
                                    <td class="px-6 py-4 text-center"><span id="bodypart-leg-right" class="font-black text-blue-600">--</span></td>
                                    <td class="px-6 py-4 text-center"><span id="bodypart-leg-left" class="font-black text-blue-600">--</span></td>
                                </tr>
                                <tr class="hover:bg-white/40 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-700">Thân mình</td>
                                    <td colspan="2" class="px-6 py-4 text-center"><span id="bodypart-trunk" class="font-black text-blue-600">--</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Body Part Chart -->
                    <div class="glass-panel p-6 rounded-2xl border border-white/60">
                        <h4 class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">So sánh Phải/Trái</h4>
                        <canvas id="bodypart-chart" height="100"></canvas>
                    </div>
                </div>
            </div>

            <!-- Section 4: Chỉ số Chuyên sâu (Advanced Metrics) -->
            <div class="glass-panel rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div class="bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-4 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all"
                     onclick="toggleModule6Section('advanced')">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                        <i data-lucide="microscope" class="w-5 h-5"></i>
                        Chỉ số Chuyên sâu
                    </h3>
                    <i data-lucide="chevron-down" id="chevron-advanced" class="w-5 h-5 text-white transition-transform duration-300"></i>
                </div>
                <div id="section-advanced" class="p-8">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-teal-50/50 p-6 rounded-[24px] border border-teal-100 hover:shadow-md transition-shadow">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">SMI (kg/m²)</label>
                            <input type="number" id="smi" step="0.1" placeholder="7.2"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                            <p class="text-xs text-teal-600 font-bold mt-2">Skeletal Muscle Index</p>
                        </div>
                        <div class="bg-blue-50/50 p-6 rounded-[24px] border border-blue-100 hover:shadow-md transition-shadow">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Phase Angle (độ)</label>
                            <input type="number" id="phase-angle" step="0.1" placeholder="5.5"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                            <p class="text-xs text-blue-600 font-bold mt-2">Chỉ số sức khỏe tế bào</p>
                        </div>
                        <div class="bg-purple-50/50 p-6 rounded-[24px] border border-purple-100 hover:shadow-md transition-shadow">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">ECW/TBW</label>
                            <input type="number" id="ecw-tbw" step="0.01" placeholder="0.38"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                            <p class="text-xs text-purple-600 font-bold mt-2">Tỷ lệ nước ngoài tế bào</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Notes Section -->
            <div class="glass-panel p-6 rounded-[32px] border border-indigo-100/50">
                <label class="block text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i data-lucide="file-text" class="w-4 h-4 inline mr-1"></i>
                    Ghi chú
                </label>
                <textarea id="notes" rows="4" placeholder="Nhập ghi chú bổ sung..."
                          class="input-glass w-full px-4 py-3 rounded-2xl outline-none text-sm font-medium resize-none shadow-inner"></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-4 px-1">
                <button type="submit" id="module6-save-btn"
                    class="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-sm hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all">
                    <i data-lucide="save" class="w-4 h-4 inline mr-2 ring-offset-2"></i>
                    Lưu đánh giá
                </button>
            </div>

        </form>
    </div>

    <!-- HISTORY TAB -->
    <div id="module6-history-tab" class="hidden">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i data-lucide="clock" class="w-5 h-5 text-indigo-600"></i>
                Lịch sử Đánh giá
            </h3>
            <div id="history-list" class="space-y-3">
                <!-- History items will be populated here -->
            </div>
        </div>

        <!-- Timeline Chart -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">
            <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i data-lucide="trending-up" class="w-5 h-5 text-indigo-600"></i>
                Xu hướng theo Thời gian
            </h3>
            <canvas id="timeline-chart" height="80"></canvas>
        </div>
    </div>

</div>
`;

// Global variable to store resetFormState function
let module6ResetFormState = null;

// Reset Form
function resetForm() {
    if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu đã nhập?')) {
        document.getElementById('module6-form').reset();

        // Reset form state (disable save button)
        if (typeof module6ResetFormState === 'function') {
            module6ResetFormState();
        }

        showToast('Đã xóa dữ liệu form', 'info');
    }
}

// Initialize Module 6
function initModule6() {
    const patientId = getCurrentPatientId();
    const patient = getPatientById(patientId);

    // Load patient info if available
    if (patient) {
        // Update any patient name displays
        const nameDisplays = document.querySelectorAll('.patient-name-display');
        nameDisplays.forEach(el => {
            el.textContent = patient.fullName || 'Chưa có tên';
        });
    }

    // Setup form change detection
    // Setup form change detection and store in global variable
    const resetFormState = setupFormChangeDetection('module6-form', 'module6-save-btn');
    module6ResetFormState = resetFormState; // Make accessible to resetForm()

    // BMI Auto-calculation
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiInput = document.getElementById('bmi');

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            bmiInput.value = bmi.toFixed(1);
        } else {
            bmiInput.value = '';
        }
    }

    heightInput?.addEventListener('input', calculateBMI);
    weightInput?.addEventListener('input', calculateBMI);

    // Update body part table when muscle inputs change
    const muscleInputs = [
        'muscle-right-arm', 'muscle-left-arm',
        'muscle-right-leg', 'muscle-left-leg',
        'muscle-trunk'
    ];

    muscleInputs.forEach(id => {
        document.getElementById(id)?.addEventListener('input', updateBodyPartTable);
    });

    // Form submission
    document.getElementById('module6-form')?.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const assessmentData = {
            patientId: patientId,
            assessmentDate: new Date().toLocaleDateString('vi-VN'),
            timestamp: Date.now(),
            general: {
                height: parseFloat(document.getElementById('height').value) || 0,
                weight: parseFloat(document.getElementById('weight').value) || 0,
                bmi: parseFloat(document.getElementById('bmi').value) || 0,
                muscleMass: parseFloat(document.getElementById('muscle-mass').value) || 0,
                bodyFat: parseFloat(document.getElementById('body-fat').value) || 0
            },
            muscle: {
                rightArm: parseFloat(document.getElementById('muscle-right-arm').value) || 0,
                leftArm: parseFloat(document.getElementById('muscle-left-arm').value) || 0,
                rightLeg: parseFloat(document.getElementById('muscle-right-leg').value) || 0,
                leftLeg: parseFloat(document.getElementById('muscle-left-leg').value) || 0,
                trunk: parseFloat(document.getElementById('muscle-trunk').value) || 0
            }
        };

        // Save to localStorage
        const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_body_assessments`) || '[]');
        assessments.push(assessmentData);
        localStorage.setItem(`mirabocaresync_${patientId}_body_assessments`, JSON.stringify(assessments));

        // Mark module complete
        markModuleComplete(patientId, 'module6');

        // Show success message
        showToast('Đã lưu đánh giá thành phần cơ thể!', 'success');

        // Reset form state (remove ring and asterisk)
        if (typeof resetFormState === 'function') {
            resetFormState();
        }

        // Switch to history tab
        switchModule6Tab('history');
    });

    // Initialize charts
    initializeModule6Charts();

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Toggle section collapse/expand
function toggleModule6Section(sectionId) {
    const content = document.getElementById(`section-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);

    if (content.style.display === 'none') {
        content.style.display = 'block';
        chevron.style.transform = 'rotate(0deg)';
    } else {
        content.style.display = 'none';
        chevron.style.transform = 'rotate(-90deg)';
    }
}

// Update body part table
function updateBodyPartTable() {
    const armRight = document.getElementById('muscle-right-arm').value;
    const armLeft = document.getElementById('muscle-left-arm').value;
    const legRight = document.getElementById('muscle-right-leg').value;
    const legLeft = document.getElementById('muscle-left-leg').value;
    const trunk = document.getElementById('muscle-trunk').value;

    document.getElementById('bodypart-arm-right').textContent = armRight || '--';
    document.getElementById('bodypart-arm-left').textContent = armLeft || '--';
    document.getElementById('bodypart-leg-right').textContent = legRight || '--';
    document.getElementById('bodypart-leg-left').textContent = legLeft || '--';
    document.getElementById('bodypart-trunk').textContent = trunk || '--';

    // Update charts
    updateMuscleChart();
    updateBodyPartChart();
}

// Initialize charts
let muscleChart = null;
let bodyPartChart = null;
let timelineChart = null;

function initializeModule6Charts() {
    // Muscle Chart
    const muscleCtx = document.getElementById('muscle-chart');
    if (muscleCtx && typeof Chart !== 'undefined') {
        muscleChart = new Chart(muscleCtx, {
            type: 'bar',
            data: {
                labels: ['Tay phải', 'Tay trái', 'Chân phải', 'Chân trái', 'Thân mình'],
                datasets: [{
                    label: 'Khối lượng cơ (kg)',
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(14, 165, 233, 0.8)',
                        'rgba(168, 85, 247, 0.8)'
                    ],
                    borderColor: [
                        'rgb(99, 102, 241)',
                        'rgb(139, 92, 246)',
                        'rgb(59, 130, 246)',
                        'rgb(14, 165, 233)',
                        'rgb(168, 85, 247)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'kg'
                        }
                    }
                }
            }
        });
    }

    // Body Part Chart
    const bodyPartCtx = document.getElementById('bodypart-chart');
    if (bodyPartCtx && typeof Chart !== 'undefined') {
        bodyPartChart = new Chart(bodyPartCtx, {
            type: 'bar',
            data: {
                labels: ['Tay', 'Chân'],
                datasets: [
                    {
                        label: 'Phải',
                        data: [0, 0],
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 2
                    },
                    {
                        label: 'Trái',
                        data: [0, 0],
                        backgroundColor: 'rgba(168, 85, 247, 0.8)',
                        borderColor: 'rgb(168, 85, 247)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'kg'
                        }
                    }
                }
            }
        });
    }
}

// Update muscle chart
function updateMuscleChart() {
    if (!muscleChart) return;

    const data = [
        parseFloat(document.getElementById('muscle-right-arm').value) || 0,
        parseFloat(document.getElementById('muscle-left-arm').value) || 0,
        parseFloat(document.getElementById('muscle-right-leg').value) || 0,
        parseFloat(document.getElementById('muscle-left-leg').value) || 0,
        parseFloat(document.getElementById('muscle-trunk').value) || 0
    ];

    muscleChart.data.datasets[0].data = data;
    muscleChart.update();
}

// Update body part chart
function updateBodyPartChart() {
    if (!bodyPartChart) return;

    const armRight = parseFloat(document.getElementById('muscle-right-arm').value) || 0;
    const armLeft = parseFloat(document.getElementById('muscle-left-arm').value) || 0;
    const legRight = parseFloat(document.getElementById('muscle-right-leg').value) || 0;
    const legLeft = parseFloat(document.getElementById('muscle-left-leg').value) || 0;

    bodyPartChart.data.datasets[0].data = [armRight, legRight];
    bodyPartChart.data.datasets[1].data = [armLeft, legLeft];
    bodyPartChart.update();
}

// Save assessment
function saveModule6Assessment() {
    const patientId = getCurrentPatientId();
    const timestamp = Date.now();

    const assessmentData = {
        general: {
            height: parseFloat(document.getElementById('height').value) || null,
            weight: parseFloat(document.getElementById('weight').value) || null,
            bmi: parseFloat(document.getElementById('bmi').value) || null,
            bodyFat: parseFloat(document.getElementById('body-fat').value) || null,
            muscleMass: parseFloat(document.getElementById('muscle-mass').value) || null,
            visceralFat: parseInt(document.getElementById('visceral-fat').value) || null,
            boneMass: parseFloat(document.getElementById('bone-mass').value) || null,
            bodyWater: parseFloat(document.getElementById('body-water').value) || null
        },
        muscle: {
            rightArm: parseFloat(document.getElementById('muscle-right-arm').value) || null,
            leftArm: parseFloat(document.getElementById('muscle-left-arm').value) || null,
            rightLeg: parseFloat(document.getElementById('muscle-right-leg').value) || null,
            leftLeg: parseFloat(document.getElementById('muscle-left-leg').value) || null,
            trunk: parseFloat(document.getElementById('muscle-trunk').value) || null
        },
        advanced: {
            smi: parseFloat(document.getElementById('smi').value) || null,
            phaseAngle: parseFloat(document.getElementById('phase-angle').value) || null,
            ecwTbw: parseFloat(document.getElementById('ecw-tbw').value) || null
        },
        notes: document.getElementById('notes').value,
        timestamp: timestamp
    };

    // Save to LocalStorage
    localStorage.setItem(`mirabocaresync_${patientId}_bodycomp_${timestamp}`, JSON.stringify(assessmentData));

    // Save assessor name for future use
    localStorage.setItem(`mirabocaresync_${patientId}_module6_assessor`, assessmentData.assessorName);

    // Mark complete and show toast
    markModuleComplete(patientId, 'module6');
    showToast('Đã lưu đánh giá thành công!', 'success');
    console.log('Module 6 assessment saved');

    // Reset form state
    if (typeof resetFormState === 'function') {
        resetFormState();
    }
}

// Switch tabs
function switchModule6Tab(tabName) {
    const formTab = document.getElementById('module6-form-tab');
    const historyTab = document.getElementById('module6-history-tab');
    const formBtn = document.getElementById('module6-tab-form');
    const historyBtn = document.getElementById('module6-tab-history');

    if (tabName === 'form') {
        formTab.classList.remove('hidden');
        historyTab.classList.add('hidden');
        formBtn.className = 'px-6 py-3 font-bold text-indigo-600 border-b-4 border-indigo-600 transition-all flex items-center gap-2';
        historyBtn.className = 'px-6 py-3 font-bold text-slate-400 border-b-4 border-transparent hover:text-slate-600 transition-all flex items-center gap-2';
    } else {
        formTab.classList.add('hidden');
        historyTab.classList.remove('hidden');
        formBtn.className = 'px-6 py-3 font-bold text-slate-400 border-b-4 border-transparent hover:text-slate-600 transition-all flex items-center gap-2';
        historyBtn.className = 'px-6 py-3 font-bold text-indigo-600 border-b-4 border-indigo-600 transition-all flex items-center gap-2';

        loadModule6History();
    }

    // Reinitialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Load history
function loadModule6History() {
    const patientId = getCurrentPatientId();
    const historyList = document.getElementById('history-list');

    // Get all assessments from LocalStorage
    const assessments = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`mirabocaresync_${patientId}_bodycomp_`)) {
            const data = JSON.parse(localStorage.getItem(key));
            assessments.push(data);
        }
    }

    // Sort by timestamp (newest first)
    assessments.sort((a, b) => b.timestamp - a.timestamp);

    if (assessments.length === 0) {
        historyList.innerHTML = '<p class="text-slate-500 text-center py-8">Chưa có đánh giá nào</p>';
        return;
    }

    // Display history items
    historyList.innerHTML = assessments.map(assessment => `
        <div class="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-all cursor-pointer border border-slate-200"
             onclick='showModule6Detail(${JSON.stringify(assessment).replace(/'/g, "&apos;")})'>
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold text-slate-800">${assessment.assessmentDate}</p>
                    <p class="text-sm text-slate-600">Nhân viên: ${assessment.assessorName}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-slate-600">BMI: <span class="font-bold text-indigo-600">${assessment.general.bmi || '--'}</span></p>
                    <p class="text-sm text-slate-600">Cân nặng: <span class="font-bold text-indigo-600">${assessment.general.weight || '--'} kg</span></p>
                </div>
            </div>
        </div>
    `).join('');

    // Update timeline chart
    updateTimelineChart(assessments);
}

// Show detail
function showModule6Detail(assessment) {
    const detail = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="this.remove()">
            <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
                <h3 class="text-xl font-bold text-slate-800 mb-4">Chi tiết Đánh giá - ${assessment.assessmentDate}</h3>
                
                <div class="space-y-4">
                    <div class="bg-indigo-50 rounded-xl p-4">
                        <h4 class="font-bold text-indigo-900 mb-2">Thông tin Chung</h4>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <p>Chiều cao: <span class="font-bold">${assessment.general.height || '--'} cm</span></p>
                            <p>Cân nặng: <span class="font-bold">${assessment.general.weight || '--'} kg</span></p>
                            <p>BMI: <span class="font-bold">${assessment.general.bmi || '--'}</span></p>
                            <p>Tỷ lệ mỡ: <span class="font-bold">${assessment.general.bodyFat || '--'} %</span></p>
                        </div>
                    </div>
                    
                    <div class="bg-purple-50 rounded-xl p-4">
                        <h4 class="font-bold text-purple-900 mb-2">Đánh giá Cơ bắp</h4>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <p>Tay phải: <span class="font-bold">${assessment.muscle.rightArm || '--'} kg</span></p>
                            <p>Tay trái: <span class="font-bold">${assessment.muscle.leftArm || '--'} kg</span></p>
                            <p>Chân phải: <span class="font-bold">${assessment.muscle.rightLeg || '--'} kg</span></p>
                            <p>Chân trái: <span class="font-bold">${assessment.muscle.leftLeg || '--'} kg</span></p>
                            <p>Thân mình: <span class="font-bold">${assessment.muscle.trunk || '--'} kg</span></p>
                        </div>
                    </div>
                    
                    <div class="bg-teal-50 rounded-xl p-4">
                        <h4 class="font-bold text-teal-900 mb-2">Chỉ số Chuyên sâu</h4>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <p>SMI: <span class="font-bold">${assessment.advanced.smi || '--'} kg/m²</span></p>
                            <p>Phase Angle: <span class="font-bold">${assessment.advanced.phaseAngle || '--'} độ</span></p>
                            <p>ECW/TBW: <span class="font-bold">${assessment.advanced.ecwTbw || '--'}</span></p>
                        </div>
                    </div>
                    
                    ${assessment.notes ? `
                        <div class="bg-slate-50 rounded-xl p-4">
                            <h4 class="font-bold text-slate-900 mb-2">Ghi chú</h4>
                            <p class="text-sm text-slate-700">${assessment.notes}</p>
                        </div>
                    ` : ''}
                </div>
                
                <button onclick="this.closest('.fixed').remove()" 
                        class="mt-6 w-full bg-slate-600 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-all">
                    Đóng
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', detail);
}

// Update timeline chart
function updateTimelineChart(assessments) {
    const ctx = document.getElementById('timeline-chart');
    if (!ctx || typeof Chart === 'undefined') return;

    // Sort by timestamp (oldest first for timeline)
    const sorted = [...assessments].sort((a, b) => a.timestamp - b.timestamp);

    const labels = sorted.map(a => a.assessmentDate);
    const weightData = sorted.map(a => a.general.weight);
    const bmiData = sorted.map(a => a.general.bmi);
    const muscleMassData = sorted.map(a => a.general.muscleMass);

    if (timelineChart) {
        timelineChart.destroy();
    }

    timelineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Cân nặng (kg)',
                    data: weightData,
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'BMI',
                    data: bmiData,
                    borderColor: 'rgb(168, 85, 247)',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Khối lượng cơ (kg)',
                    data: muscleMassData,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
