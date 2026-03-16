# Timer (Next.js)

Production-ready React + Next.js countdown timer converted from your original HTML.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for production

```bash
npm run build
npm run start
```

## Project structure

- `app/layout.js`: root layout + Google font loading + metadata
- `app/page.js`: page entrypoint
- `app/globals.css`: global styling/theme system
- `components/TimerApp.jsx`: timer UI + React state/effects
- `lib/time.js`: time helpers
- `lib/sound.js`: completion chime sound generator
