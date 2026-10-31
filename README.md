# BNHR Workshops

Workshop materials and activity websites, published with GitHub Pages at https://bnhr.xyz/workshops/.

## In the learning factory

This repository is outside the learning factory's course and training chain: a workshop here is not a course of the hub's catalogue, and nothing here reads or is read by the factory's other repositories (the hub, [`learn-factory`](https://github.com/benhur07b/learn-factory) (private; its README's *The learning factory* has the model and every repository's role)).

## Layout

One folder per workshop, named after its date and subject (`YYYY-MM-DD-name`), each self-contained with its own images and fonts, so a change to one workshop or to the brand never changes another. The address of a folder is `https://bnhr.xyz/workshops/<folder>/`.

| Folder | Workshop |
|---|---|
| `2026-10-21-nbs-tool-builder/` | Build Our NbS Tool, the activity website of the Consultation Workshop on the National NbS Web Platform (21 October 2026). See its README |
| `pnm21-qgis-workshop/` | Pista ng Mapa 2021 QGIS Workshop. A static copy of the pages first published on the main bnhr.xyz site; its links to the blog, services and site assets point to the main site |

`index.html` lists the workshops: add a line there for each new folder. `assets/` holds the index page's logo, icon, fonts and link-preview image (`share.png`). `.nojekyll` tells GitHub Pages to serve the files as they are.

## Publishing

Pushes to `main` publish the site (Settings → Pages → Deploy from a branch: `main`, root). The site takes the `bnhr.xyz` custom domain from the main site, `benhur07b.github.io`, so it needs no CNAME file of its own.

Every repository on `bnhr.xyz` shares the browser's storage, so a workshop page that saves anything in the browser uses a key that starts with its folder name.

## License

The workshops are © 2021-2026 Ben Hur S. Pintor and licensed under the [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/) (`LICENSE`), except `pnm21-qgis-workshop/`, which keeps the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) it was first published under.

The BNHR name and logos are not covered by these licenses: all rights reserved. Fonts, screenshots of other people's software (such as the SCeNe Coalition's NbS Tool in the NbS tool builder's cards) and other third-party works stay under their own licenses and are credited where they appear.

`REUSE.toml` names the owner and license of every file that is not under CC BY-SA 4.0, and `LICENSES/` holds the license texts. `uvx reuse lint` checks that every file has one. A workshop that adds a third-party image adds an entry for it there. In the NbS tool builder, card pictures named `nbs-*` are from BNHR's NbS demo and the rest are SCeNe's, so a new card picture from the demo takes a name starting with `nbs-`.
