import { MapLoader, ZoomController } from '.';
import { cellSize, EventBus, kCtx, spawnPoints } from '../../core';
import { isPointInPolygon } from '../../utils';
import { Player, PlayerController, PlayerMover } from '../player';

export class Room extends EventBus {
  #player;
  #playerMover;
  #lastValidPos;
  #name = '';
  #polygon = [];
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

      if (isPointInPolygon(footPos, this.#polygon)) {
        this.#lastValidPos = this.#player.position.clone();
      } else this.#player.position = this.#lastValidPos.clone();

      kCtx.camPos(this.#player.position);
      this.#playerMover.update();
    });
  }

  _handlePlayerCollisions(tag) {
    for (const point of this.#spawnPointGameObjects) {
      if (point.is(tag))
        point.onCollide('player', () => {
          this.emit('collide', spawnPoints[tag]);
        });
    }
  }

  _onSpawnPointCollide() {}

  async init() {
    const { polygon, spawnPointsData } = await MapLoader.load(this.#name);
    this.#polygon.push(...polygon);
    this.#spawnPointsData.push(...spawnPointsData);
    kCtx.scene(this.#name, () => {
      kCtx.add([kCtx.sprite(this.#name), kCtx.pos(0, 0)]);
      this.#spawnPointGameObjects = this.#spawnPointsData.map(({ height, name, width, x, y }) =>
        kCtx.add([
          kCtx.area({ shape: new kCtx.Rect(kCtx.vec2(), width, height) }),
          kCtx.body({ isStatic: true }),
          kCtx.pos(x, y),
          name,
        ])
      );

      this._onSpawnPointCollide();

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
