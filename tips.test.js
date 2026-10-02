import test from 'node:test';import assert from 'node:assert/strict';
import {levels,step,solve,won} from './logic.js';
import {planTip,advanceTip} from './tips.js';
test('tips reveal at most 20 valid moves from every level and never mutate the block',()=>{
 for(const l of levels){const s={x:l.start[0],z:l.start[1],o:'u'},copy={...s},tip=planTip(l,s);
 assert.ok(tip.steps.length<=20);assert.equal(tip.steps.length,Math.min(20,solve(l).length));assert.deepEqual(s,copy);
 let next=s;for(const hint of tip.steps){next=step(l,next,hint.direction);assert.deepEqual(next,hint.to)}assert.equal(won(l,next),tip.finishes);
 }
});
test('tips solve the current size and bridge state, consume followed steps, and clear on deviation',()=>{
 const l=levels[24];let s={x:l.start[0],z:l.start[1],o:'u'};for(const d of solve(l).slice(0,15))s=step(l,s,d);
 const tip=planTip(l,s);assert.deepEqual(tip.steps[0].from,s);
 assert.equal(advanceTip(tip,tip.steps[0].to).steps.length,tip.steps.length-1);
 assert.equal(advanceTip(tip,{x:-1,z:-1,o:'u'}),null);
});
test('no tip is offered for a trapped or completed block',()=>{
 assert.equal(planTip({map:['1'],start:[0,0],goal:[2,2]},{x:0,z:0,o:'u'}),null);
 assert.equal(planTip({map:['1'],start:[0,0],goal:[0,0]},{x:0,z:0,o:'u'}),null);
});
