/**
 * Inisialisasi deteksi suara (tiupan) untuk lilin
 * @param {Function} onBlown - Callback saat lilin berhasil ditiup
 */
export async function initMicSensor(onBlown) {
    try {
        // 1. Request akses microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
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

            // Threshold ditingkatkan sedikit agar tidak terpicu suara sekitar yang pelan
            if (average > 65) { 
                isBlown = true;
                onBlown();
                
                // Cleanup: Matikan stream agar icon mic di browser hilang
                stream.getTracks().forEach(track => track.stop());
                audioContext.close();
            } else {
                requestAnimationFrame(checkBlow);
            }
        }
        checkBlow();

    } catch (err) {
        console.warn("Mic blocked/not supported. Fallback to click enabled.");
        // Fallback: Klik manual pada lilin jika mic ditolak
        const candleElement = document.getElementById('candle');
        if (candleElement) {
            candleElement.style.opacity = "1"; // Pastikan area klik terlihat/aktif
            candleElement.onclick = () => {
                onBlown();
                candleElement.onclick = null;
            };
        }
    }
}

export function triggerSpam(messages) {
    const container = document.getElementById('prank-container');
    if (!container) return;
    container.style.pointerEvents = 'auto';

    // Munculkan 50 notifikasi secara bertahap
    const totalSpam = 50; 
    
    for (let i = 0; i < totalSpam; i++) {
        setTimeout(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const popup = document.createElement('div');
            
            // Posisi acak di seluruh layar HP
            const top = Math.random() * 85; 
            const left = Math.random() * 10; 
            
            popup.className = 'fixed notification-popup animate-bounce-in';
            popup.style.top = top + '%';
            popup.style.left = left + '%';
            popup.style.zIndex = 100 + i; // Bertumpuk ke atas
            
            popup.innerHTML = `
                <div class="flex justify-between items-center w-full">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Alert</span>
                    <span class="text-[10px] text-gray-400">now</span>
                </div>
                <p class="text-[13px] font-bold text-gray-900 leading-tight">${msg}</p>
                <p class="text-[11px] text-gray-500">Tap to view details or ignore.</p>
            `;
            
            container.appendChild(popup);
        }, i * 100); // Muncul setiap 0.1 detik
    }
}