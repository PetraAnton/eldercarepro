// Common Utility Functions for Daycare System

// --- Authentication ---

/**
 * Check if user is logged in
 */
function checkLogin() {
    const sess = localStorage.getItem('mirabocaresync_session');
    if (!sess) {
        // Show login overlay
        const overlay = document.getElementById('login-overlay');
        if (overlay) overlay.classList.remove('hidden');
    } else {
        // Verify session validity (mock)
        try {
            const session = JSON.parse(sess);
            if (new Date().getTime() > session.expiry) {
                logout();
            } else {
                // Hide login overlay
                const overlay = document.getElementById('login-overlay');
                if (overlay) overlay.classList.add('hidden');

                // Update specific UI elements with user info
                const userNameEl = document.getElementById('header-user-name');
                const userRoleEl = document.getElementById('header-user-role');
                const userAvatarEl = document.getElementById('header-user-avatar');

                if (userNameEl) userNameEl.textContent = session.user.fullName;
                if (userRoleEl) userRoleEl.textContent = session.user.role === 'admin' ? 'Quản trị viên' : 'Nhân viên';
                if (userAvatarEl) userAvatarEl.textContent = session.user.fullName.charAt(0).toUpperCase();
            }
        } catch (e) {
            logout();
        }
    }
}

/**
 * Register new user
 * @param {string} fullName 
 * @param {string} username 
 * @param {string} password 
 */
function register(fullName, username, password) {
    const users = JSON.parse(localStorage.getItem('mirabocaresync_users') || '[]');

    // Check if username exists
    if (users.find(u => u.username === username)) {
        throw new Error('Tên đăng nhập đã tồn tại');
    }

    const newUser = {
        id: 'USR-' + Date.now(),
        fullName,
        username,
        password, // In a real app, hash this!
        role: 'staff',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('mirabocaresync_users', JSON.stringify(users));
    return newUser;
}

/**
 * Login user
 * @param {string} username 
 * @param {string} password 
 * @param {boolean} remember
 */
function login(username, password, remember = false) {
    // Helper to handle remember
    const handleRemember = () => {
        if (remember) {
            localStorage.setItem('mirabocaresync_remembered_username', username);
        } else {
            localStorage.removeItem('mirabocaresync_remembered_username');
        }
    };

    // 1. Check default admin
    if (username === 'admin') {
        const adminPw = localStorage.getItem('mirabocaresync_admin_pw') || 'admin';
        if (password === adminPw) {
            createSession({
                id: 'ADMIN-001',
                fullName: 'Administrator',
                username: 'admin',
                role: 'admin'
            }, remember);
            handleRemember();
            return true;
        } else {
            throw new Error('Mật khẩu không đúng');
        }
    }

    // 2. Check registered users
    const users = JSON.parse(localStorage.getItem('mirabocaresync_users') || '[]');
    const user = users.find(u => u.username === username);

    if (user) {
        if (user.password === password) {
            createSession(user, remember);
            handleRemember();
            return true;
        } else {
            throw new Error('Mật khẩu không đúng');
        }
    }

    throw new Error('Tài khoản không tồn tại');
}

/**
 * Create session
 * @param {Object} user 
 * @param {boolean} remember
 */
function createSession(user, remember = false) {
    const duration = remember ? (30 * 24 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 30 days vs 24 hours
    const session = {
        user: {
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            role: user.role
        },
        expiry: new Date().getTime() + duration
    };
    localStorage.setItem('mirabocaresync_session', JSON.stringify(session));
}

/**
 * Change user password
 * @param {string} username 
 * @param {string} oldPassword 
 * @param {string} newPassword 
 */
function changePassword(username, oldPassword, newPassword) {
    const users = JSON.parse(localStorage.getItem('mirabocaresync_users') || '[]');
    const userIndex = users.findIndex(u => u.username === username);

    // Special case for admin (can't change default admin password in this mock, or maybe we allow it via localstorage override?)
    if (username === 'admin') {
        if (oldPassword === 'admin') {
            // For mockup simplicity, we won't actually change the hardcoded admin, 
            // but we'll pretend or maybe store an override. 
            // Let's just say "Admin password cannot be changed in demo" or allow it via localStorage
            // Let's implement localStorage override for admin
            const adminOverride = localStorage.getItem('mirabocaresync_admin_pw');
            if (adminOverride && adminOverride !== oldPassword) throw new Error('Mật khẩu cũ không đúng');
            if (!adminOverride && oldPassword !== 'admin') throw new Error('Mật khẩu cũ không đúng');

            localStorage.setItem('mirabocaresync_admin_pw', newPassword);
            return true;
        } else {
            const adminOverride = localStorage.getItem('mirabocaresync_admin_pw');
            if (adminOverride && adminOverride === oldPassword) {
                localStorage.setItem('mirabocaresync_admin_pw', newPassword);
                return true;
            }
        }
        throw new Error('Mật khẩu cũ không đúng');
    }

    if (userIndex === -1) throw new Error('Người dùng không tồn tại');

    if (users[userIndex].password !== oldPassword) {
        throw new Error('Mật khẩu cũ không đúng');
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('mirabocaresync_users', JSON.stringify(users));
    users[userIndex].password = newPassword;
    localStorage.setItem('mirabocaresync_users', JSON.stringify(users));
    return true;
}

/**
 * Update user profile (FHIR Practitioner fields)
 * @param {string} username
 * @param {Object} profileData 
 */
function updateUserProfile(username, profileData) {
    // 1. Update in Users DB
    const users = JSON.parse(localStorage.getItem('mirabocaresync_users') || '[]');
    const userIndex = users.findIndex(u => u.username === username);

    // Handle Admin special case (mock) - allow saving profile for admin too
    if (username === 'admin') {
        let adminProfile = JSON.parse(localStorage.getItem('mirabocaresync_admin_profile') || '{}');
        adminProfile = { ...adminProfile, ...profileData };
        localStorage.setItem('mirabocaresync_admin_profile', JSON.stringify(adminProfile));

        // Update session if currently logged in as admin
        const sess = JSON.parse(localStorage.getItem('mirabocaresync_session'));
        if (sess && sess.user.username === 'admin') {
            sess.user = { ...sess.user, ...profileData };
            localStorage.setItem('mirabocaresync_session', JSON.stringify(sess));
        }
        return true;
    }

    if (userIndex === -1) throw new Error('Người dùng không tồn tại');

    // Merge new data
    users[userIndex] = { ...users[userIndex], ...profileData };
    localStorage.setItem('mirabocaresync_users', JSON.stringify(users));

    // 2. Update current session if it matches
    const sess = JSON.parse(localStorage.getItem('mirabocaresync_session'));
    if (sess && sess.user.username === username) {
        sess.user = { ...sess.user, ...profileData };
        localStorage.setItem('mirabocaresync_session', JSON.stringify(sess));
    }

    return true;
}

/**
 * Get full user profile
 */
function getUserProfile(username) {
    if (username === 'admin') {
        const base = { id: 'ADMIN-001', fullName: 'Administrator', username: 'admin', role: 'admin' };
        const extra = JSON.parse(localStorage.getItem('mirabocaresync_admin_profile') || '{}');
        return { ...base, ...extra };
    }

    const users = JSON.parse(localStorage.getItem('mirabocaresync_users') || '[]');
    return users.find(u => u.username === username);
}
/**
 * Clear all module data for the currently selected user
 * Preserves the user record itself and only removes module data (1-9)
 */
function clearCurrentUserData() {
    const userId = getCurrentUserId();

    if (!userId) {
        showToast('Vui lòng chọn người dùng trước', 'error');
        return;
    }

    // Confirm action
    if (!confirm(`Bạn có chắc muốn xóa TẤT CẢ dữ liệu của người dùng này?\n\nThông tin người dùng sẽ được giữ lại, nhưng tất cả dữ liệu đánh giá (Module 1-9) sẽ bị xóa vĩnh viễn.`)) {
        return;
    }

    // List of all module data keys to remove
    const moduleKeys = [
        `mirabocaresync_${userId}_facesheet`,           // Module 1
        `mirabocaresync_${userId}_meetings`,            // Module 2
        `mirabocaresync_${userId}_adl_assessment`,      // Module 3
        `mirabocaresync_${userId}_interests_assessment`,// Module 4
        `mirabocaresync_${userId}_plan`,                // Module 5
        `mirabocaresync_${userId}_body_assessments`,    // Module 6
        `mirabo_m7_records_${userId}`,                  // Module 7
        `mirabocaresync_${userId}_privacy`,             // Module 8
        `mirabocaresync_${userId}_home_survey`,         // Module 9
        `mirabocaresync_${userId}_status`               // Status tracking
    ];

    // Remove all module data
    moduleKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log(`[ClearData] Removed: ${key}`);
    });

    showToast(`Đã xóa tất cả dữ liệu của người dùng ${userId}`, 'success');

    // Reload to refresh UI
    setTimeout(() => {
        location.reload();
    }, 1000);
}

/**
 * Reset ALL demo data (for complete system reset)
 * This clears everything including all users
 */
function resetDemoData() {
    if (!confirm('CẢNH BÁO: Thao tác này sẽ xóa TẤT CẢ dữ liệu trong hệ thống!\n\nBao gồm:\n- Tất cả người dùng\n- Tất cả dữ liệu đánh giá\n- Tất cả cài đặt\n\nBạn có chắc chắn muốn tiếp tục?')) {
        return;
    }

    // Full wipe as requested
    console.log('[ResetDemo] Wiping all mirabo data...');
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('mirabocaresync_') || key.startsWith('mirabo_')) {
            // Keep Session and Admin data
            if (key.includes('_session') ||
                key.includes('_admin_pw') ||
                key.includes('_admin_profile') ||
                key.includes('_remembered_username')) {
                continue;
            }
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(k => localStorage.removeItem(k));

    showToast('Đã xóa toàn bộ dữ liệu hệ thống', 'success');

    setTimeout(() => {
        location.reload();
    }, 1000);
}

/**
 * Logout user
 */
/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('mirabocaresync_session');
    localStorage.removeItem('mirabocaresync_active_patient'); // Fix: Clear active patient reference
    location.reload(); // Reload to show login screen
}

// --- User Management (Service Users) ---

/**
 * Get storage key for patients based on logged in staff
 */
function getPatientStorageKey() {
    try {
        const sess = JSON.parse(localStorage.getItem('mirabocaresync_session'));
        if (sess && sess.user && sess.user.username) {
            return `mirabocaresync_patients_${sess.user.username}`;
        }
    } catch (e) { console.error(e); }
    return 'mirabocaresync_patients_global'; // Fallback
}

/**
 * Get all users from localStorage
 * @returns {Array} Array of user objects
 */
function getAllUsers() {
    const storageKey = getPatientStorageKey();
    let users = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // AUTO-GENERATION DISABLED: User requested manual generation only
    // if (users.length === 0) {
    //     users = generateDummyUsers();
    //     localStorage.setItem(storageKey, JSON.stringify(users));
    // }

    return users;
}

/**
 * Generate 10 dummy users for testing
 * @returns {Array} Array of user objects
 */
/**
 * Generate 5 comprehensive dummy users with full profile data for Modules 1-10
 * @returns {Array} Array of user objects
 */
function generateDummyUsers() {
    console.log('Generating comprehensive dummy data for 5 users (Modules 1-10)...');

    // --- Helpers ---
    const tinyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // 1x1 px transparent/white
    const rInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const rItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getDate = (daysAgo) => {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        return d.toISOString().split('T')[0];
    };

    // --- Pools ---
    const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng'];
    const middleNames = ['Văn', 'Thị', 'Đức', 'Ngọc', 'Minh', 'Thanh', 'Hữu', 'Thu', 'Quang', 'Xuân'];
    const firstNames = ['An', 'Bình', 'Cường', 'Dung', 'Phúc', 'Giang', 'Hà', 'Hiếu', 'Khánh', 'Lan', 'Minh', 'Nam', 'Oanh', 'Phú', 'Quân', 'Sơn', 'Tâm', 'Uyên', 'Vinh', 'Yến'];
    const careLevels = ['Chăm sóc 1', 'Chăm sóc 2', 'Chăm sóc 3', 'Chăm sóc 4', 'Chăm sóc 5'];

    const users = [];
    const currentYear = new Date().getFullYear();

    for (let i = 1; i <= 5; i++) {
        // --- 0. Identity ---
        const lastName = rItem(lastNames);
        const middleName = rItem(middleNames);
        const firstName = rItem(firstNames);
        const fullName = `${lastName} ${middleName} ${firstName}`;

        // Gender logic
        let gender = Math.random() > 0.5 ? 'male' : 'female';
        if (['Thị', 'Thu', 'Oanh', 'Lan', 'Uyên', 'Yến'].includes(middleName)) gender = 'female';
        if (['Văn', 'Đức', 'Hữu', 'Quang', 'Sơn', 'Quân'].includes(middleName)) gender = 'male';

        const age = rInt(65, 90);
        const birthYear = currentYear - age;
        const dob = `${birthYear}-${String(rInt(1, 12)).padStart(2, '0')}-${String(rInt(1, 28)).padStart(2, '0')}`;
        const userId = String(i).padStart(3, '0') + '-DAY-' + String(currentYear).slice(-2);
        const careLevel = rItem(careLevels);

        // --- 1. Module 1: Face Sheet ---
        const module1Data = {
            admin: {
                consultationDate: getDate(rInt(30, 60)),
                creator: 'Admin System',
                type: 'day_service',
                residenceStatus: Math.random() > 0.7 ? 'facility' : 'home'
            },
            basic: {
                nickname: '',
                fullName: fullName.toUpperCase(),
                gender: gender,
                dob: dob,
                age: age + ' tuổi',
                postalCode: '70000',
                fullAddress: `${rInt(1, 999)} Đường Nguyễn Văn Linh, Hà Nội`,
                fixedPhone: '024' + rInt(1000000, 9999999),
                mobilePhone: '09' + rInt(10000000, 99999999)
            },
            disability: {
                level: rItem(['independent', 'J1', 'J2', 'A1', 'A2']),
                dementiaLevel: rItem(['independent', 'I', 'IIa', 'IIb']),
                careLevel: 'care_' + rInt(1, 5),
                certStartDate: `${currentYear}-01-01`,
                certEndDate: `${currentYear + 2}-01-01`,
                checklistResult: 'eligible',
                checklistDate: getDate(10),
                types: [],
                otherType: ''
            },
            environment: { housingType: 'house', roomType: 'private', floorNumber: '1', renovation: 'no' },
            economic: { incomeSources: ['pension'], otherIncome: '' },
            contacts: [{ name: `${lastName} Văn Z`, relation: 'Con trai', address: 'Cùng địa chỉ' }],
            others: { genogramDesc: 'Gia đình hòa thuận.', familyRelations: 'Tốt', preventionServiceDesire: 'yes' },
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(`mirabocaresync_${userId}_facesheet`, JSON.stringify(module1Data));

        // --- 2. Module 2: Meetings (History) ---
        // DISABLED: User requested no dummy data for Module 2
        // const meetings = [
        //    { meetingDate: getDate(60), meetingTime: '09:00', meetingLocation: 'Phòng họp 1', discussion: { familyWishes: 'Mong muốn cải thiện sức khỏe.' }, conclusions: { carePlanContent: 'Tập vận động nhẹ.' } },
        //    { meetingDate: getDate(30), meetingTime: '14:00', meetingLocation: 'Phòng họp 2', discussion: { familyWishes: 'Gia đình hài lòng.' }, conclusions: { carePlanContent: 'Duy trì bài tập.' } }
        // ];
        // localStorage.setItem(`mirabocaresync_${userId}_meetings`, JSON.stringify(meetings));

        // --- 3. Module 3: ADL/IADL ---
        const adlData = {
            adl: {
                feeding: { level: 10, hasProblem: false },
                bathing: { level: 5, hasProblem: true, notes: 'Cần ghế tắm' },
                grooming: { level: 5, hasProblem: false },
                dressing: { level: 5, hasProblem: true },
                bowel: { level: 10, hasProblem: false },
                bladder: { level: 10, hasProblem: false },
                toilet: { level: 10, hasProblem: false },
                transfer: { level: 15, hasProblem: false },
                mobility: { level: 10, hasProblem: true },
                stairs: { level: 5, hasProblem: true }
            },
            iadl: {
                phone: { level: 1, hasProblem: false },
                shopping: { level: 0, hasProblem: true },
                foodPrep: { level: 1, hasProblem: false },
                housekeeping: { level: 1, hasProblem: false },
                laundry: { level: 1, hasProblem: false },
                transport: { level: 0, hasProblem: true },
                meds: { level: 1, hasProblem: false },
                finance: { level: 0, hasProblem: true }
            },
            adlEnvironment: 'Nhà sàn gỗ, có tay vịn cầu thang.',
            adlProblems: 'Khó khăn khi đi lại xa.',
            generalNotes: 'Cần người hỗ trợ khi ra ngoài.',
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(`mirabocaresync_${userId}_adl_assessment`, JSON.stringify(adlData));

        // --- 4. Module 4: Interests ---
        const interests = {
            history: { job: 'Cán bộ hưu trí', hobbies: 'Xem TV, Đọc báo' },
            preferences: { food: 'Ăn nhạt', music: 'Nhạc đỏ', activities: ['Cờ tướng', 'Đọc sách'] },
            matrix: { sports: 2, music: 4, reading: 5, social: 3 },
            notes: 'Hòa đồng, vui vẻ.'
        };
        localStorage.setItem(`mirabocaresync_${userId}_interests_assessment`, JSON.stringify(interests));

        // --- 5. Module 5: Care Plan ---
        const plan = {
            startDate: getDate(0),
            longTermGoals: [{ text: 'Duy trì chức năng sinh hoạt', deadline: getDate(-180) }],
            shortTermGoals: [{ text: 'Tăng cường sức mạnh cơ chân', deadline: getDate(-30) }],
            supports: [{ service: 'Vật lý trị liệu', frequency: '2 lần/tuần' }],
            schedule: { monday: 'Sáng: Tập gym, Chiều: Nghỉ', wednesday: 'Sáng: Cờ tướng' }
        };
        localStorage.setItem(`mirabocaresync_${userId}_plan`, JSON.stringify(plan)); // Key might differ slightly in mod5? No, inferred from grep.

        // --- 6. Module 6: Body Composition (History) ---
        // DISABLED: User requested no dummy data for Module 6
        // const bodyHistory = [
        //     { assessmentDate: getDate(30), general: { height: 165, weight: 60, bmi: 22, bodyFat: 25, muscleMass: 42 }, muscle: { rightArm: 2.2, leftArm: 2.1, rightLeg: 7.5, leftLeg: 7.4, trunk: 22 }, notes: 'Lần đầu' },
        //     { assessmentDate: getDate(0), general: { height: 165, weight: 61, bmi: 22.4, bodyFat: 24.5, muscleMass: 42.5 }, muscle: { rightArm: 2.3, leftArm: 2.2, rightLeg: 7.6, leftLeg: 7.5, trunk: 22.2 }, notes: 'Có cải thiện' }
        // ];
        // localStorage.setItem(`mirabocaresync_${userId}_body_assessments`, JSON.stringify(bodyHistory));

        // --- 7. Module 7: Motor Function ---
        // DISABLED: User requested no dummy data for Module 7
        // const motorHistory = [
        //     { id: `m7_${userId}_1`, date: getDate(30), totalScore: 70, rating: 'Trung bình', comment: 'Cần nỗ lực' },
        //     { id: `m7_${userId}_2`, date: getDate(0), totalScore: 75, rating: 'Khá', comment: 'Tiến bộ tốt' }
        // ];
        // localStorage.setItem(`mirabo_m7_records_${userId}`, JSON.stringify(motorHistory));

        // --- 8. Module 8: Privacy ---
        localStorage.setItem(`mirabocaresync_${userId}_privacy`, JSON.stringify({ lastUpdated: getDate(0), notes: 'Đã đồng ý chia sẻ thông tin.' }));

        // --- 9. Module 9: Home Survey ---
        localStorage.setItem(`mirabocaresync_${userId}_home_survey`, JSON.stringify({ surveyDate: getDate(60), address: module1Data.basic.fullAddress, notes: 'Nhà cửa gọn gàng' }));

        // --- 10. Module 10: Posture History ---
        // DISABLED: User requested no dummy data for Module 10
        // const postureHistory = [
        //     {
        //         id: `ph_${userId}_${Date.now() - 86400000}`,
        //         date: getDate(30),
        //         timestamp: Date.now() - 86400000,
        //         viewMode: 'FRONT',
        //         captures: { FRONT: { image: tinyImage, landmarks: [] } },
        //         analysis: { metrics: { headTilt: 2, shoulderLevel: 1 }, conclusions: ['Tư thế đầu hơi nghiêng phải', 'Vai phải thấp hơn vai trái'] }
        //     },
        //     {
        //         id: `ph_${userId}_${Date.now()}`,
        //         date: getDate(0),
        //         timestamp: Date.now(),
        //         viewMode: 'SIDE',
        //         captures: { SIDE: { image: tinyImage, landmarks: [] } },
        //         analysis: { metrics: { neckFlexion: 5 }, conclusions: ['Cổ hơi gập về phía trước (Forward Head Posture)'] }
        //     }
        // ];
        // localStorage.setItem(`mirabocaresync_posture_history_${userId}`, JSON.stringify(postureHistory));


        // --- Status ---
        const status = { module1: true, module2: true, module3: true, module4: true, module5: true, module6: true, module7: true, module8: true, module9: true, module10: true };
        localStorage.setItem(`mirabocaresync_${userId}_status`, JSON.stringify(status));

        // Push User
        users.push({
            id: userId,
            fullName: fullName,
            dateOfBirth: dob,
            gender: gender,
            careLevel: careLevel,
            active: true,
            status: 'active',
            createdAt: new Date().toISOString()
        });
    }

    // Save User List (Scoped)
    const storageKey = getPatientStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(users));

    return users;
}

/**
 * Get the currently active user ID
 * @returns {string} Active user ID
 */
function getCurrentUserId() {
    const activeUserId = localStorage.getItem('mirabocaresync_active_patient');

    // If no active user, check if any users exist
    if (!activeUserId) {
        const users = getAllUsers();
        if (users.length > 0) {
            // Set first user as active
            setCurrentUserId(users[0].id);
            return users[0].id;
        }
        // No users exist, return default
        return '001-DAY-23';
    }

    return activeUserId;
}

/**
 * Set the active user ID
 * @param {string} userId 
 */
function setCurrentUserId(userId) {
    localStorage.setItem('mirabocaresync_active_patient', userId);
}

/**
 * Create a new user
 * @param {Object} userData - User information
 * @returns {Object} Created user object
 */
function createUser(userData) {
    const users = getAllUsers();

    // Generate ID
    const nextNumber = users.length + 1;
    const userId = String(nextNumber).padStart(3, '0') + '-DAY-' + new Date().getFullYear().toString().slice(-2);

    const newUser = {
        id: userId,
        fullName: userData.fullName,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender,
        careLevel: userData.careLevel || 'Chăm sóc 1',
        active: true,
        status: 'active',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    const storageKey = getPatientStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(users));

    // Set as active user
    setCurrentUserId(userId);

    return newUser;
}

/**
 * Deactivate a user (soft delete)
 * @param {string} userId 
 * @param {string} reason - discharged, transferred, deceased, other
 * @param {string} notes - Additional notes
 */
function deactivateUser(userId, reason, notes) {
    const users = getAllUsers();
    const user = users.find(u => u.id === userId);

    if (user) {
        user.active = false;
        user.status = reason === 'deceased' ? 'deceased' : 'inactive';
        user.deactivatedDate = new Date().toISOString();
        user.deactivationReason = reason;
        user.deactivationNotes = notes || '';

        const storageKey = getPatientStorageKey();
        localStorage.setItem(storageKey, JSON.stringify(users));
        return true;
    }
    return false;
}

/**
 * Reactivate a user
 * @param {string} userId 
 */
function reactivateUser(userId) {
    const users = getAllUsers();
    const user = users.find(u => u.id === userId);

    if (user) {
        user.active = true;
        user.status = 'active';
        user.reactivatedDate = new Date().toISOString();

        const storageKey = getPatientStorageKey();
        localStorage.setItem(storageKey, JSON.stringify(users));
        return true;
    }
    return false;
}

/**
 * Soft delete an assessment record
 * @param {string} storageKey - localStorage key for the assessments array
 * @param {number} recordIndex - Index of record to delete
 * @param {string} reason - Reason for deletion
 * @param {string} notes - Additional notes
 * @returns {boolean} Success status
 */
function deleteAssessmentRecord(storageKey, recordIndex, reason, notes) {
    const records = JSON.parse(localStorage.getItem(storageKey) || '[]');

    if (recordIndex < 0 || recordIndex >= records.length) {
        return false;
    }

    // Soft delete: mark as deleted
    records[recordIndex].deleted = true;
    records[recordIndex].deletedDate = new Date().toISOString();
    records[recordIndex].deletedReason = reason;
    records[recordIndex].deletedNotes = notes || '';

    localStorage.setItem(storageKey, JSON.stringify(records));
    return true;
}

/**
 * Get user by ID (Care User)
 * @param {string} userId 
 * @returns {Object|null} User object or null
 */
function getUserById(userId) {
    const users = getAllUsers();
    return users.find(u => u.id === userId) || null;
}

// --- User/Patient Context ---

// --- Form Management ---

/**
 * Sets up change detection on a form to enable/highlight the save button.
 * Only enables save button when actual changes are detected.
 * @param {string} formId 
 * @param {string} saveBtnId 
 * @param {function(boolean)} [onStateChange] - Optional callback receiving isDirty status
 * @returns {function} Function to reset the form state (disable save button)
 */
function setupFormChangeDetection(formId, saveBtnId, onStateChange) {
    const form = document.getElementById(formId);
    const saveBtn = document.getElementById(saveBtnId);

    if (!form || !saveBtn) return () => { };

    // Capture initial form state
    let initialState = captureFormState(form);

    // Disable save button initially
    saveBtn.disabled = true;
    saveBtn.classList.add('opacity-50', 'cursor-not-allowed');

    const checkForChanges = () => {
        const currentState = captureFormState(form);
        const hasChanges = !areStatesEqual(initialState, currentState);

        if (hasChanges) {
            // Enable and highlight save button
            saveBtn.disabled = false;
            saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            saveBtn.classList.add('ring-4', 'ring-blue-200');
            // Do NOT overwrite text content as it may contain icons
            // if (!saveBtn.textContent.includes('*')) {
            //    saveBtn.textContent = saveBtn.textContent.trim() + ' *';
            // }
        } else {
            // Disable and remove highlight
            saveBtn.disabled = true;
            saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
            saveBtn.classList.remove('ring-4', 'ring-blue-200');
            // saveBtn.textContent = saveBtn.textContent.replace('*', '').trim();
        }

        // Trigger custom callback if provided
        if (typeof onStateChange === 'function') {
            onStateChange(hasChanges);
        }
    };

    form.addEventListener('input', checkForChanges);
    form.addEventListener('change', checkForChanges);

    // Return a reset function
    return () => {
        // Update initial state to current state (after save)
        initialState = captureFormState(form);

        // Reset button to disabled state
        saveBtn.disabled = true;
        saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
        saveBtn.classList.remove('ring-4', 'ring-blue-200');
        // saveBtn.textContent = saveBtn.textContent.replace('*', '').trim();

        // Reset callback state
        if (typeof onStateChange === 'function') {
            onStateChange(false);
        }
    };
}

/**
 * Capture current form state as a serialized object
 * @param {HTMLFormElement} form 
 * @returns {Object} Form state
 */
function captureFormState(form) {
    const state = {};
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            state[input.id || input.name] = input.checked;
        } else if (input.type === 'radio') {
            if (input.checked) {
                state[input.name] = input.value;
            }
        } else {
            state[input.id || input.name] = input.value;
        }
    });

    return state;
}

/**
 * Compare two form states for equality
 * @param {Object} state1 
 * @param {Object} state2 
 * @returns {boolean} True if states are equal
 */
function areStatesEqual(state1, state2) {
    const keys1 = Object.keys(state1);
    const keys2 = Object.keys(state2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (state1[key] !== state2[key]) return false;
    }

    return true;
}

// --- Feedback & Notifications ---

function showToast(message, type = 'success') {
    // Create toast container if not exists
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-5 right-5 z-[200] flex flex-col gap-3';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    const colors = type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white';

    toast.className = `${colors} px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in transform translate-y-10 opacity-0 transition-all duration-300`;
    toast.innerHTML = `
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
        <span class="font-bold text-sm">${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Module Status ---

function markModuleComplete(userId, moduleKey) {
    // Save completion status to local storage
    const statusKey = `mirabocaresync_${userId}_status`;
    const status = JSON.parse(localStorage.getItem(statusKey) || '{}');

    status[moduleKey] = true;
    localStorage.setItem(statusKey, JSON.stringify(status));

    // Update Sidebar UI if possible
    // (This would require the side bar to re-render or check status)
    console.log(`Module ${moduleKey} marked as complete for ${userId}`);
}

// --- Image Utils ---

/**
 * Compress Image using Canvas
 * @param {File} file 
 * @param {number} maxWidth 
 * @param {number} quality (0 to 1)
 * @param {function} callback 
 */
function compressImage(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Returns base64 string
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            callback(dataUrl);
        };
        img.onerror = (err) => {
            console.error("Image load error", err);
            callback(event.target.result);
        };
    };
}
