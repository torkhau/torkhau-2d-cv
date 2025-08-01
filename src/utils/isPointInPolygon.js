export function isPointInPolygon(point, polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi + 0.00001) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

export function isPointNotInBarrier(point, barriers) {
  for (const barrier of barriers) if (isPointInPolygon(point, barrier)) return false;

  return true;
}
