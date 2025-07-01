export const clampCamera = (kCtx, currentZoom, { bgWidth, bgHeight }) => {
  const {x, y} = kCtx.camPos();
  const canvasWidth = kCtx.width();
  const canvasHeight = kCtx.height();

  const halfVisibleWidth = canvasWidth / (2 * currentZoom);
  const halfVisibleHeight = canvasHeight / (2 * currentZoom);

  const minX = halfVisibleWidth;
  const maxX = bgWidth - halfVisibleWidth;
  const minY = halfVisibleHeight;
  const maxY = bgHeight - halfVisibleHeight;

  let clampedX = x;
  let clampedY = y;

  if (bgWidth * currentZoom > canvasWidth) {
    clampedX = Math.max(minX, Math.min(maxX, x));
  } else clampedX = bgWidth / 2;

  if (bgHeight * currentZoom > canvasHeight) {
    clampedY = Math.max(minY, Math.min(maxY, y));
  } else clampedY = bgHeight / 2;

  kCtx.camPos(kCtx.vec2(clampedX, clampedY));
};
