import { cellSize, kCtx } from '../core';

export class Player {
  _player = null;
  _speed = 100;
  _direction = 'right';

  constructor(baseX = 23, baseY = 53) {
    this._baseX = baseX;
    this._baseY = baseY;

    this._player = kCtx.make([
      kCtx.sprite('player', { anim: 'idle' }),
      kCtx.pos(this._baseX * cellSize, this._baseY * cellSize),
      kCtx.area(),
      kCtx.body(),
      kCtx.anchor('center'),
    ]);

    this._bindControls();

    kCtx.add(this._player);
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

  _bindControls() {
    kCtx.onKeyRelease(() => {
      if (this._player.curAnim() === 'walk') this._player.play('idle');
    });

    kCtx.onKeyDown((key) => {
      if (!['left', 'right', 'up', 'down'].includes(key)) return;

      const movement = {
        left: () => {
          this._setDirection('left');
          this._player.move(-this._speed, 0);
        },
        right: () => {
          this._setDirection('right');
          this._player.move(this._speed, 0);
        },
        up: () => this._player.move(0, -this._speed),
        down: () => this._player.move(0, this._speed),
      };

      movement[key]?.();

      if (this._player.curAnim() !== 'walk') {
        this._player.play('walk');
      }
    });
  }

  _setDirection(dir) {
    if (this._direction === dir) return;

    this._direction = dir;
    const scaleX = dir === 'left' ? -1 : 1;
    this._player.use(kCtx.scale(scaleX, 1));
  }

  get pos() {
    return this._player.pos;
  }

  set pos(value) {
    this._player.pos = value;
  }

  get height() {
    return this._player.height;
  }
}
