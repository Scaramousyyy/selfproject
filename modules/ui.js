// Fungsi helper untuk animasi angka (Count Up)
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

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

export function renderSlide(num, data) {
    const container = document.getElementById('app');
    let content = "";

    // Helper untuk membungkus konten dalam Glassmorphism Card
    const glassWrapper = (innerContent) => `
        <div class="glass-card text-center mx-6 flex flex-col items-center justify-center min-h-[60vh] shadow-2xl">
            ${innerContent}
        </div>
    `;

    switch(num) {
        case 1:
            content = glassWrapper(`
                <h1 class="text-4xl font-bold mb-6 reveal-text delay-1" style="color: #d88a9a;">Hey, ${data.targetName}!!</h1>
                <p class="text-lg text-gray-700 leading-relaxed reveal-text delay-2">Once again, a year just wrapped.<br>Let's see what things that happened in this past year!!</p>
                <button onclick="next()" class="btn-primary mt-12 px-10 py-3 rounded-full font-bold shadow-md reveal-text delay-3">Let's Start!</button>
            `);
            break;

        case 2:
            content = glassWrapper(`
                <p class="text-lg text-gray-600 reveal-text delay-1">We've been texting each other for</p>
                <h2 id="text-anim" class="text-5xl font-black my-4 reveal-text delay-2" style="color: #d88a9a;">0</h2>
                <p class="text-sm mb-6 text-gray-500 font-mono italic reveal-text delay-2">times...</p>
                <p class="mt-4 text-gray-700 reveal-text delay-3">and ur top #1 keyword in our conversation is:</p>
                <h3 class="text-3xl font-bold italic mt-2 text-pink-600 reveal-text delay-4">"${data.stats.topKeyword}"</h3>
                <button onclick="next()" class="mt-12 text-xs tracking-widest text-gray-400 uppercase reveal-text delay-5">Continue</button>
            `);
            break;

        case 3:
            content = glassWrapper(`
                <p class="text-xl text-gray-700 leading-snug reveal-text delay-1">I agreed, dan gak kerasa we've been coming to</p>
                <h2 id="cafe-anim" class="text-5xl font-black my-4 text-red-500 reveal-text delay-2">0</h2>
                <p class="text-lg text-gray-500 italic reveal-text delay-2">cafes just to hangout jir #ripmoney</p>
                <button onclick="next()" class="mt-12 text-xs uppercase tracking-widest text-gray-400 reveal-text delay-3">Continue</button>
            `);
            break;

        case 4:
            content = glassWrapper(`
                <p class="text-md mb-4 italic text-gray-600 reveal-text delay-1">Sometimes, well.. most of the time, sih...</p>
                <p class="text-xl text-gray-700 reveal-text delay-2 px-4">You gave me a ride and come to <span class="text-blue-500 font-bold uppercase">Antang</span> for</p>
                <h2 id="antang-anim" class="text-6xl font-black my-4 text-blue-500 reveal-text delay-3">0</h2>
                <p class="text-xl font-mono text-gray-400 italic reveal-text delay-3">times. mmf klw beban,,,</p>
                <button onclick="next()" class="mt-12 text-xs uppercase tracking-widest text-gray-400 reveal-text delay-4">Continue</button>
            `);
            break;

        case 5:
            content = glassWrapper(`
                <p class="text-md leading-relaxed text-gray-700 reveal-text delay-1 px-4">And we always sing together in ur car, Happy Puppy (klau berduit), or ur home (klau miskin).</p>
                <p class="mt-6 text-gray-700 reveal-text delay-2">Idk bruh, how can u still survive after hearing my cracked voice for</p>
                <h2 id="karaoke-anim" class="text-4xl font-bold text-orange-500 my-4 reveal-text delay-3">0</h2>
                <p class="text-sm italic text-gray-500 reveal-text delay-3">times. But hey, u're a good singer and friend:)</p>
                <button onclick="next()" class="mt-10 text-xs uppercase tracking-widest text-gray-400 reveal-text delay-4">Continue</button>
            `);
            break;

        case 6:
            content = glassWrapper(`
                <p class="text-xl text-gray-700 reveal-text delay-1">Lastly, we've been spending</p>
                <h2 id="tiktok-anim" class="text-5xl font-black my-4 text-pink-500 reveal-text delay-2">0</h2>
                <p class="text-xl text-gray-700 reveal-text delay-2 px-4">hours together since ur last birthday. <br><span class="text-gray-400 text-sm">#jujurbosan #muakdikit</span></p>
                <button onclick="next()" class="mt-12 text-xs uppercase tracking-widest text-gray-400 reveal-text delay-3">Continue</button>
            `);
            break;

        case 7:
            content = glassWrapper(`
                <p class="text-lg text-gray-700 reveal-text delay-1">Dan gak kerasa, now you're hitting</p>
                <h2 id="age-anim" class="text-7xl font-black my-4 reveal-text delay-2" style="color: #d88a9a;">0</h2>
                <p class="text-xl mb-6 italic text-gray-500 reveal-text delay-2">So, you are old, ig??</p>
                <p class="mt-8 text-pink-600 font-medium reveal-text delay-3 px-4">Anyways, thanks for letting me still exist in ur life for another year &lt;3</p>
                <button onclick="next()" class="mt-12 text-sm underline underline-offset-8 text-gray-400 uppercase tracking-tighter reveal-text delay-4">Continue</button>
            `);
            break;

        case 8: // Music Receipt
            content = `
                <div class="flex flex-col items-center justify-center p-6 min-h-screen">
                    <p class="mb-4 text-sm text-gray-600 italic font-mono text-center reveal-text delay-1">anw, here's the receipt for using my service:</p>
                    <div class="receipt-container text-[10px] shadow-2xl reveal-text delay-2">
                        <h3 class="text-center font-black text-lg border-b-2 border-dashed border-black pb-2 mb-2 uppercase">Best Friend Service Bill</h3>
                        <div class="space-y-1 font-mono uppercase">
                            ${data.playlist.map((song, i) => `
                                <div class="flex justify-between">
                                    <span>${(i+1).toString().padStart(2, '0')} ${song.substring(0, 15)}</span>
                                    <span>Rp150.000</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="mt-4 border-t-2 border-dashed border-black pt-2 text-center font-bold">
                            <p>SUBTOTAL: Rp...</p>
                            <p>DISCOUNT (FR001SHIP): -100%</p>
                            <p class="text-[14px] mt-1">TOTAL: FREE FOREVER</p>
                        </div>
                    </div>
                    <p class="mt-4 text-gray-500 font-mono italic reveal-text delay-3">#jk</p>
                    <button onclick="next()" class="btn-primary mt-6 px-8 py-2 rounded-full font-bold reveal-text delay-4">Continue</button>
                </div>`;
            break;

        case 9: // Voice Note
            content = glassWrapper(`
                <h2 class="text-2xl font-bold mb-4 italic text-pink-600 reveal-text delay-1">Lastly, i have a lil message for u.</h2>
                <p class="text-xs text-gray-500 mb-8 italic reveal-text delay-2">pls use earphone for better experience (whatttt)</p>
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
                    <h2 class="text-3xl font-black mt-12 text-pink-500 underline decoration-wavy px-4 reveal-text delay-2">blow me&lt;3</h2>
                    <p class="text-[10px] text-gray-500 mt-4 italic font-mono uppercase tracking-widest px-8 reveal-text delay-3">(tiup mic hp-mu atau klik kuenya)</p>
                </div>`;
            break;
    }

    container.innerHTML = content;

    // Trigger Animasi Angka dengan delay agar sinkron dengan reveal-text
    setTimeout(() => {
        if (num === 2) animateValue("text-anim", 0, data.stats.textCount, 2000);
        if (num === 3) animateValue("cafe-anim", 0, data.stats.cafeCount, 1500);
        if (num === 4) animateValue("antang-anim", 0, data.stats.rideToAntang, 2000);
        if (num === 5) animateValue("karaoke-anim", 0, data.stats.karaokeCount, 2000);
        if (num === 6) animateValue("tiktok-anim", 0, data.stats.hours, 1500);
        if (num === 7) animateValue("age-anim", 0, data.age, 1000);
    }, 800); // Menunggu teks baris ke-2 muncul baru angkanya jalan
}