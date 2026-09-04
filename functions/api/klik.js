// POST /api/klik  ->  zapíše jeden klik (nebo pageview) do D1 tabulky "kliky".
// Neukládá IP ani nic, čím by šel identifikovat konkrétní člověk.

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return new Response('bad request', { status: 400 });
    }

    const linkId = typeof body.link_id === 'string' ? body.link_id.slice(0, 100) : '';
    const bioPage = typeof body.bio_page === 'string' ? body.bio_page.slice(0, 100) : '';
    const session = typeof body.session === 'string' ? body.session.slice(0, 200) : '';

    if (!linkId || !bioPage || !session) {
        return new Response('bad request', { status: 400 });
    }

    // Ochrana proti dvojkliku: stejné session + odkaz + stránka do 10s se ignoruje.
    // Session se nikam neukládá (do D1 ani jinam natrvalo) - jde jen o krátkodobý
    // záznam v edge cache, který sám zmizí po 10 vteřinách.
    const dedupKey = new Request(
        'https://dickobraz-dedup.internal/' +
        encodeURIComponent(session) + '/' +
        encodeURIComponent(linkId) + '/' +
        encodeURIComponent(bioPage)
    );
    const cache = caches.default;
    const alreadySeen = await cache.match(dedupKey);
    if (alreadySeen) {
        return new Response('ok', { status: 200 });
    }
    context.waitUntil(cache.put(dedupKey, new Response('1', {
        headers: { 'Cache-Control': 'max-age=10' }
    })));

    const cas = new Date().toISOString();
    const zeme = request.headers.get('cf-ipcountry') || null;
    const ua = request.headers.get('user-agent') || '';
    const mobil = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? 1 : 0;

    await env.DB.prepare(
        'INSERT INTO kliky (link_id, bio_page, cas, zeme, mobil) VALUES (?, ?, ?, ?, ?)'
    ).bind(linkId, bioPage, cas, zeme, mobil).run();

    return new Response('ok', { status: 200 });
}
