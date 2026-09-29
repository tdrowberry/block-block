export const scoreKey=i=>i===10?'size-intro-v1':String(i);
export function cleanScores(value,count){const clean={};if(!value||typeof value!=='object'||Array.isArray(value))return clean;for(let i=0;i<count;i++){const key=scoreKey(i),v=value[key];if(Number.isInteger(v)&&v>0)clean[key]=v}return clean}
export function unlockedThrough(scores,count){let i=0;while(i<count&&Number.isInteger(scores[scoreKey(i)])&&scores[scoreKey(i)]>0)i++;return Math.min(i,count-1)}
export function canPlay(scores,index,count){return Number.isInteger(index)&&index>=0&&index<count&&index<=unlockedThrough(scores,count)}
export function recordWin(scores,index,moves,count){if(!canPlay(scores,index,count)||!Number.isInteger(moves)||moves<1)return scores;return{...scores,[scoreKey(index)]:Math.min(scores[scoreKey(index)]??Infinity,moves)}}
