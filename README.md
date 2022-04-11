# aoec-browser-demo

[Create React App](https://create-react-app.dev/) based Web Browser Demo of [aoec](https://github.com/studio2aoe/aoec)

## Required
- Build
  - Node.js (tested on `node v16.14.2` & `npm 8.6.0`)
  - Rust (tested on `rustc 1.59.0` & `cargo 1.59.0`)

- Browser features
  - [AudioWorklet](https://caniuse.com/?search=AudioWorklet)

- Tested Browser
  - Chromium Stable (tested on 100)
  - Firefox Stable (tested on 99)

## Play the demo

```bash
git clone https://github.com/studio2aoe/aoec-browser-demo
git clone https://github.com/studio2aoe/aoec # aoec is work in progress, so not registered to npm yet

cd aoec-browser-demo
npm install # Install dependency for the App

cd processor
npm install # Install dependency for AudioWorkletProcessor

cd ../
npm run build-crate     # Build the WASM Crate
npm run build-processor # Build the AudioWorkletProcessor
npm run start           # Start the dev-server
```

and browse `http://localhost:3000`

※ WASM Crate (`./crate`) and AudioWorkletProcessor (`./processor`) are not included in the CRA package. 
The modules should be built manually, and rebuilt when they are changed.