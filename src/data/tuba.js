export const tuba = {
  id:'tuba',
  name:'Tuba',
  icon:'◎',
  clef:'bass',
  transposition:'C',
  fingeringType:'valves',
  diagramFamily:'valve',
  registerBaseOctave:1,
  status:'verified',
  verification:{
    sourceName:'StepWise — BB♭ Tuba Fingering Chart',
    sourceUrl:'https://www.stepwisepublications.com/uploads/1/6/2/6/16262424/______tuba_fingering_chart.pdf',
    crossCheckName:'Yamaha Musical Instrument Guide — 4-valve B♭ tuba fingering',
    crossCheckUrl:'https://www.yamaha.com/en/musical_instrument_guide/tuba/play/play002.html',
    reviewed:'2026-09-24',
    scope:'BB♭ tuba in concert-pitch bass clef, using primary three-valve fingerings from E1 through B♭3. Fourth-valve and compensating-system alternatives vary by instrument and are intentionally omitted.'
  },
  ranges:{
    beginner:{min:'Bb1',max:'Bb2',label:'B♭1–B♭2'},
    full:{min:'E1',max:'Bb3',label:'E1–B♭3'}
  },
  notes:[
    {pitch:'E1',valves:[1,2,3]},{pitch:'F1',valves:[1,3]},{pitch:'F#1',valves:[2,3]},{pitch:'G1',valves:[1,2]},{pitch:'Ab1',valves:[1]},{pitch:'A1',valves:[2]},{pitch:'Bb1',valves:[]},
    {pitch:'B1',valves:[1,2,3]},{pitch:'C2',valves:[1,3]},{pitch:'C#2',valves:[2,3]},{pitch:'D2',valves:[1,2]},{pitch:'Eb2',valves:[1]},{pitch:'E2',valves:[2]},{pitch:'F2',valves:[]},
    {pitch:'F#2',valves:[2,3]},{pitch:'G2',valves:[1,2]},{pitch:'Ab2',valves:[1]},{pitch:'A2',valves:[2]},{pitch:'Bb2',valves:[]},
    {pitch:'B2',valves:[1,2]},{pitch:'C3',valves:[1]},{pitch:'C#3',valves:[2]},{pitch:'D3',valves:[]},{pitch:'Eb3',valves:[1]},{pitch:'E3',valves:[2]},{pitch:'F3',valves:[]},
    {pitch:'F#3',valves:[2,3]},{pitch:'G3',valves:[1,2]},{pitch:'Ab3',valves:[1]},{pitch:'A3',valves:[2]},{pitch:'Bb3',valves:[]}
  ].map(n=>({...n,sourceNotation:n.valves.length?n.valves.join(' + '):'OPEN'}))
};
