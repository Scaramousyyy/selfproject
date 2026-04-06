import { WRAPPED_DATA } from './modules/config.js';
import { renderSlide } from './modules/ui.js';
import { initMicSensor, triggerSpam } from './modules/logic.js';

let currentSlide = 1;
const totalSlides = 13; 

// Fungsi navigasi global agar bisa dipanggil dari UI (tombol)
window.next = () => {
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

    // --- LOGIKA SPESIFIK PER SLIDE ---

    // Slide 1 (Welcome): Auto-next setelah narasi selesai (approx 10 detik)
    if (currentSlide === 1) {
        const welcomeTimer = setTimeout(() => {
            if (currentSlide === 1) window.next();
        }, 10000);
        // Simpan timer agar bisa di-clear jika user klik duluan
        window.welcomeTimer = welcomeTimer;
    }

    // Slide Terakhir (13): Inisialisasi Sensor Tiup Lilin
    if (currentSlide === 13) {
        // Beri jeda agar Chika sempat melihat lilin sebelum mulai meniup
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