import { Room } from './room/room.model';

export class Poland extends Room {
  constructor() {
    super('poland');
  }

  _onSpawnPointCollide() {
    this._handlePlayerCollisions('toBelarus');
  }
}
