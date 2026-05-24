function App() {
  const [theme, toggleTheme] = useTheme();
  const cart = useCart();
  useReveal();

  // re-run reveal observation as content (menu tabs, cart) changes
  React.useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92) el.classList.add("in");
      });
    }, 50);
    return () => clearTimeout(t);
  });

  // On load with hash (e.g. coming back from cos.html with #meniu), scroll there
  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 56;
          window.scrollTo({ top: y, behavior: "instant" in window ? "instant" : "auto" });
        }
      }, 50);
    }
  }, []);

  const scrollTo = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 56;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Cart is its own page now
  const onNav = (id) => {
    if (id === "cos") {
      window.location.href = "cos.html";
      return;
    }
    scrollTo(id);
  };

  return (
    <React.Fragment>
      <Nav
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={cart.count}
        onCart={() => { window.location.href = "cos.html"; }}
        onNav={onNav}
      />
      <Hero
        onReserve={() => scrollTo("rezervari")}
        onMenu={() => scrollTo("meniu")}
      />
      <MenuSection cart={cart.items} onAdd={cart.add} />
      <Ambient />
      <ReservationSection />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
