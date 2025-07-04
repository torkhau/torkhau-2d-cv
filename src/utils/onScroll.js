import { maxZoom, minZoom, zoomFactor } from '../core';

export const onScroll = (deltaY, kCtx, currentZoom) => {
  const mouseWorldPos = kCtx.toWorld(kCtx.mousePos());

  if (deltaY > 0) {
    currentZoom /= zoomFactor;
  } else {
    currentZoom *= zoomFactor;
  }

  currentZoom = Math.max(minZoom, Math.min(maxZoom, currentZoom));
  kCtx.camScale(currentZoom);

  const newMouseWorldPos = kCtx.toWorld(kCtx.mousePos());
  const camDelta = newMouseWorldPos.sub(mouseWorldPos).scale(currentZoom);
  kCtx.camPos(kCtx.camPos().sub(camDelta));

  return currentZoom;
};
