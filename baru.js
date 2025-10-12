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

    // Removed slide-in-right for consistency

