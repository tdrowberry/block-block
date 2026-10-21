import test from 'node:test';
import assert from 'node:assert/strict';
import {films,filmDuration,sampleFilm,nextFilm} from './cutscenes.js';
import {availableStory,storyWorlds} from './story.js';
import {scoreKey} from './progress.js';

test('each world and the reunion have animated shots with readable attributed captions',()=>{
 assert.equal(films.length,storyWorlds.length+1);
 for(const film of films){
  assert.ok(film.shots.length>=4);
  assert.ok(film.shots.some((s,i)=>i>0&&(s.b?.x!==film.shots[i-1].b?.x||s.t?.x!==film.shots[i-1].t?.x)));
  for(const s of film.shots){assert.ok(s.speaker&&s.text);assert.ok(s.text.length<100);assert.ok(s.duration>=5200);assert.ok(s.b||s.t)}
 }
 assert.ok(films[0].shots.some(s=>s.t?.x>800),'Triangle visibly leaves the stage');
 assert.ok(films.at(-1).shots.some(s=>s.b?.gesture==='hug'&&s.t?.gesture==='hug'));
 assert.equal(films.at(-1).shots.at(-1).place,'home');
});
test('film time selects the right caption at boundaries and keeps the final caption',()=>{
 for(const film of films){
  let elapsed=0;
  film.shots.forEach((s,i)=>{const frame=sampleFilm(film,elapsed);assert.equal(frame.index,i);assert.equal(frame.progress,0);assert.equal(frame.done,false);elapsed+=s.duration});
  const final=sampleFilm(film,elapsed+1000);assert.equal(final.index,film.shots.length-1);assert.equal(final.done,true);assert.equal(final.progress,1);assert.equal(filmDuration(film),elapsed);
  assert.equal(sampleFilm(film,-100).time,0);
 }
});
test('movie playback stops at the unlocked frontier and can include the ending only on completion',()=>{
 for(const completed of [0,5,50,99,100]){
  const scores=Object.fromEntries(Array.from({length:completed},(_,i)=>[scoreKey(i),1]));
  const count=availableStory(scores).length,seen=[];
  for(let i=0;i!==null;i=nextFilm(i,count,true))seen.push(i);
  assert.equal(seen.length,count);assert.equal(seen.includes(20),completed===100);
  assert.equal(nextFilm(0,count,false),null);
 }
});
