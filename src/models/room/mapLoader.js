import { kCtx, levelFolder } from '../../core';

export class MapLoader {
  static async load(mapName) {
    const [mapData, ...spawnPointsData] = await (await fetch(`${levelFolder}/${mapName}.json`)).json();
    const polygon = this.#mapPolygon(mapData.polygon, mapData.x, mapData.y);
    const barriers = mapData.barriers?.map(({polygon, x , y}) => this.#mapPolygon(polygon, x, y)) || [];

    return { polygon, barriers, spawnPointsData };
  }

  static #mapPolygon(polygon, x , y) {
    return polygon.map(({ x: px, y: py }) => kCtx.vec2(px + x, py + y));
  }
}
