// Tři subdomény (links. / tomas. / linkx.) míří na tenhle jeden Cloudflare
// Pages projekt. Tahle funkce se podle Host hlavičky rozhodne, který
// HTML soubor pošle na kořen "/" dané domény - obsah tak zůstává v jednom
// repu a jedné sadě assets/api souborů, jen se servíruje jinak podle domény.
const HOST_TO_FILE = {
    'links.dickobraz.cz': '/index.html',
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
