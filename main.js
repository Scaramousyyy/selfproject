import { WRAPPED_DATA } from './modules/config.js';
import { renderSlide } from './modules/ui.js';
import { initMicSensor, triggerSpam } from './modules/logic.j';

let currentSlide = 1;
const totalSlides = 10;
let autoSlideTimer;

/**
 * Fungsi Navigasi Slide
 */
export function goToNextSlide() {
    clearTimeout(autoSlideTimer); // Hentikan timer jika user klik manual
    
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateView();
    }
}

/**
 * Update Tampilan & Logic Per Slide
 */
function updateView() {
    renderSlide(currentSlide, WRAPPED_DATA);
    
    // Slide 1: Auto-next setelah 1 menit jika tidak diklik
    if (currentSlide === 1) {
        autoSlideTimer = setTimeout(goToNextSlide, 60000);
        
        // Memulai musik saat interaksi pertama (opsional)
        document.addEventListener('click', () => {
            const music = document.getElementById('bg-music');
            if(music) music.play().catch(() => {}); 
        }, { once: true });
    }
    
    // Slide 10: Inisialisasi Sensor Tiup Lilin
    if (currentSlide === 10) {
        // Beri delay sedikit agar Chika sempat baca teksnya
        setTimeout(() => {
            initMicSensor(() => {
                showBurnWarning();
            });
        }, 1500);
    }
}

/**
 * Prank Logic setelah Lilin Padam
 */
function showBurnWarning() {
    // Sembunyikan lilin yang sudah mati (opsional: manipulasi DOM langsung)
    const flame = document.getElementById('flame');
    if (flame) flame.style.display = 'none';

    // Munculkan notif sistem
    setTimeout(() => {
        if (confirm(`${WRAPPED_DATA.targetName}, lilinnya padam! Sistem mendeteksi file 'Future_Success.exe' perlu di-unzip. Izinkan?`)) {
            // Aktifkan hujan confetti
            confetti({ 
                particleCount: 200, 
                spread: 100, 
                origin: { y: 0.3 },
                colors: ['#feaebb', '#ffffff', '#d88a9a']
            });

            // Jalankan spam pop-up
            triggerSpam(WRAPPED_DATA.prankMessages);
        }
    }, 500);
}

// Ekspos fungsi ke window agar bisa dipanggil lewat onclick di HTML string (ui.js)
window.next = goToNextSlide;

// Jalankan aplikasi pertama kali
document.addEventListener('DOMContentLoaded', updateView);