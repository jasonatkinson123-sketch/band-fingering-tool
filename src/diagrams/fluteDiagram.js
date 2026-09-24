const KEY_LAYOUT = [
  { id: 'thumbBb', label: 'B♭ thumb', x: 76, y: 54, r: 13, kind: 'small' },
  { id: 'thumbB', label: 'B thumb', x: 108, y: 70, r: 16 },
  { id: 'lh1', label: 'LH 1', x: 166, y: 96, r: 21 },
  { id: 'lh2', label: 'LH 2', x: 220, y: 96, r: 21 },
  { id: 'lh3', label: 'LH 3', x: 274, y: 96, r: 21 },
  { id: 'gSharp', label: 'G♯', x: 274, y: 42, r: 13, kind: 'small' },
  { id: 'bbTrill', label: 'B♭ trill', x: 332, y: 45, r: 11, kind: 'small' },
  { id: 'rh1', label: 'RH 1', x: 362, y: 96, r: 21 },
  { id: 'dTrill', label: 'D trill', x: 398, y: 44, r: 10, kind: 'small' },
  { id: 'rh2', label: 'RH 2', x: 416, y: 96, r: 21 },
  { id: 'dSharpTrill', label: 'D♯ trill', x: 452, y: 44, r: 10, kind: 'small' },
  { id: 'rh3', label: 'RH 3', x: 470, y: 96, r: 21 },
  { id: 'eb', label: 'E♭', x: 512, y: 151, r: 14, kind: 'small' },
  { id: 'lowCSharp', label: 'Low C♯', x: 559, y: 60, r: 13, kind: 'small' },
  { id: 'lowC', label: 'Low C', x: 590, y: 91, r: 15 }
];

export const FLUTE_KEY_IDS = KEY_LAYOUT.map(k => k.id);

export function renderFluteDiagram(keys = [], { mini = false } = {}) {
  const pressed = new Set(keys);
  const circles = KEY_LAYOUT.map(key => {
    const down = pressed.has(key.id);
    const fill = down ? '#ef6b4a' : '#fffaf0';
    const strokeWidth = key.kind === 'small' ? 3 : 4;
    return `
      <g aria-label="${key.label} ${down ? 'pressed' : 'open'}">
        <circle cx="${key.x}" cy="${key.y}" r="${key.r}" fill="${fill}" stroke="#18233e" stroke-width="${strokeWidth}"/>
        ${down ? `<circle cx="${key.x}" cy="${key.y}" r="${Math.max(4, key.r - 7)}" fill="#c44d34" opacity=".82"/>` : ''}
      </g>`;
  }).join('');

  const labels = [
    { x: 108, text: 'THUMB' },
    { x: 220, text: 'LEFT HAND' },
    { x: 416, text: 'RIGHT HAND' },
    { x: 575, text: 'FOOT' }
  ].map(item => `<text x="${item.x}" y="205" text-anchor="middle" font-size="14" font-weight="900" fill="#4a5877">${item.text}</text>`).join('');

  return `
    <svg class="flute-svg ${mini ? 'audit-mini' : ''}" viewBox="0 0 660 230" role="img" aria-label="Flute fingering diagram">
      <line x1="34" y1="96" x2="623" y2="96" stroke="#18233e" stroke-width="12" stroke-linecap="round"/>
      <line x1="62" y1="96" x2="62" y2="54" stroke="#18233e" stroke-width="5"/>
      <line x1="512" y1="96" x2="512" y2="151" stroke="#18233e" stroke-width="5"/>
      <line x1="559" y1="96" x2="559" y2="60" stroke="#18233e" stroke-width="4"/>
      ${circles}
      ${labels}
    </svg>`;
}
