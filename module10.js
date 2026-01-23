// Module 10: Posture Screen Analysis
// Vietnamese Localized
// Refactored for History & Fullscreen Mode

// --- Global State ---
let postureState = {
    mode: 'HISTORY', // HISTORY | ASSESSMENT
    viewMode: 'UNKNOWN', // FRONT, BACK, LEFT, RIGHT, UNKNOWN
    captures: { FRONT: null, BACK: null, LEFT: null, RIGHT: null },
    landmarker: null,
    videoStream: null,
    animationFrameId: null,
    lastLandmarks: null,
    isCapturing: false,
    countdown: null,
    lastCaptureTime: 0,
    gestureState: { startTime: null, hand: null, triggering: false }
};

const GESTURE_DURATION = 1500; // ms to hold gesture

// --- HTML Templates ---

// 1. History View (Default)
const historyViewTemplate = `
<div class="h-full flex flex-col bg-slate-50">
    <!-- History List -->
    <div class="flex-1 overflow-y-auto p-8" id="posture-history-container">
        <!-- Content injected by JS -->
        <div class="flex flex-col items-center justify-center h-64 text-slate-400">
            <i data-lucide="loader-2" class="w-8 h-8 animate-spin mb-2"></i>
            <p>Đang tải dữ liệu...</p>
        </div>
    </div>
</div>
`;

function renderGalleryItem(view) {
    return `
    <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
            <span class="text-slate-400 text-[10px] font-black tracking-widest uppercase">${view} VIEW</span>
            <div id="${view.toLowerCase()}-actions" class="flex gap-2 hidden scale-90 origin-right">
                <button onclick="clearCapture('${view}')" class="text-red-400 hover:text-white transition-colors p-1 rounded hover:bg-red-500/20">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
        <div id="${view.toLowerCase()}-slot" 
             class="h-40 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-slate-500 transition-colors relative group"
             onclick="previewCapture('${view}')">
            <div class="text-center">
                <i data-lucide="camera" class="w-6 h-6 text-slate-600 mx-auto mb-2 group-hover:text-slate-500 transition-colors"></i>
                <span class="text-slate-600 text-xs font-bold group-hover:text-slate-500">Trống</span>
            </div>
        </div>
    </div>
    `;
}

// 2. Fullscreen Assessment View (Overlay)
const assessmentViewTemplate = `
<div id="assessment-overlay" class="fixed inset-0 z-50 bg-slate-900 flex flex-col hidden animate-fade-in">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-slate-700 bg-slate-800 flex items-center justify-between relative">
        <!-- Left: Exit & Title -->
        <div class="flex items-center gap-4 z-10">
            <button onclick="closeSession()" class="text-slate-400 hover:text-white transition-colors flex items-center gap-2 hover:bg-slate-700/50 px-3 py-1.5 rounded-lg active:scale-95">
                <i data-lucide="x" class="w-5 h-5"></i>
                <span class="font-semibold">Thoát</span>
            </button>
            <div class="w-px h-6 bg-slate-600"></div>
            <h1 class="text-lg font-bold text-white hidden md:block">New Assessment Session</h1>
        </div>
        
        <!-- Center: Status Indicator (Enlarged) -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div id="posture-status" class="flex items-center gap-3 bg-slate-900 px-6 py-2.5 rounded-full border border-slate-600 shadow-xl pointer-events-auto transition-all duration-300">
                <div id="status-dot" class="w-3 h-3 rounded-full bg-slate-500"></div>
                <span id="status-text" class="text-white font-black text-sm tracking-wider">ADJUST POSITION</span>
            </div>
        </div>
        
        <!-- Right: Save Button -->
        <div class="flex items-center gap-4 z-10">
            <button onclick="saveSessionToHistory()" 
                    class="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors shadow-lg hover:shadow-green-500/20 active:scale-95 duration-200">
                <i data-lucide="save" class="w-4 h-4"></i>
                <span class="hidden md:inline">Save & Finish</span>
                <span class="md:hidden">Save</span>
            </button>
        </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
        <!-- Left: Camera View -->
        <div class="flex-1 relative bg-black">
            <video id="posture-video" class="absolute inset-0 w-full h-full object-cover" style="transform: scaleX(-1);" autoplay playsinline></video>
            <canvas id="posture-canvas" class="absolute inset-0 w-full h-full" style="transform: scaleX(-1);"></canvas>
            
            <!-- Instruction Overlay -->
            <div id="instruction-overlay" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm hidden">
                <div class="text-center text-white">
                    <i data-lucide="scan-line" class="w-16 h-16 mx-auto mb-4 opacity-50"></i>
                    <p class="text-2xl font-bold">Please stand in full view</p>
                    <p class="text-slate-400 mt-2">Detecting Front or Side profile...</p>
                </div>
            </div>
            
            <!-- Gesture Hint -->
            <div id="gesture-hint" class="absolute top-6 right-6 bg-black bg-opacity-50 px-5 py-3 rounded-full text-white flex items-center gap-3 hidden border border-white/10 backdrop-blur-md">
                <span class="text-2xl">✋</span>
                <div>
                    <p class="text-sm font-bold">Auto Capture</p>
                    <p class="text-[10px] text-slate-300">Raise Hand to trigger</p>
                </div>
            </div>
            
            <!-- Countdown Overlay -->
            <div id="countdown-overlay" class="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center hidden" style="z-index: 20;">
                <div id="countdown-number" class="text-9xl font-black text-white drop-shadow-2xl scale-150 transition-transform"></div>
                <div class="mt-8 text-3xl font-bold text-white bg-black/50 backdrop-blur px-8 py-3 rounded-2xl border border-white/20">
                    Return to Pose!
                </div>
            </div>
            
            <!-- Capture Button -->
            <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4" style="z-index: 10;">
                <button id="capture-btn" onclick="handlePostureCapture()" 
                        class="w-24 h-24 rounded-full bg-white border-8 border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:bg-slate-700 disabled:border-slate-800 disabled:cursor-not-allowed shadow-2xl"
                        disabled>
                    <i data-lucide="camera" class="w-10 h-10 text-black"></i>
                </button>
                <div class="text-center bg-black/60 backdrop-blur px-4 py-2 rounded-xl">
                    <span id="capture-hint" class="text-white font-bold text-sm">Waiting for pose...</span>
                </div>
            </div>
        </div>
        
        <!-- Right: Gallery -->
        <div class="w-80 bg-slate-800 border-l border-slate-700 flex flex-col p-6 overflow-hidden shadow-2xl z-20">
            <h3 class="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
                <i data-lucide="images" class="w-4 h-4"></i>
                Session Captures
            </h3>
            
            <div class="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                <!-- Front View -->
                ${renderGalleryItem('FRONT')}
                <!-- Back View -->
                ${renderGalleryItem('BACK')}
                <!-- Left View -->
                ${renderGalleryItem('LEFT')}
                <!-- Right View -->
                ${renderGalleryItem('RIGHT')}
            </div>
        </div>
    </div>
</div>

<!-- Image Preview Modal -->
<div id="image-preview-modal" class="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-8 hidden" onclick="closeImagePreview()">
    <button class="absolute top-8 right-8 text-white hover:text-slate-300 transition-colors" onclick="closeImagePreview()">
        <i data-lucide="x-circle" class="w-12 h-12"></i>
    </button>
    <img id="preview-image" src="" alt="Preview" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onclick="event.stopPropagation()">
</div>

<!-- Report Modal (Reused for History View) -->
<div id="report-modal" class="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-8 hidden overflow-auto backdrop-blur-sm">
    <div class="bg-slate-50 rounded-[32px] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl" onclick="event.stopPropagation()">
        <div class="bg-white px-8 py-6 flex justify-between items-center border-b border-slate-200">
            <div>
                <h2 class="text-2xl font-black text-slate-800">Báo cáo Phân tích Tư thế</h2>
                <p id="report-date" class="text-sm font-bold text-slate-400 mt-1">---</p>
            </div>
            <div class="flex gap-2">
                <button onclick="openPdfPreview()" class="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors font-bold text-xs">
                   <i data-lucide="file-text" class="w-4 h-4"></i>
                   PDF View
                </button>
                <button onclick="closePostureReport()" class="p-3 hover:bg-red-50 rounded-xl transition-colors text-red-500" title="Close">
                    <i data-lucide="x" class="w-6 h-6"></i>
                </button>
            </div>
        </div>
        
        <div id="report-content" class="p-10 overflow-y-auto flex-1">
            <!-- Report content will be generated here -->
        </div>
    </div>
</div>
`;

const measureModalTemplate = `
<div id="measure-modal" class="fixed inset-0 bg-black/90 z-[70] hidden flex items-center justify-center p-4">
    <div class="relative max-h-full max-w-full">
        <button onclick="closeMeasureModal()" class="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors">
            <i data-lucide="x" class="w-8 h-8"></i>
        </button>
        <div class="relative">
            <img id="measure-modal-img" class="max-h-[85vh] rounded-lg shadow-2xl">
            <canvas id="measure-modal-canvas" class="absolute inset-0 pointer-events-none"></canvas>
        </div>
    </div>
</div>
`;

const pdfPreviewModalTemplate = `
<style>
    @media print {
        body > * { display: none !important; }
        #pdf-preview-modal { 
            display: block !important; 
            position: absolute !important; 
            top: 0 !important; 
            left: 0 !important; 
            width: 100% !important; 
            height: auto !important; 
            background: white !important;
            z-index: 9999 !important;
        }
        #pdf-preview-modal > div:first-child { display: none !important; } /* Hide Toolbar */
        #pdf-page-container {
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            padding: 0 !important;
        }
        #pdf-preview-modal .overflow-y-auto { overflow: visible !important; }
    }
</style>
<div id="pdf-preview-modal" class="fixed inset-0 bg-slate-200/95 z-[80] hidden flex flex-col backdrop-blur-sm animate-fade-in">
    <!-- Toolbar -->
    <div class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10 transition-colors">
        <div class="flex items-center gap-4 text-slate-800">
            <div class="bg-red-500 p-1.5 rounded-lg shadow-lg shadow-red-500/20">
                <i data-lucide="file-text" class="w-5 h-5 text-white"></i>
            </div>
            <div>
                <h3 class="font-bold text-sm">PDF Preview</h3>
                <p class="text-[10px] text-slate-400 font-mono" id="pdf-preview-filename">Report.pdf</p>
            </div>
        </div>
        <div class="flex items-center gap-3">
            <button onclick="downloadReportPdf()" class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs transition-colors shadow-lg shadow-red-500/20">
                <i data-lucide="download" class="w-4 h-4"></i>
                Download PDF
            </button>
            <button onclick="printReport()" class="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold text-xs transition-colors">
                <i data-lucide="printer" class="w-4 h-4"></i>
                Print
            </button>
            <div class="w-px h-6 bg-slate-300 mx-2"></div>
            <button onclick="closePdfPreview()" class="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
    </div>

    <!-- Scrollable Area -->
    <div class="flex-1 overflow-y-auto bg-slate-200 p-8 flex justify-center custom-scrollbar">
        <!-- A4 Page Simulator -->
        <div id="pdf-page-container" class="bg-white shadow-xl w-[210mm] min-h-[297mm] p-[10mm] relative section-to-print">
             <div id="pdf-content" class="text-slate-900">
                <!-- Content Injected Here -->
             </div>
             
             <!-- Footer Watermark (Visual Only) -->
             <div class="absolute bottom-4 right-6 text-slate-300 text-[10px] font-bold uppercase tracking-widest pointer-events-none select-none">
                MCare System Generated
             </div>
        </div>
    </div>
</div>
`;

// 1. Initialize Module
window.renderModule10 = async function (container) {
    console.log('[Posture] Initializing Module 10...');
    if (!container) {
        container = document.getElementById('module-content');
    }

    // Inject Create Button into Header Actions
    const actionsContainer = document.getElementById('module-actions');
    if (actionsContainer) {
        actionsContainer.innerHTML = `
        <button onclick="openNewSession()" 
                class="btn-ios btn-ios-primary"
                title="Tạo đánh giá mới">
            <i data-lucide="plus" class="w-5 h-5"></i>
            <span>Tạo đánh giá mới</span>
        </button>
        `;
    }

    if (container) {
        // Inject History View
        container.innerHTML = historyViewTemplate;

        // Append Assessment View (Hidden Overlay)
        // Check if overlay already exists to avoid duplication if re-rendering?
        // Actually renderModuleView clears innerHTML, so we are safe.
        // But the overlay is fixed, so multiple renders might be an issue if we don't clean up?
        // No, container.innerHTML = '' clears it. But wait, overlay is usually appended to body or container?
        // In previous code: container.insertAdjacentHTML('beforeend', assessmentViewTemplate);
        // If container is cleared, overlay is gone. That's fine.

        container.insertAdjacentHTML('beforeend', assessmentViewTemplate);
        container.insertAdjacentHTML('beforeend', measureModalTemplate);
        container.insertAdjacentHTML('beforeend', pdfPreviewModalTemplate);

        // Load History Data
        renderHistoryList();
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
};

// Backwards compatibility
window.initModule10 = window.renderModule10;

// 2. LocalStorage Helpers
function getHistoryKey(patientId) {
    return `mirabocaresync_posture_history_${patientId}`;
}

function getPostureHistory(patientId) {
    try {
        const data = localStorage.getItem(getHistoryKey(patientId));
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Failed to load history', e);
        return [];
    }
}

function savePostureHistory(patientId, history) {
    localStorage.setItem(getHistoryKey(patientId), JSON.stringify(history));
}

// 3. Render History List
function renderHistoryList() {
    const container = document.getElementById('posture-history-container');
    const patientId = getCurrentPatientId();
    const history = getPostureHistory(patientId);

    // Sort by date desc
    history.sort((a, b) => b.timestamp - a.timestamp);

    if (history.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                <div class="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <i data-lucide="camera-off" class="w-12 h-12 text-slate-300"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-600 mb-2">Chưa có dữ liệu đánh giá</h3>
                <p class="text-sm">Nhấn "Tạo đánh giá mới" để bắt đầu phiên phân tích.</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                ${history.map(session => renderHistoryCard(session)).join('')}
            </div>
        `;
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderHistoryCard(session) {
    const date = new Date(session.timestamp);
    const dateStr = date.toLocaleDateString('vi-VN');
    const timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    // Count captures
    const captureCount = Object.values(session.captures).filter(c => c).length;
    const completeness = Math.round((captureCount / 4) * 100);

    // Get thumbnail (prefer Front, then Side)
    let thumb = null;
    if (session.captures.FRONT) thumb = session.captures.FRONT.image;
    else if (session.captures.LEFT) thumb = session.captures.LEFT.image;
    else if (session.captures.RIGHT) thumb = session.captures.RIGHT.image;

    const thumbHtml = thumb
        ? `<img src="${thumb}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">`
        : `<div class="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><i data-lucide="image" class="w-8 h-8"></i></div>`;

    return `
    <div class="bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer"
         onclick="viewReport('${session.id}')">
        <!-- Thumbnail -->
        <div class="h-48 overflow-hidden relative border-b border-slate-50">
            ${thumbHtml}
            <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black tracking-wider flex items-center gap-1">
                <i data-lucide="camera" class="w-3 h-3"></i> ${captureCount}/4
            </div>
        </div>
        
        <!-- Content -->
        <div class="p-5">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="font-bold text-slate-800 text-sm">Phiên đánh giá</h4>
                    <p class="text-xs text-slate-400 font-medium mt-0.5">${dateStr} • ${timeStr}</p>
                </div>
                <button onclick="event.stopPropagation(); deleteSession('${session.id}')" 
                        class="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
            
            <!-- Progress Bar -->
            <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                <div class="bg-blue-600 h-full rounded-full" style="width: ${completeness}%"></div>
            </div>
            
            <div class="flex gap-2">
                <button onclick="event.stopPropagation(); viewReport('${session.id}')" 
                        class="flex-1 py-2.5 bg-slate-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all">
                    Xem
                </button>
                <button onclick="event.stopPropagation(); viewReport('${session.id}', true)" 
                        class="flex-1 py-2.5 bg-slate-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1">
                    <i data-lucide="file-text" class="w-3 h-3"></i> PDF
                </button>
            </div>
        </div>
    </div>
    `;
}

// 4. Session Management

async function openNewSession() {
    // Reset State
    postureState.captures = { FRONT: null, BACK: null, LEFT: null, RIGHT: null };
    postureState.viewMode = 'UNKNOWN';

    // Clear Visuals
    ['FRONT', 'BACK', 'LEFT', 'RIGHT'].forEach(view => updateGallerySlot(view));

    // Show Overlay
    document.getElementById('assessment-overlay').classList.remove('hidden');
    postureState.mode = 'ASSESSMENT';

    // Initialize Camera
    await initPoseTracking();
}

function closeSession() {
    // Direct exit without blocking confirm to ensure reliability
    stopPostureCamera();
    document.getElementById('assessment-overlay').classList.add('hidden');
    postureState.mode = 'HISTORY';
}

function saveSessionToHistory() {
    const hasCaptures = Object.values(postureState.captures).some(c => c !== null);
    if (!hasCaptures) {
        showToast('Capture at least one view to save.', 'warning');
        return;
    }

    const patientId = getCurrentPatientId();
    const session = {
        id: 'sess_' + Date.now(),
        timestamp: Date.now(),
        captures: postureState.captures,
        patientId: patientId
    };

    // Save to History
    const history = getPostureHistory(patientId);
    history.push(session);
    savePostureHistory(patientId, history);

    // Cleanup & Close UI
    stopPostureCamera();
    document.getElementById('assessment-overlay').classList.add('hidden');
    postureState.mode = 'HISTORY';

    showToast('Session saved successfully!', 'success');
    renderHistoryList();
}

function deleteSession(sessionId) {
    if (!confirm('Are you sure you want to delete this session?')) return;

    const patientId = getCurrentPatientId();
    let history = getPostureHistory(patientId);
    history = history.filter(s => s.id !== sessionId);
    savePostureHistory(patientId, history);
    showToast('Session deleted.', 'success');
    renderHistoryList();
}

function viewReport(sessionId, directPdf = false) {
    try {
        const patientId = getCurrentPatientId();
        const history = getPostureHistory(patientId);
        const session = history.find(s => s.id === sessionId);

        if (!session) return;

        // Reuse generate report logic but pass session data instead of global state
        generateReportForSession(session);

        if (directPdf) {
            openPdfPreview();
        }
    } catch (e) {
        console.error('Error generating report:', e);
        showToast('Error generating report: ' + e.message, 'error');
    }
}

function openPdfPreview() {
    const modal = document.getElementById('pdf-preview-modal');
    const contentContainer = document.getElementById('pdf-content');
    const reportContent = document.getElementById('report-content');
    const filenameEl = document.getElementById('pdf-preview-filename');

    // Clone content from main report
    contentContainer.innerHTML = reportContent.innerHTML;

    // Set Filename visual
    const dateStr = new Date().toISOString().split('T')[0];
    filenameEl.textContent = `Posture_Report_${dateStr}.pdf`;

    modal.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closePdfPreview() {
    document.getElementById('pdf-preview-modal').classList.add('hidden');
}

function downloadReportPdf() {
    const element = document.getElementById('pdf-page-container');
    const filename = document.getElementById('pdf-preview-filename').textContent || 'Report.pdf';

    // Premium iOS Style PDF Options
    const opt = {
        margin: [15, 10, 20, 10], // Top, Right, Bottom, Left (mm)
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            letterRendering: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Show loading state
    const btn = document.querySelector('button[onclick="downloadReportPdf()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Downloading...`;

    // Generate PDF with Header & Footer
    element.classList.add('print-mode');
    html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);

            // --- HEADER ---
            pdf.setFontSize(8);
            pdf.setTextColor(100, 116, 139); // Slate-500
            pdf.text('Mirabo CareSync - Posture Assessment Report', 15, 10);

            // Draw Header Line
            pdf.setDrawColor(226, 232, 240); // Slate-200
            pdf.setLineWidth(0.1);
            pdf.line(15, 12, pageWidth - 15, 12);

            // --- FOOTER ---
            pdf.setFontSize(8);
            pdf.setTextColor(148, 163, 184); // Slate-400

            // Page Number
            const pageStr = `Page ${i} of ${totalPages}`;
            pdf.text(pageStr, pageWidth - 25, pageHeight - 10);

            // System Generated Tag
            pdf.text('Generated by Mirabo CareSync System', 15, pageHeight - 10);

            // Draw Footer Line
            pdf.line(15, pageHeight - 14, pageWidth - 15, pageHeight - 14);
        }
    }).save().then(() => {
        element.classList.remove('print-mode');
        btn.innerHTML = originalText;
        lucide.createIcons();
        showToast('PDF downloaded successfully!', 'success');
    }).catch(err => {
        element.classList.remove('print-mode');
        console.error(err);
        btn.innerHTML = originalText;
        lucide.createIcons();
        showToast('Failed to download PDF', 'error');
    });
}

// 5. Shared Logic (Camera, MediaPipe, etc.)

let MP = null; // Store loaded module

async function initPoseTracking() {
    try {
        console.log('[Posture] Loading MediaPipe...');

        // Dynamic import to handle ES Module
        if (!MP) {
            try {
                MP = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/+esm");
                console.log('[Posture] MediaPipe loaded via dynamic import');
            } catch (e) {
                console.warn('[Posture] Failed to load ESM, checking globals...');
                // Fallback to global if exists (though unlikely with this package)
                const globalMP = window.vision || window;
                if (globalMP.FilesetResolver) {
                    MP = globalMP;
                } else {
                    throw new Error('Could not load MediaPipe library. Please check internet connection.');
                }
            }
        }

        if (typeof MP.FilesetResolver === 'undefined' || typeof MP.PoseLandmarker === 'undefined') {
            throw new Error('MediaPipe classes not found in loaded module.');
        }

        if (!postureState.landmarker) {
            const vision = await MP.FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
            );

            postureState.landmarker = await MP.PoseLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/latest/pose_landmarker_heavy.task",
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numPoses: 1,
                minPoseDetectionConfidence: 0.5,
                minPosePresenceConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
        }

        await startPostureCamera();
    } catch (error) {
        console.error(error);
        showToast('Failed to initialize pose tracking: ' + error.message, 'error');
    }
}

async function startPostureCamera() {
    try {
        const video = document.getElementById('posture-video');

        let stream = postureState.videoStream;
        // Check if stream is active
        const isLive = stream && stream.getTracks().some(t => t.readyState === 'live');

        if (isLive) {
            console.log('[Posture] Reusing existing stream (Hot Standby)');
            stream.getTracks().forEach(t => t.enabled = true);
        } else {
            console.log('[Posture] Requesting new stream');
            stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
            });
            postureState.videoStream = stream;
        }

        video.srcObject = stream;

        // Check if video is already ready (reused stream might load instantly)
        if (video.readyState >= 2) {
            predictWebcam();
        } else {
            video.addEventListener('loadeddata', () => {
                predictWebcam();
            }, { once: true });
        }
    } catch (error) {
        console.error(error);
        showToast('Camera access denied or error: ' + error.message, 'error');
    }
}

function stopPostureCamera() {
    // Soft stop: Disable tracks but keep stream alive to preserve permission
    if (postureState.videoStream) {
        postureState.videoStream.getTracks().forEach(track => track.enabled = false);
    }
    cancelAnimationFrame(postureState.animationFrameId);

    // Detach from video to ensure UI is clear
    const video = document.getElementById('posture-video');
    if (video) video.srcObject = null;
}

function predictWebcam() {
    const video = document.getElementById('posture-video');
    const canvas = document.getElementById('posture-canvas');
    if (!video || !canvas || !postureState.landmarker) return;

    const ctx = canvas.getContext('2d');
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    }

    const loop = async () => {
        if (!postureState.videoStream) return;
        const startTimeMs = performance.now();
        const results = postureState.landmarker.detectForVideo(video, startTimeMs);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.landmarks && results.landmarks.length > 0) {
            const landmarks = results.landmarks[0];
            postureState.lastLandmarks = landmarks;

            const detectedView = detectPostureView(landmarks);
            postureState.viewMode = detectedView;
            updateStatusIndicator(detectedView);

            drawPostureOverlay(ctx, landmarks, canvas.width, canvas.height);

            if (!postureState.isCapturing && postureState.countdown === null) {
                handleGestureDetection(landmarks, ctx, canvas.width, canvas.height);
            }
        } else {
            postureState.viewMode = 'UNKNOWN';
            updateStatusIndicator('UNKNOWN');
            postureState.gestureState = { startTime: null, hand: null, triggering: false };
        }

        postureState.animationFrameId = requestAnimationFrame(loop);
    };
    loop();
}

function handleGestureDetection(landmarks, ctx, width, height) {
    const gesture = detectGesture(landmarks);

    if (gesture.detected) {
        const now = Date.now();
        if (!postureState.gestureState.startTime) {
            postureState.gestureState = { startTime: now, hand: gesture.hand, triggering: false };
        } else {
            const elapsed = now - postureState.gestureState.startTime;

            if (elapsed >= GESTURE_DURATION && !postureState.gestureState.triggering) {
                if (now - postureState.lastCaptureTime > 3000) {
                    postureState.gestureState.triggering = true;
                    startCountdown();
                }
            }
            drawGestureProgress(ctx, landmarks, gesture.hand, elapsed, width, height);
        }
    } else {
        postureState.gestureState = { startTime: null, hand: null, triggering: false };
    }
}

function drawGestureProgress(ctx, landmarks, hand, elapsed, width, height) {
    const progress = Math.min(elapsed / GESTURE_DURATION, 1.0);
    const idx = hand === 'LEFT' ? 15 : 16;
    const pt = landmarks[idx];
    if (!pt) return;

    const x = pt.x * width;
    const y = pt.y * height;

    ctx.beginPath();
    ctx.arc(x, y, 40, 0, 2 * Math.PI);
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 40, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * progress));
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#22c55e';
    ctx.stroke();
}

function startCountdown() {
    const overlay = document.getElementById('countdown-overlay');
    const numberEl = document.getElementById('countdown-number');
    postureState.countdown = 3;
    overlay.classList.remove('hidden');
    numberEl.textContent = "3";

    let count = 3;
    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            numberEl.textContent = count;
        } else {
            clearInterval(timer);
            overlay.classList.add('hidden');
            postureState.countdown = null;
            handlePostureCapture();
            postureState.lastCaptureTime = Date.now();
        }
    }, 1000);
}

function updateStatusIndicator(viewMode) {
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('status-text');
    const captureBtn = document.getElementById('capture-btn');
    const hint = document.getElementById('capture-hint');
    const instr = document.getElementById('instruction-overlay');
    const gesture = document.getElementById('gesture-hint');

    if (viewMode === 'UNKNOWN') {
        dot.className = 'w-2.5 h-2.5 rounded-full bg-slate-500';
        text.textContent = 'ADJUST POSITION';
        captureBtn.disabled = true;
        hint.textContent = 'Waiting for pose...';
        instr.classList.remove('hidden');
        gesture.classList.add('hidden');
    } else {
        dot.className = 'w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]';
        text.textContent = `${viewMode} VIEW`;
        captureBtn.disabled = false;
        hint.textContent = 'Tap to Capture';
        instr.classList.add('hidden');
        gesture.classList.remove('hidden');
    }
}

async function handlePostureCapture() {
    if (postureState.viewMode === 'UNKNOWN') return;
    postureState.isCapturing = true;

    try {
        const video = document.getElementById('posture-video');
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        // Explicit Mirror Strategy
        // 1. Mirror the Video Pixels
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        // 2. Prepare Landmarks
        // Since we mirrored the image, we MUST mirror the landmarks so they match the saved image.
        let savedLandmarks = postureState.lastLandmarks;
        if (postureState.lastLandmarks) {
            savedLandmarks = postureState.lastLandmarks.map(lm => ({
                ...lm,
                x: 1 - lm.x, // Flip Horizontal
                visibility: lm.visibility
            }));

            // Draw Overlay using Mirrored Landmarks
            drawPostureOverlay(ctx, savedLandmarks, canvas.width, canvas.height);
        }

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        postureState.captures[postureState.viewMode] = {
            image: dataUrl,
            landmarks: savedLandmarks // Save Mirrored Landmarks!
        };

        updateGallerySlot(postureState.viewMode);
        showToast('Captured!', 'success');

    } catch (e) {
        console.error(e);
    } finally {
        setTimeout(() => postureState.isCapturing = false, 500);
    }
}

function updateGallerySlot(view) {
    const slot = document.getElementById(`${view.toLowerCase()}-slot`);
    const actions = document.getElementById(`${view.toLowerCase()}-actions`);
    const capture = postureState.captures[view];

    if (capture) {
        slot.innerHTML = `<img src="${capture.image}" class="w-full h-full object-cover">`;
        slot.classList.replace('border-slate-700', 'border-green-500');
        actions.classList.remove('hidden');
    } else {
        slot.innerHTML = `
            <div class="text-center">
                <i data-lucide="camera" class="w-6 h-6 text-slate-600 mx-auto mb-2"></i>
                <span class="text-slate-600 text-xs font-bold">Trống</span>
            </div>`;
        slot.classList.replace('border-green-500', 'border-slate-700');
        actions.classList.add('hidden');
    }
}

function clearCapture(view) {
    postureState.captures[view] = null;
    updateGallerySlot(view);
}

function previewCapture(view) {
    const capture = postureState.captures[view];
    if (!capture) return;
    const img = document.getElementById('preview-image');
    img.src = capture.image;
    document.getElementById('image-preview-modal').classList.remove('hidden');
}

function closeImagePreview() {
    document.getElementById('image-preview-modal').classList.add('hidden');
}

// 6. Report Generation
// 6. Report Generation
function generateReportForSession(session) {
    const modal = document.getElementById('report-modal');
    const content = document.getElementById('report-content');
    const dateEl = document.getElementById('report-date');

    dateEl.textContent = new Date(session.timestamp).toLocaleString('vi-VN');
    currentReportSession = session;

    let html = `
    <style>
        .html2pdf__page-break { page-break-before: always; }
        @media print {
            .html2pdf__page-break { page-break-before: always; }
        }
    </style>
    <div class="space-y-6 bg-white p-8" style="font-family: Arial, sans-serif; color: #000; line-height: 1.6;">`;

    // Patient Info - Simple text
    const patient = getPatientById(session.patientId);
    if (patient) {
        html += `
        <div class="mb-6 border-b border-gray-200 pb-4">
            <h1 class="text-2xl font-bold mb-2 uppercase">BÁO CÁO ĐÁNH GIÁ TƯ THẾ</h1>
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
                    <tr class="border-b border-gray-300 bg-gray-50">
                        <th class="text-left py-2 px-2">Góc nhìn</th>
                        <th class="text-center py-2 px-2">Điểm số (Score)</th>
                        <th class="text-right py-2 px-2">Độ lệch (Shifts)</th>
                        <th class="text-right py-2 px-2">Độ nghiêng (Tilts)</th>
                        <th class="text-right py-2 px-2">TL đầu (Head Wt)</th>
                    </tr>
                </thead>
                <tbody>`;

        activeViews.forEach(view => {
            const cap = session.captures[view];
            const metrics = calculatePostureMetrics(cap.landmarks, view, 170, 70);
            const scoreColor = metrics.score >= 80 ? 'text-green-600' : (metrics.score >= 65 ? 'text-yellow-600' : 'text-red-600');
            const headWt = metrics.headWeightAnalysis ? metrics.headWeightAnalysis.effective + ' lbs' : '-';

            html += `
                <tr class="border-b border-gray-100">
                    <td class="py-2 px-2 font-bold">${view}</td>
                    <td class="text-center py-2 px-2 font-black ${scoreColor}">${metrics.score}/100</td>
                    <td class="text-right py-2 px-2">${metrics.totalShifts} in</td>
                    <td class="text-right py-2 px-2">${metrics.totalTilts || '0.0'}°</td>
                    <td class="text-right py-2 px-2 font-bold text-blue-600">${headWt}</td>
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

    const viewMap = {
        'FRONT': 'NHÌN THẲNG',
        'BACK': 'NHÌN SAU',
        'LEFT': 'NHÌN NGHIÊNG (TRÁI)',
        'RIGHT': 'NHÌN NGHIÊNG (PHẢI)'
    };

    ['FRONT', 'BACK', 'LEFT', 'RIGHT'].forEach((view, index) => {
        if (!session.captures[view]) return;

        // Force Page Break
        html += `<div class="html2pdf__page-break"></div>`;

        const cap = session.captures[view];
        const m = calculatePostureMetrics(cap.landmarks, view, 170, 70);

        let narrative = "";
        if (view === 'FRONT') narrative = generateFrontNarrative(m);
        else if (view === 'BACK') narrative = generateBackNarrative(m);
        else narrative = generateSideNarrative(m);

        const scoreColor = m.score >= 80 ? 'text-green-600' : (m.score >= 65 ? 'text-yellow-600' : 'text-red-600');
        const scoreRingColor = m.score >= 80 ? 'border-green-500' : (m.score >= 65 ? 'border-yellow-500' : 'border-red-500');

        // Header for this Page
        html += `
        <div class="border border-gray-400 bg-gray-100 p-3 mb-6 flex justify-between items-end">
             <div>
                <div class="font-bold text-lg">${patient ? patient.fullName : 'N/A'}</div>
                <div class="text-sm text-gray-600">Mã hồ sơ: ${patient ? patient.id : 'N/A'} | Giới tính: ${patient ? (patient.gender === 'male' ? 'Nam' : 'Nữ') : 'N/A'}</div>
             </div>
             <div class="text-xs text-gray-500">Ngày: ${new Date(session.timestamp).toLocaleDateString('vi-VN')}</div>
        </div>
        
        <!-- Image & Title -->
        <div class="flex flex-col items-center mb-6">
            <div class="h-[350px] w-full flex items-center justify-center bg-gray-50 mb-4 border border-gray-200">
                 <img src="${cap.image}" class="h-full object-contain cursor-pointer" onclick="openMeasureModal('${view}')">
            </div>
            <h2 class="text-2xl font-bold uppercase text-slate-800 tracking-wide">${viewMap[view]}</h2>
        </div>

        <!-- Score & Metrics - Table Layout for PDF Safety -->
        <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 32px;">
            <tr>
                <!-- Left: Score Circle -->
                <td style="width: 35%; vertical-align: middle; text-align: center; padding-right: 20px;">
                    <div style="position: relative; width: 160px; height: 160px; margin: 0 auto;">
                        <svg class="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="#f3f4f6" stroke-width="8" fill="none" />
                            <circle cx="80" cy="80" r="70" stroke="${m.score >= 80 ? '#22c55e' : (m.score >= 65 ? '#eab308' : '#ef4444')}" 
                                    stroke-width="8" fill="none"
                                    stroke-dasharray="440" 
                                    stroke-dashoffset="440"
                                    class="score-progress-circle"
                                    data-target="${440 - (440 * m.score / 100)}"
                            />
                        </svg>
                        <div class="absolute inset-0 flex flex-col items-center justify-center">
                            <div class="text-xs font-bold text-red-700 uppercase mb-1">Posture Score</div>
                            <div class="text-5xl font-black ${scoreColor}">${m.score}</div>
                        </div>
                    </div>
                </td>
                
                <!-- Right: Metrics Box -->
                <td style="width: 65%; vertical-align: middle;">
                    <div class="bg-gray-100 p-6 rounded border border-gray-200">
                        ${(view === 'LEFT' || view === 'RIGHT') && m.headWeightAnalysis ? `
                        <div class="mb-4 p-3 border border-blue-100 bg-blue-50 rounded">
                             <div class="flex justify-between items-center">
                                <span class="font-bold text-sm text-blue-900 uppercase">Trọng lượng đầu</span>
                                <span class="font-black text-2xl text-blue-700">${m.headWeightAnalysis.effective} <span class="text-xs font-normal text-gray-500">lbs</span></span>
                             </div>
                             <div class="text-xs text-blue-400 mt-1">Độ lệch: ${m.headWeightAnalysis.shift} inches</div>
                        </div>` : ''}

                        <h3 class="font-bold text-base text-slate-700 mb-3 border-b border-gray-300 pb-2">Chỉ số đo lường</h3>
                        <ul class="space-y-2 text-sm text-slate-700">`;

        m.details.forEach(d => {
            html += `<li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0"></span>
                <span>${d.text}</span>
            </li>`;
        });

        html += `   </ul>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Expert Assessment -->
        <div class="bg-[#fcf8e3] p-6 rounded border border-[#faebcc] flex gap-4 mb-4">
             <div class="shrink-0 pt-1">
                 <div class="w-10 h-10 bg-slate-700 rounded text-white flex items-center justify-center">
                    <i data-lucide="user" class="w-6 h-6"></i>
                 </div>
             </div>
             <div>
                 <h3 class="font-bold text-base text-slate-800 mb-1">Đánh giá chuyên gia</h3>
                 <p class="text-sm text-justify text-slate-800 italic leading-relaxed">
                    "${narrative}"
                 </p>
             </div>
        </div>
        
        <!-- Page Footer Spacer -->
        <div class="mt-auto pt-4 border-t border-gray-200 text-xs text-gray-400 flex justify-between">
            <span>Mirabo CareSync System</span>
            <span>Page View Analysis</span>
        </div>`;
    });

    html += `</div>`; // Close Section II

    // Section III - Advanced Analysis
    const hasLegs = frontMetrics && frontMetrics.legAnalysis;
    const hasKneeNeck = sideMetrics && (sideMetrics.kneeAnalysis || sideMetrics.neckAnalysis);

    if (hasLegs || hasKneeNeck) {
        html += `<div class="html2pdf__page-break"></div>`;
        html += `<div class="mb-8"><h2 class="text-xl font-bold mb-3 pb-2 border-b border-gray-300">III. CHỈ SỐ CHUYÊN SÂU</h2>`;

        // 1. Leg Inclination Analysis (Front View)
        if (hasLegs) {
            const legStatus = getLegStatus(frontMetrics);
            const legNarrative = generateLegNarrative(frontMetrics);
            const { kneeDist, ankleDist } = frontMetrics.legAnalysis;

            const legStatusLabel = legStatus === 'NORMAL' ? 'Bình thường' : (legStatus === 'O_LEGS' ? 'Chân vòng kiềng (O-Legs)' : 'Chân chữ X (X-Legs)');

            // Select illustration for leg inclination
            let legIllustration = 'docs/assets/normal-legs.png';
            if (legStatus === 'O_LEGS') legIllustration = 'docs/assets/o-leg.png';
            if (legStatus === 'X_LEGS') legIllustration = 'docs/assets/x-legs.png';

            html += `
            <div class="mb-6 p-4 border border-gray-200 bg-gray-50">
                <h3 class="font-bold mb-4 text-indigo-900">1. HÌNH DÁNG CHÂN (LEG INCLINATION)</h3>
                <div class="flex gap-6">
                    <!-- Left: Illustration -->
                    <div class="w-1/3 shrink-0 flex flex-col items-center justify-center bg-white border border-gray-100 rounded p-2 self-start">
                        <img src="${legIllustration}" class="w-full h-auto object-contain">
                    </div>
                    
                    <!-- Right: Info -->
                    <div class="flex-1">
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 uppercase font-bold mb-2">Thông số đo lường</p>
                            <div class="grid grid-cols-2 gap-2 bg-white p-3 rounded border border-gray-100 text-center">
                                <div>
                                    <span class="block text-[10px] text-gray-400 uppercase">Khoảng cách Gối</span>
                                    <span class="font-bold text-gray-800">${kneeDist} in</span>
                                </div>
                                <div>
                                    <span class="block text-[10px] text-gray-400 uppercase">Khoảng cách Mắt cá</span>
                                    <span class="font-bold text-gray-800">${ankleDist} in</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p class="text-xs text-gray-500 uppercase font-bold mb-2">Kết luận</p>
                            <div class="mb-2">
                                <span class="font-bold text-gray-800 mr-2">• Hình dáng:</span> ${legStatusLabel}
                            </div>
                            <p class="text-sm text-justify text-gray-600 border-t border-gray-200 pt-2 italic">
                                ${legNarrative}
                            </p>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        // 2. Knee Alignment Analysis (Side View)
        if (sideMetrics && sideMetrics.kneeAnalysis) {
            const kneeStatus = getKneeFlexionStatus(sideMetrics);
            const kneeNarrative = generateKneeFlexionNarrative(sideMetrics);
            const { angle } = sideMetrics.kneeAnalysis;

            const kneeStatusLabel = kneeStatus === 'NORMAL' ? 'Bình thường' : (kneeStatus === 'FLEXION' ? 'Cong gối' : 'Duỗi quá mức (Genu Recurvatum)');

            // Select illustration for knee alignment
            let kneeIllustration = 'docs/assets/neutral.png';
            if (kneeStatus === 'HYPEREXTENSION') kneeIllustration = 'docs/assets/genu-recurvatum.png';

            html += `
            <div class="mb-6 p-4 border border-gray-200 bg-gray-50">
                <h3 class="font-bold mb-4 text-indigo-900">2. THẲNG HÀNG ĐẦU GỐI (KNEE ALIGNMENT)</h3>
                <div class="flex gap-6">
                    <!-- Left: Illustration -->
                    <div class="w-1/3 shrink-0 flex flex-col items-center justify-center bg-white border border-gray-100 rounded p-2 self-start">
                        <img src="${kneeIllustration}" class="w-full h-auto object-contain">
                    </div>
                    
                    <!-- Right: Info -->
                    <div class="flex-1">
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 uppercase font-bold mb-2">Thông số đo lường</p>
                            <div class="bg-white p-3 rounded border border-gray-100 text-center">
                                <span class="block text-[10px] text-gray-400 uppercase">Góc đầu gối</span>
                                <span class="font-bold text-gray-800 text-xl">${angle}°</span>
                            </div>
                        </div>

                        <div>
                            <p class="text-xs text-gray-500 uppercase font-bold mb-2">Kết luận</p>
                            <div class="mb-2">
                                <span class="font-bold text-gray-800 mr-2">• Khớp gối:</span> ${kneeStatusLabel}
                            </div>
                            <p class="text-sm text-justify text-gray-600 border-t border-gray-200 pt-2 italic">
                                ${kneeNarrative}
                            </p>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        // Neck Analysis (Updated with Image)
        if (sideMetrics && sideMetrics.neckAnalysis) {
            const neckStatus = getNeckInclinationStatus(sideMetrics);
            const neckNarrative = generateNeckInclinationNarrative(sideMetrics);
            const { angle } = sideMetrics.neckAnalysis;

            // Select Image
            let neckImg = 'docs/assets/neck-none-inclination.png';
            if (neckStatus !== 'NORMAL') neckImg = 'docs/assets/neck-inclination.png';

            html += `
            <div class="mb-6 p-4 border border-gray-200 bg-gray-50">
                <h3 class="font-bold mb-4 text-indigo-900">3. ĐỘ NGHIÊNG CỔ (NECK INCLINATION)</h3>
                <div class="flex gap-6">
                    <!-- Left: Illustration -->
                     <div class="w-1/3 shrink-0 flex flex-col items-center justify-center bg-white border border-gray-100 rounded p-2 self-start">
                        <img src="${neckImg}" class="w-full h-auto object-contain">
                    </div>

                    <!-- Right: Info -->
                    <div class="flex-1">
                        <div class="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                 <p class="text-xs text-gray-500 uppercase">Kết luận</p>
                                 <p class="font-bold text-lg">${neckStatus === 'NORMAL' ? 'Bình thường' : 'Nghiêng trước'}</p>
                            </div>
                            <div>
                                 <p class="text-xs text-gray-500 uppercase">Góc đo</p>
                                 <p class="text-lg font-black">${angle}°</p>
                            </div>
                        </div>
                        <p class="text-sm text-justify text-gray-600 border-t border-gray-200 pt-2">${neckNarrative}</p>
                    </div>
                </div>
            </div>`;
        }



        html += `</div > `; // Close Section III
    }

    html += '</div>';
    content.innerHTML = html;
    modal.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Trigger Animations
    setTimeout(() => {
        const circles = content.querySelectorAll('.score-progress-circle');
        circles.forEach(c => {
            c.style.strokeDashoffset = c.dataset.target;
        });
    }, 100);
}


function closePostureReport() {
    document.getElementById('report-modal').classList.add('hidden');
}

function printReport() {
    window.print();
}

/**
 * Measure Modal Logic
 */
// Current session data for modal access
let currentReportSession = null;

function openMeasureModal(view) {
    if (!currentReportSession) return;

    // Find capture
    const session = currentReportSession;
    const capture = session.captures[view];
    if (!capture) return;

    const modal = document.getElementById('measure-modal');
    const img = document.getElementById('measure-modal-img');
    const canvas = document.getElementById('measure-modal-canvas');
    if (!modal || !img || !canvas) return;

    // Reset Canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set Image
    img.src = capture.image;
    modal.classList.remove('hidden');

    // Wait for image load to size canvas
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height; // Align canvas exactly to image intrinsic size

        // Calculate and Draw
        // Use default height/weight if not found (or should we store in session?) 
        // Session doesn't store H/W, so using defaults 170/70 or from Patient ID if complex.
        // For visual overlay, scale handles it, actual physical value depends on inputs but relative math holds.
        const metrics = calculatePostureMetrics(capture.landmarks, view, 170, 70);

        if (metrics && metrics.visuals) {
            drawMeasurementVisuals(ctx, metrics.visuals, canvas.width, canvas.height);
        }
    };
}

function closeMeasureModal() {
    document.getElementById('measure-modal').classList.add('hidden');
}

/**
 * PDF Logic
 */
function openPdfPreview() {
    const reportContent = document.getElementById('report-content').innerHTML;
    const pdfContent = document.getElementById('pdf-content');

    // Inject content
    pdfContent.innerHTML = reportContent;

    // Show Modal
    document.getElementById('pdf-preview-modal').classList.remove('hidden');
}

function closePdfPreview() {
    document.getElementById('pdf-preview-modal').classList.add('hidden');
}

function downloadReportPdf() {
    const element = document.getElementById('pdf-page-container');
    const opt = {
        margin: 0,
        filename: `PostureReport_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 1.5, useCORS: true, logging: true, allowTaint: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Check if html2pdf is loaded
    if (typeof html2pdf === 'undefined') {
        alert('PDF Library not loaded. Please contact support.');
        return;
    }

    const btn = document.querySelector('button[onclick="downloadReportPdf()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Generating...';
    btn.disabled = true;
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Use SetTimeout to allow UI update
    setTimeout(() => {
        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }).catch(err => {
            console.error('PDF Gen Error:', err);
            alert('Failed to generate PDF. Please try again or print to PDF using the Print button.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    }, 100);
}

// Cleanup
window.addEventListener('beforeunload', stopPostureCamera);
