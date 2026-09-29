// Turn the original 45-degree diagonal camera counterclockwise to face the
// board straight on, then raise its back toward the viewer by 15 degrees.
// Rotate the ground/height basis together so the block stays on the board.
const horizontal=Math.SQRT2*.82;
const tilt=15*Math.PI/180;
const groundVertical=Math.SQRT2*.4*Math.cos(tilt)+.95*Math.sin(tilt);
const heightVertical=.95*Math.cos(tilt)-Math.SQRT2*.4*Math.sin(tilt);
export function projectUnits([x,y,z]){return[x*horizontal,z*groundVertical-y*heightVertical]}
export function cameraDepth([,y,z]){return z*heightVertical+y*groundVertical}
