This is the default GitHub Pages setup for [webext-boilerplate](https://github.com/gyng/webext-boilerplate).

Find me in in `docs/index.md`.

## webext-boilerplate is a WebExtension quickstart

[webext-boilerplate](https://github.com/gyng/webext-boilerplate) is a quickstart repository for WebExtensions.

It includes a basic setup for:

- Manifest v3 WebExtension structure and required files
- Typescript
- Testing (jest, GHA)
- Linting (eslint, web-ext)
- Building (esbuild, web-ext)
- Options management across content and background scripts (`src/core/options`)
- Options frontend using React, with localisation support
- A messaging setup between background script, content script, and options page (`src/core/messaging.ts`, `src/listeners.ts`)
- Chrome polyfill for compatibility across Firefox and Chrome
