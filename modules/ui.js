// --- HELPER FUNCTIONS ---

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

    body.className = "overflow-hidden"; 
    body.style.backgroundImage = data.themes[num] || "";

    const wrapper = (inner) => `<div class="slide-entrance flex flex-col items-center justify-center w-full h-full px-10 text-center relative z-10">${inner}</div>`;

    switch(num) {
        case 1:
            content = wrapper(`
                <h1 class="text-7xl font-bold text-[#ff007f] mb-8 tracking-tighter animate-pulse">HEY CHIKA</h1>
                ${wrapRow("A year just wrapped. Let's see what happened in the past year!!", 1.3, "font-bold text-2xl")}
                <button onclick="next()" class="btn-wrapped">START</button>
            `);
            break;

        case 2:
            content = wrapper(`
                ${wrapRow("We've been texting each other for", 0.8, "font-bold text-3xl")}
                <h2 id="text-anim" class="text-8xl font-black text-[#00ff00] text-nyentrik my-6" style="opacity:0">0</h2>
                ${wrapRow("times....", 5.5, "font-bold text-3xl")} 
                <button onclick="next()" class="btn-wrapped">NEXT</button>
            `);
            break;

        case 3:
            content = wrapper(`
                ${wrapRow("And your top #1 Keyword is....", 0.8, "font-bold text-2xl")}
                <div class="mt-8">
                    ${wrapRow(`"${data.stats.topKeyword}"`, 2.5, "text-5xl font-black text-[#ffff00] italic uppercase tracking-tighter")}
                </div>
                <button onclick="next()" class="btn-wrapped">CONTINUE</button>
            `);
            break;

        case 4:
            content = wrapper(`
                ${wrapRow("You’re out every single day—whether you’re driving yourself, hitching a ride, or hopping on an ojol.", 0.8, "font-bold text-2xl")}
                <div class="mt-10">
                    ${wrapRow("You've mapped out 87.54% of Makassar!", 5.5, "font-thin-custom")}
                </div>
                <button onclick="next()" class="btn-wrapped">CONTINUE</button>
            `);
            break;

        case 5:
            content = wrapper(`
                ${wrapRow("But there’s that one spot that just keeps calling you back again, again, and again...", 0.8, "font-bold text-2xl")}
                <button onclick="next()" class="btn-wrapped">WHERE IS IT?</button>
            `);
            break;

        case 6:
            content = wrapper(`
                ${wrapRow("The favorite spot on your maps is:", 0.8, "font-bold text-2xl text-black")}
                <h2 class="text-5xl font-black text-black uppercase tracking-tighter mt-8">
                    ${wrapRow("Kos Eza", 2.2)}
                </h2>
                <button onclick="next()" class="btn-wrapped bg-black text-white">CONTINUE</button>
            `);
            break;

        case 7:
            const locations = [
                { name: "Kos Eza", color: "#98ffeb", width: "85%" },
                { name: "Coffee Shop", color: "#d2ff52", width: "70%" },
                { name: "Rumah Tama", color: "#3a12ff", width: "55%" },
                { name: "Unhas Tamlan", color: "#111111", width: "40%" },
                { name: "Pantai", color: "#ffffff", width: "25%" }
            ];
            content = wrapper(`
                <div id="top5Container" class="w-full flex flex-col items-start text-left opacity-0 translate-y-10 transition-all duration-1000 ease-out mt-10">
                    <h2 class="text-2xl font-black text-white uppercase mb-8 self-center text-center">Your Full Top Locations</h2>
                    <div class="flex flex-col gap-5 w-full px-2">
                        ${locations.map((loc, i) => {
                            // Hitung delay: Bar ke-i mulai setelah Bar (i-1) dan teksnya selesai
                            const barDelay = 0.5 + (i * 1.5); 
                            const textDelay = barDelay + 1.2; // Teks muncul setelah bar selesai tumbuh (1.2s)

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
                                    <span class="text-white font-bold text-[10px]">#${i+1}</span>
                                    <span class="text-white font-black text-sm uppercase tracking-tight">${loc.name}</span>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                    <button id="btn-next-7" onclick="next()" class="btn-wrapped mt-10 self-center opacity-0 transition-opacity duration-700" 
                            style="transition-delay: ${0.5 + (locations.length * 1.5)}s;">
                        CONTINUE
                    </button>
                </div>
            `);
            break;

        case 8:
            content = wrapper(`
                ${wrapRow("Has anyone told you lately that you're a top-tier listener?", 0.8, "font-bold text-3xl text-black")}
                <div class="mt-10 text-xl leading-relaxed">
                    ${wrapRow("We catch up constantly, and you’ve officially endured 22,896 minutes of my 'yearning' about Kakak", 3.8, "font-thin-custom text-black")}
                </div>
                <button onclick="next()" class="btn-wrapped bg-black text-white">WAIT, WHAT?</button>
            `);
            break;

        case 9:
            const rows = [
                { delay: 0.5, bgColor: "bg-[#ff8a00]", textColor: "text-black" }, // Oranye
                { delay: 1.2, bgColor: "bg-[#ff7eb9]", textColor: "text-black" }, // Pink Muda
                { delay: 1.9, bgColor: "bg-[#7034d1]", textColor: "text-[#ff007f]" }, // Ungu + Teks Pink
                { delay: 2.6, bgColor: "bg-[#ff5a5a]", textColor: "text-black" }  // Hitam + Teks Oranye
            ];

            content = wrapper(`
                <div class="flex flex-col bg-white border-4 border-white mb-10 shadow-2xl w-full max-w-sm h-80 overflow-hidden relative">
                    ${rows.map((row) => `
                        <div class="w-full h-1/4 flex justify-start items-center overflow-hidden -ml-1 ${row.bgColor}">
                            ${wrapRow("22,896", row.delay, `text-[7rem] font-black ${row.textColor} tracking-tighter leading-[0.8] w-full text-left uppercase`)}
                        </div>
                    `).join('')}
                </div>
                
                ${wrapRow("Hearing me yap about the same person with this amount of time is crazy.", 3.8, "font-bold text-xl")}
                ${wrapRow("That is literally 15.9 days non-stop.", 5.2, "font-thin-custom italic")}
                
                <button onclick="next()" class="btn-wrapped mt-10">CONTINUE</button>
            `);
            break;
            

        case 10:
            content = wrapper(`
                ${wrapRow("And top of that, we've been spending", 0.8, "font-bold text-2xl")}
                <h2 id="hour-anim" class="text-9xl font-black text-[#00ff00] text-nyentrik my-6" style="opacity:0">0</h2>
                ${wrapRow("hours together since ur last birthday.", 5.5, "font-bold text-2xl")}
                ${wrapRow("#jujurbosan #muakbesar", 7.0, "font-thin-custom italic")}
                <button onclick="next()" class="btn-wrapped">CONTINUE</button>
            `);
            break;

        case 11:
            const r = data.receipt;
            content = wrapper(`
                ${wrapRow("since u keep using my service, i guess... here's the receipt:", 1.5, "font-bold text-2xl")}
                
                <div id="receipt-box" class="bg-white text-black p-6 w-full max-w-[320px] shadow-2xl mt-8 mx-auto overflow-hidden opacity-0 border-2 border-gray-200"
                     style="transform: scaleY(0); transform-origin: top; transition: transform 1.5s cubic-bezier(0.1, 0.5, 0.5, 1), opacity 0.5s ease;">
                    
                    <div class="font-mono text-[10px] text-left uppercase tracking-tight">
                        <h3 class="text-center text-xl font-black mb-4 border-b-2 border-dashed border-black pb-2 italic">SERFICE RECEIPT</h3>
                        
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
                    ${wrapRow("congrats for becoming my loyal costumer!", 4.5, "font-bold text-xl")}
                    ${wrapRow("and thank you for still keeping me around <3", 5.8, "font-thin-custom italic")}
                </div>
                
                <button id="btn-receipt" onclick="next()" class="btn-wrapped mt-10 opacity-0 transition-opacity duration-700" style="transition-delay: 5.5s;">
                    CONTINUE
                </button>
            `);
            break;

        case 12:
            content = wrapper(`
                ${wrapRow("pstt, i still have some message for you:", 0.5, "font-bold text-2xl italic")}
                ${wrapRow("pls use earphone for better experience", 2.0, "font-thin-custom")}
                
                <div id="vn-container" class="opacity-0 translate-y-10 transition-all duration-1000 ease-out mt-8 w-full max-w-[320px] mx-auto">
                    
                    <div class="bg-white/20 backdrop-blur-md p-6 rounded-3xl border border-white/30 shadow-2xl relative overflow-hidden">
                        <div class="absolute bottom-0 left-0 h-1 bg-[#ff007f] transition-all duration-100 ease-linear" id="vn-progress" style="width: 0%;"></div>
                        
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-[#ff007f] rounded-full flex items-center justify-center animate-pulse">
                                <span class="text-white">▶</span>
                            </div>
                            <div class="flex-1 text-left">
                                <p class="text-xs font-bold text-white/90">BoysKissingASMR.mp3</p>
                                <p class="text-[10px] text-white/60 uppercase tracking-tighter">Playing Now...</p>
                            </div>
                        </div>
                    </div>

                    <audio id="vn-audio">
                        <source src="assets/vns/message.mp3" type="audio/mpeg">
                    </audio>
                </div>
                
                <button id="btn-final" onclick="next()" class="btn-wrapped mt-10 opacity-0 transition-opacity duration-700" style="transition-delay: 6s;">
                    FINAL STEP
                </button>
            `);
            break;

        case 13:
            content = wrapper(`
                <div class="relative inline-block scale-[2.2] mb-20">
                    <div id="flame" class="flame mb-2"></div>
                    <div class="text-8xl">🎂</div>
                    <div id="candle" class="absolute inset-0 cursor-pointer opacity-0 z-50"></div>
                </div>
                ${wrapRow("blow me <3", 1.8, "text-5xl font-black italic")}
            `);
            break;
    }

    container.innerHTML = content;

    setTimeout(() => {
        if (num === 2) {
            document.getElementById('text-anim').style.opacity = "1";
            animateValue('text-anim', 0, data.stats.textCount, 4000);
        }
        if (num === 10) {
            document.getElementById('hour-anim').style.opacity = "1";
            animateValue('hour-anim', 0, data.stats.hours, 4000);
        }
        if (num === 7) {
            const container7 = document.getElementById('top5Container');
            if (container7) {
                // 1. Munculkan container utama
                container7.classList.remove('opacity-0', 'translate-y-10');
                container7.classList.add('opacity-100', 'translate-y-0');
                
                // 2. Trigger semua Bar (delay ditangani oleh CSS transition-delay di atas)
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
            const btn = document.getElementById('btn-receipt');
            setTimeout(() => {
                if (receipt) {
                    receipt.style.opacity = "1";
                    receipt.style.transform = "scaleY(1)"; // Efek struk keluar/tumbuh ke bawah
                }
                if (btn) btn.style.opacity = "1";
            }, 2000); // Muncul setelah narasi pembuka selesai
        }
        if (num === 12) {
            const vnContainer = document.getElementById('vn-container');
            const audio = document.getElementById('vn-audio');
            const progress = document.getElementById('vn-progress');
            const btnFinal = document.getElementById('btn-final');

            setTimeout(() => {
                if (vnContainer) {
                    // 1. Munculkan kotak VN
                    vnContainer.classList.remove('opacity-0', 'translate-y-10');
                    vnContainer.classList.add('opacity-100', 'translate-y-0');
                    
                    // 2. Mainkan Audio (Pastikan browser mengizinkan auto-play)
                    audio.play().catch(err => console.log("Auto-play blocked, user interaction needed"));

                    // 3. Jalankan Progress Bar
                    audio.ontimeupdate = () => {
                        const percentage = (audio.currentTime / audio.duration) * 100;
                        if (progress) progress.style.width = percentage + "%";
                    };

                    // 4. Munculkan tombol final setelah audio selesai atau delay tertentu
                    audio.onended = () => {
                        if (btnFinal) btnFinal.style.opacity = "1";
                    };
                }
            }, 2500); // Delay agar muncul setelah narasi pertama selesai
        }
    }, 1800);
}