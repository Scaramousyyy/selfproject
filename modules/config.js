const generateRandomPrices = (count) => {
    let total = 0;
    const prices = Array.from({ length: count }, () => {
        const price = Math.floor(Math.random() * (300000 - 100000 + 1)) + 100000;
        total += price;
        return price;
    });
    return { list: prices, subtotal: total };
};

export const WRAPPED_DATA = {
    targetName: "Chika",
    age: "20",
    stats: {
        textCount: "101.193+",
        topKeyword: "ayo nongs",
        cafeCount: "30+",
        rideToAntang: "80+",
        karaokeCount: "5698++",
        hours: "8000+"
    },
    playlist: [
        "Meet Up", "Texting", "Nemenin Zoom", "+1 Ngafe", 
        "Online Advice", "Offline Consult", "Nugas", "Gossip", 
        "Lunch/Brunch/Dinner", "Emotional Support"
    ],
    // TEMA BACKGROUND NYENTRIK PER SLIDE
    themes: {
        1: "radial-gradient(#ffffff 10%, transparent 10%), radial-gradient(#ffffff 10%, transparent 10%)", // Polkadot
        2: "linear-gradient(45deg, #feaebb 25%, #ff71ba 25%, #ff71ba 50%, #feaebb 50%, #feaebb 75%, #ff71ba 75%, #ff71ba 100%)", // Stripes
        3: "repeating-linear-gradient(0deg, transparent, transparent 20px, #ffffff 20px, #ffffff 40px)", // Horizontal
        4: "linear-gradient(90deg, #60a5fa 1px, transparent 1px), linear-gradient(0deg, #60a5fa 1px, transparent 1px)", // Blue Grid (Antang)
        5: "conic-gradient(from 0deg at 50% 50%, #feaebb 0deg 90deg, #ff71ba 90deg 180deg, #feaebb 180deg 270deg, #ff71ba 270deg 360deg)", // Checkboard
        6: "radial-gradient(circle at center, #feaebb 0%, #ff71ba 100%)", // Aura
        7: "linear-gradient(135deg, #ffffff 25%, transparent 25%), linear-gradient(225deg, #ffffff 25%, transparent 25%)", // Zigzag
        8: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)", // Paper Grid
        9: "linear-gradient(to bottom right, #feaebb, #a78bfa)", // Gradient VN
        10: "white" // Fokus Lilin
    },
    get receipt() {
        return generateRandomPrices(this.playlist.length);
    },
    prankMessages: [
        "AKTIFKAN ANTIVIRUS SEKARANG", "SELAMAT ANDA BARU SAJA MENDAPATKAN 0.0001 CM TAMBAHAN TINGGI BADAN", 
        "ALERT!! VIRUS MEMORI FULL MENYERANG DEVICEMU", "DOWNLOAD BLOCK BLAST SEKARANG!!", 
        "404 ERROR: ACCESS DENIED DUE TO OLD AGE", "ZEUS HOKI HANYA DI LCVPGACOR55", 
        "SELAMAT! ANDA MENDAPATKAN DISKON 50% UNTUK PRODUK ANTI-BLOCKING!!"
    ]
};