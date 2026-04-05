import { WRAPPED_DATA } from './config.js';

export async function initMicSensor(onBlown) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const analyzer = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyzer);

        const dataArray = new Uint8Array(analyzer.frequencyBinCount);
        
        function checkBlow() {
            analyzer.getByteFrequencyData(dataArray);
            let sum = dataArray.reduce((a, b) => a + b, 0);
            let average = sum / dataArray.length;

            // Jika rata-rata volume > 50 (ambang batas tiupan)
            if (average > 50) { 
                onBlown();
                stream.getTracks().forEach(track => track.stop()); // Matikan Mic
            } else {
                requestAnimationFrame(checkBlow);
            }
        }
        checkBlow();
    } catch (err) {
        console.warn("Mic blocked, using click fallback");
        // Fallback jika user tolak izin Mic
        document.getElementById('candle').onclick = onBlown;
    }
}

export function triggerSpam(messages) {
    const container = document.getElementById('prank-container');
    container.classList.remove('pointer-events-none'); // Aktifkan klik agar bisa ditutup
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const popup = document.createElement('div');
            popup.className = 'popup-window fixed p-0 z-50 animate-bounce';
            popup.style.top = Math.random() * 70 + '%';
            popup.style.left = Math.random() * 70 + '%';
            
            popup.innerHTML = `
                <div class="popup-header">
                    <span>System Error!</span>
                    <button class="close-btn" onclick="this.parentElement.parentElement.remove()">X</button>
                </div>
                <div class="p-4 text-black text-sm font-bold bg-gray-200">
                    ${msg}
                </div>
            `;
            container.appendChild(popup);
        }, i * 150);
    }
}