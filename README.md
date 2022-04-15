# aoec-browser-demo (Work in Progress)

[Create React App](https://create-react-app.dev/) based Web Browser Demo of [aoec](https://github.com/studio2aoe/aoec)

## Required
- Build
  - Node.js (tested on `node v16.14.2` & `npm 8.6.0`)

- Browser features
  - [AudioWorklet](https://caniuse.com/?search=AudioWorklet)

- Tested Browser
  - Chromium Stable (tested on 100)
  - Firefox Stable (tested on 99)

## Play the demo

```bash
git clone https://github.com/studio2aoe/aoecjs # Dynamic dependencies
git clone https://github.com/studio2aoe/aoec-browser-demo # The demo

# Build aoecjs & install on the demo
cd aoecjs
npm install
npm run build
mkdir -p ../aoec-browser-demo/public/static/aoecjs
cp dist/* ../aoec-browser-demo/public/static/aoecjs

# Build and start the demo
cd ../aoec-browser-demo
npm install
npm run start

```

and browse `http://localhost:3000`

※ The demo using aoecjs version 0.0.1, make sure the built aoecjs paths are
  - `(repo)/public/static/aoecjs/aoecjs.0.0.1.wasm`
  - `(repo)/public/static/aoecjs/aoecjs.0.0.1.js`
