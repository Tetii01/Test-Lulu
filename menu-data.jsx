// Menu data extracted from the printed menu image.
const MENU_DATA = [
  {
    id: "ciorbe",
    label: "Ciorbe",
    sub: "Soups",
    items: [
      { id: "ciorba-burta",  name: "Ciorbă de burtă",            en: "Tripe soup",              g: 400, price: 34 },
      { id: "ciorba-vacuta", name: "Ciorbă de văcuță",           en: "Beef soup",               g: 400, price: 34 },
      { id: "ciorba-grec",   name: "Ciorbă de pui à la grec",    en: "Greek style chicken soup",g: 400, price: 32 },
    ],
  },
  {
    id: "principal",
    label: "Fel Principal",
    sub: "Main Course",
    items: [
      { id: "crispy-pui",   name: "Crispy de pui",            en: "Crispy chicken with fries",                 g: 350, price: 52 },
      { id: "snitel-pui",   name: "Șnițel de pui",            en: "Chicken schnitzel with fries",              g: 350, price: 52 },
      { id: "piept-pui",    name: "Piept de pui la grătar",   en: "Grilled chicken breast, fries, veg",        g: 350, price: 58 },
      { id: "cordon-bleu",  name: "Cordon bleu",              en: "Chicken cordon bleu with fries",            g: 420, price: 58 },
      { id: "cascaval",     name: "Cașcaval pane",            en: "Breaded cheese with fries",                 g: 360, price: 52 },
      { id: "cotlet-porc",  name: "Cotlet de porc",           en: "Pork chop with fries and vegetables",       g: 350, price: 58 },
      { id: "carnaciori",   name: "Cârnăciori afumați",       en: "Smoked sausages with fries and veg",        g: 360, price: 59 },
      { id: "burger-angus", name: "Burger Black Angus",       en: "Black Angus beef burger with fries",        g: 450, price: 68 },
      { id: "mititei",      name: "Mititei Black Angus",      en: "Black Angus beef sausages (3 pcs)",         g: 360, price: 59 },
    ],
  },
  {
    id: "dulce",
    label: "Colțul Dulce",
    sub: "Sweet Corner",
    items: [
      { id: "apple-pie",          name: "Apple pie",                       en: "Apple pie",                            g: 135, price: 28 },
      { id: "lava-cake",          name: "Lava cake",                       en: "Molten chocolate lava cake",           g: 145, price: 27 },
      { id: "tort-salam",         name: "Tort salam de biscuiți",          en: "Biscuit salami cake",                  g: 120, price: 28 },
      { id: "papanasi",           name: "Papanași",                        en: "Romanian papanași",                    g: 400, price: 36 },
      { id: "coconut-cake",       name: "Coconut cake",                    en: "Coconut layer cake",                   g: 145, price: 29 },
      { id: "choco-mousse",       name: "Choco mousse mono",               en: "Chocolate mousse mono",                g: 120, price: 27 },
      { id: "berries-cheese",     name: "Berries cheesecake",              en: "Berries cheesecake",                   g: 148, price: 27 },
      { id: "melon-mousse",       name: "Melon mousse",                    en: "Melon mousse",                         g: 99,  price: 27 },
      { id: "carrot-cake",        name: "Carrot cake",                     en: "Carrot cake",                          g: 130, price: 29 },
      { id: "cherries-mono",      name: "Cherries cake mono",              en: "Cherries cake mono",                   g: 125, price: 29 },
      { id: "red-velvet",         name: "Red velvet cake",                 en: "Red velvet cake",                      g: 150, price: 32 },
      { id: "domme-mango",        name: "Domme mango passionfruit",        en: "Mango passionfruit dome",              g: 110, price: 32 },
      { id: "fashion-bw",         name: "Black & white chocolate",         en: "Fashion black & white chocolate",      g: 125, price: 29 },
      { id: "eclair-raspberry",   name: "Éclair raspberry chocolate",      en: "Raspberry white chocolate éclair",     g: 100, price: 28 },
      { id: "fashion-milk-banana",name: "Milk chocolate banana",           en: "Fashion milk chocolate banana",        g: 147, price: 28 },
      { id: "eclair-lavender",    name: "Éclair lavender",                 en: "Lavender éclair",                      g: 120, price: 29 },
      { id: "dubai-domme",        name: "Dubai chocolate dome",            en: "Dubai chocolate dome",                 g: 100, price: 32 },
      { id: "tiramisu-mono",      name: "Tiramisu mousse mono",            en: "Tiramisu mousse mono",                 g: 120, price: 27 },
      { id: "caramel-cake",       name: "Caramel cake",                    en: "Caramel cake",                         g: 100, price: 29 },
      { id: "eclair-berries",     name: "Éclair berries",                  en: "Fashion berries éclair",               g: 125, price: 28 },
    ],
  },
  {
    id: "suplimente",
    label: "Suplimente",
    sub: "Supplements",
    items: [
      { id: "sos-bbq",      name: "Sos barbeque",          en: "Barbeque sauce",   g: 50,  price: 5 },
      { id: "sos-usturoi",  name: "Sos usturoi",           en: "Garlic sauce",     g: 50,  price: 5 },
      { id: "sos-ketchup",  name: "Sos ketchup",           en: "Ketchup",          g: 50,  price: 5 },
      { id: "sos-maioneza", name: "Sos maioneză",          en: "Mayonnaise",       g: 50,  price: 5 },
      { id: "mustar",       name: "Muștar",                en: "Mustard",          g: 50,  price: 5 },
      { id: "paine",        name: "Pâine",                 en: "Bread",            g: 100, price: 5 },
      { id: "smantana",     name: "Smântână",              en: "Sour cream",       g: 50,  price: 5 },
      { id: "ardei-iute",   name: "Ardei iute",            en: "Hot pepper",       g: 0,   price: 5 },
    ],
  },
];

// Quick-add favorites (top of order section)
const QUICK_ADD = [
  "papanasi", "burger-angus", "ciorba-burta",
  "mititei", "red-velvet", "lava-cake",
  "tiramisu-mono", "apple-pie",
];

// Tiny SVG glyph per category, used as a tasteful placeholder for dish thumbnails
const DISH_GLYPH = {
  ciorbe: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M10 28h44l-3 18a8 8 0 0 1-8 7H21a8 8 0 0 1-8-7L10 28Z" />
      <path d="M22 22c0-4 4-4 4-8M32 22c0-4 4-4 4-8M42 22c0-4 4-4 4-8" />
    </svg>
  ),
  principal: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="32" cy="34" r="18" />
      <circle cx="32" cy="34" r="12" />
      <path d="M50 18L40 28M52 16l-4 4" />
    </svg>
  ),
  dulce: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M16 40h32v10a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V40Z" />
      <path d="M14 40h36l-3-10a6 6 0 0 0-6-5H23a6 6 0 0 0-6 5l-3 10Z" />
      <path d="M32 16v9M28 18l4 4 4-4" />
    </svg>
  ),
  suplimente: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="32" cy="32" r="14" />
      <path d="M32 22v20M22 32h20" />
    </svg>
  ),
};

window.MENU_DATA = MENU_DATA;
window.QUICK_ADD = QUICK_ADD;
window.DISH_GLYPH = DISH_GLYPH;
