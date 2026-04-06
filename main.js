import { WRAPPED_DATA } from './modules/config.js';
import { renderSlide } from './modules/ui.js';
import { initMicSensor, triggerSpam } from './modules/logic.js';

let currentSlide = 1;
let autoNextTimer = null; // Penampung timer otomatis
const totalSlides = 13; 

// Fungsi navigasi global agar bisa dipanggil dari UI (tombol)
window.next = () => {
    // CRITICAL: Bersihkan timer otomatis jika ada, agar tidak bentrok saat user klik manual
    if (autoNextTimer) {
        clearTimeout(autoNextTimer);
        autoNextTimer = null;
    }
    // Bersihkan juga timer welcome jika user klik "Start" duluan
    if (window.welcomeTimer) {
        clearTimeout(window.welcomeTimer);
    }

    if (currentSlide < totalSlides) {
        currentSlide++;
        updateView();
    }
};

function updateView() {
    // 1. Render konten slide ke elemen #app
    renderSlide(currentSlide, WRAPPED_DATA);
    
    // 2. Simpan state global untuk sinkronisasi animasi di ui.js
    window.currentSlideNum = currentSlide;

    // --- LOGIKA AUTO-NEXT (Slide 2 sampai 10) ---
    if (currentSlide >= 2 && currentSlide <= 10) {
        let duration = 8000; // Standar 7.5 detik agar narasi terbaca

        // Penyesuaian durasi berdasarkan konten slide
        if (currentSlide === 3) {
            duration = 10000; // Lebih lama untuk menikmati keyword yang muncul
        } else if (currentSlide === 7) {
            duration = 12000; // Paling lama karena bar chart tumbuh satu per satu
        } else if (currentSlide === 9) {
            duration = 12000; // Cukup lama untuk melihat grid angka 22.896
        } else if (currentSlide === 10) {
            duration = 12000; // Lebih lama untuk narasi jam dan birthday
        }
        autoNextTimer = setTimeout(() => {
            window.next();
        }, duration);
    }

    // --- LOGIKA SPESIFIK PER SLIDE LAINNYA ---

    // Slide 1 (Welcome): Auto-next setelah narasi selesai (approx 10 detik)
    if (currentSlide === 1) {
        window.welcomeTimer = setTimeout(() => {
            if (currentSlide === 1) window.next();
        }, 10000);
    }

    // Slide Terakhir (13): Inisialisasi Sensor Tiup Lilin
    if (currentSlide === 13) {
        setTimeout(() => {
            if (typeof initMicSensor === 'function') {
                initMicSensor(handleBlowCandle);
            }
        }, 2000);
    }
}

// Handler saat lilin ditiup
function handleBlowCandle() {
    const flame = document.getElementById('flame');
    if (flame) {
        flame.style.opacity = '0';
        flame.style.transition = 'opacity 0.6s ease';
        setTimeout(() => flame.remove(), 600);
    }

    // Selebrasi Confetti
    if (window.confetti) {
        window.confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff007f', '#00ff00', '#ffff00', '#00ffff']
        });
    }

    // Trigger Prank Iklan (Hanya di akhir setelah tiup lilin)
    setTimeout(() => {
        if (currentSlide === 13) {
            triggerSpam(WRAPPED_DATA.prankMessages);
        }
    }, 2000);
}

// Bootstrapping aplikasi
document.addEventListener('DOMContentLoaded', () => {
    updateView();
});