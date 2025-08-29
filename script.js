// User Data (في التطبيق الحقيقي ستأتي من قاعدة البيانات)
let userData = {
    name: "محمد الإمبراطور",
    age: 25,
    rank: "إمبراطور",
    salary: 10000,
    balance: 50000,
    companies: 3,
    factories: 2,
    shops: 5,
    investments: 8
};

// Members Data
let membersData = [
    { id: 1, name: "أحمد الحاكم", balance: 35000, rank: "حاكم" },
    { id: 2, name: "فاطمة الجنرال", balance: 28000, rank: "جنرال" },
    { id: 3, name: "علي القائد", balance: 22000, rank: "قائد" },
    { id: 4, name: "مريم الوزير", balance: 18000, rank: "وزير" },
    { id: 5, name: "عمر الضابط", balance: 15000, rank: "ضابط" }
];

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
});

// Modal Functions
function openModal(modalType) {
    const modalContainer = document.getElementById('modalContainer');
    const modalContent = getModalContent(modalType);
    
    modalContainer.innerHTML = `
        <div class="modal show">
            <div class="modal-content">
                ${modalContent}
            </div>
        </div>
    `;
    
    // Add event listeners for close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking outside
    document.querySelector('.modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function closeModal() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = '';
}

function getModalContent(modalType) {
    switch(modalType) {
        case 'profileModal':
            return `
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-user-circle mr-2"></i>الملف الشخصي</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="space-y-4">
                    <div class="text-center mb-6">
                        <div class="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-4">
                            <i class="fas fa-crown text-3xl text-yellow-300"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-white">${userData.name}</h3>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-600/30">
                            <i class="fas fa-calendar-alt text-blue-400 mb-2"></i>
                            <p class="text-gray-300 text-sm">العمر</p>
                            <p class="text-white font-bold">${userData.age} سنة</p>
                        </div>
                        <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-600/30">
                            <i class="fas fa-medal text-purple-400 mb-2"></i>
                            <p class="text-gray-300 text-sm">الرتبة</p>
                            <p class="text-purple-400 font-bold">${userData.rank}</p>
                        </div>
                        <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-600/30">
                            <i class="fas fa-money-bill-wave text-green-400 mb-2"></i>
                            <p class="text-gray-300 text-sm">الراتب الشهري</p>
                            <p class="text-green-400 font-bold">${userData.salary.toLocaleString()}</p>
                        </div>
                        <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-600/30">
                            <i class="fas fa-wallet text-yellow-400 mb-2"></i>
                            <p class="text-gray-300 text-sm">الرصيد الحالي</p>
                            <p class="text-yellow-400 font-bold">${userData.balance.toLocaleString()}</p>
                        </div>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t border-gray-600/30">
                        <h4 class="text-lg font-bold mb-4 text-center text-yellow-400">إحصائيات الممتلكات</h4>
                        <div class="grid grid-cols-2 gap-3">
                            <div class="text-center">
                                <div class="w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <i class="fas fa-building text-blue-400"></i>
                                </div>
                                <p class="text-blue-400 font-bold text-xl">${userData.companies}</p>
                                <p class="text-gray-400 text-sm">شركات</p>
                            </div>
                            <div class="text-center">
                                <div class="w-12 h-12 bg-red-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <i class="fas fa-industry text-red-400"></i>
                                </div>
                                <p class="text-red-400 font-bold text-xl">${userData.factories}</p>
                                <p class="text-gray-400 text-sm">مصانع</p>
                            </div>
                            <div class="text-center">
                                <div class="w-12 h-12 bg-pink-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <i class="fas fa-store text-pink-400"></i>
                                </div>
                                <p class="text-pink-400 font-bold text-xl">${userData.shops}</p>
                                <p class="text-gray-400 text-sm">محلات</p>
                            </div>
                            <div class="text-center">
                                <div class="w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <i class="fas fa-chart-line text-green-400"></i>
                                </div>
                                <p class="text-green-400 font-bold text-xl">${userData.investments}</p>
                                <p class="text-gray-400 text-sm">استثمارات</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
        case 'investmentModal':
            return `
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-chart-line mr-2"></i>الاستثمارات</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <form onsubmit="handleInvestment(event)">
                    <div class="form-group">
                        <label class="form-label">نوع الاستثمار</label>
                        <select class="form-select" id="investmentType" required>
                            <option value="">اختر نوع الاستثمار</option>
                            <option value="stocks">أسهم الشركات</option>
                            <option value="real-estate">العقارات</option>
                            <option value="crypto">العملات الرقمية</option>
                            <option value="gold">الذهب والمعادن</option>
                            <option value="startup">الشركات الناشئة</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">المبلغ المراد استثماره</label>
                        <input type="number" class="form-input" id="investmentAmount" placeholder="أدخل المبلغ" min="1000" required>
                        <p class="text-sm text-gray-400 mt-1">الحد الأدنى: 1,000</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">مدة الاستثمار</label>
                        <select class="form-select" id="investmentDuration" required>
                            <option value="">اختر المدة</option>
                            <option value="1">شهر واحد (عائد 5%)</option>
                            <option value="3">3 أشهر (عائد 15%)</option>
                            <option value="6">6 أشهر (عائد 35%)</option>
                            <option value="12">سنة كاملة (عائد 80%)</option>
                        </select>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="btn btn-primary flex-1">
                            <i class="fas fa-rocket"></i>
                            بدء الاستثمار
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                    </div>
                </form>
            `;
            
        case 'miningModal':
            return `
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-pickaxe mr-2"></i>التعدين</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="mb-6">
                    <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                        <p class="text-yellow-400 text-center"><i class="fas fa-info-circle mr-2"></i>كل عملية تعدين تكلف 500 وحدة طاقة</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="bg-blue-500/10 p-4 rounded-lg text-center">
                            <i class="fas fa-battery-three-quarters text-blue-400 text-2xl mb-2"></i>
                            <p class="text-blue-400 font-bold text-xl">2,500</p>
                            <p class="text-gray-400 text-sm">طاقة متاحة</p>
                        </div>
                        <div class="bg-green-500/10 p-4 rounded-lg text-center">
                            <i class="fas fa-gem text-green-400 text-2xl mb-2"></i>
                            <p class="text-green-400 font-bold text-xl">1,250</p>
                            <p class="text-gray-400 text-sm">نقاط تعدين</p>
                        </div>
                    </div>
                </div>
                
                <form onsubmit="handleMining(event)">
                    <div class="form-group">
                        <label class="form-label">نوع المعدن</label>
                        <select class="form-select" id="miningType" required>
                            <option value="">اختر المعدن</option>
                            <option value="gold">ذهب (عائد عالي - خطورة منخفضة)</option>
                            <option value="silver">فضة (عائد متوسط - خطورة منخفضة)</option>
                            <option value="diamond">ماس (عائد عالي جداً - خطورة عالية)</option>
                            <option value="coal">فحم (عائد منخفض - خطورة منخفضة)</option>
                            <option value="iron">حديد (عائد متوسط - خطورة متوسطة)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">عدد مرات التعدين</label>
                        <select class="form-select" id="miningCount" required>
                            <option value="">اختر العدد</option>
                            <option value="1">مرة واحدة (500 طاقة)</option>
                            <option value="3">3 مرات (1,500 طاقة)</option>
                            <option value="5">5 مرات (2,500 طاقة)</option>
                        </select>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="btn btn-primary flex-1">
                            <i class="fas fa-tools"></i>
                            بدء التعدين
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                    </div>
                </form>
            `;
            
        case 'transferModal':
            return `
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-exchange-alt mr-2"></i>تحويل الأموال</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <form onsubmit="handleTransfer(event)">
                    <div class="form-group">
                        <label class="form-label">المستلم</label>
                        <select class="form-select" id="transferRecipient" required>
                            <option value="">اختر المستلم</option>
                            ${membersData.map(member => 
                                `<option value="${member.id}">${member.name} - ${member.rank}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">المبلغ</label>
                        <input type="number" class="form-input" id="transferAmount" placeholder="أدخل المبلغ" min="100" max="${userData.balance}" required>
                        <p class="text-sm text-gray-400 mt-1">رصيدك الحالي: ${userData.balance.toLocaleString()}</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">سبب التحويل (اختياري)</label>
                        <textarea class="form-input" id="transferReason" placeholder="أدخل سبب التحويل" rows="3"></textarea>
                    </div>
                    <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                        <p class="text-red-400 text-sm"><i class="fas fa-exclamation-triangle mr-2"></i>رسوم التحويل: 2% من المبلغ</p>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="btn btn-primary flex-1">
                            <i class="fas fa-paper-plane"></i>
                            تأكيد التحويل
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                    </div>
                </form>
            `;
            
        case 'membersModal':
            return `
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-users mr-2"></i>قائمة الأعضاء</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="space-y-3 max-h-96 overflow-y-auto">
                    ${membersData.map(member => `
                        <div class="bg-gray-800/50 p-4 rounded-lg border border-gray-600/30 flex items-center justify-between">
                            <div class="flex items-center space-x-3 space-x-reverse">
                                <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <i class="fas fa-user text-white"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-white">${member.name}</h4>
                                    <p class="text-sm text-gray-400">${member.rank}</p>
                                </div>
                            </div>
                            <div class="text-left">
                                <p class="font-bold text-green-400">${member.balance.toLocaleString()}</p>
                                <button onclick="quickTransfer(${member.id})" class="text-xs bg-blue-500/20 hover:bg-blue-500/40 px-3 py-1 rounded-lg text-blue-400 transition-colors">
                                    <i class="fas fa-paper-plane mr-1"></i>تحويل
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
        case 'adminModal':
            return `
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-crown mr-2"></i>لوحة الإمبراطور</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="space-y-6">
                    <div class="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-4 rounded-lg border border-yellow-500/30">
                        <h3 class="text-yellow-400 font-bold mb-3"><i class="fas fa-treasure-chest mr-2"></i>خزينة الدولة</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="text-center">
                                <p class="text-2xl font-bold text-green-400">2,500,000</p>
                                <p class="text-sm text-gray-400">الرصيد الحالي</p>
                            </div>
                            <div class="text-center">
                                <p class="text-2xl font-bold text-blue-400">850,000</p>
                                <p class="text-sm text-gray-400">الدخل الشهري</p>
                            </div>
                        </div>
                    </div>
                    
                    <form onsubmit="handleStateManagement(event)">
                        <div class="form-group">
                            <label class="form-label">نوع العملية</label>
                            <select class="form-select" id="stateOperation" required>
                                <option value="">اختر العملية</option>
                                <option value="add">إضافة أموال للخزينة</option>
                                <option value="withdraw">سحب من الخزينة</option>
                                <option value="salary">صرف رواتب الموظفين</option>
                                <option value="bonus">منح مكافآت</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">المبلغ</label>
                            <input type="number" class="form-input" id="stateAmount" placeholder="أدخل المبلغ" min="1" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">التفاصيل</label>
                            <textarea class="form-input" id="stateDetails" placeholder="أدخل تفاصيل العملية" rows="3" required></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="submit" class="btn btn-primary flex-1">
                                <i class="fas fa-check"></i>
                                تنفيذ العملية
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                        </div>
                    </form>
                </div>
            `;
            
        case 'factoryModal':
            return `
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-industry mr-2"></i>إنشاء مصنع</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <form onsubmit="handleFactory(event)">
                    <div class="form-group">
                        <label class="form-label">نوع المصنع</label>
                        <select class="form-select" id="factoryType" required>
                            <option value="">اختر نوع المصنع</option>
                            <option value="textile">مصنع نسيج (تكلفة: 50,000)</option>
                            <option value="food">مصنع أغذية (تكلفة: 75,000)</option>
                            <option value="electronics">مصنع إلكترونيات (تكلفة: 150,000)</option>
                            <option value="automotive">مصنع سيارات (تكلفة: 500,000)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">اسم المصنع</label>
                        <input type="text" class="form-input" id="factoryName" placeholder="أدخل اسم المصنع" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الموقع</label>
                        <select class="form-select" id="factoryLocation" required>
                            <option value="">اختر الموقع</option>
                            <option value="industrial">المنطقة الصناعية</option>
                            <option value="port">قرب الميناء</option>
                            <option value="city">داخل المدينة</option>
                            <option value="suburbs">الضواحي</option>
                        </select>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="btn btn-primary flex-1">
                            <i class="fas fa-hammer"></i>
                            إنشاء المصنع
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                    </div>
                </form>
            `;
            
        case 'companyModal':
            return `
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-building mr-2"></i>تأسيس شركة</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <form onsubmit="handleCompany(event)">
                    <div class="form-group">
                        <label class="form-label">نوع الشركة</label>
                        <select class="form-select" id="companyType" required>
                            <option value="">اختر نوع الشركة</option>
                            <option value="tech">شركة تقنية (تكلفة: 100,000)</option>
                            <option value="consulting">شركة استشارات (تكلفة: 50,000)</option>
                            <option value="trading">شركة تجارية (تكلفة: 200,000)</option>
                            <option value="construction">شركة مقاولات (تكلفة: 300,000)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">اسم الشركة</label>
                        <input type="text" class="form-input" id="companyName" placeholder="أدخل اسم الشركة" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">رأس المال الإضافي</label>
                        <input type="number" class="form-input" id="companyCapital" placeholder="رأس مال إضافي (اختياري)" min="0">
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="btn btn-primary flex-1">
                            <i class="fas fa-rocket"></i>
                            تأسيس الشركة
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                    </div>
                </form>
            `;
            
        case 'shopModal':
            return `
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-store mr-2"></i>فتح محل تجاري</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <form onsubmit="handleShop(event)">
                    <div class="form-group">
                        <label class="form-label">نوع المحل</label>
                        <select class="form-select" id="shopType" required>
                            <option value="">اختر نوع المحل</option>
                            <option value="grocery">بقالة (تكلفة: 25,000)</option>
                            <option value="clothing">ملابس (تكلفة: 40,000)</option>
                            <option value="electronics">إلكترونيات (تكلفة: 80,000)</option>
                            <option value="restaurant">مطعم (تكلفة: 100,000)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">اسم المحل</label>
                        <input type="text" class="form-input" id="shopName" placeholder="أدخل اسم المحل" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الموقع</label>
                        <select class="form-select" id="shopLocation" required>
                            <option value="">اختر الموقع</option>
                            <option value="mall">مركز تجاري</option>
                            <option value="street">شارع رئيسي</option>
                            <option value="neighborhood">حي سكني</option>
                            <option value="downtown">وسط المدينة</option>
                        </select>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="btn btn-primary flex-1">
                            <i class="fas fa-store-alt"></i>
                            فتح المحل
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                    </div>
                </form>
            `;
            
        default:
            return '<p class="text-white">محتوى غير متوفر</p>';
    }
}

// Form Handlers
function handleInvestment(event) {
    event.preventDefault();
    const type = document.getElementById('investmentType').value;
    const amount = parseInt(document.getElementById('investmentAmount').value);
    const duration = document.getElementById('investmentDuration').value;
    
    if (amount > userData.balance) {
        showAlert('رصيدك غير كافي لهذا الاستثمار!', 'error');
        return;
    }
    
    // Update user balance
    userData.balance -= amount;
    userData.investments += 1;
    updateUI();
    
    showAlert(`تم بدء استثمار بقيمة ${amount.toLocaleString()} بنجاح!`, 'success');
    closeModal();
}

function handleMining(event) {
    event.preventDefault();
    const type = document.getElementById('miningType').value;
    const count = parseInt(document.getElementById('miningCount').value);
    const energyCost = count * 500;
    
    // Simulate mining results
    const results = [];
    for (let i = 0; i < count; i++) {
        const success = Math.random() > 0.3; // 70% success rate
        if (success) {
            const earnings = Math.floor(Math.random() * 2000) + 500;
            results.push(earnings);
            userData.balance += earnings;
        }
    }
    
    updateUI();
    
    if (results.length > 0) {
        const totalEarnings = results.reduce((a, b) => a + b, 0);
        showAlert(`نجح التعدين! ربحت ${totalEarnings.toLocaleString()} من ${count} محاولات`, 'success');
    } else {
        showAlert('للأسف، فشل التعدين هذه المرة. حاول مرة أخرى!', 'error');
    }
    
    closeModal();
}

function handleTransfer(event) {
    event.preventDefault();
    const recipientId = document.getElementById('transferRecipient').value;
    const amount = parseInt(document.getElementById('transferAmount').value);
    const reason = document.getElementById('transferReason').value;
    
    const fee = Math.floor(amount * 0.02); // 2% fee
    const totalCost = amount + fee;
    
    if (totalCost > userData.balance) {
        showAlert('رصيدك غير كافي (تذكر رسوم التحويل 2%)!', 'error');
        return;
    }
    
    const recipient = membersData.find(m => m.id == recipientId);
    userData.balance -= totalCost;
    updateUI();
    
    showAlert(`تم تحويل ${amount.toLocaleString()} إلى ${recipient.name} بنجاح!`, 'success');
    closeModal();
}

function handleStateManagement(event) {
    event.preventDefault();
    const operation = document.getElementById('stateOperation').value;
    const amount = parseInt(document.getElementById('stateAmount').value);
    const details = document.getElementById('stateDetails').value;
    
    showAlert(`تم تنفيذ عملية ${operation} بمبلغ ${amount.toLocaleString()} بنجاح!`, 'success');
    closeModal();
}

function handleFactory(event) {
    event.preventDefault();
    const type = document.getElementById('factoryType').value;
    const name = document.getElementById('factoryName').value;
    const location = document.getElementById('factoryLocation').value;
    
    const costs = {
        textile: 50000,
        food: 75000,
        electronics: 150000,
        automotive: 500000
    };
    
    const cost = costs[type];
    if (cost > userData.balance) {
        showAlert('رصيدك غير كافي لفتح هذا المحل!', 'error');
        return;
    }
    
    userData.balance -= cost;
    userData.shops += 1;
    updateUI();
    
    showAlert(`تم فتح محل "${name}" بنجاح!`, 'success');
    closeModal();
}

// Quick Transfer Function
function quickTransfer(memberId) {
    const member = membersData.find(m => m.id === memberId);
    const amount = prompt(`كم تريد أن تحول إلى ${member.name}؟`);
    
    if (amount && !isNaN(amount) && parseInt(amount) > 0) {
        const transferAmount = parseInt(amount);
        const fee = Math.floor(transferAmount * 0.02);
        const total = transferAmount + fee;
        
        if (total <= userData.balance) {
            userData.balance -= total;
            updateUI();
            showAlert(`تم تحويل ${transferAmount.toLocaleString()} إلى ${member.name} بنجاح!`, 'success');
        } else {
            showAlert('رصيدك غير كافي!', 'error');
        }
    }
}

// UI Update Functions
function updateUI() {
    // Update balance in header
    document.getElementById('userBalance').textContent = userData.balance.toLocaleString();
    
    // Update user info
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userAge').textContent = `${userData.age} سنة`;
    document.getElementById('userRank').textContent = userData.rank;
    document.getElementById('userSalary').textContent = userData.salary.toLocaleString();
    document.getElementById('userWallet').textContent = userData.balance.toLocaleString();
    
    // Update assets count
    document.getElementById('companiesCount').textContent = userData.companies;
    document.getElementById('factoriesCount').textContent = userData.factories;
    document.getElementById('shopsCount').textContent = userData.shops;
    document.getElementById('investmentsCount').textContent = userData.investments;
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Alert System
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} fixed top-4 right-4 z-[9999] min-w-80 animate-slide-in`;
    alertDiv.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="mr-2 text-lg">&times;</button>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 5000);
}

// Load saved data on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        userData = { ...userData, ...JSON.parse(savedData) };
    }
    updateUI();
    
    // Add some welcome animations
    setTimeout(() => {
        showAlert('مرحباً بك في الإمبراطورية الاقتصادية! 👑', 'success');
    }, 1000);
});

// Auto-save every 30 seconds
setInterval(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
}, 30000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl/Cmd + number keys for quick actions
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        switch(e.key) {
            case '1': openModal('profileModal'); e.preventDefault(); break;
            case '2': openModal('investmentModal'); e.preventDefault(); break;
            case '3': openModal('miningModal'); e.preventDefault(); break;
            case '4': openModal('transferModal'); e.preventDefault(); break;
            case '5': openModal('membersModal'); e.preventDefault(); break;
        }
    }
});

// Add some random events for engagement
function triggerRandomEvent() {
    const events = [
        { message: '🎉 تم صرف راتبك الشهري!', amount: userData.salary, type: 'success' },
        { message: '📈 ارتفعت قيمة استثماراتك!', amount: Math.floor(Math.random() * 5000) + 1000, type: 'success' },
        { message: '🏭 أحد مصانعك حقق أرباحاً!', amount: Math.floor(Math.random() * 3000) + 500, type: 'success' },
        { message: '🏪 محلاتك التجارية تحقق مبيعات ممتازة!', amount: Math.floor(Math.random() * 2000) + 300, type: 'success' }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    userData.balance += event.amount;
    updateUI();
    showAlert(`${event.message} +${event.amount.toLocaleString()}`, event.type);
}

// Trigger random events every 2-5 minutes
setInterval(triggerRandomEvent, Math.random() * 180000 + 120000);

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.group');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${xPercent}%`);
            card.style.setProperty('--mouse-y', `${yPercent}%`);
        }
    });
});

// Progressive Web App features
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch(() => console.log('SW registration failed'));
}

// Add to home screen prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
    // Show install button or banner
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Add haptic feedback for mobile
function vibrate(pattern = [100]) {
    if (navigator.vibrate) {
        navigator.vibrate(pattern);
    }
}

// Add vibration to button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('button') || e.target.closest('button')) {
        vibrate([50]);
    }
});.balance) {
        showAlert('رصيدك غير كافي لإنشاء هذا المصنع!', 'error');
        return;
    }
    
    userData.balance -= cost;
    userData.factories += 1;
    updateUI();
    
    showAlert(`تم إنشاء مصنع "${name}" بنجاح!`, 'success');
    closeModal();
}

function handleCompany(event) {
    event.preventDefault();
    const type = document.getElementById('companyType').value;
    const name = document.getElementById('companyName').value;
    const capital = parseInt(document.getElementById('companyCapital').value) || 0;
    
    const costs = {
        tech: 100000,
        consulting: 50000,
        trading: 200000,
        construction: 300000
    };
    
    const totalCost = costs[type] + capital;
    if (totalCost > userData.balance) {
        showAlert('رصيدك غير كافي لتأسيس هذه الشركة!', 'error');
        return;
    }
    
    userData.balance -= totalCost;
    userData.companies += 1;
    updateUI();
    
    showAlert(`تم تأسيس شركة "${name}" بنجاح!`, 'success');
    closeModal();
}

function handleShop(event) {
    event.preventDefault();
    const type = document.getElementById('shopType').value;
    const name = document.getElementById('shopName').value;
    const location = document.getElementById('shopLocation').value;
    
    const costs = {
        grocery: 25000,
        clothing: 40000,
        electronics: 80000,
        restaurant: 100000
    };
    
    const cost = costs[type];
    if (cost > userData
