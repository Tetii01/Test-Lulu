// Shared low-level components + hooks.

const { useEffect, useRef, useState, useCallback, useMemo } = React;

// ---- Reveal-on-scroll ----
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ---- Theme ----
function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("xsc-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("xsc-theme", theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

// ---- Cart ----
function useCart() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("xsc-cart") || "{}"); } catch { return {}; }
  });
  useEffect(() => {
    localStorage.setItem("xsc-cart", JSON.stringify(items));
  }, [items]);
  const add = useCallback((id) => setItems((s) => ({ ...s, [id]: (s[id] || 0) + 1 })), []);
  const dec = useCallback((id) => setItems((s) => {
    const n = (s[id] || 0) - 1;
    const c = { ...s };
    if (n <= 0) delete c[id]; else c[id] = n;
    return c;
  }), []);
  const remove = useCallback((id) => setItems((s) => { const c = { ...s }; delete c[id]; return c; }), []);
  const clear = useCallback(() => setItems({}), []);
  const count = Object.values(items).reduce((a, b) => a + b, 0);
  return { items, add, dec, remove, clear, count };
}

// ---- Icons ----
const Icon = {
  Sun: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </svg>
  ),
  Moon: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 15.5A8 8 0 1 1 8.5 4a7 7 0 0 0 11.5 11.5Z" />
    </svg>
  ),
  Arrow: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Plus: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Check: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5L20 7" />
    </svg>
  ),
  Cart: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h2l2 12h11l2-8H7" />
      <circle cx="10" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </svg>
  ),
  Chev: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Truck: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17V7a1 1 0 0 1 1-1h10v11H3Z" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  Bag: (p) => (
    <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
};

// ---- Theme toggle button ----
function ThemeToggle({ theme, toggle }) {
  return (
    <button className="toggle" onClick={toggle} aria-label="Schimbă tema">
      <Icon.Sun className="sun" />
      <Icon.Moon className="moon" />
    </button>
  );
}

Object.assign(window, { useReveal, useTheme, useCart, Icon, ThemeToggle });
