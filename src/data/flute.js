export const flute = {
  id: 'flute',
  name: 'Flute',
  icon: '◌',
  clef: 'treble',
  transposition: 'C',
  fingeringType: 'keys',
  registerBaseOctave: 4,
  status: 'verified',
  verification: {
    sourceName: 'Yamaha Musical Instrument Guide — Flute fingering chart',
    sourceUrl: 'https://www.yamaha.com/en/musical_instrument_guide/common/images/flute/fingering.pdf',
    crossCheckName: 'The Woodwind Fingering Guide — Basic Flute and Piccolo fingerings',
    crossCheckUrl: 'https://www.wfg.woodwind.org/flute/',
    reviewed: '2026-09-24',
    scope: 'Primary closed-G♯ concert-flute fingerings from C4 through C6. Alternate, trill, harmonic, and special-purpose fingerings are intentionally omitted.'
  },
  diagramKeys: [
    'thumbBb','thumbB','lh1','lh2','lh3','gSharp',
    'bbTrill','rh1','dTrill','rh2','dSharpTrill','rh3',
    'eb','lowCSharp','lowC'
  ],
  ranges: {
    beginner: { min: 'D4', max: 'Bb5', label: 'D4–B♭5' },
    full: { min: 'C4', max: 'C6', label: 'C4–C6' }
  },
  notes: [
    { pitch: 'C4',  keys: ['thumbB','lh1','lh2','lh3','rh1','rh2','rh3','lowC'], sourceNotation: 'T 123 | 123 + low C' },
    { pitch: 'C#4', keys: ['thumbB','lh1','lh2','lh3','rh1','rh2','rh3','lowCSharp'], sourceNotation: 'T 123 | 123 + low C♯' },
    { pitch: 'D4',  keys: ['thumbB','lh1','lh2','lh3','rh1','rh2','rh3'], sourceNotation: 'T 123 | 123' },
    { pitch: 'Eb4', keys: ['thumbB','lh1','lh2','lh3','rh1','rh2','rh3','eb'], sourceNotation: 'T 123 | 123 + E♭' },
    { pitch: 'E4',  keys: ['thumbB','lh1','lh2','lh3','rh1','rh2','eb'], sourceNotation: 'T 123 | 12– + E♭' },
    { pitch: 'F4',  keys: ['thumbB','lh1','lh2','lh3','rh1','eb'], sourceNotation: 'T 123 | 1–– + E♭' },
    { pitch: 'F#4', keys: ['thumbB','lh1','lh2','lh3','rh3','eb'], sourceNotation: 'T 123 | ––3 + E♭' },
    { pitch: 'G4',  keys: ['thumbB','lh1','lh2','lh3','eb'], sourceNotation: 'T 123 | ––– + E♭' },
    { pitch: 'Ab4', keys: ['thumbB','lh1','lh2','lh3','gSharp','eb'], sourceNotation: 'T 123 + G♯ | ––– + E♭' },
    { pitch: 'A4',  keys: ['thumbB','lh1','lh2','eb'], sourceNotation: 'T 12– | ––– + E♭' },
    { pitch: 'Bb4', keys: ['thumbB','lh1','rh1','eb'], sourceNotation: 'T 1–– | 1–– + E♭' },
    { pitch: 'B4',  keys: ['thumbB','lh1','eb'], sourceNotation: 'B 1–– | ––– + E♭' },
    { pitch: 'C5',  keys: ['lh1','eb'], sourceNotation: '1–– | ––– + E♭' },
    { pitch: 'C#5', keys: ['eb'], sourceNotation: '––– | ––– + E♭' },
    { pitch: 'D5',  keys: ['thumbB','lh2','lh3','rh1','rh2','rh3'], sourceNotation: 'T –23 | 123' },
    { pitch: 'Eb5', keys: ['thumbB','lh2','lh3','rh1','rh2','rh3','eb'], sourceNotation: 'T –23 | 123 + E♭' },
    { pitch: 'E5',  keys: ['thumbB','lh1','lh2','lh3','rh1','rh2','eb'], sourceNotation: 'T 123 | 12– + E♭' },
    { pitch: 'F5',  keys: ['thumbB','lh1','lh2','lh3','rh1','eb'], sourceNotation: 'T 123 | 1–– + E♭' },
    { pitch: 'F#5', keys: ['thumbB','lh1','lh2','lh3','rh3','eb'], sourceNotation: 'T 123 | ––3 + E♭' },
    { pitch: 'G5',  keys: ['thumbB','lh1','lh2','lh3','eb'], sourceNotation: 'T 123 | ––– + E♭' },
    { pitch: 'Ab5', keys: ['thumbB','lh1','lh2','lh3','gSharp','eb'], sourceNotation: 'T 123 + G♯ | ––– + E♭' },
    { pitch: 'A5',  keys: ['thumbB','lh1','lh2','eb'], sourceNotation: 'T 12– | ––– + E♭' },
    { pitch: 'Bb5', keys: ['thumbB','lh1','rh1','eb'], sourceNotation: 'T 1–– | 1–– + E♭' },
    { pitch: 'B5',  keys: ['thumbB','lh1','eb'], sourceNotation: 'B 1–– | ––– + E♭' },
    { pitch: 'C6',  keys: ['lh1','eb'], sourceNotation: '1–– | ––– + E♭' }
  ]
};
