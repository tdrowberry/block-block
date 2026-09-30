import test from 'node:test';
import assert from 'node:assert/strict';
import {escapeRating,sassyEscapes} from './ratings.js';
import {minimumMoves} from './minimum-moves.js';
import {levels,solve} from './logic.js';
import {recordWin,canPlay} from './progress.js';

test('every displayed minimum is the true shortest route, including power levels',()=>{
 assert.equal(minimumMoves.length,levels.length);
 levels.forEach((level,i)=>assert.equal(minimumMoves[i],solve(level).length,level.name));
});
test('ratings use inclusive ten- and twenty-move thresholds',()=>{
 for(const [extra,title] of [[0,'Absolutely Perfect'],[1,'Almost perfect'],[10,'Almost perfect'],[11,'Good escape'],[20,'Good escape']]){
  const rating=escapeRating(30+extra,30);
  assert.equal(rating.title,title);assert.equal(rating.perfect,extra===0);assert.equal(rating.extra,extra);
 }
 assert.equal(escapeRating(51,30).title,sassyEscapes[0]);
});
test('sassy responses rotate and a slow escape still unlocks the next level',()=>{
 assert.equal(new Set(sassyEscapes.map((_,i)=>escapeRating(100,5,i).title)).size,sassyEscapes.length);
 assert.equal(escapeRating(100,5,sassyEscapes.length).title,sassyEscapes[0]);
 assert.ok(canPlay(recordWin({},0,100,50),1,50));
});
