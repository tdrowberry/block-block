import test from 'node:test';
import assert from 'node:assert/strict';
import {storyWorlds,storyEnding,storyForLevel,availableStory} from './story.js';
import {scoreKey} from './progress.js';

test('each five-level world has a story and the full campaign reaches the reunion',()=>{
 assert.equal(storyWorlds.length,20);
 for(let i=0;i<100;i++)assert.equal(storyForLevel(i),storyWorlds[Math.floor(i/5)]);
 assert.match(storyWorlds[0].text,/triangle son/);
 assert.match(storyEnding.text,/I love you exactly as you are/);
 assert.match(storyEnding.text,/go home together/);
});

test('story replay follows sequential progress without revealing future worlds',()=>{
 const scores={};assert.deepEqual(availableStory(scores),[storyWorlds[0]]);
 for(let i=0;i<99;i++){
  scores[scoreKey(i)]=5;
  const before=JSON.stringify(scores),pages=availableStory(scores);
  assert.equal(pages.length,Math.floor((i+1)/5)+1);
  assert.ok(!pages.includes(storyEnding));assert.equal(JSON.stringify(scores),before);
 }
 scores[scoreKey(99)]=108;
 assert.deepEqual(availableStory(scores),[...storyWorlds,storyEnding]);
 delete scores[scoreKey(10)];
 assert.deepEqual(availableStory(scores),storyWorlds.slice(0,3));
});
