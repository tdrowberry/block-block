import {writeFileSync} from 'node:fs';
import {step,stateKey,sizeOf,cells,solve} from './puzzle.js';
import {sizeIntro} from './power-levels.js';
let seed=947102;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const names=['Tall order','Small advantages','Three steps ahead','Shape of the escape','Building bridges','Cross purposes','The shifting maze','A matter of scale','All the right changes','Beyond balance'];
const descriptions=['Use all three sizes. Restore your shape before escaping.','A cube fits where a long block cannot.','Think about the footprint of your next shape.','A change in size can mean a change of route.','NEW: ⏻ toggles every dotted bridge. Touch it again to reverse.','Change the crossing, then change your shape.','Your route depends on both shape and bridges.','Small steps and long rolls must work together.','Every transformation has its moment.','Master three sizes and the changing crossings.'];
const result=[];
for(let attempt=0;result.length<10&&attempt<500000;attempt++){
 const index=result.length,target=26+index*4,size=12,bridge=index>=4;
 const map=Array.from({length:size},()=>Array.from({length:size},()=>random()<.67?'1':'0'));
 map[1][1]='1';const available=[];map.forEach((r,z)=>r.forEach((c,x)=>{if(c==='1'&&(x!==1||z!==1))available.push([x,z])}));
 const pads=[];for(const type of ['grow','shrink','normal',...(bridge?['bridge']:[])]){const candidates=available.filter(([x,z])=>pads.every(p=>Math.abs(x-p.x)+Math.abs(z-p.z)>3));if(!candidates.length)break;const[x,z]=candidates[Math.floor(random()*candidates.length)];pads.push({x,z,type})}if(pads.length!==(bridge?4:3))continue;
 if(bridge)for(let k=0;k<5;k++){const[x,z]=available[Math.floor(random()*available.length)];if((x!==1||z!==1)&&!pads.some(p=>p.x===x&&p.z===z))map[z][x]='b'}
 const level={name:names[index],description:descriptions[index],map:map.map(r=>r.join('')),start:[1,1],goal:[0,0],pads,par:target};
 const queue=[{s:{x:1,z:1,o:'u'},d:0,parent:-1}],seen=new Set([stateKey(queue[0].s)]);let winner=null;
 for(let i=0;i<queue.length;i++){const{s,d}=queue[i];if(s.o==='u'&&sizeOf(s)===2&&d===target&&!pads.some(p=>p.x===s.x&&p.z===s.z)&&level.map[s.z][s.x]==='1'){
   let used=new Set(),crossed=false;for(let j=i;j!==-1;j=queue[j].parent){used.add(sizeOf(queue[j].s));if(cells(queue[j].s).some(([x,z])=>level.map[z]?.[x]==='b'))crossed=true}
   if(used.has(1)&&used.has(3)&&(!bridge||crossed)){winner=s;break}
 }if(d>=target)continue;for(const dir of ['up','down','left','right']){const n=step(level,s,dir);if(n&&!seen.has(stateKey(n))){seen.add(stateKey(n));queue.push({s:n,d:d+1,parent:i})}}}
 if(!winner)continue;level.goal=[winner.x,winner.z];if(solve(level)?.length!==target)continue;
 // These are puzzles about changing size; ordinary rolling must not solve them.
 if(solve({...level,pads:[]}))continue;
 if(bridge&&solve({...level,pads:pads.filter(p=>p.type!=='bridge')}))continue;
 result.push(level);writeFileSync('power-levels.js', 'export const sizeIntro='+JSON.stringify(sizeIntro)+';\nexport const powerLevels='+JSON.stringify(result,null,2)+';\n');console.log(`${index+17}: ${level.name}: ${target} moves, attempt ${attempt}`);
}
if(result.length!==10)throw Error(`Found only ${result.length} levels`);
writeFileSync('power-levels.js',`// Static puzzles verified by the same transition rules used in play.\nexport const sizeIntro=${JSON.stringify(sizeIntro,null,2)};\nexport const powerLevels=${JSON.stringify(result,null,2)};\n`);

