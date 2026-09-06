(function () {
    'use strict';

    var page = document.body.getAttribute('data-page');
    var pageConfig = window.SITE_CONFIG.pages[page];
    if (!pageConfig) {
        console.error('Neznámá stránka: ' + page);
        return;
    }

    // Některé stránky (zatím jen X) mají víc jazykových variant obsahu -
    // "config" níže je vždy ta aktuálně vybraná (jazyková) verze.
    var LANG_KEY = 'dickobraz_bio_lang';
    var currentLang = null;
    if (pageConfig.languages) {
        currentLang = pageConfig.defaultLanguage;
        try {
            var savedLang = localStorage.getItem(LANG_KEY);
            if (savedLang && pageConfig.languages[savedLang]) currentLang = savedLang;
        } catch (e) {}
    }

    var config;
    function resolveConfig() {
        if (pageConfig.languages) {
            config = Object.assign({ utmCampaign: pageConfig.utmCampaign }, pageConfig.languages[currentLang]);
            document.documentElement.lang = currentLang;
        } else {
            config = pageConfig;
        }
    }
    resolveConfig();

    var TRACKED_HOSTS = [
        'dickobraz.cz', 'www.dickobraz.cz',
        'dickobraz.com', 'www.dickobraz.com',
        'kartybezcenzury.cz', 'www.kartybezcenzury.cz'
    ];
    var UTM_SOURCE = page === 'x' ? 'x' : 'instagram';

    // ---------- UTM ----------
    function withUtm(url, id) {
        var u;
        try {
            u = new URL(url, window.location.href);
        } catch (e) {
            return url;
        }
        if (TRACKED_HOSTS.indexOf(u.hostname) === -1) return url;
        u.searchParams.set('utm_source', UTM_SOURCE);
        u.searchParams.set('utm_medium', 'bio');
        u.searchParams.set('utm_campaign', config.utmCampaign);
        u.searchParams.set('utm_content', id);
        return u.toString();
    }

    // ---------- Session ID pro vlastní počítadlo ----------
    function getSessionId() {
        var key = 'dickobraz_bio_session';
        try {
            var s = sessionStorage.getItem(key);
            if (!s) {
                s = (window.crypto && crypto.randomUUID)
                    ? crypto.randomUUID()
                    : (Date.now().toString(36) + Math.random().toString(36).slice(2));
                sessionStorage.setItem(key, s);
            }
            return s;
        } catch (e) {
            return 'no-session-storage';
        }
    }

    function sendKlik(linkId) {
        var payload = JSON.stringify({ link_id: linkId, bio_page: page, session: getSessionId() });
        try {
            navigator.sendBeacon('/api/klik', new Blob([payload], { type: 'application/json' }));
        } catch (e) { /* tiché selhání, měření nesmí nic rozbít */ }
    }

    function trackClick(id) {
        try { if (window.fbq) fbq('trackCustom', 'BioClick', { odkaz: id, stranka: page }); } catch (e) {}
        try { if (window.gtag) gtag('event', 'bio_click', { link_id: id, bio_page: page }); } catch (e) {}
        sendKlik(id);
    }

    // ---------- Vykreslení obsahu ----------
    function el(tag, className, html) {
        var e = document.createElement(tag);
        if (className) e.className = className;
        if (html !== undefined) e.innerHTML = html;
        return e;
    }

    function renderHero(root) {
        var wrap = el('div', 'flex flex-col items-center mt-10 w-full max-w-md text-center relative bg-white/80 p-4 rounded-3xl backdrop-blur-sm shadow-sm');

        if (config.hero.image) {
            var imgWrap = el('div', 'relative');
            var img = el('img', 'rounded-full w-28 h-28 border-4 pink-border shadow-xl object-cover object-top');
            img.src = config.hero.image;
            img.alt = 'DickObraz';
            imgWrap.appendChild(img);
            var badge = el('div', 'absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md', '<span class="text-xl text-pink-500">🍆</span>');
            imgWrap.appendChild(badge);
            wrap.appendChild(imgWrap);
        }

        wrap.appendChild(el('h1', 'text-3xl font-extrabold mt-6 tracking-tight pink-text italic uppercase', config.hero.title));
        wrap.appendChild(el('p', 'text-gray-600 mt-3 text-sm leading-relaxed px-4', config.hero.description));

        root.appendChild(wrap);
    }

    function renderLangSwitch(root) {
        if (!pageConfig.languages) return;
        var wrap = el('div', 'flex gap-2 mt-4 relative');
        ['en', 'cs'].forEach(function (lang) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = lang.toUpperCase();
            var active = lang === currentLang;
            btn.className = 'px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide transition-colors ' +
                (active ? 'pink-bg text-white' : 'bg-gray-200 text-gray-500');
            btn.addEventListener('click', function () {
                if (currentLang === lang) return;
                currentLang = lang;
                try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
                resolveConfig();
                render();
            });
            wrap.appendChild(btn);
        });
        root.appendChild(wrap);
    }

    function discountBox(discount, color) {
        var box = el(
            'div',
            'text-white px-5 py-2.5 rounded-full shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 select-all cursor-pointer' +
                (color ? '' : ' discount-bg'),
            '<span class="font-semibold text-sm uppercase tracking-wide text-center">🎁 ' + discount.label +
                ': <strong class="text-white font-black text-base ml-1">' + discount.code + '</strong></span>'
        );
        if (color) box.style.backgroundColor = color;
        return box;
    }

    function renderDiscount(root) {
        if (!config.discount) return;
        root.appendChild(discountBox(config.discount));
    }

    function renderLinks(root) {
        var list = el('div', 'flex flex-col w-full max-w-md mt-10 space-y-4 relative');
        config.links.forEach(function (link) {
            var a = document.createElement('a');
            a.href = link.noUtm ? link.url : withUtm(link.url, link.id);
            a.target = '_blank';
            a.rel = 'noopener';
            a.className = 'group text-white p-2 rounded-full shadow-lg flex items-center transition-all duration-300 hover:scale-105 active:scale-95' +
                (link.color ? '' : ' pink-bg');
            if (link.color) a.style.backgroundColor = link.color;

            if (link.img) {
                var img = el('img', 'w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm group-hover:rotate-6 transition-transform');
                img.src = link.img;
                a.appendChild(img);
            }
            a.appendChild(el('span', 'font-bold text-base flex-grow text-center pr-8 uppercase tracking-wide', link.title));

            a.addEventListener('click', function () { trackClick(link.id); });
            list.appendChild(a);

            if (link.discount) {
                list.appendChild(discountBox(link.discount, link.color));
            }
        });
        root.appendChild(list);
    }

    function renderFooter(root) {
        if (config.footerLink) {
            var a = document.createElement('a');
            a.href = withUtm(config.footerLink.url, config.footerLink.id);
            a.target = '_blank';
            a.rel = 'noopener';
            a.className = 'mt-12 text-gray-400 hover:pink-text transition-colors font-medium text-sm border-b border-gray-200 pb-1 uppercase tracking-widest relative';
            a.textContent = config.footerLink.label;
            a.addEventListener('click', function () { trackClick(config.footerLink.id); });
            root.appendChild(a);
        }

        root.appendChild(el('footer', (config.footerLink ? 'mt-8' : 'mt-12') + ' pb-10 text-gray-300 text-[10px] uppercase tracking-tighter relative', 'Made by DickObraz © 2026'));
    }

    function render() {
        var root = document.getElementById('page-content');
        root.innerHTML = '';
        renderHero(root);
        renderLangSwitch(root);
        renderDiscount(root);
        renderLinks(root);
        renderFooter(root);
    }

    // ---------- Padající lilky + hra na naklánění ----------
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function createEggplantRain() {
        var container = document.getElementById('lilek-layer');
        if (!container) return;

        var isMobile = window.innerWidth <= 640;
        var bgCount = isMobile ? 25 : 100;
        var fgCount = isMobile ? 18 : 80;

        for (var i = 0; i < bgCount; i++) {
            var epBg = document.createElement('div');
            epBg.innerText = '🍆';
            epBg.className = 'falling-eggplant falling-eggplant-bg';
            epBg.style.left = Math.random() * 100 + 'vw';
            epBg.style.fontSize = Math.random() * 20 + 20 + 'px';
            epBg.style.animationDuration = Math.random() * 2.5 + 2.5 + 's';
            epBg.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(epBg);
            epBg.addEventListener('animationend', function () { this.remove(); });
        }

        for (var j = 0; j < fgCount; j++) {
            var epFg = document.createElement('div');
            epFg.innerText = '🍆';
            epFg.className = 'falling-eggplant falling-eggplant-fg';
            epFg.style.left = Math.random() * 100 + 'vw';
            epFg.style.fontSize = Math.random() * 30 + 40 + 'px';
            epFg.style.animationDuration = Math.random() * 1.5 + 1 + 's';
            epFg.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(epFg);
            epFg.addEventListener('animationend', function () { this.remove(); });
        }

        setTimeout(function () {
            var mainChar = document.getElementById('doodle-char');
            if (!mainChar) return;
            mainChar.style.opacity = '1';
            startMainGameLogic();
        }, 2500);
    }

    var doodle, posY = 0, posX = 0, targetPosX = 0, velocityY = 0;
    var gravity = 0.4, jumpStrength = -10, gameActive = false;

    function startMainGameLogic() {
        gameActive = true;
        update();
    }

    function update() {
        if (!gameActive) return;
        velocityY += gravity;
        posY += velocityY;
        if (posY > 0) { posY = 0; velocityY = jumpStrength * 0.6; }
        posX += (targetPosX - posX) * 0.1;
        var limit = (window.innerWidth / 2) - 40;
        posX = Math.max(-limit, Math.min(limit, posX));
        doodle.style.transform = 'translate(calc(-50% + ' + posX + 'px), ' + posY + 'px)';
        requestAnimationFrame(update);
    }

    function handleOrientation(event) {
        if (!gameActive) return;
        var tilt = event.gamma;
        targetPosX = tilt * 6;
    }

    window.requestGyroPermission = function () {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission().then(function (permissionState) {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                    document.getElementById('gyro-btn').style.display = 'none';
                }
            }).catch(function (error) { console.error(error); });
        } else {
            window.addEventListener('deviceorientation', handleOrientation);
            document.getElementById('gyro-btn').style.display = 'none';
        }
    };

    window.addEventListener('touchstart', function () { if (gameActive) velocityY = jumpStrength; });
    window.addEventListener('mousedown', function () { if (gameActive) velocityY = jumpStrength; });

    // ---------- Start ----------
    window.addEventListener('DOMContentLoaded', function () {
        render();
        doodle = document.getElementById('doodle-char');
        sendKlik('pageview');
        if (!reducedMotion) {
            createEggplantRain();
        }
    });
})();
