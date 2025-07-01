import { background, kCtx } from './core';
import { clampCamera, onScroll } from './utils';

kCtx.setBackground(...background, 0.3);
kCtx.loadSprite('brest', '/levels/brest.png');

let currentZoom = 1;

let isDragging = false;
let prevMouse = kCtx.vec2(0, 0);

let bgWidth = 0;
let bgHeight = 0;

kCtx.scene('main', () => {
  const mapSprite = kCtx.add([kCtx.sprite('brest'), kCtx.pos(0, 0)]);

  bgWidth = mapSprite.width;
  bgHeight = mapSprite.height;

  kCtx.camPos(kCtx.vec2(bgWidth / 2, bgHeight / 2));
  kCtx.camScale(currentZoom);

  clampCamera(kCtx, currentZoom, { bgWidth, bgHeight });

  kCtx.onScroll(({ y }) => {
    currentZoom = onScroll(y, kCtx, currentZoom, { bgWidth, bgHeight });
  });

  kCtx.onMousePress(() => {
    isDragging = true;
    prevMouse = kCtx.mousePos();
  });

  kCtx.onMouseRelease(() => {
    isDragging = false;
  });

  kCtx.onUpdate(() => {
    if (isDragging) {
      const nowMouse = kCtx.mousePos();
      const deltaScreen = nowMouse.sub(prevMouse);
      const deltaWorld = deltaScreen.scale(-1 / currentZoom);
      const newCam = kCtx.camPos().add(deltaWorld);

      kCtx.camPos(newCam);

      prevMouse = nowMouse;
      clampCamera(kCtx, currentZoom, { bgWidth, bgHeight });
    }
  });
});

kCtx.go('main');
