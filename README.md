# Respiración Yogui

Responsive wellness web app for choosing a mood and following a guided breathing routine with animation, voice prompts, and generated background music.

## Run

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Background Music

Put these MP3 files in `assets/audio/`:

- `sleep-music-no-1-chris-haugen.mp3`
- `jomon-grove-the-mini-vandals.mp3`
- `akatsuki-rising-the-mini-vandals.mp3`

If a track is missing, the app falls back to a generated soft-rain layer so the session still works.

## Local data

The app uses IndexedDB with three object stores:

- `User`
- `Routine`
- `Session`

`Routine` is seeded with one routine for each mood. `Session` records the selected routine, mood before, mood after, date, and completion state.

An equivalent SQL definition is available in `schema.sql`.
