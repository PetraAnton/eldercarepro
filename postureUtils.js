/**
 * postureUtils.js
 * Utilities for Posture Analysis
 * Vanilla JS version for ElderCarePro
 */

/**
 * Detect if user is in Front or Side view
 * @param {Array} landmarks - MediaPipe landmarks
 * @returns {String} 'FRONT' | 'BACK' | 'LEFT' | 'RIGHT' | 'UNKNOWN'
 */
function detectPostureView(landmarks) {
    if (!landmarks || landmarks.length < 33) return 'UNKNOWN';

    const lShoulder = landmarks[11];
    const rShoulder = landmarks[12];
    const lHip = landmarks[23];
    const rHip = landmarks[24];
    const nose = landmarks[0];

    // Check basic presence
    if ((lShoulder.visibility || 0) < 0.5 || (rShoulder.visibility || 0) < 0.5) return 'UNKNOWN';

    // 1. Determine if Side View or Front/Back View using RATIO (Scale Invariant)
    const shoulderWidth = Math.abs(lShoulder.x - rShoulder.x);
    const avgShoulderY = (lShoulder.y + rShoulder.y) / 2;
    const avgHipY = (lHip.y + rHip.y) / 2;
    const trunkHeight = Math.abs(avgHipY - avgShoulderY);

    if (trunkHeight < 0.05) return 'UNKNOWN';

    const ratio = shoulderWidth / trunkHeight;
    const isSideView = ratio < 0.35;

    if (isSideView) {
        // Distinguish LEFT vs RIGHT Side (using Z depth)
        if (lShoulder.z < rShoulder.z) {
            return 'LEFT';
        } else {
            return 'RIGHT';
        }
    } else {
        // Distinguish FRONT vs BACK
        const faceLandmarks = [landmarks[0], landmarks[2], landmarks[5], landmarks[9], landmarks[10]];
        const avgFaceVisibility = faceLandmarks.reduce((acc, l) => acc + (l.visibility || 0), 0) / faceLandmarks.length;

        const noseZ = landmarks[0].z;
        const avgEarZ = (landmarks[7].z + landmarks[8].z) / 2;
        const isNoseCloser = noseZ < avgEarZ;

        if (avgFaceVisibility > 0.70 && isNoseCloser) {
            return 'FRONT';
        } else {
            return 'BACK';
        }
    }
}

/**
 * Calculate critical posture points
 * @param {Array} landmarks - MediaPipe landmarks
 * @param {String} view - View mode
 * @returns {Object} Key points for the view
 */
function calculatePostureKeyPoints(landmarks, view) {
    if (!landmarks) return null;

    if (view === 'FRONT' || view === 'BACK') {
        const leftAnkle = landmarks[27];
        const rightAnkle = landmarks[28];
        const leftKnee = landmarks[25];
        const rightKnee = landmarks[26];
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftEye = landmarks[2];
        const rightEye = landmarks[5];
        const mouthLeft = landmarks[9];
        const mouthRight = landmarks[10];
        const mouthCenter = midPoint(mouthLeft, mouthRight);
        const nose = landmarks[0];
        const leftEar = landmarks[7];
        const rightEar = landmarks[8];

        const midAnkle = midPoint(leftAnkle, rightAnkle);
        const midKnee = midPoint(leftKnee, rightKnee);
        const midHip = midPoint(leftHip, rightHip);

        const chestLeft = lerpPoint(leftShoulder, leftHip, 0.2);
        const chestRight = lerpPoint(rightShoulder, rightHip, 0.2);
        const ribcageCenter = midPoint(chestLeft, chestRight);

        const midShoulder = midPoint(leftShoulder, rightShoulder);

        let midEye = nose;
        let eyesArr = [leftEye, rightEye];

        if (view === 'BACK') {
            midEye = midPoint(leftEar, rightEar);
            eyesArr = [leftEar, rightEar];
        }

        return {
            midAnkle, midKnee, midHip, ribcageCenter, midShoulder,
            mouth: mouthCenter, midEye,
            ankles: [leftAnkle, rightAnkle],
            knees: [leftKnee, rightKnee],
            hips: [leftHip, rightHip],
            shoulders: [leftShoulder, rightShoulder],
            eyes: eyesArr,
            chestLine: [chestLeft, chestRight]
        };
    }
    else if (view === 'SIDE' || view === 'LEFT' || view === 'RIGHT') {
        let isLeft = (view === 'LEFT');
        if (view === 'SIDE') {
            const lVis = (landmarks[11]?.visibility || 0);
            const rVis = (landmarks[12]?.visibility || 0);
            isLeft = lVis > rVis;
        }

        const offset = isLeft ? 0 : 1;

        return {
            ankle: landmarks[27 + offset],
            knee: landmarks[25 + offset],
            hip: landmarks[23 + offset],
            shoulder: landmarks[11 + offset],
            ear: landmarks[7 + offset],
            nose: landmarks[0],
            side: isLeft ? 'Left' : 'Right'
        };
    }
    return null;
}

/**
 * Main Drawing Function for Posture Overlay
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} landmarks - MediaPipe landmarks
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @returns {String} Detected view mode
 */
function drawPostureOverlay(ctx, landmarks, width, height) {
    const view = detectPostureView(landmarks);
    if (view === 'UNKNOWN') return;

    const points = calculatePostureKeyPoints(landmarks, view);
    if (!points) return;

    const toPixel = (pt) => ({ x: pt.x * width, y: pt.y * height });

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (view === 'FRONT' || view === 'BACK') {
        const { midAnkle, midKnee, midHip, ribcageCenter, midShoulder, mouth, midEye } = points;

        // 1. GREEN PLUMB LINE (Reference)
        const anchor = toPixel(midAnkle);
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y);
        ctx.lineTo(anchor.x, 0);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2; // Thinner (was 4)
        ctx.stroke();

        // 2. RED DEVIATION LINE (Patient)
        const path = [midAnkle, midKnee, midHip, ribcageCenter, midShoulder, mouth, midEye];
        ctx.beginPath();
        path.forEach((pt, i) => {
            if (!pt) return;
            const p = toPixel(pt);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2; // Thinner (was 4)
        ctx.stroke();

        // 3. POINTS & H-LINES
        const hLines = [
            { pts: points.eyes, color: '#facc15' },
            { pts: points.shoulders, color: '#ef4444' },
            { pts: points.chestLine, color: '#ef4444' },
            { pts: points.hips, color: '#ef4444' },
            { pts: points.knees, color: '#facc15' },
            { pts: points.ankles, color: '#ef4444' }
        ];

        hLines.forEach(line => {
            if (!line.pts || !line.pts[0] || !line.pts[1]) return;
            const p1 = toPixel(line.pts[0]);
            const p2 = toPixel(line.pts[1]);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 2; // Thinner (was 3)
            ctx.stroke();

            // Draw End Points
            [p1, p2].forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = '#facc15';
                ctx.fill();
                ctx.strokeStyle = 'black';
                ctx.stroke();
            });
        });

        // 4. SPECIAL KNEE POINTS
        const knees = points.knees;
        if (knees[0] && knees[1]) {
            [0, 1].forEach(i => {
                const k = knees[i];
                const h = points.hips[i];
                const a = points.ankles[i];
                if (!k || !h || !a) return;

                const K = toPixel(k);
                const H = toPixel(h);
                const A = toPixel(a);

                const femurPt = {
                    x: K.x + (H.x - K.x) * 0.15,
                    y: K.y + (H.y - K.y) * 0.15
                };
                const tibiaPt = {
                    x: K.x + (A.x - K.x) * 0.15,
                    y: K.y + (A.y - K.y) * 0.15
                };

                [femurPt, tibiaPt].forEach(pt => {
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, 4, 0, 2 * Math.PI);
                    ctx.fillStyle = '#facc15';
                    ctx.fill();

                    ctx.beginPath();
                    ctx.moveTo(K.x, K.y);
                    ctx.lineTo(pt.x, pt.y);
                    ctx.strokeStyle = '#facc15';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([4, 4]);
                    ctx.stroke();
                    ctx.setLineDash([]);
                });
            });
        }

        // --- DRAW L/R LABELS ---
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;

        const labelY = height - 20;
        const leftX = 20;
        const rightX = width - 40;

        // Front View: Mirrored (Patient's Right is Image Left)
        // Back View: Standard (Patient's Left is Image Left)
        let leftText = "R";
        let rightText = "L";

        if (view === 'BACK') {
            leftText = "L";
            rightText = "R";
        }

        // Draw Left Corner
        ctx.strokeText(leftText, leftX, labelY);
        ctx.fillText(leftText, leftX, labelY);

        // Draw Right Corner
        ctx.strokeText(rightText, rightX, labelY);
        ctx.fillText(rightText, rightX, labelY);
    }
    else if (view === 'SIDE' || view === 'LEFT' || view === 'RIGHT') {
        const { ankle, knee, hip, shoulder, ear } = points;

        // 1. GREEN PLUMB LINE
        if (ankle) {
            const anchor = toPixel(ankle);
            ctx.beginPath();
            ctx.moveTo(anchor.x, anchor.y);
            ctx.lineTo(anchor.x, 0);
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 2; // Thinner (was 4)
            ctx.stroke();
        }

        // 2. RED Alignment Line
        const path = [ear, shoulder, hip, knee, ankle];
        ctx.beginPath();
        path.forEach((pt, i) => {
            if (!pt) return;
            const p = toPixel(pt);
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw Points
        path.forEach(pt => {
            if (!pt) return;
            const p = toPixel(pt);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = '#facc15';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        });
    }

    ctx.restore();
    return view;
}

/**
 * Detect "Raise Hand" Gesture for Remote Trigger
 * @param {Array} landmarks - MediaPipe landmarks
 * @returns {Object} { detected: boolean, hand?: 'LEFT'|'RIGHT' }
 */
function detectGesture(landmarks) {
    if (!landmarks || landmarks.length < 33) return { detected: false };

    const nose = landmarks[0];
    const lWrist = landmarks[15];
    const rWrist = landmarks[16];

    if (!nose || (nose.visibility || 0) < 0.5) return { detected: false };

    const isWristAboveHead = (wrist) => {
        if (!wrist || (wrist.visibility || 0) < 0.5) return false;
        return wrist.y < nose.y;
    };

    if (isWristAboveHead(lWrist)) return { detected: true, hand: 'LEFT' };
    if (isWristAboveHead(rWrist)) return { detected: true, hand: 'RIGHT' };

    return { detected: false };
}

/**
 * Calculate bounding box of landmarks
 * @param {Array} landmarks - Array of landmark objects
 * @returns {Object} {x, y, w, h} normalized coordinates
 */
function getBoundingBox(landmarks) {
    if (!landmarks || landmarks.length === 0) return { x: 0, y: 0, w: 1, h: 1 };

    let minX = 1, minY = 1, maxX = 0, maxY = 0;
    let hasValid = false;

    landmarks.forEach(lm => {
        if ((lm.visibility || 0) > 0.5) {
            if (lm.x < minX) minX = lm.x;
            if (lm.x > maxX) maxX = lm.x;
            if (lm.y < minY) minY = lm.y;
            if (lm.y > maxY) maxY = lm.y;
            hasValid = true;
        }
    });

    if (!hasValid) return { x: 0, y: 0, w: 1, h: 1 };

    return {
        x: minX,
        y: minY,
        w: maxX - minX,
        h: maxY - minY
    };
}

/**
 * Crop image to landmarks bounding box with padding
 * @param {string} imageSrc - Image URL/DataURL
 * @param {Array} landmarks - Landmarks array
 * @returns {Promise<string>} Cropped image DataURL
 */
function cropImageToLandmarks(imageSrc, landmarks) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageSrc;

        img.onload = () => {
            const rawBounds = getBoundingBox(landmarks);

            const pixelBuffer = 50;
            const normBufferX = pixelBuffer / img.width;
            const normBufferY = pixelBuffer / img.height;

            const paddingX = Math.max(rawBounds.w * 0.2, normBufferX);
            const paddingY = Math.max(rawBounds.h * 0.2, normBufferY);

            const minX = Math.max(0, rawBounds.x - paddingX);
            const minY = Math.max(0, rawBounds.y - paddingY);
            const maxX = Math.min(1, (rawBounds.x + rawBounds.w) + paddingX);
            const maxY = Math.min(1, (rawBounds.y + rawBounds.h) + paddingY);

            const bounds = {
                x: minX,
                y: minY,
                w: maxX - minX,
                h: maxY - minY
            };

            const sourceW = img.width * bounds.w;
            const sourceH = img.height * bounds.h;

            const canvas = document.createElement('canvas');
            canvas.width = sourceW;
            canvas.height = sourceH;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                img,
                bounds.x * img.width, bounds.y * img.height,
                sourceW, sourceH,
                0, 0,
                sourceW, sourceH
            );

            resolve(canvas.toDataURL('image/png'));
        };

        img.onerror = (err) => reject(err);
    });
}

/**
 * Calculate detailed metrics for Report
 * @param {Array} landmarks - MediaPipe landmarks
 * @param {String} viewMode - View mode
 * @param {Number} heightCm - User height in CM
 * @param {Number} weightKg - User weight in KG
 * @returns {Object} Metrics object
 */
function calculatePostureMetrics(landmarks, viewMode, heightCm = 170, weightKg = 70) {
    if (!landmarks) return null;

    const points = calculatePostureKeyPoints(landmarks, viewMode);
    if (!points) return null;

    const heightIn = heightCm / 2.54;

    let pixelBodyHeight = 1;
    let plumbLineX = 0;

    if (viewMode === 'FRONT' || viewMode === 'BACK') {
        pixelBodyHeight = Math.abs(points.midAnkle.y - points.midEye.y) * 1.15;
        plumbLineX = points.midAnkle.x;
    } else {
        // SIDE, LEFT, RIGHT
        pixelBodyHeight = Math.abs(points.ankle.y - points.ear.y) * 1.05; // Using 1.05 consistent with Front
        plumbLineX = points.ankle.x;
    }

    if (pixelBodyHeight < 0.1) pixelBodyHeight = 0.5;

    const scale = heightIn / pixelBodyHeight;

    const toInches = (val) => val.toFixed(2);
    const toDegrees = (rad) => (rad * (180 / Math.PI)).toFixed(1);

    const calcAngle3Pts = (p1, p2, p3) => {
        if (!p1 || !p2 || !p3) return 0;
        return calculateAngle(p1, p2, p3);
    };

    const metrics = {
        shifts: {},
        tilts: {},
        details: [],
        headWeightAnalysis: null,
        totalShifts: 0,
        totalTilts: 0,
        qAngles: {}
    };

    if (viewMode === 'FRONT' || viewMode === 'BACK') {
        const { midEye, midShoulder, ribcageCenter, midHip } = points;
        const { hips, knees, ankles } = points;

        const calcShift = (pt, name) => {
            if (!pt) return { name, val: 0, dir: 'None', raw: 0 };
            const deviation = (pt.x - plumbLineX);
            const val = deviation * scale;
            const dir = val > 0 ? "Phải" : "Trái"; // Translated Right/Left
            return { name, val: Math.abs(val), dir, raw: val };
        };

        const headS = calcShift(midEye, "Head");
        const shldrS = calcShift(midShoulder, "Shoulders");
        const ribS = calcShift(ribcageCenter, "Ribcage");
        const hipS = calcShift(midHip, "Hips");

        // --- SPINAL ANALYSIS (BACK VIEW APPROXIMATION) ---
        // Interpolate spine points between T1 (Mid-Shoulder) and PSIS (Mid-Hip)
        // Segments: T1-T4, T4-T8, T8-T12, T12-L3, L3-PSIS
        const t1 = midShoulder;
        const psis = midHip;
        const lerp = (p1, p2, t) => ({ x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t });

        const t4 = lerp(t1, psis, 0.2);
        const t8 = lerp(t1, psis, 0.4);
        const t12 = lerp(t1, psis, 0.6);
        const l3 = lerp(t1, psis, 0.8);

        // Shifts (vs Plumb)
        const t1S = calcShift(t1, "T1 (Upper Thoracic)");
        const t4S = calcShift(t4, "T4 (Mid Thoracic)");
        const t8S = calcShift(t8, "T8 (Lower Thoracic)");
        const t12S = calcShift(t12, "T12 (Upper Lumbar)");
        const l3S = calcShift(l3, "L3 (Lumbar)");
        const psisS = calcShift(psis, "PSIS (Pelvis)"); // Same as Hip shift

        // --- LEG ANALYSIS (X/O LEGS) ---
        // Calc distance between Knees (0, 1) and Ankles (0, 1)
        // points.knees = [left, right], points.ankles = [left, right]
        // Distance is abs(x_left - x_right)
        const kneeDistRaw = Math.abs(points.knees[0].x - points.knees[1].x);
        const ankleDistRaw = Math.abs(points.ankles[0].x - points.ankles[1].x);

        metrics.legAnalysis = {
            kneeDist: (kneeDistRaw * scale).toFixed(2),
            ankleDist: (ankleDistRaw * scale).toFixed(2)
        };

        // Segment Tilts (Angle vs Vertical)
        const calcSegTilt = (pStart, pEnd, name) => {
            if (!pStart || !pEnd) return { name, val: 0, dir: 'None', raw: 0 };
            const dx = pEnd.x - pStart.x;
            const dy = pEnd.y - pStart.y; // Positive down
            // Angle off vertical (0 is straight down)
            const angleRad = Math.atan2(dx, dy);
            const angleDeg = Math.abs(angleRad * (180 / Math.PI));
            // Direction: if dx > 0 (Right), segment tilts Right (Top to Bottom)
            const dir = dx > 0 ? "Phải" : "Trái"; // Translated Right/Left
            return { name, val: angleDeg.toFixed(1), dir, raw: angleDeg };
        };

        const t1t4T = calcSegTilt(t1, t4, "T1-T4");
        const t4t8T = calcSegTilt(t4, t8, "T4-T8");
        const t8t12T = calcSegTilt(t8, t12, "T8-T12");
        const t12l3T = calcSegTilt(t12, l3, "T12-L3");
        const l3psisT = calcSegTilt(l3, psis, "L3-PSIS");

        const calcTilt = (p1, p2, name) => {
            if (!p1 || !p2) return { name, val: "0.0", dir: 'Cân bằng', raw: 0 };

            // p1 is Left Anatomy, p2 is Right Anatomy (e.g. Left Eye, Right Eye)
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            let deg = Math.abs(angle * (180 / Math.PI));

            if (deg > 90) {
                deg = Math.abs(180 - deg);
            }

            let dir = "Cân bằng";
            if (deg > 0.5) {
                // In Canvas Y grows downwards.
                // If p1.y (Left) > p2.y (Right), Left is 'Lower/Deeper' in Y -> Left is lower physically? 
                // Wait. Canvas Y=0 is TOP. Y=1000 is BOTTOM.
                // Left Eye Y=100 (High), Right Eye Y=110 (Low). 
                // This means Head tilts to RIGHT (Right side is lower).

                if (p1.y < p2.y) dir = "Phải"; // Right side is lower (Y is bigger)
                else dir = "Trái"; // Left side is lower (Y is bigger)
            }

            return { name, val: deg.toFixed(1), dir, raw: deg };
        };

        const headT = calcTilt(points.eyes[0], points.eyes[1], "Head");
        const shldrT = calcTilt(points.shoulders[0], points.shoulders[1], "Shoulders");
        const hipT = calcTilt(points.hips[0], points.hips[1], "Hips");

        const calcQAngle = (h, k, a) => {
            if (!h || !k || !a) return 0;
            const ang = calcAngle3Pts(h, k, a);
            return Math.abs(180 - ang).toFixed(1);
        };

        const rightQ = calcQAngle(hips[1], knees[1], ankles[1]);
        const leftQ = calcQAngle(hips[0], knees[0], ankles[0]);
        metrics.qAngles = { right: rightQ, left: leftQ };

        let totalS = headS.val + shldrS.val + ribS.val + hipS.val;
        let totalT = headT.raw + shldrT.raw + hipT.raw;

        if (viewMode === 'BACK') {
            totalS += (t1S.val + t4S.val + t8S.val + t12S.val + l3S.val);
            totalT += (t1t4T.raw + t4t8T.raw + t8t12T.raw + t12l3T.raw + l3psisT.raw);
        }

        metrics.totalShifts = totalS.toFixed(2);
        metrics.totalTilts = totalT.toFixed(1);

        metrics.details = [
            { text: `Đầu lệch ${toInches(Math.abs(headS.raw))} inch về bên ${headS.dir}. Đầu nghiêng ${headT.val}° sang ${headT.dir}.`, type: 'SHIFT_TILT' },
            { text: `Vai lệch ${toInches(Math.abs(shldrS.raw))} inch về bên ${shldrS.dir}. Vai nghiêng ${shldrT.val}° sang ${shldrT.dir}.`, type: 'SHIFT_TILT' },
            { text: `Lồng ngực lệch ${toInches(Math.abs(ribS.raw))} inch về bên ${ribS.dir}.`, type: 'SHIFT' },
            { text: `Hông lệch ${toInches(Math.abs(hipS.raw))} inch về bên ${hipS.dir}. Hông nghiêng ${hipT.val}° sang ${hipT.dir}.`, type: 'SHIFT_TILT' }
        ];

        if (viewMode === 'BACK') {
            metrics.details.push(
                { text: `Đoạn T1-T4 lệch trung bình ${toInches(Math.abs(t4S.raw))} inch. Đoạn này nghiêng ${t1t4T.val}° sang ${t1t4T.dir}.`, type: 'SPINE' },
                { text: `Đoạn T4-T8 lệch trung bình ${toInches(Math.abs(t8S.raw))} inch. Đoạn này nghiêng ${t4t8T.val}° sang ${t4t8T.dir}.`, type: 'SPINE' },
                { text: `Đoạn T8-T12 lệch trung bình ${toInches(Math.abs(t12S.raw))} inch. Đoạn này nghiêng ${t8t12T.val}° sang ${t8t12T.dir}.`, type: 'SPINE' },
                { text: `Đoạn T12-L3 lệch trung bình ${toInches(Math.abs(l3S.raw))} inch. Đoạn này nghiêng ${t12l3T.val}° sang ${t12l3T.dir}.`, type: 'SPINE' },
                { text: `Đoạn L3-PSIS nghiêng ${l3psisT.val}° sang ${l3psisT.dir}.`, type: 'SPINE' }
            );

            metrics.spinal = {
                t1t4: t1t4T,
                t4t8: t4t8T,
                t8t12: t8t12T,
                t12l3: t12l3T,
                l3psis: l3psisT
            };
        }

        metrics.details.push(
            { text: `Góc Q bên Phải là ${rightQ}°.`, type: 'Q_ANGLE' },
            { text: `Góc Q bên Trái là ${leftQ}°.`, type: 'Q_ANGLE' }
        );

        metrics.shifts = { Head: headS, Shoulders: shldrS, Hips: hipS };
        metrics.tilts = { Head: headT, Shoulders: shldrT, Hips: hipT };


        // --- VISUALIZATION DATA (FRONT/BACK) ---
        metrics.visuals = {
            plumbLineX,
            scale,
            lines: []
        };
        // 1. Plumb Line (Green)
        metrics.visuals.lines.push({
            x1: plumbLineX, y1: points.midAnkle.y - pixelBodyHeight * 1.05,
            x2: plumbLineX, y2: points.midAnkle.y,
            color: '#22c55e', label: 'Phương thẳng đứng', width: 1.5,
            align: 'top'
        });

        // 2. Tilt Lines
        const addTiltLine = (p1, p2, m) => {
            if (p1 && p2 && m) {
                if (p1 && p2 && m) {
                    metrics.visuals.lines.push({
                        x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
                        color: 'rgba(0,0,0,0)', label: `${m.val}°`,
                        align: 'leader_right'
                    });
                }
            }
        };
        addTiltLine(points.eyes[1], points.eyes[0], headT);
        addTiltLine(points.shoulders[1], points.shoulders[0], shldrT);
        addTiltLine(points.hips[1], points.hips[0], hipT);

        // 3. Shift lines (Mid to Plumb)
        const addFrontShift = (pt, m) => {
            if (pt && m && m.val > 0) {
                const isLeft = pt.x < plumbLineX;
                metrics.visuals.lines.push({
                    x1: pt.x, y1: pt.y, x2: plumbLineX, y2: pt.y,
                    color: 'rgba(0,0,0,0)',
                    label: `${toInches(Math.abs(m.raw))} in`,
                    align: isLeft ? 'leader_left' : 'leader_right'
                });
            }
        };
        addFrontShift(points.midEye, headS);
        addFrontShift(points.midShoulder, shldrS);
        addFrontShift(points.ribcageCenter, ribS);
        addFrontShift(points.midHip, hipS);

        if (viewMode === 'BACK') {
            // Visualize Spine Chain (Blue)
            const spinePoints = [t1, t4, t8, t12, l3, psis];
            for (let i = 0; i < spinePoints.length - 1; i++) {
                if (spinePoints[i] && spinePoints[i + 1]) {
                    metrics.visuals.lines.push({
                        x1: spinePoints[i].x, y1: spinePoints[i].y,
                        x2: spinePoints[i + 1].x, y2: spinePoints[i + 1].y,
                        color: '#3b82f6', // blue-500
                        width: 2 // Thinner (was 3)
                    });
                }
            }
            // Visualize Spine Shifts (Red)
            addFrontShift(t4, t4S);
            addFrontShift(t8, t8S);
            addFrontShift(t12, t12S);
            addFrontShift(l3, l3S);
        }

    } else if (viewMode === 'SIDE' || viewMode === 'LEFT' || viewMode === 'RIGHT') {
        // SIDE VIEW (and Left/Right)
        const isFacingRight = (points.nose && points.ear) ? (points.nose.x > points.ear.x) : true;
        const forwardSign = isFacingRight ? 1 : -1;

        const calcSideMetric = (pt, name) => {
            if (!pt) return null;

            const rawDx = (pt.x - plumbLineX);
            const dx = rawDx * forwardSign;
            const dy = (points.ankle.y - pt.y);

            if (dy < 0.05) return null;

            const shiftIn = (dx * scale).toFixed(2);
            const dir = dx > 0 ? "trước" : "sau"; // Translated forward/backward
            const angleRad = Math.atan2(dx, dy);
            const angleDeg = Math.abs(angleRad * (180 / Math.PI)).toFixed(1);

            return { name, shift: Math.abs(shiftIn), dir, angle: angleDeg, rawShift: dx };
        };

        const headM = calcSideMetric(points.ear, "Head");
        const shldrM = calcSideMetric(points.shoulder, "Shoulders");
        const hipM = calcSideMetric(points.hip, "Hips");
        const kneeM = calcSideMetric(points.knee, "Knees");

        const fhpShoulderRaw = (points.ear.x - points.shoulder.x) * forwardSign;
        const fhpShoulderIn = (fhpShoulderRaw * scale).toFixed(2);
        const forwardShiftForWeight = Math.max(0, parseFloat(fhpShoulderIn));

        const baseHeadWeight = 10;
        const effectiveWeight = baseHeadWeight + (forwardShiftForWeight * 10);

        const fhpIn = headM ? parseFloat(headM.shift) : 0;

        metrics.headWeightAnalysis = {
            base: baseHeadWeight.toFixed(1),
            effective: effectiveWeight.toFixed(1),
            shift: fhpShoulderIn
        };

        metrics.totalShifts = fhpIn.toFixed(2);

        const totalLean = (
            parseFloat(headM?.angle || 0) +
            parseFloat(shldrM?.angle || 0) +
            parseFloat(hipM?.angle || 0) +
            parseFloat(kneeM?.angle || 0)
        );
        metrics.totalTilts = totalLean.toFixed(1);

        metrics.details = [];
        metrics.details.push({ text: `Đầu nhô ra trước vai: ${fhpShoulderIn} inch.`, type: 'HEAD_FHP' });

        if (headM) metrics.details.push({ text: `Đầu lệch ${headM.shift} inch về phía ${headM.dir} (so với Mắt cá), ${headM.angle}° so với phương thẳng đứng.`, type: 'HEAD_SHIFT' });
        if (shldrM) metrics.details.push({ text: `Vai lệch ${shldrM.shift} inch về phía ${shldrM.dir}, ${shldrM.angle}° so với phương thẳng đứng.`, type: 'SHIFT' });
        if (hipM) metrics.details.push({ text: `Hông lệch ${hipM.shift} inch về phía ${hipM.dir}, ${hipM.angle}° so với phương thẳng đứng.`, type: 'SHIFT' });
        if (kneeM) metrics.details.push({ text: `Đầu gối lệch ${kneeM.shift} inch về phía ${kneeM.dir}, ${kneeM.angle}° so với phương thẳng đứng.`, type: 'SHIFT' });

        // Create visuals for shifts
        metrics.shifts = { Head: { val: fhpIn, dir: headM?.dir || 'Không' } };

        // --- NEW ANALYSIS: KNEE & NECK (Ruleset) ---
        // 1. KNEE FLEXION
        // Vector: Hip->Knee and Knee->Ankle. Angle at Knee.
        // Using 3-point angle: Hip, Knee, Ankle. 
        // 180 is straight. <180 flexed. >180 hyper.
        const kneeAngle = calcAngle3Pts(points.hip, points.knee, points.ankle);

        // 2. NECK INCLINATION
        // Vector: C7(Shoulder) -> Ear. Angle vs Vertical.
        // Vertical is vector (0, -1). 
        // We use Math.atan2(dx, dy) where dy is up-down.
        // dx = ear.x - shoulder.x
        // dy = shoulder.y - ear.y (since y increases downwards, shoulder is lower than ear, so shoulder.y > ear.y)
        let neckIncAngle = 0;
        if (points.ear && points.shoulder) {
            const dx = Math.abs(points.ear.x - points.shoulder.x);
            const dy = Math.abs(points.ear.y - points.shoulder.y); // Vertical distance
            if (dy > 0.01) {
                const rad = Math.atan2(dx, dy);
                neckIncAngle = parseFloat(toDegrees(rad));
            }
        }

        metrics.kneeAnalysis = { angle: parseFloat(kneeAngle.toFixed(1)) };
        metrics.neckAnalysis = { angle: neckIncAngle };

        // --- VISUALIZATION DATA (SIDE) ---
        metrics.visuals = {
            plumbLineX,
            scale,
            lines: []
        };
        // Plumb Line
        metrics.visuals.lines.push({
            x1: plumbLineX, y1: points.ankle.y - pixelBodyHeight * 1.05,
            x2: plumbLineX, y2: points.ankle.y,
            color: '#22c55e', label: 'Phương thẳng đứng', width: 1.5,
            align: 'top'
        });

        // Side Shifts
        const addShiftLine = (pt, m) => {
            if (pt && m) {
                const isLeft = pt.x < plumbLineX;
                metrics.visuals.lines.push({
                    x1: pt.x, y1: pt.y,
                    x2: plumbLineX, y2: pt.y,
                    color: 'rgba(0,0,0,0)',
                    label: `${m.shift} in, ${m.angle}°`,
                    align: isLeft ? 'leader_left' : 'leader_right'
                });
            }
        };

        addShiftLine(points.knee, kneeM);
        addShiftLine(points.hip, hipM);
        addShiftLine(points.shoulder, shldrM);
        addShiftLine(points.ear, headM);

        // Head Weight Line
        if (points.ear && points.shoulder) {
            const isLeft = points.ear.x < plumbLineX;
            metrics.visuals.lines.push({
                x1: points.ear.x, y1: points.ear.y,
                x2: points.shoulder.x, y2: points.ear.y,
                color: 'rgba(0,0,0,0)', label: `Đầu-Vai: ${fhpShoulderIn} in`,
                align: isLeft ? 'leader_left' : 'leader_right'
            });
        }
    }

    // --- POSTURE SCORING SYSTEM ---
    // Formula: 100 - (TotalShifts * 8) - (TotalTilts * 2)
    // - Shift Penalty: 8 points per inch (Significant deviation)
    // - Tilt Penalty: 2 points per degree (Angular deviation)
    // Max Score: 100, Min Score: 0

    let score = 100;
    const shiftPenalty = parseFloat(metrics.totalShifts) * 8;
    const tiltPenalty = parseFloat(metrics.totalTilts) * 2;

    score = score - shiftPenalty - tiltPenalty;
    if (score < 0) score = 0;

    metrics.score = Math.round(score);

    // Determine Rating
    if (metrics.score >= 90) metrics.rating = "Excellent";
    else if (metrics.score >= 80) metrics.rating = "Good";
    else if (metrics.score >= 65) metrics.rating = "Fair";
    else metrics.rating = "Poor";

    return metrics;
}

/**
 * Generate Overall Posture Assessment
 * @param {Object} metrics - Metrics from calculatePostureMetrics
 * @param {String} viewMode - 'FRONT', 'BACK', 'LEFT', 'RIGHT'
 * @returns {Object} { status: 'good'|'fair'|'poor', message: string, recommendations: string[] }
 */
function generatePostureAssessment(metrics, viewMode) {
    if (!metrics) return null;

    const assessment = {
        status: 'good',
        message: '',
        recommendations: []
    };

    if (viewMode === 'FRONT' || viewMode === 'BACK') {
        const { tilts, shifts, qAngles } = metrics;
        const shoulderTilt = parseFloat(tilts.Shoulders?.val || 0);
        const hipTilt = parseFloat(tilts.Hips?.val || 0);
        const headTilt = parseFloat(tilts.Head?.val || 0);
        const totalShifts = parseFloat(metrics.totalShifts || 0);
        const rightQ = parseFloat(qAngles.right || 0);
        const leftQ = parseFloat(qAngles.left || 0);
        const qAngleDiff = Math.abs(rightQ - leftQ);

        let issues = [];

        if (shoulderTilt > 2.0) {
            issues.push('vai không cân bằng');
            assessment.recommendations.push('Kiểm tra và điều chỉnh độ cao vai, có thể cần bài tập giãn cơ thang.');
        }
        if (hipTilt > 1.5) {
            issues.push('khung chậu nghiêng');
            assessment.recommendations.push('Kiểm tra độ dài chân, có thể cần đế lót điều chỉnh.');
        }
        if (headTilt > 2.5) {
            issues.push('đầu nghiêng');
            assessment.recommendations.push('Luyện tập giữ đầu thẳng, kiểm tra thị lực và thói quen làm việc.');
        }
        if (totalShifts > 3.0) {
            issues.push('lệch trục dọc đáng kể');
            assessment.recommendations.push('Cần đánh giá chuyên sâu về cột sống và tư thế.');
        }
        if (qAngleDiff > 5) {
            issues.push('góc Q không đối xứng');
            assessment.recommendations.push('Kiểm tra cơ đùi và xương bánh chè, có thể cần vật lý trị liệu.');
        }

        if (issues.length === 0) {
            assessment.status = 'good';
            assessment.message = viewMode === 'FRONT'
                ? '✓ Hai vai và khung chậu song song, là tư thế tốt với sự cân bằng trái phải. Hãy duy trì tư thế hiện tại.'
                : '✓ Cột sống và khung xương cân đối. Đây là tư thế tốt, hãy duy trì sức mạnh cơ bắp.';
            assessment.recommendations.push('Tiếp tục duy trì hoạt động thể chất đều đặn.');
            assessment.recommendations.push('Chú ý tư thế khi ngồi và đứng lâu.');
        } else if (issues.length <= 2) {
            assessment.status = 'fair';
            assessment.message = `⚠ Phát hiện ${issues.join(', ')}. Cần chú ý điều chỉnh.`;
            assessment.recommendations.unshift('Tham khảo ý kiến chuyên gia vật lý trị liệu.');
        } else {
            assessment.status = 'poor';
            assessment.message = `⚠ Nhiều vấn đề về tư thế: ${issues.join(', ')}. Cần can thiệp sớm.`;
            assessment.recommendations.unshift('Nên đến gặp bác sĩ chuyên khoa cột sống hoặc vật lý trị liệu.');
        }
    } else {
        const { headWeightAnalysis } = metrics;
        if (!headWeightAnalysis) return null;

        const effectiveWeight = parseFloat(headWeightAnalysis.effective);
        const baseWeight = parseFloat(headWeightAnalysis.base);
        const fhpShift = parseFloat(headWeightAnalysis.shift);
        const totalLean = parseFloat(metrics.totalTilts || 0);

        let issues = [];

        if (fhpShift > 2.0) {
            issues.push('đầu nhô ra phía trước nghiêm trọng');
            assessment.recommendations.push('Luyện tập kéo cằm (chin tucks) 3 hiệp x 10 lần/ngày.');
            assessment.recommendations.push('Điều chỉnh màn hình máy tính ngang tầm mắt.');
        } else if (fhpShift > 1.0) {
            issues.push('đầu hơi nhô ra phía trước');
            assessment.recommendations.push('Chú ý tư thế khi sử dụng điện thoại và máy tính.');
        }

        const weightIncrease = effectiveWeight - baseWeight;
        if (weightIncrease > 20) {
            issues.push('áp lực lên cổ rất cao');
            assessment.recommendations.push('Giảm thời gian cúi đầu, nghỉ ngơi thường xuyên.');
        } else if (weightIncrease > 10) {
            issues.push('áp lực lên cổ tăng');
        }

        if (totalLean > 15) {
            issues.push('nghiêng người nhiều');
            assessment.recommendations.push('Tăng cường bài tập cơ lưng và cơ core.');
        }

        if (issues.length === 0) {
            assessment.status = 'good';
            assessment.message = '✓ Tư thế nghiêng tốt, đầu và cột sống thẳng hàng. Hãy duy trì tư thế hiện tại.';
            assessment.recommendations.push('Tiếp tục duy trì thói quen tốt.');
            assessment.recommendations.push('Luyện tập cơ cổ và vai đều đặn.');
        } else if (issues.length <= 2) {
            assessment.status = 'fair';
            assessment.message = `⚠ Phát hiện ${issues.join(', ')}. Nếu không điều chỉnh có thể dẫn đến đau nhức mãn tính.`;
        } else {
            assessment.status = 'poor';
            assessment.message = `⚠ Nhiều vấn đề: ${issues.join(', ')}. Nguy cơ cao về biến dạng xương và đau nhức.`;
            assessment.recommendations.unshift('Cần gặp chuyên gia vật lý trị liệu ngay.');
        }
    }

    return assessment;
}

/**
 * --- NEW MEDICAL NARRATIVE ENGINE ---
 * Based on docs/Posture_Medical_Report_Narrative_Ruleset.md
 */

function getFrontViewStatus(metrics) {
    if (!metrics || !metrics.shifts || !metrics.tilts) return 'UNKNOWN';

    const headShift = parseFloat(metrics.shifts.Head?.val || 0); // inches
    const shoulderTilt = parseFloat(metrics.tilts.Shoulders?.val || 0); // degrees
    const hipTilt = parseFloat(metrics.tilts.Hips?.val || 0); // degrees
    const headTilt = parseFloat(metrics.tilts.Head?.val || 0); // degrees

    // SIGNIFICANT IMBALANCE
    // Head > 1.25in shift or > 8 deg tilt
    // Shoulder/Hip > 7 deg
    if (shoulderTilt > 7 || hipTilt > 7 || headShift > 1.25 || headTilt > 8) return 'SIGNIFICANT_IMBALANCE';

    // MILD ASYMMETRY
    if ((headShift >= 0.5 && headShift <= 1.25) ||
        (shoulderTilt >= 3 && shoulderTilt <= 7) ||
        (hipTilt >= 3 && hipTilt <= 7) ||
        (headTilt > 3 && headTilt <= 8)) {
        return 'MILD_ASYMMETRY';
    }

    // BALANCED
    // Head shift <= 0.5, Shoulder <= 3, Hip <= 3 (Ruleset says 2-3, using 3)
    // Head Tilt <= 3
    if (headShift <= 0.5 && shoulderTilt <= 3 && hipTilt <= 3 && headTilt <= 3) {
        return 'BALANCED';
    }

    // Default fallback if gaps
    return 'MILD_ASYMMETRY';
}

function generateFrontNarrative(metrics) {
    const status = getFrontViewStatus(metrics);

    if (status === 'BALANCED') {
        return "Báo cáo chỉ ra rằng hai vai và khung chậu gần như song song, cho thấy sự cân bằng tốt trên mặt phẳng trán (Frontal Plane). Sự thẳng hàng của đầu và thân người có vẻ ổn định. Khuyến nghị duy trì tư thế này.";
    } else if (status === 'MILD_ASYMMETRY') {
        return "Phân tích cho thấy sự mất cân đối nhẹ giữa bên trái và bên phải liên quan đến đầu, vai hoặc khung chậu. Mô hình này thường phản ánh thói quen tư thế hoặc sự mất cân bằng liên quan đến hoạt động hàng ngày.";
    } else { // SIGNIFICANT_IMBALANCE
        return "Báo cáo xác định sự mất cân bằng rõ rệt giữa hai bên cơ thể, đặc biệt là ở vai và khung chậu. Duy trì tư thế này trong thời gian dài có thể làm tăng áp lực không đều lên cột sống.";
    }
}

function getBackViewStatus(metrics) {
    if (!metrics || !metrics.spinal) return 'UNKNOWN';

    const segments = Object.values(metrics.spinal); // Array of {val, dir}
    const totalTilt = parseFloat(metrics.totalTilts || 0);

    // DEVIATION: 2+ adjacent segments same direction OR High total tilt
    let consistentParams = 0;
    // We need to iterate the ordered keys to be safe, but Object.values relies on key order which is usually insertion order.
    // Let's rely on 'spinal' structure
    const keys = ['t1t4', 't4t8', 't8t12', 't12l3', 'l3psis'];
    const segs = keys.map(k => metrics.spinal[k]).filter(s => s);

    for (let i = 0; i < segs.length - 1; i++) {
        if (segs[i].dir !== 'Level' && segs[i].dir === segs[i + 1].dir) {
            consistentParams++;
        }
    }

    if (consistentParams >= 1 || totalTilt > 15) {
        return 'MULTI_SEGMENT_DEVIATION';
    }

    // FUNCTIONAL: Alternating directions
    const hasTilts = segs.some(s => parseFloat(s.val) > 1.0);
    if (hasTilts) {
        return 'FUNCTIONAL_COMPENSATION';
    }

    // SYMMETRICAL
    return 'SYMMETRICAL_ALIGNMENT';
}

function generateBackNarrative(metrics) {
    const status = getBackViewStatus(metrics);

    if (status === 'SYMMETRICAL_ALIGNMENT') {
        return "Quan sát từ phía sau cho thấy cột sống và khung chậu tương đối cân đối, không có độ lệch ngang đáng kể. Điều này cho thấy sự kiểm soát tư thế hiệu quả từ phía sau.";
    } else if (status === 'FUNCTIONAL_COMPENSATION') {
        return "Báo cáo tiết lộ các điều chỉnh lệch ngang bù trừ qua các đoạn cột sống khác nhau, cho thấy cơ thể đang thích nghi để duy trì sự cân bằng tổng thể. Những mô hình như vậy thường liên quan đến thói quen tư thế chức năng.";
    } else { // MULTI_SEGMENT_DEVIATION
        return "Góc nhìn từ phía sau làm nổi bật sự lệch ngang nhất quán qua nhiều đoạn cột sống. Duy trì sự thẳng hàng này theo thời gian có thể góp phần vào việc chịu tải cơ bắp không đối xứng.";
    }
}

function getSideViewStatus(metrics) {
    if (!metrics || !metrics.headWeightAnalysis) return 'UNKNOWN';

    const fhpShift = parseFloat(metrics.headWeightAnalysis.shift); // inches (Head forward of shoulder)
    const effWeight = parseFloat(metrics.headWeightAnalysis.effective);

    // SIGNIFICANT FHP
    if (fhpShift > 2.5 || effWeight > 25) {
        return 'SIGNIFICANT_FHP';
    }

    // MILD FHP
    if (fhpShift >= 1.0) {
        return 'MILD_FHP';
    }

    // NEUTRAL
    return 'NEUTRAL';
}

function generateSideNarrative(metrics) {
    const status = getSideViewStatus(metrics);

    if (status === 'NEUTRAL') {
        return "Từ góc nhìn nghiêng, sự thẳng hàng của đầu và cổ có vẻ cân bằng tốt trên thân người, với tải trọng lên cổ nằm trong phạm vi sinh lý bình thường. Tư thế này hỗ trợ phân phối tải trọng hiệu quả dọc theo cột sống.";
    } else if (status === 'MILD_FHP') {
        return "Đánh giá chỉ ra vị trí đầu hơi nhô ra phía trước, dẫn đến nhu cầu tăng lên đối với hệ cơ cổ. Theo thời gian, tư thế này có thể liên quan đến mỏi cổ và vai.";
    } else { // SIGNIFICANT_FHP
        return "Báo cáo cho thấy tư thế đầu nhô ra trước rõ rệt với tải trọng lên cột sống cổ tăng đáng kể. Duy trì sự thẳng hàng này trong thời gian dài có thể liên quan đến khó chịu ở cổ, căng vai và mỏi cơ.";
    }
}

function generateOverallSummary(frontMetrics, backMetrics, sideMetrics) {
    let parts = [];

    // Front
    if (frontMetrics) {
        const frontStatus = getFrontViewStatus(frontMetrics);
        if (frontStatus === 'BALANCED') parts.push("Tổng quan đánh giá tư thế cho thấy sự thẳng hàng cân bằng trên mặt phẳng trán");
        else if (frontStatus === 'MILD_ASYMMETRY') parts.push("Tổng quan đánh giá tư thế cho thấy sự mất cân đối nhẹ trên mặt phẳng trán");
        else parts.push("Tổng quan đánh giá tư thế cho thấy sự mất cân bằng đáng chú ý trên mặt phẳng trán");
    }

    // Back
    if (backMetrics) {
        const backStatus = getBackViewStatus(backMetrics);
        if (backStatus === 'SYMMETRICAL_ALIGNMENT') parts.push("được hỗ trợ bởi sự thẳng hàng cân đối từ phía sau");
        else if (backStatus === 'FUNCTIONAL_COMPENSATION') parts.push("với các mô hình bù trừ được quan sát từ phía sau");
        else parts.push("với độ lệch ngang rõ rệt được quan sát từ phía sau");
    }

    let summary = parts.join(", ") + ". ";

    // Side (covers SIDE, LEFT, RIGHT)
    if (sideMetrics) {
        const sideStatus = getSideViewStatus(sideMetrics);
        summary += "Phân tích mặt phẳng đứng dọc (Sagittal) tiết lộ ";
        if (sideStatus === 'NEUTRAL') summary += "vị trí đầu và cổ cân bằng.";
        else if (sideStatus === 'MILD_FHP') summary += "vị trí đầu nhô ra trước liên quan đến tăng tải trọng lên cổ.";
        else summary += "tư thế đầu nhô ra trước đáng kể và tải trọng lên cổ cao.";

        if (sideStatus !== 'NEUTRAL') {
            summary += " Nhận thức về tư thế và điều chỉnh được khuyến nghị để giảm căng thẳng lâu dài.";
        } else {
            summary += " Tiếp tục duy trì thói quen hiện tại được khuyến nghị.";
        }
    }



    // Legs (from Front)
    if (frontMetrics && frontMetrics.legAnalysis) {
        const legStatus = getLegStatus(frontMetrics);
        if (legStatus === 'O_LEGS') summary += " Ngoài ra, quan sát thấy dấu hiệu chân vòng kiềng.";
        else if (legStatus === 'X_LEGS') summary += " Ngoài ra, quan sát thấy dấu hiệu chân chữ X.";
        else if (legStatus === 'NORMAL') summary += " Hình dáng chân duy trì sự thẳng hàng sinh lý tốt.";
    }

    // Knee Flexion (from Side)
    if (sideMetrics && sideMetrics.kneeAnalysis) {
        const kneeStatus = getKneeFlexionStatus(sideMetrics);
        if (kneeStatus === 'FLEXION') summary += " Bên cạnh đó, ghi nhận tình trạng đầu gối bị cong khi đứng (Knee Flexion).";
        else if (kneeStatus === 'HYPEREXTENSION') summary += " Bên cạnh đó, ghi nhận tình trạng đầu gối duỗi quá mức (Knee Hyperextension).";
    }

    return summary;
}

function getLegStatus(metrics) {
    if (!metrics || !metrics.legAnalysis) return 'UNKNOWN';
    const { kneeDist, ankleDist } = metrics.legAnalysis;
    const kDist = parseFloat(kneeDist);
    const aDist = parseFloat(ankleDist);

    // O-LEGS (Genu Varum): Knees far apart (>2in) when ankles close
    if (kDist > 2.0 && aDist <= 2.0) return 'O_LEGS';

    // X-LEGS (Genu Valgum): Ankles far apart (>2in) when knees close
    if (aDist > 2.0 && kDist <= 2.0) return 'X_LEGS';

    // NORMAL
    return 'NORMAL';
}

function generateLegNarrative(metrics) {
    const status = getLegStatus(metrics);
    if (status === 'NORMAL') {
        return "Hai chân tương đối thẳng, không có dấu hiệu cong vòng kiềng (O-Legs) hay chụm đầu gối (X-Legs). Trục xương đùi và xương chày nằm trên một đường thẳng sinh lý.";
    } else if (status === 'O_LEGS') {
        return "Báo cáo ghi nhận khoảng cách giữa hai đầu gối rộng hơn bình thường khi đứng thẳng (Chân vòng kiềng/O-Legs). Điều này có thể làm tăng áp lực lên khoang trong khớp gối và gây mòn sụn khớp theo thời gian.";
    } else if (status === 'X_LEGS') {
        return "Báo cáo ghi nhận hai đầu gối có xu hướng chụm vào nhau trong khi hai mắt cá chân cách xa (Chân chữ X/X-Legs). Tư thế này có thể làm tăng căng thẳng lên dây chằng bên trong và mặt ngoài khớp gối.";
    }
    return "";
}

function getKneeFlexionStatus(metrics) {
    if (!metrics || !metrics.kneeAnalysis) return 'UNKNOWN';
    const angle = metrics.kneeAnalysis.angle;

    // Hyperextension > 185
    if (angle > 185) return 'HYPEREXTENSION';
    // Flexion < 170
    if (angle < 170) return 'FLEXION';
    // Normal 170-185 (Ruleset: 175-185, but gap 170-175? defined as normal scope usually, assuming normal is default)
    return 'NORMAL';
}

function generateKneeFlexionNarrative(metrics) {
    const status = getKneeFlexionStatus(metrics);
    if (status === 'NORMAL') {
        return "Khớp gối duy trì độ duỗi gần như trung tính, cho thấy sự phân phối tải trọng thích hợp qua khớp gối khi đứng.";
    } else if (status === 'FLEXION') {
        return "Tư thế này cho thấy đầu gối bị cong khi đứng. Nếu tình trạng này kéo dài, có thể làm tăng gánh nặng lên khớp gối, đồng thời ảnh hưởng đến chuỗi vận động phía sau, làm tăng nguy cơ đau khớp gối hoặc đau thắt lưng.";
    } else if (status === 'HYPEREXTENSION') {
        return "Báo cáo ghi nhận xu hướng duỗi quá mức tại khớp gối. Nếu duy trì trong thời gian dài, tình trạng này có thể làm tăng áp lực lên dây chằng và cấu trúc quanh khớp gối.";
    }
    return "";
}

function getNeckInclinationStatus(metrics) {
    if (!metrics || !metrics.neckAnalysis) return 'UNKNOWN';
    const angle = metrics.neckAnalysis.angle;

    // Forward > 10 (Ruleset says > 7-10)
    if (angle > 10) return 'FORWARD';
    // Normal <= 10
    return 'NORMAL';
}

function generateNeckInclinationNarrative(metrics) {
    const status = getNeckInclinationStatus(metrics);
    if (status === 'NORMAL') {
        return "Cổ duy trì phương thẳng đứng tương đối so với trục dọc cơ thể, cho thấy tải trọng lên vùng cổ nằm trong giới hạn sinh lý phù hợp.";
    } else if (status === 'FORWARD') {
        return "Cổ có xu hướng nghiêng và nhô về phía trước, làm gia tăng áp lực lên vùng cổ. Nếu tình trạng này kéo dài, có khả năng gây cứng cổ, đau cổ và mỏi vùng vai gáy.";
    }
    return "";
}

/**
 * Draw Measurement Visuals (Ported from VirtualTrainer)
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Object} visuals - visual data from calculatePostureMetrics
 * @param {Number} width - Canvas Width
 * @param {Number} height - Canvas Height
 */
function drawMeasurementVisuals(ctx, visuals, width, height) {
    if (!visuals || !visuals.lines) return;

    // Sort lines by Y coordinate (y1) to handle collision detection top-down
    const sortedLines = [...visuals.lines].sort((a, b) => (a.y1 * height) - (b.y1 * height));

    const plumbPixel = visuals.plumbLineX * width;
    let lastRightY = -100;
    let lastLeftY = -100;
    const spacing = 25; // Min vertical spacing

    sortedLines.forEach(line => {
        const x1 = line.x1 * width;
        const y1 = line.y1 * height;
        const x2 = line.x2 * width;
        const y2 = line.y2 * height;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = line.color || 'red';
        ctx.lineWidth = line.width || 2;
        if (line.dashed) ctx.setLineDash([5, 5]);
        else ctx.setLineDash([]);
        ctx.stroke();

        // Label
        if (line.label) {
            ctx.font = 'bold 12px Inter, sans-serif';
            const tw = ctx.measureText(line.label).width;
            const padding = 8;
            const th = 20;

            let bgX, bgY = (y1 + y2) / 2 - 10;

            if (line.align === 'leader_right') {
                // Position text 100px to RIGHT of Plumb Line (Standardized)
                bgX = plumbPixel + 100;

                // Collision Detection (Right)
                if (bgY < lastRightY + spacing) {
                    bgY = lastRightY + spacing;
                }
                lastRightY = bgY;

                // Draw Leader Line (From Body Point -> Text)
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(bgX, bgY + 10);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 1;
                ctx.setLineDash([]);
                ctx.stroke();

                // Anchor Dot at Body Point
                ctx.beginPath();
                ctx.arc(x1, y1, 3, 0, 2 * Math.PI);
                ctx.fillStyle = '#facc15';
                ctx.fill();

            } else if (line.align === 'leader_left') {
                // Position text 100px to LEFT of Plumb Line (Standardized)
                bgX = plumbPixel - 100 - tw - padding;

                // Collision Detection (Left)
                if (bgY < lastLeftY + spacing) {
                    bgY = lastLeftY + spacing;
                }
                lastLeftY = bgY;

                // Draw Leader Line
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(bgX + tw + padding, bgY + 10);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 1;
                ctx.setLineDash([]);
                ctx.stroke();

                // Anchor Dot
                ctx.beginPath();
                ctx.arc(x1, y1, 3, 0, 2 * Math.PI);
                ctx.fillStyle = '#facc15';
                ctx.fill();

            } else if (line.align === 'right') {
                // Align Right: Place text to LEFT of x1 (Point)
                bgX = x1 - tw - padding - 8;
            } else if (line.align === 'left') {
                // Align Left: Place text to RIGHT of x1 (Point)
                bgX = x1 + 8;
            } else if (line.align === 'top') {
                // Align Top: Place text at the top of the line (x1, y1) centered
                bgX = x1 - (tw + padding) / 2;
                bgY = y1 - th - 5; // Above the start point
            } else {
                // Default Center
                bgX = (x1 + x2) / 2 - (tw + padding) / 2;
                // Move bgX to ensure it's centered on line midpoint
            }

            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(bgX, bgY, tw + padding, th);
            // Border for box
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 1;
            ctx.strokeRect(bgX, bgY, tw + padding, th);

            ctx.fillStyle = 'white';
            ctx.fillText(line.label, bgX + 4, bgY + 14);
        }
    });
}
