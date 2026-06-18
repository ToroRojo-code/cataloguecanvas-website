/* ============================================================================
   CatalogueCanvas Docs — accent picker
   Ports the accent swatch bar from the Claude Design source. Sets data-accent
   on <body> and persists it. Light/dark mode is handled by Material's own
   palette toggle (see mkdocs.yml theme.palette).
   ============================================================================ */
(function () {
  var KEY = "cc-docs-accent";
  var ACCENTS = [
    { v: "default",    color: "#e0492b", title: "Vermilion" },
    { v: "cobalt",     color: "#2f54d4", title: "Cobalt" },
    { v: "terracotta", color: "#b96a45", title: "Terracotta" },
    { v: "forest",     color: "#3c7a52", title: "Forest" },
    { v: "ink",        color: "#2b3040", title: "Ink" }
  ];

  function apply(v) {
    document.body.setAttribute("data-accent", v);
    document.querySelectorAll(".cc-accent button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.v === v));
    });
  }

  function build() {
    if (document.querySelector(".cc-accent")) return;
    var header = document.querySelector(".md-header__inner") || document.querySelector(".md-header");
    if (!header) return;

    var wrap = document.createElement("div");
    wrap.className = "cc-accent";
    wrap.setAttribute("aria-label", "Accent colour");

    ACCENTS.forEach(function (a) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.v = a.v;
      btn.title = a.title;
      btn.setAttribute("aria-label", "Accent: " + a.title);
      btn.style.background = a.color;
      btn.addEventListener("click", function () {
        try { localStorage.setItem(KEY, a.v); } catch (e) {}
        apply(a.v);
      });
      wrap.appendChild(btn);
    });

    header.appendChild(wrap);

    var saved = "default";
    try { saved = localStorage.getItem(KEY) || "default"; } catch (e) {}
    apply(saved);
  }

  // Run on load and on Material instant-navigation page swaps.
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(build);
  } else {
    document.addEventListener("DOMContentLoaded", build);
  }
})();
