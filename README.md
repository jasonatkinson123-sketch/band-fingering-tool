# Band Fingering Lab

Static, student-facing fingering/position lookup tool for middle school concert band.

## Current build

The full planned instrument set is wired into the app:

- Flute
- Clarinet
- Bass Clarinet
- Alto Saxophone
- Tenor Saxophone
- Baritone Saxophone
- Trumpet
- French Horn
- Trombone
- Baritone / Euphonium
- Tuba

Across the library there are currently **342 structured note entries**. The app never creates a separate generated image for a note. Each instrument family has one reusable deterministic diagram that is driven by structured fingering or position data.

## Instrument configurations

This first complete middle-school build is intentionally explicit about instrument variants:

- Flute: standard closed-G♯ concert flute
- Clarinet: Boehm-system B♭ clarinet
- Bass Clarinet: Boehm-system B♭ bass clarinet with low-E♭ extension
- Saxophones: standard written-pitch saxophone fingering; baritone includes low A
- Trumpet: three-valve B♭ trumpet
- French Horn: **single F horn** chart
- Trombone: straight tenor trombone, seven slide positions, no F attachment
- Baritone / Euphonium: three-valve, bass-clef concert pitch
- Tuba: three-valve BB♭ tuba, bass-clef concert pitch

Those distinctions are intentional. Fingerings that depend on a different hardware configuration are not silently mixed into the student display.

## Verification approach

Primary fingerings were transcribed from published fingering references and preserved with source metadata in each instrument data file. Where a source presents alternate fingerings, the student interface uses one primary standard choice and the audit page records the scope/limitations.

Core references include Yamaha Musical Instrument Guide / Yamaha fingering charts, plus The Woodwind Fingering Guide and StepWise charts where useful for cross-checking instrument-family details.

## Architecture

- `src/data/` — structured fingering/position data, ranges, configurations, and source metadata
- `src/diagrams/` — reusable deterministic diagrams
- `src/components/` — pitch parsing and treble/bass staff rendering
- `src/app.js` — student UI and multi-instrument audit view
- `tests/validate.mjs` — integrity, range, valve, key-ID, and slide-position validation
- `.github/workflows/validate.yml` — repository validation workflow

## Student flow

1. Choose an instrument.
2. Choose a written note.
3. See:
   - note name
   - notation on the proper clef
   - standard primary fingering/position
   - deterministic diagram
   - previous/next-note navigation

Every instrument also has **Beginner** and **Full** range modes.

## Audit mode

Open:

`?audit=1`

or target an instrument directly, for example:

`?audit=flute`  
`?audit=clarinet`  
`?audit=trombone`

The audit page displays every encoded note, its text representation, the rendered diagram, configuration notes, and verification sources side by side.

## Validation

Run:

```bash
npm run validate
```

The validation suite checks, among other things:

- expected instrument registry
- valid and ascending pitch data
- duplicate pitches
- beginner-range containment
- valid three-valve combinations
- valid 1–7 trombone positions
- woodwind key IDs against the actual diagram controls
- source metadata presence

A GitHub Actions workflow is configured to run validation and syntax checks on repository pushes and pull requests.

## GitHub Pages

There is no build step. The project is designed to deploy directly from the repository root through GitHub Pages.

## Accuracy rule

If a future instrument variant or note cannot be verified confidently, it should remain unavailable rather than being represented by a plausible-looking guess.

The central rule remains:

**verified structured data → deterministic rendering → displayed diagram**
