// A table's board. For each card: Keep, Maybe or We don't need it, with one limit on
// keeps for the whole board so a table can't keep everything but can favour some
// steps over others; wishes per step; and two pools of priority dots: card dots for
// the kept cards and wishes, and data dots on the data tab. The limits are rules in cards.js.
// The board lives in the browser (when it can) and travels as a downloaded file,
// which the results page combines with the other tables' files.

(function () {
  const { el, topbar, footer, picture, sourceTag, allCards, store, download, keepLimit, personById, SHARE } = UI;
  // Pages on one github.io address share browser storage, so the key names this workshop.
  const KEY = "2026-10-21-nbs-tool-builder/board-v2";
  const { cardDots: CARD_DOTS, dataDots: DATA_DOTS } = NBS.rules;
  const KEEPS = keepLimit();
  const DATA_TAB = "data";
  const CARDS = new Map(allCards().map((c) => [c.id, c]));
  const DATA = new Map(NBS.data.map((d) => [d.id, d]));
  const CHOICES = ["keep", "maybe", "skip"];
  const NEEDS = ["need", "maybe", "skip"];

  function blank() {
    return { version: 2, table: "", session: "Morning", person: NBS.people[0].id, personOwn: "", choices: {}, wishes: [], dots: {}, data: {}, dataOwn: [], dataDots: {}, step: NBS.steps[0].id };
  }

  const str = (v) => (typeof v === "string" ? v : "");
  const newId = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

  function cleanDataAnswer(a) {
    return { need: NEEDS.includes(a?.need) ? a.need : "", why: str(a?.why), share: SHARE.some((s) => s.id === a?.share) ? a.share : "", where: str(a?.where) };
  }

  // A file someone opens may be old, hand-edited or from another tool: keep only what fits,
  // and never let it break the rules (the keep limit and the two dot pools).
  function clean(raw) {
    const b = blank();
    if (!raw || typeof raw !== "object") return b;
    b.table = str(raw.table);
    if (raw.session === "Morning" || raw.session === "Afternoon") b.session = raw.session;
    if (personById(raw.person) || raw.person === "own") b.person = raw.person;
    b.personOwn = str(raw.personOwn);
    let keeps = 0;
    for (const c of CARDS.values()) {
      const v = raw.choices?.[c.id];
      if (v === "keep" && keeps < KEEPS) { b.choices[c.id] = "keep"; keeps++; }
      else if (v === "maybe" || v === "skip") b.choices[c.id] = v;
    }
    const steps = new Set(NBS.steps.map((s) => s.id));
    for (const w of Array.isArray(raw.wishes) ? raw.wishes : []) {
      if (w && str(w.text).trim() && steps.has(w.step)) b.wishes.push({ id: str(w.id) || newId("w"), step: w.step, text: w.text, info: str(w.info), who: str(w.who) });
    }
    for (const [id, a] of Object.entries(raw.data || {})) if (DATA.has(id)) b.data[id] = cleanDataAnswer(a);
    for (const d of Array.isArray(raw.dataOwn) ? raw.dataOwn : []) {
      if (d && str(d.name).trim()) b.dataOwn.push(Object.assign({ id: str(d.id) || newId("d"), name: d.name }, cleanDataAnswer(d), { need: "need" }));
    }
    const dotsFor = (src, allowed, max) => {
      const out = {}; let left = max;
      for (const [id, n] of Object.entries(src || {})) {
        const k = Math.max(0, Math.min(left, Math.floor(Number(n) || 0)));
        if (allowed(id) && k) { out[id] = k; left -= k; }
      }
      return out;
    };
    b.dots = dotsFor(raw.dots, (id) => b.choices[id] === "keep" || b.wishes.some((w) => w.id === id), CARD_DOTS);
    b.dataDots = dotsFor(raw.dataDots, (id) => b.data[id]?.need === "need" || b.dataOwn.some((d) => d.id === id), DATA_DOTS);
    if (steps.has(raw.step) || raw.step === DATA_TAB) b.step = raw.step;
    return b;
  }

  let board = clean(store.get(KEY));
  if (!store.set(KEY, board)) document.getElementById("storage-note").hidden = false;

  function save() { store.set(KEY, board); }
  const used = (dots) => Object.values(dots).reduce((a, n) => a + n, 0);
  const keepsUsed = () => Object.values(board.choices).filter((v) => v === "keep").length;

  // About the table
  const tableName = document.getElementById("table-name");
  const session = document.getElementById("session");
  const person = document.getElementById("person");
  const personOwnWrap = document.getElementById("person-own-wrap");
  const personOwn = document.getElementById("person-own");
  const personCard = document.getElementById("person-card");
  for (const p of NBS.people) person.append(el("option", { value: p.id }, p.name + ", " + p.role));
  person.append(el("option", { value: "own" }, "Someone else"));

  function showPerson() {
    const p = personById(board.person);
    personOwnWrap.hidden = board.person !== "own";
    personCard.replaceChildren(p
      ? el("div", { class: "persona" },
          el("h3", {}, "We are building for ", el("em", {}, p.name), ", " + p.role),
          el("p", {}, p.story),
          el("p", {}, el("strong", {}, "Needs: "), p.needs),
          el("p", { class: "muted" }, p.tech),
          el("p", { class: "small" }, "Ask at every card: would " + p.name + " use this?"))
      : el("div", { class: "persona" }, el("h3", {}, "We are building for someone else"), el("p", {}, "Describe them in a few words above, and ask at every card: would they use this?")));
  }

  function fillSetup() {
    tableName.value = board.table;
    session.value = board.session;
    person.value = board.person;
    personOwn.value = board.personOwn;
    showPerson();
  }
  tableName.addEventListener("input", () => { board.table = tableName.value; save(); });
  session.addEventListener("change", () => { board.session = session.value; save(); });
  person.addEventListener("change", () => { board.person = person.value; save(); showPerson(); });
  personOwn.addEventListener("input", () => { board.personOwn = personOwn.value; save(); });

  // Tabs: the steps, then the data
  const tabs = document.getElementById("step-tabs");
  const view = document.getElementById("step-view");
  const dotsLeft = document.getElementById("dots-left");

  function go(id) { board.step = id; save(); render(); window.scrollTo({ top: tabs.offsetTop - 8 }); }

  function renderTabs() {
    const decided = (s) => s.cards.filter((c) => board.choices[c.id]).length;
    tabs.replaceChildren(
      ...NBS.steps.map((s) => el("li", {}, el("button", { type: "button", "aria-pressed": String(s.id === board.step), onclick: () => go(s.id) },
        s.id + " " + s.title, el("span", { class: "count" }, " " + decided(s) + " of " + s.cards.length)))),
      el("li", {}, el("button", { type: "button", class: "data-tab", "aria-pressed": String(board.step === DATA_TAB), onclick: () => go(DATA_TAB) }, "Data we need")));
  }

  function dotControl(pool, max, id, label) {
    const n = pool[id] || 0;
    return el("div", { class: "dots", role: "group", "aria-label": "Dots for " + label },
      el("button", { type: "button", "aria-label": "Take a dot from " + label, disabled: n === 0, onclick: () => { if (n > 1) pool[id] = n - 1; else delete pool[id]; save(); render(); } }, "−"),
      el("span", { class: "n" }, n ? Array.from({ length: n }, () => el("span", { class: "dot" })) : "0"),
      el("button", { type: "button", "aria-label": "Give a dot to " + label, disabled: used(pool) >= max, onclick: () => { pool[id] = n + 1; save(); render(); } }, "+"));
  }

  function choiceButtons(card) {
    const current = board.choices[card.id];
    const full = keepsUsed() >= KEEPS && current !== "keep";
    const set = (v) => {
      if (current === v) delete board.choices[card.id]; else board.choices[card.id] = v;
      if (board.choices[card.id] !== "keep") delete board.dots[card.id];
      save(); render();
    };
    return el("div", { class: "choices" },
      el("button", { type: "button", class: "choice keep", "aria-pressed": String(current === "keep"), disabled: full, title: full ? "No keeps left: change another card to Maybe first" : null, onclick: () => set("keep") }, "Keep"),
      el("button", { type: "button", class: "choice maybe", "aria-pressed": String(current === "maybe"), onclick: () => set("maybe") }, "Maybe"),
      el("button", { type: "button", class: "choice skip", "aria-pressed": String(current === "skip"), onclick: () => set("skip") }, "We don't need it"),
      current === "keep" ? dotControl(board.dots, CARD_DOTS, card.id, card.title) : null);
  }

  function wishCard(w) {
    return el("article", { class: "card wish" },
      el("div", { class: "body" },
        el("span", { class: "id" }, "Wish"),
        el("h3", { class: "title" }, w.text),
        w.info ? el("p", { class: "text" }, el("strong", {}, "Information it needs: "), w.info) : null,
        w.who ? el("p", { class: "text" }, el("strong", {}, "Who has it: "), w.who) : null,
        el("div", { class: "choices" },
          el("button", { type: "button", class: "btn ghost", onclick: () => { if (confirm("Remove this wish?")) { board.wishes = board.wishes.filter((x) => x.id !== w.id); delete board.dots[w.id]; save(); render(); } } }, "Remove"),
          dotControl(board.dots, CARD_DOTS, w.id, w.text))));
  }

  function wishForm(step) {
    const text = el("textarea", { id: "wish-text", placeholder: "For example: show the official flood map of the barangay" });
    const info = el("input", { id: "wish-info", type: "text", placeholder: "For example: MGB flood hazard map" });
    const who = el("input", { id: "wish-who", type: "text", placeholder: "For example: MGB, or our office" });
    return el("form", { class: "wish-form", onsubmit: (e) => {
        e.preventDefault();
        if (!text.value.trim()) { text.focus(); return; }
        board.wishes.push({ id: newId("w"), step: step.id, text: text.value.trim(), info: info.value.trim(), who: who.value.trim() });
        save(); render();
      } },
      el("h3", {}, "We wish it had…"),
      el("div", {}, el("label", { for: "wish-text" }, "What is missing?"), text),
      el("div", {}, el("label", { for: "wish-info" }, "What information would it need?"), info),
      el("div", {}, el("label", { for: "wish-who" }, "Who has it?"), who),
      el("div", {}, el("button", { class: "btn orange", type: "submit" }, "Add our wish")));
  }

  function pager(i, list, titleOf) {
    const prev = list[i - 1], next = list[i + 1];
    return el("div", { class: "toolbar" },
      prev ? el("button", { class: "btn ghost", type: "button", onclick: () => go(prev.id) }, "← " + titleOf(prev)) : null,
      el("span", { style: "flex:1" }),
      next ? el("button", { class: "btn", type: "button", onclick: () => go(next.id) }, titleOf(next) + " →") : null);
  }

  function renderStep(step) {
    const left = KEEPS - keepsUsed();
    const order = [...NBS.steps, { id: DATA_TAB, title: "Data we need" }];
    view.replaceChildren(
      el("div", { class: "step-head" },
        el("h2", {}, el("span", { class: "num" }, step.id), step.title),
        el("p", { class: "question" }, step.question),
        el("p", { class: "keeps", "aria-live": "polite" },
          el("strong", {}, "Keep up to " + KEEPS + " of all " + CARDS.size + " cards, across all steps. "),
          left ? left + (left === 1 ? " keep left. " : " keeps left. ") : "No keeps left: change one to Maybe to keep another. ",
          "Not sure? Choose Maybe.")),
      el("div", { class: "grid" },
        step.cards.map((c) => el("article", { class: "card " + (board.choices[c.id] || "") },
          picture(c),
          el("div", { class: "body" },
            el("span", { class: "id" }, c.id),
            el("h3", { class: "title" }, c.title),
            el("p", { class: "text" }, c.text),
            sourceTag(c),
            choiceButtons(c)))),
        board.wishes.filter((w) => w.step === step.id).map(wishCard)),
      wishForm(step),
      pager(order.indexOf(step), order, (s) => s.title));
  }

  // The data tab
  function shareSelect(id, value, onchange) {
    return el("select", { id, onchange: (e) => onchange(e.target.value) },
      el("option", { value: "" }, "Choose…"),
      SHARE.map((s) => el("option", { value: s.id, selected: s.id === value }, s.label)));
  }

  function dataRow(d, answer, isOwn) {
    const a = answer;
    const set = (k, v) => { a[k] = v; save(); };
    const needBtn = (v, label) => el("button", { type: "button", class: "choice " + (v === "need" ? "keep" : v), "aria-pressed": String(a.need === v), onclick: () => {
        a.need = a.need === v ? "" : v;
        if (a.need !== "need") delete board.dataDots[d.id];
        save(); render();
      } }, label);
    const usedBy = (d.cards || []).map((id) => CARDS.get(id)).filter(Boolean);
    return el("article", { class: "card data " + (a.need === "need" ? "keep" : a.need || "") },
      el("div", { class: "body" },
        el("span", { class: "id" }, isOwn ? "Our data" : d.id),
        el("h3", { class: "title" }, d.name),
        d.text ? el("p", { class: "text" }, d.text) : null,
        usedBy.length ? el("p", { class: "more" }, "Used by cards: " + usedBy.map((c) => c.id + " " + c.title).join("; ")) : null,
        d.holder ? el("p", { class: "more" }, "We think it is with: " + d.holder) : null,
        isOwn ? null : el("div", { class: "choices" }, needBtn("need", "We need it"), needBtn("maybe", "Maybe"), needBtn("skip", "We don't need it")),
        a.need === "need" || a.need === "maybe" || isOwn ? el("div", { class: "data-fields" },
          el("div", {}, el("label", { for: "why-" + d.id }, "Why is it needed?"),
            el("textarea", { id: "why-" + d.id, oninput: (e) => set("why", e.target.value) }, a.why)),
          el("div", {}, el("label", { for: "share-" + d.id }, "Can your organisation share it?"), shareSelect("share-" + d.id, a.share, (v) => set("share", v))),
          el("div", {}, el("label", { for: "where-" + d.id }, "Where is it, or who has it?"),
            el("input", { id: "where-" + d.id, type: "text", value: a.where, placeholder: d.holder || "Office, agency or website", oninput: (e) => set("where", e.target.value) }))) : null,
        el("div", { class: "choices" },
          isOwn ? el("button", { type: "button", class: "btn ghost", onclick: () => { if (confirm("Remove this data?")) { board.dataOwn = board.dataOwn.filter((x) => x.id !== d.id); delete board.dataDots[d.id]; save(); render(); } } }, "Remove") : null,
          a.need === "need" ? dotControl(board.dataDots, DATA_DOTS, d.id, d.name) : null)));
  }

  function dataForm() {
    const name = el("input", { id: "own-name", type: "text", placeholder: "For example: barangay drainage maps" });
    const why = el("input", { id: "own-why", type: "text" });
    const where = el("input", { id: "own-where", type: "text" });
    let share = "";
    return el("form", { class: "wish-form", onsubmit: (e) => {
        e.preventDefault();
        if (!name.value.trim()) { name.focus(); return; }
        board.dataOwn.push({ id: newId("d"), name: name.value.trim(), need: "need", why: why.value.trim(), share, where: where.value.trim() });
        save(); render();
      } },
      el("h3", {}, "Data we need that is not on the list"),
      el("div", {}, el("label", { for: "own-name" }, "What data?"), name),
      el("div", {}, el("label", { for: "own-why" }, "Why is it needed?"), why),
      el("div", {}, el("label", { for: "own-share" }, "Can your organisation share it?"), shareSelect("own-share", "", (v) => { share = v; })),
      el("div", {}, el("label", { for: "own-where" }, "Where is it, or who has it?"), where),
      el("div", {}, el("button", { class: "btn orange", type: "submit" }, "Add this data")));
  }

  function renderData() {
    const left = DATA_DOTS - used(board.dataDots);
    view.replaceChildren(
      el("div", { class: "step-head" },
        el("h2", {}, "Data we need"),
        el("p", { class: "question" }, "The tool can only show what it has data for. Which data does it need, can your organisation share it, and if not, where is it?"),
        el("p", { class: "keeps" }, el("strong", {}, "You have " + DATA_DOTS + " data dots, separate from the card dots. "), "Give them to the data the tool needs most. " + (left === 1 ? "1 data dot left." : left + " data dots left."))),
      el("div", { class: "grid" },
        NBS.data.map((d) => dataRow(d, board.data[d.id] || (board.data[d.id] = cleanDataAnswer({})), false)),
        board.dataOwn.map((d) => dataRow(d, d, true))),
      dataForm(),
      pager(NBS.steps.length, [...NBS.steps, { id: DATA_TAB }], (s) => s.title));
  }

  function render() {
    renderTabs();
    if (board.step === DATA_TAB) renderData(); else renderStep(NBS.steps.find((s) => s.id === board.step));
    const plural = (n, one, many) => n + " " + (n === 1 ? one : many);
    dotsLeft.textContent = "Left: " + plural(KEEPS - keepsUsed(), "keep", "keeps") + ", " + plural(CARD_DOTS - used(board.dots), "card dot", "card dots") + ", " + plural(DATA_DOTS - used(board.dataDots), "data dot", "data dots");
  }

  // Files
  document.getElementById("save-file").addEventListener("click", () => {
    const who = (board.table || "table").trim().replace(/[^\w-]+/g, "-").toLowerCase();
    download("nbs-board-" + board.session.toLowerCase() + "-" + who + ".json", JSON.stringify(board, null, 2), "application/json");
  });
  document.getElementById("open-file").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    try {
      board = clean(JSON.parse(await file.text()));
      save(); fillSetup(); render();
    } catch (err) {
      alert("That file could not be opened as a board. Choose a file downloaded from this page.");
    }
  });
  document.getElementById("reset").addEventListener("click", () => {
    if (!confirm("Start a new, empty board? Download this one first if you want to keep it.")) return;
    board = blank(); save(); fillSetup(); render();
  });

  topbar();
  fillSetup();
  render();
  footer();
})();
