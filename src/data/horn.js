export const horn = {
  id:'horn',
  name:'French Horn',
  icon:'◔',
  clef:'treble',
  transposition:'F',
  fingeringType:'valves',
  diagramFamily:'valve',
  registerBaseOctave:3,
  configuration:'Single F horn',
  status:'verified',
  verification:{
    sourceName:'Yamaha Musical Instrument Guide — Horn fingering chart',
    sourceUrl:'https://www.yamaha.com/en/musical_instrument_guide/common/images/horn/fingering.pdf',
    crossCheckName:'StepWise — French Horn Essential Range Fingering Chart',
    crossCheckUrl:'https://www.stepwisepublications.com/uploads/1/6/2/6/16262424/___french_horn_fingering_chart.pdf',
    reviewed:'2026-09-24',
    scope:'Single F horn primary fingerings, written pitch, E♭3–G5. Double-horn B♭-side choices are not silently substituted; the app clearly labels this configuration.'
  },
  ranges:{
    beginner:{min:'G3',max:'C5',label:'G3–C5'},
    full:{min:'Eb3',max:'G5',label:'E♭3–G5'}
  },
  notes:[
    {pitch:'Eb3',valves:[2,3]},{pitch:'E3',valves:[1,2]},{pitch:'F3',valves:[1]},{pitch:'F#3',valves:[2]},{pitch:'G3',valves:[]},
    {pitch:'Ab3',valves:[2,3]},{pitch:'A3',valves:[1,2]},{pitch:'Bb3',valves:[1]},{pitch:'B3',valves:[2]},{pitch:'C4',valves:[]},
    {pitch:'C#4',valves:[1,2]},{pitch:'D4',valves:[1]},{pitch:'Eb4',valves:[2]},{pitch:'E4',valves:[]},{pitch:'F4',valves:[1]},{pitch:'F#4',valves:[2]},{pitch:'G4',valves:[]},
    {pitch:'Ab4',valves:[2,3]},{pitch:'A4',valves:[1,2]},{pitch:'Bb4',valves:[1]},{pitch:'B4',valves:[2]},{pitch:'C5',valves:[]},
    {pitch:'C#5',valves:[2]},{pitch:'D5',valves:[]},{pitch:'Eb5',valves:[2]},{pitch:'E5',valves:[]},{pitch:'F5',valves:[1]},{pitch:'F#5',valves:[2]},{pitch:'G5',valves:[]}
  ].map(n=>({...n,sourceNotation:n.valves.length?n.valves.join(' + '):'OPEN'}))
};
