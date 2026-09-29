# Block Block

A 3D rolling-block puzzle. Tip a 1 × 1 × 2 block across floating tiles and land standing upright on the glowing opening. Both halves must stay supported.

## Play

Run `npm start`, then open http://localhost:3000. No package installation is needed (Node.js 18+).

- Arrow keys or WASD: roll
- LVL button or Escape: return to level select
- R: restart
- Touch: use the on-screen arrows or swipe
- Level menu: replay cleared levels or play the next unlocked level

Personal bests are saved in your browser. Sound is optional. Reduced motion is respected. Game rendering and logic require no external libraries or remote fonts.

Levels 7–16 add irregular islands, holes, narrow crossings, and orientation puzzles. Level 11 now introduces size pads; its old score is kept separately from the new puzzle. Other existing boards and scores remain intact. Levels unlock sequentially. Existing scores are retained, but unfinished earlier levels must be cleared before later levels can be played.

## Powers and milestones

- Levels 1–10: classic rolling.
- Level 11 introduces size pads: **↑3** grows to three, **↓1** shrinks to one, and **=2** restores the normal two-square size.
- Level 21 introduces **⏻** bridge switches: touch one to toggle all cyan dotted bridge tiles. Later puzzles may use either power, both, or neither. Levels 12–16 deliberately remain classic puzzles.
- Levels 17–26 mix shapes and, from 21 onward, bridges. Their shortest routes increase from 26 to 62 moves. These lengths include transformations: new rules create complexity beyond move count alone.

The entire block must land safely before a pad activates. Any newly touching part activates it, then the block stands upright on that pad at its new size. If more than one pad is touched, the first in the level's pad list wins; shipped pads are spaced apart to avoid that ambiguity. Pads activate again after leaving and returning. A cube moves one square per roll; long blocks occupy two or three squares when lying down. The exit accepts only an upright size-two block.

Closed bridges are holes. Open bridges support any size. Closing a bridge underneath the block causes a fall. Every fall automatically restarts the level at move zero, size two, with bridges closed. There is no undo.

Level 31 introduces **◎A / ◎B teleport pairs**. Stand upright at size two or three on a pad to appear on the matching letter on another platform. Cubes and lying blocks do not activate portals. Teleportation preserves size and bridge state, costs no extra move, and does not immediately trigger the arrival pad. Leave and return upright to travel back. Restart returns you to the original platform.

Levels 27–30 add size-and-bridge challenges with minimum routes of 42, 46, 50, and 54 moves. Level 31 is a four-move teleport introduction; levels 32–36 increase from 28 to 52 moves and require teleports to cross separated platforms. Later puzzles combine multiple portal pairs with size changes and bridge switches. The first 26 boards and their scores are unchanged.

Level data uses optional `pads` and `b` bridge cells, so future 10-level chapters can introduce a mechanic without forcing it into every later board. The milestone schedule is size pads at 11, bridges at 21, teleports at 31, and the next new power at 41 when that chapter is designed. Teleport pads use `type: 'teleport'` with a shared `pair` letter; every pair must have exactly two endpoints.

## Verify

Run `npm test` to check rolling geometry, inverse moves, edge detection, winning conditions, and a valid solution for every level.

## App experience

The app starts on level select. Completed, available, and locked levels have distinct markers. Finish each level to unlock the next; LVL returns to the menu. How to Play explains every control and power. Gameplay fills the viewport, fits the board to the available space, and accounts for mobile safe areas. Falls automatically start a new attempt.

A web app manifest, 192/512-pixel app icons, and an offline service worker are included. In a supporting browser, the Install app button appears when installation is offered. Offline play is available after the app assets have been cached during an online visit. Progress is local to the browser/device; clearing site data removes it.

This is an installable web app foundation, not a signed Android release or a Google Play listing. Android packaging, signing, and store submission remain separate release work.
