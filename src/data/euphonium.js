export const euphonium = {
  id:'euphonium',
  name:'Baritone / Euphonium',
  icon:'◉',
  clef:'bass',
  transposition:'C',
  configuration:'3-valve B♭ baritone/euphonium',
  fingeringType:'valves',
  diagramFamily:'valve',
  registerBaseOctave:2,
  status:'verified',
  verification:{
    sourceName:'StepWise — Baritone/Euphonium Extended Range Fingering Chart (Bass Clef)',
    sourceUrl:'https://www.stepwisepublications.com/uploads/1/6/2/6/16262424/baritone_extended_fingering_chart.pdf',
    crossCheckName:'Yamaha — Alto Horn/Baritone/Euphonium/Tuba/Sousaphone fingering chart',
    crossCheckUrl:'https://usa.yamaha.com/products/contents/winds/downloads/manuals/index.html?c=winds&k=&l=en',
    reviewed:'2026-09-24',
    scope:'Three-valve, concert-pitch bass-clef baritone/euphonium. Primary 3-valve fingerings E2–B♭4 are shown; optional fourth-valve alternates are intentionally omitted.'
  },
  ranges:{
    beginner:{min:'Bb2',max:'Bb3',label:'B♭2–B♭3'},
    full:{min:'E2',max:'Bb4',label:'E2–B♭4'}
  },
  notes:[
    {pitch:'E2',valves:[1,2,3]},{pitch:'F2',valves:[1,3]},{pitch:'F#2',valves:[2,3]},{pitch:'G2',valves:[1,2]},{pitch:'Ab2',valves:[1]},{pitch:'A2',valves:[2]},{pitch:'Bb2',valves:[]},
    {pitch:'B2',valves:[1,2,3]},{pitch:'C3',valves:[1,3]},{pitch:'C#3',valves:[2,3]},{pitch:'D3',valves:[1,2]},{pitch:'Eb3',valves:[1]},{pitch:'E3',valves:[2]},{pitch:'F3',valves:[]},
    {pitch:'F#3',valves:[2,3]},{pitch:'G3',valves:[1,2]},{pitch:'Ab3',valves:[1]},{pitch:'A3',valves:[2]},{pitch:'Bb3',valves:[]},
    {pitch:'B3',valves:[1,2]},{pitch:'C4',valves:[1]},{pitch:'C#4',valves:[2]},{pitch:'D4',valves:[]},{pitch:'Eb4',valves:[1]},{pitch:'E4',valves:[2]},{pitch:'F4',valves:[]},
    {pitch:'F#4',valves:[2,3]},{pitch:'G4',valves:[1,2]},{pitch:'Ab4',valves:[1]},{pitch:'A4',valves:[2]},{pitch:'Bb4',valves:[]}
  ].map(n=>({...n,sourceNotation:n.valves.length?n.valves.join(' + '):'OPEN'}))
};
