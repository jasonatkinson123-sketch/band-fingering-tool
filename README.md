# Band Fingering Lab

Static, student-facing fingering lookup tool for middle school concert band.

## Current build: Phase 1 proof of concept

The architecture is complete and **Trumpet is the only enabled instrument**. This is intentional: the project specification prioritizes verified data over broad but uncertain coverage.

### Trumpet data source

Yamaha Musical Instrument Guide — Trumpet fingering chart:
https://www.yamaha.com/en/musical_instrument_guide/common/images/trumpet/fingering.pdf

Only the chart's primary fingering is encoded. Alternate fingerings shown by Yamaha are deliberately omitted from this first version.

## Architecture

- `src/data/` — verified fingering data and source metadata
- `src/diagrams/` — reusable deterministic instrument diagrams
- `src/components/` — pitch and staff rendering logic
- `src/app.js` — student UI and audit view
- `tests/validate.mjs` — data integrity checks

The app never creates per-note fingering images. It renders a reusable valve diagram from structured data.

## Run locally

Any static server will work. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Audit mode

Open:

`?audit=1`

Example:

`http://localhost:8000/?audit=1`

This displays every trumpet note, encoded fingering, and rendered diagram side by side.

## Validate data

```bash
npm run validate
```

## GitHub Pages

This project has no build step. It can be deployed directly from the repository root with GitHub Pages.

## Next instruments

Add instruments one at a time only after:

1. selecting an authoritative reference,
2. encoding primary fingerings as structured data,
3. validating diagram key IDs / positions,
4. reviewing the instrument in audit mode.
