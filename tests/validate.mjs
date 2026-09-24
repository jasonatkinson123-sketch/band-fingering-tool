import { instruments } from '../src/data/instruments.js';
import { pitchRank } from '../src/components/pitch.js';

let failures = 0;
function assert(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`FAIL: ${message}`);
  }
}

for (const instrument of instruments) {
  if (instrument.status !== 'verified') continue;
  assert(Array.isArray(instrument.notes) && instrument.notes.length > 0, `${instrument.name} has notes`);

  const seen = new Set();
  let priorRank = -Infinity;
  for (const note of instrument.notes) {
    assert(typeof note.pitch === 'string', `${instrument.name} note has pitch`);
    assert(!seen.has(note.pitch), `${instrument.name} has no duplicate ${note.pitch}`);
    seen.add(note.pitch);
    const rank = pitchRank(note.pitch);
    assert(rank > priorRank, `${instrument.name} notes are strictly ascending at ${note.pitch}`);
    priorRank = rank;

    if ('valves' in note) {
      assert(Array.isArray(note.valves), `${note.pitch} valves is an array`);
      assert(new Set(note.valves).size === note.valves.length, `${note.pitch} has no duplicate valves`);
      assert(note.valves.every(v => Number.isInteger(v) && v >= 1 && v <= 3), `${note.pitch} valves are 1–3`);
    } else {
      assert(false, `${note.pitch} has a supported fingering representation`);
    }
  }

  for (const [mode, range] of Object.entries(instrument.ranges)) {
    const min = pitchRank(range.min);
    const max = pitchRank(range.max);
    assert(min <= max, `${instrument.name} ${mode} range is valid`);
    assert(instrument.notes.some(n => n.pitch === range.min), `${instrument.name} ${mode} min exists in data`);
    assert(instrument.notes.some(n => n.pitch === range.max), `${instrument.name} ${mode} max exists in data`);
  }

  const beginner = instrument.ranges.beginner;
  const full = instrument.ranges.full;
  assert(pitchRank(beginner.min) >= pitchRank(full.min), `${instrument.name} beginner min is inside full range`);
  assert(pitchRank(beginner.max) <= pitchRank(full.max), `${instrument.name} beginner max is inside full range`);
  assert(instrument.verification?.sourceUrl, `${instrument.name} preserves a verification source`);
}

if (failures) {
  console.error(`\n${failures} validation failure(s).`);
  process.exit(1);
}
console.log('All fingering-data validation checks passed.');
