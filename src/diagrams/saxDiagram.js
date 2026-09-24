const KEY_LAYOUT = [
  { id:'octave', label:'Octave', x:72, y:52, r:11, kind:'small' },
  { id:'frontF', label:'Front F', x:128, y:46, r:9, kind:'small' },
  { id:'lh1', label:'LH 1', x:142, y:104, r:20 },
  { id:'bisBb', label:'Bis B♭', x:171, y:68, r:9, kind:'small' },
  { id:'lh2', label:'LH 2', x:198, y:104, r:20 },
  { id:'lh3', label:'LH 3', x:254, y:104, r:20 },
  { id:'palmD', label:'Palm D', x:194, y:42, r:9, kind:'small' },
  { id:'palmEb', label:'Palm E♭', x:218, y:34, r:9, kind:'small' },
  { id:'palmF', label:'Palm F', x:242, y:42, r:9, kind:'small' },
  { id:'lhGSharp', label:'G♯', x:281, y:48, r:9, kind:'small' },
  { id:'lowCSharp', label:'Low C♯', x:302, y:61, r:9, kind:'small' },
  { id:'lowB', label:'Low B', x:323, y:48, r:9, kind:'small' },
  { id:'lowBb', label:'Low B♭', x:344, y:61, r:9, kind:'small' },

  { id:'rh1', label:'RH 1', x:386, y:104, r:20 },
  { id:'rh2', label:'RH 2', x:442, y:104, r:20 },
  { id:'rh3', label:'RH 3', x:498, y:104, r:20 },
  { id:'altFSharp', label:'Alternate F♯', x:468, y:54, r:9, kind:'small' },
  { id:'sideE', label:'Side E', x:520, y:42, r:9, kind:'small' },
  { id:'sideC', label:'Side C', x:542, y:54, r:9, kind:'small' },
  { id:'sideBb', label:'Side B♭', x:564, y:42, r:9, kind:'small' },
  { id:'highFSharp', label:'High F♯', x:586, y:54, r:9, kind:'small' },
  { id:'lowEb', label:'Low E♭', x:526, y:151, r:11, kind:'small' },
  { id:'lowC', label:'Low C', x:565, y:151, r:12, kind:'small' },
  { id:'lowA', label:'Low A (baritone)', x:610, y:151, r:11, kind:'small', bariOnly:true }
];

export const SAX_KEY_IDS = KEY_LAYOUT.map(k => k.id);

export function renderSaxDiagram(keys = [], { mini = false, baritone = false } = {}) {
  const pressed = new Set(keys);
  const visible = KEY_LAYOUT.filter(k => baritone || !k.bariOnly);
  const controls = visible.map(key => {
    const down = pressed.has(key.id);
    return `
      <g aria-label="${key.label} ${down ? 'pressed' : 'open'}">
        <circle cx="${key.x}" cy="${key.y}" r="${key.r}" fill="${down ? '#ef6b4a' : '#fffaf0'}" stroke="#18233e" stroke-width="${key.kind === 'small' ? 3 : 4}"/>
        ${down ? `<circle cx="${key.x}" cy="${key.y}" r="${Math.max(3,key.r-7)}" fill="#c44d34" opacity=".82"/>` : ''}
      </g>`;
  }).join('');

  return `
    <svg class="sax-svg ${mini ? 'audit-mini' : ''}" viewBox="0 0 660 220" role="img" aria-label="Saxophone fingering diagram">
      <path d="M48 104 H590 Q620 104 620 130 Q620 165 590 176" fill="none" stroke="#18233e" stroke-width="18" stroke-linecap="round"/>
      <path d="M584 176 Q624 174 642 195" fill="none" stroke="#18233e" stroke-width="10" stroke-linecap="round"/>
      ${baritone ? '<line x1="594" y1="133" x2="610" y2="151" stroke="#18233e" stroke-width="4"/>' : ''}
      ${controls}
      <text x="205" y="204" text-anchor="middle" font-size="14" font-weight="900" fill="#4a5877">LEFT HAND</text>
      <text x="456" y="204" text-anchor="middle" font-size="14" font-weight="900" fill="#4a5877">RIGHT HAND</text>
    </svg>`;
}
