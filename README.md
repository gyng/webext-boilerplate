# webext-boilerplate

[![Build Status](https://travis-ci.org/gyng/webext-boilerplate.svg?branch=master)](https://travis-ci.org/gyng/webext-boilerplate)

This TypeScript boilerplate is a quick start for creating a browser web extension. Supports Firefox and Chrome (via polyfill).

It includes a basic setup for:

* WebExtension structure and required files
* Testing (jest)
* Linting (tslint)
* Building (webpack, web-ext)
* Options management across content and background scripts (`src/core/options`)
* Options frontend with React
* A messaging setup between background script, content script, and options page (`src/core/messaging.js`, `src/listeners.ts`)
* Chrome polyfill for compatiability across Firefox and Chrome

## Clone

Requires yarn and Firefox. Clone, fork, or obtain the boilerplate and update your git remotes

```
git@github.com:gyng/webext-boilerplate.git
git remote add origin <YOUR_ORIGIN>
```

## Develop

```
yarn install
yarn d           # Wait a while for it to load the extension
yarn d:noenv     # For use with Windows
```

Visit `about:debugging` and `about:extensions` in the Firefox window that just popped up.

```
yarn lint
yarn lint:fix
yarn test
yarn test:watch
```

### Quickstart

Define your options in `src/schema.ts`, and then create a React component in `src/options/components/OptionsPage.tsx` with the `name` property set to the option name as defined in `schema.ts`. The option should be automatically bound once this is done.

* Background script is in `src/background`
* Content script is in `src/content`
* Options page is in `src/options/components/OptionsPage.tsx`
* Create your own messaging actions and listener in `src/listeners.ts`

## Build

Builds a package in the `web-ext-artifacts` directory.

```
yarn build
```

## Deploy

* Firefox: https://addons.mozilla.org/en-US/developers/addons
* Chrome: https://chrome.google.com/webstore/developer/dashboard
* Edge: https://developer.microsoft.com/en-us/microsoft-edge/extensions/requests/

## Notes for reviewers

To build the project:

1. `yarn install`
2. `yarn build`: the output will be placed in the `dist` directory.

This project includes vendored third-party libraries in addition to those defined in `package.json`

* [webextension-polyfill](https://github.com/mozilla/webextension-polyfill), obtained from [unpkg](https://unpkg.com/webextension-polyfill/dist/) as recommended by the author
* [l10n](https://github.com/piroor/webextensions-lib-l10n), modified from [source](https://github.com/piroor/webextensions-lib-l10n/blob/4b4589032ece93ea0907715f765310514f7e4aab/l10n.js)

The project also includes third-party libraries obtained from npm. The list can be seen in the `dependencies` key of `package.json`.

* react
* react-dom

<Add notes here if you include third-party dependencies, or have added more stuff for the build process>
