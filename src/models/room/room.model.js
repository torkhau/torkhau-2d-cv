import { EventBus, kCtx, levelFolder } from '../../core';

export class Room extends EventBus {
  #name = '';
  #room;
  #wallsData;
  #barriersData;
  #wallsObjects = [];
  #barriersObjects = [];

  constructor(name) {
    super();
    this.#name = name;
  }

  #shape({ type, ...rest }) {
    switch (type) {
      case 'polygon':
        return new kCtx.Polygon(rest.polygon);
      case 'rect':
        return new kCtx.Rect(kCtx.vec2(), rest.width, rest.height);
    }

    return undefined;
  }

  #addBarriers(barriers) {
    return barriers.map(({ x, y, ...rest }) => {
      const shape = this.#shape({ x, y, ...rest });
      const gameObj = kCtx.add([
        kCtx.pos(x, y),
        kCtx.area({ shape }),
        kCtx.body({ isStatic: true }),
      ]);

      if (rest.name)
        gameObj.onCollide('player', () => {
          this.emit(rest.name.startsWith('to') ? 'spawnCollide' : 'barrierCollide', rest.name);
        });

      return gameObj;
    });
  }

  async load() {
    const { walls, barriers } = await kCtx.loadJSON(null, `${levelFolder}/${this.#name}.json`);
    this.#wallsData = walls;
    this.#barriersData = barriers;
  }

  display() {
    this.#wallsObjects = this.#addBarriers(this.#wallsData);
    this.#barriersObjects = this.#addBarriers(this.#barriersData);
    this.#room = kCtx.add([kCtx.sprite(this.#name), kCtx.pos(0, 0)]);
  }

  hide() {
    kCtx.destroy(this.#room);
    this.#wallsObjects.forEach(kCtx.destroy);
    this.#barriersObjects.forEach(kCtx.destroy);
  }
}
