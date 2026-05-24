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

  return (
    <React.Fragment>
      <Nav
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={cart.count}
        onCart={() => scrollTo("comanda")}
        onNav={scrollTo}
      />
      <Hero
        onReserve={() => scrollTo("rezervari")}
        onMenu={() => scrollTo("meniu")}
      />
      <MenuSection cart={cart.items} onAdd={cart.add} />
      <Ambient />
      <BookOrderSection
        cart={cart.items}
        onAdd={cart.add}
        onDec={cart.dec}
        onClear={cart.clear}
      />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
