import test from 'node:test';
import assert from 'node:assert/strict';
import {masterLevels} from './master-levels.js';
import {solve,step,cells,sizeOf,won} from './puzzle.js';
import {levels} from './logic.js';
import {minimumMoves} from './minimum-moves.js';
import {cleanScores,recordWin,canPlay,unlockedThrough} from './progress.js';

test('100 levels have exact minimums; the final 30 climb from 50 to 108',()=>{
 assert.equal(levels.length,100);assert.equal(masterLevels.length,30);
 assert.equal(minimumMoves.length,100);
 for(const [i,l] of levels.entries())assert.equal(solve(l)?.length,minimumMoves[i],`Level ${i+1}`);
 for(const [i,l] of masterLevels.entries())assert.equal(l.par,50+i*2);
 assert.equal(new Set(levels.map(l=>JSON.stringify(l.map))).size,100);
 assert.equal(new Set(levels.map(l=>l.name)).size,100);
});
test('master routes use all sizes, bridge switches, and each chapter mechanic',()=>{
 for(const [i,l]of masterLevels.entries()){
  let s={x:l.start[0],z:l.start[1],o:'u'},toggles=0,hops=0,bridge=false,fragile=false;
  const sizes=new Set([2]);
  for(const dir of solve(l)){
   const next=step(l,s,dir);assert.ok(next);sizes.add(sizeOf(next));
   if(!!next.open!==!!s.open)toggles++;
   if(Math.abs(next.x-s.x)+Math.abs(next.z-s.z)>4)hops++;
   for(const[x,z]of cells(next)){bridge||=l.map[z][x]==='b';fragile||=l.map[z][x]==='f'}s=next;
  }
  assert.ok(won(l,s));assert.deepEqual([...sizes].sort(),[1,2,3],l.name);
  assert.ok(bridge&&toggles>=1,l.name);
  if(i>=10)assert.ok(hops>=1,l.name);
  if(i>=20)assert.ok(fragile,l.name);
  for(const remove of [['grow','shrink','normal'],['bridge'],...(i>=10?[['teleport']]:[])])assert.equal(solve({...l,pads:l.pads.filter(p=>!remove.includes(p.type))}),null,`${l.name}: essential ${remove}`);
 }
});
test('70-level saves migrate unchanged and unlock sequentially through 100',()=>{
 let scores={};for(let i=0;i<70;i++)scores=recordWin(scores,i,150,70);
 assert.deepEqual(cleanScores(scores,100),scores);assert.equal(unlockedThrough(scores,100),70);
 for(let i=70;i<100;i++){assert.ok(canPlay(scores,i,100));if(i<99)assert.equal(canPlay(scores,i+1,100),false);scores=recordWin(scores,i,200,100)}
 assert.equal(Object.keys(scores).length,100);assert.equal(unlockedThrough(scores,100),99);assert.equal(canPlay(scores,100,100),false);
});
test('new boards have safe endpoints and well-formed power pads',()=>{
 for(const l of masterLevels){
  assert.ok(l.map.length<=14);assert.ok(l.map.every(r=>r.length===l.map[0].length&&/^[01bf]+$/.test(r)));
  assert.equal(l.map[l.start[1]][l.start[0]],'1');assert.equal(l.map[l.goal[1]][l.goal[0]],'1');
  assert.equal(new Set(l.pads.map(p=>`${p.x},${p.z}`)).size,l.pads.length);
  for(const p of l.pads)assert.equal(l.map[p.z][p.x],'1');
  const portals=l.pads.filter(p=>p.type==='teleport');if(portals.length)assert.equal(portals.length,2);
 }
});
