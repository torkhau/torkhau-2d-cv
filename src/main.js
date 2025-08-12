import { GameManager } from './models';

(async () => {
  const game = new GameManager();
  await game.start();
})();
