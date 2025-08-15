export const background = [0, 153, 219];

export const levelFolder = `${import.meta.env.BASE_URL}levels`;

export const linkToCV = {
  tag: '<a href="https://drive.google.com/file/d/1NgGZAPLvwizjebE0EZ2AHiLNtFWJIZSS/view?usp=drive_link" target="_blank">CV</a>',
};

export const spawnPoints = {
  start: { roomName: 'belarus', spawnPoint: { x: 360, y: 860 } },
  toBelarus: { roomName: 'belarus', spawnPoint: { x: 120, y: 570 } },
  toBelarusFromHome: { roomName: 'belarus', spawnPoint: { x: 455, y: 850 } },
  toBelarusFromWork: { roomName: 'belarus', spawnPoint: { x: 665, y: 340 } },
  toBelarusFromCollage: { roomName: 'belarus', spawnPoint: { x: 450, y: 255 } },
  toBelarusHome: { roomName: 'belarusHome', spawnPoint: { x: 105, y: 195 } },
  toBelarusWork: { roomName: 'belarusWork', spawnPoint: { x: 135, y: 200 } },
  toBelarusCollage: { roomName: 'belarusCollage', spawnPoint: { x: 60, y: 150 } },
  toPoland: { roomName: 'poland', spawnPoint: { x: 975, y: 640 } },
  toPolandHome: { roomName: 'polandHome', spawnPoint: { x: 100, y: 265 } },
  toPolandFromHome: { roomName: 'poland', spawnPoint: { x: 855, y: 320 } },
};

export const playerSpeed = 100;
