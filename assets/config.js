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
            emailCapture: {
                id: 'email-slevy',
                title: 'Získej slevu 15% na nákup na dickobraz.cz',
                description: 'Vlož email a slevu ti pošlu na email.'
            },
            links: [
                {
                    id: 'dickobraz',
                    title: 'Pinďouří omalovánky',
                    url: 'https://www.dickobraz.cz/p/omalovanky-pro-dospele-dickobraz#130',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/6/c/6c4b132468fe78c4b21c948b9430718b-dickobraz2.jpg'
                },
                {
                    id: 'clanek-zuzka',
                    title: 'Článek se sexkoučkou Zuzkou',
                    url: 'https://www.dickobraz.cz/a/rozhovor-zuzana-kacvinska',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/5/f/5ff7cf756b66f117d4519ddb177c97ce-zuzka-kacvinska-sex-coach.jpg'
                },
                {
                    id: 'odnasravaci',
                    title: 'Odnasrávací omalovánky',
                    url: 'https://www.dickobraz.cz/p/fuck-me-neser-odnasravaci-omalovanky',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/e/9/e978fdf84f6dcbebc5dea5b8114e1db0-obalka-fuck-me-neser.jpeg'
                },
                {
                    id: 'karty',
                    title: 'KARTY BEZ CENZURY',
                    url: 'https://www.dickobraz.cz/p/karty-proti-lidskosti',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/8/a/8a6068bd9ddd13956110e6649ea8c518-karty-bez-cenzury-3000.png'
                },
                {
                    id: 'penis-puzzle',
                    title: 'Penis Puzzle',
                    url: 'https://www.dickobraz.cz/p/penis-puzzle-1000-dilku-pro-dospele',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/7/0/70685f785d18f04b557e0d4676b5179e-penispuzzle-chriss1.jpg'
                },
                {
                    id: 'kamasutra',
                    title: 'Kama Sutra omilovánky',
                    url: 'https://www.dickobraz.cz/p/kama-sutra-omilovanky',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/3/0/302dc96352cf9a22a8b8001f83027cca-obalka-cover-nova-kamasutra.jpeg'
                },
                {
                    id: 'bizar',
                    title: 'Bizarní omalovánky',
                    url: 'https://www.dickobraz.cz/p/bizar',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/7/a/7a02562f05482caf2e73c6da805483fc-be9bf781-25f4-42df-bf1d-d2bbd573a23b.jpeg'
                },
                {
                    id: 'hrnky',
                    title: 'HRNKY',
                    url: 'https://www.dickobraz.cz/search?phrase=hrnek',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/8/1/81ddc3122c49b818c07be793f86cadbe-alpha-male-hrnek.png'
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
            emailCapture: {
                id: 'email-slevy',
                title: 'Získej slevu 15% na nákup na dickobraz.cz',
                description: 'Vlož email a slevu ti pošlu na email.'
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
                    id: 'detska-kniha',
                    title: 'Vydal jsem dětskou knížku',
                    url: 'https://www.kosmas.cz/knihy/552028/laska-na-vsech-tlapkach/',
                    img: 'https://obalky.kosmas.cz/ArticleCovers/552/028_bg.jpg',
                    color: '#E2917E',
                    noUtm: true
                },
                {
                    id: 'dickobraz',
                    title: 'Pinďouří omalovánky',
                    url: 'https://www.dickobraz.cz/p/omalovanky-pro-dospele-dickobraz#130',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/6/c/6c4b132468fe78c4b21c948b9430718b-dickobraz2.jpg'
                },
                {
                    id: 'odnasravaci',
                    title: 'Odnasrávací omalovánky',
                    url: 'https://www.dickobraz.cz/p/fuck-me-neser-odnasravaci-omalovanky',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/e/9/e978fdf84f6dcbebc5dea5b8114e1db0-obalka-fuck-me-neser.jpeg'
                },
                {
                    id: 'karty',
                    title: 'KARTY BEZ CENZURY',
                    url: 'https://www.dickobraz.cz/p/karty-proti-lidskosti',
                    img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/8/a/8a6068bd9ddd13956110e6649ea8c518-karty-bez-cenzury-3000.png'
                },
                {
                    id: 'symprove',
                    title: 'SYMPROVE probiotika',
                    url: 'https://www.symprove.cz/',
                    img: 'https://www.symprove.cz/cdn/shop/files/file_transparent_final_256x256.png?v=1732180765',
                    color: '#00CFB4',
                    discount: {
                        code: 'TOMAS15',
                        label: 'Sleva 15%'
                    }
                }
            ],
            footerLink: {
                id: 'eshop',
                url: 'https://www.dickobraz.cz',
                label: 'www.dickobraz.cz'
            }
        },

        // linkx.dickobraz.cz - jen dva odkazy, žádná sleva, žádný rozhovor.
        // Na X chodí i lidi ze zahraničí, proto má tahle stránka navíc
        // přepínač jazyka (ENG je výchozí, vede na dickobraz.com).
        x: {
            utmCampaign: 'linkx',
            defaultLanguage: 'en',
            languages: {
                en: {
                    hero: {
                        image: null,
                        title: 'DickObraz',
                        description: 'Adult coloring books that don’t hide from anyone:'
                    },
                    discount: null,
                    links: [
                        {
                            id: 'dickobraz',
                            title: 'DickObraz coloring book',
                            url: 'https://www.dickobraz.com/p/dickobraz-the-adult-coloring-book-full-of-dicks',
                            img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/6/c/6c4b132468fe78c4b21c948b9430718b-dickobraz2.jpg'
                        },
                        {
                            id: 'fillmein',
                            title: 'FILL ME IN coloring book',
                            url: 'https://www.dickobraz.com/p/fill-me-in-gay-coloring-book',
                            img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/a/9/a9c06d6916e4f191c868a289aac780e9-fill-me-in-titulka.jpg'
                        }
                    ],
                    footerLink: null
                },
                cs: {
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
                            img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/6/c/6c4b132468fe78c4b21c948b9430718b-dickobraz2.jpg'
                        },
                        {
                            id: 'fillmein',
                            title: 'FILL ME IN omalovánky',
                            url: 'https://www.dickobraz.cz/p/fill-me-in-gay-coloring-book',
                            img: 'https://dickobraz-cz.s51.cdn-upgates.com/_cache/a/9/a9c06d6916e4f191c868a289aac780e9-fill-me-in-titulka.jpg'
                        }
                    ],
                    footerLink: null
                }
            }
        }
    }
};
