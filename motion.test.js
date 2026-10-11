import test from 'node:test';
import assert from 'node:assert/strict';
import {createMoveBuffer} from './motion.js';
test('buffer preserves the first intended move and ignores key repeat',()=>{
 const queue=createMoveBuffer();queue.offer('up',true);assert.equal(queue.take(),null);
 queue.offer('left');queue.offer('right');assert.equal(queue.take(),'left');assert.equal(queue.take(),null);
 queue.offer('down');queue.clear();assert.equal(queue.take(),null);
});
