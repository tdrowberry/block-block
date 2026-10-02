import './tips.test.js';
import './store.test.js';
import test from 'node:test';
import './progress.test.js';
import './camera.test.js';
import './ratings.test.js';
import './mindbender.test.js';
import assert from 'node:assert/strict';
import {levels,roll,cells,supported,won,solve,swipeDirection,step,activate,sizeOf} from './logic.js';

test('expert chapter increases from 64 to 82 moves and uses both altered sizes',()=>{
 assert.equal(levels.slice(50,60).length,10);
 for(const [i,l] of levels.slice(50,60).entries()){
  const path=solve(l);assert.equal(path.length,64+i*2);assert.equal(path.length,l.par);
  let s={x:l.start[0],z:l.start[1],o:'u'};const sizes=new Set([2]);
  for(const dir of path){s=step(l,s,dir);sizes.add(sizeOf(s))}
  assert.deepEqual([...sizes].sort(),[1,2,3]);assert.ok(won(l,s));
 }
 assert.equal(new Set(levels.map(l=>JSON.stringify(l.map))).size,levels.length);
});

test('fragile tiles support cubes and lying blocks but reject tall upright blocks',()=>{
 const l={map:['ffff']};
 for(const n of [1,2,3]){
  assert.equal(supported(l,{x:0,z:0,o:'u',n}),n===1);
  assert.equal(supported(l,{x:0,z:0,o:'x',n}),true);
 }
 assert.equal(step({map:['111f']},{x:1,z:0,o:'x'},'right'),null);
});
test('fourteen added levels have verified pars and introduce fragile tiles at 41',()=>{
 assert.equal(levels.length,70);
 assert.ok(levels.slice(0,40).every(l=>l.map.every(r=>!r.includes('f'))));
 assert.ok(levels[40].map.some(r=>r.includes('f')));
 for(const l of levels.slice(36,50))assert.equal(solve(l)?.length,l.par);
 for(const chapter of [levels.slice(36,40),levels.slice(40,50)]){
  for(let i=1;i<chapter.length;i++)assert.ok(chapter[i].par>chapter[i-1].par);
 }
});
test('swipes follow the dominant direction and ignore taps or small finger movement',()=>{assert.equal(swipeDirection(60,12),'right');assert.equal(swipeDirection(-60,12),'left');assert.equal(swipeDirection(12,60),'down');assert.equal(swipeDirection(12,-60),'up');assert.equal(swipeDirection(0,0),null);assert.equal(swipeDirection(15,-20),null)});
test('upright block tips across two cells then stands after three cells',()=>{const a=roll({x:0,z:0,o:'u'},'right');assert.deepEqual(cells(a),[[1,0],[2,0]]);assert.deepEqual(roll(a,'right'),{x:3,z:0,o:'u'})});
test('every move is reversed by its opposite in every orientation',()=>{for(const o of ['u','x','z'])for(const[a,b]of [['up','down'],['left','right'],['down','up'],['right','left']]){const s={x:3,z:3,o};assert.deepEqual(roll(roll(s,a),b),s)}});
test('a single unsupported half causes a fall',()=>{assert.equal(supported({map:['110']},{x:1,z:0,o:'x'}),false);assert.equal(supported({map:['110']},{x:0,z:0,o:'x'}),true)});
test('goal requires standing upright',()=>{const l={goal:[1,1]};assert.equal(won(l,{x:1,z:1,o:'x'}),false);assert.equal(won(l,{x:1,z:1,o:'u'}),true)});
for(const level of levels)test(`${level.name} has a valid route`,()=>{let s={x:level.start[0],z:level.start[1],o:'u'};assert.ok(supported(level,s));const path=solve(level);assert.ok(path?.length,'Level must be solvable');for(const d of path){s=step(level,s,d);assert.ok(s);assert.ok(supported(level,s))}assert.ok(won(level,s));console.log(`${level.name}: ${path.length} moves`)});
test('ten new power levels have strictly increasing verified shortest solutions',()=>{
  assert.equal(levels.length,70);
  let previous=0;
  for(const level of levels.slice(16,26)){
    const shortest=solve(level).length;
    assert.equal(shortest,level.par);
    assert.ok(shortest>previous,`${level.name} must require more moves than the previous level`);
    previous=shortest;
  }
});
test('all three sizes roll reversibly and occupy their full length',()=>{
 for(const n of [1,2,3])for(const o of n===1?['u']:['u','x','z'])for(const[a,b]of [['up','down'],['left','right'],['down','up'],['right','left']]){const s={x:5,z:5,o,n};assert.equal(cells(s).length,o==='u'?1:n);assert.deepEqual(roll(roll(s,a),b),s)}
 assert.deepEqual(roll({x:0,z:0,o:'u',n:3},'right'),{x:1,z:0,o:'x',n:3});
 assert.deepEqual(roll({x:1,z:0,o:'x',n:3},'right'),{x:4,z:0,o:'u',n:3});
});
test('touching a pad with the far end stands the block on the pad at its new size',()=>{
 const level={map:['1111111'],pads:[{x:2,z:0,type:'grow'}]};
 const original={x:0,z:0,o:'u'};
 const grown=step(level,original,'right');assert.deepEqual(grown,{x:2,z:0,o:'u',n:3});
 assert.deepEqual(original,{x:0,z:0,o:'u'});
 for(const[type,n]of [['shrink',1],['normal',2]])assert.equal(sizeOf(step({...level,pads:[{x:2,z:0,type}]},original,'right')),n);
 assert.equal(step({...level,map:['1101111']},original,'right'),null,'A pad cannot rescue an unsupported landing');
});
test('bridge switches activate on entry and closed bridges cannot support a block',()=>{
 const l={map:['111bb1'],pads:[{x:1,z:0,type:'bridge'}]};
 const previous={x:0,z:0,o:'u',n:1};const on=step(l,previous,'right');assert.equal(on.open,true);
 assert.equal(activate(l,on,on).open,true,'Staying on a switch does not toggle it again');
 const away=step(l,on,'right');assert.equal(step(l,away,'left').open,false);
 assert.equal(supported(l,{x:3,z:0,o:'x',open:true}),true);
 assert.equal(supported(l,{x:3,z:0,o:'x',open:false}),false);
 assert.equal(step({map:['11b'],pads:[{x:1,z:0,type:'bridge'}]},{x:0,z:0,o:'u',open:true},'right'),null,'Closing a bridge under half the block causes a fall');
});
test('only a normal-size upright block can escape',()=>{for(const n of [1,3])assert.equal(won({goal:[0,0]},{x:0,z:0,o:'u',n}),false)});
test('milestone powers appear at levels 11 and 21 and are optional in intervening designs',()=>{
 assert.ok(levels[10].pads.some(p=>p.type==='grow'));
 assert.ok(levels[20].pads.some(p=>p.type==='bridge'));
 assert.deepEqual(levels.slice(11,16).map(l=>Boolean(l.pads)),[true,false,true,false,false]);
 assert.ok(levels.slice(0,20).every(l=>!l.pads?.some(p=>p.type==='bridge')));
});
test('most levels after ten feature a power and midchapter powered routes activate it',()=>{
 const later=levels.slice(10),powered=later.filter(l=>l.pads?.length||l.map.some(r=>r.includes('f')));
 assert.ok(powered.length/later.length>=.85);
 for(const index of [11,13]){
   const level=levels[index],path=solve(level);let state={x:level.start[0],z:level.start[1],o:'u'},sizes=new Set([2]);
   for(const direction of path){state=step(level,state,direction);sizes.add(sizeOf(state))}
   assert.ok(index===11?sizes.has(3):sizes.has(1));assert.equal(sizeOf(state),2);
 }
});
test('new levels require transformations, and bridge levels require a switch',()=>{
 for(const l of levels.slice(16,26)){
   assert.equal(solve({...l,pads:[]}),null);
   if(l.pads.some(p=>p.type==='bridge'))assert.equal(solve({...l,pads:l.pads.filter(p=>p.type!=='bridge')}),null);
   let s={x:l.start[0],z:l.start[1],o:'u'},sizes=new Set([2]);for(const d of solve(l)){s=step(l,s,d);sizes.add(sizeOf(s))}assert.deepEqual([...sizes].sort(),[1,2,3]);
 }
});
test('teleport pairs transport tall upright blocks without changing size or bridges',()=>{
 const level={map:['111111111'],pads:[{x:3,z:0,type:'teleport',pair:'A'},{x:7,z:0,type:'teleport',pair:'A'}]};
 for(const n of [2,3]){const previous={x:3-n,z:0,o:'x',n,open:true},arrived=step(level,previous,'right');assert.deepEqual(arrived,{x:7,z:0,o:'u',n,open:true});assert.deepEqual(activate(level,arrived,arrived),arrived,'Arrival must not bounce');assert.equal(previous.x,3-n,'Undo snapshots remain untouched')}
 assert.equal(step(level,{x:2,z:0,o:'u',n:1},'right').x,3,'Cubes stay on the pad');
 assert.deepEqual(step(level,{x:2,z:0,o:'u'},'right'),{x:3,z:0,o:'x'},'Lying over the pad does not teleport');
});
test('portal letters stay paired and returning requires leaving first',()=>{
 const l={map:['111111111111'],pads:[{x:3,z:0,type:'teleport',pair:'A'},{x:6,z:0,type:'teleport',pair:'B'},{x:9,z:0,type:'teleport',pair:'A'},{x:0,z:0,type:'teleport',pair:'B'}]};
 const arrival=step(l,{x:1,z:0,o:'x'},'right');assert.equal(arrival.x,9);
 const away=step(l,arrival,'left');assert.equal(step(l,away,'right').x,3);
 assert.equal(step({...l,map:['111111111011']},{x:1,z:0,o:'x'},'right'),null,'An unsupported destination cannot be used');
 assert.deepEqual(step({...l,pads:[l.pads[0]]},{x:1,z:0,o:'x'},'right'),{x:3,z:0,o:'u'},'An unpaired symbol is inert');
});
test('teleports begin at level 31 and are essential to crossing the islands',()=>{
 assert.ok(levels.slice(0,30).every(l=>!l.pads?.some(p=>p.type==='teleport')));
 for(const l of levels.slice(30,36)){
   assert.equal(solve(l).length,l.par);
   assert.equal(solve({...l,pads:l.pads.filter(p=>p.type!=='teleport')}),null);
   const pairs=new Map();for(const p of l.pads.filter(p=>p.type==='teleport'))pairs.set(p.pair,(pairs.get(p.pair)??0)+1);
   assert.ok(pairs.size>0);assert.ok([...pairs.values()].every(n=>n===2));
 }
});
test('new challenges increase within each chapter, with a short teleport introduction',()=>{
 for(const chapter of [levels.slice(26,30),levels.slice(30,36)]){let previous=0;for(const l of chapter){assert.equal(solve(l).length,l.par);assert.ok(l.par>previous);previous=l.par}}
});
