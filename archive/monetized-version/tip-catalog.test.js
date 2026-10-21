import test from 'node:test';
import assert from 'node:assert/strict';
import {tipPacks,availablePacks,packSavings} from './tip-catalog.js';
test('store offers only the seven supported quantities and rejects mismatched product quantities',()=>{
 assert.deepEqual(tipPacks.map(pack=>pack.count),[1,5,10,20,30,40,50]);
 assert.ok(availablePacks().every(pack=>!pack.available));
 const packs=availablePacks([{id:'tips_50',count:500,price:'$1.00'},{id:'tips_5',count:5,price:'$5.00'}]);
 assert.equal(packs.find(pack=>pack.count===50).available,false);
 assert.equal(packs.find(pack=>pack.count===5).available,true);
});
test('savings use actual same-currency prices and never invent a discount',()=>{
 const single={count:1,priceMicros:1000000,currency:'USD'};
 const prices=[4750000,9000000,16000000,22500000,28000000,30000000];
 [5,10,20,30,40,50].forEach((count,i)=>assert.equal(packSavings(single,{count,priceMicros:prices[i],currency:'USD'}),[5,10,20,25,30,40][i]));
 assert.equal(packSavings(single,{count:50,priceMicros:32500000,currency:'EUR'}),null);
 assert.equal(packSavings(single,{count:5,priceMicros:5000000,currency:'USD'}),null);
 assert.equal(packSavings(null,{count:50,priceMicros:32500000,currency:'USD'}),null);
 assert.equal(packSavings(single,{count:50,priceMicros:NaN,currency:'USD'}),null);
});
