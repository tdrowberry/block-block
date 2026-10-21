import test from 'node:test';
import assert from 'node:assert/strict';
import {tutorialLessons} from './tutorial.js';
import {roll,activate,supported,won,sizeOf} from './puzzle.js';

test('every guided tutorial move produces its advertised safe landing, fall or escape',()=>{
 const landings=[];
 for(const lesson of tutorialLessons){
  assert.ok(supported(lesson.level,lesson.state),`${lesson.title}: starts safely`);
  const rolled=roll(lesson.state,lesson.dir);
  const landed=supported(lesson.level,rolled)?activate(lesson.level,lesson.state,rolled):rolled;
  if(lesson.outcome==='fall')assert.equal(supported(lesson.level,landed),false,lesson.title);
  else {
   assert.ok(supported(lesson.level,landed),lesson.title);
   assert.equal(won(lesson.level,landed),lesson.outcome==='win',lesson.title);
  }
  landings.push(landed);
 }
 assert.equal(landings[0].o,'x');
 assert.equal(landings[1].o,'u');
 assert.equal(sizeOf(landings[6]),3);
 assert.equal(sizeOf(landings[7]),1);
 assert.equal(sizeOf(landings[9]),2);
 assert.equal(landings[10].open,true);
 assert.equal(landings[11].x,6);
});

test('the normal block must be upright and the altered sizes cannot finish the exit lesson',()=>{
 const lesson=tutorialLessons.at(-1),position={x:3,z:2,o:'u'};
 assert.ok(won(lesson.level,position));
 assert.equal(won(lesson.level,{...position,o:'x'}),false);
 assert.equal(won(lesson.level,{...position,n:1}),false);
 assert.equal(won(lesson.level,{...position,n:3}),false);
});
