import { kCtx, levelFolder, maxZoom, minZoom, zoomFactor } from '../core';
import { Player } from './player.model';

export class Room {
  #name = '';
  #zoom = 1;
  #player = null;
  #mapPath = '';
  #polygon = [];
  #lastValidPos = {};

  constructor(name, mapPath) {
    this.#name = name;
    this.#mapPath = mapPath;
  }

  #isPointInPolygon(point) {
    let inside = false;

    for (let i = 0, j = this.#polygon.length - 1; i < this.#polygon.length; j = i++) {
      const xi = this.#polygon[i].x;
      const yi = this.#polygon[i].y;
      const xj = this.#polygon[j].x;
      const yj = this.#polygon[j].y;

      const intersect =
        yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi + 0.00001) + xi;

      if (intersect) inside = !inside;
    }

    return inside;
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
    const mapData = await (await fetch(`${levelFolder}/${this.#mapPath}`)).json();
    this.#polygon = mapData.polygon.map(({ x, y }) => kCtx.vec2(x, y).add(kCtx.vec2(mapData.x, mapData.y)));
    kCtx.add([kCtx.sprite(this.#name), kCtx.pos(0, 0)]);
  }

  #setupCamera() {
    kCtx.camScale(this.#zoom);
    kCtx.camPos(this.#player.pos);
  }

  #setupInput() {
    kCtx.onScroll(({ y }) => this.#onZoom(y));
    kCtx.onMouseDown(() => {
      const mouseWorld = kCtx.toWorld(kCtx.mousePos());
      const inside = this.#isPointInPolygon(mouseWorld);

      if (inside) {
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

      if (!this.#isPointInPolygon(footPos)) {
        this.#player.pos = this.#lastValidPos.clone();
      } else {
        this.#lastValidPos = this.#player.pos.clone();
      }

      kCtx.camPos(this.#player.pos);
      this.#player.update();
    });
  }

  async start(baseX, baseY) {
    kCtx.scene(this.#name, async () => {
      await this.#loadMap();

      this.#player = new Player(baseX, baseY);
      this.#lastValidPos = this.#player.pos.clone();

      this.#setupCamera();
      this.#setupInput();
      this.#setupUpdate();
    });

    kCtx.go(this.#name);
  }
}
