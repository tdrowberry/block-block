import {films,filmDuration,sampleFilm} from './cutscenes.js';

const palettes={home:['#e5d9ae','#93b79b','#64856a'],shore:['#b7decd','#73b4b8','#d8c99c'],garden:['#c4d9ad','#9fbd88','#65865e'],bridge:['#b5d4ce','#759d91','#536f66'],hills:['#cadbc0','#98b6a3','#648d77'],portal:['#b9bbda','#8e9eb5','#56687c'],stepping:['#b8d6ce','#8fae9a','#587e73'],picnic:['#d4dfb3','#a4bb8b','#6a8d68'],sunset:['#eac9ae','#c69b9b','#8b8390'],moon:['#667b96','#526d84','#405d70'],music:['#c8cedc','#95abb0','#648889'],ribbon:['#d9d2b4','#a6b8a0','#728e77']};
const mix=(a,b,t)=>a+(b-a)*t;
const ease=t=>t*t*(3-2*t);
function path(c,points,fill,stroke){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}}
function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
function line(c,x1,y1,x2,y2,color,width=3){c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke()}
function heart(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#e69c99';c.beginPath();c.moveTo(0,10);c.bezierCurveTo(-30,-8,-19,-30,0,-15);c.bezierCurveTo(19,-30,30,-8,0,10);c.fill();c.restore()}
function paper(c,x,y,book=false){c.save();c.translate(x,y);c.rotate(-.1);c.fillStyle=book?'#bc8068':'#fff2ca';c.fillRect(-23,-20,46,34);c.strokeStyle='#9b8661';c.lineWidth=1.5;c.strokeRect(-23,-20,46,34);if(book){line(c,0,-18,0,12,'#e8cb96',2)}else{line(c,-13,-9,13,-9,'#b8a576',2);line(c,-13,-2,8,-2,'#b8a576',2);heart(c,0,8,.25)}c.restore()}
function flower(c,x,y,hue,time){line(c,x,y,x,y-27,'#52775b',3);ellipse(c,x-6,y-13,8,3,'#6d9465');for(let i=0;i<5;i++){const a=i*Math.PI*2/5+Math.sin(time)*.04;ellipse(c,x+Math.cos(a)*7,y-28+Math.sin(a)*7,5,5,hue)}ellipse(c,x,y-28,4,4,'#f5dfa2')}
function background(c,place,time){
 const p=palettes[place]||palettes.garden;
 const sky=c.createLinearGradient(0,0,0,450);sky.addColorStop(0,p[0]);sky.addColorStop(1,p[1]);c.fillStyle=sky;c.fillRect(0,0,800,450);
 ellipse(c,655,76,40,40,place==='moon'?'#e1e8ce':'#fff0bd');
 c.globalAlpha=.25;for(let i=0;i<4;i++){const x=((i*240+time*3)%1050)-100;ellipse(c,x,75+i%2*50,70,13,'#fff9df');ellipse(c,x+25,66+i%2*50,35,18,'#fff9df')}c.globalAlpha=1;
 path(c,[[0,280],[0,240],[110,160],[230,240],[420,135],[640,235],[800,165],[800,350]],p[1]);
 path(c,[[0,335],[0,278],[180,235],[390,300],[590,226],[800,278],[800,370]],p[2]);
 c.fillStyle=place==='shore'?'#73aeb2':'#819c78';c.fillRect(0,300,800,150);
 if(place==='shore'){for(let i=0;i<5;i++)line(c,(i*190+time*9)%1000-100,310+i%2*17,(i*190+time*9)%1000-20,310+i%2*17,'#d3ede0',2)}
 path(c,[[0,355],[800,355],[800,450],[0,450]],place==='shore'?'#d8c99c':'#647f63');
 // Large quiet puzzle tiles form the path, echoing the actual board.
 for(let x=-100;x<900;x+=110){path(c,[[x,333],[x+100,333],[x+119,367],[x-19,367]],place==='shore'?'#e5d5aa':'#9caf8a','#b9c8a0');path(c,[[x-19,367],[x+119,367],[x+119,382],[x-19,382]],'#536f60')}
 if(place==='home'){
  c.fillStyle='#e4cf9f';c.fillRect(60,148,195,179);path(c,[[38,151],[156,64],[277,151]],'#9a6f61','#e4bc94');c.fillStyle='#69836c';c.fillRect(123,230,62,97);c.fillStyle='#f7e8b8';c.fillRect(83,178,42,42);c.fillRect(193,178,40,42);line(c,104,178,104,220,'#b49c79');line(c,83,199,125,199,'#b49c79');ellipse(c,172,280,3,3,'#edcf94');
 }
 if(place==='bridge'){
  c.fillStyle='#74a8ab';c.fillRect(280,382,300,68);for(let x=270;x<600;x+=48){line(c,x,297,x,351,'#bba77a',7);line(c,x,298,x+48,302,'#e1d2a3',4)}
 }
 if(place==='portal'){
  for(let i=0;i<3;i++){c.beginPath();c.ellipse(675,230,44+i*8,105+i*8,0,0,Math.PI*2);c.strokeStyle=['#ece3fd','#c0b3e2','#9a95cb'][i];c.lineWidth=5+i*2;c.stroke()}
  c.globalAlpha=.25;ellipse(c,675,230,42,103,'#e4ddfa');c.globalAlpha=1;
 }
 if(['garden','picnic','ribbon','music','hills'].includes(place))for(let i=0;i<12;i++)flower(c,32+i*69,412+i%3*11,i%2?'#e0b2a4':'#e5d4a0',time+i);
 if(place==='moon')for(let i=0;i<19;i++){c.globalAlpha=.5+Math.sin(time+i)*.25;ellipse(c,(i*137)%800,30+(i*59)%150,2,2,'#fff6d3')}c.globalAlpha=1;
}
function friend(c,x,y,shape='circle'){
 ellipse(c,x,y+4,30,6,'#365f5640');if(shape==='circle')ellipse(c,x,y-34,32,32,'#b3c4df');else path(c,[[x-29,y],[x+29,y],[x+29,y-62],[x-29,y-62]],'#d6afbd','#f2d6d6');
 ellipse(c,x-10,y-39,2.5,3,'#475966');ellipse(c,x+10,y-39,2.5,3,'#475966');c.strokeStyle='#475966';c.lineWidth=2;c.beginPath();c.moveTo(x-8,y-26);c.quadraticCurveTo(x,y-19,x+8,y-26);c.stroke();
 line(c,x-29,y-25,x-44,y-44,'#c7d7e6',4);line(c,x+29,y-25,x+43,y-42,'#c7d7e6',4);
}
function props(c,shot,time,progress){
 const prop=shot.prop;
 if(['note','home-drawing'].includes(prop)&&![shot.b,shot.t].some(a=>a&&['read','write'].includes(a.gesture)))paper(c,340,330);
 if(['drawing','family-drawing','family-heart','home-drawing'].includes(prop)){
  c.save();c.translate(390,386);c.scale(1,.45);path(c,[[-28,5],[0,-43],[28,5]],null,'#957d53');
  if(prop!=='drawing')path(c,[[40,5],[75,5],[75,-52],[40,-52]],null,'#957d53');
  if(prop==='family-heart'){c.strokeStyle='#c18779';c.beginPath();c.ellipse(25,-15,86,70,0,0,Math.PI*2);c.stroke()}
  if(prop==='home-drawing')path(c,[[-60,-55],[25,-110],[110,-55]],null,'#957d53');c.restore();
 }
 if(prop==='footprints')for(let i=0;i<9;i++)ellipse(c,120+i*74,351+i%2*7,7,3,'#566e5b88');
 if(prop==='ribbon'){line(c,548,270,548,335,'#7b805a',4);c.strokeStyle='#de9e91';c.lineWidth=13;c.beginPath();c.moveTo(548,278);c.bezierCurveTo(585,264+Math.sin(time*2)*8,600,297,638,280+Math.sin(time*2)*8);c.stroke()}
 if(['friend','friends','messenger','picnic'].includes(prop)){
  const x=shot.t?160:610;friend(c,prop==='messenger'?mix(x,900,ease(progress)):x,338);
  if(['friends','picnic'].includes(prop))friend(c,x-95,340,'square');
 }
 if(prop==='picnic'){path(c,[[470,392],[700,392],[740,437],[440,437]],'#d2a99b');paper(c,565,409,true);ellipse(c,645,410,22,6,'#f0d4a1')}
 if(prop==='heart'){const x=shot.b&&shot.t?(shot.b.x+shot.t.x)/2:(shot.b?.x??shot.t?.x??400);heart(c,Math.max(60,Math.min(740,x)),104+Math.sin(time*2)*4,.95)}
 if(prop==='music')for(let i=0;i<4;i++){c.font='28px Georgia';c.fillStyle='#f5e9c7';c.globalAlpha=.7;c.fillText(i%2?'♪':'♫',210+i*120,130+Math.sin(time+i)*12)}c.globalAlpha=1;
 if(prop==='memory'){c.strokeStyle='#f5ead3aa';c.lineWidth=3;c.setLineDash([5,10]);c.strokeRect(140,120,520,238);c.setLineDash([]);c.fillStyle='#f8edd5';c.font='15px system-ui';c.textAlign='center';c.fillText('A happy memory',400,113)}
}
function actor(c,kind,current,previous,progress,time,reduced){
 if(!current&&!previous)return;
 const target=current||previous,start=previous||{...target,x:target.x<400?-100:900};
 const movement=ease(Math.min(1,progress/.78)),x=reduced?target.x:mix(start.x,target.x,movement);
 const moving=Boolean(current&&!reduced&&Math.abs(target.x-start.x)>4&&progress<.78),hop=!reduced&&(moving||target.gesture==='hop');
 const bob=hop?Math.abs(Math.sin(time*(kind==='triangle'?7:5)))*(kind==='triangle'?14:5):0;
 const y=338-bob;const mood=target.mood,gesture=target.gesture;
 c.save();c.globalAlpha=current?(previous?1:Math.min(1,progress*5)):Math.max(0,1-progress*5);
 ellipse(c,x,346,kind==='block'?49:43,8,'#254b4c33');c.translate(x,y);
 if(!reduced)c.rotate(moving?Math.sin(time*6)*.025:gesture==='think'?-.035:0);
 const isBlock=kind==='block',w=isBlock?37:45,faceY=isBlock?-79:-32,skin=isBlock?'#cedfa3':'#eed09a',ink=isBlock?'#344b35':'#76573c';
 if(isBlock){
  const g=c.createLinearGradient(-37,-130,37,0);g.addColorStop(0,'#a6bd72');g.addColorStop(1,'#879e60');path(c,[[-37,-130],[37,-130],[37,0],[-37,0]],g,'#e1edbc');path(c,[[-37,-181],[37,-181],[37,-130],[-37,-130]],'#d5e6a8','#eef4d5');
  c.strokeStyle='#dfebbd77';c.lineWidth=1.5;c.strokeRect(-30,-123,60,116);c.strokeRect(-30,-174,60,37);
 }else{
  path(c,[[-45,0],[0,-78],[0,-100],[-45,-22]],'#c69a60','#efce94');path(c,[[0,-100],[45,-22],[45,0],[0,-78]],'#e9c68b','#f6ddae');path(c,[[-45,0],[45,0],[0,-78]],'#efd09a','#fff0c9');path(c,[[-34,-6],[34,-6],[0,-65]],null,'#fff0cd80');
 }
 const blink=!reduced&&Math.sin(time*.7+ (isBlock?0:2))>.997;
 for(const eyeX of [-1,1]){
  ellipse(c,eyeX*(isBlock?14:10),faceY,isBlock?3.5:2.8,blink?1:isBlock?4.5:3.5,ink);
  if(!blink)ellipse(c,eyeX*(isBlock?14:10)+.7,faceY-1,1,1,'#fff8dc');
  if(['sad','worried'].includes(mood))line(c,eyeX*(isBlock?14:10)-4,faceY-11+(eyeX<0?3:0),eyeX*(isBlock?14:10)+4,faceY-11+(eyeX>0?3:0),ink,2);
 }
 c.strokeStyle=ink;c.lineWidth=2.5;c.lineCap='round';c.beginPath();const mouthY=faceY+18;
 c.moveTo(-9,mouthY);c.quadraticCurveTo(0,mouthY+(['sad','worried'].includes(mood)?-7:gesture==='sing'?12:8),9,mouthY);c.stroke();
 const armY=isBlock?-47:-21,swing=moving?Math.sin(time*6)*13:0;
 for(const side of [-1,1]){
  let endX=side*(w+19),endY=armY+15+side*swing;
  if(['wave','reach','hug','sing'].includes(gesture)){endX=side*(w+(gesture==='hug'?24:20));endY=armY-(gesture==='wave'?32+Math.sin(time*5)*6:gesture==='hug'?-2:12)}
  if(['read','write','draw'].includes(gesture)){endX=side*23;endY=armY+13}
  if(gesture==='think'&&side===1){endX=w-12;endY=faceY+9}
  c.strokeStyle=skin;c.lineWidth=isBlock?6:5;c.beginPath();c.moveTo(side*w,armY);c.quadraticCurveTo(side*(w+21),armY+12,endX,endY);c.stroke();ellipse(c,endX,endY,4,4,skin);
 }
 if(['read','write'].includes(gesture))paper(c,0,armY+21);
 if(gesture==='draw')line(c,25,armY+10,49,8,'#8b7758',3);
 if(gesture==='think'){for(let i=0;i<3;i++)ellipse(c,w+14+i*9,faceY-28-i*9,3+i*1.6,3+i*1.6,'#f8efd5')}
 c.restore();
}
export function drawFilm(canvas,film,time,reduced=false){
 const c=canvas.getContext('2d'),frame=sampleFilm(film,time),{shot,previous,progress}=frame;
 const clock=reduced?0:time/1000;c.save();c.scale(canvas.width/800,canvas.height/450);
 background(c,shot.place||film.place,clock);props(c,shot,clock,progress);
 actor(c,'block',shot.b,previous.b,progress,clock,reduced);actor(c,'triangle',shot.t,previous.t,progress,clock,reduced);
 if(shot.b?.gesture==='hug'&&shot.t?.gesture==='hug'){
  const p=reduced?1:ease(Math.min(1,progress/.78)),bx=mix(previous.b?.x??shot.b.x,shot.b.x,p),tx=mix(previous.t?.x??shot.t.x,shot.t.x,p);
  c.strokeStyle='#cedfa3';c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(bx+34,291);c.bezierCurveTo(tx+28,273,tx+60,283,tx+39,311);c.stroke();ellipse(c,tx+39,311,4,4,'#dfeabc');
 }
 if(shot.prop==='book')paper(c,395,300,true);
 c.restore();return frame;
}

// One clock drives motion and captions so pause, seeking and backgrounding stay in sync.
export function createFilmPlayer(root,{onEnded=()=>{},reduced=false}={}){
 root.innerHTML='<div class="film-screen"><canvas width="1200" height="675" role="img" aria-label="Animated story scene"></canvas><span class="film-badge">A BLOCK BLOCK STORY</span></div><div class="film-caption" aria-live="polite" aria-atomic="true"><span class="film-speaker"></span><p></p></div><div class="film-controls"><button type="button" data-action="pause">Pause</button><button type="button" data-action="replay">Replay clip</button><button type="button" data-action="caption">Next caption →</button></div><progress class="film-progress" max="1" value="0" aria-label="Scene playback progress"></progress><span class="film-status" role="status"></span>';
 const canvas=root.querySelector('canvas'),speaker=root.querySelector('.film-speaker'),caption=root.querySelector('.film-caption p'),pause=root.querySelector('[data-action="pause"]'),next=root.querySelector('[data-action="caption"]'),bar=root.querySelector('progress'),status=root.querySelector('.film-status');
 let film=films[0],time=0,running=false,raf=0,last=null,captionIndex=-1,ended=false;
 function paint(){const frame=drawFilm(canvas,film,time,reduced);if(frame.index!==captionIndex){captionIndex=frame.index;speaker.textContent=frame.shot.speaker;caption.textContent=frame.shot.text;canvas.setAttribute('aria-label',`${frame.shot.speaker}: ${frame.shot.text}`)}bar.value=time/filmDuration(film);pause.textContent=ended?'Play again':running?'Pause':'Play';pause.setAttribute('aria-label',running?'Pause scene':ended?'Play scene again':'Play scene');next.disabled=ended;return frame}
 function schedule(){if(running&&!raf)raf=requestAnimationFrame(tick)}
 function complete(){running=false;ended=true;status.textContent='Scene complete';paint();onEnded()}
 function tick(now){raf=0;if(!running)return;if(!document.hidden){if(last!==null)time=Math.min(filmDuration(film),time+Math.min(100,now-last));last=now;const frame=paint();if(frame.done){complete();return}}else last=null;schedule()}
 function play(){if(ended){time=0;ended=false;captionIndex=-1}running=true;last=null;status.textContent='';paint();schedule()}
 function stop(){running=false;last=null;cancelAnimationFrame(raf);raf=0}
 function load(index){stop();film=films[index];if(!film)throw new RangeError('Unknown story scene');time=0;captionIndex=-1;ended=false;play()}
 pause.onclick=()=>{if(running){stop();paint()}else play()};
 root.querySelector('[data-action="replay"]').onclick=()=>{stop();time=0;captionIndex=-1;ended=false;play()};
 next.onclick=()=>{const frame=sampleFilm(film,time);time=film.shots.slice(0,frame.index+1).reduce((n,s)=>n+s.duration,0);last=null;if(time>=filmDuration(film)){stop();complete()}else paint()};
 return {load,stop,play,setStatus:text=>{status.textContent=text}};
}
