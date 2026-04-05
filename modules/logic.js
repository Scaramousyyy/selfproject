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
    container.style.pointerEvents = 'auto';

    // Jenis warna tombol iklan modern
    const btnColors = ['bg-green-500', 'bg-blue-600', 'bg-orange-500', 'bg-red-500'];

    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const randomBtn = btnColors[Math.floor(Math.random() * btnColors.length)];
            const popup = document.createElement('div');
            
            // Styling Pop-up Iklan Modern (Clickbait style)
            popup.className = 'fixed z-50 bg-white border-2 border-gray-300 shadow-2xl rounded-lg overflow-hidden animate-bounce';
            popup.style.width = '200px';
            popup.style.top = Math.random() * 70 + 5 + '%';
            popup.style.left = Math.random() * 60 + 10 + '%';
            
            popup.innerHTML = `
                <div class="bg-gray-100 px-2 py-1 flex justify-between items-center border-b border-gray-200">
                    <span class="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Sponsored Content</span>
                    <button class="close-popup-btn text-gray-400 hover:text-black font-bold text-xs">✕</button>
                </div>
                <div class="p-3 text-center">
                    <div class="bg-gray-200 w-full h-12 mb-2 flex items-center justify-center rounded uppercase font-black text-[10px] text-gray-400">
                        Image.png
                    </div>
                    <p class="text-[11px] leading-tight font-bold text-black mb-3">
                        ${msg}
                    </p>
                    <button class="${randomBtn} text-white text-[9px] font-black py-1 px-4 rounded-full uppercase tracking-widest shadow-md">
                        DOWNLOAD NOW
                    </button>
                    <p class="text-[7px] text-blue-500 mt-2 underline cursor-pointer">Unsubscribe here</p>
                </div>
            `;
            
            popup.querySelector('.close-popup-btn').addEventListener('click', () => {
                popup.remove();
            });

            container.appendChild(popup);
        }, i * 150);
    }
}