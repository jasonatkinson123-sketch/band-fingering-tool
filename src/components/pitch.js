const letterOrder = ['C','D','E','F','G','A','B'];
const enharmonicDisplay = {
  'Ab': 'A♭', 'Bb': 'B♭', 'Eb': 'E♭',
  'C#': 'C♯', 'F#': 'F♯', 'G#': 'G♯', 'D#': 'D♯', 'A#': 'A♯'
};

export function parsePitch(pitch) {
  const match = /^([A-G])([#b]?)(-?\d+)$/.exec(pitch);
  if (!match) throw new Error(`Invalid pitch: ${pitch}`);
  return { letter: match[1], accidental: match[2], octave: Number(match[3]) };
}

export function displayPitch(pitch, includeOctave = false) {
  const { letter, accidental, octave } = parsePitch(pitch);
  const core = enharmonicDisplay[letter + accidental] || letter;
  return includeOctave ? `${core}${octave}` : core;
}

export function diatonicIndex(pitch) {
  const { letter, octave } = parsePitch(pitch);
  return octave * 7 + letterOrder.indexOf(letter);
}

export function pitchRank(pitch) {
  const chroma = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 };
  const { letter, accidental, octave } = parsePitch(pitch);
  const alter = accidental === '#' ? 1 : accidental === 'b' ? -1 : 0;
  return (octave + 1) * 12 + chroma[letter] + alter;
}
