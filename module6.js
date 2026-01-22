// Module 6: Phân tích Thành phần Cơ thể (Body Composition Analysis)
// Vietnamese Localized

window.module6Content = `
<div class="animate-fade-in max-w-6xl mx-auto">
    
    <!-- Tab Navigation -->
    <div class="flex gap-2 mb-6 border-b-2 border-slate-200">
        <button onclick="switchModule6Tab('form')" id="module6-tab-form" 
                class="px-6 py-3 font-black text-sm transition-all border-b-4 border-indigo-600 text-indigo-600">
            <i data-lucide="clipboard-list" class="w-4 h-4 inline mr-2"></i>
            Đánh giá mới
        </button>
        <button onclick="switchModule6Tab('history')" id="module6-tab-history" 
                class="px-6 py-3 font-black text-sm transition-all border-b-4 border-transparent text-slate-500 hover:text-slate-700">
            <i data-lucide="history" class="w-4 h-4 inline mr-2"></i>
            Lịch sử đo
        </button>
        <button onclick="switchModule6Tab('report')" id="module6-tab-report" 
                class="px-6 py-3 font-black text-sm transition-all border-b-4 border-transparent text-slate-500 hover:text-slate-700">
            <i data-lucide="bar-chart-2" class="w-4 h-4 inline mr-2"></i>
            Báo cáo phân tích
        </button>
    </div>

    <!-- FORM TAB -->
    <div id="module6-form-tab">

        <form id="module6-form" class="space-y-6">
            
            <!-- Section 1: Thông tin Chung (General Info) -->
            <div class="glass-panel rounded-[32px] group hover:shadow-xl transition-all duration-300">
                <div class="bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-4 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all rounded-t-[32px]"
                     onclick="toggleModule6Section('general')">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                        <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
                        1. Thông tin Chung
                    </h3>
                    <i data-lucide="chevron-down" id="chevron-general" class="w-5 h-5 text-white transition-transform duration-300"></i>
                </div>
                <div id="section-general" class="p-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Chiều cao (cm)</label>
                            <input type="number" id="height" step="0.1" placeholder="165"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Cân nặng (kg)</label>
                            <input type="number" id="weight" step="0.1" placeholder="60"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">BMI</label>
                            <input type="text" id="bmi" readonly 
                                   class="w-full px-4 py-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-600 font-black text-center" />
                        </div>
                         <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                Tỷ lệ trao đổi chất (BMR)
                                <div class="relative group/tooltip">
                                    <i data-lucide="help-circle" class="w-3 h-3 text-slate-400 hover:text-indigo-500 cursor-help transition-colors"></i>
                                    <div class="absolute bottom-full right-0 mb-2 w-64 bg-slate-800 text-white text-[11px] font-medium p-3 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 whitespace-pre-line leading-relaxed pointer-events-none text-left">
                                        <span class="text-indigo-200 font-bold block mb-1 border-b border-slate-600 pb-1">Năng lượng tiêu hao khi nghỉ</span>
                                        Phản ánh mức năng lượng tối thiểu cơ thể cần để duy trì sự sống.
                                        • Giảm dần theo tuổi tác.
                                        • Tăng khi khối lượng cơ tăng.
                                        <div class="absolute top-full right-1 border-8 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </label>
                             <input type="number" id="bmr" step="1" placeholder="1400"
                                    class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                Tỷ lệ mỡ (%)
                                <div class="relative group/tooltip">
                                    <i data-lucide="help-circle" class="w-3 h-3 text-slate-400 hover:text-indigo-500 cursor-help transition-colors"></i>
                                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-[11px] font-medium p-3 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 whitespace-pre-line leading-relaxed pointer-events-none text-left">
                                        <span class="text-indigo-200 font-bold block mb-1 border-b border-slate-600 pb-1">Tỉ lệ mỡ trong cơ thể</span>
                                        Đánh giá nguy cơ béo phì và các bệnh lý chuyển hóa.
                                        • Nam: 10-20% (Chuẩn)
                                        • Nữ: 18-28% (Chuẩn)
                                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </label>
                            <input type="number" id="body-fat" step="0.1" placeholder="25.5"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                Khối lượng cơ (kg)
                                <div class="relative group/tooltip">
                                    <i data-lucide="help-circle" class="w-3 h-3 text-slate-400 hover:text-indigo-500 cursor-help transition-colors"></i>
                                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-[11px] font-medium p-3 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 whitespace-pre-line leading-relaxed pointer-events-none text-left">
                                        <span class="text-indigo-200 font-bold block mb-1 border-b border-slate-600 pb-1">Lượng cơ tham gia vận động</span>
                                        Bao gồm cơ vân xương, giúp duy trì tư thế và di chuyển.
                                        • Chỉ số quan trọng để phát hiện thiểu cơ (Sarcopenia).
                                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </label>
                            <input type="number" id="muscle-mass" step="0.1" placeholder="45.2"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                Khối lượng xương (kg)
                                <div class="relative group/tooltip">
                                    <i data-lucide="help-circle" class="w-3 h-3 text-slate-400 hover:text-indigo-500 cursor-help transition-colors"></i>
                                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-[11px] font-medium p-3 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 whitespace-pre-line leading-relaxed pointer-events-none text-left">
                                        <span class="text-indigo-200 font-bold block mb-1 border-b border-slate-600 pb-1">Lượng khoáng chất xương</span>
                                        Cho biết sức khỏe của hệ xương.
                                        • Thấp: Nguy cơ loãng xương.
                                        • Cần chú ý bổ sung Canxi/Vitamin D nếu thấp.
                                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </label>
                            <input type="number" id="bone-mass" step="0.1" placeholder="2.5"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                        </div>
                        <!-- Body Water removed as per request -->
                        <!-- Optional/Hidden but kept for data completeness if needed -->
                         <div class="hidden">
                             <input type="number" id="visceral-fat" />
                         </div>
                    </div>
                </div>
            </div>

            <!-- Section 2: Đánh giá Cơ bắp (Muscle Assessment) -->
            <div class="glass-panel rounded-[32px] group hover:shadow-xl transition-all duration-300">
                <div class="bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-4 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all rounded-t-[32px]"
                     onclick="toggleModule6Section('muscle')">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                        <i data-lucide="dumbbell" class="w-5 h-5"></i>
                        2. Đánh giá Cơ bắp
                    </h3>
                    <i data-lucide="chevron-down" id="chevron-muscle" class="w-5 h-5 text-white transition-transform duration-300"></i>
                </div>
                <div id="section-muscle" class="p-8">
                     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div class="bg-teal-50/50 p-6 rounded-[24px] border border-teal-100 hover:shadow-md transition-shadow">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                SMI (kg/m²)
                                <div class="relative group/tooltip">
                                    <i data-lucide="help-circle" class="w-3 h-3 text-teal-400 hover:text-teal-600 cursor-help transition-colors"></i>
                                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-[11px] font-medium p-3 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 whitespace-pre-line leading-relaxed pointer-events-none text-left">
                                        <span class="text-teal-200 font-bold block mb-1 border-b border-slate-600 pb-1">Chỉ số khối cơ xương</span>
                                        Tiêu chuẩn chẩn đoán thiểu cơ (Sarcopenia).
                                        • Nam: < 7.0 kg/m² (Thiểu cơ)
                                        • Nữ: < 5.7 kg/m² (Thiểu cơ)
                                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </label>
                            <input type="number" id="smi" step="0.1" placeholder="7.2"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                            <p class="text-xs text-teal-600 font-bold mt-2">Skeletal Muscle Index</p>
                        </div>
                        <div class="bg-blue-50/50 p-6 rounded-[24px] border border-blue-100 hover:shadow-md transition-shadow">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                Góc pha (Phase Angle)
                                <div class="relative group/tooltip">
                                    <i data-lucide="help-circle" class="w-3 h-3 text-blue-400 hover:text-blue-600 cursor-help transition-colors"></i>
                                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-[11px] font-medium p-3 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 whitespace-pre-line leading-relaxed pointer-events-none text-left">
                                        <span class="text-blue-200 font-bold block mb-1 border-b border-slate-600 pb-1">Chỉ số chất lượng tế bào</span>
                                        • Phản ánh sức khỏe màng tế bào và tình trạng dinh dưỡng.
                                        • Giá trị cao: Tế bào khỏe mạnh (thường > 5.0).
                                        • Giá trị thấp: Suy giảm sức khỏe tế bào.
                                        <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </label>
                            <input type="number" id="phase-angle" step="0.1" placeholder="5.5"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                            <p class="text-xs text-blue-600 font-bold mt-2">Chỉ số chất lượng cơ</p>
                        </div>
                         <!-- Keeping ECW/TBW here as it relates to cell health/quality -->
                        <div class="bg-purple-50/50 p-6 rounded-[24px] border border-purple-100 hover:shadow-md transition-shadow">
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                ECW/TBW
                                <div class="relative group/tooltip">
                                    <i data-lucide="help-circle" class="w-3 h-3 text-purple-400 hover:text-purple-600 cursor-help transition-colors"></i>
                                    <div class="absolute bottom-full right-0 mb-2 w-64 bg-slate-800 text-white text-[11px] font-medium p-3 rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 whitespace-pre-line leading-relaxed pointer-events-none text-left">
                                        <span class="text-purple-200 font-bold block mb-1 border-b border-slate-600 pb-1">Chỉ số cân bằng nước</span>
                                        Tỉ lệ nước nằm ngoài tế bào so với tổng lượng nước cơ thể, dùng để đánh giá cân bằng dịch và tình trạng mô.
                                        • Bình thường: 0.36 - 0.39
                                        • > 0.40: Có dấu hiệu phù nề hoặc viêm.
                                        <div class="absolute top-full right-1 border-8 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </label>
                            <input type="number" id="ecw-tbw" step="0.01" placeholder="0.38"
                                   class="input-glass w-full px-4 py-3 rounded-xl outline-none text-sm font-bold text-slate-700" />
                            <p class="text-xs text-purple-600 font-bold mt-2">Tỷ lệ nước ngoài tế bào</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 3: Khối lượng cơ/chất lượng cơ theo từng bộ phận (Segmental) -->
            <div class="glass-panel rounded-[32px] group hover:shadow-xl transition-all duration-300">
                <div class="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 flex items-center justify-between cursor-pointer hover:brightness-110 transition-all rounded-t-[32px]"
                     onclick="toggleModule6Section('segmental')">
                    <h3 class="font-black text-white text-sm flex items-center gap-2 uppercase tracking-wide">
                        <i data-lucide="activity" class="w-5 h-5"></i>
                        3. Khối lượng cơ/chất lượng cơ theo từng bộ phận
                    </h3>
                    <i data-lucide="chevron-down" id="chevron-segmental" class="w-5 h-5 text-white transition-transform duration-300"></i>
                </div>
                <div id="section-segmental" class="p-8">
                    <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                        <table class="w-full border-collapse text-sm">
                            <thead>
                                <tr class="bg-slate-50 text-slate-500 uppercase text-[10px] font-black tracking-widest">
                                    <th class="px-6 py-4 text-left border-b border-slate-200">Bộ phận</th>
                                    <th class="px-6 py-4 text-center border-b border-slate-200">Khối lượng cơ (kg)</th>
                                    <th class="px-6 py-4 text-center border-b border-slate-200">Góc pha (°)</th>
                                </tr>
                            </thead>
                                <tr class="hover:bg-blue-50/50 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-700">Tay Phải</td>
                                    <td class="px-6 py-2">
                                        <input type="number" id="muscle-right-arm" step="0.1" placeholder="2.5" class="input-glass w-full text-center font-bold text-blue-600 outline-none focus:ring-2 focus:ring-blue-200 rounded-lg py-2" />
                                    </td>
                                    <td class="px-6 py-2">
                                        <input type="number" id="pa-right-arm" step="0.1" placeholder="5.5" class="input-glass w-full text-center font-bold text-teal-600 outline-none focus:ring-2 focus:ring-teal-200 rounded-lg py-2" />
                                    </td>
                                </tr>
                                <tr class="hover:bg-blue-50/50 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-700">Tay Trái</td>
                                    <td class="px-6 py-2">
                                        <input type="number" id="muscle-left-arm" step="0.1" placeholder="2.4" class="input-glass w-full text-center font-bold text-blue-600 outline-none focus:ring-2 focus:ring-blue-200 rounded-lg py-2" />
                                    </td>
                                     <td class="px-6 py-2">
                                        <input type="number" id="pa-left-arm" step="0.1" placeholder="5.4" class="input-glass w-full text-center font-bold text-teal-600 outline-none focus:ring-2 focus:ring-teal-200 rounded-lg py-2" />
                                    </td>
                                </tr>
                                <tr class="hover:bg-blue-50/50 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-700">Chân Phải</td>
                                    <td class="px-6 py-2">
                                        <input type="number" id="muscle-right-leg" step="0.1" placeholder="8.5" class="input-glass w-full text-center font-bold text-blue-600 outline-none focus:ring-2 focus:ring-blue-200 rounded-lg py-2" />
                                    </td>
                                     <td class="px-6 py-2">
                                        <input type="number" id="pa-right-leg" step="0.1" placeholder="5.0" class="input-glass w-full text-center font-bold text-teal-600 outline-none focus:ring-2 focus:ring-teal-200 rounded-lg py-2" />
                                    </td>
                                </tr>
                                <tr class="hover:bg-blue-50/50 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-700">Chân Trái</td>
                                    <td class="px-6 py-2">
                                        <input type="number" id="muscle-left-leg" step="0.1" placeholder="8.3" class="input-glass w-full text-center font-bold text-blue-600 outline-none focus:ring-2 focus:ring-blue-200 rounded-lg py-2" />
                                    </td>
                                     <td class="px-6 py-2">
                                        <input type="number" id="pa-left-leg" step="0.1" placeholder="4.9" class="input-glass w-full text-center font-bold text-teal-600 outline-none focus:ring-2 focus:ring-teal-200 rounded-lg py-2" />
                                    </td>
                                </tr>
                                <tr class="hover:bg-blue-50/50 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-700">Thân mình</td>
                                    <td class="px-6 py-2">
                                        <input type="number" id="muscle-trunk" step="0.1" placeholder="23.5" class="input-glass w-full text-center font-bold text-blue-600 outline-none focus:ring-2 focus:ring-blue-200 rounded-lg py-2" />
                                    </td>
                                     <td class="px-6 py-2">
                                        <input type="number" id="pa-trunk" step="0.1" placeholder="6.0" class="input-glass w-full text-center font-bold text-teal-600 outline-none focus:ring-2 focus:ring-teal-200 rounded-lg py-2" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Notes Section -->
            <div class="glass-panel p-6 rounded-[32px] border border-indigo-100/50">
                <label class="block text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i data-lucide="file-text" class="w-4 h-4 inline mr-1"></i>
                    Ghi chú
                </label>
                <textarea id="notes" rows="4" placeholder="Nhập ghi chú bổ sung..."
                          class="input-glass w-full px-4 py-3 rounded-2xl outline-none text-sm font-medium resize-none shadow-inner"></textarea>
            </div>

            <!-- FAB moved to m6-fab-container -->

        </form>
    </div>

    <!-- HISTORY TAB -->
    <div id="module6-history-tab" class="hidden">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i data-lucide="clock" class="w-5 h-5 text-indigo-600"></i>
                Lịch sử Đánh giá
            </h3>
            <div id="history-list" class="space-y-3">
                <!-- History items will be populated here -->
            </div>
        </div>

        <!-- Timeline Chart -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-6">
            <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i data-lucide="trending-up" class="w-5 h-5 text-indigo-600"></i>
                Xu hướng theo Thời gian
            </h3>
            <canvas id="timeline-chart" height="80"></canvas>
        </div>
    

    </div>

    <!-- REPORT TAB -->
    <div id="module6-report-tab" class="hidden space-y-8 pb-12">
        <!-- Report Header / Selector -->
        <div class="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 flex justify-between items-center">
            <div>
                 <h3 class="text-lg font-black text-slate-800 tracking-tight">Báo cáo Phân tích Chuyên sâu</h3>
                 <p class="text-xs text-slate-500 font-bold mt-1">Phân loại thể hình & Chất lượng cơ bắp</p>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="printModule6Report()" title="In báo cáo" class="bg-slate-100 text-slate-500 hover:text-indigo-600 p-2.5 rounded-xl transition-colors">
                    <i data-lucide="printer" class="w-5 h-5"></i>
                </button>
                <div class="w-px h-8 bg-slate-200"></div>
                <span class="text-xs font-bold text-slate-400 uppercase">Chọn bản ghi:</span>
                <select id="m6-report-selector" onchange="renderModule6Report(this.value)" class="bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none">
                    <!-- Options populated by JS -->
                </select>
            </div>
        </div>

        <!-- 1. DETAILED METRICS TABLE (General) -->
        <div class="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-8">
             <div class="p-6 border-b border-slate-50 bg-slate-50/50">
                <h4 class="font-black text-slate-800 text-lg flex items-center gap-2">
                    <i data-lucide="table-2" class="w-5 h-5 text-slate-500"></i>
                    Bảng chỉ số chi tiết
                </h4>
             </div>
             <div class="p-6">
                <table class="w-full text-sm text-left">
                    <thead class="text-xs text-slate-400 uppercase font-black bg-slate-50/50 rounded-xl">
                        <tr>
                            <th class="px-4 py-3 rounded-l-xl">Chỉ số</th>
                            <th class="px-4 py-3">Kết quả</th>
                            <th class="px-4 py-3">Tham chiếu (Bình thường)</th>
                            <th class="px-4 py-3 rounded-r-xl text-center">Đánh giá</th>
                        </tr>
                    </thead>
                    <tbody id="m6-report-table-body" class="font-medium text-slate-700 divide-y divide-slate-50">
                        <!-- Populated by JS -->
                    </tbody>
                </table>
             </div>
        </div>

        <!-- 2. BODY TYPE ANALYSIS (Vertical Stack) -->
        <div class="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-8">
             <div class="p-6 border-b border-slate-50 bg-indigo-50/30">
                <h4 class="font-black text-indigo-900 text-lg flex items-center gap-2">
                    <i data-lucide="layout-grid" class="w-5 h-5"></i>
                    1. Phân loại Thể hình
                </h4>
             </div>
             
             <!-- Chart Container -->
             <div class="p-8 flex justify-center bg-white">
                <div class="relative w-full max-w-2xl aspect-[4/3] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    <canvas id="m6-bodytype-chart" class="relative z-10"></canvas>
                </div>
             </div>

             <!-- Comment Section (Below Chart) -->
             <div class="px-8 pb-8 bg-white">
                <label class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
                    Nhận xét Thể hình
                </label>
                <textarea id="m6-bodytype-comment" rows="3" class="w-full p-4 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-100 outline-none resize-none bg-slate-50 transition-all focus:bg-white" placeholder="Nhập nhận xét..."></textarea>
                <div class="mt-2 text-right">
                    <button onclick="saveM6ReportData('bodyType')" class="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-700 transition-all">Lưu nhận xét</button>
                </div>
             </div>
        </div>

        <!-- 2. MUSCLE ASSESSMENT (Summary & Quality Chart) -->
        <div class="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-8">
             <div class="p-6 border-b border-slate-50 bg-teal-50/30">
                <h4 class="font-black text-teal-900 text-lg flex items-center gap-2">
                    <i data-lucide="dumbbell" class="w-5 h-5"></i>
                    2. Đánh giá Cơ bắp
                </h4>
             </div>

             <!-- Muscle Evaluation Table Container -->
             <div id="m6-muscle-eval-container" class="px-8 pt-8">
                <!-- Evaluation Table injected here -->
             </div>

             <!-- Chart Container -->
             <div class="p-8 flex justify-center bg-white">
                <div class="relative w-full max-w-2xl aspect-[2/1] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    <canvas id="m6-quality-chart"></canvas>
                </div>
             </div>

             <!-- Comment Section (Below Chart) -->
             <div class="px-8 pb-8 bg-white">
                <label class="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">
                    Nhận xét cơ bắp
                </label>
                <textarea id="m6-quality-comment" rows="3" class="w-full p-4 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-teal-100 outline-none resize-none bg-slate-50 transition-all focus:bg-white" placeholder="Nhập nhận xét..."></textarea>
                <div class="mt-2 text-right">
                    <button onclick="saveM6ReportData('quality')" class="px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-lg hover:bg-teal-700 transition-all">Lưu nhận xét</button>
                </div>
             </div>
        </div>

        <!-- 3. SEGMENTAL ANALYSIS (Table Only) -->
        <div class="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden mb-20">
             <div class="p-6 border-b border-slate-50 bg-blue-50/30">
                <h4 class="font-black text-blue-900 text-lg flex items-center gap-2">
                    <i data-lucide="activity" class="w-5 h-5"></i>
                    3. Khối lượng cơ/chất lượng cơ theo từng bộ phận
                </h4>
             </div>
             
             <div class="p-8">
                <table class="w-full text-sm text-left">
                    <thead class="text-xs text-white uppercase font-bold bg-slate-800 rounded-lg">
                        <!-- Header injected by renderSegmentalTable -->
                    </thead>
                    <tbody id="m6-segmental-table-body" class="font-medium text-slate-700 divide-y divide-slate-100">
                        <!-- Populated by JS -->
                    </tbody>
                </table>
             </div>
        </div>

    </div>

    <!-- FAB Container (Moved to Root Level for Visibility) -->
    <div id="module6-fab-container" class="fixed bottom-48 right-8 flex flex-col-reverse items-end gap-5 z-[50] pointer-events-none hidden">
        <!-- FABs will be injected here by FAB Manager -->
    </div>
`;

function initModule6() {
    const container = document.getElementById('module-content');
    if (container) {
        container.innerHTML = window.module6Content;
    }

    const patientId = getCurrentPatientId();
    const patient = getPatientById(patientId);

    // Load patient info if available
    if (patient) {
        // Update any patient name displays
        const nameDisplays = document.querySelectorAll('.patient-name-display');
        nameDisplays.forEach(el => {
            el.textContent = patient.fullName || 'Chưa có tên';
        });
    }

    // Setup form change detection
    // Setup form change detection
    // const resetFormState = setupFormChangeDetection('module6-form', 'module6-save-btn');
    // module6ResetFormState = resetFormState; // Make accessible to resetForm()

    // Init FAB Logic
    initModule6FabLogic();

    // BMI Auto-calculation
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiInput = document.getElementById('bmi');

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            bmiInput.value = bmi.toFixed(1);
        } else {
            bmiInput.value = '';
        }
    }

    heightInput?.addEventListener('input', calculateBMI);
    weightInput?.addEventListener('input', calculateBMI);

    // Update body part table when muscle inputs change
    const muscleInputs = [
        'muscle-right-arm', 'muscle-left-arm',
        'muscle-right-leg', 'muscle-left-leg',
        'muscle-trunk'
    ];

    muscleInputs.forEach(id => {
        document.getElementById(id)?.addEventListener('input', updateBodyPartTable);
    });

    // Form submission handled by onclick logic now
    // document.getElementById('module6-form')?.addEventListener('submit', saveModule6Assessment);

    // Initialize charts
    initializeModule6Charts();

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Check history (Optional: can use to show count or similar, but tab stays visible)
    const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_body_assessments`) || '[]');
    const reportBtn = document.getElementById('module6-tab-report');
    if (reportBtn) {
        reportBtn.classList.remove('hidden'); // Always show
    }
}

// Toggle section collapse/expand
function toggleModule6Section(sectionId) {
    const content = document.getElementById(`section-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);

    if (content.style.display === 'none') {
        content.style.display = 'block';
        chevron.style.transform = 'rotate(0deg)';
    } else {
        content.style.display = 'none';
        chevron.style.transform = 'rotate(-90deg)';
    }
}


// Update body part table
function updateBodyPartTable() {
    const armRight = document.getElementById('muscle-right-arm').value;
    const armLeft = document.getElementById('muscle-left-arm').value;
    const legRight = document.getElementById('muscle-right-leg').value;
    const legLeft = document.getElementById('muscle-left-leg').value;
    const trunk = document.getElementById('muscle-trunk').value;

    document.getElementById('bodypart-arm-right').textContent = armRight || '--';
    document.getElementById('bodypart-arm-left').textContent = armLeft || '--';
    document.getElementById('bodypart-leg-right').textContent = legRight || '--';
    document.getElementById('bodypart-leg-left').textContent = legLeft || '--';
    document.getElementById('bodypart-trunk').textContent = trunk || '--';

    // Update charts
    updateMuscleChart();
    updateBodyPartChart();
}

// Initialize charts
let muscleChart = null;
let bodyPartChart = null;
let timelineChart = null;

function initializeModule6Charts() {
    // Muscle Chart
    const muscleCtx = document.getElementById('muscle-chart');
    if (muscleCtx && typeof Chart !== 'undefined') {
        muscleChart = new Chart(muscleCtx, {
            type: 'bar',
            data: {
                labels: ['Tay phải', 'Tay trái', 'Chân phải', 'Chân trái', 'Thân mình'],
                datasets: [{
                    label: 'Khối lượng cơ (kg)',
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(14, 165, 233, 0.8)',
                        'rgba(168, 85, 247, 0.8)'
                    ],
                    borderColor: [
                        'rgb(99, 102, 241)',
                        'rgb(139, 92, 246)',
                        'rgb(59, 130, 246)',
                        'rgb(14, 165, 233)',
                        'rgb(168, 85, 247)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'kg'
                        }
                    }
                }
            }
        });
    }

    // Body Part Chart
    const bodyPartCtx = document.getElementById('bodypart-chart');
    if (bodyPartCtx && typeof Chart !== 'undefined') {
        bodyPartChart = new Chart(bodyPartCtx, {
            type: 'bar',
            data: {
                labels: ['Tay', 'Chân'],
                datasets: [
                    {
                        label: 'Phải',
                        data: [0, 0],
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 2
                    },
                    {
                        label: 'Trái',
                        data: [0, 0],
                        backgroundColor: 'rgba(168, 85, 247, 0.8)',
                        borderColor: 'rgb(168, 85, 247)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'kg'
                        }
                    }
                }
            }
        });
    }
}

// Update muscle chart
function updateMuscleChart() {
    if (!muscleChart) return;

    const data = [
        parseFloat(document.getElementById('muscle-right-arm').value) || 0,
        parseFloat(document.getElementById('muscle-left-arm').value) || 0,
        parseFloat(document.getElementById('muscle-right-leg').value) || 0,
        parseFloat(document.getElementById('muscle-left-leg').value) || 0,
        parseFloat(document.getElementById('muscle-trunk').value) || 0
    ];

    muscleChart.data.datasets[0].data = data;
    muscleChart.update();
}

// Update body part chart
function updateBodyPartChart() {
    if (!bodyPartChart) return;

    const armRight = parseFloat(document.getElementById('muscle-right-arm').value) || 0;
    const armLeft = parseFloat(document.getElementById('muscle-left-arm').value) || 0;
    const legRight = parseFloat(document.getElementById('muscle-right-leg').value) || 0;
    const legLeft = parseFloat(document.getElementById('muscle-left-leg').value) || 0;

    bodyPartChart.data.datasets[0].data = [armRight, legRight];
    bodyPartChart.data.datasets[1].data = [armLeft, legLeft];
    bodyPartChart.data.datasets[1].data = [armLeft, legLeft];
    bodyPartChart.update();
}

// Reset Form
// Reset Form
// Reset Form
function resetModule6Form() {
    // Confirm handled by FAB Helper
    const form = document.getElementById('module6-form');
    if (form) form.reset();

    // Reset calculated fields (Safe check)
    const safeSetText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const safeSetValue = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };

    safeSetValue('bmi', '');
    safeSetText('bodypart-arm-right', '--');
    safeSetText('bodypart-arm-left', '--');
    safeSetText('bodypart-leg-right', '--');
    safeSetText('bodypart-leg-left', '--');
    safeSetText('bodypart-trunk', '--');

    // Update charts to zero
    if (typeof updateMuscleChart === 'function') updateMuscleChart();
    if (typeof updateBodyPartChart === 'function') updateBodyPartChart();
}


// Save assessment
function saveModule6Assessment(e) {
    if (e) e.preventDefault();

    const patientId = getCurrentPatientId();
    const timestamp = Date.now();

    const assessmentData = {
        patientId: patientId,
        assessmentDate: new Date().toLocaleDateString('vi-VN'),
        general: {
            height: parseFloat(document.getElementById('height').value) || null,
            weight: parseFloat(document.getElementById('weight').value) || null,
            bmi: parseFloat(document.getElementById('bmi').value) || null,
            bodyFat: parseFloat(document.getElementById('body-fat').value) || null,
            muscleMass: parseFloat(document.getElementById('muscle-mass').value) || null,
            visceralFat: document.getElementById('visceral-fat') ? parseInt(document.getElementById('visceral-fat').value) : null,
            boneMass: parseFloat(document.getElementById('bone-mass').value) || null,
            bodyWater: document.getElementById('body-water') ? parseFloat(document.getElementById('body-water').value) : null,
            bmr: parseInt(document.getElementById('bmr').value) || null
        },
        muscle: {
            rightArm: parseFloat(document.getElementById('muscle-right-arm').value) || null,
            leftArm: parseFloat(document.getElementById('muscle-left-arm').value) || null,
            rightLeg: parseFloat(document.getElementById('muscle-right-leg').value) || null,
            leftLeg: parseFloat(document.getElementById('muscle-left-leg').value) || null,
            trunk: parseFloat(document.getElementById('muscle-trunk').value) || null,
            // Segmental Quality (Phase Angle)
            paRightArm: parseFloat(document.getElementById('pa-right-arm').value) || null,
            paLeftArm: parseFloat(document.getElementById('pa-left-arm').value) || null,
            paRightLeg: parseFloat(document.getElementById('pa-right-leg').value) || null,
            paLeftLeg: parseFloat(document.getElementById('pa-left-leg').value) || null,
            paTrunk: parseFloat(document.getElementById('pa-trunk').value) || null
        },
        advanced: {
            smi: parseFloat(document.getElementById('smi').value) || null,
            phaseAngle: parseFloat(document.getElementById('phase-angle').value) || null,
            ecwTbw: parseFloat(document.getElementById('ecw-tbw').value) || null
        },
        notes: document.getElementById('notes').value,
        assessorName: 'Administrator', // Mock user
        timestamp: timestamp
    };

    // Save to LocalStorage (Array Pattern)
    const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_body_assessments`) || '[]');
    assessments.push(assessmentData);
    localStorage.setItem(`mirabocaresync_${patientId}_body_assessments`, JSON.stringify(assessments));

    // Mark complete and show toast
    if (typeof markModuleComplete === 'function') markModuleComplete(patientId, 'module6');

    // Dispatch event for sidebar update
    window.dispatchEvent(new Event('module-data-saved'));
    showToast('Đã lưu đánh giá thành phần cơ thể!', 'success');
    console.log('Module 6 assessment saved to array');

    // Reset form state (Clean up inputs immediately after save)
    // Reset form state (Clean up inputs immediately after save)
    try {
        if (typeof resetModule6Form === 'function') resetModule6Form();
    } catch (error) {
        console.error('Error resetting form after save:', error);
    }

    // Auto switch to report
    switchModule6Tab('report');

    return true; // Return true for FAB Manager
}

// Delete Assessment
function deleteModule6Assessment(index) {
    if (!confirm('Bạn có chắc chắn muốn xóa bản ghi này không?')) return;

    const patientId = getCurrentPatientId();
    const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_body_assessments`) || '[]');

    // Sort logic in loadHistory was Newest First, so we need to match that index or filter by ID.
    // Ideally we should use ID. But for now, let's reverse the index mapping or just handle consistent sorting.
    // The loadHistory sorts a copy. So index 0 in UI is index Length-1 in saved array if we just accepted sorting.
    // Better strategy: filter by timestamp if possible, but easier here -> remove from sorted array and save back?
    // Actually, localstorage array is usually append-only.
    // Let's refactor to use splice on the original array, but we need to find the correct index in original array.
    // Simple fix: Sort the array fetched from LS first to match UI, then splice, then save.

    assessments.sort((a, b) => b.timestamp - a.timestamp); // Match UI sort
    assessments.splice(index, 1); // Remove item

    localStorage.setItem(`mirabocaresync_${patientId}_body_assessments`, JSON.stringify(assessments));

    // Clear last selected report state to prevent showing deleted data
    window.lastSelectedReportTimestamp = null;

    showToast('Đã xóa bản ghi', 'success');
    loadModule6History(); // Reload UI
}

// Switch tabs
function switchModule6Tab(tabName) {
    const formTab = document.getElementById('module6-form-tab');
    const historyTab = document.getElementById('module6-history-tab');
    const reportTab = document.getElementById('module6-report-tab');

    const formBtn = document.getElementById('module6-tab-form');
    const historyBtn = document.getElementById('module6-tab-history');
    const reportBtn = document.getElementById('module6-tab-report');

    // Reset all
    formTab.classList.add('hidden');
    historyTab.classList.add('hidden');
    reportTab?.classList.add('hidden'); // reportTab might be dynamically rendered later

    const inactiveClass = 'px-6 py-3 font-bold text-slate-400 border-b-4 border-transparent hover:text-slate-600 transition-all flex items-center gap-2';
    const activeClass = 'px-6 py-3 font-bold text-indigo-600 border-b-4 border-indigo-600 transition-all flex items-center gap-2';

    formBtn.className = inactiveClass;
    historyBtn.className = inactiveClass;
    reportBtn.className = inactiveClass;

    if (tabName === 'form') {
        formTab.classList.remove('hidden');
        formBtn.className = activeClass;

        // Auto-reset form for fresh start (Silent)
        if (typeof resetModule6Form === 'function') {
            document.getElementById('module6-form').reset();
            // Reset calculated UI fields manually since form.reset doesn't cover them all
            // Reset calculated fields logic duplicated here or ensure resetModule6Form is clean
            // Since resetModule6Form calls confirm() which we removed, effectively making it just reset logic.
            // But wait, resetModule6Form calls confirm() in older version, but I removed it in step 3178.
            // However, fabHelper calls onReset inside confirm.
            // Here we just want the logic.
            resetModule6Form();

            // Force FAB update
            if (window.module6FAB && window.module6FAB.updateFABs) {
                window.module6FAB.isDirty = false; // We just cleaned it
                window.module6FAB.updateFABs();
            }
        }

        updateModule6FabState(); // Check dirty state
    } else if (tabName === 'history') {
        historyTab.classList.remove('hidden');
        historyBtn.className = activeClass;
        loadModule6History();
        document.getElementById('module6-fab-container')?.classList.add('hidden');
    } else if (tabName === 'report') {
        // If report tab doesn't exist yet in DOM, we check later
        if (reportTab) reportTab.classList.remove('hidden');
        reportBtn.className = activeClass;

        // Force hide FAB again just in case
        document.getElementById('module6-fab-container')?.classList.add('hidden');

        // Load latest report or last selected
        const lastSelected = window.lastSelectedReportTimestamp || null;
        renderModule6Report(lastSelected);
    }

    // Reinitialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Load history
function loadModule6History() {
    const patientId = getCurrentPatientId();
    const historyList = document.getElementById('history-list');

    // Get all assessments from LocalStorage (Array Key)
    const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_body_assessments`) || '[]');

    // Sort by timestamp (newest first)
    assessments.sort((a, b) => b.timestamp - a.timestamp);

    // Ensure Report Tab is visible (Safety check)
    const reportBtn = document.getElementById('module6-tab-report');
    if (reportBtn) reportBtn.classList.remove('hidden');

    if (assessments.length === 0) {
        historyList.innerHTML = '<p class="text-slate-500 text-center py-8">Chưa có đánh giá nào</p>';
        return;
    }

    // Display history items
    historyList.innerHTML = assessments.map((assessment, index) => `
        <div class="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-all border border-slate-200 group">
            <div class="flex items-center justify-between">
                <div onclick='showModule6Detail(${JSON.stringify(assessment).replace(/'/g, "&apos;")})' class="cursor-pointer flex-1">
                    <p class="font-bold text-slate-800 text-lg">${assessment.assessmentDate}</p>
                    <div class="flex gap-4 mt-1">
                        <p class="text-sm text-slate-600">Cân nặng: <span class="font-bold text-indigo-600">${assessment.general.weight || '--'} kg</span></p>
                        <p class="text-sm text-slate-600">BMI: <span class="font-bold text-indigo-600">${assessment.general.bmi || '--'}</span></p>
                    </div>
                </div>
                
                <div class="flex items-center gap-2">
                     <button onclick="switchModule6Tab('report'); setTimeout(() => renderModule6Report('${assessment.timestamp}'), 100);" 
                            class="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-bold text-xs flex items-center gap-1 shadow-sm">
                        <i data-lucide="bar-chart-2" class="w-4 h-4"></i>
                        Xem báo cáo
                    </button>
                    
                    <button onclick="printModule6Assessment(${index})" 
                            class="p-2 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors shadow-sm" title="In phiếu">
                        <i data-lucide="printer" class="w-4 h-4"></i>
                    </button>
                    
                    <button onclick="deleteModule6Assessment(${index})" 
                            class="p-2 bg-rose-100 text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-200 transition-colors shadow-sm" title="Xóa">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Reinitialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Update timeline chart
    if (typeof updateTimelineChart === 'function') {
        updateTimelineChart(assessments);
    }
}

// Show detail
function showModule6Detail(assessment) {
    const detail = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 animate-fade-in" onclick="this.remove()">
        <div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
            <h3 class="text-xl font-bold text-slate-800 mb-4">Chi tiết Đánh giá - ${assessment.assessmentDate}</h3>

            <div class="space-y-4">
                <div class="bg-indigo-50 rounded-xl p-4">
                    <h4 class="font-bold text-indigo-900 mb-2">Thông tin Chung</h4>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <p>Chiều cao: <span class="font-bold">${assessment.general.height || '--'} cm</span></p>
                        <p>Cân nặng: <span class="font-bold">${assessment.general.weight || '--'} kg</span></p>
                        <p>BMI: <span class="font-bold">${assessment.general.bmi || '--'}</span></p>
                        <p>Tỷ lệ mỡ: <span class="font-bold">${assessment.general.bodyFat || '--'} %</span></p>
                        <p>BMR: <span class="font-bold">${assessment.general.bmr || '--'} kcal</span></p>
                    </div>
                </div>

                <div class="bg-purple-50 rounded-xl p-4">
                    <h4 class="font-bold text-purple-900 mb-2">Đánh giá Cơ bắp</h4>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <p>Tay phải: <span class="font-bold">${assessment.muscle.rightArm || '--'} kg</span></p>
                        <p>Tay trái: <span class="font-bold">${assessment.muscle.leftArm || '--'} kg</span></p>
                        <p>Chân phải: <span class="font-bold">${assessment.muscle.rightLeg || '--'} kg</span></p>
                        <p>Chân trái: <span class="font-bold">${assessment.muscle.leftLeg || '--'} kg</span></p>
                        <p>Thân mình: <span class="font-bold">${assessment.muscle.trunk || '--'} kg</span></p>
                    </div>
                </div>

                <div class="bg-teal-50 rounded-xl p-4">
                    <h4 class="font-bold text-teal-900 mb-2">Chỉ số Chuyên sâu</h4>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                        <p>SMI: <span class="font-bold">${assessment.advanced.smi || '--'} kg/m²</span></p>
                        <p>Phase Angle: <span class="font-bold">${assessment.advanced.phaseAngle || '--'} độ</span></p>
                        <p>ECW/TBW: <span class="font-bold">${assessment.advanced.ecwTbw || '--'}</span></p>
                    </div>
                </div>

                ${assessment.notes ? `
                        <div class="bg-slate-50 rounded-xl p-4">
                            <h4 class="font-bold text-slate-900 mb-2">Ghi chú</h4>
                            <p class="text-sm text-slate-700">${assessment.notes}</p>
                        </div>
                    ` : ''}
            </div>

            <button onclick="this.closest('.fixed').remove()"
                class="mt-6 w-full bg-slate-600 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-all">
                Đóng
            </button>
        </div>
        </div >
    `;

    document.body.insertAdjacentHTML('beforeend', detail);
}

// --- Report & Charting Logic ---

let m6BodyTypeChart = null;
let m6QualityChart = null;

function renderModule6Report(selectedTimestamp = null) {
    const patientId = getCurrentPatientId();
    // Get all assessments
    const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_body_assessments`) || '[]');

    if (assessments.length === 0) {
        return;
    }

    // Sort Newest -> Oldest
    assessments.sort((a, b) => b.timestamp - a.timestamp);

    // Populate Selector if empty or needed
    const selector = document.getElementById('m6-report-selector');
    // Only populate if it hasn't been populated or if we want to refresh
    // For simplicity, let's clear and re-populate to ensure sync
    if (selector) {
        const currentVal = selector.value;
        selector.innerHTML = assessments.map(a =>
            `<option value="${a.timestamp}">${a.assessmentDate} - Cân nặng: ${a.general.weight}kg</option>`
        ).join('');
        // Restore selection if valid
        if (currentVal && assessments.find(a => a.timestamp == currentVal)) {
            selector.value = currentVal;
        } else if (selectedTimestamp) {
            selector.value = selectedTimestamp;
        }
    }

    // Determine current record
    let currentRecord = assessments[0];
    if (selectedTimestamp) {
        currentRecord = assessments.find(a => a.timestamp == selectedTimestamp) || assessments[0];
    } else if (selector && selector.value) {
        currentRecord = assessments.find(a => a.timestamp == selector.value) || assessments[0];
    }

    // Save state
    window.lastSelectedReportTimestamp = currentRecord.timestamp;
    if (selector) selector.value = currentRecord.timestamp;

    // --- Update Text Fields ---
    const bodyComment = document.getElementById('m6-bodytype-comment');
    const qualityComment = document.getElementById('m6-quality-comment');

    if (bodyComment) bodyComment.value = currentRecord.bodyTypeComment || '';
    if (qualityComment) qualityComment.value = currentRecord.qualityComment || '';

    // --- Render Detailed Table ---
    renderReportTable(currentRecord, patientId);
    renderSegmentalTable(currentRecord);

    // --- Render Charts ---
    renderBodyTypeChart(currentRecord);
    renderQualityChart(currentRecord);

    // --- Update Auto-Evaluation Text ---
    // updateM6AutoEval(currentRecord); // Optional, maybe remove if custom layout serves purpose
}

function updateM6AutoEval(data) {
    const fat = data.general.bodyFat || 0;
    const muscle = data.general.muscleMass || 0;

    // Simple heuristic for demo
    let type = "Tiêu chuẩn";
    if (fat > 35) type = "Béo phì";
    else if (fat > 25 && muscle < 40) type = "Béo phì tiềm ẩn (Skinny Fat)";
    else if (fat < 20 && muscle > 50) type = "Cơ bắp (Vận động viên)";
    else if (fat < 15 && muscle < 45) type = "Gầy / Thiếu cơ";

    document.getElementById('m6-bodytype-result').textContent = type;
    document.getElementById('m6-quality-result').textContent = "Chờ dữ liệu tham chiếu lâm sàng";
}

function renderSegmentalTable(data) {
    // 1. Update Title if needed (it's in the HTML, but we can target specific ID to be safe or just assume HTML update in next step)
    // Actually, let's update the header dynamically if we can, or rely on the HTML update step.
    // For now, focusing on the table headers and body.

    const thead = document.querySelector('#m6-segmental-table-body')?.previousElementSibling;
    if (thead) {
        thead.innerHTML = `
            <tr class="bg-slate-800 text-white text-xs uppercase font-bold">
                <th class="px-4 py-3 rounded-l-lg">Bộ phận</th>
                <th class="px-4 py-3 text-center border-r border-slate-600">Khối lượng cơ (kg)</th>
                <th class="px-4 py-3 text-center text-slate-300">Tham chiếu</th>
                <th class="px-4 py-3 text-center border-r border-slate-600">Đánh giá</th>
                <th class="px-4 py-3 text-center">Góc pha (°)</th>
                <th class="px-4 py-3 text-center text-slate-300">Tham chiếu</th>
                <th class="px-4 py-3 text-center rounded-r-lg">Đánh giá</th>
            </tr>
        `;
    }

    const tbody = document.getElementById('m6-segmental-table-body');
    if (!tbody) return;

    if (!data.muscle) {
        tbody.innerHTML = '<tr><td colspan="7" class="p-4 text-center text-slate-400">Chưa có dữ liệu chi tiết</td></tr>';
        return;
    }

    const getBadge = (status) => {
        if (status === 'high') return '<span class="min-w-[80px] inline-block text-center px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold border border-red-200">Cao</span>';
        if (status === 'low') return '<span class="min-w-[80px] inline-block text-center px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-bold border border-blue-200">Thấp</span>';
        return '<span class="min-w-[80px] inline-block text-center px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold border border-yellow-200">Tiêu chuẩn</span>';
    };

    const evaluate = (val, min, max) => {
        if (val < min) return 'low';
        if (val > max) return 'high';
        return 'normal';
    }

    // Reference Ranges (from User Image)
    // Arms: 1.7 - 2.2
    // Legs: 6.6 - 8.2
    // Trunk: 21.6 - 24.3
    // Quality Arms: 4.93 - 5.99
    // Quality Legs: 3.76 - 5.40

    const qualityBase = data.advanced.phaseAngle || 5;

    // Mock Segmental Data if not fully present (Fallback logic)
    // If we have saved specific PA values, use them. Otherwise fallback to mock calc from base phaseAngle.

    const getQual = (savedVal, modifier) => {
        if (savedVal) return parseFloat(savedVal).toFixed(2);
        return (qualityBase * modifier).toFixed(2);
    }

    const segs = [
        {
            name: 'Tay Phải',
            mass: data.muscle.rightArm, minM: 1.7, maxM: 2.2,
            qual: getQual(data.muscle.paRightArm, 1.02), minQ: 4.93, maxQ: 5.99
        },
        {
            name: 'Tay Trái',
            mass: data.muscle.leftArm, minM: 1.7, maxM: 2.2,
            qual: getQual(data.muscle.paLeftArm, 0.98), minQ: 4.93, maxQ: 5.99
        },
        {
            name: 'Thân mình',
            mass: data.muscle.trunk, minM: 21.6, maxM: 24.3,
            qual: getQual(data.muscle.paTrunk, 1.1), minQ: 6.0, maxQ: 8.0
        },
        {
            name: 'Chân Phải',
            mass: data.muscle.rightLeg, minM: 6.6, maxM: 8.2,
            qual: getQual(data.muscle.paRightLeg, 0.95), minQ: 3.76, maxQ: 5.40
        },
        {
            name: 'Chân Trái',
            mass: data.muscle.leftLeg, minM: 6.6, maxM: 8.2,
            qual: getQual(data.muscle.paLeftLeg, 0.94), minQ: 3.76, maxQ: 5.40
        },
    ];

    tbody.innerHTML = segs.map(seg => {
        let mVal = parseFloat(seg.mass);
        let qVal = parseFloat(seg.qual);
        let mStatus = evaluate(mVal, seg.minM, seg.maxM);
        let qStatus = evaluate(qVal, seg.minQ, seg.maxQ);

        return `
            <tr class="hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                <td class="px-4 py-3 font-bold text-slate-800">${seg.name}</td>
                <td class="px-4 py-3 text-center text-slate-700 font-bold text-base">${seg.mass || '--'}</td>
                <td class="px-4 py-3 text-center text-xs font-mono text-slate-500 bg-slate-50 mx-2 rounded">${seg.minM} - ${seg.maxM}</td>
                <td class="px-4 py-3 text-center">${getBadge(mStatus)}</td>
                
                <td class="px-4 py-3 text-center text-slate-700 font-bold text-base border-l border-slate-100">${seg.qual}</td>
                <td class="px-4 py-3 text-center text-xs font-mono text-slate-500 bg-slate-50 mx-2 rounded">${seg.minQ} - ${seg.maxQ}</td>
                <td class="px-4 py-3 text-center">${getBadge(qStatus)}</td>
            </tr>
        `;
    }).join('');
}

// New Function: Render Muscle Evaluation Summary Table
function renderMuscleEvalTable(data) {
    const container = document.getElementById('m6-muscle-eval-container');
    if (!container) return;

    // Ranges from image:
    // SMI: 6.13 - 7.15 (Female? looks like female range or specific case, using it as requested)
    // Phase Angle: 4.5 - 5.71

    // Evaluation Logic
    const evaluate = (val, min, max) => {
        if (!val) return { text: '--', color: 'bg-slate-100 text-slate-400 border-slate-200' };
        if (val < min) return { text: 'Thấp', color: 'bg-blue-100 text-blue-600 border-blue-200' };
        if (val > max) return { text: 'Cao', color: 'bg-red-100 text-red-600 border-red-200' };
        return { text: 'Tiêu chuẩn', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    };

    const smi = parseFloat(data.advanced.smi || 0);
    const pa = parseFloat(data.advanced.phaseAngle || 0);

    const smiRef = { min: 6.13, max: 7.15 };
    const paRef = { min: 4.5, max: 5.71 };

    const smiEval = evaluate(smi, smiRef.min, smiRef.max);
    const paEval = evaluate(pa, paRef.min, paRef.max);

    container.innerHTML = `
        <h5 class="text-sm font-black text-slate-700 uppercase mb-4 flex items-center gap-2">
            <i data-lucide="clipboard-check" class="w-4 h-4 text-teal-600"></i>
            Đánh giá cơ bắp
        </h5>
        <div class="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <table class="w-full text-sm">
                <thead class="bg-slate-50 text-xs uppercase text-slate-500 font-bold">
                    <tr>
                        <th class="px-4 py-2 text-left">Chỉ số</th>
                        <th class="px-4 py-2 text-left">Kết quả</th>
                        <th class="px-4 py-2 text-center">Min - Max</th>
                        <th class="px-4 py-2 text-center">Đánh giá</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 bg-white">
                    <tr>
                        <td class="px-4 py-3 font-bold text-slate-700">Khối lượng cơ (SMI)</td>
                        <td class="px-4 py-3 font-black text-teal-800 text-lg">${smi} <span class="text-xs font-normal text-slate-400">kg/m²</span></td>
                        <td class="px-4 py-3 text-center font-mono text-xs text-slate-500">${smiRef.min} - ${smiRef.max}</td>
                        <td class="px-4 py-3 text-center">
                            <span class="inline-block px-3 py-1 rounded text-xs font-bold border ${smiEval.color}">${smiEval.text}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3 font-bold text-slate-700">Chất lượng cơ (Góc pha)</td>
                        <td class="px-4 py-3 font-black text-teal-800 text-lg">${pa} <span class="text-xs font-normal text-slate-400">°</span></td>
                        <td class="px-4 py-3 text-center font-mono text-xs text-slate-500">${paRef.min} - ${paRef.max}</td>
                        <td class="px-4 py-3 text-center">
                            <span class="inline-block px-3 py-1 rounded text-xs font-bold border ${paEval.color}">${paEval.text}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function renderReportTable(data, patientId) {
    const tbody = document.getElementById('m6-report-table-body');
    if (!tbody) return;

    // Get Patient Info
    const patient = getPatientById(patientId) || { dob: '1960-01-01', gender: 'male' };
    const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();
    const gender = patient.gender === 'male' ? 'Nam' : 'Nữ';

    // BMR Calculation (Mifflin-St Jeor)
    // Men: 10W + 6.25H - 5A + 5
    // Women: 10W + 6.25H - 5A - 161
    let bmr = data.general.bmr;
    if (!bmr && data.general.weight && data.general.height) {
        const w = parseFloat(data.general.weight);
        const h = parseFloat(data.general.height);
        if (patient.gender === 'male') {
            bmr = (10 * w) + (6.25 * h) - (5 * age) + 5;
        } else {
            bmr = (10 * w) + (6.25 * h) - (5 * age) - 161;
        }
        bmr = bmr.toFixed(0);
    }

    // Helper to format range
    const fmtRange = (min, max, unit) => {
        if (!min && !max) return 'Chưa có';
        return `Thấp: &lt;${min}<br>Bình thường: ${min}-${max}<br>Cao: &gt;${max} <span class="text-[10px] text-slate-400">(${unit})</span>`;
    };

    // Requested Metrics Only
    const metrics = [
        { name: 'Độ tuổi', value: age, unit: 'tuổi', refText: 'Thông tin hành chính' },
        { name: 'Chiều cao', value: data.general.height, unit: 'cm', refText: 'Thông tin hành chính' },
        { name: 'Cân nặng', value: data.general.weight, unit: 'kg', min: 50, max: 75, refText: fmtRange(50, 75, 'kg') },
        { name: 'BMI', value: data.general.bmi, unit: 'kg/m²', min: 18.5, max: 23, refText: fmtRange(18.5, 23, 'kg/m²') },
        { name: 'Tỷ lệ mỡ cơ thể', value: data.general.bodyFat, unit: '%', min: 10, max: 20, refText: fmtRange(10, 20, '%') },
        { name: 'Khối lượng cơ', value: data.general.muscleMass, unit: 'kg', min: 25, max: 35, refText: fmtRange(25, 35, 'kg') },
        { name: 'Khối lượng xương ước tính', value: data.general.boneMass || '--', unit: 'kg', refText: '2.0 - 4.0' },
        { name: 'Tỷ lệ trao đổi chất (BMR)', value: bmr || '--', unit: 'kcal', refText: '1200 - 2000' },
    ];

    tbody.innerHTML = metrics.map(m => {
        const val = parseFloat(m.value);
        let status = '<span class="px-2 py-1 bg-slate-50 text-slate-400 rounded text-xs font-bold">--</span>';

        if (m.min !== undefined && m.max !== undefined && !isNaN(val)) {
            if (val < m.min) status = '<span class="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold">Thấp</span>';
            else if (val > m.max) status = '<span class="px-2 py-1 bg-orange-50 text-orange-600 rounded text-xs font-bold">Cao</span>';
            else status = '<span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold">Bình thường</span>';
        } else if (m.name === 'Độ tuổi' || m.name === 'Chiều cao') {
            status = '<span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">Thông tin</span>';
        }

        return `
            <tr class="hover:bg-slate-50/50">
                <td class="px-4 py-3 font-bold text-slate-700">${m.name}</td>
                <td class="px-4 py-3 font-black text-indigo-900 text-base">${val || '--'} <span class="text-xs font-normal text-slate-400 ml-1">${m.unit}</span></td>
                <td class="px-4 py-3 text-xs leading-relaxed text-slate-500">${m.refText || 'Chưa có tham chiếu'}</td>
                <td class="px-4 py-3 text-center">${status}</td>
            </tr>
        `;
    }).join('');

    // Call new renderer
    renderMuscleEvalTable(data);
}

function renderBodyTypeChart(data) {
    const ctx = document.getElementById('m6-bodytype-chart');
    if (!ctx) return;

    if (m6BodyTypeChart) m6BodyTypeChart.destroy();

    const x = data.general.muscleMass || 0;
    const y = data.general.bodyFat || 0;

    // Custom Plugin to draw 3x3 Background Grid
    const bgGridPlugin = {
        id: 'bgGrid',
        beforeDraw: (chart) => {
            const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
            ctx.save();

            const cols = 3;
            const rows = 3;
            const cellW = width / cols;
            const cellH = height / rows;

            const labels = [
                ["Béo phì tiềm ẩn", "Béo phì", "Thừa cân (Cơ & Mỡ)"],
                ["Thiếu vận động", "Tiêu chuẩn", "Cơ bắp"],
                ["Gầy", "Cơ bắp mảnh khảnh", "Cực kỳ cơ bắp"]
            ];

            // Draw cells
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const cx = left + c * cellW;
                    const cy = top + r * cellH;

                    // Center Cell (1,1) Highlight
                    if (r === 1 && c === 1) {
                        ctx.fillStyle = '#ecfdf5'; // emerald-50
                        ctx.fillRect(cx, cy, cellW, cellH);
                    }

                    // Borders
                    ctx.strokeStyle = '#e2e8f0'; // slate-200
                    ctx.lineWidth = 1;
                    ctx.strokeRect(cx, cy, cellW, cellH);

                    // Text
                    ctx.fillStyle = (r === 1 && c === 1) ? '#059669' : '#94a3b8'; // emerald-600 or slate-400
                    ctx.font = (r === 1 && c === 1) ? 'bold 12px Inter, sans-serif' : 'bold 11px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(labels[r][c], cx + cellW / 2, cy + cellH / 2);
                }
            }
            ctx.restore();
        }
    };

    m6BodyTypeChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Kết quả của bạn',
                data: [{ x: x, y: y }],
                backgroundColor: '#4f46e5',
                borderColor: '#fff',
                borderWidth: 3,
                pointRadius: 10,
                pointHoverRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Khối lượng cơ (kg)', font: { weight: 'bold' } },
                    min: 20, max: 80,
                    grid: { display: false } // Hide default grid
                },
                y: {
                    title: { display: true, text: 'Tỷ lệ mỡ (%)', font: { weight: 'bold' } },
                    min: 5, max: 60,
                    grid: { display: false }, // Hide default grid
                    reverse: false
                }
            },
            plugins: {
                legend: { display: true, position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `Cơ: ${context.parsed.x}kg, Mỡ: ${context.parsed.y}%`;
                        }
                    }
                }
            }
        },
        plugins: [bgGridPlugin]
    });
}

function renderQualityChart(data) {
    const ctx = document.getElementById('m6-quality-chart');
    if (!ctx) return;

    if (m6QualityChart) m6QualityChart.destroy();

    const x = data.advanced.smi || 0;
    const y = data.advanced.phaseAngle || 0;

    m6QualityChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Chỉ số hiện tại',
                data: [{ x: x, y: y }],
                backgroundColor: '#0d9488',
                borderColor: '#fff',
                borderWidth: 3,
                pointRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'SMI (Chỉ số cơ xương)', font: { weight: 'bold' } },
                    min: 3, max: 15,
                    grid: { color: 'rgba(241, 245, 249, 0.5)' }
                },
                y: {
                    title: { display: true, text: 'Phase Angle (Góc pha)', font: { weight: 'bold' } },
                    min: 2, max: 12,
                    grid: { color: 'rgba(241, 245, 249, 0.5)' }
                }
            },
            plugins: {
                legend: { display: true, position: 'bottom' }
            }
        }
    });
}

function saveM6ReportData(type = 'all') {
    const selector = document.getElementById('m6-report-selector');
    if (!selector) return;
    const timestamp = selector.value;

    const patientId = getCurrentPatientId();
    const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${patientId}_body_assessments`) || '[]');

    // Find and update
    const index = assessments.findIndex(a => a.timestamp == timestamp);
    if (index !== -1) {
        if (type === 'bodyType' || type === 'all') {
            assessments[index].bodyTypeComment = document.getElementById('m6-bodytype-comment').value;
        }
        if (type === 'quality' || type === 'all') {
            assessments[index].qualityComment = document.getElementById('m6-quality-comment').value;
        }

        localStorage.setItem(`mirabocaresync_${patientId}_body_assessments`, JSON.stringify(assessments));
        showToast('Đã lưu nhận xét thành công!', 'success');
    }
}

// Print specific assessment
function printModule6Assessment(index) {
    const assessments = JSON.parse(localStorage.getItem(`mirabocaresync_${getCurrentPatientId()}_body_assessments`) || '[]');
    const assessment = assessments[index];
    if (!assessment) return;

    const printWindow = window.open('', '_blank');
    const content = `
        <html>
        <head>
            <title>Phiếu Đánh giá Thành phần Cơ thể - ${new Date(assessment.assessmentDate).toLocaleDateString('vi-VN')}</title>
            <style>
                body { font-family: 'Times New Roman', serif; padding: 40px; line-height: 1.6; }
                h1 { text-align: center; font-size: 24px; margin-bottom: 20px; text-transform: uppercase; }
                .meta { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
                .section { margin-bottom: 30px; }
                h2 { font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 15px; color: #333; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #eee; padding-bottom: 5px; }
                .label { font-weight: bold; color: #555; }
                .value { font-weight: bold; }
                .footer { margin-top: 50px; text-align: center; font-style: italic; font-size: 12px; color: #888; }
            </style>
        </head>
        <body>
            <h1>Phiếu Đánh giá Thành phần Cơ thể</h1>
            
            <div class="meta">
                <div class="row"><span class="label">Bệnh nhân:</span> <span class="value">${getPatientById(getCurrentPatientId()).fullName}</span></div>
                <div class="row"><span class="label">Mã hồ sơ:</span> <span class="value">${getCurrentPatientId()}</span></div>
                <div class="row"><span class="label">Ngày đánh giá:</span> <span class="value">${new Date(assessment.assessmentDate).toLocaleDateString('vi-VN')}</span></div>
                <div class="row"><span class="label">Người thực hiện:</span> <span class="value">${assessment.assessor || 'Quản trị viên'}</span></div>
            </div>

            <div class="section">
                <h2>1. Thông số Chung</h2>
                <div class="grid">
                    <div>
                         <div class="row"><span class="label">Chiều cao:</span> <span class="value">${assessment.general.height} cm</span></div>
                         <div class="row"><span class="label">Cân nặng:</span> <span class="value">${assessment.general.weight} kg</span></div>
                         <div class="row"><span class="label">BMI:</span> <span class="value">${assessment.general.bmi || '--'}</span></div>
                    </div>
                    <div>
                         <div class="row"><span class="label">Tỷ lệ mỡ:</span> <span class="value">${assessment.general.bodyFat || '--'} %</span></div>
                         <div class="row"><span class="label">Khối lượng cơ:</span> <span class="value">${assessment.general.muscleMass || '--'} kg</span></div>
                         <div class="row"><span class="label">BMR:</span> <span class="value">${assessment.general.bmr || '--'} kcal</span></div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>2. Phân tích Cơ bắp & Mỡ</h2>
                <div class="grid">
                    <div>
                        <h3>Khối lượng Cơ</h3>
                        <div class="row"><span class="label">Tay phải:</span> <span class="value">${assessment.muscle.rightArm || '--'} kg</span></div>
                        <div class="row"><span class="label">Tay trái:</span> <span class="value">${assessment.muscle.leftArm || '--'} kg</span></div>
                        <div class="row"><span class="label">Thân mình:</span> <span class="value">${assessment.muscle.trunk || '--'} kg</span></div>
                        <div class="row"><span class="label">Chân phải:</span> <span class="value">${assessment.muscle.rightLeg || '--'} kg</span></div>
                        <div class="row"><span class="label">Chân trái:</span> <span class="value">${assessment.muscle.leftLeg || '--'} kg</span></div>
                    </div>
                    <div>
                         <h3>CHẤT LƯỢNG CƠ (Góc pha)</h3>
                        <div class="row"><span class="label">Tay phải:</span> <span class="value">${assessment.muscle.paRightArm || '--'} °</span></div>
                        <div class="row"><span class="label">Tay trái:</span> <span class="value">${assessment.muscle.paLeftArm || '--'} °</span></div>
                        <div class="row"><span class="label">Thân mình:</span> <span class="value">${assessment.muscle.paTrunk || '--'} °</span></div>
                        <div class="row"><span class="label">Chân phải:</span> <span class="value">${assessment.muscle.paRightLeg || '--'} °</span></div>
                        <div class="row"><span class="label">Chân trái:</span> <span class="value">${assessment.muscle.paLeftLeg || '--'} °</span></div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2>3. Chỉ số Chuyên sâu</h2>
                <div class="grid">
                     <div class="row"><span class="label">SMI:</span> <span class="value">${assessment.advanced.smi || '--'} kg/m²</span></div>
                     <div class="row"><span class="label">Góc pha TB (Phase Angle):</span> <span class="value">${assessment.advanced.phaseAngle || '--'} độ</span></div>
                     <div class="row"><span class="label">ECW/TBW:</span> <span class="value">${assessment.advanced.ecwTbw || '--'}</span></div>
                </div>
            </div>

            <div class="section">
                <h2>Ghi chú</h2>
                <p>${assessment.notes || 'Không có ghi chú'}</p>
            </div>

            <div class="footer">
                In từ hệ thống ElderCare Pro vào ngày ${new Date().toLocaleDateString('vi-VN')}
            </div>
        </body>
        </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// Print Report Analysis
function printModule6Report() {
    // We need to capture the current state of the report tab
    // Since charts are canvas, we need to convert them

    // 1. Selector for content
    const reportTab = document.getElementById('module6-report-tab');
    if (!reportTab) return;

    const printWindow = window.open('', '_blank');

    // 2. Clone the content (deep clone to not mess up original)
    // Actually, deep cloning canvas doesn't copy the image.
    // So we iterate original canvases and convert to images.

    const canvases = reportTab.querySelectorAll('canvas');
    const canvasImages = [];
    canvases.forEach(c => canvasImages.push(c.toDataURL()));

    // Create a temporary container to manipulate HTML string
    const container = document.createElement('div');
    container.innerHTML = reportTab.innerHTML;

    // Replace canvases with images in the container
    const tempCanvases = container.querySelectorAll('canvas');
    tempCanvases.forEach((c, i) => {
        const img = document.createElement('img');
        img.src = canvasImages[i];
        img.style.width = '100%';
        img.style.maxWidth = '600px';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        c.parentNode.replaceChild(img, c);
    });

    // Remove non-printable elements (buttons, selectors)
    const buttons = container.querySelectorAll('button, select, #m6-report-selector');
    buttons.forEach(b => b.remove());

    // Also remove the "Chọn bản ghi" label
    const labels = container.querySelectorAll('span');
    labels.forEach(l => {
        if (l.textContent.includes('Chọn bản ghi')) l.remove();
    });

    const htmlContent = container.innerHTML;

    const doc = `
        <html>
        <head>
            <title>Báo cáo Phân tích Thành phần Cơ thể</title>
             <script src="https://cdn.tailwindcss.com"></script>
            <style>
                body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 40px; }
                .page-break { page-break-before: always; }
                /* Fix tailwind print issues */
                @media print {
                    body { -webkit-print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <div class="text-center mb-10 pb-6 border-b border-slate-200">
                <h1 class="text-2xl font-black uppercase text-slate-800">Báo cáo Phân tích Thành phần Cơ thể</h1>
                <p class="text-slate-500 font-bold mt-2">Bệnh nhân: ${getPatientById(getCurrentPatientId()).fullName} - ID: ${getCurrentPatientId()}</p>
                <p class="text-xs text-slate-400 mt-1">Ngày xuất báo cáo: ${new Date().toLocaleDateString('vi-VN')}</p>
            </div>
            
            <div class="space-y-8">
                ${htmlContent}
            </div>

            <div class="text-center text-xs text-slate-400 mt-10 pt-6 border-t border-slate-100 italic">
                Hệ thống Quản lý ElderCare Pro
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(doc);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 1000);
}

// ==========================================
// FAB Logic for Module 6 (Standardized)
// ==========================================

// Init FAB Logic
function initModule6FabLogic() {
    console.log('[Module6] initModule6FabLogic called');
    window.module6FAB = createFABManager({
        moduleId: 'module6',
        formId: 'module6-form',

        // Module 6 Currently Create-Only/Append-Only in this version
        hasExistingData: () => false,

        onSave: () => saveModule6Assessment(),
        onReset: () => resetModule6Form(),
        enableEdit: false, // Not supporting Edit yet, just Create
        alwaysShowSave: false // Only show when dirty (User confirmed inputs trigger logs)
    });

    window.module6FAB.init();
}

// Update FAB State (kept for compatibility if called elsewhere, but delegates to FAB Manager)
function updateModule6FabState() {
    if (window.module6FAB) {
        window.module6FAB.updateFABs();
    }
}

