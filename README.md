# Shelf

A single page that saves single-file HTML tools on a device and runs them full screen, offline, from a real web address.

- **Add a tool:** open the page, tap *Add a tool from Files*, pick an `.html` file. It is stored in that browser only.
- **Run it:** tap it, or open its link, `?run=<name>`.
- **Update it:** *Replace with a newer file* keeps the same link and the tool's saved data.
- **Carry-all link:** packs a whole tool after the `#` mark. That part of an address is never sent to a server.

Nothing here contains any tool or any data. Tools and their data stay on the device that added them.
Every tool on one shelf shares that shelf's storage, so only add files you trust.

Files: `index.html` (the shelf), `sw.js` (offline copy), `icon.png` (Home Screen icon).
