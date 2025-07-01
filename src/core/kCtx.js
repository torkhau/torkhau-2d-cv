import kaboom from 'kaboom';

export const kCtx = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById('game'),
})