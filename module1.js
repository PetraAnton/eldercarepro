// Module 1 Content - Vietnamese Localized Face Sheet (Refactored)
window.module1Content = `
<div class="animate-fade-in max-w-5xl mx-auto">
    <form id="module1-form" class="space-y-6">
        
        <!-- HEADER / TITLE -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h2 class="text-2xl font-black text-blue-900">Thông tin Cơ bản (Face Sheet)</h2>
                <p class="text-slate-500 text-sm">Hồ sơ quản lý người cao tuổi theo tiêu chuẩn</p>
            </div>
            <div class="flex gap-2">
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Mẫu chuẩn 2026</span>
            </div>
        </div>

        <!-- SECTION 1: THÔNG TIN QUẢN LÝ -->
        <div class="glass-panel rounded-[24px] overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div class="bg-white/30 backdrop-blur-md px-6 py-4 border-b border-white/40 flex items-center justify-between">
                <h3 class="font-bold text-slate-800 flex items-center gap-2 text-lg">
                    <div class="p-1.5 bg-blue-100/50 rounded-lg text-blue-600"><i data-lucide="clipboard-list" class="w-5 h-5"></i></div>
                    1. Thông tin Quản lý
                </h3>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Ngày tư vấn</label>
                    <input type="date" id="consultationDate" class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-bold text-slate-700">
                </div>
                <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Người tạo hồ sơ</label>
                    <input type="text" id="recordCreator" class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-bold text-slate-700 placeholder:font-normal" placeholder="Nhập tên nhân viên...">
                </div>
                <div class="lg:col-span-2">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Nội dung tư vấn</label>
                    <select id="consultationType" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm font-semibold">
                        <option value="">-- Chọn nội dung --</option>
                        <option value="post_discharge">Sau xuất viện</option>
                        <option value="day_service">Sử dụng dịch vụ ban ngày</option>
                        <option value="home_visit">Thăm khám tại nhà</option>
                        <option value="facility_entry">Nhập viện/Cơ sở chăm sóc</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
                <div class="lg:col-span-4">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tình trạng chính chủ hiện tại</label>
                    <div class="flex flex-wrap gap-4">
                        <label class="flex items-center gap-2 cursor-pointer bg-white/50 px-4 py-2.5 rounded-xl border border-white/40 hover:bg-blue-50 hover:border-blue-200 hover:scale-105 transition-all shadow-sm">
                            <input type="radio" name="residenceStatus" value="home" class="w-4 h-4 text-blue-600">
                            <span class="text-sm font-bold text-slate-700">Nhà riêng</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer bg-white/50 px-4 py-2.5 rounded-xl border border-white/40 hover:bg-blue-50 hover:border-blue-200 hover:scale-105 transition-all shadow-sm">
                            <input type="radio" name="residenceStatus" value="facility" class="w-4 h-4 text-blue-600">
                            <span class="text-sm font-bold text-slate-700">Đang ở cơ sở</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer bg-white/50 px-4 py-2.5 rounded-xl border border-white/40 hover:bg-blue-50 hover:border-blue-200 hover:scale-105 transition-all shadow-sm">
                            <input type="radio" name="residenceStatus" value="hospital" class="w-4 h-4 text-blue-600">
                            <span class="text-sm font-bold text-slate-700">Đang nhập viện</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer bg-white/50 px-4 py-2.5 rounded-xl border border-white/40 hover:bg-blue-50 hover:border-blue-200 hover:scale-105 transition-all shadow-sm">
                            <input type="radio" name="residenceStatus" value="other" class="w-4 h-4 text-blue-600">
                            <span class="text-sm font-bold text-slate-700">Khác</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 2: THÔNG TIN CƠ BẢN -->
        <div class="glass-panel rounded-[24px] shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div class="bg-blue-50/50 backdrop-blur-sm px-6 py-4 border-b border-blue-100/50 flex items-center justify-between">
                <h3 class="font-bold text-blue-900 flex items-center gap-2 text-lg">
                    <div class="p-1.5 bg-blue-100 rounded-lg text-blue-600"><i data-lucide="user" class="w-5 h-5"></i></div>
                    2. Thông tin Cá nhân
                </h3>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                <!-- Row 1: Names -->
                <div class="lg:col-span-3">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Biệt danh / Tên gọi khác</label>
                    <input type="text" id="nickname" class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium placeholder:italic" placeholder="Ví dụ: Bác Ba, Chú Tư...">
                </div>
                <div class="lg:col-span-3">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Họ và tên <span class="text-rose-500">*</span></label>
                    <input type="text" id="fullName" required class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-black shadow-sm text-blue-900" placeholder="NHẬP CHỮ IN HOA">
                </div>

                <!-- Row 2: Demographics -->
                <div class="lg:col-span-2">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Giới tính <span class="text-red-500">*</span></label>
                    <select id="gender" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm">
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>
                <div class="lg:col-span-2">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Ngày sinh <span class="text-red-500">*</span></label>
                    <input type="date" id="dob" required class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm font-medium">
                </div>
                <div class="lg:col-span-2">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Tuổi (Tự động)</label>
                    <input type="text" id="age" readonly class="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-sm font-bold text-center" placeholder="--">
                </div>

                <!-- Row 3: Address -->
                <div class="lg:col-span-2">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Mã bưu điện</label>
                    <input type="text" id="postalCode" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm font-mono" placeholder="700000">
                </div>
                <div class="lg:col-span-4">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Địa chỉ chi tiết</label>
                    <input type="text" id="fullAddress" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm" placeholder="Số nhà, Đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố">
                </div>

                <!-- Row 4: Contact -->
                <div class="lg:col-span-3">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Điện thoại bàn</label>
                    <div class="relative">
                        <i data-lucide="phone" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5"></i>
                        <input type="tel" id="fixedPhone" class="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm font-semibold text-slate-700">
                    </div>
                </div>
                <div class="lg:col-span-3">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Điện thoại di động</label>
                    <div class="relative">
                        <i data-lucide="smartphone" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5"></i>
                        <input type="tel" id="mobilePhone" class="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm font-semibold text-blue-700">
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 3: MỨC ĐỘ TỰ LẬP -->
        <div class="glass-panel rounded-[24px] shadow-sm border border-slate-200 group hover:shadow-lg transition-shadow duration-300">
            <div class="bg-emerald-50/50 backdrop-blur-sm px-6 py-4 border-b border-emerald-100/50 flex items-center justify-between rounded-t-[24px]">
                <h3 class="font-bold text-emerald-900 flex items-center gap-2 text-lg">
                    <div class="p-1.5 bg-emerald-100 rounded-lg text-emerald-600"><i data-lucide="activity" class="w-5 h-5"></i></div>
                    3. Mức độ Tự lập trong sinh hoạt hàng ngày
                </h3>
            </div>
            <div class="p-6 space-y-8">
                <!-- Group 1 -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        Mức độ tự lập sinh hoạt của người cao tuổi khuyết tật
                        <div class="relative group/tooltip">
                            <i data-lucide="help-circle" class="w-4 h-4 text-slate-400 hover:text-blue-500 cursor-help transition-colors"></i>
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[500px] bg-slate-800 text-white text-[11px] font-medium p-4 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 whitespace-pre-line leading-relaxed pointer-events-none text-left">
                                <span class="text-blue-200 font-bold block mb-2 text-sm uppercase border-b border-slate-600 pb-1">Mức độ tự lập sinh hoạt (Người khuyết tật)</span>
                                • <span class="text-orange-300 font-bold">J1</span>: Gần như tự lập hoàn toàn; có thể ra ngoài và sinh hoạt xã hội, chỉ hạn chế nhẹ về vận động.
                                • <span class="text-orange-300 font-bold">J2</span>: Tự lập nhưng khi ra ngoài cần chú ý an toàn hoặc sử dụng dụng cụ hỗ trợ (gậy, tay vịn…).
                                • <span class="text-orange-300 font-bold">A1</span>: Có thể đi lại và sinh hoạt trong nhà; cần hỗ trợ nhẹ trong một số hoạt động.
                                • <span class="text-orange-300 font-bold">A2</span>: Khó khăn khi đi lại trong nhà; cần người hỗ trợ rõ ràng khi di chuyển.
                                • <span class="text-orange-300 font-bold">B1</span>: Không thể tự đi lại; có thể ngồi trên giường hoặc xe lăn và cần hỗ trợ khi di chuyển.
                                • <span class="text-orange-300 font-bold">B2</span>: Phụ thuộc nhiều vào người chăm sóc; khả năng ngồi còn hạn chế, cần hỗ trợ gần như toàn bộ.
                                • <span class="text-orange-300 font-bold">C1</span>: Nằm liệt giường; không tự thay đổi tư thế nhưng vẫn còn khả năng giao tiếp.
                                • <span class="text-orange-300 font-bold">C2</span>: Nằm liệt giường hoàn toàn; không tự thay đổi tư thế và khả năng giao tiếp rất hạn chế.
                                <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                            </div>
                        </div>
                    </label>
                    <div class="grid grid-cols-3 md:grid-cols-9 gap-2">
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="disabilityLevel" value="independent" class="hidden">
                            <span class="text-xs font-bold">Tự lập</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="disabilityLevel" value="J1" class="hidden">
                            <span class="text-xs font-bold">J1</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="disabilityLevel" value="J2" class="hidden">
                            <span class="text-xs font-bold">J2</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="disabilityLevel" value="A1" class="hidden">
                            <span class="text-xs font-bold">A1</span>
                        </label>
                         <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="disabilityLevel" value="A2" class="hidden">
                            <span class="text-xs font-bold">A2</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="disabilityLevel" value="B1" class="hidden">
                            <span class="text-xs font-bold">B1</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="disabilityLevel" value="B2" class="hidden">
                            <span class="text-xs font-bold">B2</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="disabilityLevel" value="C1" class="hidden">
                            <span class="text-xs font-bold">C1</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="disabilityLevel" value="C2" class="hidden">
                            <span class="text-xs font-bold">C2</span>
                        </label>
                    </div>
                </div>

                <!-- Group 2 -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                        Mức độ tự lập sinh hoạt của người cao tuổi sa sút trí tuệ
                        <div class="relative group/tooltip">
                            <i data-lucide="help-circle" class="w-4 h-4 text-slate-400 hover:text-blue-500 cursor-help transition-colors"></i>
                            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[500px] bg-slate-800 text-white text-[11px] font-medium p-4 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 whitespace-pre-line leading-relaxed pointer-events-none text-left">
                                <span class="text-blue-200 font-bold block mb-2 text-sm uppercase border-b border-slate-600 pb-1">Mức độ tự lập sinh hoạt (Sa sút trí tuệ)</span>
                                • <span class="text-orange-300 font-bold">Ⅰ</span>: Giảm nhận thức nhẹ; sinh hoạt độc lập, hầu như không ảnh hưởng đến đời sống thường ngày.
                                • <span class="text-orange-300 font-bold">Ⅱa</span>: Có vấn đề về nhận thức khi ra ngoài; sinh hoạt trong nhà cơ bản vẫn an toàn.
                                • <span class="text-orange-300 font-bold">Ⅱb</span>: Có vấn đề về nhận thức ngay cả trong nhà; cần hỗ trợ hoặc giám sát một phần.
                                • <span class="text-orange-300 font-bold">Ⅲa</span>: Hành vi hoặc rối loạn nhận thức ảnh hưởng rõ rệt, chủ yếu xuất hiện ban ngày.
                                • <span class="text-orange-300 font-bold">Ⅲb</span>: Hành vi hoặc rối loạn nhận thức ảnh hưởng rõ rệt, chủ yếu xuất hiện ban đêm.
                                • <span class="text-orange-300 font-bold">Ⅳ</span>: Không thể tự sinh hoạt do sa sút trí tuệ; cần chăm sóc và giám sát thường xuyên.
                                • <span class="text-orange-300 font-bold">M</span>: Có rối loạn tâm thần nặng hoặc triệu chứng hành vi nghiêm trọng; cần can thiệp y khoa chuyên sâu.
                                <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                            </div>
                        </div>
                    </label>
                     <div class="grid grid-cols-4 md:grid-cols-8 gap-2">
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="dementiaLevel" value="independent" class="hidden">
                            <span class="text-xs font-bold">Tự lập</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="dementiaLevel" value="I" class="hidden">
                            <span class="text-xs font-bold">I</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="dementiaLevel" value="IIa" class="hidden">
                            <span class="text-xs font-bold">IIa</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="dementiaLevel" value="IIb" class="hidden">
                            <span class="text-xs font-bold">IIb</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="dementiaLevel" value="IIIa" class="hidden">
                            <span class="text-xs font-bold">IIIa</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="dementiaLevel" value="IIIb" class="hidden">
                            <span class="text-xs font-bold">IIIb</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="dementiaLevel" value="IV" class="hidden">
                            <span class="text-xs font-bold">IV</span>
                        </label>
                        <label class="cursor-pointer border hover:bg-emerald-50 has-[:checked]:bg-emerald-600 has-[:checked]:text-white has-[:checked]:border-emerald-600 rounded-md p-2 text-center transition-all">
                            <input type="radio" name="dementiaLevel" value="M" class="hidden">
                            <span class="text-xs font-bold">M</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 4: THÔNG TIN NHẬN ĐỊNH & SECTION 5: XÁC NHẬN KHUYẾT TẬT (GRID 2 COL) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- SECTION 4 -->
            <div class="glass-panel rounded-[24px] shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div class="bg-violet-50/50 backdrop-blur-sm px-6 py-4 border-b border-violet-100/50">
                    <h3 class="font-bold text-violet-900 flex items-center gap-2 text-lg">
                        <div class="p-1.5 bg-violet-100 rounded-lg text-violet-600"><i data-lucide="file-check" class="w-5 h-5"></i></div>
                        4. Thông tin Nhận định
                    </h3>
                </div>
                <div class="p-6 space-y-5">
                    <div>
                        <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Cấp độ chăm sóc</label>
                        <select id="careLevel" class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-bold text-slate-700">
                            <option value="">-- Chọn cấp độ --</option>
                            <option value="none">Không thuộc đối tượng</option>
                            <option value="support_1">Hỗ trợ 1</option>
                            <option value="support_2">Hỗ trợ 2</option>
                            <option value="care_1">Chăm sóc 1</option>
                            <option value="care_2">Chăm sóc 2</option>
                            <option value="care_3">Chăm sóc 3</option>
                            <option value="care_4">Chăm sóc 4</option>
                            <option value="care_5">Chăm sóc 5</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Từ ngày</label>
                            <input type="date" id="certStartDate" class="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-sm">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Đến ngày</label>
                            <input type="date" id="certEndDate" class="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-sm">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Kết quả bảng kiểm tra cơ bản</label>
                        <div class="flex gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="checklistResult" value="eligible" class="w-4 h-4 text-violet-600">
                                <span class="text-sm">Thuộc đối tượng</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="checklistResult" value="ineligible" class="w-4 h-4 text-violet-600">
                                <span class="text-sm">Không thuộc đối tượng</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Ngày ghi bảng kiểm</label>
                        <input type="date" id="checklistDate" class="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-sm">
                    </div>
                </div>
            </div>

            <!-- SECTION 5 -->
            <div class="glass-panel rounded-[24px] shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div class="bg-rose-50/50 backdrop-blur-sm px-6 py-4 border-b border-rose-100/50">
                    <h3 class="font-bold text-rose-900 flex items-center gap-2 text-lg">
                        <div class="p-1.5 bg-rose-100 rounded-lg text-rose-600"><i data-lucide="accessibility" class="w-5 h-5"></i></div>
                        5. Xác nhận Khuyết tật
                    </h3>
                </div>
                <div class="p-6">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Loại khuyết tật / Bệnh lý</label>
                    <div class="space-y-3">
                        <label class="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:bg-rose-50 cursor-pointer transition-colors">
                            <input type="checkbox" name="disabilityType" value="physical" class="w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500">
                            <span class="text-sm font-medium text-slate-700">Khuyết tật Thể chất</span>
                        </label>
                        <label class="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:bg-rose-50 cursor-pointer transition-colors">
                            <input type="checkbox" name="disabilityType" value="intellectual" class="w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500">
                            <span class="text-sm font-medium text-slate-700">Khuyết tật Trí tuệ</span>
                        </label>
                        <label class="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:bg-rose-50 cursor-pointer transition-colors">
                            <input type="checkbox" name="disabilityType" value="mental" class="w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500">
                            <span class="text-sm font-medium text-slate-700">Khuyết tật Tâm thần</span>
                        </label>
                        <label class="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:bg-rose-50 cursor-pointer transition-colors">
                            <input type="checkbox" name="disabilityType" value="disease" class="w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500">
                            <span class="text-sm font-medium text-slate-700">Bệnh hiểm nghèo</span>
                        </label>
                        <div class="flex items-center gap-3 p-2">
                            <input type="checkbox" name="disabilityType" value="other" id="otherDisabilityCheck" class="w-5 h-5 text-rose-600 rounded border-gray-300 focus:ring-rose-500">
                            <span class="text-sm font-medium text-slate-700 min-w-max">Khác:</span>
                            <input type="text" id="otherDisabilityText" class="w-full border-b border-slate-300 focus:border-rose-500 outline-none text-sm px-2 py-1" placeholder="Ghi rõ...">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 6 & 7: MÔI TRƯỜNG & KINH TẾ -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- SECTION 6 -->
            <div class="glass-panel rounded-[24px] shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div class="bg-orange-50/50 backdrop-blur-sm px-6 py-4 border-b border-orange-100/50">
                    <h3 class="font-bold text-orange-900 flex items-center gap-2 text-lg">
                        <div class="p-1.5 bg-orange-100 rounded-lg text-orange-600"><i data-lucide="home" class="w-5 h-5"></i></div>
                        6. Môi trường sống / Nhà ở
                    </h3>
                </div>
                <div class="p-6 space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Loại nhà</label>
                        <select id="housingType" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none text-sm">
                            <option value="">-- Chọn loại nhà --</option>
                            <option value="owned">Nhà riêng / Chính chủ</option>
                            <option value="rented">Nhà thuê</option>
                            <option value="single_story">Nhà một tầng</option>
                            <option value="apartment">Chung cư / Căn hộ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Điều kiện phòng</label>
                            <select id="roomType" class="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-100 focus:border-orange-500 outline-none text-sm">
                                <option value="private">Có phòng riêng</option>
                                <option value="shared">Không có phòng riêng</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Tầng số</label>
                            <input type="number" id="floorNumber" class="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-sm" placeholder="1">
                        </div>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-orange-50/50 rounded-lg">
                        <span class="text-sm font-semibold text-slate-700">Đã từng cải tạo nhà ở?</span>
                        <div class="flex gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="renovationStatus" value="yes" class="w-4 h-4 text-orange-600">
                                <span class="text-sm">Có</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="renovationStatus" value="no" class="w-4 h-4 text-orange-600">
                                <span class="text-sm">Không</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION 7 -->
            <div class="glass-panel rounded-[24px] shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div class="bg-green-50/50 backdrop-blur-sm px-6 py-4 border-b border-green-100/50">
                    <h3 class="font-bold text-green-900 flex items-center gap-2 text-lg">
                        <div class="p-1.5 bg-green-100 rounded-lg text-green-600"><i data-lucide="wallet" class="w-5 h-5"></i></div>
                        7. Tình trạng Kinh tế
                    </h3>
                </div>
                <div class="p-6">
                    <label class="block text-xs font-bold text-slate-500 uppercase mb-3">Nguồn thu nhập / Trợ cấp</label>
                    <div class="space-y-2">
                        <label class="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:bg-green-50 cursor-pointer transition-colors">
                            <input type="checkbox" name="incomeSource" value="state_pension" class="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500">
                            <div class="text-sm">
                                <span class="font-bold text-slate-700 block">Lương hưu Nhà nước</span>
                            </div>
                        </label>
                         <label class="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:bg-green-50 cursor-pointer transition-colors">
                            <input type="checkbox" name="incomeSource" value="company_pension" class="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500">
                            <div class="text-sm">
                                <span class="font-bold text-slate-700 block">Lương hưu Doanh nghiệp</span>
                            </div>
                        </label>
                         <label class="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:bg-green-50 cursor-pointer transition-colors">
                            <input type="checkbox" name="incomeSource" value="disability_allowance" class="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500">
                            <div class="text-sm">
                                <span class="font-bold text-slate-700 block">Trợ cấp Khuyết tật</span>
                            </div>
                        </label>
                        <label class="flex items-center gap-3 p-2 rounded-lg border border-slate-100 hover:bg-green-50 cursor-pointer transition-colors">
                            <input type="checkbox" name="incomeSource" value="living_allowance" class="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500">
                            <div class="text-sm">
                                <span class="font-bold text-slate-700 block">Trợ cấp Sinh hoạt / Bảo hộ</span>
                            </div>
                        </label>
                         <div class="flex items-center gap-3 p-2">
                            <input type="checkbox" name="incomeSource" value="other" class="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500">
                            <span class="text-sm font-medium text-slate-700 min-w-max">Khác:</span>
                            <input type="text" id="otherIncomeText" class="w-full border-b border-slate-300 focus:border-green-500 outline-none text-sm px-2 py-1" placeholder="...">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 8: NGƯỜI LIÊN HỆ -->
        <div class="glass-panel rounded-[24px] shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div class="bg-red-50/50 backdrop-blur-sm px-6 py-4 border-b border-red-100/50 flex items-center justify-between">
                <h3 class="font-bold text-red-900 flex items-center gap-2 text-lg">
                    <div class="p-1.5 bg-red-100 rounded-lg text-red-600"><i data-lucide="users" class="w-5 h-5"></i></div>
                    8. Người liên hệ / Người đến tư vấn
                </h3>
                <button type="button" onclick="addContactPerson()" class="text-xs bg-white text-red-600 px-3 py-1.5 rounded-xl border border-red-200 font-bold hover:bg-red-50 hover:scale-105 transition-all flex items-center gap-1 shadow-sm">
                    <i data-lucide="plus" class="w-3 h-3"></i> Thêm
                </button>
            </div>
            <div id="contact-list" class="p-6 space-y-4">
                <!-- Contact items inserted by JS -->
            </div>
        </div>

        <!-- SECTION 9: NGUYỆN VỌNG & KHÁC -->
        <div class="glass-panel rounded-[24px] shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div class="bg-slate-50/50 backdrop-blur-sm px-6 py-4 border-b border-slate-100/50">
                <h3 class="font-bold text-slate-800 flex items-center gap-2 text-lg">
                    <div class="p-1.5 bg-slate-200 rounded-lg text-slate-600"><i data-lucide="heart-handshake" class="w-5 h-5"></i></div>
                    9. Nguyện vọng & Thông tin khác
                </h3>
            </div>
            <div class="p-6 space-y-6">
                <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Sơ đồ phả hệ (Mô tả)</label>
                    <textarea id="genogramDesc" rows="3" class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium resize-none" placeholder="Mô tả mối quan hệ gia đình (Ví dụ: Sống cùng vợ và con trai út...)"></textarea>
                </div>
                <div>
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tình trạng quan hệ gia đình</label>
                    <textarea id="familyRelations" rows="2" class="input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium resize-none" placeholder="Ghi chú về quan hệ gia đình..."></textarea>
                </div>
                <div class="flex items-center justify-between p-4 bg-yellow-50/50 rounded-xl border border-yellow-100/50">
                    <div class="flex items-center gap-3">
                        <i data-lucide="shield" class="w-6 h-6 text-yellow-600"></i>
                        <span class="font-bold text-slate-700 text-sm">Nguyện vọng sử dụng dịch vụ phòng ngừa chăm sóc?</span>
                    </div>
                    <div class="flex gap-4">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="preventionServiceDesire" value="yes" class="w-5 h-5 text-yellow-600">
                            <span class="text-sm font-bold">Có</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="preventionServiceDesire" value="no" class="w-5 h-5 text-yellow-600">
                            <span class="text-sm font-bold">Không</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

    </form>
    
</div>

<!-- FAB Container (managed by FAB Helper) -->
<div id="module1-fab-container" class="fixed bottom-48 right-8 flex flex-col-reverse items-end gap-5 z-40 animate-fade-in pointer-events-none hidden">
    <!-- FABs will be injected here by FAB Manager -->
</div>
`;

// Helper: Add Contact Person
function addContactPerson(data = null) {
    const list = document.getElementById('contact-list');
    const id = Date.now();
    const item = document.createElement('div');
    item.className = 'contact-item relative glass-panel p-6 rounded-2xl border border-white/40 group hover:border-blue-200 transition-colors';
    item.innerHTML = `
        <button type="button" onclick="this.parentElement.remove();" class="absolute top-2 right-2 text-slate-300 hover:text-rose-500 p-1 rounded-full hover:bg-rose-50 transition-all">
            <i data-lucide="x" class="w-5 h-5"></i>
        </button>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Họ tên</label>
                <input type="text" class="contact-name input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-bold text-slate-700" value="${data?.name || ''}">
            </div>
            <div>
                <label class="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Quan hệ</label>
                <input type="text" class="contact-relation input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium" value="${data?.relation || ''}">
            </div>
            <div class="md:col-span-2">
                <label class="block text-[10px] font-black text-slate-400 uppercase mb-1.5">Địa chỉ & Liên hệ</label>
                <input type="text" class="contact-address input-glass w-full px-4 py-2.5 rounded-xl outline-none text-sm font-medium" value="${data?.address || ''}" placeholder="Địa chỉ, Số điện thoại...">
            </div>
        </div>
    `;
    list.appendChild(item);
    lucide.createIcons();
}

// Global variable to store resetFormState function
let module1ResetFormState = null;
let originalFormData = null; // Store original data for discard
let m1IsDirty = false; // Dirty check flag

// Init FAB Logic
function initModule1FabLogic() {
    const form = document.getElementById('module1-form');
    // Dirty Check Listener
    form.addEventListener('input', () => {
        if (!m1IsDirty) {
            m1IsDirty = true;
            updateModule1FabState('edit'); // Assuming generic input happens in edit mode
        }
    });

    // Also listen for contact additions (DOM changes not caught by input)
    // We can manually set dirty in addContactPerson
}

// Reset Form (Create Mode)
function resetModule1Form() {
    if (confirm('Bạn có chắc muốn xóa hết dữ liệu nhập không?')) {
        document.getElementById('module1-form').reset();
        document.getElementById('contact-list').innerHTML = '';
        addContactPerson(); // Add empty first item
        m1IsDirty = false;
        // Hide FABs in Create Mode until input?
        // Actually, Reset should stay if we want to confirm clear.
        // Or if clear, hide save/reset?
        // User rule: "nếu chưa có bản ghi thì có thay đổi sẽ hiển thị button lưu và button hủy"
        // So upon reset (clearing), we go back to 'clean create' state -> Hide Save/Reset.
        updateModule1FabState('create');
        showToast('Đã xóa dữ liệu form', 'info');
    }
}
// Load Data into Form
function loadModule1Data(data) {
    if (!data) return;

    // Helper to safely set value
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || '';
    };
    const setChecked = (name, val) => {
        // Clear selection first to handle case where val is null/empty (revert to unselected)
        const radios = document.querySelectorAll(`input[name="${name}"]`);
        radios.forEach(r => r.checked = false);

        if (!val) return;
        const radio = document.querySelector(`input[name="${name}"][value="${val}"]`);
        if (radio) radio.checked = true;
    };
    const setCheckbox = (name, vals) => {
        // Clear all first
        const allCbs = document.querySelectorAll(`input[name="${name}"]`);
        allCbs.forEach(cb => cb.checked = false);

        if (!vals || !Array.isArray(vals)) return;
        vals.forEach(val => {
            const cb = document.querySelector(`input[name="${name}"][value="${val}"]`);
            if (cb) cb.checked = true;
        });
    };

    // 1. Admin Info
    if (data.admin) {
        setVal('consultationDate', data.admin.consultationDate);
        setVal('recordCreator', data.admin.creator);
        setVal('consultationType', data.admin.type);
        setChecked('residenceStatus', data.admin.residenceStatus);
    }

    // 2. Basic Info
    if (data.basic) {
        setVal('nickname', data.basic.nickname);
        setVal('fullName', data.basic.fullName);
        setVal('gender', data.basic.gender);
        setVal('dob', data.basic.dob);
        setVal('age', data.basic.age);
        setVal('postalCode', data.basic.postalCode);
        setVal('fullAddress', data.basic.fullAddress);
        setVal('fixedPhone', data.basic.fixedPhone);
        setVal('mobilePhone', data.basic.mobilePhone);
    }

    // 3. Disability Level
    if (data.disability) {
        setChecked('disabilityLevel', data.disability.level);
        setChecked('dementiaLevel', data.disability.dementiaLevel);

        // Section 4
        setVal('careLevel', data.disability.careLevel);
        setVal('certStartDate', data.disability.certStartDate);
        setVal('certEndDate', data.disability.certEndDate);
        setChecked('checklistResult', data.disability.checklistResult);
        setVal('checklistDate', data.disability.checklistDate);

        // Section 5
        setCheckbox('disabilityType', data.disability.types);
        if (data.disability.otherType) {
            const otherCheck = document.getElementById('otherDisabilityCheck');
            if (otherCheck) otherCheck.checked = true;
            setVal('otherDisabilityText', data.disability.otherType);
        }
    }

    // 6. Environment
    if (data.environment) {
        setVal('housingType', data.environment.housingType);
        setVal('roomType', data.environment.roomType);
        setVal('floorNumber', data.environment.floorNumber);
        setChecked('renovationStatus', data.environment.renovation);
    }

    // 7. Economic
    if (data.economic) {
        setCheckbox('incomeSource', data.economic.incomeSources);
        if (data.economic.otherIncome) {
            // Assuming specific handling or if mapped to value='other'
            const otherCb = document.querySelector('input[name="incomeSource"][value="other"]');
            if (otherCb) otherCb.checked = true;
            setVal('otherIncomeText', data.economic.otherIncome);
        }
    }

    // 8. Contacts
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    if (data.contacts && data.contacts.length > 0) {
        data.contacts.forEach(c => addContactPerson(c));
    } else {
        addContactPerson();
    }

    // 9. Others
    if (data.others) {
        setVal('genogramDesc', data.others.genogramDesc);
        setVal('familyRelations', data.others.familyRelations);
        setChecked('preventionServiceDesire', data.others.preventionServiceDesire);
    }
}

// Save Module 1 Data
function saveModule1Data() {
    try {
        const patientId = getCurrentPatientId();
        if (!patientId) {
            showToast('Vui lòng chọn bệnh nhân trước!', 'error');
            return false;
        }

        // 1. Collect Data
        const formData = {
            // Admin Info
            admin: {
                consultationDate: document.getElementById('consultationDate').value,
                creator: document.getElementById('recordCreator').value,
                type: document.getElementById('consultationType').value,
                residenceStatus: document.querySelector('input[name="residenceStatus"]:checked')?.value
            },
            // Basic Info
            basic: {
                nickname: document.getElementById('nickname').value,
                fullName: document.getElementById('fullName').value,
                gender: document.getElementById('gender').value,
                dob: document.getElementById('dob').value,
                age: document.getElementById('age').value,
                postalCode: document.getElementById('postalCode').value,
                fullAddress: document.getElementById('fullAddress').value,
                fixedPhone: document.getElementById('fixedPhone').value,
                mobilePhone: document.getElementById('mobilePhone').value
            },
            // Disability & Care
            disability: {
                level: document.querySelector('input[name="disabilityLevel"]:checked')?.value,
                dementiaLevel: document.querySelector('input[name="dementiaLevel"]:checked')?.value,
                careLevel: document.getElementById('careLevel').value,
                certStartDate: document.getElementById('certStartDate').value,
                certEndDate: document.getElementById('certEndDate').value,
                checklistResult: document.querySelector('input[name="checklistResult"]:checked')?.value,
                checklistDate: document.getElementById('checklistDate').value,
                types: Array.from(document.querySelectorAll('input[name="disabilityType"]:checked')).map(cb => cb.value),
                otherType: document.getElementById('otherDisabilityText').value
            },
            // Environment
            environment: {
                housingType: document.getElementById('housingType').value,
                roomType: document.getElementById('roomType').value,
                floorNumber: document.getElementById('floorNumber').value,
                renovation: document.querySelector('input[name="renovationStatus"]:checked')?.value
            },
            // Economic
            economic: {
                incomeSources: Array.from(document.querySelectorAll('input[name="incomeSource"]:checked')).map(cb => cb.value),
                otherIncome: document.getElementById('otherIncomeText').value
            },
            // Contacts
            contacts: Array.from(document.querySelectorAll('.contact-item')).map(item => ({
                name: item.querySelector('.contact-name').value,
                relation: item.querySelector('.contact-relation').value,
                address: item.querySelector('.contact-address').value
            })),
            // Others
            others: {
                genogramDesc: document.getElementById('genogramDesc').value,
                familyRelations: document.getElementById('familyRelations').value,
                preventionServiceDesire: document.querySelector('input[name="preventionServiceDesire"]:checked')?.value
            },
            lastUpdated: new Date().toISOString()
        };

        // 2. Save to LocalStorage
        localStorage.setItem(`mirabocaresync_${patientId}_facesheet`, JSON.stringify(formData));

        // 3. Mark module as complete
        if (typeof markModuleComplete === 'function') {
            markModuleComplete(patientId, 'module1');
        }

        // 4. Feedback & UI Update
        showToast('Đã lưu hồ sơ thành công!', 'success');

        // Dispatch event to update sidebar progress
        window.dispatchEvent(new Event('module-data-saved'));

        console.log('Face Sheet Saved:', formData);

        return true; // Return success
    } catch (e) {
        console.error('Error saving module 1:', e);
        showToast('Lỗi khi lưu: ' + e.message, 'error');
        return false;
    }
}

// Initialize Module 1
function initModule1() {
    const patientId = getCurrentPatientId();
    const savedData = localStorage.getItem(`mirabocaresync_${patientId}_facesheet`);

    // Create FAB Manager
    window.module1FAB = createFABManager({
        moduleId: 'module1',
        formId: 'module1-form',

        // Check if data exists
        hasExistingData: () => {
            const pid = getCurrentPatientId();
            const data = localStorage.getItem(`mirabocaresync_${pid}_facesheet`);
            return !!data;
        },

        // Load original data (for cancel/revert)
        loadOriginalData: () => {
            const pid = getCurrentPatientId();
            const data = localStorage.getItem(`mirabocaresync_${pid}_facesheet`);
            if (data) {
                const parsed = JSON.parse(data);
                loadModule1Data(parsed);
                return parsed;
            }
            return null;
        },

        // Save callback
        onSave: () => {
            return saveModule1Data();
        },

        // Reset callback
        onReset: () => {
            console.log('Module 1 form reset');
        },

        enableEdit: true
    });

    // Initialize FAB
    window.module1FAB.init();

    // Load existing data if available
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            loadModule1Data(data);
        } catch (e) {
            console.error('Error loading module 1 data:', e);
        }
    } else {
        // New Record: Try to pre-populate from Patient Registry
        const patient = typeof getPatientById === 'function' ? getPatientById(patientId) : null;
        if (patient) {
            const fullNameInput = document.getElementById('fullName');
            const dobInput = document.getElementById('dob');
            const genderInput = document.getElementById('gender');

            if (fullNameInput) fullNameInput.value = (patient.fullName || '').toUpperCase();
            if (dobInput) {
                dobInput.value = patient.dateOfBirth || '';
                // Trigger age calculation
                dobInput.dispatchEvent(new Event('change'));
            }
            if (genderInput && patient.gender) {
                genderInput.value = patient.gender; // "male" or "female"
            }
        }

        // Add initial contact if empty
        if (document.getElementById('contact-list')?.children.length === 0) {
            addContactPerson();
        }
    }

    // Auto calculate age
    document.getElementById('dob')?.addEventListener('change', function () {
        if (this.value) {
            const age = new Date().getFullYear() - new Date(this.value).getFullYear();
            const ageField = document.getElementById('age');
            if (ageField) ageField.value = age + ' tuổi';
        }
    });

    // Auto-uppercase Full Name
    const fullNameInput = document.getElementById('fullName');
    if (fullNameInput) {
        fullNameInput.addEventListener('input', function () {
            this.value = this.value.toUpperCase();
        });
    }

    // Form submission handler
    document.getElementById('module1-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        window.module1FAB.save();
    });

    lucide.createIcons();
}
