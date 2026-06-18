---
title: Introduction
---

<p class="kicker">Showcase</p>

# Introduction

<p class="lead">A domain-agnostic catalogue server: ingest ZIP items into a self-hosted app, organise them into collections, and share public portfolios.</p>

## What it is

CatalogueCanvas is a self-hosted catalogue server. You ingest items as ZIP files, organise
them into collections, enrich them with metadata and optional AI-generated descriptions, and
publish curated portfolios as shareable slide-deck pages — all from a single Docker container.

## What it does

- **Ingest** — one ZIP becomes one catalogue item; the main image is auto-converted to a WebP preview.
- **Organise** — group items into collections and a built-in Favourites set.
- **Enrich** — edit titles, tags, and Markdown notes; optionally describe items with a vision LLM.
- **Publish** — assemble portfolios and share them publicly at a `/p/<slug>` link.
- **Store & back up** — keep assets across multiple libraries; export the database and all files.

## Key concepts

| Concept | In one line |
|---|---|
| **Item** | A single catalogued work, created from one uploaded ZIP. |
| **Collection** | A named grouping of items. |
| **Portfolio** | A curated, shareable slide-deck of items. |
| **Library** | A storage location for item assets. |

→ Full definitions in the [Glossary](../documentation/glossary.md).

## Next steps

- New here? Read **[Uses & for whom](uses.md)**.
- Want to run it? See **[Install](../documentation/install.md)**.
- Using it day to day? See the **[User documentation](../documentation/user.md)**.
