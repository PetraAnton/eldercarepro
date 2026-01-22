/**
 * geometryUtils.js
 * Geometry utility functions for posture analysis
 * Vanilla JS version for ElderCarePro
 */

/**
 * Calculate angle between three points (in degrees)
 * @param {Object} p1 - First point {x, y}
 * @param {Object} p2 - Vertex point {x, y}
 * @param {Object} p3 - Third point {x, y}
 * @returns {number} Angle in degrees
 */
function calculateAngle(p1, p2, p3) {
    if (!p1 || !p2 || !p3) return 0;

    const v1 = { x: p1.x - p2.x, y: p1.y - p2.y };
    const v2 = { x: p3.x - p2.x, y: p3.y - p2.y };

    const dotProduct = v1.x * v2.x + v1.y * v2.y;
    const magnitude1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const magnitude2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    if (magnitude1 === 0 || magnitude2 === 0) return 0;

    const angleRad = Math.acos(Math.max(-1, Math.min(1, dotProduct / (magnitude1 * magnitude2))));
    return angleRad * (180 / Math.PI);
}

/**
 * Calculate Euclidean distance between two points
 * @param {Object} p1 - First point {x, y, z?}
 * @param {Object} p2 - Second point {x, y, z?}
 * @returns {number} Distance
 */
function calculateDistance(p1, p2) {
    if (!p1 || !p2) return 0;

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dz = (p2.z || 0) - (p1.z || 0);

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Calculate midpoint between two points
 * @param {Object} p1 - First point {x, y, z?, visibility?}
 * @param {Object} p2 - Second point {x, y, z?, visibility?}
 * @returns {Object} Midpoint {x, y, z, visibility}
 */
function midPoint(p1, p2) {
    if (!p1 || !p2) return null;

    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
        z: ((p1.z || 0) + (p2.z || 0)) / 2,
        visibility: Math.min(p1.visibility || 1, p2.visibility || 1)
    };
}

/**
 * Linear interpolation between two points
 * @param {Object} p1 - Start point {x, y, z?, visibility?}
 * @param {Object} p2 - End point {x, y, z?, visibility?}
 * @param {number} t - Interpolation factor (0 to 1)
 * @returns {Object} Interpolated point
 */
function lerpPoint(p1, p2, t) {
    if (!p1 || !p2) return null;

    return {
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t,
        z: (p1.z || 0) + ((p2.z || 0) - (p1.z || 0)) * t,
        visibility: Math.min(p1.visibility || 1, p2.visibility || 1)
    };
}

/**
 * Convert radians to degrees
 * @param {number} rad - Angle in radians
 * @returns {number} Angle in degrees
 */
function radToDeg(rad) {
    return rad * (180 / Math.PI);
}

/**
 * Convert degrees to radians
 * @param {number} deg - Angle in degrees
 * @returns {number} Angle in radians
 */
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Normalize angle to 0-360 range
 * @param {number} angle - Angle in degrees
 * @returns {number} Normalized angle
 */
function normalizeAngle(angle) {
    while (angle < 0) angle += 360;
    while (angle >= 360) angle -= 360;
    return angle;
}
