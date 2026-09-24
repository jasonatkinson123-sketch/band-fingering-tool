import { clarinet } from './clarinet.js';

const shared = clarinet.notes.map(note => ({ ...note, keys: [...note.keys] }));

export const bassClarinet = {
  id: 'bass-clarinet',
  name: 'Bass Clarinet',
  icon: '♩',
  clef: 'treble',
  transposition: 'Bb',
  system: 'Boehm',
  fingeringType: 'keys',
  diagramFamily: 'clarinet',
  lowExtension: true,
  registerBaseOctave: 3,
  status: 'verified',
  verification: {
    sourceName: 'The Woodwind Fingering Guide — Boehm-system low clarinets',
    sourceUrl: 'https://www.wfg.woodwind.org/clarinet/basscl_alt_1.html',
    crossCheckName: 'Yamaha Musical Instrument Guide — Clarinet Boehm-system chart',
    crossCheckUrl: 'https://www.yamaha.com/en/musical_instrument_guide/clarinet/play/play002.html',
    reviewed: '2026-09-24',
    scope: 'Written E♭3 low-extension fingering plus the primary Boehm-system E3–C6 fingerings shared with soprano clarinet. Low-D and low-C extension models vary and are not included.'
  },
  diagramKeys: [...clarinet.diagramKeys, 'lowEb'],
  ranges: {
    beginner: { min: 'F3', max: 'G5', label: 'F3–G5' },
    full: { min: 'Eb3', max: 'C6', label: 'E♭3–C6' }
  },
  notes: [
    { pitch:'Eb3', keys:['thumb','lh1','lh2','lh3','rh1','rh2','rh3','lowEb'], sourceNotation:'T 123 | 123 + low E♭' },
    ...shared
  ]
};
