import { cellSize, interactiveDialodues, kCtx, roomDialodues, spawnPoints } from '../core';
import { Dialog } from './dialog.model';
import { Room } from './room/room.model';

export class RoomManager {
  #rooms = new Map();
  #currentRoom = null;
  #dialog;
  #visitedRooms = {};
  #player;

  constructor(player, playerController, rooms) {
    if (!Array.isArray(rooms)) throw new Error('Rooms should be an array of room names.');

    rooms.forEach((roomName) => {
      if (typeof roomName !== 'string') throw new Error('Room name should be a string.');

      this.#registerRoom(roomName, new Room(roomName));
    });

    this.#player = player;
    this.#dialog = new Dialog(playerController);
  }

  #getRoom(roomName) {
    return this.#rooms.get(roomName);
  }

  #isRoomRegistered(roomName) {
    return this.#rooms.has(roomName);
  }

  #registerRoom(roomName, roomInstance) {
    if (this.#isRoomRegistered(roomName)) throw new Error(`Room with name ${roomName} already exists.`);

    this.#rooms.set(roomName, roomInstance);
  }

  #startRoomDialogue(roomName) {
    if (this.#visitedRooms[roomName]) return;

    const dialogue = roomDialodues[roomName];

    if (dialogue) {
      this.#visitedRooms[roomName] = true;
      this.#dialog.show(dialogue);
    }
  }

  #startInteractivePointDialogue(interactivePointName) {
    this.#dialog.show(interactiveDialodues[interactivePointName]);
  }

  async initRooms() {
    await Promise.all(
      [...this.#rooms.values()].map(async (room) => {
        await room.load();
        room.on('spawnCollide', this.goTo.bind(this));
        room.on('barrierCollide', this.#startInteractivePointDialogue.bind(this));
      })
    );
  }

  goTo(spawnPointName) {
    const spawn = spawnPoints[spawnPointName];

    if (!spawn) return;

    const {
      roomName,
      spawnPoint: { x, y },
    } = spawn;

    if (this.#currentRoom === roomName || !this.#isRoomRegistered(roomName)) return;

    if (this.#currentRoom) this.#getRoom(this.#currentRoom).hide();

    this.#currentRoom = roomName;
    this.#startRoomDialogue(this.#currentRoom);
    this.#getRoom(this.#currentRoom).display();
    this.#player.position = kCtx.vec2(x, y).scale(cellSize);
  }
}
