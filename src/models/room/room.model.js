import { EventBus, kCtx, levelFolder } from '../../core';

const colors = [
  kCtx.rgb(255, 0, 0),
  kCtx.rgb(255, 127, 0),
  kCtx.rgb(255, 255, 0),
  kCtx.rgb(0, 255, 0),
  kCtx.rgb(0, 0, 255),
  kCtx.rgb(75, 0, 130),
  kCtx.rgb(148, 0, 211),
];
const transitionTime = 0.5;

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
        kCtx.opacity(0.4),
        kCtx.z(1),
      ]);

      if (rest.name) {
        let colorIndex = 0;
        let time = 0;

        gameObj.use(kCtx.rect(rest.width, rest.height, { radius: 3 }));
        gameObj.onUpdate(() => {
          time += kCtx.dt();

          if (time >= transitionTime) {
            colorIndex = (colorIndex + 1) % colors.length;
            time = 0;
          }

          const nextColorIndex = (colorIndex + 1) % colors.length;
          gameObj.color = kCtx.lerp(colors[colorIndex], colors[nextColorIndex], time / transitionTime);
        });
        gameObj.onCollide('player', () => {
          this.emit(rest.name.startsWith('to') ? 'spawnCollide' : 'barrierCollide', rest.name);
        });
      }

      return gameObj;
    });
  }
}
