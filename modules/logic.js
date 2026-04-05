export async function startCandelLogic(onBlown) {
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

            if (average > 50) { // Threshold suara tiupan
                onBlown(); // Panggil fungsi lanjut ke prank
                stream.getTracks().forEach(track => track.stop()); // Matikan mic
            } else {
                requestAnimationFrame(checkBlow);
            }
        }
        checkBlow();
    } catch (err) {
        console.error("Mic access denied", err);
        // Fallback: klik lilin jika mic ditolak
        document.getElementById('candle').onclick = onBlown;
    }
}