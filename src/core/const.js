export const background = [0, 153, 219];

export const cellSize = 16;
export const moveTolerance = 0.1 * cellSize;

export const levelFolder = `${import.meta.env.BASE_URL}levels`;

export const spawnPoints = {
  start: { roomName: 'belarus', spawnPoint: { x: 23, y: 53 } },
  toBelarus: { roomName: 'belarus', spawnPoint: { x: 7, y: 35 } },
  toBelarusFromHome: { roomName: 'belarus', spawnPoint: { x: 28, y: 54 } },
  toBelarusFromWork: { roomName: 'belarus', spawnPoint: { x: 40, y: 22 } },
  toBelarusHome: { roomName: 'belarusHome', spawnPoint: { x: 6, y: 11 } },
  toBelarusWork: { roomName: 'belarusWork', spawnPoint: { x: 8, y: 11 } },
  toPoland: { roomName: 'poland', spawnPoint: { x: 61, y: 40 } },
};

export const playerSpeed = 100;