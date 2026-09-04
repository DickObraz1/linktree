// POST /api/statistiky  ->  vrátí souhrn kliků za zvolené období.
// Chráněno heslem uloženým v proměnné prostředí STATS_PASSWORD.

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return new Response('bad request', { status: 400 });
    }

    if (!env.STATS_PASSWORD || body.password !== env.STATS_PASSWORD) {
        return new Response(JSON.stringify({ error: 'Špatné heslo' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const allowedDays = [7, 30, 90];
    const days = allowedDays.includes(Number(body.days)) ? Number(body.days) : 7;
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const { results } = await env.DB.prepare(
        'SELECT link_id, bio_page, COUNT(*) as pocet FROM kliky WHERE cas >= ? GROUP BY link_id, bio_page'
    ).bind(cutoff).all();

    const perLinkMap = {};
    const perPageMap = {};

    for (const row of results) {
        // rozpad podle odkazu (bez pageview záznamů)
        if (row.link_id !== 'pageview') {
            perLinkMap[row.link_id] = (perLinkMap[row.link_id] || 0) + row.pocet;
        }

        // rozpad podle stránky
        if (!perPageMap[row.bio_page]) {
            perPageMap[row.bio_page] = { navstevy: 0, kliky: 0 };
        }
        if (row.link_id === 'pageview') {
            perPageMap[row.bio_page].navstevy += row.pocet;
        } else {
            perPageMap[row.bio_page].kliky += row.pocet;
        }
    }

    const perLink = Object.keys(perLinkMap)
        .map((linkId) => ({ link_id: linkId, pocet: perLinkMap[linkId] }))
        .sort((a, b) => b.pocet - a.pocet);

    const perPage = Object.keys(perPageMap)
        .map((bioPage) => {
            const p = perPageMap[bioPage];
            const ctr = p.navstevy > 0 ? (p.kliky / p.navstevy) * 100 : 0;
            return { bio_page: bioPage, navstevy: p.navstevy, kliky: p.kliky, ctr: Math.round(ctr * 10) / 10 };
        })
        .sort((a, b) => b.kliky - a.kliky);

    const totals = perPage.reduce(
        (acc, p) => ({ navstevy: acc.navstevy + p.navstevy, kliky: acc.kliky + p.kliky }),
        { navstevy: 0, kliky: 0 }
    );
    totals.ctr = totals.navstevy > 0 ? Math.round((totals.kliky / totals.navstevy) * 1000) / 10 : 0;

    return new Response(JSON.stringify({ days, perLink, perPage, totals }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
