export const sizeOf=s=>s.n??2;
export function roll(s,dir){let{x,z,o}=s;const n=sizeOf(s);if(n===1)return{...s,x:x+(dir==='right'?1:dir==='left'?-1:0),z:z+(dir==='down'?1:dir==='up'?-1:0),o:'u'};if(dir==='right'){x+=o==='x'?n:1;if(o!=='z')o=o==='u'?'x':'u'}if(dir==='left'){x-=o==='u'?n:1;if(o!=='z')o=o==='u'?'x':'u'}if(dir==='down'){z+=o==='z'?n:1;if(o!=='x')o=o==='u'?'z':'u'}if(dir==='up'){z-=o==='u'?n:1;if(o!=='x')o=o==='u'?'z':'u'}return{...s,x,z,o}}
export function cells(s){return Array.from({length:s.o==='u'?1:sizeOf(s)},(_,i)=>[s.x+(s.o==='x'?i:0),s.z+(s.o==='z'?i:0)])}
export function supported(level,s){return cells(s).every(([x,z])=>{const tile=level.map[z]?.[x];return tile==='1'||(s.open&&tile==='b')||(tile==='f'&&(sizeOf(s)===1||s.o!=='u'))})}
export function won(level,s){return sizeOf(s)===2&&s.o==='u'&&s.x===level.goal[0]&&s.z===level.goal[1]}
export function activate(level,previous,landed){
  const before=new Set(cells(previous).map(c=>c.join(',')));
  const occupied=new Set(cells(landed).map(c=>c.join(',')));
  // Teleports require a tall upright block; a cube or a lying block is inert.
  // Resolve exactly one hop per landing, so arriving never bounces back.
  const portal=level.pads?.find(p=>p.type==='teleport'&&p.x===landed.x&&p.z===landed.z&&landed.o==='u'&&sizeOf(landed)>1&&!(previous.x===p.x&&previous.z===p.z&&previous.o==='u'&&sizeOf(previous)>1));
  if(portal){const pair=level.pads.filter(p=>p.type==='teleport'&&p.pair===portal.pair);if(pair.length===2){const destination=pair.find(p=>p!==portal);return{...landed,x:destination.x,z:destination.z}}}
  const pad=level.pads?.find(p=>p.type!=='teleport'&&occupied.has(`${p.x},${p.z}`)&&!before.has(`${p.x},${p.z}`));
  if(!pad)return landed;
  return pad.type==='bridge'?{...landed,open:!landed.open}:{...landed,x:pad.x,z:pad.z,o:'u',n:{grow:3,shrink:1,normal:2}[pad.type]};
}
export function step(level,s,dir){const landed=roll(s,dir);if(!supported(level,landed))return null;const next=activate(level,s,landed);return supported(level,next)?next:null}
export const stateKey=s=>`${s.x},${s.z},${s.o},${sizeOf(s)},${s.open?1:0}`;
export function solve(level){const start={x:level.start[0],z:level.start[1],o:'u'},queue=[{s:start,parent:-1,dir:null}],seen=new Set([stateKey(start)]);for(let i=0;i<queue.length;i++){const node=queue[i];if(won(level,node.s)){const path=[];for(let j=i;queue[j].parent!==-1;j=queue[j].parent)path.push(queue[j].dir);return path.reverse()}for(const dir of ['up','down','left','right']){const next=step(level,node.s,dir);if(next&&!seen.has(stateKey(next))){seen.add(stateKey(next));queue.push({s:next,parent:i,dir})}}}return null}
export function swipeDirection(dx,dy){if(Math.max(Math.abs(dx),Math.abs(dy))<24)return null;return Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up')}
