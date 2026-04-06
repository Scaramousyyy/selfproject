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

    if (data.themes[num]) {
        body.style.backgroundImage = data.themes[num];
        
        if (num === 1) body.style.backgroundSize = "40px 40px, 40px 40px";
        else if (num === 2 || num === 3 || num === 5 || num === 7) body.style.backgroundSize = "60px 60px";
        else if (num === 4 || num === 8) body.style.backgroundSize = "20px 20px";
        else body.style.backgroundSize = "400% 400%";

        if (num === 1) body.style.backgroundPosition = "0 0, 20px 20px";
    }

    const glassWrapper = (innerContent) => `
        <div class="glass-card text-center mx-6 flex flex-col items-center justify-center min-h-[60vh] shadow-2xl">
            ${innerContent}
        </div>
    `;

    switch(num) {
        case 1:
            content = glassWrapper(`
                <h1 class="text-4xl font-bold mb-6" style="color: #d88a9a;">
                    ${wrapWords(`Hey, ${data.targetName}!!`, 0.2)}
                </h1>
                <p class="text-lg text-gray-700 leading-relaxed px-4">
                    ${wrapWords("Once again, a year just wrapped. Let's see what things that happened in this past year!!", 0.8)}
                </p>
                <button onclick="next()" class="btn-primary mt-12 px-10 py-3 rounded-full font-bold shadow-md reveal-text" style="animation-delay: 2.5s">Let's Start!</button>
            `);
            break;

        case 2:
            content = glassWrapper(`
                <p class="text-lg text-gray-600">${wrapWords("We've been texting each other for", 0.2)}</p>
                <h2 id="text-anim" class="text-5xl font-black my-4" style="color: #d88a9a; opacity: 0;">0</h2>
                <p class="text-sm mb-6 text-gray-500 font-mono italic">${wrapWords("times...", 1.2)}</p>
                <p class="mt-4 text-gray-700">${wrapWords("and ur top #1 keyword in our conversation is:", 1.8)}</p>
                <h3 class="text-3xl font-bold italic mt-2 text-pink-600">${wrapWords(`"${data.stats.topKeyword}"`, 2.8)}</h3>
                <button onclick="next()" class="mt-12 text-xs tracking-widest text-gray-400 uppercase reveal-text" style="animation-delay: 3.8s">Continue</button>
            `);
            break;

        case 3:
            content = glassWrapper(`
                <p class="text-xl text-gray-700 leading-snug px-4">${wrapWords("I agreed, dan gak kerasa we've been coming to", 0.2)}</p>
                <h2 id="cafe-anim" class="text-5xl font-black my-4 text-red-500" style="opacity: 0;">0</h2>
                <p class="text-lg text-gray-500 italic">${wrapWords("cafes just to hangout jir #ripmoney", 1.5)}</p>
                <button onclick="next()" class="mt-12 text-xs uppercase tracking-widest text-gray-400 reveal-text" style="animation-delay: 2.5s">Continue</button>
            `);
            break;

        case 4:
            content = glassWrapper(`
                <p class="text-md mb-4 italic text-gray-600 px-4">${wrapWords("Sometimes, well.. most of the time, sih...", 0.2)}</p>
                <p class="text-xl text-gray-700 px-4">${wrapWords(`You gave me a ride and come to Antang for`, 1.2)}</p>
                <h2 id="antang-anim" class="text-6xl font-black my-4 text-blue-500" style="opacity: 0;">0</h2>
                <p class="text-xl font-mono text-gray-400 italic">${wrapWords("times. mmf klw beban,,,", 2.5)}</p>
                <button onclick="next()" class="mt-12 text-xs uppercase tracking-widest text-gray-400 reveal-text" style="animation-delay: 3.5s">Continue</button>
            `);
            break;

        case 5:
            content = glassWrapper(`
                <p class="text-md leading-relaxed text-gray-700 px-4">${wrapWords("And we always sing together in ur car, Happy Puppy (klau berduit), or ur home (klau miskin).", 0.2)}</p>
                <p class="mt-6 text-gray-700 px-4">${wrapWords("Idk bruh, how can u still survive after hearing my cracked voice for", 1.8)}</p>
                <h2 id="karaoke-anim" class="text-4xl font-bold text-orange-500 my-4" style="opacity: 0;">0</h2>
                <p class="text-sm italic text-gray-500">${wrapWords("times. But hey, u're a good singer and friend:)", 3.2)}</p>
                <button onclick="next()" class="mt-10 text-xs uppercase tracking-widest text-gray-400 reveal-text" style="animation-delay: 4.5s">Continue</button>
            `);
            break;

        case 6:
            content = glassWrapper(`
                <p class="text-xl text-gray-700 px-4">${wrapWords("Lastly, we've been spending", 0.2)}</p>
                <h2 id="tiktok-anim" class="text-5xl font-black my-4 text-pink-500" style="opacity: 0;">0</h2>
                <p class="text-xl text-gray-700 px-4">${wrapWords("hours together since ur last birthday.", 1.2)}</p>
                <p class="text-gray-400 text-sm mt-2">${wrapWords("#jujurbosan #muakdikit", 2.5)}</p>
                <button onclick="next()" class="mt-12 text-xs uppercase tracking-widest text-gray-400 reveal-text" style="animation-delay: 3.5s">Continue</button>
            `);
            break;

        case 7:
            content = glassWrapper(`
                <p class="text-lg text-gray-700 px-4">${wrapWords("Dan gak kerasa, now you're hitting", 0.2)}</p>
                <h2 id="age-anim" class="text-7xl font-black my-4" style="color: #d88a9a; opacity: 0;">0</h2>
                <p class="text-xl mb-6 italic text-gray-500 px-4">${wrapWords("So, you are old, ig??", 1.5)}</p>
                <p class="mt-8 text-pink-600 font-medium px-8">${wrapWords("Anyways, thanks for letting me still exist in ur life for another year <3", 2.5)}</p>
                <button onclick="next()" class="mt-12 text-sm underline underline-offset-8 text-gray-400 uppercase tracking-tighter reveal-text" style="animation-delay: 4.5s">Continue</button>
            `);
            break;

        case 8: // Receipt
            const receiptData = data.receipt;

            content = `
                <div class="flex flex-col items-center justify-center p-6 min-h-screen">
                    <p class="mb-6 text-sm text-gray-600 italic font-mono text-center reveal-text delay-1">
                        ${wrapWords("anw, here's the receipt for using my service:", 0)}
                    </p>
                    
                    <div class="receipt-container receipt-animation text-[11px]">
                        <h3 class="text-center font-black text-lg mb-1 uppercase text-black">Best Friend Service</h3>
                        <p class="text-center text-[9px] mb-4 text-black font-mono tracking-widest uppercase italic">Makassar Branch - Est. 2025</p>
                        
                        <div class="receipt-line"></div>
                        
                        <div class="space-y-2 font-mono uppercase text-black">
                            ${data.playlist.map((song, i) => `
                                <div class="flex justify-between items-start gap-2">
                                    <span class="text-left">${(i+1).toString().padStart(2, '0')} ${song.substring(0, 15)}</span>
                                    <span class="whitespace-nowrap">Rp${receiptData.list[i].toLocaleString('id-ID')}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="receipt-line"></div>
                        
                        <div class="mt-4 font-bold text-black font-mono text-right space-y-1">
                            <div class="flex justify-between">
                                <span>SUBTOTAL</span> 
                                <span>Rp${receiptData.subtotal.toLocaleString('id-ID')}</span>
                            </div>
                            <div class="flex justify-between text-red-600">
                                <span>DISCOUNT (BFF)</span> 
                                <span>-100%</span>
                            </div>
                            <div class="receipt-line"></div>
                            <div class="flex justify-between text-lg pt-1 font-black">
                                <span>TOTAL DUE</span> 
                                <span class="text-green-600">FREE</span>
                            </div>
                        </div>

                        <div class="mt-8 text-center text-[8px] text-gray-500 font-mono leading-tight">
                            <p>TRANS ID: ${Math.floor(Math.random() * 1000000)}</p>
                            <p class="mt-2 uppercase">*** NO REFUNDS FOR TRUE FRIENDSHIP ***</p>
                        </div>
                    </div>
                    
                    <p class="mt-6 text-gray-500 font-mono italic reveal-text delay-4">#jk</p>
                    <button onclick="next()" class="btn-primary mt-4 px-10 py-3 rounded-full font-bold shadow-md reveal-text delay-5">Continue</button>
                </div>`;
            break;

        case 9: // Voice Note
            content = glassWrapper(`
                <h2 class="text-2xl font-bold mb-4 italic text-pink-600 px-4">${wrapWords("Lastly, i have a lil message for u.", 0.2)}</h2>
                <p class="text-xs text-gray-500 mb-8 italic">${wrapWords("pls use earphone for better experience (whatttt)", 1.5)}</p>
                <div class="bg-white/40 p-4 rounded-2xl border border-white shadow-inner w-full reveal-text delay-3">
                    <audio controls class="w-full h-10">
                        <source src="assets/vns/message.mp3" type="audio/mpeg">
                    </audio>
                </div>
                <button onclick="next()" class="mt-12 text-pink-500 font-black animate-pulse tracking-widest reveal-text delay-4">Continue</button>
            `);
            break;

        case 10: // Blow Candle
            content = `
                <div class="text-center flex flex-col items-center justify-center min-h-screen">
                    <div class="relative inline-block scale-125 reveal-text delay-1">
                        <div id="flame" class="flame mb-2"></div>
                        <div class="text-8xl">🎂</div>
                        <div id="candle" class="absolute inset-0 cursor-pointer opacity-0"></div>
                    </div>
                    <h2 class="text-3xl font-black mt-12 text-pink-500 underline decoration-wavy px-4 reveal-text delay-2">${wrapWords("blow me <3", 1)}</h2>
                    <p class="text-[10px] text-gray-500 mt-4 italic font-mono uppercase tracking-widest px-8 reveal-text delay-3">${wrapWords("(tiup mic hp-mu atau klik kuenya)", 2)}</p>
                </div>`;
            break;
    }

    container.innerHTML = content;

    // Trigger Animasi Angka + Show Elements
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
    }, 1200); 
}