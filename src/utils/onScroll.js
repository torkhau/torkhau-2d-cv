import { maxZoom, minZoom, zoomFactor } from '../core';
import { clampCamera } from './clampCamera';

export const onScroll = (deltaY, kCtx, currentZoom, { bgWidth, bgHeight }) => {
  const mouseWorldPos = kCtx.toWorld(kCtx.mousePos()); // Позиция мыши в мировых координатах

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

  clampCamera(kCtx, currentZoom, { bgWidth, bgHeight });

  return currentZoom;
};
