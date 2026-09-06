# DickObraz – rozcestníky pro sociální sítě

Tři samostatné stránky, každá na vlastní subdoméně:

| Soubor | Pro koho | Adresa po nasazení |
|---|---|---|
| `index.html` | Instagram @dickobraz.cz | `links.dickobraz.cz` |
| `tomas.html` | Instagram @tomas.horych | `tomas.dickobraz.cz` |
| `x.html` | profil na X.com | `linkx.dickobraz.cz` |
| `statistiky.html` | jen pro tebe, za heslem | `links.dickobraz.cz/statistiky` |

Všechny tři domény jedou z **jednoho** Cloudflare Pages projektu a jednoho
repa – nejsou to tři oddělené weby, jen se podle toho, na jakou doménu
někdo přijde, pošle jiný soubor (viz `functions/_middleware.js` níže).
Díky tomu je pořád jen jeden `assets/style.css`, jeden `assets/app.js` a
jedna databáze kliků pro všechno.

Obsah (nadpisy, popisky, seznam odkazů) se čte z `assets/config.js`. Styl je
v `assets/style.css`, chování (padající lilky, hra, měření, odesílání kliků)
v `assets/app.js`.

**Když chceš změnit jeden odkaz** (text, obrázek, cílovou URL), stačí upravit
příslušný řádek v `assets/config.js`. Nikdy neměň `id` u odkazu, který už
v configu je – podle něj se sčítají kliky, změna by ti rozbila srovnání
čísel v čase.

---

## 1. Přesun z GitHub Pages na Cloudflare Pages

Proč: chceme vlastní domény, na kterých nikde není vidět slovo "github", a
zároveň potřebujeme vlastní počítadlo kliků (funguje i lidem se zapnutým
adblockem) – to GitHub Pages neumí, protože umí servírovat jen hotové
soubory, ne spouštět kód. Cloudflare Pages umí obojí a je zdarma.

Repo `dickobraz1/linktree` na GitHubu zůstává – jen se do něj přidá napojení
na Cloudflare, které při každém tvém pushi samo nasadí novou verzi na
všechny tři domény najednou.

**Poznámka k branchi:** nová verze stránek používá cesty ke stylům a
skriptům od kořene webu (`/assets/...`), což na současné adrese
`dickobraz1.github.io/linktree/` (podsložka) nefunguje – proto je zatím
v samostatné branchi **`cloudflare-migration`**, ne v `main`, aby se
nerozbila stránka, která teď běží naživo na GitHub Pages. Cloudflare Pages
je napojený rovnou na tuhle branch, takže `main` zůstane netknutá, dokud
sama nerozhodneš, že GitHub Pages vypínáš (poslední krok níže).

### Jak funguje rozdělení na tři domény

Cloudflare Pages umí na jeden projekt navěsit víc vlastních domén – všechny
ale servírují stejný nasazený obsah. Aby `links.dickobraz.cz` ukázal
`index.html`, `tomas.dickobraz.cz` zase `tomas.html` a `linkx.dickobraz.cz`
`x.html`, se o to stará soubor `functions/_middleware.js`: podívá se, na
jakou doménu požadavek přišel (`Host` hlavička), a podle toho pošle
odpovídající soubor na `/`. Tohle je součástí kódu a všechny tři domény už
jsou v Cloudflare u projektu přidané (viz níže) – zbývá jen doladit DNS.

### Postup krok za krokem

1. ✅ **Hotovo.** Projekt **linktree** je vytvořený v Cloudflare Pages
   (Workers & Pages → linktree), napojený na GitHub repo
   `DickObraz1/linktree`, **Production branch: `cloudflare-migration`**,
   Framework preset `None`, build command prázdný, build output directory
   kořen (`/`).
2. ✅ **Hotovo.** Projekt je nasazený, dočasná adresa je
   **`linktree-9hv.pages.dev`** (Cloudflare k názvu `linktree` přidal
   náhodný přívlastek `-9hv`, protože takhle to teď dělá vždycky - to je
   v pořádku, nic to neovlivňuje). Na téhle `.pages.dev` adrese uvidíš vždy
   `index.html`, protože middleware rozlišuje jen tři konkrétní domény
   níže.
3. ✅ **Hotovo.** V projektu, v **Custom domains**, jsou přidané všechny tři:
   `links.dickobraz.cz`, `tomas.dickobraz.cz`, `linkx.dickobraz.cz`. Zatím
   ukazují stav "Inactive (Requires DNS setup)" - to se změní, až přidáš
   CNAME záznamy v kroku 7.
4. Hodnota pro CNAME cíl je pro všechny tři domény stejná:
   **`linktree-9hv.pages.dev`**.
5. **Tohle zbývá udělat:** jdi do administrace **Wedosu** (tam máš `dickobraz.cz`
   zaregistrovanou a tam se spravuje i DNS – nameservery zůstávají u
   Wedosu, nikam se nestěhují) a přidej tři CNAME záznamy. Ve
   WedosGlobalPanelu: **Domény** → klikni na `dickobraz.cz` → **DNS
   záznamy** (případně "Editace DNS") → **Přidat záznam**, třikrát:
   - **Typ:** CNAME, **Název/Host:** `links`, **Hodnota/Cíl:** `linktree-9hv.pages.dev`
   - **Typ:** CNAME, **Název/Host:** `tomas`, **Hodnota/Cíl:** `linktree-9hv.pages.dev`
   - **Typ:** CNAME, **Název/Host:** `linkx`, **Hodnota/Cíl:** `linktree-9hv.pages.dev`
   - TTL nech na výchozí hodnotě. Pokud tě Wedos nutí zadat cíl jako
     plně kvalifikovanou doménu (FQDN) s tečkou na konci
     (`linktree-9hv.pages.dev.`), přidej tu tečku – jinak ji tam nedávej.
   - Žádnou "Cloudflare proxy" (oranžový mráček) tu nehledej – ta se
     objevuje jen když DNS zónu spravuje přímo Cloudflare, což tady
     není tenhle případ. Obyčejný CNAME záznam stačí.
6. Počkej pár minut až hodin na propagaci (Wedos i Cloudflare píšou až 24–48
   hodin, obvykle to bývá rychlejší). Cloudflare Pages ti u každé custom
   domain přepne stav z "Inactive" na zelený "Active", jakmile je vše
   v pořádku.

**Důležité:** Nameservery domény `dickobraz.cz` se nikam nestěhují a nic se
nemění pro eshop ani e-maily – přidáváš jen tři nové CNAME záznamy pro
subdomény `links`, `tomas` a `linkx`.

7. Až všechny tři domény fungují a všechno sedí (viz checklist níže), jdi
   do starého nastavení GitHub Pages (repo → Settings → Pages) a vypni ho,
   ať neběží dvě verze webu vedle sebe.

Cesty ke stylům, skriptům a obrázkům (`/assets/...`) jsou v kódu psané od
kořene domény (začínají lomítkem), takže fungují stejně na všech třech
doménách – nic se tu nerozbije.

---

## 2. Vlastní počítadlo kliků (Cloudflare D1)

Proč vůbec vlastní počítadlo, když máme GA4 a Meta Pixel: oba blokuje
adblock a u návštěvnosti z Instagramu je to citelná část lidí. Počítadlo
běží na tvých vlastních doménách (`/api/klik`), takže ho blokátor
nerozezná od zbytku webu. GA4 a Pixel necháváme běžet dál (Pixel kvůli
retargetingu), ale **zdroj pravdy pro čísla je počítadlo**, ne GA4.

Protože všechny tři domény jedou z jednoho Cloudflare Pages projektu, mají
i společnou D1 databázi – statistiky ze všech tří profilů uvidíš pohromadě
na `links.dickobraz.cz/statistiky`, s rozpadem podle stránky (`znacka` /
`tomas` / `x`).

### Založení D1 databáze

Budeš potřebovat [Node.js](https://nodejs.org) nainstalovaný v počítači a
terminál. V terminálu, ve složce s tímto repem, spusť:

```bash
npx wrangler login
```

Otevře se prohlížeč, přihlas se ke Cloudflare účtu a odsouhlas přístup.
Pak vytvoř databázi:

```bash
npx wrangler d1 create dickobraz-linktree
```

Příkaz vypíše blok s `database_id` – ten si zkopíruj, bude se hodit, kdybys
někdy chtěl(a) napojení dělat přes `wrangler.toml` místo dashboardu.

Vytvoř tabulku podle `schema.sql` (je součástí tohoto repa):

```bash
npx wrangler d1 execute dickobraz-linktree --remote --file=./schema.sql
```

### Napojení databáze na Pages projekt (klikáním v Cloudflare)

1. Cloudflare dashboard → **Workers & Pages** → projekt **linktree** →
   **Settings** → **Functions**.
2. Sekce **D1 database bindings** → **Add binding**.
3. **Variable name:** `DB` (přesně takhle, kód v `functions/api/klik.js`
   ho pod tímto jménem očekává) → **D1 database:** vyber
   `dickobraz-linktree` → **Save**.
4. Po uložení je potřeba udělat nový deploy (stačí prázdný commit nebo
   počkat na další push), aby se binding projevil.

### Heslo pro `/statistiky`

1. Stejná obrazovka **Settings** → sekce **Environment variables**.
2. **Add variable** → název `STATS_PASSWORD`, hodnota = heslo, které si
   zvolíš → zaškrtni **Encrypt** (aby nebylo vidět v čitelné podobě) →
   **Save**.
3. Znovu nasadit (stejně jako u D1 bindingu).

Tímhle je počítadlo funkční: `/api/klik` zapisuje kliky a návštěvy do D1,
`/api/statistiky` je čte a `links.dickobraz.cz/statistiky` je zobrazuje za
heslem.

---

## 3. Měření – co je potřeba zapnout v GA4

Kód sám posílá vlastní událost `bio_click` s parametry `link_id` a
`bio_page`, jenže dokud GA4 neví, že má tyhle parametry ukazovat jako
"vlastní dimenze", uvidíš v přehledech jen souhrnné číslo bez rozpadu na
jednotlivé odkazy. Zapni si to hned po nasazení – data se sbírají až od
okamžiku zapnutí, zpětně ne.

1. GA4 → **Správce** (ozubené kolo dole vlevo) → sloupec **Vlastnost** →
   **Vlastní definice** → **Vytvořit vlastní dimenzi**.
2. První dimenze: **Název dimenze:** `link_id`, **Rozsah:** Událost,
   **Parametr události:** `link_id` → Uložit.
3. Zopakuj pro druhou: **Název dimenze:** `bio_page`, **Rozsah:** Událost,
   **Parametr události:** `bio_page` → Uložit. Tahle dimenze ti navíc
   ukáže rozpad podle domény/profilu (`znacka` = links., `tomas` = tomas.,
   `x` = linkx.), protože tři různé domény teď nahrazují to, co dřív byly
   tři cesty na jedné doméně.

Po pár hodinách sbíraní dat se rozpad podle odkazu i podle stránky objeví
v přehledech (Průzkumy → volná forma, s dimenzemi `link_id` / `bio_page`).
V **Realtime** přehledu bys měl(a) vidět událost `bio_click` s parametrem
`link_id` prakticky hned po prvním kliknutí na nasazené stránce.

Cross-domain linker v `gtag('config', ...)` je nastavený na všechny tři
nové domény (`links.dickobraz.cz`, `tomas.dickobraz.cz`,
`linkx.dickobraz.cz`) plus eshop, takže GA4 pozná návštěvníka i po
prokliku z rozcestníku na eshop.

---

## Hotovo, když

- [ ] `links.dickobraz.cz`, `tomas.dickobraz.cz` i `linkx.dickobraz.cz` běží
      přes HTTPS a nikde se neobjeví slovo "github"
- [ ] každá doména ukazuje správný obsah (links. = značka, tomas. =
      osobní profil, linkx. = dva odkazy pro X)
- [ ] po kliknutí na odkaz se se zapnutým adblockem přesto přičte klik
      v `/statistiky` (otestuj to schválně se zapnutým adblockem)
- [ ] `links.dickobraz.cz/statistiky` je za heslem a ukazuje rozpad podle
      odkazu i podle stránky (znacka/tomas/x)
- [ ] všechny tři stránky fungují na mobilu, karty jsou čitelné i při
      zapnutém pohybu (lilci padají za textem, ne přes něj)
- [ ] po prokliku vidíš v adresním řádku eshopu `utm_source` a `utm_content`
- [ ] v GA4 v přehledu Realtime vidíš událost `bio_click` s parametrem `link_id`
- [ ] v Meta Events Manageru přistane `PageView` a `BioClick`
- [ ] změna jednoho odkazu = úprava jediného řádku v `assets/config.js`
- [ ] staré GitHub Pages je vypnuté
