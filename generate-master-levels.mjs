// Deterministic offline search. Output is static; no generation runs in the app.
import {writeFileSync} from 'node:fs';
import {expertLevels} from './expert-levels.js';
import {step,stateKey,sizeOf,cells,solve} from './puzzle.js';
let seed=7100100;
const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const names=['Beyond the familiar','The patient crossing','Threefold detour','A measured risk','Switching sides','The long approach','Against the current','A second perspective','Balanced decisions','No easy crossing','Through the looking glass','Distant intentions','The other entrance','Space between steps','Return to the beginning','A borrowed passage','The long relay','Twice removed','An unlikely connection','Worlds within worlds','Under pressure','Fault lines','A fragile agreement','The weight of a choice','Careful what you open','Threading the islands','One more transformation','The final approach','Everything in balance','The hundredth escape'];
const result=process.argv.includes('--resume')?[...(await import('./master-levels.js')).masterLevels]:[];
for(let attempt=0;result.length<30&&attempt<500000;attempt++){
 if(attempt%10000===0)console.log('Searching',result.length+71,'attempt',attempt);
 const index=result.length,target=50+index*2,chapter=Math.floor(index/10),size=12+chapter;
 let map=Array.from({length:size},()=>Array.from({length:size},()=>random()<.66?'1':'0'));
 map[1][1]='1';const available=[];map.forEach((r,z)=>r.forEach((c,x)=>{if(c==='1'&&(x!==1||z!==1))available.push([x,z])}));
 let pads=[];const types=['grow','shrink','normal','bridge',...(chapter>0?['teleport','teleport']:[])];
 for(const type of types){const options=available.filter(([x,z])=>pads.every(p=>Math.abs(x-p.x)+Math.abs(z-p.z)>3));if(!options.length)break;const[x,z]=options[Math.floor(random()*options.length)];pads.push({x,z,type,...(type==='teleport'?{pair:'A'}:{})})}
 if(pads.length!==types.length)continue;
 for(let k=0;k<6+chapter*3;k++){const[x,z]=available[Math.floor(random()*available.length)];if(!pads.some(p=>p.x===x&&p.z===z))map[z][x]=chapter===2&&k>=6?'f':'b'}
 // Refine substantial topology changes to proven hard boards as well as fresh boards.
 const pool=[...expertLevels,...result].filter(l=>chapter===0||l.pads.some(p=>p.type==='teleport'));
 if(pool.length&&random()<.85){
  const base=pool[Math.floor(random()*pool.length)];
  map=Array.from({length:size},(_,z)=>Array.from({length:size},(_,x)=>base.map[z]?.[x]??'0'));
  pads=structuredClone(base.pads);
  const changed=new Set();
  while(changed.size<16){const x=Math.floor(random()*size),z=Math.floor(random()*size),key=`${x},${z}`;if((x===1&&z===1)||pads.some(p=>p.x===x&&p.z===z)||changed.has(key))continue;changed.add(key);map[z][x]=map[z][x]==='0'?'1':'0'}
  if(chapter===2)for(let k=0;k<9;k++){const x=Math.floor(random()*size),z=Math.floor(random()*size);if(map[z][x]==='1'&&(x!==1||z!==1)&&!pads.some(p=>p.x===x&&p.z===z))map[z][x]='f'}
  if(result.some(l=>l.map.length===size&&l.map.reduce((sum,row,z)=>sum+[...row].filter((c,x)=>c!==map[z][x]).length,0)<12))continue;
 }
 const level={name:names[index],description:[
  'Master all three sizes and plan when to open your crossings.',
  'Link your transformations and bridge crossings through the portal pair.',
  'Balance shape, switches, portals, and fragile ground. Every decision matters.'
 ][chapter],map:map.map(r=>r.join('')),start:[1,1],goal:[-1,-1],pads,par:target};
 const queue=[{s:{x:1,z:1,o:'u'},d:0,parent:-1}],seen=new Set([stateKey(queue[0].s)]);let candidate=null;
 for(let i=0;i<queue.length;i++){
  const{s,d}=queue[i];
  if(d===target&&s.o==='u'&&sizeOf(s)===2&&level.map[s.z][s.x]==='1'&&!pads.some(p=>p.x===s.x&&p.z===s.z)){
   const sizes=new Set();let crossed=false,fragile=false,hops=0,toggles=0,revisits=0;const positions=new Set();
   for(let j=i;j!==-1;j=queue[j].parent){const current=queue[j].s;sizes.add(sizeOf(current));for(const[x,z]of cells(current)){crossed||=level.map[z][x]==='b';fragile||=level.map[z][x]==='f'}const key=`${current.x},${current.z}`;if(positions.has(key))revisits++;positions.add(key);const parent=queue[j].parent;if(parent>=0){const prev=queue[parent].s;if(!!prev.open!==!!current.open)toggles++;if(Math.abs(prev.x-current.x)+Math.abs(prev.z-current.z)>4)hops++}}
   if(sizes.has(1)&&sizes.has(3)&&crossed&&toggles>=1&&revisits>=3&&(chapter===0||hops>=1)&&(chapter<2||fragile)){candidate=s;break}
  }
  if(d>=target)continue;
  for(const dir of ['up','down','left','right']){const next=step(level,s,dir);if(next&&!seen.has(stateKey(next))){seen.add(stateKey(next));queue.push({s:next,d:d+1,parent:i})}}
 }
 if(!candidate)continue;level.goal=[candidate.x,candidate.z];
 if(solve(level)?.length!==target)continue;
 // Essential mechanics: no shortcuts that ignore shape changes, switches, or portals.
 if(solve({...level,pads:pads.filter(p=>!['grow','shrink','normal'].includes(p.type))}))continue;
 if(solve({...level,pads:pads.filter(p=>p.type!=='bridge')}))continue;
 if(chapter>0&&solve({...level,pads:pads.filter(p=>p.type!=='teleport')}))continue;
 result.push(level);
 writeFileSync('master-levels.js','// Levels 71–100: deterministic, solver-verified master puzzles.\nexport const masterLevels='+JSON.stringify(result,null,2)+';\n');
 console.log(`${index+71}: ${level.name}: ${target} moves (attempt ${attempt})`);
}
if(result.length!==30)throw Error(`Only ${result.length} candidates found`);


