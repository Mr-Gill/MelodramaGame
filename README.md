# Melodrama Werewolf Narrator Tool

This repository hosts a single-page web application that helps drama teachers run the classroom game **Melodrama Werewolf**. The app is designed to work on GitHub Pages (or any static host) and includes a full roster of characters, night/day narration prompts, a classroom-friendly timer, and note-taking utilities.

## Features

- Guided setup for 12–25 players with role cards grouped by dramatic type.
- Auto-balancing badge that ensures the selected characters meet recommended good/evil and type counts.
- Narrator dashboard with large-print script steps for the current phase, quick night/day reminders, and a persistent discussion timer.
- Player management panel for tracking eliminations, protections, and private narrator notes.
- Downloadable notes export and offline support via a service worker.
- Light/dark mode toggle and theme selector for flavourful narration variants.

## Local Development

Open the project in any modern browser:

```bash
# Serve locally (optional)
npx serve .
```

Then navigate to `http://localhost:3000` (or the URL provided by your static server). The application is completely client-side; no build step is required.

## Deployment

1. Commit the latest changes to the main branch.
2. Enable GitHub Pages for the repository (Settings → Pages → Deploy from a branch → `main` branch, `/ (root)` folder).
3. Visit the published URL. The PWA manifest and service worker allow the narrator to continue using the tool offline once assets have loaded.

## Acknowledgements

Created as a teaching aid for the **Melodrama Werewolf: Year 7** drama unit. All artwork referenced in the design brief can be added later as static assets.
