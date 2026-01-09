
// --- Report & Charting Logic ---

let m6BodyTypeChart = null;
let m6QualityChart = null;

// Mock Reference Zones (Simplified)
// Body Type: X (Muscle), Y (Fat)
// 9 Zones. Center is "Standard".
// High Fat + Low Muscle = Obese/Hidden Obesity
// High Muscle + Low Fat = Athletic

function renderModule6Report(selectedTimestamp = null) {
    const patientId = getCurrentPatientId();
    // Get all assessments
    const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_body_assessments`) || '[]');

    if (assessments.length === 0) {
        // Show empty state in report tab?
        return;
    }

    // Sort Newest -> Oldest
    assessments.sort((a, b) => b.timestamp - a.timestamp);

    // Populate Selector if empty or needed
    const selector = document.getElementById('m6-report-selector');
    if (selector && selector.options.length === 0) {
        selector.innerHTML = assessments.map(a =>
            `<option value="${a.timestamp}">${a.assessmentDate} - ${a.general.weight}kg</option>`
        ).join('');
    }

    // Determine current record
    let currentRecord = assessments[0];
    if (selectedTimestamp) {
        currentRecord = assessments.find(a => a.timestamp == selectedTimestamp) || assessments[0];
        // Sync selector value
        if (selector) selector.value = currentRecord.timestamp;
    }

    // --- Update Text Fields ---
    const evalComment = document.getElementById('m6-eval-comment');
    if (evalComment) evalComment.value = currentRecord.notes || ''; // Re-using notes as comment for now, or separate field? 
    // Ideally we should have separate 'expertComment' field in data structure. 
    // For now let's use 'notes' as the "Comment" or add a new field. 
    // Let's assume 'expertComment' exists or fallback to notes.
    if (evalComment) evalComment.value = currentRecord.expertComment || '';

    // --- Render Charts ---
    renderBodyTypeChart(currentRecord);
    renderQualityChart(currentRecord);

    // --- Update Auto-Evaluation Text ---
    // Simple logic based on thresholds
    updateM6AutoEval(currentRecord);
}

function updateM6AutoEval(data) {
    // Mock Logic for demonstration
    const fat = data.general.bodyFat;
    const muscle = data.general.muscleMass;

    let type = "Tiêu chuẩn";
    if (fat > 30) type = "Béo phì";
    else if (muscle > 50) type = "Cơ bắp (Vận động viên)";
    else if (fat < 15 && muscle < 40) type = "Gầy / Thiếu cơ";

    document.getElementById('m6-bodytype-result').textContent = type;
    document.getElementById('m6-quality-result').textContent = "Cần thêm dữ liệu tham chiếu";
}

function renderBodyTypeChart(data) {
    const ctx = document.getElementById('m6-bodytype-chart');
    if (!ctx) return;

    if (m6BodyTypeChart) m6BodyTypeChart.destroy();

    // Data Point
    const x = data.general.muscleMass || 0;
    const y = data.general.bodyFat || 0;

    m6BodyTypeChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Kết quả của bạn',
                    data: [{ x: x, y: y }],
                    backgroundColor: '#4f46e5', // Indigo-600
                    borderColor: '#fff',
                    borderWidth: 3,
                    pointRadius: 8,
                    pointHoverRadius: 10
                },
                // Mock Zone Lines/Points could be added here as separate datasets
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Khối lượng cơ (kg)', font: { weight: 'bold' } },
                    min: 20, max: 80,
                    grid: { color: '#e2e8f0' } // Slate-200
                },
                y: {
                    title: { display: true, text: 'Tỷ lệ mỡ (%)', font: { weight: 'bold' } },
                    min: 5, max: 50,
                    grid: { color: '#e2e8f0' }
                }
            },
            plugins: {
                legend: { display: true, position: 'bottom' },
                annotation: {
                    // Requires chartjs-plugin-annotation to do boxes, 
                    // for now we rely on simple grid or just the scatter point
                }
            }
        }
    });
}

function renderQualityChart(data) {
    const ctx = document.getElementById('m6-quality-chart');
    if (!ctx) return;

    if (m6QualityChart) m6QualityChart.destroy();

    // Quality Proxy: Phase Angle is often used for cellular health/muscle quality
    const x = data.advanced.smi || 0;
    const y = data.advanced.phaseAngle || 0;
    // Or "Quality" metric if calculated.

    m6QualityChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Chỉ số hiện tại',
                data: [{ x: x, y: y }],
                backgroundColor: '#0d9488', // Teal-600
                borderColor: '#fff',
                borderWidth: 3,
                pointRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'SMI (Chỉ số cơ xương)', font: { weight: 'bold' } },
                    min: 4, max: 12
                },
                y: {
                    title: { display: true, text: 'Chất lượng cơ (Phase Angle)', font: { weight: 'bold' } },
                    min: 2, max: 10
                }
            }
        }
    });
}

function saveM6ReportData() {
    const selector = document.getElementById('m6-report-selector');
    if (!selector) return;
    const timestamp = selector.value;
    const comment = document.getElementById('m6-eval-comment').value;

    const patientId = getCurrentPatientId();
    const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_body_assessments`) || '[]');

    // Find and update
    const index = assessments.findIndex(a => a.timestamp == timestamp);
    if (index !== -1) {
        assessments[index].expertComment = comment;
        localStorage.setItem(`mirabocaresync_${patientId}_body_assessments`, JSON.stringify(assessments));
        showToast('Đã lưu chẩn đoán chuyên môn!', 'success');
    }
}
