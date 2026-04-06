/**
 * Fungsi untuk simulasi harga layanan pertemanan pada struk
 */
const generateRandomPrices = (count) => {
    let total = 0;
    const prices = Array.from({ length: count }, () => {
        // Harga random antara 100rb - 300rb
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
        textCount: "101193",
        topKeyword: "ayo nongs",
        cafeCount: "23",
        rideToAntang: "80",
        yearningMinutes: "22896",
        hours: "6819" // Disinkronkan dengan narasi slide 10
    },
    playlist: [
        "Meet Up", 
        "Texting", 
        "Nemenin Zoom", 
        "+1 Ngafe", 
        "Online Advice", 
        "Offline Consult", 
        "Nugas", 
        "Gossip", 
        "Lunch/Brunch/Dinner", 
        "Emotional Support"
    ],
    
    // TEMA BACKGROUND PER SLIDE (1-13)
    // Menggunakan gradasi linear yang kontras tinggi
    themes: {
        1: "linear-gradient(180deg, #ffffff 0%, #da9494 100%)",   // Candle/Cake
        2: "linear-gradient(180deg, #00d2ff 0%, #3a47d5 100%)",   // Text Count
        3: "linear-gradient(180deg, #7034d1 0%, #000000 100%)",   // Keyword
        4: "linear-gradient(180deg, #1e40af 0%, #0f172a 100%)",   // Makassar Map
        5: "#b4004eff",   // Teaser
        6: "#b4004eff",   // Top 1 Loc
        7: "linear-gradient(180deg, #d0ff00ff 0%, #000000 100%)",   // Top 5 List
        8: "#D8AD1F",                                             
        9: "#D8AD1F",                                             
        10: "linear-gradient(180deg, #000000 0%, #ff0000 100%)",  // Hours/Birthday
        11: "linear-gradient(180deg, #333333 0%, #3a3333ff 100%)",  // Receipt
        12: "#330867",  // VN Message
        13: "linear-gradient(180deg, #ffffff 0%, #da9494 100%)"   // Candle/Cake
    },

    // Getter untuk mendapatkan data struk secara dinamis
    get receipt() {
        return generateRandomPrices(this.playlist.length);
    },

    // Pesan prank yang muncul saat hujan iklan di akhir
    prankMessages: [
        "AKTIFKAN ANTIVIRUS SEKARANG!", 
        "SELAMAT! TINGGI BADAN ANDA BERTAMBAH 0.0001 CM", 
        "ALERT!! VIRUS MEMORI PENUH MENYERANG!", 
        "DOWNLOAD BLOCK BLAST SEKARANG!!", 
        "404 ERROR: AKSES DITOLAK KARENA FAKTOR U", 
        "ZEUS HOKI HANYA DI LCVPGACOR55", 
        "DISKON 50% UNTUK PRODUK ANTI-AGING!!"
    ]
};