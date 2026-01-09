// Module 2 Content - Service Provider Meeting (Vietnamese Version with Tabs)
window.module2Content = `
<div class="animate-fade-in">
    <!-- Tab Navigation -->
    <div class="flex gap-4 mb-6 border-b-2 border-slate-100">
        <button onclick="switchModule2Tab('form')" id="tab-form" 
            class="tab-button px-6 py-3 font-bold text-sm rounded-t-xl transition-all border-b-4 border-emerald-600 text-emerald-600 bg-emerald-50">
            <i data-lucide="file-edit" class="w-4 h-4 inline mr-2"></i>
            Tạo biên bản mới
        </button>
        <button onclick="switchModule2Tab('history')" id="tab-history"
            class="tab-button px-6 py-3 font-bold text-sm rounded-t-xl transition-all border-b-4 border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50">
            <i data-lucide="history" class="w-4 h-4 inline mr-2"></i>
            Lịch sử họp
        </button>
    </div>

    <!-- Tab Content: Form -->
    <div id="content-form" class="tab-content">
        <form id="module2-form" class="space-y-8">
            
            <!-- Meeting Information Header -->
            <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-100">
                <h3 class="font-black text-emerald-900 text-lg mb-6 flex items-center gap-2">
                    <i data-lucide="calendar" class="w-6 h-6"></i>
                    Thông tin Cuộc họp
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">Ngày họp <span class="text-red-500">*</span></label>
                        <input type="date" id="meetingDate" required
                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none text-sm font-semibold">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">Thời gian họp</label>
                        <input type="time" id="meetingTime"
                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none text-sm font-semibold">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">Địa điểm họp</label>
                        <input type="text" id="meetingLocation"
                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none text-sm font-semibold"
                            placeholder="Phòng họp A, Tầng 2">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">Người ghi biên bản <span class="text-red-500">*</span></label>
                        <input type="text" id="recorder" required
                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none text-sm font-semibold"
                            placeholder="Nguyễn Văn B">
                    </div>
                </div>
            </div>

            <!-- Participants Section -->
            <div class="bg-blue-50/50 rounded-3xl p-6 border border-blue-100">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="font-black text-blue-900 text-sm flex items-center gap-2">
                        <i data-lucide="users" class="w-5 h-5"></i>
                        Thành viên tham dự
                    </h3>
                    <button type="button" onclick="addParticipant()"
                        class="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all flex items-center gap-2">
                        <i data-lucide="user-plus" class="w-4 h-4"></i>
                        Thêm thành viên
                    </button>
                </div>
                
                <div id="participants-list" class="space-y-4">
                    <!-- Default participant -->
                    <div class="participant-item bg-white rounded-2xl p-4 border border-blue-100 relative">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-2">Họ tên</label>
                                <input type="text" class="participant-name w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm font-semibold"
                                    placeholder="Bác sĩ Trần Thị C">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-2">Đơn vị / Chức danh</label>
                                <input type="text" class="participant-role w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm font-semibold"
                                    placeholder="Bác sĩ điều trị">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Discussion Content -->
            <div class="bg-violet-50/50 rounded-3xl p-6 border border-violet-100">
                <h3 class="font-black text-violet-900 text-sm mb-6 flex items-center gap-2">
                    <i data-lucide="message-square" class="w-5 h-5"></i>
                    Nội dung Thảo luận
                </h3>
                
                <div class="space-y-6">
                    <!-- Family Wishes -->
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">Nguyện vọng của người sử dụng/gia đình</label>
                        <textarea id="familyWishes" rows="4"
                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all outline-none text-sm font-semibold resize-none"
                            placeholder="Gia đình mong muốn người cao tuổi được chăm sóc tốt, cải thiện khả năng vận động..."></textarea>
                    </div>

                    <!-- Basic Information Confirmation -->
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-3">Xác nhận thông tin cơ bản</label>
                        <div class="space-y-2">
                            <label class="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-violet-50 transition-all cursor-pointer">
                                <input type="checkbox" class="w-4 h-4 text-violet-600 rounded">
                                <span class="text-sm font-semibold">Đã xác nhận thông tin cá nhân (CCCD, BHYT, BHXH)</span>
                            </label>
                            <label class="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-violet-50 transition-all cursor-pointer">
                                <input type="checkbox" class="w-4 h-4 text-violet-600 rounded">
                                <span class="text-sm font-semibold">Đã xác nhận tình trạng sức khỏe hiện tại</span>
                            </label>
                            <label class="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-violet-50 transition-all cursor-pointer">
                                <input type="checkbox" class="w-4 h-4 text-violet-600 rounded">
                                <span class="text-sm font-semibold">Đã xác nhận kế hoạch chăm sóc</span>
                            </label>
                            <label class="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-violet-50 transition-all cursor-pointer">
                                <input type="checkbox" class="w-4 h-4 text-violet-600 rounded">
                                <span class="text-sm font-semibold">Đã đánh giá tình trạng dinh dưỡng</span>
                            </label>
                            <div class="bg-white rounded-xl p-3">
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" id="basicInfoOther" class="w-4 h-4 text-violet-600 rounded" onchange="toggleOtherInput('basicInfoOtherText', this.checked)">
                                    <span class="text-sm font-semibold">Khác (ghi rõ)</span>
                                </label>
                                <textarea id="basicInfoOtherText" rows="2" disabled
                                    class="w-full mt-2 px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all outline-none text-sm font-semibold resize-none disabled:bg-slate-50 disabled:text-slate-400"
                                    placeholder="Nhập thông tin bổ sung..."></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Risk Confirmation -->
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-3">Xác nhận rủi ro (chống chỉ định)</label>
                        <div class="space-y-2">
                            <label class="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-red-50 transition-all cursor-pointer">
                                <input type="checkbox" class="w-4 h-4 text-red-600 rounded">
                                <span class="text-sm font-semibold">Không có bệnh truyền nhiễm nguy hiểm</span>
                            </label>
                            <label class="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-red-50 transition-all cursor-pointer">
                                <input type="checkbox" class="w-4 h-4 text-red-600 rounded">
                                <span class="text-sm font-semibold">Không có tiền sử bạo lực/tự gây thương tích</span>
                            </label>
                            <label class="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-red-50 transition-all cursor-pointer">
                                <input type="checkbox" class="w-4 h-4 text-red-600 rounded">
                                <span class="text-sm font-semibold">Không có dị ứng nghiêm trọng chưa kiểm soát</span>
                            </label>
                            <label class="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-red-50 transition-all cursor-pointer">
                                <input type="checkbox" class="w-4 h-4 text-red-600 rounded">
                                <span class="text-sm font-semibold">Đã thông báo các rủi ro đặc biệt (nếu có)</span>
                            </label>
                            <div class="bg-white rounded-xl p-3">
                                <label class="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" id="riskOther" class="w-4 h-4 text-red-600 rounded" onchange="toggleOtherInput('riskOtherText', this.checked)">
                                    <span class="text-sm font-semibold">Khác (ghi rõ)</span>
                                </label>
                                <textarea id="riskOtherText" rows="2" disabled
                                    class="w-full mt-2 px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all outline-none text-sm font-semibold resize-none disabled:bg-slate-50 disabled:text-slate-400"
                                    placeholder="Nhập thông tin rủi ro khác..."></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Additional Notes -->
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">Ghi chú thêm</label>
                        <textarea id="additionalNotes" rows="3"
                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all outline-none text-sm font-semibold resize-none"
                            placeholder="Các thông tin bổ sung khác..."></textarea>
                    </div>
                </div>
            </div>

            <!-- Conclusions -->
            <div class="bg-amber-50/50 rounded-3xl p-6 border border-amber-100">
                <h3 class="font-black text-amber-900 text-sm mb-6 flex items-center gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5"></i>
                    Kết luận
                </h3>
                
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-2">Ngày bắt đầu sử dụng dịch vụ <span class="text-red-500">*</span></label>
                            <input type="date" id="serviceStartDate" required
                                class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none text-sm font-semibold">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-2">Lịch đưa đón</label>
                            <input type="text" id="transportSchedule"
                                class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none text-sm font-semibold"
                                placeholder="Thứ 2, 4, 6 - 8:00 AM đón, 5:00 PM trả">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-3">Phương thức thanh toán <span class="text-red-500">*</span></label>
                        <div class="flex flex-wrap gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="paymentMethod" value="cash" class="w-4 h-4 text-amber-600" required>
                                <span class="text-sm font-semibold">Tiền mặt</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="paymentMethod" value="transfer" class="w-4 h-4 text-amber-600">
                                <span class="text-sm font-semibold">Chuyển khoản</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="paymentMethod" value="insurance" class="w-4 h-4 text-amber-600">
                                <span class="text-sm font-semibold">Bảo hiểm</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="paymentMethod" value="other" class="w-4 h-4 text-amber-600">
                                <span class="text-sm font-semibold">Khác</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">Nơi gửi hóa đơn</label>
                        <input type="text" id="invoiceAddress"
                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none text-sm font-semibold"
                            placeholder="Địa chỉ email hoặc địa chỉ nhà">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">Nội dung kế hoạch chăm sóc</label>
                        <textarea id="carePlanContent" rows="4"
                            class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all outline-none text-sm font-semibold resize-none"
                            placeholder="Tóm tắt kế hoạch chăm sóc đã thống nhất..."></textarea>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-slate-100">
                <button type="submit" id="module2-save-btn"
                    class="flex-1 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all">
                    <i data-lucide="save" class="w-4 h-4 inline mr-2"></i>
                    Lưu biên bản họp
                </button>
                <button type="button" onclick="resetModule2Form()"
                    class="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">
                    <i data-lucide="x" class="w-4 h-4 inline mr-2"></i>
                    Hủy
                </button>
            </div>
            
        </form>
    </div>

    <!-- Tab Content: History -->
    <div id="content-history" class="tab-content hidden">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
            <!-- Left: Meeting List (30%) -->
            <div class="lg:col-span-1 bg-slate-50 rounded-2xl p-4 overflow-y-auto">
                <h3 class="font-black text-slate-800 mb-4 flex items-center gap-2">
                    <i data-lucide="list" class="w-5 h-5"></i>
                    Danh sách cuộc họp
                </h3>
                <div id="meeting-list" class="space-y-3">
                    <!-- Will be populated dynamically -->
                </div>
            </div>

            <!-- Right: Meeting Detail (70%) -->
            <div class="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 overflow-y-auto">
                <div id="meeting-detail">
                    <div class="flex flex-col items-center justify-center h-full text-center py-20">
                        <i data-lucide="mouse-pointer-click" class="w-16 h-16 text-slate-300 mb-4"></i>
                        <p class="text-slate-400 font-semibold">Chọn một cuộc họp từ danh sách để xem chi tiết</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// Module 2 JavaScript Functions
function switchModule2Tab(tabName) {
    // Update tab buttons
    const tabs = ['form', 'history'];
    tabs.forEach(tab => {
        const button = document.getElementById(`tab-${tab}`);
        const content = document.getElementById(`content-${tab}`);

        if (tab === tabName) {
            button.classList.remove('border-transparent', 'text-slate-400');
            button.classList.add('border-emerald-600', 'text-emerald-600', 'bg-emerald-50');
            content.classList.remove('hidden');
        } else {
            button.classList.remove('border-emerald-600', 'text-emerald-600', 'bg-emerald-50');
            button.classList.add('border-transparent', 'text-slate-400');
            content.classList.add('hidden');
        }
    });

    // Load history if switching to history tab
    if (tabName === 'history') {
        loadMeetingHistory();
    }

    lucide.createIcons();
}

function loadMeetingHistory() {
    const patientId = 'patient_001';
    const meetings = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_meetings`) || '[]');
    const listContainer = document.getElementById('meeting-list');

    if (meetings.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-12">
                <i data-lucide="inbox" class="w-12 h-12 text-slate-300 mx-auto mb-3"></i>
                <p class="text-slate-400 text-sm font-semibold">Chưa có cuộc họp nào</p>
            </div>
        `;
    } else {
        listContainer.innerHTML = meetings.map((meeting, index) => `
            <div onclick="showMeetingDetail(${index})" 
                class="meeting-item p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-emerald-500 cursor-pointer transition-all">
                <div class="flex items-start justify-between mb-2">
                    <h4 class="font-bold text-sm text-slate-800">Cuộc họp #${meetings.length - index}</h4>
                    <span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                        <i data-lucide="check" class="w-3 h-3 inline"></i>
                    </span>
                </div>
                <p class="text-xs text-slate-500 font-semibold mb-1">
                    <i data-lucide="calendar" class="w-3 h-3 inline"></i>
                    ${new Date(meeting.meetingDate).toLocaleDateString('vi-VN')}
                    ${meeting.meetingTime ? `- ${meeting.meetingTime}` : ''}
                </p>
                <p class="text-xs text-slate-500 font-semibold">
                    <i data-lucide="user" class="w-3 h-3 inline"></i>
                    ${meeting.recorder}
                </p>
            </div>
        `).join('');
    }

    lucide.createIcons();
}

function showMeetingDetail(index) {
    const patientId = 'patient_001';
    const meetings = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_meetings`) || '[]');
    const meeting = meetings[index];
    const detailContainer = document.getElementById('meeting-detail');

    // Highlight selected item
    document.querySelectorAll('.meeting-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('border-emerald-500', 'bg-emerald-50');
        } else {
            item.classList.remove('border-emerald-500', 'bg-emerald-50');
        }
    });

    detailContainer.innerHTML = `
        <div class="space-y-6">
            <!-- Header -->
            <div class="flex items-start justify-between pb-4 border-b-2 border-slate-100">
                <div>
                    <h2 class="font-black text-2xl text-slate-800 mb-2">Cuộc họp #${meetings.length - index}</h2>
                    <p class="text-sm text-slate-500 font-semibold">
                        <i data-lucide="calendar" class="w-4 h-4 inline"></i>
                        ${new Date(meeting.meetingDate).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        ${meeting.meetingTime ? `lúc ${meeting.meetingTime}` : ''}
                    </p>
                </div>
                <span class="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-bold">
                    <i data-lucide="check-circle" class="w-4 h-4 inline"></i>
                    Đã hoàn thành
                </span>
            </div>

            <!-- Meeting Info -->
            <div class="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                <h3 class="font-black text-emerald-900 text-sm mb-4 flex items-center gap-2">
                    <i data-lucide="info" class="w-4 h-4"></i>
                    Thông tin cuộc họp
                </h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-slate-600 font-semibold">Địa điểm:</span>
                        <p class="font-bold text-slate-800">${meeting.meetingLocation || 'Không ghi nhận'}</p>
                    </div>
                    <div>
                        <span class="text-slate-600 font-semibold">Người ghi biên bản:</span>
                        <p class="font-bold text-slate-800">${meeting.recorder}</p>
                    </div>
                </div>
            </div>

            <!-- Participants -->
            <div class="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <h3 class="font-black text-blue-900 text-sm mb-4 flex items-center gap-2">
                    <i data-lucide="users" class="w-4 h-4"></i>
                    Thành viên tham dự (${meeting.participants.length})
                </h3>
                <div class="space-y-2">
                    ${meeting.participants.map(p => `
                        <div class="bg-white rounded-xl p-3 flex items-center justify-between">
                            <span class="font-bold text-sm text-slate-800">${p.name}</span>
                            <span class="text-xs text-slate-500 font-semibold">${p.role}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Discussion -->
            <div class="bg-violet-50 rounded-2xl p-5 border border-violet-100">
                <h3 class="font-black text-violet-900 text-sm mb-4 flex items-center gap-2">
                    <i data-lucide="message-square" class="w-4 h-4"></i>
                    Nội dung thảo luận
                </h3>
                <div class="space-y-4">
                    ${meeting.discussion.familyWishes ? `
                        <div>
                            <p class="text-xs font-bold text-slate-600 mb-2">Nguyện vọng gia đình:</p>
                            <p class="text-sm text-slate-800 bg-white rounded-xl p-3">${meeting.discussion.familyWishes}</p>
                        </div>
                    ` : ''}
                    
                    ${meeting.discussion.basicInfoConfirmed && meeting.discussion.basicInfoConfirmed.length > 0 ? `
                        <div>
                            <p class="text-xs font-bold text-slate-600 mb-2">Đã xác nhận:</p>
                            <div class="space-y-1">
                                ${meeting.discussion.basicInfoConfirmed.map(item => `
                                    <div class="flex items-center gap-2 text-sm bg-white rounded-lg p-2">
                                        <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>
                                        <span>${item}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${meeting.discussion.basicInfoOther ? `
                        <div>
                            <p class="text-xs font-bold text-slate-600 mb-2">Thông tin khác:</p>
                            <p class="text-sm text-slate-800 bg-white rounded-xl p-3">${meeting.discussion.basicInfoOther}</p>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- Conclusions -->
            <div class="bg-amber-50 rounded-2xl p-5 border border-amber-100">
                <h3 class="font-black text-amber-900 text-sm mb-4 flex items-center gap-2">
                    <i data-lucide="check-circle" class="w-4 h-4"></i>
                    Kết luận
                </h3>
                <div class="space-y-3 text-sm">
                    <div class="flex justify-between bg-white rounded-xl p-3">
                        <span class="text-slate-600 font-semibold">Ngày bắt đầu dịch vụ:</span>
                        <span class="font-bold text-slate-800">${new Date(meeting.conclusions.serviceStartDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    ${meeting.conclusions.transportSchedule ? `
                        <div class="flex justify-between bg-white rounded-xl p-3">
                            <span class="text-slate-600 font-semibold">Lịch đưa đón:</span>
                            <span class="font-bold text-slate-800">${meeting.conclusions.transportSchedule}</span>
                        </div>
                    ` : ''}
                    <div class="flex justify-between bg-white rounded-xl p-3">
                        <span class="text-slate-600 font-semibold">Phương thức thanh toán:</span>
                        <span class="font-bold text-slate-800">${getPaymentMethodText(meeting.conclusions.paymentMethod)}</span>
                    </div>
                    ${meeting.conclusions.carePlanContent ? `
                        <div>
                            <p class="text-xs font-bold text-slate-600 mb-2">Kế hoạch chăm sóc:</p>
                            <p class="text-sm text-slate-800 bg-white rounded-xl p-3">${meeting.conclusions.carePlanContent}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
}

function getPaymentMethodText(method) {
    const methods = {
        'cash': 'Tiền mặt',
        'transfer': 'Chuyển khoản',
        'insurance': 'Bảo hiểm',
        'other': 'Khác'
    };
    return methods[method] || method;
}

function addParticipant() {
    const container = document.getElementById('participants-list');
    const newParticipant = document.createElement('div');
    newParticipant.className = 'participant-item bg-white rounded-2xl p-4 border border-blue-100 relative';
    newParticipant.innerHTML = `
        <button type="button" onclick="this.parentElement.remove(); lucide.createIcons();"
            class="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-100 rounded-lg transition-all">
            <i data-lucide="x" class="w-4 h-4"></i>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-xs font-bold text-slate-700 mb-2">Họ tên</label>
                <input type="text" class="participant-name w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm font-semibold"
                    placeholder="Điều dưỡng viên Lê Văn D">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-700 mb-2">Đơn vị / Chức danh</label>
                <input type="text" class="participant-role w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm font-semibold"
                    placeholder="Điều dưỡng trưởng">
            </div>
        </div>
    `;
    container.appendChild(newParticipant);
    lucide.createIcons();
}

// Global variable to store resetFormState function
let module2ResetFormState = null;

// Reset Form
function resetModule2Form() {
    if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu đã nhập?')) {
        document.getElementById('module2-form').reset();
        // Reset other textareas
        document.getElementById('basicInfoOtherText').value = '';
        document.getElementById('basicInfoOtherText').disabled = true;
        document.getElementById('riskOtherText').value = '';
        document.getElementById('riskOtherText').disabled = true;

        // Reset form state (disable save button)
        if (typeof module2ResetFormState === 'function') {
            module2ResetFormState();
        }

        showToast('Đã xóa dữ liệu form', 'info');
    }
}

function toggleOtherInput(textareaId, isEnabled) {
    const textarea = document.getElementById(textareaId);
    if (textarea) {
        textarea.disabled = !isEnabled;
        if (!isEnabled) {
            textarea.value = '';
        } else {
            textarea.focus();
        }
    }
}

function initModule2() {
    // Setup form change detection and store in global variable
    const resetFormState = setupFormChangeDetection('module2-form', 'module2-save-btn');
    module2ResetFormState = resetFormState; // Make accessible to resetForm()

    // Form Submission
    document.getElementById('module2-form')?.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect participants
        const participants = [];
        document.querySelectorAll('.participant-item').forEach(item => {
            const name = item.querySelector('.participant-name').value;
            const role = item.querySelector('.participant-role').value;
            if (name || role) {
                participants.push({ name, role });
            }
        });

        // Collect checkboxes
        const basicInfoChecks = [];
        const riskChecks = [];
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
            if (checkbox.checked && checkbox.id !== 'basicInfoOther' && checkbox.id !== 'riskOther') {
                const text = checkbox.nextElementSibling?.textContent;
                if (text) {
                    if (index < 5) {
                        basicInfoChecks.push(text);
                    } else {
                        riskChecks.push(text);
                    }
                }
            }
        });

        // Collect form data
        const meetingData = {
            meetingDate: document.getElementById('meetingDate').value,
            meetingTime: document.getElementById('meetingTime').value,
            meetingLocation: document.getElementById('meetingLocation').value,
            recorder: document.getElementById('recorder').value,
            participants: participants,
            discussion: {
                familyWishes: document.getElementById('familyWishes').value,
                basicInfoConfirmed: basicInfoChecks,
                risksConfirmed: riskChecks,
                basicInfoOther: document.getElementById('basicInfoOtherText').value,
                riskOther: document.getElementById('riskOtherText').value,
                additionalNotes: document.getElementById('additionalNotes').value
            },
            conclusions: {
                serviceStartDate: document.getElementById('serviceStartDate').value,
                transportSchedule: document.getElementById('transportSchedule').value,
                paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.value,
                invoiceAddress: document.getElementById('invoiceAddress').value,
                carePlanContent: document.getElementById('carePlanContent').value
            },
            timestamp: new Date().toISOString()
        };

        // Save to LocalStorage
        const patientId = 'patient_001';
        const meetings = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_meetings`) || '[]');
        meetings.push(meetingData);
        localStorage.setItem(`mirabocaresync_${patientId}_meetings`, JSON.stringify(meetings));

        showToast('Đã lưu biên bản họp thành công!', 'success');
        console.log('Saved meeting data:', meetingData);

        // Switch to history tab to show the new meeting
        switchModule2Tab('history');
    });

    // Initialize icons
    setTimeout(() => lucide.createIcons(), 100);
}
