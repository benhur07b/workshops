# BNHR Workshops

Workshop materials and activity websites, published with GitHub Pages at https://bnhr.xyz/workshops/.

## Layout

One folder per workshop, named after its date and subject (`YYYY-MM-DD-name`), each self-contained with its own images and fonts, so a change to one workshop or to the brand never changes another. The address of a folder is `https://bnhr.xyz/workshops/<folder>/`.

| Folder | Workshop |
|---|---|
| `2026-10-21-nbs-tool-builder/` | Build Our NbS Tool, the activity website of the Consultation Workshop on the National NbS Web Platform (21 October 2026). See its README |
| `pnm21-qgis-workshop/` | Pista ng Mapa 2021 QGIS Workshop. A static copy of the pages first published on the main bnhr.xyz site; its links to the blog, services and site assets point to the main site |

`index.html` lists the workshops: add a line there for each new folder. `assets/` holds the index page's logo, icon and fonts. `.nojekyll` tells GitHub Pages to serve the files as they are.

## Publishing

Pushes to `main` publish the site (Settings → Pages → Deploy from a branch: `main`, root). The site takes the `bnhr.xyz` custom domain from the main site, `benhur07b.github.io`, so it needs no CNAME file of its own.

Every repository on `bnhr.xyz` shares the browser's storage, so a workshop page that saves anything in the browser uses a key that starts with its folder name.
