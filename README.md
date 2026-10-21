# Block Block

Created by **Lalao Lemur**. © 2026 Lalao Lemur. All rights reserved.

A 3D rolling-block puzzle. Tip a 1 × 1 × 2 block across floating tiles and land standing upright on the glowing opening. Both halves must stay supported.

## Play

New players can choose **Learn to play** or **Skip to level 1**. The optional 13-lesson interactive tutorial demonstrates a swipe, then asks for real practice moves. It covers gaps, fragile floor, grow/shrink/normal pads, bridges, portals and the upright 1 × 1 × 2 exit requirement. Replay it from Learn to play on the menu or How to play. Lessons do not change campaign scores, unlock levels, spend Tips or trigger completion ads. Saved control preferences are preserved; swipe practice temporarily uses swipes (keyboard input is also supported).

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
- Level 11 introduces size pads: **three squares** grows to three, **one square** shrinks to one, and **two squares** restores the normal two-square size.
- Levels 12 and 14 reuse size pads in new ways while levels 13, 15, and 16 provide classic rolling breaks. Level 21 introduces **⏻** bridge switches: touch one to toggle all cyan dotted bridge tiles. Later puzzles may use either power, both, or neither.
- Levels 17–26 mix shapes and, from 21 onward, bridges. Their shortest routes increase from 26 to 62 moves. These lengths include transformations: new rules create complexity beyond move count alone.

The entire block must land safely before a pad activates. Any newly touching part activates it, then the block stands upright on that pad at its new size. If more than one pad is touched, the first in the level's pad list wins; shipped pads are spaced apart to avoid that ambiguity. Pads activate again after leaving and returning. A cube moves one square per roll; long blocks occupy two or three squares when lying down. The exit accepts only an upright size-two block.

Closed bridges are holes. Open bridges support any size. Closing a bridge underneath the block causes a fall. Every fall automatically restarts the level at move zero, size two, with bridges closed. There is no undo.

Level 31 introduces **◎A / ◎B teleport pairs**. Stand upright at size two or three on a pad to appear on the matching letter on another platform. Cubes and lying blocks do not activate portals. Teleportation preserves size and bridge state, costs no extra move, and does not immediately trigger the arrival pad. Leave and return upright to travel back. Restart returns you to the original platform.

Levels 27–30 add size-and-bridge challenges with minimum routes of 42, 46, 50, and 54 moves. Level 31 is a four-move teleport introduction; levels 32–36 increase from 28 to 52 moves and require teleports to cross separated platforms. Later puzzles combine multiple portal pairs with size changes and bridge switches. Existing saved progress is retained.

Level data uses optional `pads`, `b` bridge cells, and `f` fragile cells, so future 10-level chapters can introduce a mechanic without forcing it into every later board. The milestone schedule is size pads at 11, bridges at 21, teleports at 31, and fragile tiles at 41. Teleport pads use `type: 'teleport'` with a shared `pair` letter; every pair must have exactly two endpoints.

The campaign now contains 100 levels. After level 10, 86 of 90 levels use at least one special mechanic. A few classic boards remain between mechanic-heavy puzzles for pacing. Power pads use animated, color-coded symbols and glows: three amber squares grow to three, one centered violet square shrinks to one, two lime squares restore size two, cyan switches control bridges, and swirling magenta or blue rings identify teleport pairs.

Levels 37–40 continue the portal chapter with shortest solutions of 44, 48, 52, and 56 moves. Level 41 introduces amber cracked tiles in an eight-move lesson: cubes and lying blocks can cross, but an upright size-two or size-three block falls through. Levels 42–50 increase from 20 to 52 moves, combining fragile tiles with previous powers; level 44 is a classic rolling break. Each board has a solver-verified route and par. Existing players who cleared level 36 can continue straight into level 37.

## Verify

Run `npm test` to check rolling geometry, inverse moves, edge detection, winning conditions, and a valid solution for every level.

## App experience

The app starts on level select. Completed, available, and locked levels have distinct markers. Finish each level to unlock the next; LVL returns to the menu. How to Play explains every control and power. Gameplay fills the viewport, fits the board to the available space, and accounts for mobile safe areas. Falls automatically start a new attempt.

A web app manifest, 192/512-pixel app icons, and an offline service worker are included. In a supporting browser, the Install app button appears when installation is offered. Offline play is available after the app assets have been cached during an online visit. Progress is local to the browser/device; clearing site data removes it.



Completion ratings compare your moves with the solver-verified minimum shown in the HUD and results. Exact minimum earns Absolutely Perfect and a permanent perfect star on level select; 1–10 extra moves earns Almost perfect, 11–20 earns Good escape, and larger detours get rotating playful messages. Replay directly from the result screen to improve your best. Every escape still unlocks the next level regardless of rating.

Use the gear icon on level select or during play to choose Swipe (default, arrows hidden) or Arrow buttons (swipes disabled). The choice persists on this device. Keyboard controls work in either mode. The HUD shows only minimum, current, and best moves; block dimensions and bridge-state labels are omitted.

Levels 51–60 form the expert chapter, with verified minimum routes of 64, 66, 68, 70, 72, 74, 76, 78, 80, and 82 moves. Each shortest route uses both size one and size three, with bridges or portals complicating the journey. All existing boards and saved progress are preserved; completing level 50 unlocks level 51.

Levels 61–70 form Look Again: compact 9×9 mindbenders with verified solutions of 19, 19, 22, 24, 23, 32, 21, 43, 34, and 28 moves. These focus on deceptive nearby exits, movement away from the goal, repeated visits in different orientations or sizes, bridge toggling, and portal sequencing instead of increasing move counts. Human difficulty is subjective; the solver verifies solvability and mechanic usage, not how difficult a person will find them. Existing levels and progress are retained.

## Optional Tips






## October 10 presentation and Android release pass

The menu now includes original vector artwork, per-chapter progress, and a refined mobile layout. Tiles and blocks have inset edge detailing and shaded materials. Movement buffers one intentional follow-up input and ignores held-key repeats. Sound preferences persist; backgrounding suspends movement and sound. Existing levels, controls, camera direction, and saved scores are preserved.



See `release-assets/` for visual review captures and listing materials, and [PLAY-RELEASE.md](PLAY-RELEASE.md) for release configuration, signing, remaining account requirements, and device testing. Use `PORT=3101` (or set the PORT environment variable in PowerShell) to preview alongside another local server.


## Levels 71–100: the master campaign

Thirty new boards extend the game to 100 levels. Minimum solutions increase by two moves per level, from 50 at level 71 to 108 at level 100. These are exact breadth-first-search minimums, not suggested scores. Each route uses all three block sizes and crosses a bridge; removing size pads or bridge switches makes the puzzle unsolvable.

- 71–80, Beyond Balance: 50–68 moves, combining transformations and bridge crossings.
- 81–90, Distant Connections: 70–88 moves, adding mandatory portal travel.
- 91–100, The Final Reckoning: 90–108 moves, combining transformations, bridges, portals, and fragile tiles.

Boards stay within 12×12, 13×13, and 14×14 respectively. The shortest verified routes revisit positions in different states. Increasing route length and added mechanics provide the difficulty ramp; perceived human difficulty still needs playtesting. Existing levels and score keys are untouched, and completing level 70 unlocks level 71.

`generate-master-levels.mjs` searches for static boards with a fixed seed; `--resume` continues from the current accepted set. Generation is an offline development step; no search or procedural generation runs when loading a level. `master.test.js` checks exact minimums, essential mechanics, board validity, and old-save progression through level 100.

## Free release 1.2.0

No ads, purchases, age screen or tracking SDKs. Earn one free Tip per three distinct campaign completions, including existing progress (33 across 100 levels). Replays and tutorials do not award extra Tips. Spending is saved locally before the trail appears. See PLAY-RELEASE.md. The prior monetized source is preserved in archive/monetized-version and excluded from builds.

## A story about belonging

Block searches for his triangle son, who has set out because he feels different. Twenty gentle story scenes follow the five-level worlds. The ending reunites father and son and brings them home together. There are no villains, police, kidnapping, or combat. Story scenes wait for Continue; Our story on the menu replays only reached scenes and unlocks the ending after level 100. Existing puzzles, scores, and tutorials are preserved. The family artwork and story are included in the offline cache and Android asset copy.
