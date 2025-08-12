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
  
  paused(value) {
    this.#keyDownController.paused = value;
    this.#mouseDownController.paused = value;

    if (value) {
      this.#mover.stop();
      this.#canMoveWithMouse = false;
      return;
    }

    if (!kCtx.isMouseDown()) this.#canMoveWithMouse = true;
  }

  #bindControls() {
    kCtx.onKeyRelease(() => {
      this.#player.currentAnimation = 'idle';
    });

    this.#keyDownController = kCtx.onKeyDown((key) => {
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
    });
    this.#mouseDownController = kCtx.onMouseDown(() => {
      if (!this.#canMoveWithMouse) return;

      const mouseWorld = kCtx.toWorld(kCtx.mousePos());
      this.#mover.moveTo(mouseWorld);
    });

    kCtx.onMouseRelease(() => {
      this.#mover.stop();
      this.#canMoveWithMouse = true;
    });
  }
}
