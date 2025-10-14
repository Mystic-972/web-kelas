    function updateWaktu() {
      const hariList = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const now = new Date();
      const hari = hariList[now.getDay()];
      const jam = now.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      document.getElementById("waktu-sekarang").innerText = `📆 ${hari}, ${jam}`;
    }
    setInterval(updateWaktu, 1000);
    updateWaktu();

    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
      body.classList.add(currentTheme);
    } else {
      body.classList.add('dark-mode');
    }
    toggle.textContent = body.classList.contains('light-mode') ? '☀️' : '🌙';

    toggle.addEventListener('click', () => {
      body.style.opacity = '0.5';
      setTimeout(() => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
          body.classList.remove('dark-mode');
        } else {
          body.classList.add('dark-mode');
        }
        const theme = body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
        localStorage.setItem('theme', theme);
        toggle.textContent = body.classList.contains('light-mode') ? '☀️' : '🌙';
        body.style.opacity = '1';
      }, 150);
    });

    // Scroll Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('fade-in');
      observer.observe(section);
    });

    document.querySelectorAll('.wali-content, .statistik-container, .galeri-container').forEach(el => {
      el.classList.add('slide-in-left');
      observer.observe(el);
    });

    // --- LOGIN SISTEM ---
    const loginPage = document.getElementById("login-page");
    const loginBtn = document.getElementById("login-btn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginError = document.getElementById("login-error");
    const logoutBtn = document.getElementById("logout-btn");

    // Cek status login
    function checkLogin() {
      if (localStorage.getItem("isLoggedIn") === "true") {
        loginPage.style.display = "none";
        logoutBtn.style.display = "inline-block";
      } else {
        loginPage.style.display = "flex";
        logoutBtn.style.display = "none";
      }
    }
    // Login
    loginBtn.addEventListener("click", () => {
      const user = usernameInput.value.trim().toLowerCase();
      const pass = passwordInput.value.trim();

      // Show loading animation
      loginBtn.innerHTML = '<div class="loading"></div>Memproses...';
      loginBtn.disabled = true;

      setTimeout(() => {
        if ((user === "admin" && pass === "12345") || (user === "mahasiswa" && pass === "56789")) {
          // Add fade-out animation
          loginPage.style.opacity = '0';
          setTimeout(() => {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userType", user === "admin" ? "admin" : "student");
            loginPage.style.display = "none";
            logoutBtn.style.display = "inline-block";
            displayAnnouncements();
            alert("Login berhasil ✅");
            loginPage.style.opacity = '1'; // Reset for next time
          }, 500);
        } else {
          loginError.textContent = "Username atau password salah!";
          loginBtn.innerHTML = 'Masuk';
          loginBtn.disabled = false;
        }
      }, 2000); // Simulate loading time
    });

    // Logout
    function logoutAdmin() {
      // Fade out main content
      document.body.style.opacity = '0';
      setTimeout(() => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userType");
        // Show login page with fade in
        loginPage.style.display = "flex";
        loginPage.style.opacity = "0";
        setTimeout(() => {
          loginPage.style.opacity = "1";
          document.body.style.opacity = '1'; // Reset body opacity
          alert("Berhasil logout!");
          location.reload();
        }, 100);
      }, 500);
    }

    // --- PENGUMUMAN MANAGEMENT ---
    
    if (localStorage.getItem("isAdmin") === "true") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", "admin");
      localStorage.removeItem("isAdmin");
    }
    if (localStorage.getItem("isLoggedIn") === "true" && !localStorage.getItem("userType")) {
      localStorage.setItem("userType", "student");
    }

    let announcements = JSON.parse(localStorage.getItem("announcements")) || [
      "Besok ada kuis Algoritma — jangan lupa belajar ya!",
      "Tugas Bahasa Inggris dikumpulkan paling lambat hari Jumat.",
      "Tugas Matematika jangan di kerjakan minggu depan di bahas"
    ];

    function displayAnnouncements() {
      const list = document.getElementById("pengumuman-list");
      list.innerHTML = "";
      announcements.forEach((ann, index) => {
        const item = document.createElement("div");
        item.className = "pengumuman-item";
        item.innerHTML = `<p>${ann}</p><button class="delete-btn" data-index="${index}" style="display:none;" title="Hapus Pengumuman">🗑️</button>`;
        list.appendChild(item);
      });
      if (localStorage.getItem("userType") === "admin") {
        document.getElementById("admin-controls").style.display = "block";
        document.querySelectorAll(".delete-btn").forEach(btn => btn.style.display = "inline-block");
      }
    }

    // Call displayAnnouncements in checkLogin
    checkLogin();
    displayAnnouncements();

    // Add pengumuman
    document.getElementById("add-pengumuman").addEventListener("click", () => {
      const newAnn = prompt("Masukkan pengumuman baru:");
      if (newAnn && newAnn.trim()) {
        announcements.push(newAnn.trim());
        localStorage.setItem("announcements", JSON.stringify(announcements));
        displayAnnouncements();
      }
    });

    // Delete pengumumman
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const index = parseInt(e.target.dataset.index);
        announcements.splice(index, 1);
        localStorage.setItem("announcements", JSON.stringify(announcements));
        displayAnnouncements();
      }
    });

