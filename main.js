import { WRAPPED_DATA } from './modules/config.js';
import { renderSlide } from './modules/ui.js';
import { initMicSensor, triggerSpam } from './modules/logic.js';

let currentSlide = 1;
const totalSlides = 10;
let autoSlideTimer;

export function goToNextSlide() {
    clearTimeout(autoSlideTimer);
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateView();
    }
}

function updateView() {
    renderSlide(currentSlide, WRAPPED_DATA);
    
    // Slide 1: Auto-next dalam 1 menit
    if (currentSlide === 1) {
        autoSlideTimer = setTimeout(goToNextSlide, 60000);
    }
    
    // Slide 10: Aktifkan sensor tiup lilin
    if (currentSlide === 10) {
        initMicSensor(() => {
            showBurnWarning();
        });
    }
}

function showBurnWarning() {
    if (confirm("Lilin padam! Sistem mendeteksi 'Old_File'. Burn friendship.exe to continue?")) {
        triggerSpam(WRAPPED_DATA.prankMessages);
    }
}

// Start Project
updateView();
window.next = goToNextSlide; // Ekspos ke global untuk onclick