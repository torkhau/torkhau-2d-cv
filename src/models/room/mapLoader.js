import { kCtx, levelFolder } from '../../core';

export class MapLoader {
  static async load(mapName) {
    const [mapData, ...spawnPointsData] = await (await fetch(`${levelFolder}/${mapName}.json`)).json();
    const polygon = mapData.polygon.map(({ x, y }) => kCtx.vec2(x, y).add(mapData.x, mapData.y));

    return { polygon, spawnPointsData };
  }
}
