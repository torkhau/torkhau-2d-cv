import { kCtx, playerSpeed } from '../../core';

export class PlayerController {
  #player;
  #mover;
  #keyDownController;
  #mouseDownController;
  #canMoveWithMouse = true;

  constructor(player, mover) {
    this.#player = player;
    this.#mover = mover;
    this.#bindControls();
  }

  #mouseDownHandler() {
    if (!this.#canMoveWithMouse) return;

    const mouseWorld = kCtx.toWorld(kCtx.mousePos());
    this.#mover.moveTo(mouseWorld);
  }

  #keyDownHandler(key) {
    const movement = {
      left: () => {
        this.#mover.setDirection('left');
        this.#player.move(-playerSpeed, 0);
      },
      right: () => {
        this.#mover.setDirection('right');
        this.#player.move(playerSpeed, 0);
      },
      up: () => this.#player.move(0, -playerSpeed),
      down: () => this.#player.move(0, playerSpeed),
    }[key];

    if (movement) {
      movement();
      this.#player.currentAnimation = 'walk';
    }
  }

  #bindControls() {
    kCtx.onKeyRelease(() => {
      this.#player.currentAnimation = 'idle';
    });

    this.#keyDownController = kCtx.onKeyDown(this.#keyDownHandler.bind(this));
    this.#mouseDownController = kCtx.onMouseDown(this.#mouseDownHandler.bind(this));

    kCtx.onMouseRelease(() => {
      this.#mover.stop();
      this.#canMoveWithMouse = true;
    });
  }

  paused(value) {
    if (value) {
      this.#mover.stop();
      this.#keyDownController.cancel();
      this.#mouseDownController.cancel();
      this.#canMoveWithMouse = false;
      return;
    }

    this.#keyDownController = kCtx.onKeyDown(this.#keyDownHandler.bind(this));
    this.#mouseDownController = kCtx.onMouseDown(this.#mouseDownHandler.bind(this));

    if (!kCtx.isMouseDown()) this.#canMoveWithMouse = true;
  }
}
