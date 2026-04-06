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
    locations: [
        { name: "Kos Eza", color: "#98ffeb", width: "w-[85%]" },
        { name: "Coffee Shop", color: "#d2ff52", width: "w-[70%]" },
        { name: "Rumah Tama", color: "#3a12ff", width: "w-[55%]" },
        { name: "Nipah Mall", color: "#d9b30cff", width: "w-[40%]" },
        { name: "Unhas Tamlan", color: "#ae23dcff", width: "w-[25%]" }
    ],
    playlist: [
        "Meet Up", "Texting", "Nemenin Zoom", "+1 Ngafe", 
        "Online Advice", "Offline Consult", "Nugas", "Gossip", 
        "Lunch/Brunch/Dinner", "Emotional Support"
    ],
    // TEMA BACKGROUND NYENTRIK PER SLIDE
    themes: {
        1: "linear-gradient(180deg, #ff007f 0%, #000000 100%)", // Deep Pink -> Hitam
        2: "linear-gradient(180deg, #00d2ff 0%, #3a47d5 100%)", // Blue Electric
        3: "linear-gradient(180deg, #6a11cb 0%, #2575fc 100%)", // Ungu -> Biru
        4: "linear-gradient(180deg, #0f172a 0%, #1e40af 100%)", // Antang Deep Blue
        5: "linear-gradient(180deg, #ff9a9e 0%, #fad0c4 100%)", // Soft Pink (Karaoke)
        6: "linear-gradient(180deg, #000000 0%, #ff0000 100%)", // Hitam -> Merah
        7: "linear-gradient(180deg, #a18cd1 0%, #fbc2eb 100%)", // Pastel Purple (Emosional)
        8: "linear-gradient(180deg, #333333 0%, #000000 100%)", // Dark Receipt
        9: "linear-gradient(180deg, #30cfd0 0%, #330867 100%)", // Turquoise -> Deep Purple
        10: "linear-gradient(180deg, #ffffff 0%, #da9494ff 100%)" // Putih Bersih
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