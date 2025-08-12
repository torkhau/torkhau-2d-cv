import kaboom from 'kaboom';
import { background, levelFolder } from './const';

export const kCtx = kaboom({
  global: false,
  canvas: document.getElementById('game'),
});

kCtx.setBackground(...background, 0.3);
await Promise.all([
  kCtx.loadSprite('belarus', `${levelFolder}/belarus.png`),
  kCtx.loadSprite('belarusHome', `${levelFolder}/belarusHome.png`),
  kCtx.loadSprite('belarusWork', `${levelFolder}/belarusWork.png`),
  kCtx.loadSprite('poland', `${levelFolder}/poland.png`),
  kCtx.loadSprite('player', `${import.meta.env.BASE_URL}player/player.png`, {
    sliceX: 9,
    sliceY: 2,
    anims: {
      walk: { from: 0, to: 7, loop: true, speed: 10 },
      idle: { from: 9, to: 17, loop: true, speed: 8 },
    },
  }),
]);
