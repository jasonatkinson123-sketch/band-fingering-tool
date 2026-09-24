const commonNotes = [
  { pitch:'Bb3', keys:['lh1','lh2','lh3','rh1','rh2','rh3','lowBb','lowC'], sourceNotation:'123 + low B♭ | 123 + low C' },
  { pitch:'B3',  keys:['lh1','lh2','lh3','rh1','rh2','rh3','lowB','lowC'], sourceNotation:'123 + low B | 123 + low C' },
  { pitch:'C4',  keys:['lh1','lh2','lh3','rh1','rh2','rh3','lowC'], sourceNotation:'123 | 123 + low C' },
  { pitch:'C#4', keys:['lh1','lh2','lh3','rh1','rh2','rh3','lowCSharp','lowC'], sourceNotation:'123 + low C♯ | 123 + low C' },
  { pitch:'D4',  keys:['lh1','lh2','lh3','rh1','rh2','rh3'], sourceNotation:'123 | 123' },
  { pitch:'Eb4', keys:['lh1','lh2','lh3','rh1','rh2','rh3','lowEb'], sourceNotation:'123 | 123 + E♭' },
  { pitch:'E4',  keys:['lh1','lh2','lh3','rh1','rh2'], sourceNotation:'123 | 12–' },
  { pitch:'F4',  keys:['lh1','lh2','lh3','rh1'], sourceNotation:'123 | 1––' },
  { pitch:'F#4', keys:['lh1','lh2','lh3','rh2'], sourceNotation:'123 | –2–' },
  { pitch:'G4',  keys:['lh1','lh2','lh3'], sourceNotation:'123 | –––' },
  { pitch:'Ab4', keys:['lh1','lh2','lh3','lhGSharp'], sourceNotation:'123 + G♯ | –––' },
  { pitch:'A4',  keys:['lh1','lh2'], sourceNotation:'12– | –––' },
  { pitch:'Bb4', keys:['lh1','lh2','sideBb'], sourceNotation:'12– | side B♭' },
  { pitch:'B4',  keys:['lh1'], sourceNotation:'1–– | –––' },
  { pitch:'C5',  keys:['lh2'], sourceNotation:'–2– | –––' },
  { pitch:'C#5', keys:[], sourceNotation:'open' },
  { pitch:'D5',  keys:['octave','lh1','lh2','lh3','rh1','rh2','rh3'], sourceNotation:'T 123 | 123' },
  { pitch:'Eb5', keys:['octave','lh1','lh2','lh3','rh1','rh2','rh3','lowEb'], sourceNotation:'T 123 | 123 + E♭' },
  { pitch:'E5',  keys:['octave','lh1','lh2','lh3','rh1','rh2'], sourceNotation:'T 123 | 12–' },
  { pitch:'F5',  keys:['octave','lh1','lh2','lh3','rh1'], sourceNotation:'T 123 | 1––' },
  { pitch:'F#5', keys:['octave','lh1','lh2','lh3','rh2'], sourceNotation:'T 123 | –2–' },
  { pitch:'G5',  keys:['octave','lh1','lh2','lh3'], sourceNotation:'T 123 | –––' },
  { pitch:'Ab5', keys:['octave','lh1','lh2','lh3','lhGSharp'], sourceNotation:'T 123 + G♯ | –––' },
  { pitch:'A5',  keys:['octave','lh1','lh2'], sourceNotation:'T 12– | –––' },
  { pitch:'Bb5', keys:['octave','lh1','lh2','sideBb'], sourceNotation:'T 12– | side B♭' },
  { pitch:'B5',  keys:['octave','lh1'], sourceNotation:'T 1–– | –––' },
  { pitch:'C6',  keys:['octave','lh2'], sourceNotation:'T –2– | –––' },
  { pitch:'C#6', keys:['octave'], sourceNotation:'T open' },
  { pitch:'D6',  keys:['octave','palmD'], sourceNotation:'T + palm D' },
  { pitch:'Eb6', keys:['octave','palmD','palmEb'], sourceNotation:'T + palm D + E♭' },
  { pitch:'E6',  keys:['octave','palmD','palmEb','sideE'], sourceNotation:'T + palm D + E♭ + side E' },
  { pitch:'F6',  keys:['octave','palmD','palmEb','palmF','sideE'], sourceNotation:'T + palm D + E♭ + F + side E' }
];

const verification = {
  sourceName: 'Yamaha — Saxophone Fingerings',
  sourceUrl: 'https://jp.yamaha.com/files/download/other_assets/1/320501/saxophones_fingerings.pdf',
  crossCheckName: 'The Woodwind Fingering Guide — Basic Saxophone',
  crossCheckUrl: 'https://www.wfg.woodwind.org/sax/',
  reviewed: '2026-09-24',
  scope: 'Primary written-pitch fingerings. Yamaha states the basic fingering is shared across saxophone sizes; baritone alone adds low A. Alternate and altissimo fingerings are omitted.'
};

const base = {
  icon:'🎷',
  clef:'treble',
  fingeringType:'keys',
  diagramFamily:'sax',
  registerBaseOctave:4,
  diagramKeys:[
    'octave','frontF','lh1','bisBb','lh2','lh3','palmD','palmEb','palmF',
    'lhGSharp','lowCSharp','lowB','lowBb','rh1','rh2','rh3','altFSharp',
    'sideE','sideC','sideBb','highFSharp','lowEb','lowC','lowA'
  ],
  verification
};

export const altoSax = {
  ...base,
  id:'alto-sax',
  name:'Alto Saxophone',
  transposition:'Eb',
  status:'verified',
  ranges:{ beginner:{min:'D4',max:'G5',label:'D4–G5'}, full:{min:'Bb3',max:'F6',label:'B♭3–F6'} },
  notes: commonNotes.map(n => ({...n,keys:[...n.keys]}))
};

export const tenorSax = {
  ...base,
  id:'tenor-sax',
  name:'Tenor Saxophone',
  transposition:'Bb',
  status:'verified',
  ranges:{ beginner:{min:'D4',max:'G5',label:'D4–G5'}, full:{min:'Bb3',max:'F6',label:'B♭3–F6'} },
  notes: commonNotes.map(n => ({...n,keys:[...n.keys]}))
};

export const bariSax = {
  ...base,
  id:'bari-sax',
  name:'Baritone Saxophone',
  transposition:'Eb',
  baritone:true,
  status:'verified',
  ranges:{ beginner:{min:'D4',max:'G5',label:'D4–G5'}, full:{min:'A3',max:'F6',label:'A3–F6'} },
  notes:[
    { pitch:'A3', keys:['lowA','lh1','lh2','lh3','rh1','rh2','rh3','lowC'], sourceNotation:'low A + 123 | 123 + low C' },
    ...commonNotes.map(n => ({...n,keys:[...n.keys]}))
  ]
};
