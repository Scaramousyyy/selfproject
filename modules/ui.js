// --- HELPER FUNCTIONS ---

function getContrastColor(theme) {
    if (!theme) return "text-white";
    const lowerTheme = theme.toLowerCase();
    // Deteksi jika background adalah Kuning (#D8AD1F) atau Putih
    if (lowerTheme.includes("#d8ad1f") || lowerTheme.includes("white") || lowerTheme.includes("#ffffff")) {
        return "text-black";
    }
    return "text-white";
}

function updateProgressBar(current, total) {
    const container = document.getElementById('story-progress');
    if (!container) return;
    container.innerHTML = ""; 
    for (let i = 1; i <= total; i++) {
        const bar = document.createElement('div');
        bar.className = `h-1 flex-1 rounded-full overflow-hidden ${i <= current ? 'bg-white' : 'bg-white/30'}`;
        container.appendChild(bar);
    }
}

function animateValue(id, start, end, duration = 4000) {
    const obj = document.getElementById(id);
    if (!obj) return;
    const target = parseInt(end.toString().replace(/[^0-9]/g, ''));
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (target - start) + start);
        obj.innerHTML = current.toLocaleString('id-ID');
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

const wrapRow = (text, rowDelay = 0.8, customClass = "") => {
    const words = text.split(" ");
    const wordSpans = words.map((word, index) => {
        const delay = rowDelay + (index * 0.15);
        return `<span class="word ${customClass}" style="animation-delay: ${delay}s">${word}</span>`;
    }).join("");
    return `<div class="text-row row-entrance" style="animation-delay: ${rowDelay}s">${wordSpans}</div>`;
};

// --- MAIN RENDER FUNCTION ---

export function renderSlide(num, data) {
    const container = document.getElementById('app');
    const body = document.body;
    let content = "";

    // 1. Reset Background & Theme Detection
    body.style.backgroundImage = ""; 
    body.style.backgroundColor = ""; 
    const theme = data.themes[num] || "";
    
    if (theme.includes("gradient")) {
        body.style.backgroundImage = theme;
    } else {
        body.style.backgroundColor = theme;
    }

    // 2. Tentukan warna teks adaptif (Hitam jika bg terang, Putih jika bg gelap)
    const baseTextColor = getContrastColor(theme);
    body.className = `overflow-hidden ${baseTextColor}`;

    updateProgressBar(num, 13);

    const wrapper = (inner) => `
        <div class="slide-entrance flex flex-col items-center justify-center w-full h-full px-10 text-center relative z-10">
            ${inner}
        </div>`;

    container.innerHTML = "";

    switch(num) {
        case 1:
            content = wrapper(`
                <h1 class="text-7xl font-bold text-[#ff007f] mb-8 tracking-tighter animate-pulse">HEY CHIKA</h1>
                ${wrapRow("A year just wrapped. Let's see what happened in the past year!!", 1.3, `font-bold text-2xl ${baseTextColor}`)}
                <button onclick="next()" class="btn-wrapped">START</button>
            `);
            break;

        case 2:
            content = wrapper(`
                ${wrapRow("We've been texting each other for", 0.8, `font-bold text-3xl ${baseTextColor}`)}
                <h2 id="text-anim" class="text-8xl font-black text-[#00ff00] text-nyentrik my-6" style="opacity:0">0</h2>
                ${wrapRow("times....", 5.5, `font-bold text-3xl ${baseTextColor}`)}
            `);
            break;

        case 3:
            content = wrapper(`
                ${wrapRow("And your top #1 Keyword is....", 0.8, `font-bold text-2xl ${baseTextColor}`)}
                <div class="mt-8">
                    ${wrapRow(`"${data.stats.topKeyword}"`, 2.5, "text-5xl font-black text-[#ffff00] italic uppercase tracking-tighter")}
                </div>
                <button onclick="next()" class="btn-wrapped">CONTINUE</button>
            `);
            break;

        case 4:
            content = wrapper(`
                ${wrapRow("You’re out every single day—whether you’re driving yourself, hitching a ride, or hopping on an ojol.", 0.8, `font-bold text-2xl ${baseTextColor}`)}
                <div class="mt-10">
                    ${wrapRow("You've mapped out 87.54% of Makassar!", 4.0, `font-thin-custom ${baseTextColor}`)}
                </div>
            `);
            break;

        case 5:
            content = wrapper(`
                ${wrapRow("But there’s one spot that just keeps calling you back again, again, and again...", 0.8, `font-bold text-2xl ${baseTextColor}`)}
            `);
            break;

        case 6: // Slide Kos Eza (Warna latar otomatis terdeteksi jika #b4004eff di config)
            content = wrapper(`
                ${wrapRow("The favorite spot on your maps is:", 0.8, `font-bold text-2xl ${baseTextColor}`)}
                <div class="mt-8">
                    ${wrapRow("Kos Eza", 2.2, "text-5xl font-black text-[#ffff00] italic uppercase tracking-tighter")}
                </div>
            `);
            break;

        case 7:
            const locations = [
                { name: "Kos Eza", color: "#98ffeb", width: "85%" },
                { name: "Coffee Shop", color: "#d2ff52", width: "70%" },
                { name: "Antang", color: "#3a12ff", width: "55%" },
                { name: "Unhas Tamlan", color: "#b623a2", width: "40%" },
                { name: "Pantai", color: "#2f9a38", width: "25%" }
            ];
            content = wrapper(`
                <div id="top5Container" class="w-full flex flex-col items-start text-left opacity-0 translate-y-10 transition-all duration-1000 ease-out mt-10">
                    <h2 class="text-2xl font-black uppercase mb-8 self-center text-center ${baseTextColor}">Your Top 5 Go-To Locations</h2>
                    <div class="flex flex-col gap-5 w-full px-2">
                        ${locations.map((loc, i) => {
                            const barDelay = 0.5 + (i * 1.5); 
                            const textDelay = barDelay + 1.2; 
                            return `
                            <div class="flex items-center w-full">
                                <div class="h-10 rounded-r-full shadow-lg mr-4" 
                                     style="background-color: ${loc.color}; width: ${loc.width}; 
                                            transform: scaleX(0); transform-origin: left; 
                                            transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${barDelay}s;" 
                                     id="bar-${i}">
                                </div>
                                <div id="text-loc-${i}" class="flex flex-col leading-tight opacity-0 transition-opacity duration-500" 
                                     style="transition-delay: ${textDelay}s;">
                                    <span class="${baseTextColor} font-bold text-[10px]">#${i+1}</span>
                                    <span class="${baseTextColor} font-black text-sm uppercase tracking-tight">${loc.name}</span>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            `);
            break;

        case 8:
            content = wrapper(`
                ${wrapRow("Has anyone told you lately that you're a top-tier listener?", 0.8, `font-bold text-3xl ${baseTextColor}`)}
                <div class="mt-10 text-xl leading-relaxed">
                    ${wrapRow("We catch up constantly, and you’ve officially endured 22,896 minutes of my 'yearning' about Kakak", 3.8, `font-bold text-xl ${baseTextColor}`)}
                </div>
            `);
            break;

        case 9:
            const rows = [
                { delay: 0.5, bgColor: "bg-[#ff8a00]", textColor: "text-black" },
                { delay: 1.2, bgColor: "bg-[#ff7eb9]", textColor: "text-black" },
                { delay: 1.9, bgColor: "bg-[#7034d1]", textColor: "text-[#ff007f]" },
                { delay: 2.6, bgColor: "bg-[#ff5a5a]", textColor: "text-black" }
            ];
            content = wrapper(`
                <div class="flex flex-col bg-white border-4 border-white mb-10 shadow-2xl w-full max-w-sm h-80 overflow-hidden relative">
                    ${rows.map((row) => `
                        <div class="w-full h-1/4 flex justify-start items-center overflow-hidden -ml-1 ${row.bgColor}">
                            ${wrapRow("22,896", row.delay, `text-[6.2rem] font-black ${row.textColor} tracking-tighter leading-[0.8] w-full text-left uppercase`)}
                        </div>
                    `).join('')}
                </div>
                ${wrapRow("Hearing me yap about the same person with this amount of time is crazy.", 3.8, `font-bold text-xl ${baseTextColor}`)}
                ${wrapRow("That is literally 15.9 days non-stop.", 5.2, `font-thin-custom italic ${baseTextColor}`)}
            `);
            break;

        case 10:
            content = wrapper(`
                ${wrapRow("And top of that, we've been spending", 0.8, `font-bold text-2xl ${baseTextColor}`)}
                <h2 id="hour-anim" class="text-9xl font-black text-[#00ff00] text-nyentrik my-6" style="opacity:0">0</h2>
                ${wrapRow("hours together since ur last birthday.", 5.5, `font-bold text-2xl ${baseTextColor}`)}
                ${wrapRow("#jujurbosan #muakbesar", 7.0, `font-thin-custom italic ${baseTextColor}`)}
            `);
            break;

        case 11:
            const r = data.receipt;
            content = wrapper(`
                ${wrapRow("since u keep using my service, i guess... here's the receipt:", 1.5, `font-bold text-2xl ${baseTextColor}`)}
                <div id="receipt-box" class="bg-white text-black p-6 w-full max-w-[320px] shadow-2xl mt-8 mx-auto overflow-hidden opacity-0 border-2 border-gray-200"
                     style="transform: scaleY(0); transform-origin: top; transition: transform 1.5s cubic-bezier(0.1, 0.5, 0.5, 1), opacity 0.5s ease;">
                    <div class="font-mono text-[10px] text-left uppercase tracking-tight">
                        <h3 class="text-center text-xl font-black mb-4 border-b-2 border-dashed border-black pb-2 italic">SERVICE RECEIPT</h3>
                        <div class="space-y-2 mb-4">
                            ${data.playlist.slice(0, 6).map((p, i) => `
                                <div class="flex justify-between font-bold">
                                    <span>${p}</span>
                                    <span>Rp${r.list[i].toLocaleString('id-ID')}</span>
                                </div>`).join('')}
                        </div>
                        <div class="border-t-2 border-dashed border-black my-4"></div>
                        <div class="flex justify-between font-black text-lg">
                            <span>TOTAL PAID</span>
                            <span class="text-[#ff007f]">FREE</span>
                        </div>
                        <div class="mt-6 text-center text-[8px] opacity-60">
                            <p>*** BestFriend Rental by ARES ***</p>
                        </div>
                    </div>
                </div>
                <div class="mt-8">
                    ${wrapRow("congrats for becoming my loyal costumer!", 3.5, `font-bold text-xl ${baseTextColor}`)}
                    ${wrapRow("and thank you for still keeping me around <3", 4.8, `font-thin-custom italic ${baseTextColor}`)}
                </div>
                <button id="btn-receipt" onclick="next()" class="btn-wrapped mt-10">CONTINUE</button>
            `);
            break;

        case 12:
            content = wrapper(`
                ${wrapRow("pstt, i still have a lil gift for you:", 0.5, `font-bold text-2xl italic ${baseTextColor}`)}
                <div id="vn-container" class="opacity-0 translate-y-10 transition-all duration-1000 ease-out mt-8 w-full max-w-[320px] mx-auto">
                    <div class="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 shadow-2xl relative overflow-hidden text-white">
                        <div class="absolute bottom-0 left-0 h-1 bg-[#ff007f] transition-all duration-100 ease-linear" id="vn-progress" style="width: 0%;"></div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-[#ff007f] rounded-full flex items-center justify-center animate-pulse">
                                <span class="text-white">▶</span>
                            </div>
                            <div class="flex-1 text-left">
                                <p class="text-xs font-bold text-white/90">VoiceMessage.mp3</p>
                                <p class="text-[10px] text-white/60 uppercase tracking-tighter">Playing Now...</p>
                            </div>
                        </div>
                    </div>
                    <audio id="vn-audio"><source src="assets/music/vn.mp3" type="audio/mpeg"></audio>
                </div>
                <button id="btn-final" onclick="next()" class="btn-wrapped mt-10">CONTINUE</button>
            `);
            break;

        case 13:
            content = wrapper(`
                <div class="relative inline-block scale-[2.2] mb-20">
                    <div id="flame" class="flame mb-2"></div>
                    <div class="text-8xl">🎂</div>
                    <div id="candle" class="absolute inset-0 cursor-pointer opacity-0 z-50"></div>
                </div>
                ${wrapRow("blow me <3", 1.8, `text-5xl font-black italic ${baseTextColor}`)}
            `);
            break;
    }

    container.innerHTML = content;

    // --- TRIGGER ANIMATIONS ---
    setTimeout(() => {
        if (num === 2) {
            const el = document.getElementById('text-anim');
            if(el) {
                el.style.opacity = "1";
                animateValue('text-anim', 0, data.stats.textCount, 4000);
            }
        }
        if (num === 10) {
            const el = document.getElementById('hour-anim');
            if(el) {
                el.style.opacity = "1";
                animateValue('hour-anim', 0, data.stats.hours, 4000);
            }
        }
        if (num === 7) {
            const container7 = document.getElementById('top5Container');
            if (container7) {
                container7.classList.remove('opacity-0', 'translate-y-10');
                container7.classList.add('opacity-100', 'translate-y-0');
                for (let i = 0; i < 5; i++) {
                    const bar = document.getElementById(`bar-${i}`);
                    const text = document.getElementById(`text-loc-${i}`);
                    if (bar) bar.style.transform = "scaleX(1)";
                    if (text) text.style.opacity = "1";
                }
            }
        }
        if (num === 11) {
            const receipt = document.getElementById('receipt-box');
            if (receipt) {
                receipt.style.opacity = "1";
                receipt.style.transform = "scaleY(1)";
            }
        }
        if (num === 12) {
            const vnContainer = document.getElementById('vn-container');
            const audio = document.getElementById('vn-audio');
            const progress = document.getElementById('vn-progress');
            if (vnContainer) {
                vnContainer.classList.remove('opacity-0', 'translate-y-10');
                vnContainer.classList.add('opacity-100', 'translate-y-0');
                audio.play().catch(e => console.log("Blocked"));
                audio.ontimeupdate = () => {
                    const percentage = (audio.currentTime / audio.duration) * 100;
                    if (progress) progress.style.width = percentage + "%";
                };
            }
        }
    }, 1800);
}