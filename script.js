// البيانات الوهمية
let balance = 10000;
let notifications = [
  {
    id: 1,
    message: "مرحباً بك في NeoAccount!",
    icon: "fas fa-info-circle",
    date: new Date().toLocaleString("ar-SA"),
  },
  {
    id: 2,
    message: "تم إيداع راتبك بقيمة 5000 ر.س",
    icon: "fas fa-money-bill-wave",
    date: new Date(Date.now() - 86400000).toLocaleString("ar-SA"),
  },
];

let transactions = [
  {
    id: 1,
    description: "إيداع راتب",
    amount: 5000,
    date: new Date(Date.now() - 86400000).toLocaleString("ar-SA"),
    type: "deposit",
  },
  {
    id: 2,
    description: "شراء من المتجر",
    amount: -250,
    date: new Date(Date.now() - 172800000).toLocaleString("ar-SA"),
    type: "withdrawal",
  },
];

// تحديث عرض الرصيد
function updateBalanceDisplay() {
  const balanceElement = document.getElementById("current-balance");
  if (balanceElement) {
    balanceElement.textContent = balance.toLocaleString("ar-SA") + " ر.س";
  }
}

// خصم من الرصيد
function deductFromBalance(amount) {
  if (balance >= amount) {
    balance -= amount;
    updateBalanceDisplay();
    return true;
  }
  return false;
}

// إضافة تنبيه جديد
function addNotification(message, type = "info") {
  const icons = {
    info: "fas fa-info-circle",
    gas: "fas fa-fire",
    electricity: "fas fa-bolt",
    internet: "fas fa-wifi",
    transfer: "fas fa-exchange-alt",
    save: "fas fa-piggy-bank",
    withdrawal: "fas fa-money-bill-wave",
  };

  const newNotification = {
    id: notifications.length + 1,
    message: message,
    icon: icons[type] || icons["info"],
    date: new Date().toLocaleString("ar-SA"),
  };

  notifications.unshift(newNotification);
  return newNotification;
}

// عرض التنبيهات في الصفحة الرئيسية
function displayNotifications() {
  const container = document.getElementById("notifications-list");
  if (!container) return;

  container.innerHTML = "";

  const recentNotifications = notifications.slice(0, 3);

  recentNotifications.forEach((notification) => {
    const notificationElement = document.createElement("div");
    notificationElement.className = "notification-item fade-in";
    notificationElement.innerHTML = `
            <i class="${notification.icon} notification-icon"></i>
            <div class="notification-content">
                <p>${notification.message}</p>
                <small class="notification-date">${notification.date}</small>
            </div>
        `;
    container.appendChild(notificationElement);
  });
}

// عرض جميع التنبيهات
function displayAllNotifications() {
  const container = document.getElementById("all-notifications-list");
  if (!container) return;

  container.innerHTML = "";

  notifications.forEach((notification) => {
    const notificationElement = document.createElement("div");
    notificationElement.className = "notification-item fade-in";
    notificationElement.innerHTML = `
            <i class="${notification.icon} notification-icon"></i>
            <div class="notification-content">
                <p>${notification.message}</p>
                <small class="notification-date">${notification.date}</small>
            </div>
        `;
    container.appendChild(notificationElement);
  });
}

// عرض سجل العمليات
function displayTransactions() {
  const container = document.getElementById("transactions-list");
  if (!container) return;

  container.innerHTML = "";

  transactions.forEach((transaction) => {
    const transactionElement = document.createElement("div");
    transactionElement.className = "transaction-item fade-in";

    const amountClass = transaction.amount > 0 ? "text-success" : "text-error";

    transactionElement.innerHTML = `
            <div class="transaction-details">
                <p>${transaction.description}</p>
                <small class="transaction-date">${transaction.date}</small>
            </div>
            <div class="transaction-amount ${amountClass}">
                ${
                  transaction.amount > 0 ? "+" : ""
                }${transaction.amount.toLocaleString("ar-SA")} ر.س
            </div>
        `;
    container.appendChild(transactionElement);
  });
}

// إضافة معاملة جديدة
function addTransaction(description, amount, type) {
  const newTransaction = {
    id: transactions.length + 1,
    description: description,
    amount: amount,
    date: new Date().toLocaleString("ar-SA"),
    type: type,
  };

  transactions.unshift(newTransaction);
  return newTransaction;
}

// عرض رسالة نجاح
function showSuccessToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "left",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true,
  }).showToast();
}

// عرض رسالة خطأ
function showErrorToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "left",
    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    stopOnFocus: true,
  }).showToast();
}

// إعداد تبديل الوضع (فاتح/غامق)
function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  // التحقق من التفضيل المحفوظ
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (savedTheme === "dark") {
    themeToggle.checked = true;
  }

  // تحديث النص في صفحة الحساب
  const modeStatus = document.getElementById("mode-status");
  if (modeStatus) {
    modeStatus.textContent = savedTheme === "dark" ? "تلقائي" : "يدوي";
  }

  // إضافة مستمع للأحداث
  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      if (modeStatus) modeStatus.textContent = "تلقائي";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      if (modeStatus) modeStatus.textContent = "يدوي";
    }
  });
}

// تهيئة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  updateBalanceDisplay();
  setupThemeToggle();
});
// تشغيل افتراضي لوضع "يدوي" عند أول زيارة
document.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("neo_mode") || "manual";
  const notifContainer = document.getElementById("notifications-container");
  const manualBtn = document.getElementById("manual-btn");
  const autoBtn = document.getElementById("auto-btn");

  if (savedMode === "auto") {
    autoBtn.classList.add("active");
    manualBtn.classList.remove("active");
    notifContainer.style.display = "none";
  } else {
    manualBtn.classList.add("active");
    autoBtn.classList.remove("active");
    notifContainer.style.display = "block";
  }

  manualBtn.addEventListener("click", () => {
    localStorage.setItem("neo_mode", "manual");
    manualBtn.classList.add("active");
    autoBtn.classList.remove("active");
    notifContainer.style.display = "block";
  });

  autoBtn.addEventListener("click", () => {
    localStorage.setItem("neo_mode", "auto");
    autoBtn.classList.add("active");
    manualBtn.classList.remove("active");
    notifContainer.style.display = "none";
  });
});
