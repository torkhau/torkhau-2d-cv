import { Room } from './room.model';

export class RoomManager {
  #rooms = new Map();
  #currentRoom = null;

  constructor(rooms) {
    Object.entries(rooms).forEach(([roomName, roomInstance]) => {
      if (!(roomInstance instanceof Room)) {
        throw new Error(`Room ${roomName} is not an instance of Room.`);
      }
      this.#registerRoom(roomName, roomInstance);
    });
  }

  #registerRoom(roomName, roomInstance) {
    if (this.#rooms.has(roomName)) {
      throw new Error(`Room with name ${roomName} already exists.`);
    }
    this.#rooms.set(roomName, roomInstance);
  }

  #getRoom(name) {
    return this.#rooms.get(name);
  }

  #isRoomRegistered(name) {
    return this.#rooms.has(name);
  }

  async initRooms() {
    await Promise.all(Array.from(this.#rooms.values()).map((room) => room.init(this)));
  }

  startRoom(name, baseX, baseY) {
    if (this.#currentRoom === name || !this.#isRoomRegistered(name)) return;

    this.#currentRoom = name;
    const room = this.#getRoom(name);
    room.start(baseX, baseY);
  }
}
