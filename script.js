// Global State Management
let currentUser = null;
let users = JSON.parse(localStorage.getItem('bankUsers')) || {};
let countries = JSON.parse(localStorage.getItem('bankCountries')) || {};
let globalSettings = JSON.parse(localStorage.getItem('bankSettings')) || {
    adminUsers: ['admin'],
    salaryInterval: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
    miningCooldown: 5 * 60 * 1000, // 5 minutes
    manufacturingSpeedBoosts: {},
    profitBoosts: {}
};

// Initialize admin user if not exists
if (!users['admin']) {
    users['admin'] = {
        username: 'admin',
        password: 'admin123',
        name: 'المدير العام',
        age: 30,
        nationality: 'إدارة النظام',
        rank: 'مدير عام',
        salary: 0,
        balance: 1000000000,
        isAdmin: true,
        lastSalaryTime: Date.now(),
        companies: [],
        factories: [],
        weapons: [],
        minerals: { iron: 0, gold: 0, silver: 0, uranium: 0, diamond: 0, coal: 0 },
        food: 0,
        country: null,
        investments: [],
        manufacturingQueue: [],
        createdAt: Date.now()
    };
    saveData();
}

// Weapon Database with images
const weaponsDB = {
    ak47: {
        name: 'AK-47',
        image: 'https://via.placeholder.com/80x60/2563eb/ffffff?text=AK-47',
        requirements: { iron: 50, coal: 20 },
        time: 5 * 60 * 1000, // 5 minutes
        value: 5000,
        category: 'rifles'
    },
    m4a1: {
        name: 'M4A1',
        image: 'https://via.placeholder.com/80x60/7c3aed/ffffff?text=M4A1',
        requirements: { iron: 45, coal: 15 },
        time: 4 * 60 * 1000,
        value: 4500,
        category: 'rifles'
    },
    pistol: {
        name: 'مسدس',
        image: 'https://via.placeholder.com/80x60/059669/ffffff?text=PISTOL',
        requirements: { iron: 20, coal: 5 },
        time: 2 * 60 * 1000,
        value: 1500,
        category: 'handguns'
    },
    sniper: {
        name: 'قناص',
        image: 'https://via.placeholder.com/80x60/dc2626/ffffff?text=SNIPER',
        requirements: { iron: 80, gold: 10, coal: 30 },
        time: 10 * 60 * 1000,
        value: 12000,
        category: 'sniper'
    },
    grenade: {
        name: 'قنبلة يدوية',
        image: 'https://via.placeholder.com/80x60/f59e0b/ffffff?text=GRENADE',
        requirements: { iron: 15, coal: 25, uranium: 5 },
        time: 3 * 60 * 1000,
        value: 3000,
        category: 'explosives'
    },
    tank: {
        name: 'دبابة',
        image: 'https://via.placeholder.com/80x60/374151/ffffff?text=TANK',
        requirements: { iron: 500, coal: 200, uranium: 50 },
        time: 60 * 60 * 1000, // 1 hour
        value: 500000,
        category: 'vehicles'
    },
    helicopter: {
        name: 'مروحية',
        image: 'https://via.placeholder.com/80x60/1e40af/ffffff?text=HELI',
        requirements: { iron: 300, gold: 50, uranium: 30 },
        time: 45 * 60 * 1000,
        value: 350000,
        category: 'vehicles'
    },
    missile: {
        name: 'صاروخ',
        image: 'https://via.placeholder.com/80x60/b91c1c/ffffff?text=MISSILE',
        requirements: { iron: 200, uranium: 100, gold: 20 },
        time: 30 * 60 * 1000,
        value: 200000,
        category: 'explosives'
    }
};

// Auth Functions
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!users[username] || users[username].password !== password) {
        showNotification('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
        return;
    }
    
    currentUser = users[username];
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    
    updateUI();
    initializeTimers();
    showNotification(`مرحباً بك ${currentUser.name}! 🎉`, 'success');
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const age = parseInt(document.getElementById('regAge').value);
    const nationality = document.getElementById('regNationality').value;
    
    if (users[username]) {
        showNotification('اسم المستخدم موجود بالفعل', 'error');
        return;
    }
    
    users[username] = {
        username,
        password,
        name: username,
        age,
        nationality,
        rank: 'مواطن',
        salary: 1000,
        balance: 10000,
        isAdmin: false,
        lastSalaryTime: Date.now(),
        companies: [],
        factories: [],
        weapons: [],
        minerals: { iron: 0, gold: 0, silver: 0, uranium: 0, diamond: 0, coal: 0 },
        food: 0,
        country: null,
        investments: [],
        manufacturingQueue: [],
        createdAt: Date.now()
    };
    
    saveData();
    showNotification('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول', 'success');
    showLogin();
}

function logout() {
    currentUser = null;
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('authScreen').style.display = 'block';
    clearInterval(salaryTimer);
    clearInterval(miningTimer);
    clearInterval(manufacturingTimer);
}

// UI Update Functions
function updateUI() {
    if (!currentUser) return;
    
    // Update header
    document.getElementById('headerUserInfo').textContent = `${currentUser.name} - ${currentUser.rank}`;
    document.getElementById('headerBalance').textContent = formatNumber(currentUser.balance);
    
    // Update user stats
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userRank').textContent = currentUser.rank;
    document.getElementById('userSalary').textContent = formatNumber(currentUser.salary);
    document.getElementById('userBalance').textContent = formatNumber(currentUser.balance);
    document.getElementById('userNationality').textContent = currentUser.nationality;
    
    // Update last salary time
    const lastSalary = new Date(currentUser.lastSalaryTime);
    document.getElementById('lastSalaryTime').textContent = lastSalary.toLocaleString('ar-EG');
    
    // Update assets count
    document.getElementById('companiesCount').textContent = currentUser.companies.length;
    document.getElementById('factoriesCount').textContent = currentUser.factories.length;
    document.getElementById('weaponsCount').textContent = currentUser.weapons.length;
    document.getElementById('foodCount').textContent = formatNumber(currentUser.food);
    
    // Calculate total minerals
    const totalMinerals = Object.values(currentUser.minerals).reduce((a, b) => a + b, 0);
    document.getElementById('mineralsCount').textContent = formatNumber(totalMinerals);
    
    // Show/hide admin button
    const adminBtn = document.getElementById('adminBtn');
    if (currentUser.isAdmin) {
        adminBtn.style.display = 'block';
    } else {
        adminBtn.style.display = 'none';
    }
    
    // Show/hide country button
    const countryBtn = document.getElementById('countryBtn');
    if (currentUser.country) {
        countryBtn.style.display = 'block';
    } else {
        countryBtn.style.display = 'none';
    }
    
    saveData();
}

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
    
    // Initialize modal-specific functionality
    initializeModalFunctionality(modalType);
}

function closeModal() {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = '';
}

function getModalContent(modalType) {
    switch(modalType) {
        case 'transferModal':
            return getTransferModalContent();
        case 'investmentModal':
            return getInvestmentModalContent();
        case 'miningModal':
            return getMiningModalContent();
        case 'manufacturingModal':
            return getManufacturingModalContent();
        case 'membersModal':
            return getMembersModalContent();
        case 'adminModal':
            return getAdminModalContent();
        case 'countryModal':
            return getCountryModalContent();
        case 'factoryModal':
            return getFactoryModalContent();
        case 'companyModal':
            return getCompanyModalContent();
        default:
            return '<p class="text-white text-center">محتوى غير متوفر</p>';
    }
}

function getTransferModalContent() {
    const otherUsers = Object.values(users).filter(u => u.username !== currentUser.username);
    
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
                    ${otherUsers.map(user => 
                        `<option value="${user.username}">${user.name} (${user.rank}) - ${user.nationality}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">نوع التحويل</label>
                <select class="form-select" id="transferType" required>
                    <option value="money">أموال</option>
                    <option value="food">طعام</option>
                    <option value="minerals">معادن</option>
                    <option value="weapons">أسلحة</option>
                </select>
            </div>
            <div id="transferAmountSection" class="form-group">
                <label class="form-label">المبلغ</label>
                <input type="number" class="form-input" id="transferAmount" placeholder="أدخل المبلغ" min="1" required>
                <p class="text-sm text-gray-400 mt-1">رصيدك الحالي: ${formatNumber(currentUser.balance)}</p>
            </div>
            <div id="transferMineralSection" class="form-group" style="display: none;">
                <label class="form-label">نوع المعدن</label>
                <select class="form-select" id="transferMineral">
                    <option value="iron">حديد (${currentUser.minerals.iron})</option>
                    <option value="gold">ذهب (${currentUser.minerals.gold})</option>
                    <option value="silver">فضة (${currentUser.minerals.silver})</option>
                    <option value="uranium">يورانيوم (${currentUser.minerals.uranium})</option>
                    <option value="diamond">ماس (${currentUser.minerals.diamond})</option>
                    <option value="coal">فحم (${currentUser.minerals.coal})</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">سبب التحويل</label>
                <textarea class="form-input" id="transferReason" placeholder="أدخل سبب التحويل" rows="2"></textarea>
            </div>
            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                <p class="text-yellow-400 text-sm"><i class="fas fa-info-circle mr-2"></i>رسوم التحويل: 2%</p>
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
}

function getInvestmentModalContent() {
    const companiesWithInvestments = Object.values(users)
        .filter(u => u.companies && u.companies.length > 0)
        .map(u => u.companies.map(c => ({ ...c, owner: u.name })))
        .flat();
    
    return `
        <div class="modal-header">
            <h2 class="modal-title"><i class="fas fa-chart-line mr-2"></i>الاستثمارات</h2>
            <button class="close-modal">&times;</button>
        </div>
        <div class="tab-container">
            <button class="tab-button active" onclick="switchTab('investTab')">استثمار جديد</button>
            <button class="tab-button" onclick="switchTab('myInvestmentsTab')">استثماراتي</button>
        </div>
        
        <div id="investTab" class="tab-content active">
            <form onsubmit="handleInvestment(event)">
                <div class="form-group">
                    <label class="form-label">الشركة</label>
                    <select class="form-select" id="investmentCompany" required>
                        <option value="">اختر الشركة</option>
                        ${companiesWithInvestments.map((company, index) => 
                            `<option value="${index}">${company.name} - مالكها: ${company.owner}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">مبلغ الاستثمار</label>
                    <input type="number" class="form-input" id="investmentAmount" placeholder="أدخل المبلغ" min="1000" required>
                </div>
                <div class="form-group">
                    <label class="form-label">مدة الاستثمار</label>
                    <select class="form-select" id="investmentDuration" required>
                        <option value="30">شهر (عائد 8%)</option>
                        <option value="90">3 أشهر (عائد 25%)</option>
                        <option value="180">6 أشهر (عائد 55%)</option>
                        <option value="365">سنة (عائد 120%)</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary w-full">
                    <i class="fas fa-chart-line mr-2"></i>استثمر الآن
                </button>
            </form>
        </div>
        
        <div id="myInvestmentsTab" class="tab-content">
            <div id="investmentsList">
                ${currentUser.investments.length === 0 ? 
                    '<p class="text-gray-400 text-center py-4">لا توجد استثمارات حالية</p>' :
                    currentUser.investments.map(inv => `
                        <div class="card mb-3">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-bold text-lg">${inv.companyName}</h4>
                                    <p class="text-sm text-gray-400">مبلغ: ${formatNumber(inv.amount)} - عائد متوقع: ${formatNumber(inv.expectedReturn)}</p>
                                    <p class="text-xs text-gray-500">تاريخ الانتهاء: ${new Date(inv.endDate).toLocaleDateString('ar-EG')}</p>
                                </div>
                                <div class="text-right">
                                    ${inv.endDate <= Date.now() ? 
                                        `<button onclick="collectInvestmentReturn(${inv.id})" class="btn btn-success btn-sm">
                                            <i class="fas fa-coins mr-1"></i>استلام العائد
                                        </button>` :
                                        `<div class="text-yellow-400 font-bold">
                                            <i class="fas fa-clock mr-1"></i>قيد الانتظار
                                        </div>`
                                    }
                                </div>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        </div>
    `;
}

function getMiningModalContent() {
    const canMine = !currentUser.lastMiningTime || (Date.now() - currentUser.lastMiningTime) >= globalSettings.miningCooldown;
    const timeLeft = canMine ? 0 : globalSettings.miningCooldown - (Date.now() - currentUser.lastMiningTime);
    
    return `
        <div class="modal-header">
            <h2 class="modal-title"><i class="fas fa-pickaxe mr-2"></i>التعدين</h2>
            <button class="close-modal">&times;</button>
        </div>
        <div class="mb-6">
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                <h3 class="text-blue-400 font-bold mb-2">مخزون المعادن الحالي</h3>
                <div class="grid grid-cols-3 gap-2 text-sm">
                    <span>حديد: ${currentUser.minerals.iron}</span>
                    <span>ذهب: ${currentUser.minerals.gold}</span>
                    <span>فضة: ${currentUser.minerals.silver}</span>
                    <span>يورانيوم: ${currentUser.minerals.uranium}</span>
                    <span>ماس: ${currentUser.minerals.diamond}</span>
                    <span>فحم: ${currentUser.minerals.coal}</span>
                </div>
            </div>
