/**
 * Dummy Data Generator for Mirabo CareSync
 * Generates comprehensive data for all modules (1-9) for demo purposes.
 */

const DUMMY_USERS = [
    {
        id: 'P001',
        name: 'Nguyễn Văn An',
        gender: 'male',
        birthYear: 1945,
        address: '123 Đường Láng, Đống Đa, Hà Nội',
        phone: '0987654321',
        history: 'Cao huyết áp, Tiểu đường nhẹ'
    },
    {
        id: 'P002',
        name: 'Trần Thị Bưởi',
        gender: 'female',
        birthYear: 1950,
        address: '45 Nguyễn Trãi, Thanh Xuân, Hà Nội',
        phone: '0912345678',
        history: 'Thoái hóa khớp gối, Loãng xương'
    },
    {
        id: 'P003',
        name: 'Lê Văn Cường',
        gender: 'male',
        birthYear: 1948,
        address: '88 Phố Huế, Hai Bà Trưng, Hà Nội',
        phone: '0909090909',
        history: 'Tai biến nhẹ năm 2020, Đã hồi phục một phần'
    }
];

const GENERATOR_META = {
    assessors: ['Đd. Phạm Mai Hương', 'Bs. Lê Quốc Tuấn', 'Kt. Nguyễn Thị Lan'],
    dates: [
        '2023-10-15', // Initial
        '2023-11-20', // Follow up 1
        '2023-12-25', // Follow up 2
        '2024-01-15'  // Recent
    ]
};

window.generateDummyData = function () {
    console.log('Starting Dummy Data Generation...');

    // Clear existing data for these IDs to avoid duplicates if run multiple times
    // (Optional: clear all? No, just overwrite specific keys)

    DUMMY_USERS.forEach(user => {
        generateDataForUser(user);
    });

    // Also update the global user list (Module 0 / Main App context)
    updateGlobalUserList();

    console.log('Data generation complete. Reloading...');
    // alert('Đã tạo dữ liệu mẫu thành công cho 3 người dùng: Nguyễn Văn An, Trần Thị Bưởi, Lê Văn Cường. Vui lòng tải lại trang.');
    location.reload();
};

function updateGlobalUserList() {
    // Assuming there is a main key for list of patients, often 'mirabocaresync_patients'
    // Based on common patterns. If not, this might need adjustment.
    // Checking app.js likely reveals this, but usually standard.
    // Let's assume 'mirabocaresync_patients' stores array of basic info.
    const currentList = JSON.parse(localStorage.getItem('mirabocaresync_patients') || '[]');

    DUMMY_USERS.forEach(dummy => {
        const exists = currentList.find(p => p.id === dummy.id);
        if (!exists) {
            currentList.push({
                id: dummy.id,
                fullName: dummy.name,
                dateOfBirth: `${dummy.birthYear}-01-01`, // Approx
                gender: dummy.gender,
                phone: dummy.phone,
                address: dummy.address,
                lastUpdated: new Date().toISOString()
            });
        }
    });

    localStorage.setItem('mirabocaresync_patients', JSON.stringify(currentList));
}

function generateDataForUser(user) {
    console.log(`Generating data for ${user.name} (${user.id})...`);
    const pid = user.id;

    // --- MODULE 1: FACESHEET (Single) ---
    const faceSheet = {
        basic: {
            fullName: user.name,
            gender: user.gender,
            dob: `${user.birthYear}-05-20`,
            age: new Date().getFullYear() - user.birthYear,
            phone: user.phone,
            address: user.address,
            emergencyContact: 'Nguyễn Văn Con (Con trai) - 0999888777'
        },
        careInfo: {
            level: 'Chăm sóc độ 2',
            certId: 'BH123456789',
            expiry: '2025-12-31'
        },
        history: {
            medicalHistory: user.history,
            medications: 'Amlodipine 5mg (1 viên/ngày), Glucophage 500mg (2 viên/ngày)'
        },
        family: {
            situation: 'Sống cùng vợ/chồng và con trai út.',
            careCapacity: 'Gia đình hỗ trợ tốt buổi tối, ban ngày đi làm.'
        },
        lifestyle: {
            hobbies: 'Đọc báo, xem thời sự, trà đạo.',
            dailyRoutine: 'Dậy 6h, ăn sáng, tập nhẹ, nghỉ trưa, xem TV.'
        }
    };
    localStorage.setItem(`mirabocaresync_${pid}_facesheet`, JSON.stringify(faceSheet));


    // --- MODULE 2: MEETINGS (History Array) ---
    const meetings = GENERATOR_META.dates.slice(0, 3).map((date, idx) => ({
        meetingDate: date,
        meetingTime: '09:00',
        meetingLocation: 'Phòng họp tầng 1 - Mirabo Center',
        recorder: GENERATOR_META.assessors[0],
        participants: [
            { name: 'Nguyễn Văn Con', role: 'Đại diện gia đình' },
            { name: GENERATOR_META.assessors[1], role: 'Bác sĩ phụ trách' },
            { name: GENERATOR_META.assessors[0], role: 'Điều dưỡng trưởng' }
        ],
        discussion: {
            familyWishes: idx === 0 ? 'Mong muốn cải thiện khả năng đi lại sau tai biến.' : 'Gia đình hài lòng với tiến độ hiện tại, muốn tăng cường tập vật lý trị liệu.',
            basicInfoConfirmed: ['Đã xác nhận thông tin cá nhân (CCCD, BHYT, BHXH)', 'Đã xác nhận tình trạng sức khỏe hiện tại'],
            risksConfirmed: ['Không có tiền sử bạo lực/tự gây thương tích'],
            additionalNotes: idx === 0 ? 'Ông hơi ngại giao tiếp ban đầu.' : 'Ông đã vui vẻ hơn, tham gia hoạt động nhóm tốt.'
        },
        conclusions: {
            serviceStartDate: date,
            transportSchedule: 'Thứ 2, 4, 6 - Đón 8h, Trả 16h',
            paymentMethod: 'transfer',
            carePlanContent: `Duy trì tập phục hồi chức năng 3 buổi/tuần. Chế độ ăn giảm đường, muối. ${idx === 2 ? 'Tăng cường các bài tập thăng bằng.' : ''}`
        }
    }));
    localStorage.setItem(`mirabocaresync_${pid}_meetings`, JSON.stringify(meetings));


    // --- MODULE 3: ADL ASSESSMENT (Single Record Type, but Rich) ---
    const adlData = {
        userId: pid,
        assessmentDate: GENERATOR_META.dates[3], // Latest
        assessor: GENERATOR_META.assessors[0],
        adl: {
            feeding: { level: 10, hasProblem: false }, // Independent
            bathing: { level: 5, hasProblem: true, notes: 'Cần ghế ngồi tắm' }, // Help
            grooming: { level: 5, hasProblem: false },
            dressing: { level: 5, hasProblem: true, notes: 'Khó cài cúc áo nhỏ' },
            bowel: { level: 10, hasProblem: false },
            bladder: { level: 10, hasProblem: false },
            toilet: { level: 10, hasProblem: false },
            transfer: { level: 15, hasProblem: false },
            mobility: { level: 10, hasProblem: true, notes: 'Đi chậm, dùng gậy khi ra ngoài' }, // 10 = walks with help/aid > 50m? Barthel scoring vary. Assuming 10 = independent > 50m slightly reduced or help.
            stairs: { level: 5, hasProblem: true, notes: 'Cần người vịn' }
        },
        adlEnvironment: 'Nhà có bậc tam cấp cao, sàn nhà tắm chống trượt tốt.',
        adlProblems: 'Khó khăn trong vệ sinh cá nhân phần lưng và chân.',
        iadl: {
            phone: { level: 1, hasProblem: false },
            shopping: { level: 0, hasProblem: true }, // Can't shop indep
            foodPrep: { level: 0, hasProblem: true },
            housekeeping: { level: 1, hasProblem: false }, // Maintain house? maybe 0 if heavy
            laundry: { level: 1, hasProblem: false }, // Small items
            transport: { level: 0, hasProblem: true }, // Needs escort
            meds: { level: 1, hasProblem: false },
            finance: { level: 1, hasProblem: false }
        },
        generalNotes: 'Người dùng tỉnh táo, hợp tác tốt. Cần chú ý nguy cơ té ngã khi leo cầu thang.'
    };
    localStorage.setItem(`mirabocaresync_${pid}_adl_assessment`, JSON.stringify(adlData));


    // --- MODULE 4: INTERESTS (Single) ---
    const interestData = {
        history: {
            job: 'Giáo viên về hưu',
            hobbies: 'Đọc sách, cờ tướng'
        },
        preferences: {
            food: 'Thích đồ mềm, nhạt. Ghét đồ chiên rán.',
            music: 'Nhạc cổ điển, nhạc Trịnh.',
            activities: ['Cờ tướng', 'Thư pháp', 'Đọc báo']
        },
        matrix: {
            // Updated to matrix structure if available, or list
            'sports': 2, // 1-5 scale?
            'music': 4,
            'reading': 5,
            'games': 3,
            'social': 3
        },
        notes: 'Thích không gian yên tĩnh, không thích ồn ào.'
    };
    localStorage.setItem(`mirabocaresync_${pid}_interests_assessment`, JSON.stringify(interestData));


    // --- MODULE 5: CARE PLAN (Single) ---
    const planData = {
        startDate: GENERATOR_META.dates[3],
        longTermGoals: [
            { text: 'Duy trì khả năng tự đi lại trong nhà', deadline: '2024-12-31' },
            { text: 'Kiểm soát chỉ số đường huyết ổn định', deadline: '2024-06-30' }
        ],
        shortTermGoals: [
            { text: 'Tự tắm rửa với sự hỗ trợ tối thiểu', deadline: '2024-03-31' },
            { text: 'Tham gia CLB cờ tướng tại trung tâm 2 lần/tuần', deadline: '2024-02-28' }
        ],
        supports: [
            { service: 'Phục hồi chức năng', frequency: '3 buổi/tuần', provider: 'KTV Tuấn' },
            { service: 'Hỗ trợ ăn uống', frequency: 'Bữa trưa', provider: 'Nhà bếp' }
        ],
        schedule: {
            monday: 'Sáng: PHCN - Chiều: CLB Cờ',
            wednesday: 'Sáng: Khám định kỳ - Chiều: Nghỉ ngơi',
            friday: 'Sáng: PHCN - Chiều: Sinh hoạt chung'
        }
    };
    localStorage.setItem(`mirabocaresync_${pid}_plan`, JSON.stringify(planData));


    // --- MODULE 6: BODY COMPOSITION (History Array) ---
    // Generate trending data (e.g., muscle mass improving)
    const bodyHistory = GENERATOR_META.dates.map((date, i) => {
        const factor = i * 0.5; // Improvement factor
        return {
            assessmentDate: date,
            timestamp: new Date(date).getTime(),
            assessorName: GENERATOR_META.assessors[1],
            general: {
                height: 165,
                weight: 60 + (i * 0.2), // Gaining slight healthy weight
                bmi: (60 + (i * 0.2)) / (1.65 * 1.65),
                bodyFat: 25 - (i * 0.5), // Fat decreasing
                muscleMass: 42 + factor, // Muscle increasing
                boneMass: 2.5,
                bmr: 1350 + (i * 10)
            },
            muscle: {
                rightArm: 2.3 + (i * 0.1),
                leftArm: 2.2 + (i * 0.1),
                rightLeg: 7.5 + (i * 0.2),
                leftLeg: 7.4 + (i * 0.2),
                trunk: 22 + (i * 0.3),
                paRightArm: 4.5 + (i * 0.1), // Phase angle improving
                paRightLeg: 4.8 + (i * 0.1)
            },
            advanced: {
                smi: 6.8 + (i * 0.1), // Skeletal Muscle Index
                phaseAngle: 4.5 + (i * 0.2),
                ecwTbw: 0.39 - (i * 0.005) // Better hydration balance
            },
            notes: `Đánh giá lần ${i + 1}: ${i > 0 ? 'Có tiến bộ so với lần trước.' : 'Bắt đầu lộ trình.'}`
        };
    });
    localStorage.setItem(`mirabocaresync_${pid}_body_assessments`, JSON.stringify(bodyHistory));


    // --- MODULE 7: MOTOR FUNCTION (History Array) ---
    // Key: mirabo_m7_records_${pid}
    const motorHistory = GENERATOR_META.dates.map((date, i) => {
        const improve = i * 1.5;
        return {
            id: `m7_${pid}_${i}`,
            date: date,
            weight: 60 + (i * 0.2),
            height: 165,
            muscle: 1.1 + (i * 0.05), // kgf/kg
            agility: 6.0 + (i * 0.5), // kgf/s/kg
            stability: 50 + (i * 2), // ms? Score ranges differ, ensuring valid dummy values
            totalScore: 70 + (i * 5),
            rating: (70 + i * 5) > 90 ? 'Cao' : 'Trung bình',
            comment: 'Khả năng vận động cải thiện dần qua các bài tập.',
            advice: 'Tiếp tục duy trì squat và đi bộ hàng ngày.'
        };
    });
    localStorage.setItem(`mirabo_m7_records_${pid}`, JSON.stringify(motorHistory));


    // --- MODULE 8: PRIVACY (Single) ---
    const privacyData = {
        lastUpdated: GENERATOR_META.dates[3],
        notes: 'Đã ký đủ giấy tờ nhập viện.',
        scannedImages: [] // Empty for now, hard to generate dummy images
    };
    localStorage.setItem(`mirabocaresync_${pid}_privacy`, JSON.stringify(privacyData));


    // --- MODULE 9: HOME SURVEY (Single) ---
    const surveyData = {
        surveyDate: GENERATOR_META.dates[0],
        surveyor: GENERATOR_META.assessors[2],
        address: patient.address,
        notes: 'Nhà cấp 4, cửa ra vào rộng 90cm, đủ cho xe lăn. Cầu thang bộ hơi dốc.',
        images: [],
        lat: '21.0285', // Hanoi coords approx
        lng: '105.8542'
    };
    localStorage.setItem(`mirabocaresync_${pid}_home_survey`, JSON.stringify(surveyData));

    // --- STATUS TRACKING (Crucial for Progress Bar) ---
    const statusData = {
        // all modules complete for dummy data
        module1: true,
        module2: true,
        module3: true,
        module4: true,
        module5: true, // Plan
        module6: true,
        module7: true,
        module8: true,
        module9: true
    };
    localStorage.setItem(`mirabocaresync_${pid}_status`, JSON.stringify(statusData));
}

console.log('Dummy Data Generator Loaded. Run generateDummyData() in console or via button.');
