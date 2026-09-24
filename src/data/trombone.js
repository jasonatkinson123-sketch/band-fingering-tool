export const trombone = {
  id:'trombone',
  name:'Trombone',
  icon:'↔',
  clef:'bass',
  transposition:'C',
  fingeringType:'position',
  diagramFamily:'trombone',
  registerBaseOctave:2,
  status:'verified',
  verification:{
    sourceName:'Yamaha Musical Instrument Guide — Trombone position diagram',
    sourceUrl:'https://www.yamaha.com/en/musical_instrument_guide/trombone/play/play002.html',
    crossCheckName:'Trombone slide-position harmonic series reference',
    crossCheckUrl:'https://en.wikibooks.org/wiki/Trombone/Slide_Positions',
    reviewed:'2026-09-24',
    scope:'Straight tenor trombone, standard seven-position primary choices, concert-pitch bass clef. F-attachment and context-specific alternate positions are intentionally omitted.'
  },
  ranges:{
    beginner:{min:'Bb2',max:'Bb3',label:'B♭2–B♭3'},
    full:{min:'E2',max:'Bb4',label:'E2–B♭4'}
  },
  notes:[
    {pitch:'E2',position:7},{pitch:'F2',position:6},{pitch:'F#2',position:5},{pitch:'G2',position:4},{pitch:'Ab2',position:3},{pitch:'A2',position:2},{pitch:'Bb2',position:1},
    {pitch:'B2',position:7},{pitch:'C3',position:6},{pitch:'C#3',position:5},{pitch:'D3',position:4},{pitch:'Eb3',position:3},{pitch:'E3',position:2},{pitch:'F3',position:1},
    {pitch:'F#3',position:5},{pitch:'G3',position:4},{pitch:'Ab3',position:3},{pitch:'A3',position:2},{pitch:'Bb3',position:1},
    {pitch:'B3',position:4},{pitch:'C4',position:3},{pitch:'C#4',position:2},{pitch:'D4',position:1},{pitch:'Eb4',position:3},{pitch:'E4',position:2},{pitch:'F4',position:1},
    {pitch:'F#4',position:5},{pitch:'G4',position:4},{pitch:'Ab4',position:3},{pitch:'A4',position:2},{pitch:'Bb4',position:1}
  ].map(n=>({...n,sourceNotation:`${n.position}${n.position===1?'st':n.position===2?'nd':n.position===3?'rd':'th'} position`}))
};
