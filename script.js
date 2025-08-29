// حفظ بيانات المستخدم في localStorage
let user = JSON.parse(localStorage.getItem("user")) || {
  name: "غير مسجل",
  age: 0,
  birth: "غير معروف",
  money: 1000,
  resources: 0,
  company: null
};

function save() {
  localStorage.setItem("user", JSON.stringify(user));
  renderProfile();
  renderInvest();
  renderState();
}

function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function register() {
  let name = prompt("أدخل اسمك:", user.name);
  let age = prompt("أدخل عمرك:", user.age);
  let birth = prompt("أدخل مكان ولادتك:", user.birth);
  user.name = name;
  user.age = age;
  user.birth = birth;
  save();
}

function mine() {
  user.resources += 10;
  user.money += 50;
  alert("قمت بالتعدين وحصلت على 10 موارد و 50$!");
  save();
}

function invest() {
  user.money += 200;
  alert("استثمار ناجح! حصلت على 200$ 🎉");
  save();
}

function renderProfile() {
  document.getElementById("profileData").innerHTML = `
    <p>👤 الاسم: ${user.name}</p>
    <p>🎂 العمر: ${user.age}</p>
    <p>📍 مكان الولادة: ${user.birth}</p>
    <p>💵 الرصيد: ${user.money}$</p>
    <p>⛏️ الموارد: ${user.resources}</p>
  `;
}

function renderInvest() {
  document.getElementById("investData").innerHTML = `
    <p>💵 رصيدك: ${user.money}$</p>
    <p>⛏️ مواردك: ${user.resources}</p>
  `;
}

function renderState() {
  document.getElementById("stateData").innerHTML = `
    <p>🚩 الدولة مستقرة ✅</p>
    <p>عدد اللاعبين: 1 (تجريبي)</p>
  `;
}

save();
