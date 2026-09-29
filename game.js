import {levels,roll,cells,supported,won,swipeDirection,sizeOf,activate} from './logic.js';
import {projectUnits,cameraDepth} from './camera.js';
import {scoreKey,cleanScores,unlockedThrough,canPlay,recordWin} from './progress.js';
const $=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d');
let levelIndex=0,state={x:1,z:1,o:'u'},history=[],animation=null,phase='menu',screen='levels',width=0,height=0,scale=40,origin=[0,0],sound=false,audio,touch=null;
let bests={};try{bests=cleanScores(JSON.parse(localStorage.getItem('block-block-best')||'{}'),levels.length)}catch{}
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const themes=[['Moss',150,80],['Ocean',205,175],['Sunset',20,40],['Grape',275,305],['Rose',340,15],['Gold',42,52],['Neon',255,160],['Candy',325,345]];
const themeOf=i=>{const[name,h,a]=themes[Math.floor(i/5)%themes.length];return{name,h,a}};
let th=themeOf(0);
function applyTheme(i){th=themeOf(i);const r=document.documentElement.style;r.setProperty('--accent',`hsl(${th.a},55%,74%)`);r.setProperty('--bgc',`hsl(${th.h},30%,12%)`);document.querySelector('meta[name=theme-color]').content=`hsl(${th.h},30%,12%)`}
let splashFor=-1,splashTimer=0,bits=[];const cv=$('confetti'),cctx=cv.getContext('2d');
function hideWorld(){clearTimeout(splashTimer);$('world').hidden=true;if(phase==='splash')phase='playing'}
function showWorld(i){
 splashFor=i;phase='splash';$('world-num').textContent=`WORLD ${Math.floor(i/5)+1}`;$('world-name').textContent=th.name;$('world').hidden=false;
 splashTimer=setTimeout(hideWorld,2600);if(reduced)return;
 const ratio=Math.min(devicePixelRatio||1,2),w=innerWidth,h=innerHeight;cv.width=w*ratio;cv.height=h*ratio;cctx.setTransform(ratio,0,0,ratio,0,0);
 const hues=[th.a,th.h,(th.a+40)%360,(th.h+180)%360];bits=[];
 for(let n=0;n<150;n++){const side=n%2?1:-1,ang=-Math.PI/2+side*(.15+Math.random()*.7),sp=(.55+Math.random()*.6)*Math.min(h,900)*.021;bits.push({x:w/2+side*w*.42,y:h*.85,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp,s:4+Math.random()*6,rot:Math.random()*6,vr:(Math.random()-.5)*.4,c:n%9===0?'#fff':`hsl(${hues[n%4]},80%,${55+Math.random()*20}%)`,life:1})}
}
let lastConf=0;
function confetti(time){
 const k=Math.min(4,Math.max(.2,(time-lastConf)/16.7||1));lastConf=time;if(!bits.length)return;cctx.clearRect(0,0,cv.width,cv.height);
 for(const b of bits){b.vy+=.28*k;b.vx*=Math.pow(.99,k);b.x+=b.vx*k;b.y+=b.vy*k;b.rot+=b.vr*k;b.life-=.006*k;cctx.save();cctx.globalAlpha=Math.max(0,Math.min(1,b.life*2));cctx.translate(b.x,b.y);cctx.rotate(b.rot);cctx.scale(1,Math.abs(Math.cos(b.rot*1.7))+.2);cctx.fillStyle=b.c;cctx.fillRect(-b.s/2,-b.s/4,b.s,b.s/2);cctx.restore()}
 bits=bits.filter(b=>b.life>0&&b.y<innerHeight+30);if(!bits.length)cctx.clearRect(0,0,cv.width,cv.height);
}
$('world').onclick=hideWorld;
const chapterNames=['01 · FIND YOUR FOOTING','02 · CHANGE YOUR SHAPE','03 · BUILD YOUR BRIDGES','04 · STEP THROUGH SPACE'];
function renderLevels(){
 const frontier=unlockedThrough(bests,levels.length);$('levels').replaceChildren();
 for(let start=0;start<levels.length;start+=10){
  const chapter=document.createElement('section');chapter.className='chapter';const title=document.createElement('h3');title.className='chapter-heading';title.textContent=chapterNames[start/10];chapter.append(title);
  const grid=document.createElement('div');grid.className='chapter-grid';chapter.append(grid);
  levels.slice(start,start+10).forEach((l,j)=>{const i=start+j,unlocked=canPlay(bests,i,levels.length),cleared=bests[scoreKey(i)]!=null,b=document.createElement('button');b.className=`level-button${cleared?' completed':''}${i===frontier&&!cleared?' current':''}`;b.disabled=!unlocked;b.setAttribute('aria-label',`Level ${i+1}: ${l.name}, ${!unlocked?(cleared?'completed, locked':'locked'):cleared?'completed':'available'}`);b.title=cleared?`Best: ${bests[scoreKey(i)]} moves`:l.name;
   const number=document.createElement('span');number.className='level-number';number.textContent=String(i+1).padStart(2,'0');const badge=document.createElement('span');badge.className='level-state';badge.textContent=cleared?(!unlocked?'✓ 🔒':'✓ DONE'):!unlocked?'🔒':'PLAY';b.append(number,badge);{const t=themeOf(i);b.style.setProperty('--t',`hsl(${t.a},55%,62%)`)}b.onclick=()=>load(i);grid.append(b);
  });$('levels').append(chapter);
 }
 const count=Object.keys(bests).length;$('progress-label').textContent=`${count} / ${levels.length} completed`;$('progress-percent').textContent=`${Math.round(count/levels.length*100)}%`;$('progress-bar').value=count;$('progress-bar').max=levels.length;
 $('continue').textContent=`${count===levels.length?'Replay':frontier===0?'Start':'Continue'} level ${String(frontier+1).padStart(2,'0')} ↗`;
}
function showLevels(){applyTheme(0);splashFor=-1;hideWorld();bits=[];screen='levels';phase='menu';animation=null;touch=null;$('result').hidden=true;$('play-screen').hidden=true;$('level-screen').hidden=false;document.body.style.overflow='';renderLevels();window.scrollTo(0,0)}
function tone(freq=160,duration=.08){if(!sound)return;try{audio??=new AudioContext();audio.resume();const osc=audio.createOscillator(),gain=audio.createGain();osc.type='sine';osc.frequency.setValueAtTime(freq,audio.currentTime);osc.frequency.exponentialRampToValueAtTime(freq*.65,audio.currentTime+duration);gain.gain.setValueAtTime(.06,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);osc.connect(gain).connect(audio.destination);osc.start();osc.stop(audio.currentTime+duration)}catch{}}
function update(){ $('moves').textContent=String(history.length).padStart(2,'0');$('best').textContent=bests[scoreKey(levelIndex)]??'—';$('block-size').textContent=`${sizeOf(state)} × 1 × 1${levels[levelIndex].pads?.some(p=>p.type==='bridge')?` · BRIDGES ${state.open?'ON':'OFF'}`:''}`;canvas.setAttribute('aria-busy',String(Boolean(animation)));}
function load(i,afterFall=false){
 if(!canPlay(bests,i,levels.length))return;
 levelIndex=i;applyTheme(i);state={x:levels[i].start[0],z:levels[i].start[1],o:'u'};history=[];animation=null;touch=null;phase='playing';screen='play';
 $('level-screen').hidden=true;$('play-screen').hidden=false;document.body.style.overflow='hidden';$('result').hidden=true;
 $('level-tag').textContent=`LEVEL ${String(i+1).padStart(2,'0')} / ${levels.length} · ${th.name.toUpperCase()}`;$('level-name').textContent=levels[i].name;
 $('status').textContent=(!afterFall&&i%5===0&&i>0?`New world: ${th.name}! `:'')+(afterFall?'New attempt. Keep the whole block on the tiles.':levels[i].pads?.length?levels[i].description:'Swipe to roll. Stand upright on the glowing exit.');
 update();resize();canvas.focus({preventScroll:true});
 hideWorld();if(!afterFall&&i>0&&i%5===0&&splashFor!==i)showWorld(i);
}
function move(dir){if(screen!=='play'||$('help-dialog').open||phase!=='playing'||animation)return;history.push({...state});animation={kind:'roll',from:{...state},to:roll(state,dir),dir,start:performance.now(),duration:reduced?60:190};tone();update()}
function finish(success){
 if(!success){tone(90,.2);load(levelIndex,true);return}
 phase='won';bests=recordWin(bests,levelIndex,history.length,levels.length);try{localStorage.setItem('block-block-best',JSON.stringify(bests))}catch{}
 update();$('result-title').textContent=levelIndex===levels.length-1?'Master of the block.':'An elegant escape.';
 $('result-text').textContent=`Escaped in ${history.length} moves. ${levelIndex===levels.length-1?'Every escape completed. Beautifully done.':`Level ${levelIndex+2} is now unlocked.`}`;
 $('result-primary').textContent=levelIndex===levels.length-1?'Back to levels':'Next level ↗';$('result').hidden=false;$('result-primary').focus();tone(520,.25);
}
$('result-primary').onclick=()=>{if(phase==='won'){if(levelIndex===levels.length-1)showLevels();else load(levelIndex+1)}};
$('result-secondary').onclick=showLevels;$('level-menu').onclick=showLevels;$('continue').onclick=()=>load(unlockedThrough(bests,levels.length));$('restart').onclick=()=>load(levelIndex);
$('sound').onclick=()=>{sound=!sound;$('sound').textContent=`♪ ${sound?'ON':'OFF'}`;$('sound').setAttribute('aria-label',sound?'Disable sound':'Enable sound');tone(300)};
let helpOpenedAt=0;
function openHelp(){helpOpenedAt=performance.now();touch=null;$('help-dialog').showModal()}
$('how-to-play').onclick=openHelp;$('play-help').onclick=openHelp;$('close-help').onclick=()=> $('help-dialog').close();$('help-done').onclick=()=> $('help-dialog').close();
$('help-dialog').addEventListener('close',()=>{if(animation)animation.start+=performance.now()-helpOpenedAt});
document.querySelectorAll('[data-dir]').forEach(b=>b.onclick=()=>move(b.dataset.dir));
window.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||$('help-dialog').open||screen!=='play')return;const k=e.key.toLowerCase(),dir={arrowup:'up',arrowdown:'down',arrowleft:'left',arrowright:'right',w:'up',s:'down',a:'left',d:'right'}[k];if(dir){e.preventDefault();move(dir)}else if(k==='r'){load(levelIndex)}else if(k==='escape'){e.preventDefault();showLevels()}});
canvas.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0||screen!=='play'||phase!=='playing'||animation||$('help-dialog').open)return;touch={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener('pointerup',e=>{if(!touch||touch.id!==e.pointerId)return;const dir=swipeDirection(e.clientX-touch.x,e.clientY-touch.y);touch=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);if(dir)move(dir)});
for(const event of ['pointercancel','lostpointercapture'])canvas.addEventListener(event,e=>{if(touch?.id===e.pointerId)touch=null});
function resize(){
 if(screen!=='play')return;const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=width*ratio;canvas.height=height*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);
 const points=[];levels[levelIndex].map.forEach((row,z)=>[...row].forEach((c,x)=>{if(c==='1'||c==='b')for(const dx of [-.5,.5])for(const dz of [-.5,.5])points.push(projectUnits([x+dx,0,z+dz]))}));
 const minX=Math.min(...points.map(p=>p[0])),maxX=Math.max(...points.map(p=>p[0])),minY=Math.min(...points.map(p=>p[1]))+projectUnits([0,3,0])[1],maxY=Math.max(...points.map(p=>p[1]))+.3;
 const landscape=height<350;scale=Math.max(1,Math.min((width-28)/(maxX-minX),(height-(landscape?115:80))/(maxY-minY)));
 origin=[width/2-(minX+maxX)*scale/2,(height-(landscape?50:0))/2+15-(minY+maxY)*scale/2];
}
window.addEventListener('resize',resize);new ResizeObserver(resize).observe(canvas);
let installPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('install').hidden=false});$('install').onclick=async()=>{if(!installPrompt)return;await installPrompt.prompt();installPrompt=null;$('install').hidden=true};
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
function project(point){const[x,y]=projectUnits(point);return[origin[0]+x*scale,origin[1]+y*scale]}
function polygon(points,fill,stroke){ctx.beginPath();points.forEach((v,i)=>{const p=project(v);i?ctx.lineTo(...p):ctx.moveTo(...p)});ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
function specialTile(x,z,time){
 const l=levels[levelIndex],isBridge=l.map[z][x]==='b';
 if(isBridge&&!state.open){ctx.save();ctx.setLineDash([3,3]);polygon([[x-.45,0,z-.45],[x+.45,0,z-.45],[x+.45,0,z+.45],[x-.45,0,z+.45]],'#6ccddd09','#6ccddd70');ctx.restore();return}
 tile(x,z,x===l.goal[0]&&z===l.goal[1],time);
 const pad=l.pads?.find(p=>p.x===x&&p.z===z);
 if(pad||isBridge){const colors={grow:'#f2b36b',shrink:'#b5a0f0',normal:'#e1efad',bridge:'#77d4e0',teleport:pad?.pair==='B'?'#8fb9ff':'#f49bda'},color=colors[pad?.type]??colors.bridge;
 polygon([[x-.40,.02,z-.40],[x+.40,.02,z-.40],[x+.40,.02,z+.40],[x-.40,.02,z+.40]],color+'35',color);
 const p=project([x,.045,z]);ctx.save();ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`bold ${Math.max(10,scale*.4)}px sans-serif`;if(pad?.type==='teleport'){ctx.shadowColor=color;ctx.shadowBlur=6}ctx.fillText(pad?(pad.type==='teleport'?`◎${pad.pair}`:{grow:'↑3',shrink:'↓1',normal:'=2',bridge:'⏻'}[pad.type]):'···',...p);ctx.restore();}
}
function completeLanding(time){
 const l=levels[levelIndex];update();
 if(!supported(l,state)){phase='falling';$('status').textContent='Watch the edge…';animation={kind:'fall',start:time,duration:reduced?100:520}}
 else if(won(l,state)){phase='escaping';$('status').textContent='A perfect fit.';animation={kind:'win',start:time,duration:reduced?100:500}}
}
function tile(x,z,goal,time){const a=x-.47,b=x+.47,c=z-.47,d=z+.47,depth=-.23;polygon([[a,0,d],[b,0,d],[b,depth,d],[a,depth,d]],`hsl(${th.h},22%,20%)`,`hsl(${th.h},25%,16%)`);polygon([[b,0,c],[b,0,d],[b,depth,d],[b,depth,c]],`hsl(${th.h},25%,17%)`,`hsl(${th.h},25%,16%)`);if(goal){polygon([[a,0,c],[b,0,c],[b,0,d],[a,0,d]],`hsl(${th.a},40%,63%)`,`hsl(${th.a},70%,76%)`);polygon([[a+.09,.005,c+.09],[b-.09,.005,c+.09],[b-.09,.005,d-.09],[a+.09,.005,d-.09]],`hsl(${th.h},40%,7%)`);ctx.save();ctx.shadowColor=`hsl(${th.a},75%,72%)`;ctx.shadowBlur=12+4*Math.sin(time/600);polygon([[a+.025,.015,c+.025],[b-.025,.015,c+.025],[b-.025,.015,d-.025],[a+.025,.015,d-.025]],null,`hsl(${th.a},70%,76%)`);ctx.restore()}else{const shade=(x*7+z*13)%4;polygon([[a,0,c],[b,0,c],[b,0,d],[a,0,d]],[37,41,35,43].map(l=>`hsl(${th.h},17%,${l}%)`)[shade],`hsla(${th.h},17%,55%,.33)`);}}
function vertices(s){const n=sizeOf(s),w=s.o==='x'?n:1,h=s.o==='u'?n:1,d=s.o==='z'?n:1;return [[0,0,0],[w,0,0],[w,0,d],[0,0,d],[0,h,0],[w,h,0],[w,h,d],[0,h,d]].map(([x,y,z])=>[s.x-.5+(x===0?.055:x-.055),y===0?.025:y-.025,s.z-.5+(z===0?.055:z-.055)])}
function transformed(time){if(!animation)return vertices(state);const a=animation,t=Math.min(1,(time-a.start)/a.duration);if(a.kind==='teleport')return vertices(t<.5?a.from:a.to);if(a.kind==='morph'){const from=vertices(a.from),to=vertices(a.to),e=t*t*(3-2*t);return from.map((v,i)=>v.map((c,j)=>c+(to[i][j]-c)*e))}if(a.kind==='roll'){const eased=t*t*(3-2*t),v=vertices(a.from),s=a.from,w=s.o==='x'?sizeOf(s):1,d=s.o==='z'?sizeOf(s):1;const horizontal=a.dir==='left'||a.dir==='right',pivot=horizontal?(a.dir==='right'?s.x+w-.5:s.x-.5):(a.dir==='down'?s.z+d-.5:s.z-.5),angle=eased*Math.PI/2*(a.dir==='right'||a.dir==='up'?-1:1),co=Math.cos(angle),si=Math.sin(angle);return v.map(([x,y,z])=>{if(horizontal){const q=x-pivot;return[pivot+q*co-y*si,q*si+y*co,z]}const q=z-pivot;return[x,y*co-q*si,pivot+y*si+q*co]})}return vertices(state).map(([x,y,z])=>[x,y-t*t*(a.kind==='win'?3:7),z])}
function drawBlock(v,alpha=1){const faces=[[0,3,2,1],[0,1,5,4],[3,0,4,7],[1,2,6,5],[2,3,7,6],[4,5,6,7]],colors=[41,63,55,65,55,80].map(l=>`hsl(${th.a},${l>70?60:40}%,${l}%)`);const ordered=faces.map((f,i)=>({f,i,depth:f.reduce((sum,j)=>sum+cameraDepth(v[j]),0)/4})).sort((a,b)=>a.depth-b.depth);ctx.save();ctx.globalAlpha=alpha;for(const {f,i}of ordered)polygon(f.map(j=>v[j]),colors[i],`hsla(${th.a},80%,85%,.33)`);ctx.restore()}
function frame(time){confetti(time);if(screen!=='play'||$('help-dialog').open){requestAnimationFrame(frame);return}ctx.clearRect(0,0,width,height);const bg=ctx.createRadialGradient(width*.5,height*.52,10,width*.5,height*.5,width*.6);bg.addColorStop(0,`hsl(${th.h},25%,19%)`);bg.addColorStop(1,`hsl(${th.h},30%,11%)`);ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);ctx.fillStyle=`hsla(${th.a},30%,75%,.05)`;for(let x=18;x<width;x+=26)for(let y=16;y<height;y+=26){ctx.beginPath();ctx.arc(x,y,.7,0,Math.PI*2);ctx.fill()}
 const l=levels[levelIndex],tiles=[];l.map.forEach((row,z)=>[...row].forEach((c,x)=>{if(c==='1'||c==='b')tiles.push([x,z])}));tiles.sort((a,b)=>a[1]-b[1]||a[0]-b[0]);
 ctx.save();ctx.filter='blur(15px)';for(const[x,z]of tiles)polygon([[x-.5,-.65,z-.5],[x+.5,-.65,z-.5],[x+.5,-.65,z+.5],[x-.5,-.65,z+.5]],'#00000030');ctx.restore();
 const dropping=animation&&(animation.kind==='fall'||animation.kind==='win');if(dropping)drawBlock(transformed(time),Math.max(0,1-(time-animation.start)/animation.duration));
 for(const[x,z]of tiles)specialTile(x,z,time);
 if(!dropping){for(const[x,z]of cells(state))polygon([[x-.42,.015,z-.42],[x+.42,.015,z-.42],[x+.42,.015,z+.42],[x-.42,.015,z+.42]],'#16251955');const opacity=animation?.kind==='teleport'?Math.abs(1-2*Math.min(1,(time-animation.start)/animation.duration)):1;drawBlock(transformed(time),opacity)}
 if(animation&&time-animation.start>=animation.duration){const a=animation;animation=null;if(a.kind==='roll'){
   state=a.to;
   if(supported(l,state)){
     const next=activate(l,a.from,state),changed=sizeOf(next)!==sizeOf(state)||next.x!==state.x||next.z!==state.z||next.o!==state.o;
     if(next.open!==state.open){$('status').textContent=`Bridges ${next.open?'opened':'closed'}.`;tone(300,.15)}
     const portal=l.pads?.find(p=>p.type==='teleport'&&p.x===state.x&&p.z===state.z);
     if(changed){const teleported=portal&&state.o==='u'&&sizeOf(state)>1;animation={kind:teleported?'teleport':'morph',from:state,to:next,start:time,duration:reduced?50:teleported?440:300};$('status').textContent=teleported?`Portal ${portal.pair}: transported to the matching symbol.`:`Size ${sizeOf(next)}: ${sizeOf(next)===2?'normal restored':sizeOf(next)===3?'three-square block':'single cube'}.`;tone(teleported?720:230+sizeOf(next)*100,.2)}
     else if(cells(state).some(([x,z])=>l.pads?.some(p=>p.type==='teleport'&&p.x===x&&p.z===z)))$('status').textContent='Stand upright at size 2 or 3 to teleport.';
     state=next;update();
   }
   if(!animation)completeLanding(time);
 }else if(a.kind==='morph'||a.kind==='teleport')completeLanding(time);else finish(a.kind==='win')}
 requestAnimationFrame(frame)}
showLevels();requestAnimationFrame(frame);






