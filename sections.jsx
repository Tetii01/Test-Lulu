// ===================== NAV =====================
function Nav({ theme, toggleTheme, cartCount, onCart, onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  const links = [
    { id: "meniu",     ro: "Meniu",      en: "The Menu" },
    { id: "ambient",   ro: "Ambient",    en: "Atmosphere" },
    { id: "rezervari", ro: "Rezervări",  en: "Reservations" },
    { id: "comanda",   ro: "Comandă",    en: "Order Online" },
    { id: "contact",   ro: "Contact",    en: "Find Us" },
  ];

  const handleNav = (id) => {
    setOpen(false);
    setTimeout(() => onNav(id), 80);
  };

  return (
    <React.Fragment>
      <nav className={"nav" + (scrolled || open ? " scrolled" : "")}>
        <div className="wrap nav-inner">
          <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); handleNav("top"); }}>
            <span className="brand-mark">X</span>
            <span className="brand-name">
              <span>Sweets &amp; Coffee</span>
              <small>by Traxilvania</small>
            </span>
          </a>
          <div className="nav-links">
            {links.map((l) => (
              <a key={l.id} href={"#" + l.id} className="nav-link"
                 onClick={(e) => { e.preventDefault(); handleNav(l.id); }}>
                {l.ro}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <button className="cart-btn" onClick={onCart} aria-label="Coș">
              <Icon.Cart style={{ width: 16, height: 16 }} />
              <span style={{ display: "none" }} className="cart-label">Coș</span>
              <span className={"count" + (cartCount === 0 ? " empty" : "")}>{cartCount}</span>
            </button>
            <button className="hamb" onClick={() => setOpen((v) => !v)} aria-label="Meniu">
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className="drawer" aria-hidden={!open}>
        {links.map((l) => (
          <a key={l.id} href={"#" + l.id}
             onClick={(e) => { e.preventDefault(); handleNav(l.id); }}>
            {l.ro}
            <small>{l.en}</small>
          </a>
        ))}
      </div>
    </React.Fragment>
  );
}

// ===================== HERO =====================
function Hero({ onReserve, onMenu }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" style={{ backgroundImage: "url(images/hero-2.jpeg)" }}></div>
      <div className="hero-overlay"></div>
      <div className="wrap hero-content">
        <div className="hero-eyebrow eyebrow reveal">
          <span className="dot"></span> În inima Apusenilor · 1450 m altitudine
        </div>
        <h1 className="reveal" data-delay="1">
          O pauză<br />
          <em>între nori.</em>
        </h1>
        <p className="lead reveal" data-delay="2">
          X Sweets &amp; Coffee by Traxilvania este refugiul tău montan — grătar pe lemne,
          cafea de specialitate și o vitrină de patiserie creată zi de zi, sus pe creasta munților.
        </p>
        <div className="hero-actions reveal" data-delay="3">
          <button className="btn btn-primary" onClick={onReserve}>
            Rezervă o masă <Icon.Arrow style={{ width: 14, height: 14 }} />
          </button>
          <button className="btn btn-ghost" onClick={onMenu}>
            Vezi meniul
          </button>
        </div>
      </div>
      <div className="wrap hero-meta">
        <div className="hero-meta-row">
          <div className="scroll-cue">
            <span className="line"></span>
            <span>Derulează</span>
          </div>
          <div>Munții Apuseni · România</div>
        </div>
      </div>
    </section>
  );
}

// ===================== MENU =====================
function DishCard({ item, cat, inCart, onAdd }) {
  return (
    <article className="dish reveal">
      <div className="dish-img">
        <div className="placeholder">
          {window.DISH_GLYPH[cat] || window.DISH_GLYPH.principal}
        </div>
      </div>
      <div>
        <div className="dish-head">
          <h3 className="dish-name">{item.name}</h3>
          <span className="dish-price">{item.price} <small style={{ fontSize: 11, letterSpacing: "0.1em" }}>RON</small></span>
        </div>
        <div className="dish-sub" style={{ marginTop: 6 }}>
          {item.en}{item.g ? ` · ${item.g}g` : ""}
        </div>
      </div>
      <button className={"dish-add" + (inCart ? " added" : "")} onClick={() => onAdd(item.id)}>
        {inCart ? <React.Fragment><Icon.Check style={{ width: 12, height: 12 }} /> Adăugat</React.Fragment>
                : <React.Fragment><Icon.Plus style={{ width: 12, height: 12 }} /> Adaugă</React.Fragment>}
      </button>
    </article>
  );
}

function MenuSection({ cart, onAdd }) {
  const [active, setActive] = React.useState("principal");
  const cat = window.MENU_DATA.find((c) => c.id === active);
  return (
    <section className="section" id="meniu">
      <div className="wrap">
        <div className="section-header">
          <div className="reveal">
            <div className="eyebrow"><span className="dot"></span> 01 · Meniul Casei</div>
            <h2 className="section-title">
              Bucate <em>cu poveste,</em><br />făcute aici, sus.
            </h2>
          </div>
          <p className="section-intro reveal" data-delay="1">
            Tradiție românească rafinată și o vitrină de patiserie în care fiecare desert
            este o mică operă. Ingrediente locale, foc viu, gust autentic — pregătite zilnic,
            la peste 1400 de metri altitudine.
          </p>
        </div>

        <div className="menu-tabs reveal">
          {window.MENU_DATA.map((c) => (
            <button key={c.id}
              className={"menu-tab" + (active === c.id ? " active" : "")}
              onClick={() => setActive(c.id)}>
              {c.label}
              <span className="count">{String(c.items.length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="menu-grid" key={active}>
          {cat.items.map((item, i) => (
            <DishCard
              key={item.id}
              item={item}
              cat={active}
              inCart={!!cart[item.id]}
              onAdd={onAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== AMBIENT GALLERY =====================
function Ambient() {
  return (
    <section className="ambient section" id="ambient">
      <div className="wrap">
        <div className="section-header">
          <div className="reveal">
            <div className="eyebrow"><span className="dot"></span> 02 · Ambient</div>
            <h2 className="section-title">
              Terasa noastră, <em>printre brazi.</em>
            </h2>
          </div>
          <p className="section-intro reveal" data-delay="1">
            Lemn cald, umbrele albe și priveliște nesfârșită spre creasta munților. Vino la apus
            pentru o cafea sau la prânz pentru o porție de papanași — locația vorbește singură.
          </p>
        </div>
        <div className="gallery">
          <div className="g-item g1 reveal"><img src="images/hero-1.jpeg" alt="Terasa cu umbrele Peroni" loading="lazy" /></div>
          <div className="g-item g2 reveal" data-delay="1"><img src="images/hero-3.jpeg" alt="Vedere panoramică terasă" loading="lazy" /></div>
          <div className="g-item g3 reveal" data-delay="2"><img src="images/hero-2.jpeg" alt="Cabana din Apuseni" loading="lazy" /></div>
        </div>
      </div>
    </section>
  );
}

// ===================== RESERVATION =====================
function Field({ id, label, type = "text", value, onChange, required = true, autoComplete }) {
  return (
    <div className={"field" + (value ? " filled" : "")}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function SelectField({ id, label, value, onChange, options }) {
  return (
    <div className={"field filled"}>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <label htmlFor={id}>{label}</label>
      <span className="chev"><Icon.Chev style={{ width: 16, height: 16 }} /></span>
    </div>
  );
}

function ReservationForm() {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = React.useState({
    name: "", phone: "", date: today, time: "19:00", people: "2",
  });
  const [done, setDone] = React.useState(false);
  const set = (k) => (v) => setForm((s) => ({ ...s, [k]: v }));

  const times = [];
  for (let h = 11; h <= 22; h++) {
    for (let m of [0, 30]) {
      const t = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
      times.push({ value: t, label: t });
    }
  }
  const people = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1), label: `${i + 1} ${i === 0 ? "persoană" : "persoane"}`,
  }));

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => setDone(false), 6000);
  };

  return (
    <div className="panel" id="rezervari-panel">
      <div className="eyebrow"><span className="dot"></span> 03 · Rezervări</div>
      <h3>Rezervă-ți masa.</h3>
      <p className="sub">Răspundem prin telefon în maxim 30 de minute pentru confirmare.</p>
      <form onSubmit={submit}>
        <div className="form-row">
          <Field id="r-name" label="Nume complet" value={form.name} onChange={set("name")} autoComplete="name" />
        </div>
        <div className="form-row two" style={{ marginTop: 16 }}>
          <Field id="r-phone" label="Telefon" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
          <SelectField id="r-people" label="Nr. persoane" value={form.people} onChange={set("people")} options={people} />
        </div>
        <div className="form-row two" style={{ marginTop: 16 }}>
          <Field id="r-date" label="Data" type="date" value={form.date} onChange={set("date")} />
          <SelectField id="r-time" label="Ora" value={form.time} onChange={set("time")} options={times} />
        </div>
        <button type="submit" className="btn btn-primary form-submit">
          Trimite rezervarea <Icon.Arrow style={{ width: 14, height: 14 }} />
        </button>
        {done && (
          <div className="confirm">
            <Icon.Check style={{ width: 18, height: 18 }} />
            Mulțumim, {form.name || "draga noastră"}. Te sunăm pentru confirmare.
          </div>
        )}
      </form>
    </div>
  );
}

// ===================== CART / ORDER =====================
function flatItems() {
  const map = {};
  window.MENU_DATA.forEach((c) => c.items.forEach((i) => { map[i.id] = { ...i, cat: c.id }; }));
  return map;
}

function OrderPanel({ cart, onAdd, onDec, onClear }) {
  const lookup = React.useMemo(flatItems, []);
  const total = Object.entries(cart).reduce((sum, [id, qty]) => sum + (lookup[id]?.price || 0) * qty, 0);
  const entries = Object.entries(cart);

  const quickIds = window.QUICK_ADD;

  return (
    <div className="panel" id="comanda-panel">
      <div className="eyebrow"><span className="dot"></span> 04 · Comandă rapidă</div>
      <h3>Quick Add.</h3>
      <p className="sub">Construiește-ți comanda în câteva atingeri. Ridicare la fața locului.</p>

      <div className="chip-rail">
        {quickIds.map((id) => {
          const it = lookup[id];
          if (!it) return null;
          return (
            <button key={id} className="chip" onClick={() => onAdd(id)}>
              <span className="pl">+</span> {it.name}
              <span className="pr">{it.price} RON</span>
            </button>
          );
        })}
      </div>

      {entries.length === 0 ? (
        <div className="cart-empty">
          <div className="ic">⌁</div>
          Coșul tău este gol — adaugă din rândul de mai sus sau din meniu.
        </div>
      ) : (
        <div className="cart-list">
          {entries.map(([id, qty]) => {
            const it = lookup[id];
            if (!it) return null;
            return (
              <div className="cart-row" key={id}>
                <div>
                  <div className="nm">{it.name}</div>
                  <div className="pr">{it.price} RON · {it.en}</div>
                </div>
                <div className="qty">
                  <button onClick={() => onDec(id)} aria-label="Scade">−</button>
                  <span className="n">{qty}</span>
                  <button onClick={() => onAdd(id)} aria-label="Crește">+</button>
                </div>
                <div className="total">{it.price * qty} RON</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="cart-foot">
        <div>
          <div className="lbl">Total</div>
          <div className="sum">{total} <span style={{ fontSize: 16, letterSpacing: "0.1em", color: "var(--ink-mute)" }}>RON</span></div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {entries.length > 0 && (
            <button className="btn btn-outline" onClick={onClear} style={{ padding: "12px 18px" }}>
              Golește
            </button>
          )}
          <button
            className="btn btn-primary"
            disabled={entries.length === 0}
            style={{ opacity: entries.length === 0 ? 0.4 : 1, pointerEvents: entries.length === 0 ? "none" : "auto", padding: "14px 22px" }}>
            Trimite comanda <Icon.Arrow style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

function BookOrderSection({ cart, onAdd, onDec, onClear }) {
  return (
    <section className="section" id="rezervari">
      <div className="wrap">
        <div className="section-header">
          <div className="reveal">
            <div className="eyebrow"><span className="dot"></span> Rezervări &amp; Comenzi</div>
            <h2 className="section-title">
              Vino la noi, sau<br /><em>ia gustul cu tine.</em>
            </h2>
          </div>
          <p className="section-intro reveal" data-delay="1">
            Pentru rezervări, completează formularul — un weekend însorit se prinde greu fără.
            Pentru ridicare rapidă, alege din Quick Add și plătești la fața locului.
          </p>
        </div>
        <div className="two-col" id="comanda">
          <div className="reveal"><ReservationForm /></div>
          <div className="reveal" data-delay="1"><OrderPanel cart={cart} onAdd={onAdd} onDec={onDec} onClear={onClear} /></div>
        </div>
      </div>
    </section>
  );
}

// ===================== FOOTER =====================
function Footer() {
  return (
    <footer className="foot" id="contact">
      <div className="wrap">
        <div className="foot-grid">
          <div className="brand-block reveal">
            <div className="pill-static" style={{ marginBottom: 18 }}><span className="dot"></span> Deschis astăzi · 09:00 – 22:00</div>
            <div className="display">X Sweets &amp; Coffee<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>by Traxilvania</em></div>
            <p>Grill, dulciuri și cafea de specialitate — pe creasta munților Apuseni, la 1450 m altitudine.</p>
          </div>
          <div className="reveal" data-delay="1">
            <h4>Locație</h4>
            <ul>
              <li>Vârtop, Munții Apuseni</li>
              <li>Jud. Alba, România</li>
              <li><a href="#">Vezi pe hartă →</a></li>
            </ul>
          </div>
          <div className="reveal" data-delay="2">
            <h4>Program</h4>
            <ul>
              <li>Luni – Joi · 10:00 – 21:00</li>
              <li>Vineri – Duminică · 09:00 – 22:00</li>
              <li>Sărbători legale · 09:00 – 23:00</li>
            </ul>
          </div>
          <div className="reveal" data-delay="3">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+40700000000">+40 700 000 000</a></li>
              <li><a href="mailto:salut@traxilvania.ro">salut@traxilvania.ro</a></li>
              <li><a href="#">Instagram</a> · <a href="#">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bar">
          <div>© 2026 X Sweets &amp; Coffee by Traxilvania</div>
          <div>Făcut cu drag în Apuseni</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, MenuSection, Ambient, BookOrderSection, Footer });
