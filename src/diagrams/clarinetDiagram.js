const KEY_LAYOUT = [
  { id: 'register', label: 'Register', x: 82, y: 42, r: 11, kind: 'small' },
  { id: 'thumb', label: 'Thumb hole', x: 82, y: 88, r: 16 },
  { id: 'lhA', label: 'A key', x: 133, y: 42, r: 11, kind: 'small' },
  { id: 'lhGSharpSide', label: 'Side G♯', x: 163, y: 42, r: 10, kind: 'small' },
  { id: 'lh1', label: 'LH 1', x: 150, y: 105, r: 20 },
  { id: 'lh2', label: 'LH 2', x: 205, y: 105, r: 20 },
  { id: 'lh3', label: 'LH 3', x: 260, y: 105, r: 20 },
  { id: 'lhEbSliver', label: 'LH E♭/B♭ sliver', x: 238, y: 55, r: 9, kind: 'small' },
  { id: 'lhPinkyE', label: 'LH E/B', x: 286, y: 48, r: 9, kind: 'small' },
  { id: 'lhPinkyF', label: 'LH F/C', x: 306, y: 60, r: 9, kind: 'small' },
  { id: 'lhPinkyFSharp', label: 'LH F♯/C♯', x: 326, y: 48, r: 9, kind: 'small' },
  { id: 'lhPinkyCSharp', label: 'LH C♯/G♯', x: 346, y: 60, r: 9, kind: 'small' },

  { id: 'rh1', label: 'RH 1', x: 382, y: 105, r: 20 },
  { id: 'rh2', label: 'RH 2', x: 437, y: 105, r: 20 },
  { id: 'rh3', label: 'RH 3', x: 492, y: 105, r: 20 },
  { id: 'rhSide1', label: 'Side 1', x: 377, y: 46, r: 9, kind: 'small' },
  { id: 'rhSide2', label: 'Side 2', x: 401, y: 39, r: 9, kind: 'small' },
  { id: 'rhSide3', label: 'Side 3', x: 425, y: 46, r: 9, kind: 'small' },
  { id: 'rhSide4', label: 'Side 4 E♭/B♭', x: 449, y: 39, r: 9, kind: 'small' },
  { id: 'rhSliverB', label: 'RH B/F♯ sliver', x: 468, y: 57, r: 8, kind: 'small' },
  { id: 'rhPinkyE', label: 'RH E/B', x: 522, y: 52, r: 9, kind: 'small' },
  { id: 'rhPinkyF', label: 'RH F/C', x: 542, y: 64, r: 9, kind: 'small' },
  { id: 'rhPinkyFSharp', label: 'RH F♯/C♯', x: 562, y: 52, r: 9, kind: 'small' },
  { id: 'rhPinkyGSharp', label: 'RH G♯/D♯', x: 582, y: 64, r: 9, kind: 'small' }
];

export const CLARINET_KEY_IDS = KEY_LAYOUT.map(k => k.id);

export function renderClarinetDiagram(keys = [], { mini = false } = {}) {
  const pressed = new Set(keys);
  const controls = KEY_LAYOUT.map(key => {
    const down = pressed.has(key.id);
    return `
      <g aria-label="${key.label} ${down ? 'pressed' : 'open'}">
        <circle cx="${key.x}" cy="${key.y}" r="${key.r}" fill="${down ? '#ef6b4a' : '#fffaf0'}" stroke="#18233e" stroke-width="${key.kind === 'small' ? 3 : 4}"/>
        ${down ? `<circle cx="${key.x}" cy="${key.y}" r="${Math.max(3, key.r - 7)}" fill="#c44d34" opacity=".82"/>` : ''}
      </g>`;
  }).join('');

  return `
    <svg class="clarinet-svg ${mini ? 'audit-mini' : ''}" viewBox="0 0 660 220" role="img" aria-label="Boehm-system clarinet fingering diagram">
      <line x1="46" y1="105" x2="615" y2="105" stroke="#18233e" stroke-width="18" stroke-linecap="round"/>
      <path d="M615 87 L645 105 L615 123 Z" fill="#f0c85e" stroke="#18233e" stroke-width="4"/>
      ${controls}
      <text x="205" y="188" text-anchor="middle" font-size="14" font-weight="900" fill="#4a5877">LEFT HAND</text>
      <text x="465" y="188" text-anchor="middle" font-size="14" font-weight="900" fill="#4a5877">RIGHT HAND</text>
      <text x="82" y="170" text-anchor="middle" font-size="12" font-weight="800" fill="#4a5877">THUMB</text>
    </svg>`;
}
