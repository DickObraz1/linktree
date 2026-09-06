// Tři subdomény (links. / tomas. / linkx.) míří na tenhle jeden Cloudflare
// Pages projekt. Tahle funkce se podle Host hlavičky rozhodne, který
// HTML soubor pošle na kořen "/" dané domény - obsah tak zůstává v jednom
// repu a jedné sadě assets/api souborů, jen se servíruje jinak podle domény.
//
// links.dickobraz.cz tu záměrně není - index.html se na "/" servíruje
// jako výchozí soubor i bez přepisu. Kdyby se sem přidal, Cloudflare
// Pages přesměruje "/index.html" zpátky na "/" (kanonická URL) a vznikne
// nekonečná smyčka přesměrování - přesně tenhle bug tu předtím byl.
const HOST_TO_FILE = {
    'tomas.dickobraz.cz': '/tomas.html',
    'linkx.dickobraz.cz': '/x.html'
};

export async function onRequest(context) {
    const { request, env, next } = context;
    const url = new URL(request.url);
    const target = HOST_TO_FILE[url.hostname];

    if (target && url.pathname === '/') {
        url.pathname = target;
        return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    return next();
}
