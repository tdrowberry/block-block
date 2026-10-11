// One intentional move may be buffered; key repeat must never cause a runaway roll.
export function createMoveBuffer() {
 let pending=null;
 return {
  offer(direction,repeat=false){if(!repeat&&pending===null)pending=direction;},
  take(){const direction=pending;pending=null;return direction;},
  clear(){pending=null;}
 };
}
