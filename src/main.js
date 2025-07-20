import { spawnPoints } from './core';
import { Belarus, Poland, RoomManager } from './models';

export const roomManager = new RoomManager({
  Belarus: new Belarus(),
  Poland: new Poland(),
});

await roomManager.initRooms();
roomManager.startRoom(spawnPoints.start);