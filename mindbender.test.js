import test from 'node:test';
import assert from 'node:assert/strict';
import {mindbenderLevels} from './mindbender-levels.js';
import {solve,step,sizeOf,cells} from './puzzle.js';
import {recordWin,canPlay,cleanScores,unlockedThrough} from './progress.js';

test('mindbenders have compact solutions that revisit positions in different states',()=>{
 assert.equal(mindbenderLevels.length,10);
 for(const l of mindbenderLevels){
  const path=solve(l);assert.equal(path.length,l.par);assert.ok(path.length<50);
  let s={x:l.start[0],z:l.start[1],o:'u'},revisits=0,away=0;
  const sizes=new Set([2]),visited=new Map();
  for(const dir of path){
   const next=step(l,s,dir);assert.ok(next);
   const distance=p=>Math.abs(p.x-l.goal[0])+Math.abs(p.z-l.goal[1]);
   if(distance(next)>distance(s))away++;
   const pos=`${next.x},${next.z}`,shape=`${next.o}:${sizeOf(next)}:${!!next.open}`;
   if(visited.has(pos)&&visited.get(pos)!==shape)revisits++;
   visited.set(pos,shape);sizes.add(sizeOf(next));s=next;
  }
  assert.deepEqual([...sizes].sort(),[1,2,3],l.name);
  assert.ok(revisits>=2,l.name);assert.ok(away>=3,l.name);
 }
});
test('bridge, portal, and fragile designs actually use those mechanics on their shortest route',()=>{
 for(const index of [3,5,6,7,8,9]){
  const l=mindbenderLevels[index];let s={x:l.start[0],z:l.start[1],o:'u'},toggles=0,hops=0,bridge=false,fragile=false;
  for(const dir of solve(l)){
   const next=step(l,s,dir);if(!!next.open!==!!s.open)toggles++;
   if(Math.abs(next.x-s.x)+Math.abs(next.z-s.z)>4)hops++;
   for(const [x,z] of cells(next)){bridge ||=l.map[z][x]==='b';fragile ||=l.map[z][x]==='f'}s=next;
  }
  if([3,7].includes(index)){assert.ok(bridge);assert.ok(toggles>=2)}
  if([5,8].includes(index))assert.ok(hops>=2);
  if(index===6)assert.ok(fragile);
  if(index===9)assert.ok(bridge&&fragile&&hops&&toggles);
 }
});
test('a nearby exit is deceptive and the wrong-first-turn puzzle must initially move away',()=>{
 const near=mindbenderLevels[0];assert.ok(Math.abs(near.goal[0]-near.start[0])+Math.abs(near.goal[1]-near.start[1])<=2);
 const l=mindbenderLevels[1],s={x:l.start[0],z:l.start[1],o:'u'};
 const distance=p=>Math.abs(p.x-l.goal[0])+Math.abs(p.z-l.goal[1]);
 assert.ok(distance(step(l,s,solve(l)[0]))>distance(s));
});
test('previous campaign progress unlocks 61 and any escape unlocks the next puzzle',()=>{
 let scores={};for(let i=0;i<60;i++)scores=recordWin(scores,i,120,60);
 assert.deepEqual(cleanScores(scores,70),scores);assert.equal(unlockedThrough(scores,70),60);
 for(let i=60;i<70;i++){assert.ok(canPlay(scores,i,70));scores=recordWin(scores,i,200,70)}
 assert.equal(Object.keys(scores).length,70);
});
