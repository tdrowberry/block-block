import {scoreKey,unlockedThrough} from './progress.js';
// One gentle story beat for each five-level world. No separate story save is
// needed: the existing campaign frontier also marks the story's progress.
export const storyWorlds = [
 {title:'A little triangle, a big feeling',text:'Block loves his triangle son more than anything. But Triangle wonders, “Dad has corners like a block. I look different. Do I belong?” He sets off to find a place where he fits, leaving a little note. Block reads it and follows: “You belong with me, little one.”'},
 {title:'Following little footsteps',text:'A neighbor saw Triangle heading toward the ocean, looking for shapes like his own. Block follows the path. He wants to tell his son something simple: families do not have to look alike to belong together.'},
 {title:'A message in the sand',text:'Beside the water, Block finds a triangle drawn in the sand. He draws a block beside it and a heart around them both. “Different shapes. Same family,” he says, and keeps looking.'},
 {title:'Room to grow',text:'Triangle has stopped in a garden full of tall and tiny plants. Block learns to change size as he crosses it. Big or small, he is still Dad. And wherever Triangle goes, he will still be his son.'},
 {title:'Making a way',text:'A friendly traveler points toward the bridges. “Your little triangle helped me find my way,” they tell Block. Block smiles. His son has always had a kind heart.'},
 {title:'A bridge between us',text:'Across the bridges, Block finds another note: “I wish I could be more like you, Dad.” “You never need to change for me,” Block says softly. He carries the note close and rolls onward.'},
 {title:'Farther than the horizon',text:'Triangle has followed the shining paths to a new world. Block asks friendly shapes for directions. Each one helps him along. There is room in the world for every shape.'},
 {title:'Through the bright doorway',text:'A glowing portal leads Block onward. Before stepping through, he leaves a message for his son: “I love your three corners. I love your big ideas. I love you.”'},
 {title:'Small, careful steps',text:'The path ahead needs gentle steps. Block takes his time, remembering how Triangle first learned to hop. They were different steps from his own, and he loved cheering for every one.'},
 {title:'A place to rest',text:'Friendly shapes invite Block to rest in their garden. A circle, a square, and a triangle share a picnic. “Belonging is being welcomed,” they say. Block cannot wait to welcome his son home.'},
 {title:'The shape of a family',text:'Block finds a drawing Triangle made: the two of them beneath their roof. Triangle has written, “Do I still fit here?” Block knows his answer: “Always. Our home has room for you, exactly as you are.”'},
 {title:'Love keeps going',text:'There are still paths to cross, but Block keeps going at his own pace. Each puzzle brings him closer to his son. He practices the words he wants to say: “You are loved. You belong. I am here.”'},
 {title:'Look with your heart',text:'Some paths look different when Block turns around. He remembers all the things he and Triangle share: silly songs, bedtime stories, and warm hugs. None of those things need matching corners.'},
 {title:'A familiar little song',text:'A familiar song drifts across the next world. It is the tune Block and Triangle hum together at home. Block follows with a smile, humming his part so his son might hear.'},
 {title:'Almost close enough',text:'Triangle hears a familiar hum. Could Dad have come all this way for him? He leaves a bright ribbon on the path. Block recognizes it from their favorite kite and follows it onward.'},
 {title:'Your very own shape',text:'Block meets a friend who has been talking with Triangle. “He thinks he needs four corners to make you proud.” Block shakes his head gently. “I am already proud of him. Three corners and all.”'},
 {title:'A message finds its way',text:'The friend carries Block’s words ahead: “You are my son. I love you just as you are.” Triangle reads the message twice, then smiles a little. Maybe home was his place all along.'},
 {title:'Waiting by the garden',text:'Triangle sends a note back: “I’m by the garden. Can we go home together?” “Of course,” says Block. The last paths wind toward a quiet place where they can talk and share a hug.'},
 {title:'No need to be the same',text:'Across the garden, Triangle spots Dad. “Will you still love me if I always look different?” he calls. “Every single day,” Block answers. “You never have to be a block to belong with me.”'},
 {title:'The way back to each other',text:'Just a few little paths remain. Triangle waits by the flowers, humming their song. Block rolls closer. Soon he can tell his son face to face: “You are my family. You are loved. Let’s go home together.”'},
];
export const storyEnding = {title:'Home is where you are loved',text:'Block wraps his triangle son in a warm hug. “I thought I didn’t belong,” Triangle says. “You always belong with me,” Dad replies. “I love you exactly as you are.” They go home together, share their favorite snack, and curl up for a bedtime story. Different shapes. One happy family.'};
export const storyChapterNames = ['A FAMILY OF TWO','DIFFERENT SHAPES, SAME LOVE','BRIDGES TO BELONGING','LOVE FINDS A WAY','GENTLE STEPS','THE SHAPE OF HOME','A FAMILIAR SONG','THREE CORNERS AND ALL','LET’S GO HOME','TOGETHER AGAIN'];
export function storyForLevel(index){return storyWorlds[Math.min(storyWorlds.length-1,Math.max(0,Math.floor(index/5)))];}
export function availableStory(scores,count=100){
 const last=Math.floor(unlockedThrough(scores,count)/5),pages=storyWorlds.slice(0,last+1);
 if(Array.from({length:count},(_,i)=>scores[scoreKey(i)]).every(score=>Number.isInteger(score)&&score>0))pages.push(storyEnding);
 return pages;
}
