import { instruments } from '../src/data/instruments.js';
import { pitchRank } from '../src/components/pitch.js';
import { FLUTE_KEY_IDS } from '../src/diagrams/fluteDiagram.js';
import { CLARINET_KEY_IDS } from '../src/diagrams/clarinetDiagram.js';
import { SAX_KEY_IDS } from '../src/diagrams/saxDiagram.js';

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`FAIL: ${message}`);
  }
}

const rendererKeySets = {
  flute: new Set(FLUTE_KEY_IDS),
  clarinet: new Set(CLARINET_KEY_IDS),
  'bass-clarinet': new Set(CLARINET_KEY_IDS),
  'alto-sax': new Set(SAX_KEY_IDS),
  'tenor-sax': new Set(SAX_KEY_IDS),
  'bari-sax': new Set(SAX_KEY_IDS)
};

for (const instrument of instruments) {
  if (instrument.status !== 'verified') continue;

  assert(['treble', 'bass'].includes(instrument.clef), `${instrument.name} declares a supported clef`);
  assert(['valves', 'keys', 'position'].includes(instrument.fingeringType), `${instrument.name} declares a supported fingering type`);
  assert(instrument.verification?.sourceUrl, `${instrument.name} preserves a verification source`);
  assert(Array.isArray(instrument.notes) && instrument.notes.length > 0, `${instrument.name} has notes`);
  assert(instrument.ranges?.beginner && instrument.ranges?.full, `${instrument.name} has beginner and full ranges`);

  const seen = new Set();
  let priorRank = -Infinity;

  for (const note of instrument.notes) {
    assert(typeof note.pitch === 'string', `${instrument.name} note has a pitch`);
    assert(!seen.has(note.pitch), `${instrument.name} has no duplicate ${note.pitch}`);
    seen.add(note.pitch);

    const rank = pitchRank(note.pitch);
    assert(Number.isFinite(rank), `${instrument.name} ${note.pitch} has a valid pitch rank`);
    assert(rank > priorRank, `${instrument.name} notes are strictly ascending at ${note.pitch}`);
    priorRank = rank;

    if (instrument.fingeringType === 'valves') {
      assert(Array.isArray(note.valves), `${instrument.name} ${note.pitch} valves is an array`);
      assert(new Set(note.valves).size === note.valves.length, `${instrument.name} ${note.pitch} has no duplicate valves`);
      assert(note.valves.every(v => Number.isInteger(v) && v >= 1 && v <= 3), `${instrument.name} ${note.pitch} valves are limited to 1–3`);
    } else if (instrument.fingeringType === 'keys') {
      assert(Array.isArray(note.keys), `${instrument.name} ${note.pitch} keys is an array`);
      assert(new Set(note.keys).size === note.keys.length, `${instrument.name} ${note.pitch} has no duplicate keys`);
      const supported = rendererKeySets[instrument.id] || new Set(instrument.diagramKeys || []);
      assert(note.keys.every(key => supported.has(key)), `${instrument.name} ${note.pitch} uses only known diagram keys`);
      assert(typeof note.sourceNotation === 'string' && note.sourceNotation.length > 0, `${instrument.name} ${note.pitch} preserves source notation`);
    } else if (instrument.fingeringType === 'position') {
      assert(Number.isInteger(note.position) && note.position >= 1 && note.position <= 7, `${instrument.name} ${note.pitch} uses slide position 1–7`);
    }
  }

  for (const [mode, range] of Object.entries(instrument.ranges)) {
    const min = pitchRank(range.min);
    const max = pitchRank(range.max);
    assert(min <= max, `${instrument.name} ${mode} range is valid`);
    assert(instrument.notes.some(note => note.pitch === range.min), `${instrument.name} ${mode} minimum exists in data`);
    assert(instrument.notes.some(note => note.pitch === range.max), `${instrument.name} ${mode} maximum exists in data`);
  }

  const beginner = instrument.ranges.beginner;
  const full = instrument.ranges.full;
  assert(pitchRank(beginner.min) >= pitchRank(full.min), `${instrument.name} beginner minimum is inside full range`);
  assert(pitchRank(beginner.max) <= pitchRank(full.max), `${instrument.name} beginner maximum is inside full range`);
}

const expectedIds = [
  'flute','clarinet','bass-clarinet','alto-sax','tenor-sax','bari-sax',
  'trumpet','horn','trombone','euphonium','tuba'
];

assert(instruments.length === expectedIds.length, 'instrument registry contains the complete planned set');
assert(expectedIds.every(id => instruments.some(i => i.id === id && i.status === 'verified')), 'every planned instrument is enabled and verified');

if (failures) {
  console.error(`\n${failures} validation failure(s).`);
  process.exit(1);
}

const totalNotes = instruments.reduce((sum, instrument) => sum + instrument.notes.length, 0);
console.log(`All fingering-data validation checks passed for ${instruments.length} instruments and ${totalNotes} note entries.`);
