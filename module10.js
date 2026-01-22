// Module 10: Posture Screen Analysis
// Vietnamese Localized
// Refactored for History & Fullscreen Mode

// --- HTML Templates ---

// 1. History View (Default)
const historyViewTemplate = `
<div class="h-screen flex flex-col bg-slate-50">
    <!-- Header -->
    <div class="px-8 py-6 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm z-10">
        <div class="flex items-center gap-4">
            <button onclick="loadModule('home')" class="text-slate-400 hover:text-slate-800 transition-colors">
                <i data-lucide="arrow-left" class="w-6 h-6"></i>
            </button>
            <div class="w-px h-8 bg-slate-200"></div>
            <div>
                <h1 class="text-2xl font-black text-slate-900 tracking-tight">Posture Screen Analysis</h1>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Lịch sử đánh giá</p>
            </div>
        </div>
        
        <button onclick="openNewSession()" 
                class="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 transform hover:scale-105">
            <i data-lucide="plus-circle" class="w-5 h-5"></i>
            Tạo đánh giá mới (New Session)
        </button>
    </div>

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

// 2. Fullscreen Assessment View (Overlay)
const assessmentViewTemplate = `
<div id="assessment-overlay" class="fixed inset-0 z-50 bg-slate-900 flex flex-col hidden animate-fade-in">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-slate-700 bg-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-4">
            <button onclick="closeSession()" class="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <i data-lucide="x" class="w-5 h-5"></i>
                <span class="font-semibold">Exit</span>
            </button>
            <div class="w-px h-6 bg-slate-600"></div>
            <h1 class="text-lg font-bold text-white">New Assessment Session</h1>
        </div>
        
        <div class="flex items-center gap-4">
            <!-- Status Indicator -->
            <div id="posture-status" class="flex items-center gap-3 bg-slate-900 px-4 py-1.5 rounded-full border border-slate-600">
                <div id="status-dot" class="w-2.5 h-2.5 rounded-full bg-slate-500"></div>
                <span id="status-text" class="text-white font-semibold text-xs">ADJUST POSITION</span>
            </div>
            
            <button onclick="saveSessionToHistory()" 
                    class="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors">
                <i data-lucide="save" class="w-4 h-4"></i>
                Save & Finish
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
                <button onclick="printReport()" class="p-3 hover:bg-slate-100 rounded-xl transition-colors text-slate-600" title="Print">
                   <i data-lucide="printer" class="w-6 h-6"></i>
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

// --- Logic ---

const postureState = {
    mode: 'HISTORY', // HISTORY | ASSESSMENT
    viewMode: 'UNKNOWN',
    captures: { FRONT: null, BACK: null, LEFT: null, RIGHT: null },
    isCapturing: false,
    countdown: null,
    landmarker: null,
    videoStream: null,
    lastLandmarks: null,
    gestureState: { startTime: null, hand: null, triggering: false },
    lastCaptureTime: 0,
    animationFrameId: null
};

const GESTURE_DURATION = 1000;

// 1. Initialize Module
window.renderModule10 = async function (container) {
    console.log('[Posture] Initializing Module 10...');
    if (!container) {
        container = document.getElementById('module-content');
    }

    if (container) {
        // Inject History View
        container.innerHTML = historyViewTemplate;

        // Append Assessment View (Hidden Overlay)
        container.insertAdjacentHTML('beforeend', assessmentViewTemplate);
        container.insertAdjacentHTML('beforeend', measureModalTemplate);

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
            
            <button class="w-full py-2.5 bg-slate-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all">
                Xem Báo cáo
            </button>
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
    if (confirm('Exit assessment? Unsaved data will be lost.')) {
        stopPostureCamera();
        document.getElementById('assessment-overlay').classList.add('hidden');
        postureState.mode = 'HISTORY';
    }
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

function viewReport(sessionId) {
    const patientId = getCurrentPatientId();
    const history = getPostureHistory(patientId);
    const session = history.find(s => s.id === sessionId);

    if (!session) return;

    // Reuse generate report logic but pass session data instead of global state
    generateReportForSession(session);
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
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
        });

        video.srcObject = stream;
        postureState.videoStream = stream;

        video.addEventListener('loadeddata', () => {
            predictWebcam();
        });
    } catch (error) {
        showToast('Camera access denied', 'error');
    }
}

function stopPostureCamera() {
    if (postureState.videoStream) {
        postureState.videoStream.getTracks().forEach(track => track.stop());
        postureState.videoStream = null;
    }
    cancelAnimationFrame(postureState.animationFrameId);
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
function generateReportForSession(session) {
    const modal = document.getElementById('report-modal');
    const content = document.getElementById('report-content');
    const dateEl = document.getElementById('report-date');


    dateEl.textContent = new Date(session.timestamp).toLocaleString('vi-VN');

    // Save current session for modal access
    currentReportSession = session;

    let html = '<div class="space-y-8">';

    // Patient Info
    const patient = getPatientById(session.patientId);
    if (patient) {
        html += `
        <div class="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 flex gap-6 items-center">
            <div class="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black text-2xl">
                ${patient.fullName.charAt(0)}
            </div>
            <div>
                <h3 class="font-bold text-lg text-slate-800">${patient.fullName}</h3>
                <p class="text-sm text-slate-500">ID: ${patient.id} • ${patient.gender === 'male' ? 'Nam' : 'Nữ'}</p>
            </div>
        </div>`;
    }

    // 1. OVERALL MEDICAL SUMMARY (New Section)
    const frontCap = session.captures['FRONT'];
    const backCap = session.captures['BACK'];
    const leftCap = session.captures['LEFT'];
    const rightCap = session.captures['RIGHT'];

    // Calculate metrics for narrative generation
    const frontMetrics = frontCap ? calculatePostureMetrics(frontCap.landmarks, 'FRONT', 170, 70) : null;
    const backMetrics = backCap ? calculatePostureMetrics(backCap.landmarks, 'BACK', 170, 70) : null;
    let sideMetrics = null;
    if (rightCap) sideMetrics = calculatePostureMetrics(rightCap.landmarks, 'RIGHT', 170, 70);
    else if (leftCap) sideMetrics = calculatePostureMetrics(leftCap.landmarks, 'LEFT', 170, 70);

    const overallNarrative = generateOverallSummary(frontMetrics, backMetrics, sideMetrics);

    html += `
    <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 class="text-xl font-bold text-blue-800 mb-2">Tóm tắt tổng quan (Overall Summary)</h2>
        <p class="text-slate-700 leading-relaxed text-justify">
            ${overallNarrative}
        </p>
    </div>
    `;

    // 2. Posture Index Summary (Grid 2x2)
    const views = ['FRONT', 'BACK', 'LEFT', 'RIGHT'].filter(v => session.captures[v] && session.captures[v].landmarks);
    if (views.length > 0) {
        html += '<div><h2 class="text-2xl font-bold text-slate-800 mb-4">Tóm tắt Chỉ số (Metrics Summary)</h2>';
        html += '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';

        views.forEach(view => {
            const cap = session.captures[view];
            const metrics = calculatePostureMetrics(cap.landmarks, view, 170, 70);

            html += `
            <div class="border-2 border-blue-500 rounded-lg overflow-hidden">
                <div class="bg-blue-500 text-white px-4 py-2 text-center font-bold text-sm">
                    Chỉ số Tư thế®: Góc nhìn ${view}
                </div>
                <div class="bg-blue-600 text-white flex border-b border-blue-300">
                    <div class="flex-1 px-3 py-2 border-r border-blue-300 text-sm font-semibold">Tổng độ lệch (Total Shifts)</div>
                    <div class="w-24 px-3 py-2 text-center bg-white text-black font-bold">${metrics.totalShifts} in</div>
                </div>
                <div class="bg-blue-600 text-white flex">
                    <div class="flex-1 px-3 py-2 border-r border-blue-300 text-sm font-semibold">Tổng độ nghiêng (Total Tilts)</div>
                    <div class="w-24 px-3 py-2 text-center bg-white text-black font-bold">${metrics.totalTilts || '0.0'}°</div>
                </div>
            </div>`;
        });

        html += '</div></div>';

        // 2b. Head Weight Summary (Max from Side Views)
        let maxHeadWeight = 0;
        let maxHeadWeightSide = '';

        ['LEFT', 'RIGHT'].forEach(side => {
            if (session.captures[side]) {
                const m = calculatePostureMetrics(session.captures[side].landmarks, side, 170, 70);
                if (m && m.headWeightAnalysis) {
                    const val = parseFloat(m.headWeightAnalysis.effective);
                    if (val > maxHeadWeight) {
                        maxHeadWeight = val;
                        maxHeadWeightSide = side;
                    }
                }
            }
        });

        if (maxHeadWeight > 0) {
            html += `
            <div class="mt-4 flex justify-center">
                <div class="border-2 border-sky-500 rounded-lg overflow-hidden max-w-md w-full">
                    <div class="bg-sky-500 text-white px-4 py-2 text-center font-bold text-sm">
                        Trọng lượng đầu hiệu dụng (Effective Head Weight)
                    </div>
                    <div class="bg-sky-600 text-white flex items-center justify-center px-4 py-3">
                        <span class="bg-white text-black font-black px-4 py-2 rounded-lg text-xl">${maxHeadWeight.toFixed(1)} lbs</span>
                    </div>
                </div>
            </div>`;
        }
    }

    // 3. DETAILED ANALYSIS
    if (views.length > 0) {
        html += '<div><h2 class="text-2xl font-bold text-slate-800 mb-4">Chi tiết Phân tích (Detailed Analysis)</h2>';
        html += '<div class="space-y-6">';

        views.forEach(view => {
            const cap = session.captures[view];
            const metrics = calculatePostureMetrics(cap.landmarks, view, 170, 70);
            const title = `${view.charAt(0) + view.slice(1).toLowerCase()} View`;

            html += `
            <div class="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <div class="bg-blue-500 text-white px-4 py-3 font-bold text-base">
                    ${title}
                </div>
                
                <div class="grid md:grid-cols-2 gap-6 p-6">
                    <!-- Left: Image -->
                    <div class="flex flex-col group relative cursor-pointer" onclick="openMeasureModal('${view}')">
                        <img src="${cap.image}" class="w-full rounded-lg shadow-md transition-transform group-hover:scale-[1.01]">
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                            <div class="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 backdrop-blur-sm scale-90 group-hover:scale-100 duration-200">
                                <i data-lucide="maximize-2" class="w-3 h-3"></i>
                                Click để xem chi tiết đo lường
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right: Analysis -->
                    <div class="flex flex-col space-y-4">`;

            // Head Weight Analysis for Side Views
            if ((view === 'LEFT' || view === 'RIGHT') && metrics.headWeightAnalysis) {
                html += `
                        <div class="bg-sky-50 border border-sky-200 rounded-lg p-4">
                            <div class="font-bold text-blue-700 mb-1 text-sm">Trọng lượng đầu hiệu dụng (Effective Head Weight)</div>
                            <div class="text-3xl font-black text-blue-600">${metrics.headWeightAnalysis.effective} lbs</div>
                            <div class="text-xs text-slate-600 mt-1">
                                Bình thường: ${metrics.headWeightAnalysis.base} lbs (Lệch: ${metrics.headWeightAnalysis.shift} in)
                            </div>
                        </div>`;
            }

            // Generate Narrative based on View
            let narrative = "";
            let status = "good"; // For coloring

            if (view === 'FRONT') {
                narrative = generateFrontNarrative(metrics);
                status = getFrontViewStatus(metrics) === 'BALANCED' ? 'good' : 'fair';
            } else if (view === 'BACK') {
                narrative = generateBackNarrative(metrics);
                status = getBackViewStatus(metrics) === 'SYMMETRICAL_ALIGNMENT' ? 'good' : 'fair';
            } else {
                narrative = generateSideNarrative(metrics);
                status = getSideViewStatus(metrics) === 'NEUTRAL' ? 'good' : (getSideViewStatus(metrics) === 'MILD_FHP' ? 'fair' : 'poor');
            }

            const statusColors = {
                good: 'bg-green-50 border-green-200 text-green-800',
                fair: 'bg-yellow-50 border-yellow-200 text-yellow-800',
                poor: 'bg-red-50 border-red-200 text-red-800'
            };
            const statusColor = statusColors[status] || statusColors.fair;

            html += `
                    <div class="${statusColor} border rounded-lg p-4">
                        <div class="font-bold text-sm mb-2">Đánh giá chung (General Assessment)</div>
                        <div class="text-sm text-justify leading-relaxed">${narrative}</div>
                    </div>`;

            // Details List
            html += '<div class="border border-slate-200 rounded-lg overflow-hidden">';
            metrics.details.forEach((detail, i) => {
                const bgClass = i % 2 === 0 ? 'bg-white' : 'bg-slate-50';
                html += `
                        <div class="${bgClass} px-3 py-2 ${i < metrics.details.length - 1 ? 'border-b border-slate-100' : ''} text-xs text-slate-700">
                            ${detail.text}
                        </div>`;
            });
            html += `
                        </div>
                    </div>
                </div>
            </div>`;
        });

        html += '</div></div>';
    }

    // 4. LEG ANALYSIS (X/O Legs)
    if (frontMetrics && frontMetrics.legAnalysis) {
        const legStatus = getLegStatus(frontMetrics);
        const legNarrative = generateLegNarrative(frontMetrics);
        const { kneeDist, ankleDist } = frontMetrics.legAnalysis;

        let statusColor = 'bg-green-50 border-green-200 text-green-800';
        if (legStatus === 'O_LEGS' || legStatus === 'X_LEGS') statusColor = 'bg-yellow-50 border-yellow-200 text-yellow-800';

        html += `
        <div>
            <h2 class="text-2xl font-bold text-slate-800 mb-4">Đánh giá Hình dáng Chân (Leg Alignment)</h2>
            <div class="${statusColor} border rounded-xl p-6">
                 <div class="flex flex-col md:flex-row gap-6 items-center">
                    <div class="flex-1">
                        <div class="font-bold text-lg mb-2">Kết quả phân tích: ${legStatus === 'NORMAL' ? 'Bình thường' : (legStatus === 'O_LEGS' ? 'Chân vòng kiềng (O-Legs)' : 'Chân chữ X (X-Legs)')}</div>
                        <p class="text-slate-700 leading-relaxed text-justify mb-4">
                            ${legNarrative}
                        </p>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div class="bg-white p-3 rounded border border-slate-200">
                                <span class="block text-slate-500 text-xs">Khoảng cách đầu gối (Knee Dist)</span>
                                <span class="font-bold text-slate-800">${kneeDist} in</span>
                            </div>
                            <div class="bg-white p-3 rounded border border-slate-200">
                                <span class="block text-slate-500 text-xs">Khoảng cách mắt cá (Ankle Dist)</span>
                                <span class="font-bold text-slate-800">${ankleDist} in</span>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
        `;
    }

    // 5. KNEE & NECK ANALYSIS (Side View)
    if (sideMetrics) {
        // Knee Flexion
        if (sideMetrics.kneeAnalysis) {
            const kneeStatus = getKneeFlexionStatus(sideMetrics);
            const kneeNarrative = generateKneeFlexionNarrative(sideMetrics);
            const { angle } = sideMetrics.kneeAnalysis;

            let statusColor = 'bg-green-50 border-green-200 text-green-800';
            if (kneeStatus !== 'NORMAL') statusColor = 'bg-yellow-50 border-yellow-200 text-yellow-800';

            html += `
            <div>
                <h2 class="text-2xl font-bold text-slate-800 mb-4">Đánh giá Độ cong Đầu gối (Knee Flexion)</h2>
                <div class="${statusColor} border rounded-xl p-6">
                    <div class="flex flex-col md:flex-row gap-6 items-center">
                        <div class="flex-1">
                            <div class="font-bold text-lg mb-2">Kết quả phân tích: ${kneeStatus === 'NORMAL' ? 'Bình thường' : (kneeStatus === 'FLEXION' ? 'Cong gối (Flexion)' : 'Duỗi quá mức (Hyperextension)')}</div>
                            <p class="text-slate-700 leading-relaxed text-justify mb-4">
                                ${kneeNarrative}
                            </p>
                            <div class="bg-white p-3 rounded border border-slate-200 inline-block">
                                <span class="block text-slate-500 text-xs">Góc đầu gối (Knee Angle)</span>
                                <span class="font-bold text-slate-800">${angle}°</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        // Neck Inclination
        if (sideMetrics.neckAnalysis) {
            const neckStatus = getNeckInclinationStatus(sideMetrics);
            const neckNarrative = generateNeckInclinationNarrative(sideMetrics);
            const { angle } = sideMetrics.neckAnalysis;

            let statusColor = 'bg-green-50 border-green-200 text-green-800';
            if (neckStatus !== 'NORMAL') statusColor = 'bg-yellow-50 border-yellow-200 text-yellow-800';

            html += `
            <div class="mt-8">
                <h2 class="text-2xl font-bold text-slate-800 mb-4">Đánh giá Độ nghiêng Cổ (Neck Inclination)</h2>
                <div class="${statusColor} border rounded-xl p-6">
                    <div class="flex flex-col md:flex-row gap-6 items-center">
                        <div class="flex-1">
                            <div class="font-bold text-lg mb-2">Kết quả phân tích: ${neckStatus === 'NORMAL' ? 'Bình thường' : 'Nghiêng trước (Forward Inclination)'}</div>
                            <p class="text-slate-700 leading-relaxed text-justify mb-4">
                                ${neckNarrative}
                            </p>
                            <div class="bg-white p-3 rounded border border-slate-200 inline-block">
                                <span class="block text-slate-500 text-xs">Góc nghiêng cổ (Neck Angle)</span>
                                <span class="font-bold text-slate-800">${angle}°</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    }

    html += '</div>';
    content.innerHTML = html;
    modal.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
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

// Cleanup
window.addEventListener('beforeunload', stopPostureCamera);
