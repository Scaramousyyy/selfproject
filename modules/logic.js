import { WRAPPED_DATA } from './config.js';

export async function initMicSensor(onBlown) {
    try {
        // Minta izin mic dengan handling spesifik
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // AudioContext harus di-resume/start setelah interaksi user (ditangani di main.js)
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyzer = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        
        analyzer.fftSize = 256;
        microphone.connect(analyzer);

        const dataArray = new Uint8Array(analyzer.frequencyBinCount);
        let isBlown = false;

        function checkBlow() {
            if (isBlown) return;

            analyzer.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }
            let average = sum / dataArray.length;

            // Threshold 50 biasanya cukup sensitif untuk tiupan dekat mic
            if (average > 50) { 
                isBlown = true;
                onBlown();
                
                // Cleanup: Matikan mic agar icon recording di HP hilang
                stream.getTracks().forEach(track => track.stop());
                audioContext.close();
            } else {
                requestAnimationFrame(checkBlow);
            }
        }
        checkBlow();

    } catch (err) {
        console.warn("Mic blocked or not supported, using click fallback:", err);
        // Fallback: Pastikan elemen #candle ada sebelum pasang onclick
        const candleBtn = document.getElementById('candle');
        if (candleBtn) {
            candleBtn.onclick = () => {
                onBlown();
                candleBtn.onclick = null; // Cegah double click
            };
        }
    }
}

export function triggerSpam(messages) {
    const container = document.getElementById('prank-container');
    if (!container) return;

    container.classList.remove('pointer-events-none'); 
    container.style.pointerEvents = 'auto'; // Double check agar bisa diklik
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const popup = document.createElement('div');
            
            // Tambahkan inline style untuk memastikan z-index dan posisi
            popup.className = 'popup-window fixed p-0 z-50 animate-bounce';
            popup.style.top = Math.random() * 60 + 10 + '%'; // 10-70% agar tidak terlalu ke pinggir
            popup.style.left = Math.random() * 60 + 10 + '%';
            
            popup.innerHTML = `
                <div class="popup-header flex justify-between items-center bg-blue-800 text-white px-2 py-1 text-[10px]">
                    <span>System Error!</span>
                    <button class="bg-gray-300 text-black px-1 leading-none border border-white close-popup-btn">X</button>
                </div>
                <div class="p-4 text-black text-xs font-bold bg-[#c0c0c0] border-b-2 border-r-2 border-white shadow-inner">
                    ${msg}
                </div>
            `;
            
            // Gunakan event listener daripada inline onclick agar lebih bersih
            popup.querySelector('.close-popup-btn').addEventListener('click', () => {
                popup.remove();
            });

            container.appendChild(popup);
        }, i * 150);
    }
}