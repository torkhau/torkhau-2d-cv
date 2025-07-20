import { Room } from './room';

export class Belarus extends Room {
  constructor() {
    super('belarus');
  }

  _onSpawnPointCollide() {
    this._handlePlayerCollisions('toPoland');
  }
}
