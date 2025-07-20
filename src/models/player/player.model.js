import { kCtx } from '../../core';

export class Player {
  #player;

  constructor() {
    this.#player = kCtx.make([
      kCtx.sprite('player', { anim: 'idle' }),
      kCtx.pos(0, 0),
      kCtx.area(),
      kCtx.body(),
      kCtx.anchor('center'),
      'player',
    ]);

    kCtx.add(this.#player);
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

  static async preload() {
    await kCtx.loadSprite('player', '/player/player.png', {
      sliceX: 9,
      sliceY: 2,
      anims: {
        walk: { from: 0, to: 7, loop: true, speed: 10 },
        idle: { from: 9, to: 17, loop: true, speed: 8 },
      },
    });
  }
}

await Player.preload();
