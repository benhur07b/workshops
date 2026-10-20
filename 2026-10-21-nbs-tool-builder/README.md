# Build Our NbS Tool

The website for the "Build Our NbS Tool" activity of the 21 October 2026 Consultation Workshop on the National NbS Web Platform. Plain HTML, CSS and JavaScript, with no build step and no server code: it runs on GitHub Pages, on any static host, or straight from the folder (open `index.html`).

## Pages

| Page | For | What it does |
|---|---|---|
| `index.html` | Everyone | How it works: what the activity is for, step-by-step instructions for participants and for table hosts (before, during and after the rounds, and what to do if something goes wrong), and the schedule |
| `cards.html` | Everyone | The card guide: the people tables build for, every card numbered as on the board and the printed backup, with its picture (from SCENE's NbS tool or the NbS demo) and a plain explanation, and the list of data the tool may need |
| `board.html` | A table, or the remote group | The table's board: the person it builds for; Keep, Maybe or We don't need it for each card, with a limit on keeps for the whole board (75% of all the cards: 38 of 51), so a table can keep more in some steps than in others; wishes with the information they need and who has it; two kinds of priority dots, card dots for kept cards and wishes and data dots on the Data we need tab (need it, why, can you share it, where is it). Saved in the browser; "Download our board" saves a file |
| `results.html` | BNHR and FFP | Opens all the downloaded boards at once and adds them up by session: keeps, maybes, don't needs, dots and wishes per step; data needs with data dots, who can share what, and where the rest is; downloads a CSV |
| `print.html` | Preparation | The people (three per A4), the step headers with their number of keeps (two per A4), words-only cards (15 per A4, with blank wish cards filling the last page) and a landscape data sheet: 11 A4 pages. Extra wish cards are optional |

## Changing the cards

Every page reads the cards, the people and the data list from `cards.js`, so a change there reaches the guide, the board, the printout and the results together. The limits are `rules` in `cards.js`: `keepShare` (the share of all cards a table may keep, across the whole board), `cardDots` and `dataDots` (the two kinds of priority dots). The pages show the numbers from there, so the text always matches the board: `data-rule` fills a rule, the card total or the people's names, `data-step-cards` the number of cards in one step. Each card has an id (`2.6`), a title, one sentence for the paper card (`text`), a longer explanation for the guide (`more`), an image in `img/cards/` or `null`, and its source (`SCENE`, `Demo`, `Plan` or `GeoNode`). Keep the ids stable once cards are printed: boards and results refer to cards by id.

## Paper and screen together

A table working on paper writes its results on the flip charts; afterwards its host enters them in `board.html` and downloads the file, so `results.html` counts paper and digital tables the same way.

## Putting it online with GitHub Pages

The pages use only relative links, so the folder works at any address. It is published from the `workshops` repository at https://bnhr.xyz/workshops/2026-10-21-nbs-tool-builder/, the address the slides' QR code points to. GitHub Pages takes the path from the repository name, so the repository must be called `workshops` and this folder `2026-10-21-nbs-tool-builder` for that address to work.

1. Copy this folder into the repository, keeping it self-contained (its own fonts and images), so later changes to other workshops or to the brand cannot change it.
2. In the repository, Settings → Pages → Deploy from a branch, and choose the branch and folder.
3. The site appears within a minute or two.

Every repository on one `<account>.github.io` address shares the browser's storage, so the board saves under a name that includes this workshop (`2026-10-21-nbs-tool-builder/…` in `board.js`). Give the next workshop's tool its own name.

The fonts are in `fonts/`, so the pages look right without internet once loaded.

## Credits

Screens marked "SCENE's NbS tool" are from the SCeNe Coalition's NbS Tool (beta), https://nbstool-beta.scenecoalition.org/, captured on 19 October 2026 and shown for discussion. Screens marked "NbS demo" are from BNHR's NbS Map Platform demo. Logo and fonts: BNHR 2026 brand (Albert Sans and Atkinson Hyperlegible Next, both under the SIL Open Font License).
