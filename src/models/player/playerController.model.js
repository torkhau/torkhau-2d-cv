import { kCtx, playerSpeed } from '../../core';

export class PlayerController {
  #player;
  #mover;

  constructor(player, mover) {
    this.#player = player;
    this.#mover = mover;
    this.#bindControls();
  }

  #bindControls() {
    kCtx.onKeyRelease(() => {
      this.#player.currentAnimation = 'idle';
    });

    kCtx.onKeyDown((key) => {
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
  }
}
