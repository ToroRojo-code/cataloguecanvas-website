---
title: CatalogueCanvas
---

<p class="kicker">Self-hosted catalogue server</p>

# CatalogueCanvas

<p class="lead">A domain-agnostic catalogue server: ingest <strong>ZIP items</strong> into a self-hosted app, organise them into collections, and share public portfolios — all from a single Docker container.</p>

CatalogueCanvas is a self-hosted catalogue server. You ingest items as ZIP files, organise them into collections, enrich them with metadata and optional AI-generated descriptions, and
publish curated portfolios as shareable slide-deck pages.

   ![Item](assets/Items_CC.png)


## What it does

- **Ingest** — one ZIP becomes one catalogue item; the main image is auto-converted to a WebP preview.
- **Organise** — group items into collections and a built-in Favourites set.
- **Exploration** — simple quick exploration of the work uploaded, searchable
- **Enrich** — edit titles, tags, and Markdown notes; optionally describe items with a vision LLM[^llm].
- **Publish** — assemble portfolios and share them publicly at a `/p/<slug>` link.
- **Store & back up** — keep assets across multiple libraries; export the database and all files.

## Key concepts

| Concept | In one line |
|---|---|
| **Item** | A single catalogued work, created from one uploaded ZIP. |
| **Collection** | A named grouping of items. |
| **Portfolio** | A curated, shareable slide-deck of items. |
| **Library** | A storage location for item assets. |

→ Full definitions in the [Glossary](documentation/glossary.md).

## Next steps

- New here? Read **[Uses & for whom](showcase/uses.md)**.
- Want to run it? See **[Install](documentation/install.md)**.
- Using it day to day? See the **[User documentation](documentation/user.md)**.

## Frequently asked questions

<!-- TEMPLATE: collapsible FAQ. `???` = collapsed, `???+` = open by default.
     Indent the answer by four spaces. Duplicate a block per question. -->

??? question "What is CatalogueCanvas?"
    A domain-agnostic, self-hosted catalogue server. You ingest items as ZIP files, organise them into collections, and publish curated portfolios at a shareable link or printed. All from a single Docker container.

??? question "How is it license?"
    CatalogueCanvas is fully open source and released under the [GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.en.html). You can use it for any project, modify it, distribute it, and build on top of it without restriction or license fees. Just have to stay within the restriction of the license. 

??? question "Can I contribute?"
    Yes, please. All are welcome in the github of the project. Link at the top 

??? question "Is CatalogueCanvas production ready?"
    CC is release now as a beta, stable release. That means that it might change with future development. Breaking changes are to be avoided, but they might happend. Anyway, you will get a proper warning and custom scripts for transitions will be tested to avoid breaking installations.
    That said, **I would not install it in a server open to the internet yet**.

??? question "How do I report a problem? How do I ask for a new feature?"
    Please create an issue in the github repository [LINK](https://github.com/ToroRojo-code/CatalogueCanvas/). And attach the systems log output from the script in settings, and/or a use case for the new feature.

[^llm]: **LLM** — a large language model. I have tested local models in LM Studio, Ollama, llama-cpp. Because otherwise I would spend too much time trying to come out with something relevant.
