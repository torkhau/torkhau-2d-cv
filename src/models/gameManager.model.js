import { kCtx } from '../core';
import { Player, PlayerController, PlayerMover } from './player';
import { ZoomController } from './room';
import { RoomManager } from './roomManager.model';

export class GameManager {
  #player;
  #playerMover;
  #roomManager;

  constructor() {

    this.#player = new Player();
    this.#playerMover = new PlayerMover(this.#player);
    new PlayerController(this.#player, this.#playerMover);

    this.#roomManager = new RoomManager(this.#player, ['belarus', 'belarusHome', 'belarusWork', 'poland']);

    new ZoomController();
  }

  async start() {
    await this.#roomManager.initRooms();

    this.#roomManager.goTo('start');

    kCtx.onUpdate(() => {
      kCtx.camPos(this.#player.position);
      this.#playerMover.update();
    });
  }
}
