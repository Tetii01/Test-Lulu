// Checkout-page entry. Loads after components.jsx + sections.jsx + menu-data.jsx.
function CheckoutApp() {
  const [theme, toggleTheme] = useTheme();
  const cart = useCart();
  useReveal();

  React.useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) el.classList.add("in");
      });
    }, 50);
    return () => clearTimeout(t);
  });

  // Cross-page nav: clicking any main-site link from the checkout page jumps back to index.html
  const onNav = (id) => {
    if (id === "cos") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (id === "top") {
      window.location.href = "index.html";
      return;
    }
    window.location.href = "index.html#" + id;
  };

  return (
    <React.Fragment>
      <Nav
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={cart.count}
        onCart={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onNav={onNav}
      />

      <header className="page-header" id="top">
        <div className="wrap">
          <a href="index.html" className="back-link reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
              <path d="m15 18-6-6 6-6" />
            </svg>
            Înapoi la site
          </a>
          <div className="eyebrow reveal" data-delay="1" style={{ marginTop: 24 }}>
            <span className="dot"></span> Comanda ta
          </div>
          <h1 className="page-title reveal" data-delay="2">
            Coș &amp; <em>Checkout.</em>
          </h1>
          <p className="page-lead reveal" data-delay="3">
            Verifică preparatele, alege modul de servire și lasă-ne datele tale.
            Te contactăm pentru confirmare în maxim 15 minute.
          </p>
        </div>
      </header>

      <CheckoutSection
        cart={cart.items}
        onAdd={cart.add}
        onDec={cart.dec}
        onClear={cart.clear}
      />

      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CheckoutApp />);
