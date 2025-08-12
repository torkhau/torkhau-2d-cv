import { kCtx } from '../../core';

const zoomFactor = 1.5;
const minZoom = 1;
const maxZoom = 2;

export class ZoomController {
  #zoom = 1;

  constructor() {
    this.#init();
  }

  #init() {
    kCtx.onScroll(({ y }) => this.#onZoom(y));
    kCtx.onKeyPress('+', () => this.#onZoom(-100));
    kCtx.onKeyPress('-', () => this.#onZoom(100));
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
}
