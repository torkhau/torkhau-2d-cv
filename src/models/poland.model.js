import { Room } from './room.model';

export class Poland extends Room {
  constructor() {
    super('Poland', 'poland.json');
  }

  async _onSpawnPointCollide() {
    for (const spawnPoint of this._spawnPoints) {
      spawnPoint.onCollide('player', async () => {
        if (spawnPoint.is('toBelarus')) {
          await this._roomManager.startRoom('Belarus', 7, 35);
        }
      });
    }
  }
}
