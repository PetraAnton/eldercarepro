/**
 * SIMPLIFIED DOCUMENT-STYLE REPORT UI
 * Clean, professional report interface without colorful web elements
 * To use: Replace the generateReportForSession function in module10.js with this version
 */

function generateReportForSession(session) {
    const modal = document.getElementById('report-modal');
    const content = document.getElementById('report-content');
    const dateEl = document.getElementById('report-date');

    dateEl.textContent = new Date(session.timestamp).toLocaleString('vi-VN');
    currentReportSession = session;

    let html = '<div class="space-y-6 bg-white p-8" style="font-family: Arial, sans-serif; color: #000; line-height: 1.6;">';

    // Patient Info - Simple text
    const patient = getPatientById(session.patientId);
    if (patient) {
        html += `
        <div class="mb-6">
            <div class="text-lg font-bold mb-1">${patient.fullName}</div>
            <div class="text-sm text-gray-700">Mã hồ sơ: ${patient.id} | Giới tính: ${patient.gender === 'male' ? 'Nam' : 'Nữ'}</div>
        </div>`;
    }

    // Calculate metrics
    const frontCap = session.captures['FRONT'];
    const backCap = session.captures['BACK'];
    const leftCap = session.captures['LEFT'];
    const rightCap = session.captures['RIGHT'];

    const frontMetrics = frontCap ? calculatePostureMetrics(frontCap.landmarks, 'FRONT', 170, 70) : null;
    const backMetrics = backCap ? calculatePostureMetrics(backCap.landmarks, 'BACK', 170, 70) : null;
    let sideMetrics = null;
    if (rightCap) sideMetrics = calculatePostureMetrics(rightCap.landmarks, 'RIGHT', 170, 70);
    else if (leftCap) sideMetrics = calculatePostureMetrics(leftCap.landmarks, 'LEFT', 170, 70);

    const overallNarrative = generateOverallSummary(frontMetrics, backMetrics, sideMetrics);

    // Section I
    html += `<div class="mb-8"><h2 class="text-xl font-bold mb-3 pb-2 border-b border-gray-300">I. TỔNG QUAN</h2>`;

    // 1. Overall Assessment - Plain text
    html += `
    <div class="mb-6">
        <h3 class="font-bold mb-2">Đánh giá chung</h3>
        <p class="text-justify text-gray-800">${overallNarrative}</p>
    </div>`;

    // 2. Metrics Summary - Simple table
    const activeViews = ['FRONT', 'BACK', 'LEFT', 'RIGHT'].filter(v => session.captures[v]);
    if (activeViews.length > 0) {
        html += `
        <div class="mb-6">
            <h3 class="font-bold mb-2">Tóm tắt chỉ số</h3>
            <table class="w-full text-sm border-collapse">
                <thead>
                    <tr class="border-b border-gray-300">
                        <th class="text-left py-2">Góc nhìn</th>
                        <th class="text-right py-2">Độ lệch (Shifts)</th>
                        <th class="text-right py-2">Độ nghiêng (Tilts)</th>
                    </tr>
                </thead>
                <tbody>`;

        activeViews.forEach(view => {
            const cap = session.captures[view];
            const metrics = calculatePostureMetrics(cap.landmarks, view, 170, 70);
            html += `
                <tr class="border-b border-gray-200">
                    <td class="py-2">${view}</td>
                    <td class="text-right py-2">${metrics.totalShifts} in</td>
                    <td class="text-right py-2">${metrics.totalTilts || '0.0'}°</td>
                </tr>`;
        });

        html += `
                </tbody>
            </table>
        </div>`;
    }
    html += `</div>`; // Close Section I

    // Section II - Detailed Views
    html += `<div class="mb-8"><h2 class="text-xl font-bold mb-3 pb-2 border-b border-gray-300">II. PHÂN TÍCH CHI TIẾT</h2>`;

    ['FRONT', 'BACK', 'LEFT', 'RIGHT'].forEach(view => {
        if (!session.captures[view]) return;

        const cap = session.captures[view];
        const m = calculatePostureMetrics(cap.landmarks, view, 170, 70);

        let narrative = "";
        if (view === 'FRONT') narrative = generateFrontNarrative(m);
        else if (view === 'BACK') narrative = generateBackNarrative(m);
        else narrative = generateSideNarrative(m);

        html += `
        <div class="mb-8">
            <h3 class="font-bold text-lg mb-3">${view} View</h3>
            
            <div class="grid grid-cols-2 gap-6 mb-4">
                <!-- Image -->
                <div>
                    <img src="${cap.image}" class="w-full border border-gray-300 cursor-pointer" onclick="openMeasureModal('${view}')" style="max-height: 400px; object-fit: contain;">
                </div>
                
                <!-- Metrics & Assessment -->
                <div>
                    ${(view === 'LEFT' || view === 'RIGHT') && m.headWeightAnalysis ? `
                    <div class="mb-4 p-3 border border-gray-300">
                        <div class="font-bold text-sm mb-1">Trọng lượng đầu hiệu dụng</div>
                        <div class="text-2xl font-bold">${m.headWeightAnalysis.effective} lbs</div>
                        <div class="text-xs text-gray-600">Chuẩn: ${m.headWeightAnalysis.base} lbs | Lệch: ${m.headWeightAnalysis.shift} in</div>
                    </div>` : ''}
                    
                    <div class="mb-4">
                        <div class="font-bold text-sm mb-2">Chỉ số đo lường</div>
                        <ul class="text-sm space-y-1">`;

        m.details.forEach(d => {
            html += `<li class="text-gray-700">• ${d.text}</li>`;
        });

        html += `
                        </ul>
                    </div>
                    
                    <div>
                        <div class="font-bold text-sm mb-2">Đánh giá</div>
                        <p class="text-sm text-justify text-gray-800">${narrative}</p>
                    </div>
                </div>
            </div>
        </div>`;
    });

    html += `</div>`; // Close Section II

    // Section III - Advanced Analysis
    const hasLegs = frontMetrics && frontMetrics.legAnalysis;
    const hasKneeNeck = sideMetrics && (sideMetrics.kneeAnalysis || sideMetrics.neckAnalysis);

    if (hasLegs || hasKneeNeck) {
        html += `<div class="mb-8"><h2 class="text-xl font-bold mb-3 pb-2 border-b border-gray-300">III. CHỈ SỐ CHUYÊN SÂU</h2>`;

        // Leg Analysis
        if (hasLegs) {
            const legStatus = getLegStatus(frontMetrics);
            const legNarrative = generateLegNarrative(frontMetrics);
            const { kneeDist, ankleDist } = frontMetrics.legAnalysis;

            html += `
            <div class="mb-6">
                <h3 class="font-bold mb-2">Hình dáng chân</h3>
                <p class="text-sm mb-2"><strong>Kết luận:</strong> ${legStatus === 'NORMAL' ? 'Bình thường' : (legStatus === 'O_LEGS' ? 'Chân vòng kiềng (O-Legs)' : 'Chân chữ X (X-Legs)')}</p>
                <p class="text-sm mb-2">Khoảng cách đầu gối: ${kneeDist} in | Khoảng cách mắt cá: ${ankleDist} in</p>
                <p class="text-sm text-justify text-gray-800">${legNarrative}</p>
            </div>`;
        }

        // Knee
        if (sideMetrics && sideMetrics.kneeAnalysis) {
            const kneeStatus = getKneeFlexionStatus(sideMetrics);
            const kneeNarrative = generateKneeFlexionNarrative(sideMetrics);
            const { angle } = sideMetrics.kneeAnalysis;

            html += `
            <div class="mb-6">
                <h3 class="font-bold mb-2">Độ cong đầu gối</h3>
                <p class="text-sm mb-2"><strong>Kết luận:</strong> ${kneeStatus === 'NORMAL' ? 'Bình thường' : (kneeStatus === 'FLEXION' ? 'Cong gối (Flexion)' : 'Duỗi quá mức (Hyperextension)')}</p>
                <p class="text-sm mb-2">Góc đầu gối: ${angle}°</p>
                <p class="text-sm text-justify text-gray-800">${kneeNarrative}</p>
            </div>`;
        }

        // Neck
        if (sideMetrics && sideMetrics.neckAnalysis) {
            const neckStatus = getNeckInclinationStatus(sideMetrics);
            const neckNarrative = generateNeckInclinationNarrative(sideMetrics);
            const { angle } = sideMetrics.neckAnalysis;

            html += `
            <div class="mb-6">
                <h3 class="font-bold mb-2">Độ nghiêng cổ</h3>
                <p class="text-sm mb-2"><strong>Kết luận:</strong> ${neckStatus === 'NORMAL' ? 'Bình thường' : 'Nghiêng trước (Forward Inclination)'}</p>
                <p class="text-sm mb-2">Góc nghiêng cổ: ${angle}°</p>
                <p class="text-sm text-justify text-gray-800">${neckNarrative}</p>
            </div>`;
        }

        html += `</div>`; // Close Section III
    }

    html += '</div>';
    content.innerHTML = html;
    modal.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}
