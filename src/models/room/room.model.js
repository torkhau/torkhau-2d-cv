import { MapLoader, ZoomController } from '.';
import { cellSize, EventBus, kCtx, spawnPoints } from '../../core';
import { isPointInPolygon, isPointNotInBarrier } from '../../utils';
import { Player, PlayerController, PlayerMover } from '../player';

export class Room extends EventBus {
  #player;
  #playerMover;
  #lastValidPos;
  #name = '';
  #polygon = [];
  #barriers = [];
  #spawnPointsData = [];
  #spawnPointGameObjects = [];

  constructor(name) {
    super();
    this.#name = name;
  }

  #setupInput() {
    kCtx.onMouseDown(() => {
      const mouseWorld = kCtx.toWorld(kCtx.mousePos());

      if (isPointInPolygon(mouseWorld, this.#polygon)) this.#playerMover.moveTo(mouseWorld);
    });
    kCtx.onMouseRelease(() => {
      this.#playerMover.stop();
    });
  }

  #setupUpdate() {
    kCtx.onUpdate(() => {
      const footPos = this.#player.position.add(kCtx.vec2(0, this.#player.height / 4));

      if (isPointInPolygon(footPos, this.#polygon) && isPointNotInBarrier(footPos, this.#barriers)) {
        this.#lastValidPos = this.#player.position.clone();
      } else this.#player.position = this.#lastValidPos.clone();

      kCtx.camPos(this.#player.position);
      this.#playerMover.update();
    });
  }

  #onSpawnPointCollide() {
    for (const { name, spawnObj } of this.#spawnPointGameObjects) {
      spawnObj.onCollide('player', () => {
        this.emit('collide', spawnPoints[name]);
      });
    }
  }

  async init() {
    const { polygon, barriers, spawnPointsData } = await MapLoader.load(this.#name);
    this.#polygon.push(...polygon);
    this.#barriers.push(...barriers);
    this.#spawnPointsData.push(...spawnPointsData);
    kCtx.scene(this.#name, () => {
      kCtx.add([kCtx.sprite(this.#name), kCtx.pos(0, 0)]);
      this.#spawnPointGameObjects = this.#spawnPointsData.map(({ height, name, width, x, y }) => ({
        spawnObj: kCtx.add([
          kCtx.area({ shape: new kCtx.Rect(kCtx.vec2(), width, height) }),
          kCtx.body({ isStatic: true }),
          kCtx.pos(x, y),
        ]),
        name,
      }));

      this.#onSpawnPointCollide();

      this.#player = new Player();
      this.#playerMover = new PlayerMover(this.#player);
      new PlayerController(this.#player, this.#playerMover);

      new ZoomController();

      this.#setupInput();
      this.#setupUpdate();
    });
  }

  start(x, y) {
    this.#lastValidPos = kCtx.vec2(x, y).scale(cellSize);
    kCtx.go(this.#name);
  }
}
