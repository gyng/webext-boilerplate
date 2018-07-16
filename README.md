# webext-boilerpalte

[![Build Status](https://travis-ci.org/gyng/webext-boilerplate.svg?branch=master)](https://travis-ci.org/gyng/webext-boilerplate)

This boilerplate is a quick start for creating a browser web extension.

It includes a basic setup for:

* WebExtension structure and required files
* Testing (jest)
* Linting (eslint)
* Building (web-ext)
* Options management across content and background scripts (`src/options`)
* Chrome polyfill for compatiability across Firefox and Chrome (`src/chrome-polyfill.js`)
* A messaging setup between background script, content script, and options page (`src/background/core/messaging.js`)

Files are deliberatly kept as plain Javascript files as this makes it easier for addon reviewers to review. It also works better with tooling. This is something to reconsider: maybe TypeScript might work better since largish extensions tend to get unwieldly.

### Options

Define your options in `src/background/options.js`, and then create an HTML element in `src/options/options.html` with the `id` attribute set to the option name as defined in `options.js`. The option should be automatically bound once this is done.

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

<Add notes here if you include third-party dependencies, or have added more stuff for the build process>
