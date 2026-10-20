// Combines boards downloaded from board.html. Each board counts once per card:
// a table keeps a card, marks it maybe, doesn't need it, or says nothing about it.
// Maybe is shown but adds nothing to the ranking. Each card lists the tables' notes,
// their reasons for not needing it first.

(function () {
  const { el, topbar, footer, allCards, download, personById, SHARE } = UI;
  const CARDS = allCards();
  const boards = []; // { name, board }

  const filesInput = document.getElementById("files");
  const filter = document.getElementById("filter");
  const csvBtn = document.getElementById("csv");
  const clearBtn = document.getElementById("clear");
  const drop = document.getElementById("drop");
  const list = document.getElementById("boards");
  const out = document.getElementById("out");
  const shareLabel = (id) => SHARE.find((s) => s.id === id)?.label || "";
  const PICKS = { keep: "Keep", maybe: "Maybe", skip: "Don't need" };

  async function addFiles(files) {
    const bad = [];
    for (const f of files) {
      try {
        const b = JSON.parse(await f.text());
        if (!b || b.version !== 3 || typeof b.choices !== "object" || !Array.isArray(b.wishes)) throw new Error("not a board");
        // The same file opened twice replaces itself rather than counting twice.
        const i = boards.findIndex((x) => x.name === f.name);
        if (i >= 0) boards.splice(i, 1);
        boards.push({ name: f.name, board: b });
      } catch (e) {
        bad.push(f.name);
      }
    }
    if (bad.length) alert("These files are not boards from this site and were left out:\n" + bad.join("\n"));
    render();
  }

  const shown = () => boards.filter((x) => filter.value === "all" || x.board.session === filter.value);
  const tableOf = (b) => (b.table || "A table") + " (" + b.session + ")";
  function personOf(b) {
    const p = personById(b.person);
    return p ? p.name + ", " + p.role : b.personOwn || "someone else";
  }

  function tally() {
    const sel = shown();
    const rows = CARDS.map((c) => {
      const r = { ...c, keep: 0, maybe: 0, skip: 0, dots: 0, notes: [] };
      for (const { board } of sel) {
        const v = board.choices[c.id];
        if (!PICKS[v?.pick]) continue;
        r[v.pick]++;
        r.dots += Number(board.dots?.[c.id]) || 0;
        if (typeof v.note === "string" && v.note.trim()) r.notes.push({ table: tableOf(board), pick: v.pick, note: v.note.trim() });
      }
      r.notes.sort((a, b) => (b.pick === "skip") - (a.pick === "skip"));
      return r;
    });
    const wishes = sel.flatMap(({ board }) => board.wishes.map((w) => ({ ...w, table: tableOf(board), dots: Number(board.dots?.[w.id]) || 0 })));
    const data = NBS.data.map((d) => {
      const r = { ...d, need: 0, maybe: 0, skip: 0, dots: 0, notes: [] };
      for (const { board } of sel) {
        const a = board.data?.[d.id] || {};
        if (a.need === "need" || a.need === "maybe" || a.need === "skip") r[a.need]++;
        r.dots += Number(board.dataDots?.[d.id]) || 0;
        if (a.why || a.share || a.where) r.notes.push({ table: tableOf(board), why: a.why || "", share: shareLabel(a.share), where: a.where || "" });
      }
      return r;
    });
    const dataOwn = sel.flatMap(({ board }) => (board.dataOwn || []).map((d) => ({ ...d, table: tableOf(board), share: shareLabel(d.share), dots: Number(board.dataDots?.[d.id]) || 0 })));
    return { sel, rows, wishes, data, dataOwn };
  }

  const table = (head, body) => el("div", { class: "table-wrap" }, el("table", { class: "results" },
    el("thead", {}, el("tr", {}, head.map((h) => el("th", {}, h)))), el("tbody", {}, body)));
  const td = (v, num) => el("td", { class: num ? "num" : null }, v);

  function render() {
    const { sel, rows, wishes, data, dataOwn } = tally();
    drop.hidden = boards.length > 0;
    csvBtn.disabled = clearBtn.disabled = boards.length === 0;
    list.replaceChildren(boards.length ? el("p", { class: "muted" }, sel.length + " of " + boards.length + " boards shown: " + sel.map((x) => tableOf(x.board) + ", building for " + personOf(x.board)).join("; ")) : "");
    if (!sel.length) { out.replaceChildren(); return; }

    const stepTitle = (id) => NBS.steps.find((s) => s.id === id).title;
    const top = [...rows.filter((r) => r.dots), ...wishes.filter((w) => w.dots).map((w) => ({ id: "Wish", title: w.text, dots: w.dots, step: w.step }))]
      .sort((a, b) => b.dots - a.dots).slice(0, 10);
    const keepBar = (n) => el("div", { class: "bar", style: "width:" + (100 * n) / sel.length + "%", title: n + " of " + sel.length });

    out.replaceChildren(
      el("section", {},
        el("div", { class: "step-head" }, el("h2", {}, "Most dots")),
        top.length ? table(["Card", "What", "Step", "Dots"], top.map((r) => el("tr", {}, td(r.id), td(r.title), td(stepTitle(r.step)), td(r.dots, true))))
          : el("p", { class: "muted" }, "No dots given yet.")),
      ...NBS.steps.map((s) => {
        const r = rows.filter((x) => x.step === s.id).sort((a, b) => b.dots - a.dots || b.keep - a.keep || a.skip - b.skip);
        const w = wishes.filter((x) => x.step === s.id).sort((a, b) => b.dots - a.dots);
        return el("section", {},
          el("div", { class: "step-head" }, el("h2", {}, el("span", { class: "num" }, s.id), s.title)),
          table(["Card", "What", "Keep", "Maybe", "Don't need", "Dots", "Tables keeping it", "Why not, and notes"],
            r.map((x) => el("tr", {}, td(x.id), td(x.title), td(x.keep, true), td(x.maybe, true), td(x.skip, true), td(x.dots, true), el("td", { style: "width:18%" }, keepBar(x.keep)),
              el("td", { class: "notes" }, x.notes.map((n) => el("p", { class: "small" + (n.pick === "skip" ? " why-not" : "") }, el("strong", {}, n.table + ", " + PICKS[n.pick] + ": "), n.note)))))),
          w.length ? el("div", { style: "margin-top:12px" }, table(["Wish", "Information it needs", "Who has it", "Table", "Dots"],
            w.map((x) => el("tr", {}, td(x.text), td(x.info), td(x.who), td(x.table), td(x.dots, true))))) : null);
      }),
      el("section", {},
        el("div", { class: "step-head" }, el("h2", {}, "Data we need")),
        table(["Data", "What", "Need", "Maybe", "Don't need", "Data dots", "Why, who can share, where it is"],
          [...data].sort((a, b) => b.dots - a.dots || b.need - a.need).map((d) => el("tr", {},
            td(d.id), td(d.name), td(d.need, true), td(d.maybe, true), td(d.skip, true), td(d.dots, true),
            el("td", {}, d.notes.map((n) => el("p", { class: "small", style: "margin:0 0 6px" }, el("strong", {}, n.table + ": "), [n.share, n.where && "where: " + n.where, n.why && "why: " + n.why].filter(Boolean).join("; "))))))),
        dataOwn.length ? el("div", { style: "margin-top:12px" }, table(["Data added by a table", "Why", "Can share", "Where", "Table", "Data dots"],
          dataOwn.sort((a, b) => b.dots - a.dots).map((d) => el("tr", {}, td(d.name), td(d.why), td(d.share), td(d.where), td(d.table), td(d.dots, true))))) : null));
  }

  function csvCell(v) {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  csvBtn.addEventListener("click", () => {
    const { rows, wishes, data, dataOwn } = tally();
    const lines = [["type", "step", "id", "what", "keep_or_need", "maybe", "dont_need", "dots", "information_or_why", "who_has_it_or_where", "can_share", "table", "choice"]];
    for (const r of rows) {
      lines.push(["card", r.step, r.id, r.title, r.keep, r.maybe, r.skip, r.dots, "", "", "", "", ""]);
      for (const n of r.notes) lines.push(["card_note", r.step, r.id, r.title, "", "", "", "", n.note, "", "", n.table, PICKS[n.pick]]);
    }
    for (const w of wishes) lines.push(["wish", w.step, "", w.text, "", "", "", w.dots, w.info, w.who, "", w.table]);
    for (const d of data) {
      lines.push(["data", "", d.id, d.name, d.need, d.maybe, d.skip, d.dots, "", "", "", ""]);
      for (const n of d.notes) lines.push(["data_answer", "", d.id, d.name, "", "", "", "", n.why, n.where, n.share, n.table]);
    }
    for (const d of dataOwn) lines.push(["data_added", "", "", d.name, "", "", "", d.dots, d.why, d.where, d.share, d.table]);
    download("nbs-tool-results-" + filter.value.toLowerCase() + ".csv", lines.map((l) => lines[0].map((_, i) => csvCell(l[i])).join(",")).join("\n"), "text/csv");
  });
  clearBtn.addEventListener("click", () => { boards.length = 0; render(); });
  filter.addEventListener("change", render);
  filesInput.addEventListener("change", (e) => { addFiles([...e.target.files]); e.target.value = ""; });
  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", (e) => { e.preventDefault(); addFiles([...e.dataTransfer.files]); });

  topbar();
  render();
  footer();
})();
