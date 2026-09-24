# Band Fingering Lab

Static, student-facing fingering lookup tool for middle school concert band.

## Current build

The app now has **two enabled, source-verified instruments**:

- **Trumpet** — primary written fingerings, F♯3–C6
- **Flute** — primary closed-G♯ concert-flute fingerings, C4–C6

**Clarinet is now in verification**, with Yamaha's Boehm-system fingering chart stored as the primary source. It remains disabled until its data and diagram pass the same audit process.

This project deliberately prefers fewer verified instruments over broad but uncertain coverage.

## Verification sources

### Trumpet
Yamaha Musical Instrument Guide — Trumpet fingering chart  
https://www.yamaha.com/en/musical_instrument_guide/common/images/trumpet/fingering.pdf

### Flute
Yamaha Musical Instrument Guide — Flute fingering chart  
https://www.yamaha.com/en/musical_instrument_guide/common/images/flute/fingering.pdf

Cross-check: The Woodwind Fingering Guide, basic closed-G♯ flute fingerings  
https://www.wfg.woodwind.org/flute/

### Clarinet — verification in progress
Yamaha Musical Instrument Guide — Clarinet fingering chart (Boehm system)  
https://www.yamaha.com/en/musical_instrument_guide/common/images/clarinet/fingering.pdf

## Architecture

- `src/data/` — verified fingering data and source metadata
- `src/diagrams/` — reusable deterministic instrument diagrams
- `src/components/` — pitch and staff rendering logic
- `src/app.js` — student UI and multi-instrument audit view
- `tests/validate.mjs` — data integrity and diagram-key validation

The app never creates a separate generated image for each pitch. It renders reusable diagrams directly from structured fingering data.

## Run locally

Any static server will work. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Audit mode

Open:

`?audit=1`

or target an enabled instrument directly:

`?audit=flute`  
`?audit=trumpet`

The audit view displays every encoded fingering and rendered diagram side by side, along with the verification source.

## Validate data

```bash
npm run validate
```

A GitHub Actions workflow is configured to run the validation suite and JavaScript syntax checks on pushes and pull requests.

## GitHub Pages

This project has no build step. It can be deployed directly from the repository root with GitHub Pages.

## Instrument onboarding rule

An instrument is enabled only after:

1. selecting an authoritative reference,
2. encoding primary fingerings as structured data,
3. building one reusable deterministic diagram,
4. validating every referenced key/valve/position,
5. reviewing the entire instrument in audit mode.

If a fingering is uncertain, the instrument stays disabled.
