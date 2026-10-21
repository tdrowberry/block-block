import test from 'node:test';
import assert from 'node:assert/strict';
import {createTipWallet,tipStatus} from './free-tips.js';
import {recordWin} from './progress.js';
test('one Tip per three different campaign completions, including existing progress',()=>{
 let scores={};
 for(let i=0;i<100;i++){scores=recordWin(scores,i,10,100);assert.equal(tipStatus(scores,100).credits,Math.floor((i+1)/3));if(i>=98)assert.equal(tipStatus(scores,100).untilNext,0);}
 assert.equal(tipStatus(scores,100).untilNext,0);
 assert.equal(tipStatus(recordWin(scores,2,5,100),100).credits,33);
 assert.equal(tipStatus({0:10,1:10,2:10,garbage:4,3:-1},100).credits,1);
});
test('spending persists across reloads and replays cannot replenish spent Tips',()=>{
 const data=new Map(),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
 let scores={0:4,1:4,2:4};const wallet=createTipWallet(storage);
 assert.equal(wallet.spend(scores,100),true);
 assert.equal(createTipWallet(storage).status(scores,100).credits,0);
 assert.equal(wallet.spend(recordWin(scores,1,2,100),100),false);
 scores={...scores,3:4,4:4,5:4};assert.equal(wallet.status(scores,100).credits,1);
 assert.equal(wallet.spend(scores,100),true);assert.equal(wallet.spend(scores,100),false);
});
test('storage errors and corrupt records fail safely',()=>{
 const scores={0:4,1:4,2:4};
 assert.throws(()=>createTipWallet({getItem:()=>null,setItem:()=>{throw Error('Full')}}).spend(scores,100),/Full/);
 for(const raw of ['-1','NaN','1.5','9007199254740999'])assert.throws(()=>createTipWallet({getItem:()=>raw}).status(scores,100));
 assert.equal(tipStatus(scores,100,10).credits,0);
});
