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
