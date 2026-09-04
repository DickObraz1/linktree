// Veškerý textový obsah tří stránek žije tady.
// Změna jednoho odkazu = úprava jednoho řádku níže.
// Pole "id" se používá do UTM parametrů a do měření kliků - NIKDY neměnit
// u existujících odkazů, jinak se rozbije srovnání dat v čase.
window.SITE_CONFIG = {
    pages: {
        // links.dickobraz.cz - mluví značka, ne osoba
        znacka: {
            utmCampaign: 'links-znacka',
            hero: {
                image: null,
                title: 'DickObraz',
                description: 'Originální omalovánky pro dospělé a karetní hra bez cenzury. Vyber si níže:'
            },
            discount: {
                code: 'TOMAS10',
                label: 'Sleva 10%'
            },
            links: [
                {
                    id: 'dickobraz',
                    title: 'Pinďouří omalovánky',
                    url: 'https://www.dickobraz.cz/p/omalovanky-pro-dospele-dickobraz#130',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/8/6/8665de3e9fe4ed1c2b39cffe27fd1dc8-dickobraz2.jpg'
                },
                {
                    id: 'odnasravaci',
                    title: 'Odnasrávací omalovánky',
                    url: 'https://www.dickobraz.cz/p/fuck-me-neser-odnasravaci-omalovanky',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/6/4/642844d74a4e70820355eb5558947663-obalka-fuck-me-neser.jpeg'
                },
                {
                    id: 'karty',
                    title: 'KARTY BEZ CENZURY',
                    url: 'https://www.dickobraz.cz/p/karty-proti-lidskosti',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/b/2/b29b894aebd730fc467116bbc3cb7321-sleva-100kc.png'
                }
            ],
            footerLink: {
                id: 'eshop',
                url: 'https://www.dickobraz.cz',
                label: 'www.dickobraz.cz'
            }
        },

        // tomas.dickobraz.cz - osobní profil Tomáše
        tomas: {
            utmCampaign: 'links-tomas',
            hero: {
                image: 'https://cc.cz/wp-content/uploads/2025/12/tomas-horych-mvp-x1.jpg',
                title: 'DickObraz',
                description: 'Tomáš alias <span class="font-bold text-gray-800 italic">DickObraz</span> je tvůrce originálních omalovánek a karetní hry. Vše můžeš získat níže:'
            },
            discount: {
                code: 'TOMAS10',
                label: 'Sleva 10%'
            },
            links: [
                {
                    id: 'rozhovor',
                    title: 'Rozhovor se mnou',
                    url: 'https://cc.cz/nemohl-sehnat-omalovanky-s-muzskym-prirozenim-tak-je-zacal-vyrabet-behem-par-dnu-prodal-tisic-kusu/',
                    img: 'https://cc.cz/wp-content/uploads/2025/12/tomas-horych-mvp-x1.jpg',
                    noUtm: true
                },
                {
                    id: 'dickobraz',
                    title: 'Pinďouří omalovánky',
                    url: 'https://www.dickobraz.cz/p/omalovanky-pro-dospele-dickobraz#130',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/8/6/8665de3e9fe4ed1c2b39cffe27fd1dc8-dickobraz2.jpg'
                },
                {
                    id: 'odnasravaci',
                    title: 'Odnasrávací omalovánky',
                    url: 'https://www.dickobraz.cz/p/fuck-me-neser-odnasravaci-omalovanky',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/6/4/642844d74a4e70820355eb5558947663-obalka-fuck-me-neser.jpeg'
                },
                {
                    id: 'karty',
                    title: 'KARTY BEZ CENZURY',
                    url: 'https://www.dickobraz.cz/p/karty-proti-lidskosti',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/b/2/b29b894aebd730fc467116bbc3cb7321-sleva-100kc.png'
                }
            ],
            footerLink: {
                id: 'eshop',
                url: 'https://www.dickobraz.cz',
                label: 'www.dickobraz.cz'
            }
        },

        // linkx.dickobraz.cz - jen dva odkazy, žádná sleva, žádný rozhovor
        x: {
            utmCampaign: 'linkx',
            hero: {
                image: null,
                title: 'DickObraz',
                description: 'Omalovánky pro dospělé, co se nikde neschovávají:'
            },
            discount: null,
            links: [
                {
                    id: 'dickobraz',
                    title: 'DickObraz omalovánky',
                    url: 'https://www.dickobraz.cz/p/omalovanky-pro-dospele-dickobraz#130',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/8/6/8665de3e9fe4ed1c2b39cffe27fd1dc8-dickobraz2.jpg'
                },
                {
                    id: 'fillmein',
                    title: 'FILL ME IN omalovánky',
                    url: 'https://www.dickobraz.cz/p/fill-me-in-gay-coloring-book',
                    img: ''
                }
            ],
            footerLink: null
        }
    }
};
