import { cellSize, kCtx } from '../core';

export class Player {
  #player = null;
  #speed = 100;
  #direction = 'right';
  #moveTarget = null;
  #moveTolerance = 0.1 * cellSize;
  #movement = {
    left: () => {
      this.#setDirection('left');
      this.#player.move(-this.#speed, 0);
    },
    right: () => {
      this.#setDirection('right');
      this.#player.move(this.#speed, 0);
    },
    up: () => this.#player.move(0, -this.#speed),
    down: () => this.#player.move(0, this.#speed),
  };

  constructor(baseX = 23, baseY = 53) {
    this._baseX = baseX;
    this._baseY = baseY;

    this.#player = kCtx.make([
      kCtx.sprite('player', { anim: 'idle' }),
      kCtx.pos(this._baseX * cellSize, this._baseY * cellSize),
      kCtx.area(),
      kCtx.body(),
      kCtx.anchor('center'),
    ]);

    this.#bindControls();

    kCtx.add(this.#player);
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

  #bindControls() {
    kCtx.onKeyRelease(() => {
      if (this.#player.curAnim() === 'walk') this.#player.play('idle');
    });

    kCtx.onKeyDown((key) => {
      if (!['left', 'right', 'up', 'down'].includes(key)) return;

      this.#movement[key]?.();
      this.#setWalk();
    });
  }

  #setDirection(dir) {
    if (this.#direction === dir) return;

    this.#direction = dir;
    const scaleX = dir === 'left' ? -1 : 1;
    this.#player.use(kCtx.scale(scaleX, 1));
  }

  #setWalk() {
    if (this.#player.curAnim() !== 'walk') this.#player.play('walk');
  }

  moveTo(pos) {
    this.#moveTarget = pos.clone();
    this.#setWalk();
  }

  stop() {
    this.#moveTarget = null;
    this.#player.play('idle');
  }

  update() {
    if (!this.#moveTarget) return;

    const dir = this.#moveTarget.sub(this.#player.pos);
    const dist = dir.len();

    if (dist <= this.#moveTolerance) {
      this.#moveTarget = null;
      this.#player.play('idle');
      return;
    }

    const step = dir.unit().scale(this.#speed);
    this.#player.move(step);

    if (Math.abs(dir.x) > Math.abs(dir.y)) {
      this.#setDirection(dir.x < 0 ? 'left' : 'right');
    }
  }

  get pos() {
    return this.#player.pos;
  }

  set pos(value) {
    this.#player.pos = value;
  }

  get height() {
    return this.#player.height;
  }
}

await Player.preload();