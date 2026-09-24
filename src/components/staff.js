import { parsePitch, diatonicIndex } from './pitch.js';

function ledgerYs(noteY, staffBottomY, step) {
  const ys = [];
  const staffTopY = staffBottomY - step * 8;

  if (noteY > staffBottomY + step) {
    for (let y = staffBottomY + step * 2; y <= noteY + .1; y += step * 2) ys.push(y);
  }
  if (noteY < staffTopY - step) {
    for (let y = staffTopY - step * 2; y >= noteY - .1; y -= step * 2) ys.push(y);
  }
  return ys;
}

export function renderStaff(pitch, clef = 'treble') {
  const { accidental } = parsePitch(pitch);
  const bottomPitch = clef === 'bass' ? 'G2' : 'E4';
  const bottomIndex = diatonicIndex(bottomPitch);
  const stepsFromBottom = diatonicIndex(pitch) - bottomIndex;
  const staffBottomY = 74;
  const step = 6;
  const noteY = staffBottomY - stepsFromBottom * step;
  const lineYs = [0,1,2,3,4].map(i => staffBottomY - i * step * 2);
  const ledger = ledgerYs(noteY, staffBottomY, step);
  const accidentalGlyph = accidental === '#' ? '♯' : accidental === 'b' ? '♭' : '';
  const stemDown = noteY < staffBottomY - step * 4;
  const stem = stemDown
    ? `<line x1="126" y1="${noteY}" x2="126" y2="${noteY + 38}" stroke="currentColor" stroke-width="3"/>`
    : `<line x1="146" y1="${noteY}" x2="146" y2="${noteY - 38}" stroke="currentColor" stroke-width="3"/>`;
  const glyph = clef === 'bass' ? '𝄢' : '𝄞';
  const clefY = clef === 'bass' ? 75 : 86;
  const clefSize = clef === 'bass' ? 54 : 66;

  return `
    <svg class="staff-svg" viewBox="0 0 260 142" role="img" aria-label="${pitch} on ${clef} clef staff">
      <g fill="none" stroke="currentColor" stroke-width="2">
        ${lineYs.map(y => `<line x1="16" y1="${y}" x2="244" y2="${y}"/>`).join('')}
        ${ledger.map(y => `<line x1="118" y1="${y}" x2="153" y2="${y}" stroke-width="2.4"/>`).join('')}
      </g>
      <text x="20" y="${clefY}" font-size="${clefSize}" font-family="'Bravura Text','Noto Music','Segoe UI Symbol',serif">${glyph}</text>
      ${accidentalGlyph ? `<text x="101" y="${noteY + 8}" font-size="31" font-family="serif">${accidentalGlyph}</text>` : ''}
      <ellipse cx="136" cy="${noteY}" rx="11.5" ry="8" transform="rotate(-17 136 ${noteY})" fill="currentColor"/>
      ${stem}
    </svg>`;
}
