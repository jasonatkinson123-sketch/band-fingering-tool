export function renderTromboneDiagram(position, { mini = false } = {}) {
  const p = Number(position);
  const extension = Math.max(0, Math.min(6, p - 1));
  const slideX = 205 + extension * 48;
  const handleX = slideX + 36;

  return `
    <svg class="trombone-svg ${mini ? 'audit-mini' : ''}" viewBox="0 0 620 250" role="img" aria-label="Trombone slide in ${p} position">
      <path d="M70 90 H210 Q248 90 248 126 V154 Q248 190 210 190 H90" fill="none" stroke="#18233e" stroke-width="15" stroke-linecap="round"/>
      <path d="M74 67 L30 90 L74 113 Z" fill="#f0c85e" stroke="#18233e" stroke-width="5"/>
      <line x1="210" y1="112" x2="${slideX}" y2="112" stroke="#18233e" stroke-width="10" stroke-linecap="round"/>
      <line x1="210" y1="168" x2="${slideX}" y2="168" stroke="#18233e" stroke-width="10" stroke-linecap="round"/>
      <path d="M${slideX} 112 H${handleX} V168 H${slideX}" fill="none" stroke="#ef6b4a" stroke-width="9" stroke-linejoin="round"/>
      <line x1="${handleX}" y1="126" x2="${handleX}" y2="154" stroke="#c44d34" stroke-width="7" stroke-linecap="round"/>
      ${[1,2,3,4,5,6,7].map((n,i) => {
        const x=205+i*48;
        return `<g><line x1="${x}" y1="214" x2="${x}" y2="225" stroke="#4a5877" stroke-width="2"/><text x="${x}" y="244" text-anchor="middle" font-size="14" font-weight="900" fill="${n===p ? '#c44d34' : '#4a5877'}">${n}</text></g>`;
      }).join('')}
      <text x="310" y="34" text-anchor="middle" font-size="20" font-weight="1000" fill="#18233e">${p}${p===1?'st':p===2?'nd':p===3?'rd':'th'} POSITION</text>
    </svg>`;
}
