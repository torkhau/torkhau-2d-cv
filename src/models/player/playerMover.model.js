import { kCtx, moveTolerance, playerSpeed } from '../../core';

export class PlayerMover {
  #player;
  #direction;
  #moveTarget = null;

  constructor(player) {
    this.#player = player;
  }

  moveTo(pos) {
    this.#moveTarget = pos.clone();
    this.#player.currentAnimation = 'walk';
  }

  stop() {
    this.#moveTarget = null;
    this.#player.currentAnimation = 'idle';
  }

  setDirection(direction) {
    if (this.#direction === direction) return;

    this.#direction = direction;
    const scaleX = direction === 'left' ? -1 : 1;
    this.#player.use(kCtx.scale(scaleX, 1));
  }

  update() {
    if (!this.#moveTarget) return;

    const subtraction = this.#moveTarget.sub(this.#player.position);

    if (subtraction.len() <= moveTolerance) {
      this.#moveTarget = null;
      this.#player.currentAnimation = 'idle';
      return;
    }

    this.#player.move(subtraction.unit().scale(playerSpeed));

    if (Math.abs(subtraction.x) > Math.abs(subtraction.y)) this.setDirection(subtraction.x < 0 ? 'left' : 'right');
  }

}
