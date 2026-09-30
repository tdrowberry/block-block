import test from 'node:test';import assert from 'node:assert/strict';
import {cleanScores,canPlay,recordWin,unlockedThrough,scoreKey} from './progress.js';

test('existing campaign completion unlocks level 37 without losing scores',()=>{
 let p={};for(let i=0;i<36;i++)p=recordWin(p,i,60,36);
 const migrated=cleanScores(p,50);assert.deepEqual(migrated,p);
 assert.equal(unlockedThrough(migrated,50),36);
 assert.ok(canPlay(migrated,36,50));assert.equal(canPlay(migrated,37,50),false);
});
test('fresh installs expose only level one',()=>{assert.equal(canPlay({},0,50),true);for(let i=1;i<50;i++)assert.equal(canPlay({},i,50),false)});
test('a win unlocks exactly the next level and keeps cleared levels replayable',()=>{const p=recordWin({},0,5,50);assert.equal(unlockedThrough(p,50),1);assert.ok(canPlay(p,0,50));assert.ok(canPlay(p,1,50));assert.equal(canPlay(p,2,50),false);assert.deepEqual(recordWin(p,2,6,50),p)});
test('out-of-order legacy scores cannot bypass unfinished levels',()=>{const p=cleanScores({'0':5,'10':30,'size-intro-v1':9,'30':4},50);assert.equal(unlockedThrough(p,50),1);assert.equal(canPlay(p,10,50),false);assert.equal(p['size-intro-v1'],9);assert.equal(p['10'],undefined)});
test('invalid scores and invalid level requests do not unlock progress',()=>{assert.deepEqual(cleanScores({'0':0,'1':-1,'2':'5','3':Infinity,'4':2.5},50),{});for(const i of [-1,50,1.5,NaN])assert.equal(canPlay({},i,50),false)});
test('replaying preserves the best score and final completion stays within the campaign',()=>{let p={};for(let i=0;i<50;i++)p=recordWin(p,i,60,50);assert.equal(unlockedThrough(p,50),49);assert.equal(Object.keys(p).length,50);assert.equal(recordWin(p,0,80,50)['0'],60);assert.equal(recordWin(p,0,5,50)['0'],5);assert.equal(p[scoreKey(10)],60)});
