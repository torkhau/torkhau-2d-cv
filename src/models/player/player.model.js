import { kCtx } from '../../core';

export class Player {
  #player;

  constructor() {
    this.#player = kCtx.add([
      kCtx.sprite('player', { anim: 'idle' }),
      kCtx.area({ shape: new kCtx.Rect(kCtx.vec2(0, 6), 9, 1) }),
      kCtx.body(),
      kCtx.pos(0, 0),
      kCtx.anchor('center'),
      kCtx.z(2),
      'player',
    ]);
  }

  get currentAnimation() {
    return this.#player.curAnim();
  }

  set currentAnimation(anim) {
    if (this.currentAnimation !== anim) this.#player.play(anim);
  }

  get position() {
    return this.#player.pos;
  }

  set position(value) {
    this.#player.pos = value;
  }

  get height() {
    return this.#player.height;
  }

  use(value) {
    this.#player.use(value);
  }

  move(...args) {
    this.#player.move(...args);
  }
}
