import {writeFileSync} from 'node:fs';
import {step,stateKey,sizeOf,cells,solve} from './puzzle.js';
let seed=512793;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const names=['The long return','A delicate balance','Changing lanes','Before the leap','A step through space','Distant shores','The tall traveller','Between worlds','The relay','No place like home'];
const descriptions=['Three sizes. One route that brings them together.','Open the crossing at just the right moment.','Leave yourself room to change your mind.','Master your shape before the next discovery.','NEW: stand tall on ◎A to reach the matching ◎A. Cubes cannot teleport.','An empty space is no longer the end of the road.','Grow or restore before you step through the portal.','Two pairs of portals. Choose where to stand.','Shape, switches, and portals must work together.','Find your way between islands and back to normal.'];
const targets=[42,46,50,54,4,28,34,40,46,52];
const result=[];
const save=()=>writeFileSync('teleport-levels.js',`// Verified static levels 27–36. Portals first appear at level 31.\nexport const teleportLevels=${JSON.stringify(result,null,2)};\n`);
for(let attempt=0;result.length<10&&attempt<350000;attempt++){
 const index=result.length;
 if(index===4){const l={name:names[index],description:descriptions[index],map:['1111100011111','1111100011111','1111100011111'],start:[1,1],goal:[11,1],pads:[{x:4,z:1,type:'teleport',pair:'A'},{x:8,z:1,type:'teleport',pair:'A'}],par:4};if(solve(l)?.length!==4)throw Error('Invalid introduction');result.push(l);save();continue}
 const portal=index>=5,mixed=index!==5,bridge=index<4||index>=8,size=12,target=targets[index];
 const map=Array.from({length:size},()=>Array.from({length:size},(_,x)=>portal&&x===5?'0':random()<.69?'1':'0'));
 map[1][1]='1';const available=[];map.forEach((r,z)=>r.forEach((c,x)=>{if(c==='1'&&(x!==1||z!==1))available.push([x,z])}));
 const pads=[];const types=[...(mixed?['grow','shrink','normal']:[]),...(bridge?['bridge']:[])];
 for(const type of types){const candidates=available.filter(([x,z])=>pads.every(p=>Math.abs(x-p.x)+Math.abs(z-p.z)>3));if(!candidates.length)break;const[x,z]=candidates[Math.floor(random()*candidates.length)];pads.push({x,z,type})}if(pads.length!==types.length)continue;
 if(portal)for(const pair of index>=7?['A','B']:['A'])for(const side of [0,1]){const candidates=available.filter(([x,z])=>(side?x>5:x<5)&&pads.every(p=>Math.abs(x-p.x)+Math.abs(z-p.z)>2));if(!candidates.length)break;const[x,z]=candidates[Math.floor(random()*candidates.length)];pads.push({x,z,type:'teleport',pair})}
 if(portal&&pads.filter(p=>p.type==='teleport').length!==(index>=7?4:2))continue;
 if(bridge)for(let k=0;k<5;k++){const[x,z]=available[Math.floor(random()*available.length)];if(!pads.some(p=>p.x===x&&p.z===z))map[z][x]='b'}
 const level={name:names[index],description:descriptions[index],map:map.map(r=>r.join('')),start:[1,1],goal:[0,0],pads,par:target};
 const queue=[{s:{x:1,z:1,o:'u'},d:0,parent:-1}],seen=new Set([stateKey(queue[0].s)]);let winner=null;
 for(let i=0;i<queue.length;i++){const{s,d}=queue[i];if(s.o==='u'&&sizeOf(s)===2&&d===target&&(!portal||s.x>5)&&!pads.some(p=>p.x===s.x&&p.z===s.z)&&level.map[s.z][s.x]==='1'){
   const sizes=new Set();let crossed=false;for(let j=i;j!==-1;j=queue[j].parent){sizes.add(sizeOf(queue[j].s));if(cells(queue[j].s).some(([x,z])=>level.map[z]?.[x]==='b'))crossed=true}
   if((!mixed||sizes.has(1)&&sizes.has(3))&&(!bridge||crossed)){winner=s;break}
 }if(d>=target)continue;for(const dir of ['up','down','left','right']){const n=step(level,s,dir);if(n&&!seen.has(stateKey(n))){seen.add(stateKey(n));queue.push({s:n,d:d+1,parent:i})}}}
 if(!winner)continue;level.goal=[winner.x,winner.z];if(solve(level)?.length!==target)continue;
 if(mixed&&solve({...level,pads:pads.filter(p=>!['grow','shrink','normal'].includes(p.type))}))continue;
 if(bridge&&solve({...level,pads:pads.filter(p=>p.type!=='bridge')}))continue;
 if(portal&&solve({...level,pads:pads.filter(p=>p.type!=='teleport')}))continue;
 result.push(level);save();console.log(`${index+27}: ${level.name}: ${target} moves, attempt ${attempt}`);
}
if(result.length!==10)throw Error(`Found only ${result.length} levels`);
