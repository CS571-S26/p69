PickupPal: browse pickup games, post one, filter the list, join a slot. Data stays in `localStorage` so it survives refresh (until you clear site data).

Live: https://cs571-s26.github.io/p69/

Routes: `/` home, `/post` new game, `/mine` your joins, `/about`, `/games/:id` for one game.

Run locally:

```bash
npm install
npm run dev
```

Build / lint:

```bash
npm run build
npm run lint
```

Deploy (outputs to `dist`, pushes with `gh-pages`):

```bash
npm run deploy
```

Built with Vite, React, React Router, React Bootstrap.
