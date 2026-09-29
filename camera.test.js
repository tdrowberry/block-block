import test from 'node:test';
import assert from 'node:assert/strict';
import {projectUnits,cameraDepth} from './camera.js';
import {roll} from './puzzle.js';
test('board pitch increases by 15 degrees without changing projection scale',()=>{
 const ground=projectUnits([0,0,1])[1],height=-projectUnits([0,1,0])[1];
 const oldAngle=Math.atan2(Math.SQRT2*.4,.95);
 assert.ok(Math.abs(Math.atan2(ground,height)-oldAngle-Math.PI/12)<1e-12);
 assert.ok(Math.abs(Math.hypot(ground,height)-Math.hypot(Math.SQRT2*.4,.95))<1e-12);
});
test('arrow movements project straight in the same screen direction for all sizes',()=>{
 for(const n of [1,2,3])for(const o of n===1?['u']:['u','x','z'])for(const dir of ['left','right','up','down']){
  const s={x:5,z:5,o,n},next=roll(s,dir);
  const center=a=>projectUnits([a.x+(a.o==='x'?(n-1)/2:0),0,a.z+(a.o==='z'?(n-1)/2:0)]);
  const before=center(s),after=center(next),dx=after[0]-before[0],dy=after[1]-before[1];
  if(dir==='left'||dir==='right'){assert.equal(dy,0);assert.ok(dir==='left'?dx<0:dx>0)}
  else{assert.equal(dx,0);assert.ok(dir==='up'?dy<0:dy>0)}
 }
});
test('upright height projects vertically and nearer surfaces sort last',()=>{
 assert.equal(projectUnits([2,3,4])[0],projectUnits([2,0,4])[0]);
 assert.ok(projectUnits([2,3,4])[1]<projectUnits([2,0,4])[1]);
 assert.ok(cameraDepth([0,0,2])>cameraDepth([0,0,1]));
 assert.ok(cameraDepth([0,2,1])>cameraDepth([0,0,1]));
});
