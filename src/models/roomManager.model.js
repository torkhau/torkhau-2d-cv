import { Room } from './room/room.model';

export class RoomManager {
  #rooms = new Map();
  #currentRoom = null;

  constructor(rooms) {
    Object.entries(rooms).forEach(([roomName, roomInstance]) => {
      if (!(roomInstance instanceof Room)) throw new Error(`Room ${roomName} is not an instance of Room.`);

      this.#registerRoom(roomName, roomInstance);
    });
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

  async initRooms() {
    await Promise.all(
      Array.from(this.#rooms.values()).map(async (room) => {
        await room.init();
        room.on('collide', this.startRoom.bind(this));
      })
    );
  }

  startRoom({ roomName, spawnPoint: { x, y } }) {
    if (this.#currentRoom === roomName || !this.#isRoomRegistered(roomName)) return;

    this.#currentRoom = roomName;
    const room = this.#getRoom(roomName);
    room.start(x, y);
  }
}
