export function renderSlide(num, data) {
    const container = document.getElementById('app');
    let content = "";

    switch(num) {
        case 1:
            content = `
                <div class="text-center animate-fade-in p-6">
                    <h1 class="text-4xl font-extrabold mb-4">It's one year wrapped</h1>
                    <p class="text-gray-400 mb-8">Let's see how much u grow in this past year</p>
                    <button onclick="next()" class="px-8 py-3 bg-green-500 rounded-full font-bold">START →</button>
                </div>`;
            break;
        case 2: case 3: case 4: case 5:
            const q = data.quarters[num-2];
            content = `<div class="p-8 text-center">
                <h2 class="text-2xl font-mono text-purple-400 mb-4">${q.title}</h2>
                <p class="text-xl">${q.desc}</p>
                <button onclick="next()" class="mt-10 opacity-50">Ketuk untuk lanjut</button>
            </div>`;
            break;
        case 6: // Statistik
            content = `<div class="p-6 w-full">
                <h2 class="text-2xl font-bold mb-6 text-center">Your Stats 📊</h2>
                <div class="grid grid-cols-2 gap-4">
                    ${data.stats.map(s => `<div class="bg-white/10 p-4 rounded-xl"><p class="text-xs text-gray-400">${s.label}</p><p class="text-lg font-bold">${s.value}</p></div>`).join('')}
                </div>
                <button onclick="next()" class="w-full mt-8 py-3 border border-white/20 rounded-lg">Next Memory</button>
            </div>`;
            break;
        case 10: // Virtual Cake
            content = `<div class="text-center">
                <div id="candle" class="text-6xl mb-4 animate-pulse">🎂</div>
                <h2 class="text-xl font-bold">Tiup lilinnya di mic HP kamu!</h2>
                <p class="text-sm text-gray-500 mt-2">(Atau klik kuenya jika mic tidak aktif)</p>
            </div>`;
            break;
        // Tambahkan case slide lainnya sesuai konsepmu (Carousel, Receipt, VN)
    }

    container.innerHTML = content;
}