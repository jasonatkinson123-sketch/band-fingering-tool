import { flute } from './flute.js';
import { clarinet } from './clarinet.js';
import { bassClarinet } from './bassClarinet.js';
import { altoSax, tenorSax, bariSax } from './saxophones.js';
import { trumpet } from './trumpet.js';
import { horn } from './horn.js';
import { trombone } from './trombone.js';
import { euphonium } from './euphonium.js';
import { tuba } from './tuba.js';

export const instruments = [
  flute,
  clarinet,
  bassClarinet,
  altoSax,
  tenorSax,
  bariSax,
  trumpet,
  horn,
  trombone,
  euphonium,
  tuba
];

export const instrumentById = Object.fromEntries(instruments.map(i => [i.id, i]));
