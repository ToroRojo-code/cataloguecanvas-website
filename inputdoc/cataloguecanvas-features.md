<DO NOT REMOVE>!!! This File handover changes done in CatalogueCanvas to the website-documentation incorporation in here </DO NOT REMOVE>
# CatalogueCanvas — Functionality & Instructions

CatalogueCanvas is a self-hosted, domain-agnostic catalogue server. You ingest items as ZIP files, organize them into collections, enrich them with metadata and AI-generated descriptions, and publish curated portfolios as public slide-deck pages — all from a single Docker container.

It is built for cataloguing digital, file-based creative work: generative & algorithmic art, illustrations, code sketches, design assets, or mixed-media archives.

---

## What it does

- **Ingest** ZIP files as individual catalogue items, one ZIP = one item.
- **Auto-preview** the main image of each item, converted to WebP.
- **Organize** items into collections and a built-in Favorites collection.
- **Edit** titles, tags, and Markdown notes per item, individually or in bulk.
- **Describe** items automatically with a vision-capable LLM (OpenAI-compatible).
- **Publish** portfolios — curated sets of items presented as a public slide deck at a shareable link.
- **Store** assets across multiple libraries on different disks or paths.
- **Back up** the database and all stored assets from the UI.

---

## Core concepts

| Concept | Description |
|---|---|
| **Item** | A single catalogued work, created from one uploaded ZIP. Has a preview image, files, title, tags, and notes. |
| **Collection** | A named grouping of items (e.g. "Sketches 2024"). Items can belong to many collections. |
| **Favorites** | A built-in system collection, always present, that can be toggled per item. Can be turned off in Settings. |
| **Portfolio** | A curated, ordered set of items published as a slide deck. Can be made public and shared via a `/p/<slug>` link. |
| **Library** | A storage location (folder/path) where item assets are kept. Multiple libraries can live on different disks. |
| **Item ID** | A unique, human-friendly identifier auto-assigned at ingestion in the form `word-NNN` (e.g. `lantern-042`). |

---

## How ingestion works

Each item is uploaded as a **single ZIP file**. On ingest, CatalogueCanvas:

1. **Deduplicates** by content hash — re-uploading the same ZIP is skipped, not duplicated.
2. **Selects a preview image** from the archive, preferring (in order) PNG → JPEG → TIFF → SVG. If several candidate images exist, the first is used and a note explains the choice.
3. **Converts** that preview to a high-resolution **WebP** image.
4. **Compresses SVG** source files with **LZ4** to save space (the original SVG remains downloadable).
5. **Stores all other files** (code, JSON, TOML, text, etc.) alongside the item so they can be viewed or downloaded.
6. **Reads metadata** automatically if the ZIP contains `metadata.json` or `metadata.toml`.
7. **Assigns a unique item ID** (`word-NNN`), checked against the database to avoid collisions.

**Recognized file types inside a ZIP:**
- **Images:** png, jpg, jpeg, gif, webp, svg, bmp, tiff
- **Text/code:** txt, md, json, toml, yaml, csv, py, r, js, ts, tsx, jsx, p5, html, css, sh
- **Other:** any other file is stored and offered as a download.

---

## Roles & access

CatalogueCanvas uses a **single admin login** secured by a password and a session cookie.

- **Admin** — full access. Logs in with the admin password to upload, edit, organize, configure, and publish. All management screens require an authenticated admin session.
- **Public visitor** — no login required. Can only view portfolios that an admin has marked **Public**, via their `/p/<slug>` link. No other part of the catalogue is exposed.

> Login is rate-limited: after 5 failed attempts from one address within 5 minutes, further attempts are temporarily blocked.

---

## For Admins

### Logging in
Open the app and enter the admin password (set at deployment via `CC_ADMIN_PASSWORD`). The session is kept in a secure cookie.

### Uploading items
- Click the upload button in the top bar to open the upload screen.
- Select or drag-and-drop one or more **ZIP files**.
- Choose which **library** receives the items (defaults to the default library).
- Ingestion reports progress, including notes such as "SVG compressed (lz4)" or "already ingested".
- Long-running work (uploads, batch LLM descriptions) is tracked in a **floating activity tray** — see below.

### Activity tray (background work)
A collapsible tray pinned to the bottom-right corner shows the live progress of long-running tasks — ZIP uploads, batch LLM descriptions, and single-item descriptions — so you can start a job and keep working elsewhere in the app without losing sight of it.

- The tray **persists across page navigation**: start an upload, move to another page, and watch it finish from the tray.
- Each task shows a **per-item log** with status (pending, in-progress, done, skipped, error) and detail messages.
- Clicking a task **links back to the page where it started**.
- Running tasks can be **cancelled**; finished tasks can be dismissed individually or cleared in one click.

> Tasks are tracked in the browser session. A full page reload or closing the tab clears the tray (the work itself runs per-request on the server).

### Editing items
On an item's page you can:
- Edit the **title** and **tags**.
- Write **notes in Markdown** — notes render as formatted text and have an edit mode for the raw Markdown.
- Assign the item to one or more **collections**.
- Toggle **Favorite** (heart icon), if favorites are enabled.
- **Generate an LLM description** (if configured) and apply it to the notes.
- **Navigate** between items with the **left/right arrow keys**.
- View linked files (images/text open inline; other types download).
- **Download** the item as a ZIP, or download all its files.

### Bulk actions
Select multiple items from the catalogue to:
- Add **tags** to all selected.
- **Clear notes** on all selected.
- **Favorite / unfavorite** in bulk.
- **Download** all selected as a single ZIP archive.
- Add to / remove from collections.

### Collections
- Create, rename, and describe collections.
- Set a **cover item** for a collection.
- Delete collections (the system **Favorites** collection cannot be edited or deleted).

### Portfolios
- Create a portfolio with a title and description.
- Add and order the items it contains.
- A **slug** is auto-generated (e.g. `quiet-amber-loom`) or you can set your own.
- Mark it **Public** to expose it at `/p/<slug>` as a slide-deck presentation.
- Share the link with anyone — no login needed to view a public portfolio.

### Libraries (multi-storage)
- Add additional **libraries** pointing at different writable directories (e.g. a second disk).
- Set any library as the **default** for new uploads.
- A library's path can't be changed once it holds items, and a library can't be deleted while it contains items or while it is the default.

### Settings
- **Appearance:** theme (light/dark), accent color, navigation layout (top bar / sidebar), density (airy/balanced/dense), and enable/disable Favorites.
- **LLM defaults:** API URL, model, item type, summary focus, number of bullet points, max words per bullet, and whether to auto-offer description generation.
- **Prompt template:** edit the raw TOML prompt used for LLM descriptions, with a reset-to-default option.
- **Backup & export:** download a database-only backup, or a full backup (database + all stored assets) as a ZIP.

### LLM descriptions
CatalogueCanvas calls any **OpenAI-compatible vision LLM** to describe an item's preview image.
- Configure the API URL and model in **Settings**.
- An API key may be entered per request — it is used only for that request and **never stored**.
- Works with local servers (LM Studio, Ollama) and hosted APIs.
- If the app runs in Docker and the LLM runs on your host machine, point the API URL at `http://host.docker.internal:<port>/v1/chat/completions` rather than `localhost`.

---

## For Public Viewers

If someone shares a portfolio link (`/p/<slug>`):

- The portfolio opens as a **slide-deck presentation** — title, description, and the curated items.
- No account or login is required.
- Only items the admin placed in that portfolio are shown; the rest of the catalogue stays private.
- Only portfolios explicitly marked **Public** are reachable; private ones return "not found".

---

## Setting up (Admin / Operator)

### Run with Docker (recommended)

Generate a session secret once:

```bash
mkdir -p secrets
openssl rand -hex 32 > secrets/cc_secret_key.txt
```

Start the app with an admin password:

```bash
CC_ADMIN_PASSWORD=mysecretpassword docker compose up --build
```

Open `http://localhost:8000` and log in. All data persists in the `cc-data` Docker volume.

### Key configuration

| Variable | Default | Description |
|---|---|---|
| `CC_ADMIN_PASSWORD` | _(empty)_ | Admin login password — required to log in |
| `CC_SECRET_KEY_FILE` | _(unset)_ | Path to a file holding the session signing key (Docker secret) |
| `CC_SITE_TITLE` | `My Catalogue` | Title shown in the UI and on public portfolios |
| `CC_SITE_AUTHOR` | _(empty)_ | Author/owner name shown on public portfolios |
| `CC_DATA_DIR` | `/data` | Base directory for database and storage |

### Footprint

- Docker image ~436 MB.
- ~256 MB RAM for light use; more when running LLM descriptions or large ingests.
- Single CPU core is sufficient; disk usage scales with uploaded assets.

### Run bare-metal on Windows (no Docker)

CatalogueCanvas also runs directly on Windows without Docker or WSL. This was tested end-to-end on Windows 11. Because the Docker entrypoint does not run, a few environment variables that Docker normally handles must be set by hand.

> **Architecture note:** the simple path below (uv + winget) is verified on **x86/x64 Windows**. **Windows on ARM (ARM64)** needs extra work for SVG rendering — see "SVG rendering on Windows ARM64" further down.

**Prerequisites** (install once, e.g. via `winget`):
- Node.js LTS — `winget install OpenJS.NodeJS.LTS` (builds the frontend)
- uv — `winget install astral-sh.uv` (manages Python and backend dependencies; downloads its own CPython, so a separate Python install is not needed)

**Build and run:**

```bat
:: 1. Build the frontend
cd web
npm ci
npm run build

:: 2. Sync backend dependencies
cd ..\server
uv sync

:: 3. Start the server (set env vars first — see below)
uv run uvicorn cataloguecanvas.main:app --host 0.0.0.0 --port 8000
```

Then open `http://localhost:8000` (or `http://<machine-ip>:8000` from another device on the LAN).

**Required environment variables on Windows:**

| Variable | Why it matters on Windows |
|---|---|
| `CC_ADMIN_PASSWORD` | Admin login password. Required to log in. |
| `CC_SECRET_KEY` | The Docker entrypoint normally auto-generates the session key; bare-metal it does **not**. Set a random value (e.g. `uv run python -c "import secrets;print(secrets.token_hex(32))"`), otherwise it falls back to an insecure default. |
| `CC_DATA_DIR` | Defaults to `/data`, which resolves to `C:\data` on Windows. Point it at a writable path, e.g. `C:\Users\<you>\cc-data`. |
| `CC_COOKIE_SECURE` | Defaults to `true`. Over plain HTTP (LAN/local testing) a secure cookie will not round-trip and **login silently fails**. Set to `false` when serving over HTTP. |
| `CC_STATIC_DIR` | Path to the built frontend (`web\dist`). Resolves automatically relative to the package, but can be set explicitly. |

A convenient way to launch is a `run-cc.bat` that sets the variables and starts uvicorn:

```bat
@echo off
cd /d C:\path\to\CatalogueCanvas\server
set CC_ADMIN_PASSWORD=changeme
set CC_SECRET_KEY=<random-hex>
set CC_DATA_DIR=C:\Users\<you>\cc-data
set CC_COOKIE_SECURE=false
set CC_STATIC_DIR=C:\path\to\CatalogueCanvas\web\dist
uv run uvicorn cataloguecanvas.main:app --host 0.0.0.0 --port 8000
```

**Notes / caveats:**
- This runs as a foreground process, not a Windows service. To survive reboots/logout, wrap it with Task Scheduler, NSSM, or `sc`.
- `cairosvg`/`cairocffi` install but depend on a native **Cairo** library that is not present on a stock Windows machine — **uploading items whose preview is an SVG will fail (HTTP 500)** until Cairo is installed. Items with a raster preview (PNG/JPEG/TIFF), browsing, and login are unaffected. On **x64** Windows, install an x64 GTK runtime (which ships `libcairo-2.dll`) and put its `bin` folder on `PATH`. On **ARM64**, see the next section.
- On first boot the SQLite database (`catalogue.db`) and the `storage` folder are created automatically under `CC_DATA_DIR`.

#### SVG rendering on Windows ARM64

SVG previews require the native **Cairo** library, and on Windows on ARM this is genuinely awkward — it was tested and made to work, but it is not a one-command install.

**Why it's hard:** the ARM64 CPython distributed by `uv` is an **ARM64EC/ARM64X hybrid** build. It **cannot load classic pure-ARM64 native DLLs** (such as the Cairo DLL from MSYS2), failing with `WinError 193 — %1 is not a valid Win32 application`, even though both the Python and the DLL report as ARM64. The Python ABI and the native-library ABI must match. As a result, on ARM64 the `uv`-managed Python cannot use a native ARM64 Cairo.

**The working approach (verified):** run the backend on a **classic-ARM64 Python from MSYS2** instead of the uv-managed one, and install native dependencies from MSYS2 (pacman) rather than building them with pip:

1. Install MSYS2 — `winget install MSYS2.MSYS2`.
2. From an MSYS2 shell, install Cairo and the native Python deps for the `clangarm64` toolchain:
   ```sh
   pacman -Sy
   pacman -S mingw-w64-clang-aarch64-cairo \
             mingw-w64-clang-aarch64-python \
             mingw-w64-clang-aarch64-python-pip \
             mingw-w64-clang-aarch64-python-lz4 \
             mingw-w64-clang-aarch64-python-pillow \
             mingw-w64-clang-aarch64-python-argon2_cffi \
             mingw-w64-clang-aarch64-python-pydantic \
             mingw-w64-clang-aarch64-python-pydantic-core
   ```
3. Install the remaining pure-Python dependencies and the app itself with that MSYS2 Python's pip. Use `--break-system-packages` (MSYS2 marks its Python externally-managed) and **plain `uvicorn`, not `uvicorn[standard]`** — the `[standard]` extras (`watchfiles`, `httptools`) and `lz4` have no prebuilt MinGW-ARM64 wheels and will try (and fail) to compile from source.
4. Start the server with the MSYS2 Python and the Cairo `bin` directory on `PATH`:
   ```bat
   set PATH=C:\msys64\clangarm64\bin;%PATH%
   C:\msys64\clangarm64\bin\python.exe -m uvicorn cataloguecanvas.main:app --host 0.0.0.0 --port 8000
   ```

> Note: `uv` cannot manage the MSYS2 interpreter (it rejects it with *"Unknown operating system: mingw_aarch64_ucrt_llvm"*), so on ARM64 with SVG support you step outside the `uv` workflow and use the MSYS2 Python directly.

**Verified result:** with this setup, uploading an SVG item returns HTTP 200, ingests normally, generates a valid WebP preview, and lz4-compresses the SVG source — the same flow that fails with the uv-managed Python.

**Summary:** on **x86/x64**, SVG support is straightforward (x64 GTK runtime supplies Cairo for the x64 Python). On **ARM64**, it requires the MSYS2 classic-ARM64 Python + pacman-installed native libraries described above.

#### Known cross-platform issue

API responses build asset URLs (`preview_url`, `download_urls`) using the operating system's path separator, so on Windows they come back with **backslashes** (e.g. `items\lantern-042\preview.webp`) instead of forward slashes. These currently still resolve, but backslashes are not valid in URLs and may break under some browsers or reverse proxies. URL construction should use `/` regardless of platform.

#### Uninstalling from Windows

There is no installer to remove — the app is just a copied folder plus a few tools. To uninstall:

1. **Stop the server.** Close the window running uvicorn, or end the `python.exe` process:
   ```powershell
   Get-Process python -ErrorAction SilentlyContinue | Stop-Process -Force
   ```
2. **Delete the application and data folders:**
   ```powershell
   Remove-Item -Recurse -Force C:\path\to\CatalogueCanvas
   Remove-Item -Recurse -Force C:\Users\<you>\cc-data   # the database and all uploaded assets
   Remove-Item -Force C:\Users\<you>\run-cc*.bat
   ```
   > Deleting `cc-data` removes the catalogue database and every stored item. Take a backup first (Settings → Backup & export) if you want to keep anything.
3. **Remove the toolchain (optional)** — only if nothing else on the machine uses it:
   ```powershell
   winget uninstall OpenJS.NodeJS.LTS
   winget uninstall astral-sh.uv
   winget uninstall MSYS2.MSYS2          # ARM64 SVG setup only
   ```
   MSYS2 also leaves its tree at `C:\msys64`; delete that folder to fully remove it.
4. **Remove leftover caches (optional):**
   ```powershell
   Remove-Item -Recurse -Force "$env:USERPROFILE\AppData\Roaming\uv"   # uv-managed Pythons
   Remove-Item -Recurse -Force "$env:USERPROFILE\AppData\Roaming\npm-cache"
   ```

---

## Backups

From **Settings → Backup & export**:
- **Database backup** — a single SQLite file snapshot.
- **Full backup** — a ZIP containing the database plus every stored asset across all libraries.

The Settings page also shows live stats: total items, total collections, and items missing a preview.

---

## At a glance

| You want to… | Where |
|---|---|
| Add new work | Upload button (top bar) → drop ZIP files |
| Tag, note, describe a work | Item page |
| Group related works | Collections |
| Mark a favorite | Heart icon on an item |
| Publish a shareable showcase | Portfolios → mark Public → share `/p/<slug>` |
| Store on another disk | Settings → Libraries |
| Configure AI descriptions | Settings → LLM defaults |
| Save a backup | Settings → Backup & export |
