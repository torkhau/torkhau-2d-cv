import { kCtx } from './core';
import { Player } from './models';
import { isPointInPolygon, onScroll, toWorldPolygon } from './utils';

// function drawPolygonOutline(polygon, color = kCtx.rgb(255, 0, 0)) {
//   kCtx.add([
//     kCtx.pos(0, 0),
//     kCtx.z(1000),
//     {
//       draw() {
//         kCtx.drawLines({
//           pts: polygon,
//           width: 2,
//           color,
//           closed: true,
//         });
//       },
//     },
//   ]);
// }


let currentZoom = 1;

kCtx.scene('main', async () => {
  const mapData = await (await fetch('/levels/brest.json')).json();
  const allowedPathPolygon = toWorldPolygon(mapData);
  kCtx.add([kCtx.sprite('brest'), kCtx.pos(0, 0)]);

  const player = new Player();
  let lastValidPos = player.pos.clone();

  kCtx.camScale(currentZoom);

  kCtx.onScroll(({ y }) => {
    currentZoom = onScroll(y, kCtx, currentZoom);
  });

  kCtx.onUpdate(() => {
    const footPos = player.pos.add(kCtx.vec2(0, player.height / 4));

    if (!isPointInPolygon(footPos, allowedPathPolygon)) {
      player.pos = lastValidPos.clone();
    } else {
      lastValidPos = player.pos.clone();
    }

    kCtx.camPos(player.pos);
  });

});

kCtx.go('main');
