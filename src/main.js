import { spawnPoints } from './core';
import { RoomManager } from './models';
import { Room } from './models/room';

export const roomManager = new RoomManager({
  Belarus: new Room('belarus'),
  BelarusHome: new Room('belarusHome'),
  BelarusWork: new Room('belarusWork'),
  Poland: new Room('poland'),
});

await roomManager.initRooms();
roomManager.startRoom(spawnPoints.start);