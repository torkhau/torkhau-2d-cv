import { cellSize, kCtx, levelFolder, maxZoom, minZoom, zoomFactor } from '../core';
import { isPointInPolygon } from '../utils';
import { Player } from './player.model';
import { RoomManager } from './roomManager.model';

export class Room {
  #name = '';
  #zoom = 1;
  #player = null;
  #mapPath = '';
  #polygon = [];
  #spawnPos = kCtx.vec2(0, 0);
  #lastValidPos = {};
  _roomManager = null;
  _spawnPoints = [];

  constructor(name, mapPath) {
    this.#name = name;
    this.#mapPath = mapPath;
  }

  #onZoom(delta) {
    const mouseWorldPos = kCtx.toWorld(kCtx.mousePos());

    if (delta > 0) {
      this.#zoom /= zoomFactor;
    } else this.#zoom *= zoomFactor;

    this.#zoom = Math.max(minZoom, Math.min(maxZoom, this.#zoom));
    kCtx.camScale(this.#zoom);

    const newMouseWorldPos = kCtx.toWorld(kCtx.mousePos());
    const camDelta = newMouseWorldPos.sub(mouseWorldPos).scale(this.#zoom);
    kCtx.camPos(kCtx.camPos().sub(camDelta));
  }

  async #loadMap() {
    const [mapData, ...spawnPoints] = await (await fetch(`${levelFolder}/${this.#mapPath}`)).json();
    this.#polygon = mapData.polygon.map(({ x, y }) => kCtx.vec2(x, y).add(mapData.x, mapData.y));
    kCtx.add([kCtx.sprite(this.#name), kCtx.pos(0, 0)]);
    this._spawnPoints = spawnPoints.map(({ height, name, width, x, y }) =>
      kCtx.add([
        kCtx.area({ shape: new kCtx.Rect(kCtx.vec2(), width, height) }),
        kCtx.body({ isStatic: true }),
        kCtx.pos(x, y),
        name,
      ])
    );
  }

  #setupInput() {
    kCtx.onScroll(({ y }) => this.#onZoom(y));
    kCtx.onMouseDown(() => {
      const mouseWorld = kCtx.toWorld(kCtx.mousePos());

      if (isPointInPolygon(mouseWorld, this.#polygon)) {
        this.#player.moveTo(mouseWorld);
      }
    });
    kCtx.onMouseRelease(() => {
      this.#player.stop();
    });

    kCtx.onKeyPress('+', () => this.#onZoom(-100));
    kCtx.onKeyPress('-', () => this.#onZoom(100));
  }

  #setupUpdate() {
    kCtx.onUpdate(() => {
      const footPos = this.#player.pos.add(kCtx.vec2(0, this.#player.height / 4));

      if (isPointInPolygon(footPos, this.#polygon)) {
        this.#lastValidPos = this.#player.pos.clone();
      } else this.#player.pos = this.#lastValidPos.clone();

      kCtx.camPos(this.#player.pos);
      this.#player.update();
    });
  }

  async _onSpawnPointCollide() {}

  async init(roomManager) {
    if (!(roomManager instanceof RoomManager))
      throw new Error('Room manager must be an instance of RoomManager class.');

    this._roomManager = roomManager;
    kCtx.scene(this.#name, async () => {
      await this.#loadMap();
      await this._onSpawnPointCollide();
      this.#player = new Player();
      this.#setupInput();
      this.#setupUpdate();
    });
  }

  start(baseX, baseY) {
    this.#spawnPos = kCtx.vec2(baseX, baseY).scale(cellSize);
    this.#lastValidPos = this.#spawnPos.clone();
    kCtx.go(this.#name);
  }
}
