export function renderValveDiagram(valves = [], { mini = false } = {}) {
  const pressed = new Set(valves);
  const height = mini ? 120 : 260;
  const viewBox = '0 0 520 290';
  const xs = [165, 260, 355];

  const valvesSvg = xs.map((x, idx) => {
    const n = idx + 1;
    const down = pressed.has(n);
    const capY = down ? 72 : 38;
    const stemTop = down ? 95 : 62;
    const fill = down ? '#ef6b4a' : '#fffaf0';
    return `
      <g aria-label="Valve ${n} ${down ? 'pressed' : 'released'}">
        <circle cx="${x}" cy="24" r="16" fill="${fill}" stroke="#18233e" stroke-width="4"/>
        <text x="${x}" y="30" text-anchor="middle" font-size="18" font-weight="900" fill="#18233e">${n}</text>
        <rect x="${x-23}" y="${capY}" width="46" height="17" rx="4" fill="${fill}" stroke="#18233e" stroke-width="4"/>
        <line x1="${x}" y1="${capY+17}" x2="${x}" y2="${stemTop+58}" stroke="#18233e" stroke-width="9"/>
        <rect x="${x-31}" y="154" width="62" height="92" rx="8" fill="#f6f1e6" stroke="#18233e" stroke-width="5"/>
        ${down ? `<rect x="${x-22}" y="168" width="44" height="64" rx="6" fill="#ef6b4a" opacity=".88"/>` : ''}
      </g>`;
  }).join('');

  const label = valves.length ? valves.join(' + ') : 'OPEN';

  return `
    <svg class="valve-svg ${mini ? 'audit-mini' : ''}" viewBox="${viewBox}" style="height:${height}px" role="img" aria-label="Trumpet fingering ${label}">
      <path d="M52 208 H128 M392 208 H470" stroke="#18233e" stroke-width="14" stroke-linecap="round" fill="none"/>
      <path d="M460 184 L505 208 L460 232 Z" fill="#f0c85e" stroke="#18233e" stroke-width="5"/>
      <path d="M58 208 C38 190 38 226 58 208" fill="none" stroke="#18233e" stroke-width="5"/>
      ${valvesSvg}
      <text x="260" y="278" text-anchor="middle" font-size="22" font-weight="900" fill="#18233e">${label}</text>
    </svg>`;
}
