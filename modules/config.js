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
    get receipt() {
        return generateRandomPrices(this.playlist.length);
    },
    prankMessages: [
        "AKTIFKAN ANTIVIRUS SEKARANG", "SELAMAT ANDA BARU SAJA MENDAPATKAN 0.0001 CM TAMBAHAN TINGGI BADAN", "ALERT!! VIRUS MEMORI FULL MENYERANG DEVICEMU", 
        "DOWNLOAD BLOCK BLAST SEKARANG!!", "404 ERROR: ACCESS DENIED DUE TO OLD AGE", "ZEUS HOKI HANYA DI LCVPGACOR55", 
        "SELAMAT! ANDA MENDAPATKAN DISKON 50% UNTUK PRODUK ANTI-BLOCKING!!"
    ]
};