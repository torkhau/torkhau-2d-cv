import { kCtx } from '../core';

export const toWorldPolygon = (polygonObj) => {
  const base = kCtx.vec2(polygonObj.x, polygonObj.y);

  return polygonObj.polygon.map(({ x, y }) => kCtx.vec2(x, y).add(base));
};
