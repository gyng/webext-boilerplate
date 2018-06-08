# webext-boilerpalte

[![Build Status](https://travis-ci.org/gyng/webext-boilerplate.svg?branch=master)](https://travis-ci.org/gyng/webext-boilerplate)

This boilerplate is a quick start for creating a browser web extension.

It includes a basic setup for:

* WebExtension structure and required files
* Testing (jest)
* Linting (eslint)
* Building (web-ext)

## Clone

Requires yarn and Firefox. Clone, fork, or obtain the boilerplate and update your git remotes

```
git@github.com:gyng/webext-boilerplate.git
git remote add origin <YOUR_ORIGIN>
```

## Develop

```
yarn install
yarn d
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
