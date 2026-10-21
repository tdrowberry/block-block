// Positions are feet on an 800 x 450 stage. Bodies stay rigid while walking/hopping.
// Every shot has one short, attributed subtitle and a clear visible action.
const B=(x,mood='happy',gesture='rest')=>({x,mood,gesture});
const T=B;
const shot=(speaker,text,b,t,prop='',place)=>({speaker,text,b,t,prop,place,duration:Math.max(5200,text.length*65+1600)});
export const films=[
 {place:'home',shots:[
  shot('Block','Ready for another adventure, little one?',B(320,'happy','wave'),T(460,'happy','wave'),'heart'),
  shot('Triangle thinks','Dad has four corners. I only have three. Do I belong?',B(320),T(460,'sad','think')),
  shot('Triangle thinks','Maybe I should find somewhere I fit.',B(170),T(520,'sad','think'),'note'),
  shot('Triangle','I love you, Dad. I just need to find my place.',B(170),T(900,'sad','walk'),'note'),
  shot('Block','Triangle? Where did you go?',B(340,'worried','look'),T(900),'note')
 ]},
 {place:'home',shots:[
  shot('Block reads','“I went to find somewhere I belong.” Oh, little one…',B(340,'worried','read'),null,'note'),
  shot('Block','I need to find my son and bring him home.',B(440,'determined','reach'),null,'note'),
  shot('Neighbor','I saw him heading toward the ocean. Follow the little footprints.',B(270,'hopeful','listen'),null,'footprints','shore'),
  shot('Block','Thank you! Triangle, I’m on my way.',B(750,'determined','walk'),null,'footprints','shore')
 ]},
 {place:'shore',shots:[
  shot('Triangle thinks','Maybe the sea knows a place for a triangle.',null,T(290,'sad','draw'),'drawing'),
  shot('Triangle thinks','I miss Dad already.',null,T(880,'sad','walk'),'drawing'),
  shot('Block','That’s his drawing! I’ll add something beside it.',B(320,'hopeful','draw'),null,'family-drawing'),
  shot('Block','Different shapes. Same family.',B(400,'happy','reach'),null,'family-heart')
 ]},
 {place:'garden',shots:[
  shot('Triangle','Tall flowers, tiny flowers… you all fit together.',null,T(330,'curious','look'),'flowers'),
  shot('Triangle thinks','Could I fit in, just as I am?',null,T(870,'hopeful','walk'),'flowers'),
  shot('Block','Big or small, every flower belongs in this garden.',B(280,'happy','look'),null,'flowers'),
  shot('Block','And you will always be my son.',B(670,'determined','walk'),null,'flowers')
 ]},
 {place:'bridge',shots:[
  shot('Traveler','Your little triangle helped me find the bridge.',B(240,'curious','listen'),null,'friend'),
  shot('Block','That sounds like him. He has such a kind heart.',B(300,'happy','reach'),null,'friend'),
  shot('Traveler','He went that way. You’re getting closer!',B(370,'hopeful','wave'),null,'friend'),
  shot('Block','Thank you. I’ll keep going!',B(730,'determined','walk'),null,'bridge')
 ]},
 {place:'bridge',shots:[
  shot('Triangle','I wish I could be more like you, Dad.',null,T(280,'sad','write'),'note'),
  shot('Triangle thinks','Maybe then I would fit.',null,T(870,'sad','walk'),'note'),
  shot('Block reads','“I wish I could be more like you.”',B(320,'worried','read'),null,'note'),
  shot('Block','You never need to change for me, little one.',B(640,'hopeful','walk'),null,'heart')
 ]},
 {place:'hills',shots:[
  shot('Block','Have you seen a little golden triangle?',B(240,'worried','listen'),null,'friends'),
  shot('Friends','Yes! He followed the shining path.',B(320,'hopeful','wave'),null,'friends'),
  shot('Block','Thank you for helping us find each other.',B(450,'happy','wave'),null,'friends'),
  shot('Block','There is room here for every shape.',B(730,'determined','walk'),null,'footprints')
 ]},
 {place:'portal',shots:[
  shot('Triangle','A bright doorway! I wonder where it leads.',null,T(310,'curious','reach'),'portal'),
  shot('Triangle thinks','One more place to look…',null,T(900,'hopeful','walk'),'portal'),
  shot('Block','I’ll leave him a message before I follow.',B(320,'hopeful','write'),null,'note'),
  shot('Block','I love your three corners. I love your big ideas. I love you.',B(730,'happy','walk'),null,'portal')
 ]},
 {place:'stepping',shots:[
  shot('Block','These little stepping stones remind me of something…',B(200,'curious','look'),null,'stones'),
  shot('Block remembers','Your very first hop! I was so proud.',B(300,'happy','wave'),T(460,'happy','hop'),'memory'),
  shot('Block','Your steps were different from mine. They were wonderful.',B(340,'happy','reach'),T(550,'happy','hop'),'memory'),
  shot('Block','One careful step at a time. I’m coming, little one.',B(720,'determined','walk'),null,'stones')
 ]},
 {place:'picnic',shots:[
  shot('Friends','Come rest with us, Block.',B(240,'worried','listen'),null,'picnic'),
  shot('Block','You’re all different shapes, and you look so happy together.',B(320,'curious','look'),null,'picnic'),
  shot('Friends','Belonging means being welcomed. There’s a place for you too!',B(380,'happy','wave'),null,'picnic'),
  shot('Block','I can’t wait to welcome my son home.',B(730,'hopeful','walk'),null,'heart')
 ]},
 {place:'hills',shots:[
  shot('Triangle','Our house. Dad. Me…',null,T(300,'sad','draw'),'home-drawing'),
  shot('Triangle thinks','Do I still fit here?',null,T(870,'sad','walk'),'home-drawing'),
  shot('Block','A drawing of our home! I know the answer.',B(320,'hopeful','read'),null,'home-drawing'),
  shot('Block','Always. Our home has room for you, exactly as you are.',B(520,'happy','reach'),null,'heart')
 ]},
 {place:'sunset',shots:[
  shot('Block','There are still a few paths ahead.',B(170,'determined','look'),null,'footprints'),
  shot('Block','You are loved.',B(330,'hopeful','walk'),null,'heart'),
  shot('Block','You belong.',B(500,'happy','walk'),null,'heart'),
  shot('Block','And I am here. I’ll keep looking for you.',B(730,'determined','walk'),null,'heart')
 ]},
 {place:'moon',shots:[
  shot('Block','What makes us a family?',B(260,'curious','think'),null,'stars'),
  shot('Block remembers','Our silly songs…',B(320,'happy','sing'),T(470,'happy','sing'),'memory'),
  shot('Block remembers','Our bedtime stories. Our warm hugs.',B(355,'happy','hug'),T(420,'happy','hug'),'memory'),
  shot('Block','None of those things need matching corners.',B(690,'hopeful','walk'),null,'heart')
 ]},
 {place:'music',shots:[
  shot('Triangle hums','Hmm-hmm… our little bedtime song.',null,T(430,'sad','sing'),'music'),
  shot('Triangle thinks','I wish Dad were here to sing his part.',null,T(870,'sad','walk'),'music'),
  shot('Block','I know that song!',B(240,'hopeful','look'),null,'music'),
  shot('Block hums','Hmm-hmm… I’m right here, little one.',B(690,'happy','sing'),null,'music')
 ]},
 {place:'ribbon',shots:[
  shot('Triangle','That sounds like Dad!',null,T(300,'hopeful','look'),'music'),
  shot('Triangle thinks','Did he really come all this way for me?',null,T(450,'curious','think'),'ribbon'),
  shot('Triangle','I’ll leave our kite ribbon so he can find me.',null,T(870,'happy','walk'),'ribbon'),
  shot('Block','Our bright ribbon! I’m getting closer.',B(650,'happy','walk'),null,'ribbon')
 ]},
 {place:'garden',shots:[
  shot('Friend','Triangle thinks he needs four corners to make you proud.',B(240,'worried','listen'),null,'friend'),
  shot('Block','Oh, no. I’m already proud of him!',B(330,'determined','reach'),null,'friend'),
  shot('Block','Three corners, a kind heart, and his very own ideas.',B(380,'happy','wave'),null,'heart'),
  shot('Friend','I’ll tell him. Wait until he hears!',B(430,'hopeful','wave'),null,'messenger')
 ]},
 {place:'garden',shots:[
  shot('Friend','Triangle! Your dad sent you a message.',null,T(460,'curious','listen'),'friend'),
  shot('Triangle reads','“You are my son. I love you just as you are.”',null,T(410,'hopeful','read'),'note'),
  shot('Triangle','Just as I am? Three corners and everything?',null,T(410,'happy','reach'),'heart'),
  shot('Triangle','Maybe home was my place all along.',null,T(520,'happy','hop'),'heart')
 ]},
 {place:'garden',shots:[
  shot('Triangle writes','“I’m by the garden. Can we go home together?”',null,T(450,'hopeful','write'),'note'),
  shot('Friend','I’ll take your note to him!',null,T(490,'happy','wave'),'messenger'),
  shot('Block reads','“Can we go home together?” Of course we can!',B(300,'happy','read'),null,'note'),
  shot('Block','I’m nearly there!',B(750,'happy','walk'),null,'flowers')
 ]},
 {place:'garden',shots:[
  shot('Triangle','Dad! I can see you!',B(90,'happy','wave'),T(650,'hopeful','wave'),'flowers'),
  shot('Triangle','Will you still love me if I always look different?',B(220,'hopeful','listen'),T(620,'worried','think'),'flowers'),
  shot('Block','Every single day.',B(340,'happy','reach'),T(590,'happy','reach'),'heart'),
  shot('Block','You never have to be a block to belong with me.',B(390,'happy','wave'),T(550,'happy','wave'),'heart')
 ]},
 {place:'garden',shots:[
  shot('Triangle','I’ll wait right here by the flowers.',B(130,'happy','wave'),T(620,'happy','wave'),'flowers'),
  shot('Block','Just a few little paths left!',B(290,'determined','walk'),T(620,'happy','sing'),'music'),
  shot('Triangle hums','Hmm-hmm… our song sounds better together.',B(380,'happy','sing'),T(560,'happy','sing'),'music'),
  shot('Block','You are my family. You are loved. Let’s go home.',B(440,'happy','reach'),T(530,'happy','reach'),'heart')
 ]},
 {place:'garden',shots:[
  shot('Triangle','Dad! I thought I didn’t belong.',B(300,'happy','reach'),T(550,'sad','walk'),'flowers'),
  shot('Block','You always belong with me. I love you exactly as you are.',B(370,'happy','hug'),T(433,'happy','hug'),'heart'),
  shot('Triangle','Let’s go home together.',B(590,'happy','walk'),T(680,'happy','walk'),'heart'),
  shot('Block','Your favorite snack, and then a bedtime story?',B(340,'happy','read'),T(445,'happy','listen'),'book','home'),
  shot('Triangle','Yes, Dad. There’s no place I’d rather be.',B(365,'happy','hug'),T(430,'happy','hug'),'heart','home'),
  shot('Together','Different shapes. One happy family.',B(365,'happy','hug'),T(430,'happy','hug'),'heart','home')
 ]}
];

export const filmDuration=film=>film.shots.reduce((total,s)=>total+s.duration,0);
export function sampleFilm(film,time){
 const duration=filmDuration(film),clamped=Math.max(0,Math.min(time,duration));let start=0;
 for(let i=0;i<film.shots.length;i++){
  const shot=film.shots[i];
  if(clamped<start+shot.duration||i===film.shots.length-1)return {shot,previous:film.shots[Math.max(0,i-1)],index:i,progress:Math.min(1,(clamped-start)/shot.duration),time:clamped,done:clamped===duration};
  start+=shot.duration;
 }
}
export function nextFilm(index,unlockedCount,continuous){return continuous&&index+1<unlockedCount?index+1:null;}
