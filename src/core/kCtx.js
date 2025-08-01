import kaboom from 'kaboom';
import { background, levelFolder } from './const';

export const kCtx = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById('game'),
})

kCtx.setBackground(...background, 0.3);
await kCtx.loadSprite('belarus', `${levelFolder}/belarus.png`);
await kCtx.loadSprite('belarusHome', `${levelFolder}/belarusHome.png`);
await kCtx.loadSprite('poland', `${levelFolder}/poland.png`);
