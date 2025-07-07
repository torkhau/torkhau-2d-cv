import kaboom from 'kaboom';
import { background, levelFolder } from './const';
import { Player } from '../models';

export const kCtx = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById('game'),
})

kCtx.setBackground(...background, 0.3);
await kCtx.loadSprite('Belarus', `${levelFolder}/belarus.png`);
