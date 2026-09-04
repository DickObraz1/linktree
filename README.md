# DickObraz – rozcestník (odkazy.dickobraz.cz)

Tři stránky s odkazy pro tři profily:

| Soubor | Pro koho | Adresa po nasazení |
|---|---|---|
| `index.html` | Instagram @dickobraz.cz | `odkazy.dickobraz.cz` |
| `tomas.html` | Instagram @tomas.horych | `odkazy.dickobraz.cz/tomas` |
| `x.html` | profil na X.com | `odkazy.dickobraz.cz/x` |
| `statistiky.html` | jen pro tebe, za heslem | `odkazy.dickobraz.cz/statistiky` |

Obsah (nadpisy, popisky, seznam odkazů) se čte z `assets/config.js`. Styl je
v `assets/style.css`, chování (padající lilky, hra, měření, odesílání kliků)
v `assets/app.js`. Tyhle tři soubory jsou společné pro všechny stránky.

**Když chceš změnit jeden odkaz** (text, obrázek, cílovou URL), stačí upravit
příslušný řádek v `assets/config.js`. Nikdy neměň `id` u odkazu, který už
v configu je – podle něj se sčítají kliky, změna by ti rozbila srovnání
čísel v čase.

---

## 1. Přesun z GitHub Pages na Cloudflare Pages

Proč: chceme vlastní doménu, na které nikde není vidět slovo "github", a
zároveň potřebujeme vlastní počítadlo kliků (funguje i lidem se zapnutým
adblockem) – to GitHub Pages neumí, protože umí servírovat jen hotové
soubory, ne spouštět kód. Cloudflare Pages umí obojí a je zdarma.

Repo `dickobraz1/linktree` na GitHubu zůstává – jen se do něj přidá napojení
na Cloudflare, které při každém tvém pushi samo nasadí novou verzi.

**Poznámka k branchi:** nová verze stránek používá cesty ke stylům a
skriptům od kořene webu (`/assets/...`), což na současné adrese
`dickobraz1.github.io/linktree/` (podsložka) nefunguje – proto je zatím
v samostatné branchi **`cloudflare-migration`**, ne v `main`, aby se
nerozbila stránka, která teď běží naživo na GitHub Pages. Cloudflare Pages
níže napojíš rovnou na tuhle branch, takže `main` zůstane netknutá, dokud
sama nerozhodneš, že GitHub Pages vypínáš (krok 9).

### Postup krok za krokem

1. Jdi na [dash.cloudflare.com](https://dash.cloudflare.com) → v levém menu
   **Workers & Pages** → **Create** → záložka **Pages** → **Connect to Git**.
2. Vyber repo **linktree** (musíš mít Cloudflare propojený se svým GitHub
   účtem, pokud ještě nemáš, dashboard tě tím provede). V kroku výběru
   branche zvol **`cloudflare-migration`** jako Production branch (viz
   poznámka výše) – nebo, pokud chceš, si branch v GitHubu předtím sama
   sloučíš do `main` a necháš tam výchozí `main`.
3. V nastavení buildu nech:
   - **Framework preset:** `None`
   - **Build command:** necháš prázdné
   - **Build output directory:** `/` (kořen repa)
4. Klikni **Save and Deploy**. Za chvíli dostaneš dočasnou adresu typu
   `linktree-xxx.pages.dev` – tam se dá zkontrolovat, že to funguje, ještě
   než napojíš vlastní doménu.
5. V projektu jdi do **Custom domains** → **Set up a custom domain** →
   napiš `odkazy.dickobraz.cz` → potvrdit.
6. Cloudflare ti ukáže hodnotu pro CNAME (obvykle
   `<název-projektu>.pages.dev`, tedy nejspíš **`linktree.pages.dev`** –
   přesný název projektu ale zkontroluj nahoře v dashboardu, protože pokud
   ti Cloudflare při zakládání nabídl jiný název, bude se lišit).
7. **Teprve teď** jdi ke svému DNS poskytovateli (tam, kde spravuješ
   `dickobraz.cz`) a přidej nový záznam:
   - **Typ:** CNAME
   - **Název/Host:** `odkazy`
   - **Cíl/Value:** hodnota z kroku 6 (např. `linktree.pages.dev`)
   - Proxy/Cloudflare ikonka: pokud ti ji nabídne, klidně zapni (oranžový
     mráček) – jen pokud je tvoje doména nad Cloudflare DNS. Pokud DNS
     spravuje jiná firma, prostě ulož běžný CNAME záznam.
8. Počkej pár minut na propagaci. Cloudflare Pages ti u custom domain
   ukáže zelený stav, jakmile je vše v pořádku.

**Důležité:** Nameservery domény `dickobraz.cz` se nikam nestěhují a nic se
nemění pro eshop ani e-maily – přidáváš jen jeden nový CNAME záznam pro
subdoménu `odkazy`. Pořadí ale dodrž přesně: nejdřív doména v Cloudflare
Pages (krok 5), pak teprve CNAME u DNS poskytovatele (krok 7) – jinak se
subdoména neaktivuje.

9. Až `odkazy.dickobraz.cz` funguje a všechno sedí (viz checklist níže),
   jdi do starého nastavení GitHub Pages (repo → Settings → Pages) a
   vypni ho, ať neběží dvě verze webu vedle sebe.

Cesty ke stylům, skriptům a obrázkům (`/assets/...`) jsou v kódu psané od
kořene domény (začínají lomítkem), takže fungují stejně na
`odkazy.dickobraz.cz/` i na dřívějším `.../linktree/` – nic se tu nerozbije.

---

## 2. Vlastní počítadlo kliků (Cloudflare D1)

Proč vůbec vlastní počítadlo, když máme GA4 a Meta Pixel: oba blokuje
adblock a u návštěvnosti z Instagramu je to citelná část lidí. Počítadlo
běží na tvé vlastní doméně (`/api/klik`), takže ho blokátor nerozezná od
zbytku webu. GA4 a Pixel necháváme běžet dál (Pixel kvůli retargetingu),
ale **zdroj pravdy pro čísla je počítadlo**, ne GA4.

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
`/api/statistiky` je čte a `/statistiky` je zobrazuje za heslem.

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
   **Parametr události:** `bio_page` → Uložit.

Po pár hodinách sbíraní dat se rozpad podle odkazu i podle stránky objeví
v přehledech (Průzkumy → volná forma, s dimenzemi `link_id` / `bio_page`).
V **Realtime** přehledu bys měl(a) vidět událost `bio_click` s parametrem
`link_id` prakticky hned po prvním kliknutí na nasazené stránce.

---

## Hotovo, když

- [ ] `odkazy.dickobraz.cz` běží přes HTTPS a nikde se neobjeví slovo "github"
- [ ] po kliknutí na odkaz se se zapnutým adblockem přesto přičte klik
      v `/statistiky` (otestuj to schválně se zapnutým adblockem)
- [ ] `/statistiky` je za heslem a ukazuje rozpad podle odkazu i podle stránky
- [ ] všechny tři stránky fungují na mobilu, karty jsou čitelné i při
      zapnutém pohybu (lilci padají za textem, ne přes něj)
- [ ] po prokliku vidíš v adresním řádku eshopu `utm_source` a `utm_content`
- [ ] v GA4 v přehledu Realtime vidíš událost `bio_click` s parametrem `link_id`
- [ ] v Meta Events Manageru přistane `PageView` a `BioClick`
- [ ] změna jednoho odkazu = úprava jediného řádku v `assets/config.js`
- [ ] staré GitHub Pages je vypnuté
