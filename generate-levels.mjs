// Deterministic authoring utility: find compact, connected puzzles with exact
// shortest-solution lengths. Generated boards are shipped as static data.
import {writeFileSync} from 'node:fs';
import {roll,cells} from './logic.js';
let seed=72419;
const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const targets=[14,18,22,26,30,34,38,42,46,50];
const names=['Switchback','Crooked crossing','The hollow','Double back','Thread the needle','False horizons','The labyrinth','No straight answers','Against the grain','The final balance'];
const descriptions=['Sometimes forward starts with a turn back.','Cross with the right side facing the right way.','A missing center changes everything.','Retrace your steps with a different balance.','Small crossings. Very little room for error.','The goal looks close. The route has other ideas.','Every turn is part of a bigger plan.','Straight lines will only get you so far.','Unlearn the obvious route. Find your own.','Fifty perfect moves. One last way out.'];
const results=[];
for(let attempt=0;results.length<targets.length&&attempt<200000;attempt++){
  const index=results.length,target=targets[index],size=index<4?9:10;
  const map=Array.from({length:size},()=>Array.from({length:size},()=>random()<.69?'1':'0'));
  map[1][1]='1';
  const queue=[{x:1,z:1,o:'u',distance:0}],seen=new Set(['1,1,u']);
  let goal=null;
  for(let i=0;i<queue.length;i++){
    const s=queue[i];
    if(s.o==='u'&&s.distance===target&&Math.abs(s.x-1)+Math.abs(s.z-1)>=5)goal=[s.x,s.z];
    for(const dir of ['up','down','left','right']){
      const next=roll(s,dir),key=`${next.x},${next.z},${next.o}`;
      if(!seen.has(key)&&cells(next).every(([x,z])=>map[z]?.[x]==='1')){
        seen.add(key);queue.push({...next,distance:s.distance+1});
      }
    }
  }
  if(!goal)continue;
  // Remove decorative islands and tiles that cannot be reached in any orientation.
  const used=new Set(queue.flatMap(s=>cells(s).map(([x,z])=>`${x},${z}`)));
  if(used.size<30)continue;
  const clean=map.map((row,z)=>row.map((_,x)=>used.has(`${x},${z}`)?'1':'0').join(''));
  results.push({name:names[index],description:descriptions[index],map:clean,start:[1,1],goal,par:target});
  console.log(`${index+7}: ${names[index]}, ${target} moves, ${used.size} tiles (attempt ${attempt})`);
}
if(results.length!==10)throw new Error('Could not find all ten boards');
writeFileSync('advanced-levels.js',`// Authored with generate-levels.mjs; par is the verified shortest solution.\nexport const advancedLevels = ${JSON.stringify(results,null,2)};\n`);
