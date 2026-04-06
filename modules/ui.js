// --- HELPER FUNCTIONS ---

// 1. Fungsi Animasi Angka (Count Up)
function animateValue(id, start, end, duration) {
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

// 2. Fungsi Helper Muncul Per Kata (Staggered)
const wrapWords = (text, startDelay = 0) => {
    return text.split(" ").map((word, index) => {
        const delay = startDelay + (index * 0.1);
        return `<span class="word" style="animation-delay: ${delay}s">${word}</span>`;
    }).join("");
};

// --- MAIN RENDER FUNCTION ---

export function renderSlide(num, data) {
    const container = document.getElementById('app');
    const body = document.body;
    let content = "";

    // 1. UPDATE BACKGROUND NEON (Dari Config)
    if (data.themes && data.themes[num]) {
        body.style.backgroundImage = data.themes[num];
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
    }

    // 2. WRAPPER UTAMA (FULLSCREEN & BOLD)
    const wrappedWrapper = (innerContent) => `
        <div class="flex flex-col items-center justify-center h-full w-full text-center px-8 animate-fade-in relative z-10">
            ${innerContent}
        </div>
    `;

    switch(num) {
        case 1:
            content = wrappedWrapper(`
                <h1 class="text-6xl font-black text-outline-white mb-8 uppercase tracking-tighter leading-none">
                    ${wrapWords(`HEY, ${data.targetName}!!`, 0.3)}
                </h1>
                <p class="text-2xl text-white font-bold leading-tight mt-4">
                    ${wrapWords("A year just wrapped. Let's see what happened in your 2025!!", 1)}
                </p>
                <button onclick="next()" class="btn-wrapped mt-16 reveal-text" style="animation-delay: 2.5s">LET'S GO</button>
            `);
            break;

        case 2:
            content = wrappedWrapper(`
                <p class="text-xl text-white font-medium italic">${wrapWords("We've been texting each other for", 0.2)}</p>
                <h2 id="text-anim" class="text-8xl font-black my-6 text-[#00ff00] tracking-tighter" style="opacity: 0;">0</h2>
                <p class="text-lg text-gray-300 font-mono uppercase tracking-widest">${wrapWords("times...", 1.2)}</p>
                
                <p class="mt-12 text-2xl text-white font-black leading-none uppercase">${wrapWords("Your top #1 keyword is:", 1.8)}</p>
                <h3 class="text-6xl font-black italic mt-4 text-[#ffff00] text-outline-white uppercase tracking-tighter leading-none">
                    ${wrapWords(`"${data.stats.topKeyword}"`, 2.8)}
                </h3>
                <button onclick="next()" class="btn-wrapped mt-16 reveal-text" style="animation-delay: 4s">NEXT</button>
            `);
            break;

        case 3:
            content = wrappedWrapper(`
                <p class="text-2xl text-white font-bold px-4 leading-tight">${wrapWords("I agreed, dan gak kerasa we've been coming to", 0.2)}</p>
                <h2 id="cafe-anim" class="text-8xl font-black my-6 text-[#ff00ff] tracking-tighter" style="opacity: 0;">0</h2>
                <p class="text-xl text-white font-black uppercase text-outline-white">${wrapWords("cafes just to hangout jir #ripmoney", 1.5)}</p>
                <button onclick="next()" class="btn-wrapped mt-16 reveal-text" style="animation-delay: 3s">CONTINUE</button>
            `);
            break;

        case 4:
            content = wrappedWrapper(`
                <p class="text-lg italic text-blue-200">${wrapWords("Sometimes, well.. most of the time, sih...", 0.2)}</p>
                <p class="text-2xl text-white font-black px-4 mt-4 leading-tight">${wrapWords(`You gave me a ride and come to`, 1)} <span class="text-outline-white uppercase">Antang</span> ${wrapWords("for", 1.5)}</p>
                <h2 id="antang-anim" class="text-8xl font-black my-6 text-[#00ffff] tracking-tighter" style="opacity: 0;">0</h2>
                <p class="text-xl font-mono text-blue-200 italic">${wrapWords("times. mmf klw beban,,,", 2.5)}</p>
                <button onclick="next()" class="btn-wrapped mt-12 reveal-text" style="animation-delay: 3.5s">CONTINUE</button>
            `);
            break;

        case 5:
            content = wrappedWrapper(`
                <p class="text-xl text-white font-bold leading-tight px-4">${wrapWords("And we always sing together in ur car, Happy Puppy, or ur home.", 0.2)}</p>
                <p class="mt-8 text-white font-medium">${wrapWords("How can u survive hearing my cracked voice for", 1.5)}</p>
                <h2 id="karaoke-anim" class="text-6xl font-black text-[#ffaa00] my-4" style="opacity: 0;">0</h2>
                <p class="text-xl text-white font-black text-outline-white uppercase">${wrapWords("times. You're a hero, Chika!!", 2.8)}</p>
                <button onclick="next()" class="btn-wrapped mt-12 reveal-text" style="animation-delay: 4s">CONTINUE</button>
            `);
            break;

        case 6:
            content = wrappedWrapper(`
                <p class="text-2xl text-white font-black uppercase">${wrapWords("Lastly, we've been spending", 0.2)}</p>
                <h2 id="tiktok-anim" class="text-8xl font-black my-6 text-[#00ff00] tracking-tighter" style="opacity: 0;">0</h2>
                <p class="text-2xl text-white font-black leading-tight px-4 uppercase">${wrapWords("hours together since ur last birthday.", 1.2)}</p>
                <p class="text-gray-400 text-sm mt-6 font-mono">${wrapWords("#jujurbosan #muakdikit", 2.5)}</p>
                <button onclick="next()" class="btn-wrapped mt-12 reveal-text" style="animation-delay: 3.5s">CONTINUE</button>
            `);
            break;

        case 7:
            content = wrappedWrapper(`
                <p class="text-2xl text-white font-black uppercase tracking-tighter">${wrapWords("Dan gak kerasa, now you're hitting", 0.2)}</p>
                <h2 id="age-anim" class="text-9xl font-black my-4 text-outline-white" style="opacity: 0; color: transparent;">0</h2>
                <p class="text-2xl text-white font-medium italic mt-4">${wrapWords("So, you are old, ig??", 1.5)}</p>
                <p class="mt-12 text-white font-bold px-8 leading-tight">${wrapWords("Anyway, thanks for letting me still exist in ur life <3", 2.5)}</p>
                <button onclick="next()" class="btn-wrapped mt-16 reveal-text" style="animation-delay: 4s">CONTINUE</button>
            `);
            break;

        case 8: // Receipt
            const receiptData = data.receipt;
            content = wrappedWrapper(`
                <p class="mb-6 text-sm text-gray-400 italic font-mono reveal-text delay-1">
                    ${wrapWords("anw, here's the receipt for using my service:", 0)}
                </p>
                <div class="receipt-modern receipt-animation text-[11px] border-4 border-white">
                    <h3 class="text-center font-black text-xl mb-1 uppercase">Friend Service</h3>
                    <p class="text-center text-[9px] mb-4 text-gray-400 font-mono tracking-widest uppercase">MAKASSAR - EST. 2025</p>
                    <div class="receipt-line-neon"></div>
                    <div class="space-y-2 font-mono uppercase">
                        ${data.playlist.map((song, i) => `
                            <div class="flex justify-between items-start gap-2">
                                <span class="text-left text-white">${(i+1).toString().padStart(2, '0')} ${song.substring(0, 15)}</span>
                                <span class="whitespace-nowrap text-[#ffff00]">Rp${receiptData.list[i].toLocaleString('id-ID')}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="receipt-line-neon"></div>
                    <div class="mt-4 font-bold font-mono text-right space-y-1">
                        <div class="flex justify-between text-white"><span>SUBTOTAL</span> <span>Rp${receiptData.subtotal.toLocaleString('id-ID')}</span></div>
                        <div class="flex justify-between text-[#00ff00]"><span>DISCOUNT (BFF)</span> <span>-100%</span></div>
                        <div class="receipt-line-neon"></div>
                        <div class="flex justify-between text-2xl pt-1 font-black text-[#ffff00] text-outline-white">
                            <span>TOTAL</span> <span>FREE</span>
                        </div>
                    </div>
                </div>
                <button onclick="next()" class="btn-wrapped mt-10 reveal-text" style="animation-delay: 1.5s">CONTINUE</button>
            `);
            break;

        case 9: // VN
            content = wrappedWrapper(`
                <h2 class="text-3xl font-black mb-8 italic text-[#ff00ff] text-outline-white uppercase tracking-tighter">
                    ${wrapWords("Lastly, i have a lil message for u.", 0.2)}
                </h2>
                <p class="text-sm text-gray-300 mb-10 italic">${wrapWords("pls use earphone for better experience (whatttt)", 1.5)}</p>
                <div class="bg-black/80 p-6 rounded-none border-2 border-white w-full reveal-text delay-3">
                    <audio controls class="w-full h-10 filter invert">
                        <source src="assets/vns/message.mp3" type="audio/mpeg">
                    </audio>
                </div>
                <button onclick="next()" class="btn-wrapped mt-16 reveal-text delay-4">LAST STEP</button>
            `);
            break;

        case 10: // Candle
            content = `
                <div class="flex flex-col items-center justify-center h-full w-full text-center px-8 animate-fade-in">
                    <div class="relative inline-block scale-150 reveal-text delay-1">
                        <div id="flame" class="flame mb-2"></div>
                        <div class="text-8xl">🎂</div>
                        <div id="candle" class="absolute inset-0 cursor-pointer opacity-0"></div>
                    </div>
                    <h2 class="text-5xl font-black mt-20 uppercase tracking-tighter text-outline-black reveal-text delay-2">${wrapWords("blow me <3", 1)}</h2>
                    <p class="text-[11px] text-gray-500 mt-6 italic font-mono uppercase tracking-widest reveal-text delay-3">${wrapWords("(tiup mic hp-mu atau klik kuenya)", 2)}</p>
                </div>`;
            break;
    }

    container.innerHTML = content;

    // Trigger Animasi Angka
    setTimeout(() => {
        const animElements = ["text-anim", "cafe-anim", "antang-anim", "karaoke-anim", "tiktok-anim", "age-anim"];
        animElements.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.style.opacity = "1";
        });

        if (num === 2) animateValue("text-anim", 0, data.stats.textCount, 2000);
        if (num === 3) animateValue("cafe-anim", 0, data.stats.cafeCount, 1500);
        if (num === 4) animateValue("antang-anim", 0, data.stats.rideToAntang, 2000);
        if (num === 5) animateValue("karaoke-anim", 0, data.stats.karaokeCount, 2000);
        if (num === 6) animateValue("tiktok-anim", 0, data.stats.hours, 1500);
        if (num === 7) animateValue("age-anim", 0, data.age, 1000);
    }, 1500); 
}