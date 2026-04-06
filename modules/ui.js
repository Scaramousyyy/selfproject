// --- HELPER FUNCTIONS ---

// 1. Fungsi Helper untuk Animasi Angka (Count Up)
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

    // 1. UPDATE BACKGROUND NEON (DARI CONFIG)
    if (data.themes && data.themes[num]) {
        body.style.backgroundImage = data.themes[num];
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
    }

    // 2. WRAPPER UTAMA (FULLSCREEN & BOLD - TANPA GLASSCARD)
    const wrappedWrapper = (innerContent) => `
        <div class="flex flex-col items-center justify-center h-full w-full text-center px-8 animate-fade-in relative z-10 overflow-hidden">
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

        case 2: // TWO-STEP STORYTELLING (TEXT COUNT)
            content = wrappedWrapper(`
                <div id="textCountContainer" class="flex-grow flex flex-col items-center justify-center w-full transition-all duration-700 ease-in-out">
                    <p class="text-xl text-white font-medium italic mb-2">${wrapWords("We've been texting each other for", 0.2)}</p>
                    <h2 id="text-anim" class="text-8xl font-black text-[#00ff00] tracking-tighter" style="opacity: 0;">0</h2>
                    <p class="text-lg text-gray-300 font-mono uppercase tracking-widest mt-2">${wrapWords("times...", 1.2)}</p>
                </div>
                <div id="keywordContainer" class="flex-grow flex flex-col items-center justify-center w-full opacity-0 transition-opacity duration-500 ease-in mt-10">
                    <p class="text-2xl text-white font-black leading-none uppercase tracking-tight">${wrapWords("Your top #1 keyword is:", 0)}</p>
                    <h3 class="text-6xl font-black italic mt-6 text-[#ffff00] text-outline-white uppercase tracking-tighter leading-none px-2">
                        ${wrapWords(`"${data.stats.topKeyword}"`, 1.2)}
                    </h3>
                    <button onclick="next()" class="btn-wrapped mt-16 reveal-text" style="animation-delay: 2.5s">NEXT</button>
                </div>
            `);
            break;

        case 3: // SPOTIFY LAYOUT (NARRATIVE)
            content = wrappedWrapper(`
                <div id="mapIntroContainer" class="transition-all duration-700 ease-in-out">
                    <p class="text-2xl text-white font-bold leading-tight px-2">
                        ${wrapWords("You’re out every single day—whether you’re driving yourself, hitching a ride, or hopping on an ojol.", 0.2)}
                    </p>
                    <div class="my-10">
                        <p class="text-lg text-blue-200 font-medium mb-2 uppercase tracking-widest">You've mapped out</p>
                        <h2 class="text-7xl font-black text-[#00ff00] tracking-tighter leading-none animate-pulse">87.54%</h2>
                        <p class="text-2xl text-white font-black uppercase mt-2">of Makassar!</p>
                    </div>
                </div>
                <div id="mapTeaserContainer" class="opacity-0 transition-all duration-1000 mt-6 px-4">
                    <p class="text-xl text-white font-medium italic leading-snug">
                        ${wrapWords("But there’s that one spot that just keeps calling you back...", 0)}
                    </p>
                    <p class="text-3xl text-[#ffff00] font-black uppercase text-outline-white mt-4 tracking-tighter">
                        ${wrapWords("again, and again, and again.", 1.2)}
                    </p>
                    <button onclick="next()" class="btn-wrapped mt-10 reveal-text" style="animation-delay: 2.5s">WHO IS IT?</button>
                </div>
            `);
            break;

        case 4: // TOP 1 TO TOP 5
            const locations = [
                { name: "Kos Eza", color: "#98ffeb", width: "w-[85%]" },
                { name: "Coffee Shop", color: "#d2ff52", width: "w-[70%]" },
                { name: "Rumah Tama", color: "#3a12ff", width: "w-[55%]" },
                { name: "Unhas Tamlan", color: "#111111", width: "w-[40%]" },
                { name: "Pantai", color: "#ffffff", width: "w-[25%]" }
            ];

            content = wrappedWrapper(`
                <div id="top1Container" class="flex-grow flex flex-col items-center justify-center w-full transition-all duration-1000 ease-in-out">
                    <p class="text-2xl text-white font-bold uppercase tracking-widest mb-4">
                        ${wrapWords("The top spot on your maps:", 0.2)}
                    </p>
                    <h2 class="text-7xl font-black text-[#98ffeb] text-outline-white italic uppercase tracking-tighter leading-none animate-bounce">
                        ${wrapWords("Kos Eza", 1.2)}
                    </h2>
                </div>
                <div id="top5Container" class="w-full flex flex-col items-start text-left opacity-0 translate-y-20 transition-all duration-1000 ease-out mt-10">
                    <h2 class="text-2xl font-black text-white uppercase mb-8 self-center text-center">Your Full Top Locations</h2>
                    <div class="flex flex-col gap-5 w-full px-2">
                        ${locations.map((loc, i) => `
                            <div class="flex items-center w-full">
                                <div class="${loc.width} h-10 rounded-r-full shadow-lg mr-4 bg-white" 
                                     style="background-color: ${loc.color}; transform: translateX(-110%);" 
                                     id="bar-${i}">
                                </div>
                                <div class="flex flex-col leading-tight">
                                    <span class="text-white font-bold text-[10px]">#${i+1}</span>
                                    <span class="text-white font-black text-sm uppercase tracking-tight whitespace-nowrap">${loc.name}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button onclick="next()" class="btn-wrapped mt-10 self-center">CONTINUE</button>
                </div>
            `);
            break;

        case 5: // YEARNING LISTENER
            content = wrappedWrapper(`
                <div class="flex flex-col items-center justify-center w-full min-h-screen relative text-black">
                    <h2 class="text-4xl font-black leading-tight mb-8 px-4">
                        ${wrapWords("Has anyone told you lately that you're a top-tier listener?", 0.2)}
                    </h2>
                    <div id="yearningContainer" class="mb-10 transition-all duration-700">
                        <p class="text-xl font-medium mb-4">We catch up constantly, and you’ve officially endured</p>
                        <h2 id="yearning-anim" class="text-6xl font-black tracking-tighter leading-none my-2">0</h2>
                        <p class="text-xl font-medium">minutes of my 'yearning' for <span class="font-black italic underline decoration-black underline-offset-4">Kakak</span>.</p>
                    </div>
                    <div id="daysContainer" class="opacity-0 transition-all duration-1000 translate-y-10">
                        <p class="text-2xl font-black uppercase tracking-tighter leading-none">
                            That is literally <span class="text-pink-600 text-outline-black">15.9 days</span> non-stop.
                        </p>
                        <button onclick="next()" class="btn-wrapped mt-12 bg-black text-white border-2 border-white shadow-none" style="box-shadow: 6px 6px 0px #000;">KEEP LISTENING</button>
                    </div>
                </div>
            `);
            break;

        case 6: // TIKTOK
            content = wrappedWrapper(`
                <p class="text-2xl text-white font-black uppercase">${wrapWords("Lastly, we've been spending", 0.2)}</p>
                <h2 id="tiktok-anim" class="text-8xl font-black my-6 text-[#00ff00] tracking-tighter" style="opacity: 0;">0</h2>
                <p class="text-2xl text-white font-black leading-tight px-4 uppercase">${wrapWords("hours together since ur last birthday.", 1.2)}</p>
                <button onclick="next()" class="btn-wrapped mt-12">CONTINUE</button>
            `);
            break;

        case 7: // AGE
            content = wrappedWrapper(`
                <p class="text-2xl text-white font-black uppercase tracking-tighter">${wrapWords("Dan gak kerasa, now you're hitting", 0.2)}</p>
                <h2 id="age-anim" class="text-9xl font-black my-4 text-outline-white" style="opacity: 0; color: transparent;">0</h2>
                <p class="mt-12 text-white font-bold px-8 leading-tight">${wrapWords("Anyway, thanks for letting me still exist in ur life <3", 2.5)}</p>
                <button onclick="next()" class="btn-wrapped mt-16">CONTINUE</button>
            `);
            break;

        case 8: // RECEIPT
            const receiptData = data.receipt;
            content = wrappedWrapper(`
                <p class="mb-6 text-sm text-gray-400 italic font-mono reveal-text delay-1">${wrapWords("anw, here's the receipt for using my service:", 0)}</p>
                <div class="receipt-modern receipt-animation text-[11px] border-4 border-white shadow-2xl">
                    <h3 class="text-center font-black text-xl mb-1 uppercase">Friend Service</h3>
                    <div class="receipt-line-neon"></div>
                    <div class="space-y-2 font-mono uppercase text-white text-left">
                        ${data.playlist.map((song, i) => `
                            <div class="flex justify-between items-start gap-2">
                                <span>${(i+1).toString().padStart(2, '0')} ${song.substring(0, 15)}</span>
                                <span class="text-[#ffff00]">Rp${receiptData.list[i].toLocaleString('id-ID')}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="receipt-line-neon"></div>
                    <div class="mt-4 font-bold font-mono text-right space-y-1 text-white">
                        <div class="flex justify-between"><span>SUBTOTAL</span> <span>Rp${receiptData.subtotal.toLocaleString('id-ID')}</span></div>
                        <div class="flex justify-between text-[#00ff00]"><span>DISCOUNT</span> <span>-100%</span></div>
                        <div class="receipt-line-neon"></div>
                        <div class="flex justify-between text-2xl pt-1 font-black text-[#ffff00] text-outline-white">
                            <span>TOTAL</span> <span>FREE</span>
                        </div>
                    </div>
                </div>
                <button onclick="next()" class="btn-wrapped mt-10">CONTINUE</button>
            `);
            break;

        case 9: // VN
            content = wrappedWrapper(`
                <h2 class="text-3xl font-black mb-8 italic text-[#ff00ff] text-outline-white uppercase tracking-tighter">${wrapWords("Lastly, i have a lil message for u.", 0.2)}</h2>
                <div class="bg-black/80 p-6 border-2 border-white w-full"><audio controls class="w-full h-10 filter invert"><source src="assets/vns/message.mp3" type="audio/mpeg"></audio></div>
                <button onclick="next()" class="btn-wrapped mt-16">LAST STEP</button>
            `);
            break;

        case 10: // CANDLE
            content = `
                <div class="flex flex-col items-center justify-center h-full w-full text-center px-8 animate-fade-in relative z-10">
                    <div class="relative inline-block scale-150"><div id="flame" class="flame mb-2"></div><div class="text-8xl">🎂</div><div id="candle" class="absolute inset-0 cursor-pointer opacity-0"></div></div>
                    <h2 class="text-5xl font-black mt-20 uppercase tracking-tighter text-outline-black">${wrapWords("blow me <3", 1)}</h2>
                </div>`;
            break;
    }

    container.innerHTML = content;

    // --- TRIGGER LOGIC SINKRONISASI ---
    setTimeout(() => {
        const animElements = ["text-anim", "cafe-anim", "antang-anim", "karaoke-anim", "tiktok-anim", "age-anim", "yearning-anim"];
        animElements.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.style.opacity = "1";
        });

        if (num === 2) animateValue("text-anim", 0, data.stats.textCount, 3000);
        if (num === 3) {/* Slide-up logic handled in case 3 */}
        if (num === 5) animateValue("yearning-anim", 0, "22896", 3000);
        if (num === 6) animateValue("tiktok-anim", 0, data.stats.hours, 1500);
        if (num === 7) animateValue("age-anim", 0, data.age, 1000);

        // Slide 2 Transition
        if (num === 2) {
            setTimeout(() => {
                if (window.currentSlideNum !== 2) return;
                const tc = document.getElementById('textCountContainer');
                const kw = document.getElementById('keywordContainer');
                if (tc && kw) { tc.style.transform = "translateY(-15vh)"; tc.classList.add('opacity-70'); kw.classList.remove('opacity-0'); kw.classList.add('opacity-100'); }
            }, 4800);
        }

        // Slide 3 Transition
        if (num === 3) {
            setTimeout(() => {
                if (window.currentSlideNum !== 3) return;
                const intro = document.getElementById('mapIntroContainer');
                const teaser = document.getElementById('mapTeaserContainer');
                if (intro && teaser) { intro.style.transform = "translateY(-10vh)"; intro.classList.add('opacity-60'); teaser.classList.remove('opacity-0'); teaser.classList.add('opacity-100'); teaser.style.transform = "translateY(-5vh)"; }
            }, 6000);
        }

        // Slide 4 Transition
        if (num === 4) {
            setTimeout(() => {
                if (window.currentSlideNum !== 4) return;
                const t1 = document.getElementById('top1Container');
                const t5 = document.getElementById('top5Container');
                if (t1 && t5) {
                    t1.style.transform = "translateY(-20vh) scale(0.8)"; t1.classList.add('opacity-50');
                    t5.classList.remove('opacity-0', 'translate-y-20'); t5.classList.add('opacity-100', 'translate-y-0');
                    for(let i=0; i<5; i++) {
                        const bar = document.getElementById(`bar-${i}`);
                        if(bar) { setTimeout(() => { bar.style.transition = "transform 1s ease-out"; bar.style.transform = "translateX(110%)"; }, 500 + (i * 200)); }
                    }
                }
            }, 3500);
        }

        // Slide 5 Transition
        if (num === 5) {
            setTimeout(() => {
                if (window.currentSlideNum !== 5) return;
                const yc = document.getElementById('yearningContainer');
                const dc = document.getElementById('daysContainer');
                if (yc && dc) { yc.style.transform = "translateY(-5vh)"; dc.classList.remove('opacity-0', 'translate-y-10'); dc.classList.add('opacity-100', 'translate-y-0'); }
            }, 4500);
        }
    }, 1500);
}