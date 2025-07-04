import kaboom from 'kaboom';
import { background } from './const';
import { Player } from '../models';

export const kCtx = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById('game'),
})

kCtx.setBackground(...background, 0.3);
await kCtx.loadSprite('brest', '/levels/brest.png');
await Player.preload();