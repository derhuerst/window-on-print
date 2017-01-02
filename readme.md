# window-on-print

**Reliably detect when the user prints.** A better solution for [`beforeprint`](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeprint)/[`afterprint`](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onafterprint).

[![npm version](https://img.shields.io/npm/v/window-on-print.svg)](https://www.npmjs.com/package/window-on-print)
[![build status](https://img.shields.io/travis/derhuerst/window-on-print.svg)](https://travis-ci.org/derhuerst/window-on-print)
[![dependency status](https://img.shields.io/david/derhuerst/window-on-print.svg)](https://david-dm.org/derhuerst/window-on-print)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/window-on-print.svg)](https://david-dm.org/derhuerst/window-on-print#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/window-on-print.svg)


## Installing

Use the bundle from `build/window-on-print.min.js` or install using [npm](https://www.npmjs.com).

```shell
npm install window-on-print
```


## Usage

**`onPrint.before` and `onPrint.after` will both call the callback only once.**

```js
const onPrint = require('window-on-print')

onPrint.before(window, () => {
	console.info('user is going to print')
})
onPrint.after(window, () => {
	console.info('user is has printed or aborted')
})
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/window-on-print/issues).
