import { flute } from './flute.js';
import { trumpet } from './trumpet.js';

export const instruments = [
  flute,
  { id: 'clarinet', name: 'Clarinet', icon: '♩', status: 'pending' },
  { id: 'bass-clarinet', name: 'Bass Clarinet', icon: '♩', status: 'pending' },
  { id: 'alto-sax', name: 'Alto Saxophone', icon: '🎷', status: 'pending' },
  { id: 'tenor-sax', name: 'Tenor Saxophone', icon: '🎷', status: 'pending' },
  { id: 'bari-sax', name: 'Baritone Saxophone', icon: '🎷', status: 'pending' },
  trumpet,
  { id: 'horn', name: 'French Horn', icon: '◔', status: 'pending' },
  { id: 'trombone', name: 'Trombone', icon: '↔', status: 'pending' },
  { id: 'euphonium', name: 'Baritone / Euphonium', icon: '◉', status: 'pending' },
  { id: 'tuba', name: 'Tuba', icon: '◎', status: 'pending' }
];

export const instrumentById = Object.fromEntries(instruments.map(i => [i.id, i]));
