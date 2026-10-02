import test from 'node:test';
import assert from 'node:assert/strict';

test('store bridge only resolves matching confirmations and propagates cancellation',async()=>{
 const previous=globalThis.window;
 const events=new EventTarget();let request;
 events.BlockBlockNative={request:raw=>{request=JSON.parse(raw)}};
 globalThis.window=events;
 try{
  const {storeRequest,hasNativeStore}=await import('./store.js');
  assert.equal(hasNativeStore(),true);
  const operation=storeRequest('spend');let settled=false;operation.then(()=>settled=true);
  events.dispatchEvent(new CustomEvent('block-block-store',{detail:{id:'unknown',spent:true}}));
  await Promise.resolve();assert.equal(settled,false);
  events.dispatchEvent(new CustomEvent('block-block-store',{detail:{id:request.id,spent:true,credits:2}}));
  assert.deepEqual(await operation,{spent:true,credits:2});
  const canceled=storeRequest('buy');
  events.dispatchEvent(new CustomEvent('block-block-store',{detail:{id:request.id,error:'Purchase canceled'}}));
  await assert.rejects(canceled,/Purchase canceled/);
  delete events.BlockBlockNative;assert.equal(hasNativeStore(),false);
  await assert.rejects(storeRequest('ad'),/Android app/);
 }finally{if(previous===undefined)delete globalThis.window;else globalThis.window=previous;}
});
