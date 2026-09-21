// POST /api/subscribe  ->  přidá email do Ecomailu (list + tag) podle toho,
// ze které bio stránky přišel požadavek. List a tag jsou napevno v mapě
// níže (klient si je nevybírá sám), aby si nikdo zvenčí nemohl zkusit
// zapsat email do jiného seznamu / s jiným tagem.
//
// Ecomail API klíč čte z proměnné prostředí ECOMAIL_API_KEY (Ecomail ->
// Nastavení -> Integrace -> API klíč) - nastavuje se stejně jako
// STATS_PASSWORD, viz README. Nikdy se neposílá na klienta.
//
// V samotném Ecomailu ještě potřebuješ mít nastavenou automatizaci pro
// každý tag (TOMAS_IG, DICKOBRAZ_IG - viz mapa níže), která pošle email
// se slevovým kódem - to už tenhle kód nedělá, jen předá kontakt dál.

const PAGE_TO_ECOMAIL = {
    tomas: { listId: 4, tag: 'TOMAS_IG' },
    znacka: { listId: 4, tag: 'DICKOBRAZ_IG' }
};

function isValidEmail(email) {
    return typeof email === 'string' && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function onRequestPost(context) {
    const { request, env } = context;

    let body;
    try {
        body = await request.json();
    } catch (e) {
        return new Response('bad request', { status: 400 });
    }

    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const bioPage = typeof body.bio_page === 'string' ? body.bio_page : '';
    const target = PAGE_TO_ECOMAIL[bioPage];

    if (!target || !isValidEmail(email)) {
        return new Response(JSON.stringify({ error: 'Neplatný email' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (!env.ECOMAIL_API_KEY) {
        return new Response(JSON.stringify({ error: 'Server není nastavený (chybí ECOMAIL_API_KEY)' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let ecomailRes;
    try {
        ecomailRes = await fetch('https://api2.ecomailapp.cz/lists/' + target.listId + '/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                key: env.ECOMAIL_API_KEY
            },
            body: JSON.stringify({
                subscriber_data: {
                    email: email,
                    tags: [target.tag]
                },
                update_existing: true,
                resubscribe: true,
                trigger_autoresponders: true,
                skip_confirmation: true
            })
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Ecomail nedostupný' }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (!ecomailRes.ok) {
        return new Response(JSON.stringify({ error: 'Ecomail odmítl požadavek' }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
