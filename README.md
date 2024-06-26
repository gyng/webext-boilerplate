# webext-boilerplate

This TypeScript boilerplate is a quick start for creating a browser web extension. Supports Firefox and Chrome (via polyfill).

It includes a basic setup for:

- Manifest v3 WebExtension structure and required files
- Typescript
- Testing (jest, GHA)
- Linting (eslint, web-ext)
- Building (esbuild, web-ext)
- Options management across content and background scripts/service worker (`src/core/options`)
- Options frontend using React, with localisation support
- A messaging setup between background script, content script, and options page (`src/core/messaging.ts`, `src/listeners.ts`)
- Chrome polyfill for compatibility across Firefox and Chrome

## Clone

Requires npm and Firefox. Clone, fork, or obtain the boilerplate somehow and then update your git remotes

```
git clone https://github.com/gyng/webext-boilerplate.git
cd webext-boilerplate
git remote add origin <YOUR_ORIGIN>
```

## Develop

```mermaid
flowchart LR
    Source -->|npm run d:esbuild| B["JS in /dist"] --> |npm run d:webext| Browser
```

You will need to run both `WATCH=1 d:esbuild` and `d:webext` at the same time.

```
npm run install
npm run d:esbuild       # Start the webpack watcher (TS > JS)
npm run d:webext        # Start the web-ext watcher (JS > Browser)

npm run d:noenv         # Starts web-ext without extra env variables (for use with Windows)
npm run d:locale:en     # Starts web-ext in en-US locale (this is bugged in Firefox still)
```

Visit `about:debugging` and `about:extensions` in the Firefox window that just popped up.

```
npm run lint
npm run lint:fix
npm run test
npm run test:watch
```

### Quickstart

```mermaid
graph
    L[(browser.storage)] --- |load, store options| B
    B["Background script or service worker<br />(always running)"] --- |Get, set options| O
    O[Options UI]
    C["Content script<br />(DOM access, specific sites; eg, www.example.com)"]
    B --- |Custom message| C
```

Define your options in `src/schema.ts`, and then create a React component in `src/options/components/OptionsPage.tsx` with the `name` property set to the option name as defined in `schema.ts`. The option should be automatically bound once this is done.

- Background script/service worker is in `src/background`
- Content script is in `src/content`
- Options page is in `src/options/components/OptionsPage.tsx`
- Create your own messaging actions and listener in `src/messaging.ts`. You should not have to touch core messaging used for options saving in `src/core/messaging.ts`.
- Change permissions in `manifest.json`. If you're getting weird errors make sure your permissions are correct!

## Build

```mermaid
flowchart
    S[Typescript source code] -->|npm run d:esbuild| Dist["JS + HTML + CSS in /dist"] --> |npm run d:webext| Browser[Dev browser]
    Locale[Locale files] --> |npm run gen:tl-key| S
    Dist --> |npm run package| ZIP[Extension ZIP]
```

Bundles your code into .js files in `/dist`:

Bump the version number in `manifest.json` first.

```
npm run build
```

Takes the built files in `/dist`, and bundles + creates a package in the `web-ext-artifacts` directory:

```
npm run build:release
npm run build:release:minified  # This minifies and is therefore discouraged
```

Unminified packages are slower and larger (especially for React), but allows human checkers to scan through the code.

- Due to the esbuild setup, the options entrypoint in `/dist/index-{somehash}.html` is manually copied over using at the package step using `copystatic.sh`.

- To add new localisation strings, edit `_locales/en/messages.json`. Once done, run `npm run gen:tl-key` to create TS typedefinitions for you new i18n keys for typechecking. To check, run `d:locale:ja` (create new scripts in `package.json` as needed).

- CSS can be bundled by importing the css and the adding a reference to it in the code (eg, `import a from "./a.css"; console.log(a);`)

## Deploy

- Firefox: https://addons.mozilla.org/en-US/developers/addons
- Chrome: https://chrome.google.com/webstore/developer/dashboard
- Edge: https://developer.microsoft.com/en-us/microsoft-edge/extensions/requests/

## Manifest v3

- The `background.service_worker` key is not supported by Firefox while `background.scripts` is not supported by Chrome.
- Fill in `browser_specific_settings.gecko.id` with your own ID (https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_specific_settings)

## Notes for reviewers

To build the project:

1. `npm run install`
2. `npm run build`: the output will be placed in the `dist` directory.

This project includes vendored third-party libraries in addition to those defined in `package.json`

- [webextension-polyfill](https://github.com/mozilla/webextension-polyfill), obtained from npm
- [l10n](https://github.com/piroor/webextensions-lib-l10n), modified from [source](https://github.com/piroor/webextensions-lib-l10n/blob/4b4589032ece93ea0907715f765310514f7e4aab/l10n.js)

The project also includes third-party libraries obtained from npm. The list can be seen in the `dependencies` key of `package.json`.

- react
- react-dom

<Add notes here if you include third-party dependencies, or have added more stuff for the build process>
