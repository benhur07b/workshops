// Shared page parts: top bar, footer, card rendering and the image viewer.

(function () {
  const PAGES = [
    ["index.html", "How it works"],
    ["cards.html", "Card guide"],
    ["board.html", "Build our tool"],
    ["results.html", "Results"],
    ["print.html", "Print cards"],
  ];

  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === null || v === undefined || v === false) continue;
      if (k === "class") node.className = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) {
      if (c === null || c === undefined || c === false) continue;
      node.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return node;
  }

  // Numbers in the page text come from the rules in cards.js, so the text can't drift from the board.
  function fillRules() {
    const values = { keeps: keepLimit(), cards: allCards().length, cardDots: window.NBS.rules.cardDots, dataDots: window.NBS.rules.dataDots };
    for (const node of document.querySelectorAll("[data-rule]")) node.textContent = values[node.dataset.rule];
  }

  function topbar() {
    fillRules();
    const here = location.pathname.split("/").pop() || "index.html";
    const bar = el("header", { class: "topbar" },
      el("a", { class: "brand", href: "index.html" }, el("img", { src: "img/logo-on-navy.svg", alt: "BNHR" }), "Build Our NbS Tool"),
      el("nav", { "aria-label": "Pages" },
        PAGES.map(([href, label]) => el("a", { href, "aria-current": href === here ? "page" : null }, label))));
    document.body.prepend(bar);
  }

  function footer() {
    const tagline = el("span", { class: "tagline" }, "less lock-in. more ", el("em", {}, "know-how"), ".");
    document.body.append(el("footer", { class: "site" },
      el("div", { class: "inner" },
        el("img", { src: "img/logo-on-navy.svg", alt: "BNHR" }),
        tagline,
        el("span", { class: "credit" }, "Consultation Workshop on the National NbS Web Platform, 21 October 2026. Screens of SCENE's NbS tool (beta) are from the SCeNe Coalition and are shown for discussion; screens marked NbS demo are from BNHR's demo platform."))));
  }

  // Every page gets the 2026 symbol as its tab icon.
  document.head.append(el("link", { rel: "icon", href: "img/favicon.svg", type: "image/svg+xml" }));

  // One image viewer for every page.
  let viewer;
  function openImage(src, alt) {
    if (!viewer) {
      viewer = el("dialog", { class: "zoom", onclick: () => viewer.close() }, el("img", { alt: "" }));
      document.body.append(viewer);
    }
    const img = viewer.querySelector("img");
    img.src = src;
    img.alt = alt;
    viewer.showModal();
  }

  function picture(card) {
    if (!card.img) return el("div", { class: "pic none" }, "No picture: words only");
    const src = "img/cards/" + card.img;
    return el("div", { class: "pic" },
      el("button", { class: "open", type: "button", "aria-label": "Open the picture of " + card.title + " larger", onclick: () => openImage(src, card.title) },
        el("img", { src, alt: card.title, loading: "lazy" })));
  }

  function sourceTag(card) {
    return el("span", { class: "tag " + card.source }, window.NBS.sources[card.source]);
  }

  function allCards() {
    return window.NBS.steps.flatMap((s) => s.cards.map((c) => Object.assign({ step: s.id }, c)));
  }

  // Storage can be missing or blocked (private windows, strict settings); the pages work without it.
  const store = {
    get(key) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; }
    },
  };

  function download(filename, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = el("a", { href: url, download: filename });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // How many cards a table may keep across the whole board: rules.keepShare of all cards.
  function keepLimit() { return Math.round(window.NBS.rules.keepShare * allCards().length); }

  function personById(id) { return window.NBS.people.find((p) => p.id === id) || null; }

  // How a table's organisation can share a piece of data.
  const SHARE = [
    { id: "yes", label: "Yes, we have it and can share it" },
    { id: "agreement", label: "We have it, but only with an agreement" },
    { id: "no", label: "We have it, but cannot share it" },
    { id: "none", label: "We don't have it" },
    { id: "unsure", label: "Not sure" },
  ];

  window.UI = { el, topbar, footer, picture, sourceTag, allCards, store, download, openImage, keepLimit, personById, SHARE };
})();
