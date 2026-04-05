function showBurnWarning() {
    // Custom alert bergaya sistem lama
    if (confirm("Chika, lilinnya padam! Sistem mendeteksi file 'Future_Success.exe' perlu di-unzip. Izinkan?")) {
        triggerSpam(WRAPPED_DATA.prankMessages);
        // Tambahkan confetti ekstra
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.3 } });
    }
}